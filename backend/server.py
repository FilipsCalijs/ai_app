from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.responses import StreamingResponse
from PIL import Image
import io

app = FastAPI()

@app.post("/process_image")
async def process_image(file: UploadFile = File(...)):
    if not file.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="Файл должен быть изображением")

    contents = await file.read()
    image = Image.open(io.BytesIO(contents))
    image = image.resize((100, 100))

    buf = io.BytesIO()
    image.save(buf, format="JPEG")
    buf.seek(0)

    return StreamingResponse(buf, media_type="image/jpeg")