import os
import sqlite3
from telegram.ext import Application, CommandHandler
from telegram.constants import ParseMode
from telegram import Update
from flask import Flask, request, jsonify, send_from_directory
import threading
import asyncio
import nest_asyncio
import signal

# nest_asyncio'yu etkinleştir
nest_asyncio.apply()

# Flask uygulaması - static_folder'ı düzgün şekilde ayarla
app = Flask(__name__)

# Telegram API kimlik bilgileri
API_ID = '29454561'
API_HASH = '8c3719453c1f1751608459d2d42c5d66'
TOKEN = '6977513645:AAHXgoaBI8mWIdbvT-udEY1M6rvLGSGuQNc'

# Proje URL'si
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
    try:
        user_id = update.effective_user.id
        user = get_user_data(user_id)

        if not user:
            update_user_data(user_id, 0, 0, 1)

        game_url = f"{PROJECT_URL}/?user_id={user_id}"
        message = f"🌍 EcoReward Orman Oyunu'na hoş geldiniz! 🌍\n\nOyunu oynamak için aşağıdaki bağlantıya tıklayın:\n{game_url}"
        await update.message.reply_text(message, parse_mode=ParseMode.HTML)
        print(f"Start komutu başarıyla işlendi. User ID: {user_id}")
    except Exception as e:
        print(f"Start komutunda hata: {str(e)}")
        await update.message.reply_text("Bir hata oluştu. Lütfen daha sonra tekrar deneyin.")

async def stats(update: Update, context):
    try:
        user_id = update.effective_user.id
        user = get_user_data(user_id)

        if user:
            message = f"📊 İstatistikleriniz:\n\nPuan: {user['score']}\nERW Token: {user['erw_tokens']}\nSeviye: {user['level']}"
        else:
            message = "Henüz oyun oynamadınız. /start komutunu kullanarak oyuna başlayabilirsiniz."

        await update.message.reply_text(message)
        print(f"Stats komutu başarıyla işlendi. User ID: {user_id}")
    except Exception as e:
        print(f"Stats komutunda hata: {str(e)}")
        await update.message.reply_text("İstatistikler alınırken bir hata oluştu. Lütfen daha sonra tekrar deneyin.")

# Flask route'ları
@app.route('/')
def serve_index():
    try:
        current_dir = os.path.dirname(os.path.abspath(__file__))
        return send_from_directory(current_dir, 'index.html')
    except Exception as e:
        print(f"Index servis hatası: {str(e)}")
        return "Sayfa yüklenirken bir hata oluştu", 500

@app.route('/update_score', methods=['POST'])
def update_score():
    try:
        data = request.json
        user_id = data.get('user_id')
        score = data.get('score')
        erw_tokens = data.get('erw_tokens')
        level = data.get('level')

        if all(v is not None for v in [user_id, score, erw_tokens, level]):
            update_user_data(user_id, score, erw_tokens, level)
            return jsonify({"status": "success"}), 200
        return jsonify({"status": "error", "message": "Eksik veri"}), 400
    except Exception as e:
        print(f"Update score hatası: {str(e)}")
        return jsonify({"status": "error", "message": str(e)}), 500

def run_flask():
    app.run(host='0.0.0.0', port=int(os.environ.get('PORT', 5003)))

async def main():
    global application
    
    # Veritabanını oluştur
    create_database()
    
    # Bot'u başlat
    application = Application.builder().token(TOKEN).build()
    application.add_handler(CommandHandler("start", start))
    application.add_handler(CommandHandler("stats", stats))
    
    await application.initialize()
    await application.start()
    
    # Flask'ı ayrı bir thread'de başlat
    flask_thread = threading.Thread(target=run_flask)
    flask_thread.daemon = True
    flask_thread.start()
    
    print("Bot ve Flask uygulaması başlatıldı!")
    
    try:
        while not should_stop:
            await asyncio.sleep(1)
    except KeyboardInterrupt:
        print("\nUygulama kapatılıyor...")
    finally:
        await application.stop()

if __name__ == '__main__':
    # Ctrl+C ile düzgün kapatma
    signal.signal(signal.SIGINT, lambda s, f: setattr(__builtins__, 'should_stop', True))
    
    # Ana programı başlat
    asyncio.run(main())
