import logging
import os
from telegram import Update
from telegram.ext import ApplicationBuilder, ContextTypes, CommandHandler

# Configure logging
logging.basicConfig(
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    level=logging.INFO
)

# Set up the bot token 
TOKEN = "6977513645:AAHXgoaBI8mWIdbvT-udEY1M6rvLGSGuQNc" 

# Define the /start command handler
async def start(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    """Sends a message when the command /start is issued."""
    await update.message.reply_text(f"Merhaba Emrah!")


if __name__ == '__main__':
    # Create the Application and add handlers
    application = ApplicationBuilder().token(TOKEN).build()

    application.add_handler(CommandHandler("start", start))

    # Start the bot
    application.run_polling()
