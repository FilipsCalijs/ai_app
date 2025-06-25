from aiogram import Bot, Dispatcher, types
from aiogram.types import ReplyKeyboardMarkup, KeyboardButton, InlineKeyboardMarkup, InlineKeyboardButton
import asyncio
import os

API_TOKEN = os.getenv("TELEGRAM_API_TOKEN")

bot = Bot(token=API_TOKEN)
dp = Dispatcher()

# Клавиатура с кнопкой "Начать"
start_keyboard = ReplyKeyboardMarkup(
    keyboard=[[KeyboardButton(text="Начать")]],
    resize_keyboard=True
)

# Inline-клавиатура с кнопкой "Согласен"
agree_inline_keyboard = InlineKeyboardMarkup(
    inline_keyboard=[
        [InlineKeyboardButton(text="Согласен", callback_data="agree")]
    ]
)

# Inline-клавиатура выбора языка
language_inline_keyboard = InlineKeyboardMarkup(
    inline_keyboard=[
        [
            InlineKeyboardButton(text="🇷🇺 Русский", callback_data="lang_ru"),
            InlineKeyboardButton(text="🇺🇸 English", callback_data="lang_en")
        ]
    ]
)

user_agreements = set()

@dp.message(lambda message: message.text == "Начать")
async def start_button_handler(message: types.Message):
    await message.answer(
        "Пожалуйста, ознакомьтесь с условиями конфиденциальности:\n\n"
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        reply_markup=agree_inline_keyboard
    )

@dp.callback_query(lambda c: c.data == "agree")
async def agree_callback_handler(callback_query: types.CallbackQuery):
    user_id = callback_query.from_user.id
    user_agreements.add(user_id)
    await callback_query.message.edit_text("Спасибо за согласие! Теперь выберите язык:")
    await callback_query.message.edit_reply_markup(reply_markup=language_inline_keyboard)
    await callback_query.answer()

@dp.message(lambda message: message.from_user.id not in user_agreements and message.text not in ["Начать"])
async def block_without_agreement(message: types.Message):
    await message.answer("Пожалуйста, сначал'Начать' и согласитесь с условиями.")

@dp.callback_query(lambda c: c.data and c.data.startswith("lang_"))
async def language_callback_handler(callback_query: types.CallbackQuery):
    lang_code = callback_query.data.split("_")[1]
    if lang_code == "ru":
        await callback_query.message.answer("Вы выбрали русский язык 🇷🇺")
    elif lang_code == "en":
        await callback_query.message.answer("You selected English 🇺🇸")
    await callback_query.answer()

async def main():
    await dp.start_polling(bot)

if __name__ == "__main__":
    asyncio.run(main())