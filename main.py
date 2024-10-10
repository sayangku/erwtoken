import os
import psycopg2
from telegram.ext import Application, CommandHandler
from telegram.constants import ParseMode
from telegram import Update
from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import threading
import asyncio
import nest_asyncio
import signal
import logging

# Loglama konfigürasyonu
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

# nest_asyncio'yu etkinleştir
nest_asyncio.apply()

# Flask uygulaması
app = Flask(__name__, static_folder='static')
CORS(app)

# Telegram API kimlik bilgileri
API_ID = '29454561'
API_HASH = '8c3719453c1f1751608459d2d42c5d66'
TOKEN = '6977513645:AAHXgoaBI8mWIdbvT-udEY1M6rvLGSGuQNc'

# Proje URL'si (Render'ın URL'si)
PROJECT_URL = "https://erwtoken.onrender.com"

# Global değişkenler
application = None
should_stop = False

# Veritabanı bağlantı bilgileri (Render'dan alınacak)
DATABASE_URL = "postgresql://veritabani2_user:zjXJo4MqrVDpqYHkz2Dm3LPjSSf7aoeT@dpg-cs3sn13qf0us73dv3if0-a.oregon-postgres.render.com/veritabani2" 

# Veritabanı fonksiyonları
def get_db_connection():
    conn = psycopg2.connect(DATABASE_URL)
    return conn

def update_user_data(telegram_id, score, erw_tokens, level):
    conn = get_db_connection()
    with conn.cursor() as cur:
        cur.execute('''
            INSERT INTO users (telegram_id, score, erw_tokens, level) 
            VALUES (%s, %s, %s, %s)
            ON CONFLICT (telegram_id) DO UPDATE 
            SET score = EXCLUDED.score, erw_tokens = EXCLUDED.erw_tokens, level = EXCLUDED.level
        ''', (telegram_id, score, erw_tokens, level))
    conn.commit()
    conn.close()

def get_user_data(telegram_id):
    conn = get_db_connection()
    with conn.cursor() as cur:
        cur.execute('SELECT * FROM users WHERE telegram_id = %s', (telegram_id,))
        user = cur.fetchone()
    conn.close()
    return user

# Bot komutları
async def start(update: Update, context):
    logger.info("Start komutu alındı!")
    try:
        user_id = update.effective_user.id
        logger.info(f"Kullanıcı ID: {user_id}")
        user = get_user_data(user_id)
        logger.info(f"Kullanıcı verileri: {user}")

        if not user:
            update_user_data(user_id, 0, 0, 1)

        game_url = f"{PROJECT_URL}/?user_id={user_id}"
        logger.info(f"Oluşturulan oyun URL'si: {game_url}")
        message = f"🌍 EcoReward Orman Oyunu'na hoş geldiniz! 🌍\n\nOyunu oynamak için aşağıdaki bağlantıya tıklayın:\n{game_url}"
        await update.message.reply_text(message, parse_mode=ParseMode.HTML)
    except Exception as e:
        logger.error(f"Start komutunda hata oluştu: {e}")
        await update.message.reply_text("Üzgünüm, bir hata oluştu. Lütfen daha sonra tekrar deneyin.")

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
        logger.error(f"Stats komutunda hata oluştu: {e}")

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

    # Webhook'u ayarlama
    await application.set_webhook(url="https://erwtoken.onrender.com/webhook") 

    await application.initialize()
    await application.start()

    logger.info("Bot başarıyla başlatıldı!")

    return application

async def stop_bot():
    global application
    if application:
        await application.stop()
        logger.info("Bot durduruldu!")

# Flask route'ları
@app.route('/')
def index():
    return send_from_directory('static', 'index.html')

@app.route('/webhook', methods=['POST'])
def webhook():
    update = request.get_json()
    logger.info(f"Webhook isteği alındı: {update}")

    message = update.get('message', {}).get('text')
    if message:
        if message == "/start":
            user_id = update.get('message', {}).get('from', {}).get('id')
            game_url = f"{PROJECT_URL}/?user_id={user_id}"
            logger.info(f"Kullanıcıya yönlendirme URL'si: {game_url}")
            return jsonify({"message": f"Oyunu oynamak için şu bağlantıya tıklayın: {game_url}"}), 200 

    return jsonify({"status": "ok"}), 200 

@app.route('/update_score', methods=['POST'])
def update_score():
    data = request.get_json()
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
    await setup_bot()

    flask_thread = threading.Thread(target=run_flask)
    flask_thread.daemon = True
    flask_thread.start()

    logger.info("Flask uygulaması ayrı bir thread'de başlatıldı.")

    try:
        while not should_stop:
            await asyncio.sleep(1)
    except KeyboardInterrupt:
        logger.info("\nUygulama kapatılıyor...")
    finally:
        await stop_bot()

if __name__ == '__main__':
    # Veritabanı tablosu oluşturma
    conn = get_db_connection()
    with conn.cursor() as cur:
        cur.execute('''
            CREATE TABLE IF NOT EXISTS users (
                id SERIAL PRIMARY KEY,
                telegram_id INTEGER UNIQUE,
                score INTEGER DEFAULT 0,
                erw_tokens INTEGER DEFAULT 0,
                level INTEGER DEFAULT 1
            )
        ''')
    conn.commit()
    conn.close()

    def signal_handler(sig, frame):
        global should_stop
        should_stop = True
        logger.info("\nKapatma sinyali alındı. Lütfen bekleyin...")

    signal.signal(signal.SIGINT, signal_handler)

    if not os.path.exists('static'):
        os.makedirs('static')

    asyncio.run(main())
