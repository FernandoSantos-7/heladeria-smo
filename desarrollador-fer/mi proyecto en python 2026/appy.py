from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/dashboard")
def obtener_dashboard():
    return {
        "usuario": "Fernando Santos",
        "estado_servidor": "Operativo",
        "alertas_pendientes": 3,
        "tareas": [
            {"id": 1, "titulo": "Revisar logs de accesos", "prioridad": "Alta", "estado": "Pendiente"},
            {"id": 2, "titulo": "Actualizar dependencias de Node.js", "prioridad": "Media", "estado": "Completado"},
            {"id": 3, "titulo": "Auditar políticas de contraseñas", "prioridad": "Alta", "estado": "Pendiente"}
        ]
    }