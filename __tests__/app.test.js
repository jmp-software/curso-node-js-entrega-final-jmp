import request from "supertest";
import app from "../app.js";

// *** Prueba raíz con "/" y sin ningún endpoint  *** //
describe("App - Pruebas básicas", () => {
    test("GET / - Debería devolver 404 para ruta raíz", async () => {
        const response = await request(app).get("/") || request(app).get("");
        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty("error", "Ruta no encontrada");
    });

    // *** Prueba raíz sin "/" y sin ningún endpoint  *** //
    test("GET '' (vacío) - Debería devolver 404 para ruta vacía", async () => {
        const response = await request(app).get("");
        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty("error", "Ruta no encontrada");
    });

    // *** Ruta inexistente *** //
    test("GET /ruta-inexistente - Debería devolver 404", async () => {
        const response = await request(app).get("/ruta-inexistente");
        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty("error", "Ruta no encontrada");
        expect(response.body.message).toContain("GET /ruta-inexistente no existe");
    });

    // *** Crea producto *** //
    test("POST /api/products (crea producto nuevo) - Debería devolver 401 sin autenticación", async () => {
        const response = await request(app)
            .post("/api/products")
            .send({
                name: "Mazes Of Fate",
                short_name: "Mazes Of Fate",
                description: "El primer juego argentino y latinoamericano para una consola portatil, creado por Javier Otaegui bajo el sello de su empresa llamada Sabarasa",
                price: 120999.99,
                stock: 15,
                platform: "Game Boy Advance",
                media: "Cartucho",
                image: "https://upload.wikimedia.org/wikipedia/en/7/7a/Mazes_of_Fate_GBA.jpg?_=20170521000113"
            });
        expect(response.status).toBe(401);
        expect(response.body).toHaveProperty("error", "No está autorizado.");
        expect(response.body.message).toContain("No fue proporcionado el token de autenticación.");
    });

    // *** Ruta/endpoint para autenticación/logueo incompleto (el completo es "/auth/login") *** //
    test("GET /auth - Debería devolver 404 para ruta sin endpoint específico", async () => {
        const response = await request(app).get("/auth");
        expect(response.status).toBe(404);
    });
}); 