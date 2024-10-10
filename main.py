import os
import sqlite3
from telegram import Update, Bot
from telegram.constants import ParseMode
from telegram.ext import Dispatcher
from flask import Flask, request, jsonify, send_from_directory
import json

# Flask uygulaması
app = Flask(__name__)

# Telegram Bot token
TOKEN = '6977513645:AAHXgoaBI8mWIdbvT-udEY1M6rvLGSGuQNc'
bot = Bot(token=TOKEN)
dispatcher = Dispatcher(bot=bot, update_queue=None, use_context=False)

# Proje URL'si
PROJECT_URL = "https://erwtoken.onrender.com"

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

# Bot komut işleyicileri
def handle_start(update: Update):
    try:
        user_id = update.message.from_user.id
        user = get_user_data(user_id)

        if not user:
            update_user_data(user_id, 0, 0, 1)

        game_url = f"{PROJECT_URL}/?user_id={user_id}"
        message = f"🌍 EcoReward Orman Oyunu'na hoş geldiniz! 🌍\n\nOyunu oynamak için aşağıdaki bağlantıya tıklayın:\n{game_url}"
        bot.send_message(chat_id=user_id, text=message, parse_mode=ParseMode.HTML)
        print(f"Start komutu başarıyla işlendi. User ID: {user_id}")
        return True
    except Exception as e:
        print(f"Start komutunda hata: {str(e)}")
        return False

def handle_stats(update: Update):
    try:
        user_id = update.message.from_user.id
        user = get_user_data(user_id)

        if user:
            message = f"📊 İstatistikleriniz:\n\nPuan: {user['score']}\nERW Token: {user['erw_tokens']}\nSeviye: {user['level']}"
        else:
            message = "Henüz oyun oynamadınız. /start komutunu kullanarak oyuna başlayabilirsiniz."

        bot.send_message(chat_id=user_id, text=message)
        print(f"Stats komutu başarıyla işlendi. User ID: {user_id}")
        return True
    except Exception as e:
        print(f"Stats komutunda hata: {str(e)}")
        return False

# Flask route'ları
@app.route('/')
def serve_index():
    try:
        current_dir = os.path.dirname(os.path.abspath(__file__))
        return send_from_directory(current_dir, 'index.html')
    except Exception as e:
        print(f"Index servis hatası: {str(e)}")
        return "Sayfa yüklenirken bir hata oluştu", 500

@app.route(f'/{TOKEN}', methods=['POST'])
def webhook():
    try:
        update = Update.de_json(request.get_json(), bot)
        
        if not update or not update.message:
            return jsonify({"status": "error", "message": "Invalid update"}), 400

        text = update.message.text
        
        if text == '/start':
            handle_start(update)
        elif text == '/stats':
            handle_stats(update)
            
        return jsonify({"status": "success"}), 200
    except Exception as e:
        print(f"Webhook hatası: {str(e)}")
        return jsonify({"status": "error", "message": str(e)}), 500

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

# Veritabanını oluştur
create_database()

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=int(os.environ.get('PORT', 5003)))
