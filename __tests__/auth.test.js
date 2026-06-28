import request from "supertest";
import app from "../app.js";

describe("Auth - Login tests", () => {

    // *** Logueo exitoso *** //
    test("POST /auth/login - debería loguear correctamente con credenciales válidas", async () => {
        const response = await request(app)
            .post("/auth/login")
            .send({
                email: "administrador@vintageware.com.ar",
                password: "admin_1234"
            });
        expect(response.status).toBe(200);
        expect(response.body).toBeDefined();
        expect(response.body.token).toBeDefined();
        expect(typeof response.body.token).toBe("string");
    });

    // *** Dirección de correo incorrecta *** //
    test("POST /auth/login - debería fallar con email inexistente", async () => {
        const response = await request(app)
            .post("/auth/login")
            .send({
                email: "adminirador@viageware.com",
                password: "admin_1234"
            });
        expect(response.status).toBe(401);
        expect(response.body).toBeDefined();
        expect(response.body.message).toBeDefined();
    }, 10000);

    // *** Contraseña de correo incorrecta *** //
    test("POST /auth/login - debería fallar con password incorrecta", async () => {
        const response = await request(app)
            .post("/auth/login")
            .send({
                email: "administrador@vintageware.com.ar",
                password: "admin_12345"
            });

        expect(response.status).toBe(401);
        expect(response.body).toBeDefined();
        expect(response.body.message).toBeDefined();
    }, 10000);

    // *** Campos faltantes *** //

    // Falta contraseña
    test("POST /auth/login - debería fallar si faltan campos", async () => {
        const response = await request(app)
            .post("/auth/login")
            .send({
                email: "administrador@vintageware.com",
            });

        expect(response.status).toBe(400);
        expect(response.body).toBeDefined();
        expect(response.body.message).toBeDefined();
    }, 10000);

    // Falta correo
    test("POST /auth/login - debería fallar si faltan campos", async () => {
        const response = await request(app)
            .post("/auth/login")
            .send({
                password: "admin_1234"
            });
        expect(response.status).toBe(400);
        expect(response.body).toBeDefined();
        expect(response.body.message).toBeDefined();
    }, 10000);

});