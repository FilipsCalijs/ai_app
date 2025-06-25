from aiogram import Dispatcher, types

async def register_ru_commands(dp: Dispatcher, user_id: int):
    @dp.message(lambda message: message.from_user.id == user_id and message.text == "Привет")
    async def ru_hello(message: types.Message):
        await message.answer("Привет! Это сообщение из ru_handlers.py")