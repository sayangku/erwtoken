from flask import Flask, request
from telegram import Update
from telegram.ext import Updater, CommandHandler, MessageHandler, Filters
import os

# Token'ınızı buraya yerleştirin
TOKEN = '6977513645:AAHXgoaBI8mWIdbvT-udEY1M6rvLGSGuQNc'

# Flask uygulamasını oluşturun
app = Flask(__name__)

# Telegram Bot API'sini başlatın
updater = Updater(TOKEN, use_context=True)
dispatcher = updater.dispatcher

# /start komutunu işleyen fonksiyon
def start(update: Update, context):
    update.message.reply_text(
        'Merhaba! Ben bir Telegram botuyum. Bana /help yazın.'
    )

# Gelen mesajları işleyen fonksiyon
def echo(update: Update, context):
    update.message.reply_text(update.message.text)

# Webhook endpoint'i
@app.route('/', methods=['POST'])
def webhook():
    update = Update.de_json(request.get_json(force=True), bot=updater.bot)
    dispatcher.process_update(update)
    return 'ok'

if __name__ == '__main__':
    # Telegram botunu başlatın
    dispatcher.add_handler(CommandHandler('start', start))
    dispatcher.add_handler(MessageHandler(Filters.text & ~Filters.command, echo))
    updater.start_webhook(
        listen='0.0.0.0',
        port=int(os.environ.get('PORT', '8443')),
        url_path=TOKEN
    )

    # Flask uygulamasını çalıştırın
    app.run(debug=True)