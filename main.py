import random
import time
from telegram import Update, InlineKeyboardButton, InlineKeyboardMarkup, WebAppInfo
from telegram.ext import Application, CommandHandler, CallbackQueryHandler, ContextTypes

# Sabitler
TREES = ['🌳', '🌴', '🌲', '🌿', '🍃']
RARE_TREES = ['🍎', '🍐', '🍊', '🥥', '🌺']

# Global değişkenler
players = {}
levels = {}
erw_tokens = {}
forests = {}
total_users = 0

def get_header():
    return f"EcoReward | Game\n{total_users:,} monthly users\n\n"

async def start(update: Update, context: ContextTypes.DEFAULT_TYPE):
    global total_users
    user_id = update.effective_user.id

    if user_id not in players:
        total_users += 1
        players[user_id] = 0
        levels[user_id] = 1
        erw_tokens[user_id] = 0
        forests[user_id] = []

    web_app = WebAppInfo(url="https://sayangku.github.io/erwtoken/")  # Web uygulamanızın URL'sini buraya ekleyin
    keyboard = [[InlineKeyboardButton("Oyunu Başlat", web_app=web_app)]]
    reply_markup = InlineKeyboardMarkup(keyboard)

    message = (
        f"{get_header()}"
        f"EcoReward Orman Oyunu'na hoş geldiniz!\n\n"
        f"Oyunu başlatmak için aşağıdaki butona tıklayın.\n"
        f"Ağaçlara tıklayarak puan kazanın ve ormanı büyütün!\n"
        f"Nadir ağaçları ({' '.join(RARE_TREES)}) bulun, ekstra puan kazanın!\n"
        f"Her 100 puan için 1 ERW token alırsınız!\n"
        f"Her 10 ERW token için 1 seviye atlarsınız!")

    await update.message.reply_text(text=message, reply_markup=reply_markup)

async def status(update: Update, context: ContextTypes.DEFAULT_TYPE):
    user_id = update.effective_user.id
    message = (
        f"🌍 EcoReward Orman Oyunu 🌍\n"
        f"Seviye: {levels.get(user_id, 1)} 🏆\n"
        f"Puanınız: {players.get(user_id, 0)}\n"
        f"ERW Token Bakiyeniz: {erw_tokens.get(user_id, 0)}\n"
        f"Ormanınızdaki Ağaç Sayısı: {len(forests.get(user_id, []))} 🌳\n\n"
        f"Oyunu oynamak için /start komutunu kullanın!"
    )
    await update.message.reply_text(message)

async def leaderboard(update: Update, context: ContextTypes.DEFAULT_TYPE):
    sorted_users = sorted(levels.items(), key=lambda x: x[1], reverse=True)
    leaderboard_text = f"🏆 En İyi 10 Oyuncu (Seviye) 🏆\n\n"

    for i, (user_id, level) in enumerate(sorted_users[:10], start=1):
        try:
            user = await context.bot.get_chat(user_id)
            username = user.first_name
        except Exception:
            username = f"Oyuncu {user_id}"

        leaderboard_text += f"{i}. {username} - Seviye: {level}\n"

    await update.message.reply_text(leaderboard_text)

async def help_command(update: Update, context: ContextTypes.DEFAULT_TYPE):
    help_text = (
        "EcoReward Orman Oyunu Komutları:\n\n"
        "/start - Oyunu başlat\n"
        "/status - Durumunuzu görüntüleyin\n"
        "/leaderboard - Lider tablosunu görüntüleyin\n"
        "/help - Bu yardım mesajını görüntüleyin"
    )
    await update.message.reply_text(help_text)

async def button(update: Update, context: ContextTypes.DEFAULT_TYPE):
    query = update.callback_query
    await query.answer()
    # Button işlevselliği burada uygulanabilir

def main():
    application = Application.builder().token("6977513645:AAHXgoaBI8mWIdbvT-udEY1M6rvLGSGuQNc").build()

    application.add_handler(CommandHandler("start", start))
    application.add_handler(CommandHandler("status", status))
    application.add_handler(CommandHandler("leaderboard", leaderboard))
    application.add_handler(CommandHandler("help", help_command))
    application.add_handler(CallbackQueryHandler(button))

    application.run_polling()

if __name__ == '__main__':
    main()