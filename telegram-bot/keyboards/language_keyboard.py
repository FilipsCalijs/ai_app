from aiogram.types import ReplyKeyboardMarkup, KeyboardButton

def get_language_keyboard():
    keyboard = ReplyKeyboardMarkup(resize_keyboard=True, one_time_keyboard=True)
    keyboard.add(
        KeyboardButton("🇷🇺 Русский"),
        KeyboardButton("🇬🇧 English")
    )
    return keyboard
