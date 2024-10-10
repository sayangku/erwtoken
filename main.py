import os
import sqlite3
from telegram.ext import Application, CommandHandler
from telegram.constants import ParseMode
from telegram import Update
from flask import Flask, request, jsonify
import threading
import asyncio
import nest_asyncio
import signal

# nest_asyncio'yu etkinleştir
nest_asyncio.apply()

# Flask uygulaması
app = Flask(__name__, static_folder='static')

# Telegram API kimlik bilgileri
API_ID = '29454561'  # API ID'nizi buraya girin
API_HASH = '8c3719453c1f1751608459d2d42c5d66'  # API Hash'inizi buraya girin
TOKEN = '6977513645:AAHXgoaBI8mWIdbvT-udEY1M6rvLGSGuQNc'  # Bot token'inizi buraya girin

# Proje URL'si (Render'ın URL'si)
PROJECT_URL = "https://erwtoken.onrender.com"

# Global değişkenler
application = None
should_stop = False

# Veritabanı fonksiyonları
def get_db_connection():
    db_path = os.path.join(os.path.dirname(__file__), 'ecoreward.db')
    conn = sqlite3.connect(db_path)
    conn.row_factory = sqlite3.Row
    return conn

def create_database():
    conn = get_db_connection()
    conn.execute('''CREATE TABLE IF NOT EXISTS users
                    (id INTEGER PRIMARY KEY,
                     telegram_id INTEGER UNIQUE,
                     score INTEGER DEFAULT 0,
                     erw_tokens INTEGER DEFAULT 0,
                     level INTEGER DEFAULT 1)''')
    conn.commit()
    conn.close()

def update_user_data(telegram_id, score, erw_tokens, level):
    conn = get_db_connection()
    conn.execute('''INSERT OR REPLACE INTO users (telegram_id, score, erw_tokens, level)
                    VALUES (?, ?, ?, ?)''', (telegram_id, score, erw_tokens, level))
    conn.commit()
    conn.close()

def get_user_data(telegram_id):
    conn = get_db_connection()
    user = conn.execute('SELECT * FROM users WHERE telegram_id = ?', (telegram_id,)).fetchone()
    conn.close()
    return user

# Bot komutları
async def start(update: Update, context):
    print("Start komutu alındı!")  # Loglama ekle
    try:
        user_id = update.effective_user.id
        user = get_user_data(user_id)

        if not user:
            update_user_data(user_id, 0, 0, 1)

        # Kullanıcıyı index.html'ye yönlendir
        game_url = f"{PROJECT_URL}/?user_id={user_id}"
        message = f"🌍 EcoReward Orman Oyunu'na hoş geldiniz! 🌍\n\nOyunu oynamak için aşağıdaki bağlantıya tıklayın:\n{game_url}"
        await update.message.reply_text(message, parse_mode=ParseMode.HTML)
    except Exception as e:
        print(f"Hata oluştu: {e}")

async def stats(update: Update, context):
    try:
        user_id = update.effective_user.id
        user = get_user_data(user_id)

        if user:
            message = f"📊 İstatistikleriniz:\n\nPuan: {user['score']}\nERW Token: {user['erw_tokens']}\nSeviye: {user['level']}"
        else:
            message = "Henüz oyun oynamadınız. /start komutunu kullanarak oyuna başlayabilirsiniz."

        await update.message.reply_text(message)
    except Exception as e:
        print(f"Hata oluştu: {e}")

# Bot yönetimi
async def setup_bot():
    global application

    application = (
        Application.builder()
        .token(TOKEN)
        .build()
    )

    application.add_handler(CommandHandler("start", start))
    application.add_handler(CommandHandler("stats", stats))

    await application.initialize()
    await application.start()

    print("Bot başarıyla başlatıldı!")

    return application

async def stop_bot():
    global application
    if application:
        await application.stop()
        print("Bot durduruldu!")

# Flask route'ları
@app.route('/')
def index():
    return app.send_static_file('index.html')

@app.route('/webhook', methods=['POST'])
def webhook():
    update = request.get_json()
    print(f"Webhook isteği alındı: {update}")  # Gelen veriyi konsola yazdır

    # Gelen mesajı işleyin
    message = update.get('message', {}).get('text')
    if message:
        # Örnek olarak, kullanıcının "/start" komutunu işleyin
        if message == "/start":
            # Kullanıcıyı index.html sayfanıza yönlendirin
            game_url = f"{PROJECT_URL}/"  # Webhook'a yönlendirin
            print(f"Kullanıcıya yönlendirme URL'si: {game_url}") 
            return jsonify({"message": f"Oyunu oynamak için şu bağlantıya tıklayın: {game_url}"}), 200 

    return jsonify({"status": "ok"}), 200 

@app.route('/update_score', methods=['POST'])
def update_score():
    data = request.json
    user_id = data.get('user_id')
    score = data.get('score')
    erw_tokens = data.get('erw_tokens')
    level = data.get('level')

    if user_id is not None and score is not None and erw_tokens is not None and level is not None:
        update_user_data(user_id, score, erw_tokens, level)
        return jsonify({"status": "success"}), 200
    else:
        return jsonify({"status": "error", "message": "Geçersiz veri"}), 400

@app.route('/get_user_data/<int:user_id>')
def get_user_data_route(user_id):
    user = get_user_data(user_id)
    if user:
        return jsonify({
            "score": user['score'],
            "erw_tokens": user['erw_tokens'],
            "level": user['level']
        }), 200
    else:
        return jsonify({"status": "error", "message": "Kullanıcı bulunamadı"}), 404

# Ana program
def run_flask():
    app.run(host='0.0.0.0', port=5003)

async def main():
    # Bot'u başlat
    await setup_bot()

    # Flask'ı ayrı bir thread'de başlat
    flask_thread = threading.Thread(target=run_flask)
    flask_thread.daemon = True
    flask_thread.start()

    print("Flask uygulaması başlatılıyor...")
    print("Flask uygulaması ayrı bir thread'de başlatıldı.")

    try:
        # Bot'u çalışır durumda tut
        while not should_stop:
            await asyncio.sleep(1)
    except KeyboardInterrupt:
        print("\nUygulama kapatılıyor...")
    finally:
        await stop_bot()

if __name__ == '__main__':
    # Veritabanını oluştur
    create_database()

    # Ctrl+C ile düzgün kapatma
    def signal_handler(sig, frame):
        global should_stop
        should_stop = True
        print("\nKapatma sinyali alındı. Lütfen bekleyin...")

    signal.signal(signal.SIGINT, signal_handler)

    # `static` klasörünü oluştur
    if not os.path.exists('static'):
        os.makedirs('static')

    # Ana programı başlat
    asyncio.run(main())
