from aiogram import Bot, Dispatcher, types
from aiogram.filters import Command
from aiogram.types import BufferedInputFile
import aiohttp
import asyncio
import io



API_TOKEN = ''
SERVER_URL = 'http://127.0.0.1:8000/process_image'

bot = Bot(token=API_TOKEN)
dp = Dispatcher()

processing_users = set()

@dp.message(Command("start"))
async def cmd_start(message: types.Message):
    print("/Start")
    await message.answer("Привет! Пожалуйста, пришли мне фотографию.")

@dp.message()
async def handle_message(message: types.Message):
    user_id = message.from_user.id

    if user_id in processing_users:
        await message.answer("Пожалуйста, подождите, идёт обработка изображения.")
        return

    if message.photo:
        processing_users.add(user_id)

        photo = message.photo[-1]
        file = await bot.get_file(photo.file_id)
        file_bytes = await bot.download_file(file.file_path)

        data = aiohttp.FormData()
        data.add_field('file', file_bytes, filename='photo.jpg', content_type='image/jpeg')

        async with aiohttp.ClientSession() as session:
            async with session.post(SERVER_URL, data=data) as resp:
                if resp.status == 200:
                    processed_image_bytes = await resp.read()
                    photo_io = io.BytesIO(processed_image_bytes)
                    photo_io.seek(0)
                    input_file = BufferedInputFile(photo_io.read(), filename="processed.jpg")
                    print("photo uploaded")
                    await message.answer_photo(input_file)
                else:
                    await message.answer("Ошибка при обработке изображения на сервере.")

        processing_users.remove(user_id)
    else:
        await message.answer("Пожалуйста, пришли фотографию.")

async def main():
    await dp.start_polling(bot, skip_updates=True)


if __name__ == '__main__':
    asyncio.run(main())