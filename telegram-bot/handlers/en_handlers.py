from aiogram import Dispatcher, types

async def register_en_commands(dp: Dispatcher, user_id: int):
    @dp.message(lambda message: message.from_user.id == user_id and message.text == "Hello")
    async def en_hello(message: types.Message):
        await message.answer("Hello! This message is from en_handlers.py")