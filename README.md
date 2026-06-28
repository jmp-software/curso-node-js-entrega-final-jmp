# 📦 API para tienda de videojuegos y programas retro - Curso Node.js de Talento Tech - Comisión 26134

Esta es una **API REST** desarrollada como **proyecto final** del curso **Node.js** del programa **Talento Tech**.

La aplicación permite gestionar un catálogo de videojuegos y programas retro mediante operaciones de **listar, buscar, crear, actualizar y eliminar productos**, utilizando **Node.js**, **Express** y **Firestore**.

Además, incorpora un sistema de almacenamiento alternativo mediante un archivo JSON local, lo que permite ejecutar el proyecto sin necesidad de configurar Firebase.

---

## ✨ Características

- CRUD
- Persistencia mediante Firestore
- Modo alternativo utilizando un archivo JSON local
- API REST construida con Express

---

## 📋 Requisitos

- <img src="https://icon.icepanel.io/Technology/svg/Node.js.svg" alt="Node.JS" width="20rem"> Node.js 18 o superior
- <img src="https://icon.icepanel.io/Technology/svg/NPM.svg" alt="Node.JS" width="20rem"> npm

Verificar instalación:

```bash
node -v
npm -v
```

---

## ⬇️ Instalación

Clonar el repositorio:

```bash
git clone https://github.com/jmp-software/curso-node-js-entrega-final-jmp.git
cd curso-node-js-entrega-final-jmp
```

Instalar dependencias:

```bash
npm install
```

---

## ⚙️ Configuración

Creá un archivo `.env` en la raíz del proyecto.

### 🔥 Utilizando Firebase Firestore

```env
PORT=3000

JWT_SECRET=clave_secreta_jwt

USE_FIREBASE=true

FIREBASE_API_KEY=clave_api_firebase
FIREBASE_AUTH_DOMAIN=dominio_autenticación_firebase
FIREBASE_PROJECT_ID=id_proyecto_firebase
FIREBASE_STORAGE_BUCKET=bucket_almacenamiento_firebase
FIREBASE_MESSAGING_SENDER_ID=id_remitente_mensajeria_firebase
FIREBASE_APP_ID=id_aplicación_firebase
```

### 🗝️ Variables de entorno

| Variable                     | Descripción                                                                   |
| ---------------------------- | ----------------------------------------------------------------------------- |
| PORT                         | Puerto donde se ejecutará la API                                              |
| JWT_SECRET                   | Clave utilizada para firmar y verificar tokens JWT                            |
| USE_FIREBASE                 | Define el proveedor de datos (`true` para Firestore, `false` para JSON local) |
| FIREBASE_API_KEY             | API Key del proyecto Firebase                                                 |
| FIREBASE_AUTH_DOMAIN         | Dominio de autenticación de Firebase                                          |
| FIREBASE_PROJECT_ID          | ID del proyecto Firebase                                                      |
| FIREBASE_STORAGE_BUCKET      | Bucket de almacenamiento de Firebase                                          |
| FIREBASE_MESSAGING_SENDER_ID | ID del servicio de mensajería                                                 |
| FIREBASE_APP_ID              | Identificador de la aplicación Firebase                                       |

> **Nota:** Para probar la aplicación rápidamente no es necesario crear un proyecto Firebase. Basta con configurar `USE_FIREBASE=false` para utilizar la base de datos local.

### 🔄 Cambiar entre Firestore y JSON local

Si no querés configurar Firebase, podés utilizar el archivo JSON local modificando la siguiente variable:

```env
USE_FIREBASE=
```

Valores posibles:

```env
USE_FIREBASE=true
```

o

```env
USE_FIREBASE=false
```

> No es necesario ningún otro cambio en el código, basta con modificar esta variable de entorno **USE_FIREBASE**

---

## ▶️ Ejecutar la aplicación

### 🔥 Usando colección firebase

```bash
npm run dev
```

o

```bash
npm run start
```

### 🧩 Usando json local

```bash
npm run start:json
```

### 🚢 Puerto local por defecto

```text
http://localhost:3000
```

---

## 📡 Endpoints

### 🔐 Autenticación de usuario

La API cuenta con un sistema de autenticación basado en **JWT (JSON Web Token)**, el cual permite proteger rutas y validar el acceso de usuarios administradores.

Para obtener un token de acceso, se debe realizar una solicitud `POST` al endpoint de login con las credenciales del administrador.

```http
POST /auth/login
```

Cuerpo:

```json
{
	"email": "administrador@vintageware.com.ar",
	"password": "admin_1234"
}
```

Respuesta:

```json
{
	"message": "¡Logueo exitoso!",
	"token": "eyJhbGciOiJIUzI1NiIsInR5c...",
	"user": {
		"email": "administrador@vintageware.com.ar",
		"role": "admin"
	}
}
```

### 📦 Obtener todos los productos

```http
GET /api/products
```

Respuesta:

```json
[
  {
    "id": "DJP91YZ4C5MdXyrMMEQO",
    "description": "El primer juegos argentino y latinoamericano para una consola portatil",
    "media": "Cartucho",
    "image": "https://i.ibb.co/N2Q4WmyG/photo-5.png",
    "title": "Maze Of Fate",
    "price": 120999.99,
    "short_title": "Mazes Of fate",
    "platform": "Game Boy Advance",
    "stock": 15
  },
  {
    "id": "TQGsM4UafsOo9lN0m6k2",
    "platform": "MS-DOS",
    "stock": 90,
    "short_title": "Super Menem",
    "price": 12000,
    "title": "Super Menem (Ingrese al Primer Mundo)",
    "description": "Videojuego de aventura argentino distribuido por una revista de la época",
    "media": "Disquete 5¼",
    "image": "https://i.ibb.co/gMVCtymZ/hqdefault.jpg"
  },
  ...
]
```

### 🔎 Obtener un producto por ID

```http
GET /api/products/:id
```

### ➕ Crear un producto

```http
POST /api/products/create
```

Cuerpo:

```json
{
	"title": "Mazes Of Fate",
	"short_title": "Mazes Of Fate",
	"description": "El primer juego argentino y latinoamericano para una consola portatil, creado por Javier Otaegui bajo el sello de su empresa llamada Sabarasa",
	"price": 120999.99,
	"stock": 15,
	"platform": "Game Boy Advance",
	"media": "Cartucho",
	"image": "https://upload.wikimedia.org/wikipedia/en/7/7a/Mazes_of_Fate_GBA.jpg?_=20170521000113"
}
```

### ✏️ Actualizar un producto

```http
PATCH /api/products/:id
```

Tenés que enviar el JSON con todos campos para sobreescribir los datos.

### 🗑️ Eliminar un producto

```http
DELETE /api/products/:id
```

<br/>

> ⚠️ Recordá siempre realizar todas las solicitudes con un **bearer token** válido obtenido con el logueo.

---

## 🌐 API en <img src="https://icon.icepanel.io/Technology/png-shadow-512/Vercel.png" alt="Vercel" style="width: 1.75rem; filter: drop-shadow(0 0 0.25rem rgba(255, 255, 255, 0.65));" /> Vercel

### 🔗 URL base

```text
https://curso-node-js-entrega-final-jmp.vercel.app
```

### 🔐 Autenticación

```text
POST /auth/login
https://curso-node-js-entrega-final-jmp.vercel.app/auth/login
```

### 📦 Productos

```text
Listar todos los productos:

GET /api/products
https://curso-node-js-entrega-final-jmp.vercel.app/api/products
```

```text
Obtener producto por ID:

GET /api/products/:id
https://curso-node-js-entrega-final-jmp.vercel.app/api/products/:id
```

```text
Crear producto:

POST /api/products/create
https://curso-node-js-entrega-final-jmp.vercel.app/api/products/create
```

```text
Actualizar producto:

PATCH /api/products/:id
https://curso-node-js-entrega-final-jmp.vercel.app/api/products/:id
```

```text
Eliminar producto por ID:

DELETE /api/products/:id
https://curso-node-js-entrega-final-jmp.vercel.app/api/products/:id
```

---

## 📁 Estructura del proyecto

```text
project/
│
├── __tests__/
│   ├── app.test.js
│   ├── auth.test.js
│   └── product.test.js
│
├── src/
│   ├── config/
│   ├── controllers/
│   ├── middlewares/
│   ├── models/
│   ├── routes/
│   ├── seeders/
│   ├── services/
│   └── utils/
│
├── .env.example
├── README.md
├── database-firestore.js
├── database-local.js
├── index.js
├── package-lock.json
├── package.json
└── README.md
```

---

## 🧪 Pruebas rápidas con CURL en <img src="https://icon.icepanel.io/Technology/svg/Linux.svg" alt="Linux" width="20rem"> Linux

Primero hay que loguearse:

```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  --data-raw '{"email":"administrador@vintageware.com.ar","password":"admin_1234"}'
```

Respuesta:

```json
{
	"message": "¡Logueo exitoso!",
	"token": "eyJhbGciOiJIUzI1NiIsInR5c...",
	"user": { "email": "administrador@vintageware.com.ar", "role": "admin" }
}
```

Obtener todos los productos (agregando el token):

```bash
curl http://localhost:3000/api/products \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5c..."
```

Crear un registro:

```bash
curl -X POST http://localhost:3000/api/products/create \
-H "Content-Type: application/json" \
-H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5c..." \
-d '{
  "title": "Regnum Online",
  "short_title": "Regnum Online",
  "description": "El primer MMORPG argentino de alcance internacional, lanzado en 2007 y desarrollado por NGD Studios (actualmente Nimble Giant Entertainment). Ambientado en un mundo de fantasía medieval, enfrenta a tres reinos en una guerra permanente de Reino contra Reino (RvR).",
  "price": 0,
  "stock": 83255,
  "platform": "PC",
  "media": "Descarga Digital",
  "image": "https://upload.wikimedia.org/wikipedia/en/0/0e/Champions_of_Regnum_cover.jpg"
}'
```

---

## 🧪 Pruebas rápidas con CURL en <img src="https://icon.icepanel.io/Technology/svg/Windows-8.svg" alt="Windows 10" width="20rem"> Windows

El logueo:

```bash
curl -X POST http://localhost:3001/auth/login -H "Content-Type: application/json" -d "{\"email\":\"administrador@vintageware.com.ar\",\"password\":\"admin_1234\",\"role\":\"admin\"}"
```

Respuesta:

```json
{
	"message": "¡Logueo exitoso!",
	"token": "eyJhbGciOiJIUzI1NiIsInR5c...",
	"user": { "email": "administrador@vintageware.com.ar", "role": "admin" }
}
```

Obtener todos los productos (agregando el token):

```bash
curl -X GET http://localhost:3001/api/products/ -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5c..."
```

Obtiene producto or ID:

```bash
curl -X GET http://localhost:3001/api/products/Orho94djDZo... -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5c..."
```

---

## 🖥️ Aclaraciones sobre la consola de <img src="https://icon.icepanel.io/Technology/svg/Windows-8.svg" alt="Windows 10" width="20rem"> Windows

Los scripts definidos en el **_`package.json`_** de este proyecto utilizan sintaxis propia de **Bash**, por ejemplo:

```text
USE_FIREBASE=false node index.js
````

Para que estos scripts funcionen correctamente en Windows, es necesario configurar el **shell** de la terminal/consola, para que los ejecute correctamente. En este ejemplo asumimos que está instalado **Git BASH**:

```bash
npm config set script-shell "C:\\Program Files\\Git\\bin\\bash.exe"
```

> ⚠️ Abrir una terminal Git Bash no siempre es suficiente. Lo importante es que **npm** utilice el shell Bash al ejecutar los scripts definidos en el `package.json`.

Una vez realizada esta configuración, los comandos del proyecto podrán ejecutarse normalmente:

```bash
npm run start
npm run start:json
npm run dev
npm run test
```

### 💡 Alternativa

Si no querés depender de Bash, los scripts podrían adaptarse para utilizar el paquete `cross-env`, que permite definir variables de entorno de forma compatible con Windows, Linux y macOS.

---

## 🛠️ Tecnologías utilizadas

- <img src="https://icon.icepanel.io/Technology/svg/Node.js.svg" alt="Node.JS" width="20rem"> Node.js 
- <img src="https://icon.icepanel.io/Technology/png-shadow-512/Express.png" alt="Express" width="20rem" style=" filter: drop-shadow(0 0 0.25rem rgba(255, 255, 255, 0.65));"> Express
- <img src="https://icon.icepanel.io/Technology/svg/Firebase.svg" alt="Firebase" width="20rem"> Firebase Firestore
- <img src="https://raw.githubusercontent.com/motdotla/dotenv/master/dotenv.svg" alt=".env" width="20rem"> Dotenv
- 🛡️ CORS
- 🪪 JWT Json Web Token
- <img src="https://icon.icepanel.io/Technology/svg/Jest.svg" alt="jest" width="20rem"> Jest (testeo)
- 🌐 Supertest (testeo)
- <img src="https://icon.icepanel.io/Technology/svg/Nodemon.svg" alt="nodemon " width="20rem"> Nodemon 
---

## 📄 Licencia

Este proyecto se desarrolló con fines educativos como parte de un curso académico y se distribuye bajo la licencia MIT.
