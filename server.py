from fastapi import FastAPI, HTTPException
from fastapi.responses import FileResponse
import json
import os

app = FastAPI()
app.port = 8000

# Caminhos dos arquivos
LATEST_JSON_PATH = "./updates/latest.json"
MSI_PATH = "./updates/app_installer.msi"

@app.get("/latest")
async def get_latest():
    if not os.path.exists(LATEST_JSON_PATH):
        raise HTTPException(status_code=404, detail="Arquivo latest.json não encontrado.")
    
    with open(LATEST_JSON_PATH, "r", encoding="utf-8") as file:
        content = json.load(file)  # ← isso aqui carrega como objeto JSON
    
    return content

@app.get("/download")
async def get_installer():
    if not os.path.exists(MSI_PATH):
        raise HTTPException(status_code=404, detail="Arquivo .msi não encontrado.")
    
    return FileResponse(MSI_PATH, media_type="application/octet-stream", filename="app_installer.msi")
