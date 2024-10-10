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

# Diğer importlar ve konfigürasyonlar aynı kalacak...

def get_db_connection():
    try:
        conn = psycopg2.connect(DATABASE_URL)
        conn.autocommit = True  # Otomatik commit ekledik
        logger.info("Veritabanına bağlantı kuruldu.")
        return conn
    except Exception as e:
        logger.error(f"Veritabanı bağlantısında hata: {e}")
        raise

def get_user_data(telegram_id):
    try:
        conn = get_db_connection()
        with conn.cursor() as cur:
            cur.execute('''
                SELECT id, telegram_id, score, erw_tokens, level 
                FROM users 
                WHERE telegram_id = %s
            ''', (telegram_id,))
            user = cur.fetchone()
            if user:
                # Tuple'ı sözlüğe çeviriyoruz
                return {
                    'id': user[0],
                    'telegram_id': user[1],
                    'score': user[2],
                    'erw_tokens': user[3],
                    'level': user[4]
                }
            return None
    except Exception as e:
        logger.error(f"Kullanıcı verisi alınırken hata: {e}")
        return None
    finally:
        conn.close()

def update_user_data(telegram_id, score, erw_tokens, level):
    try:
        conn = get_db_connection()
        with conn.cursor() as cur:
            cur.execute('''
                INSERT INTO users (telegram_id, score, erw_tokens, level) 
                VALUES (%s, %s, %s, %s)
                ON CONFLICT (telegram_id) DO UPDATE 
                SET score = EXCLUDED.score, 
                    erw_tokens = EXCLUDED.erw_tokens, 
                    level = EXCLUDED.level
                RETURNING id, telegram_id, score, erw_tokens, level
            ''', (telegram_id, score, erw_tokens, level))
            updated_user = cur.fetchone()
            conn.commit()
            logger.info(f"Kullanıcı verileri güncellendi: {updated_user}")
    except Exception as e:
        logger.error(f"Kullanıcı verisi güncellenirken hata: {e}")
        conn.rollback()
    finally:
        conn.close()

# Start komutunu güncelleyelim
async def start(update: Update, context):
    logger.info("Start komutu alındı!")
    try:
        user_id = update.effective_user.id
        logger.info(f"Kullanıcı ID: {user_id}")
        
        # Önce kullanıcıyı kontrol edelim
        user = get_user_data(user_id)
        logger.info(f"Kullanıcı verileri: {user}")

        if not user:
            # Kullanıcı yoksa yeni kayıt oluştur
            update_user_data(user_id, 0, 0, 1)
            logger.info(f"Yeni kullanıcı oluşturuldu: {user_id}")

        game_url = f"{PROJECT_URL}/?user_id={user_id}"
        logger.info(f"Oluşturulan oyun URL'si: {game_url}")
        
        message = (
            f"🌍 EcoReward Orman Oyunu'na hoş geldiniz! 🌍\n\n"
            f"Oyunu oynamak için aşağıdaki bağlantıya tıklayın:\n{game_url}"
        )
        
        await update.message.reply_text(message, parse_mode=ParseMode.HTML)
    except Exception as e:
        logger.error(f"Start komutunda hata oluştu: {e}")
        await update.message.reply_text("Üzgünüm, bir hata oluştu. Lütfen daha sonra tekrar deneyin.")
