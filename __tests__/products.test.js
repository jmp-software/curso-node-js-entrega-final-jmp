import request from "supertest";
import app from "../app.js";

const errorTokenMessage = "No hay token de autenticación, no se puede realizar la prueba.";
let createdProductId = null;
let authToken = null;

/*
beforeAll(async () => {
    try {
        console.log("Obteniendo token...");

        const loginResponse = await request(app)
            .post("/auth/login")
            .send({
                email: "administrador@vintageware.com.ar",
                password: "admin_1234"
            });

        expect(loginResponse.status).toBe(200);
        console.log(`El estatus del login es: ${loginResponse.status}`);

        // ** Comprobaciones (verifica si hay token) ** // 
        authToken = loginResponse.body.token;
        expect(authToken).toBeDefined();
        expect(authToken).not.toBeNull();
        expect(typeof authToken).toBe("string");
        expect(authToken.length).toBeGreaterThan(0);

        console.log("Token obtenido exitosamente");
        console.log(`Token: ${authToken.substring(0, 20)}...`);

    } catch (error) {
        console.error(" Error intentando obtener token:", error.message);
        throw error;
    }
}, 10000);
*/

// *** Obtiene token con credenciales adecuadas *** //
beforeAll(async () => {
    try {
        const loginResponse = await request(app)
            .post("/auth/login")
            .send({
                email: "administrador@vintageware.com.ar",
                password: "admin_1234"
            });

        if (loginResponse.status !== 200) {
            throw new Error(
                `Login falló. Status: ${loginResponse.status}, body: ${JSON.stringify(loginResponse.body)}`
            );
        }

        const token = loginResponse.body?.token;

        if (!token || typeof token !== "string") {
            throw new Error(
                `Token inválido en el login: ${JSON.stringify(loginResponse.body)}`
            );
        }

        authToken = token;

    } catch (error) {
        console.error("❌ Error en beforeAll (login):", error.message);

        throw error;
    }
}, 10000);

describe("Products - Pruebas de CRUD para productos", () => {

    // *** Obtiene los productos SIN token **** // 
    test("GET /api/products - Debería devolver 401 sin token", async () => {
        const response = await request(app).get("/api/products");
        const jsonResponse = {
            "error": "No está autorizado.",
            "message": "No fue proporcionado el token de autenticación."
        };
        expect(response.status).toBe(401);
        expect(response.body).toEqual(jsonResponse);
    });

    // *** Obtiene los productos con token **** //
    test("GET /api/products - Debería devolver 200 con token válido", async () => {

        const response = await request(app)
            .get("/api/products")
            .set("Authorization", `Bearer ${authToken}`);

        // Verifica respuesta de la API   
        expect(response.status).toBe(200);
        expect(response.body).toBeDefined();
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body.length).toBeGreaterThan(0);

        for (const product of response.body) {

            // ** Comprobaciónes  (comprueba objeto por objeto todos los elementos) ** // 

            // title
            expect(product).toHaveProperty("title");
            expect(typeof product.title).toBe("string");
            expect(product.title.length).toBeGreaterThan(0);

            // short_title
            expect(product).toHaveProperty("short_title");
            expect(typeof product.short_title).toBe("string");
            expect(product.short_title.length).toBeGreaterThan(0);

            // description
            expect(product).toHaveProperty("description");
            expect(typeof product.description).toBe("string");
            expect(product.description.length).toBeGreaterThan(0);

            // price
            expect(product).toHaveProperty("price");
            expect(typeof product.price).toBe("number");
            expect(product.price).toBeGreaterThan(0);

            // stock
            expect(product).toHaveProperty("stock");
            expect(typeof product.stock).toBe("number");
            expect(product.stock).toBeGreaterThanOrEqual(0);

            // platform
            expect(product).toHaveProperty("platform");
            expect(typeof product.platform).toBe("string");

            // media
            expect(product).toHaveProperty("media");
            expect(typeof product.media).toBe("string");

            // image
            expect(product).toHaveProperty("image");
            expect(typeof product.image).toBe("string");
            expect(product.image).toMatch(/^https?:\/\/.+\.(jpg|jpeg|png|gif|webp|svg)/i);

        }
    }, 10000);


    // *** Obtiene producto por id con datos válidos (usa el producto que está primero en la colección de objetos con el índice "[0]") *** // 
    test("GET /api/products/:id - Debería obtener producto por ID", async () => {

        // Primero obtiene el listado completo
        const listResponse = await request(app)
            .get("/api/products")
            .set("Authorization", `Bearer ${authToken}`);

        // Verifica que haya generado bien el listado
        expect(listResponse.status).toBe(200);
        expect(listResponse.body).toBeDefined();
        expect(typeof listResponse.body).toBe("object");
        expect(Array.isArray(listResponse.body)).toBe(true);

        // Si genera el listado correctamente, guarda el primer objeto
        const firstProduct = listResponse.body[0];
        const productId = firstProduct.id;

        const response = await request(app)
            .get(`/api/products/${productId}`)
            .set("Authorization", `Bearer ${authToken}`);

        // Verifica respuesta de la API   
        expect(response.status).toBe(200);
        expect(response.body).toBeDefined();
        expect(typeof response.body).toBe("object");

        // ** Comprobaciones ** // 

        // title
        expect(response.body).toHaveProperty("title");
        expect(typeof response.body.title).toBe("string");
        expect(response.body.title.length).toBeGreaterThan(0);
        expect(response.body.title).toBe(firstProduct.title);

        // short_title
        expect(response.body).toHaveProperty("short_title");
        expect(typeof response.body.short_title).toBe("string");
        expect(response.body.short_title.length).toBeGreaterThan(0);
        expect(response.body.short_title).toBe(firstProduct.short_title);

        // description
        expect(response.body).toHaveProperty("description");
        expect(typeof response.body.description).toBe("string");
        expect(response.body.description.length).toBeGreaterThan(0);
        expect(response.body.description).toBe(firstProduct.description);

        // price
        expect(response.body).toHaveProperty("price");
        expect(typeof response.body.price).toBe("number");
        expect(response.body.price).toBeGreaterThan(0);
        expect(response.body.price).toBe(firstProduct.price);

        // stock
        expect(response.body).toHaveProperty("stock");
        expect(typeof response.body.stock).toBe("number");
        expect(Number.isInteger(response.body.stock)).toBe(true);
        expect(response.body.stock).toBeGreaterThanOrEqual(0);
        expect(response.body.stock).toBe(firstProduct.stock);

        // platform
        expect(response.body).toHaveProperty("platform");
        expect(typeof response.body.platform).toBe("string");
        expect(response.body.platform.length).toBeGreaterThan(0);
        expect(response.body.platform).toBe(firstProduct.platform);

        // media
        expect(response.body).toHaveProperty("media");
        expect(typeof response.body.media).toBe("string");
        expect(response.body.media.length).toBeGreaterThan(0);
        expect(response.body.media).toBe(firstProduct.media);

        // image
        expect(response.body).toHaveProperty("image");
        expect(typeof response.body.image).toBe("string");
        expect(response.body.image.length).toBeGreaterThan(0);
        expect(response.body.image).toMatch(/^https?:\/\/.+\.(jpg|jpeg|png|gif|webp|svg)/i);
        expect(response.body.image).toBe(firstProduct.image);

    }, 10000);


    // *** Crea producto con datos válidos y token *** //
    test("POST /api/products/create - Debería crear producto con datos válidos", async () => {

        const newProduct = {
            title: `Mazes Of Fate`,
            short_title: `Mazes Of fate`,
            description: `El primer juegos argentino y latinoamericano para una consola portatil`,
            price: 120999.99,
            stock: 15,
            platform: "Game Boy Advance",
            media: "Cartucho",
            image: "https://i.ibb.co/N2Q4WmyG/photo-5.png"
        };

        const response = await request(app)
            .post("/api/products/create")
            .set("Authorization", `Bearer ${authToken}`)
            .send(newProduct);

        // Verifica respuesta de la API   
        expect(response.status).toBe(201);
        expect(response.body).toBeDefined();
        expect(typeof response.body).toBe("object");

        //console.log(response.body);

        // ** Comprobaciones ** //  
        expect(response.body).toMatchObject({
            id: expect.any(String),
            title: newProduct.title,
            short_title: newProduct.short_title,
            description: newProduct.description,
            price: newProduct.price,
            stock: newProduct.stock,
            platform: newProduct.platform,
            media: newProduct.media,
            image: newProduct.image,
        });

        const responseCreated = await request(app)
            .get(`/api/products/${response.body.id}`)
            .set("Authorization", `Bearer ${authToken}`)

        expect(!isNaN(Date.parse(responseCreated.body.createdAt))).toBe(true);
        expect(!isNaN(Date.parse(responseCreated.body.updatedAt))).toBe(true);

        createdProductId = responseCreated.body.id;
    }, 10000);

    // *** Actualiza producto por ID con datos válidos (usa producto creado en la prueba) *** // 
    test("PATCH /api/products/:id - Debería actualizar producto", async () => {

        // Toma el producto sin modificar para hacer la comprobación después
        const responseUnmodified = await request(app)
            .get(`/api/products/${createdProductId}`)
            .set("Authorization", `Bearer ${authToken}`);
        expect(responseUnmodified.status).toBe(200);

        // Crea el objeto con los datos para actualizar en el producto
        const newProductData = {
            title: `Mazes Of Fate (modificado)`,
            short_title: `Mazes Of fate (modificado)`,
        };

        // Actualiza con "patch"
        const response = await request(app)
            .patch(`/api/products/${createdProductId}`)
            .set("Authorization", `Bearer ${authToken}`)
            .send(newProductData);
        
        // ** Comprobaciones ** //     
        
        // Verifica status de la respuesta de PATCH
        expect(response.status).toBe(200);
        
        // Obtiene versión modificada
        const responseModified = await request(app)
            .get(`/api/products/${createdProductId}`)
            .set("Authorization", `Bearer ${authToken}`);
        expect(responseUnmodified.status).toBe(200);

        // Verifica cambios aplicados
        expect(responseModified.body.title).toBe(newProductData.title);
        expect(responseModified.body.short_title).toBe(newProductData.short_title);

        // Verifica que el resto no cambió
        expect(responseModified.body.price).toBe(responseUnmodified.body.price);
        expect(responseModified.body.stock).toBe(responseUnmodified.body.stock);
        expect(responseModified.body.platform).toBe(responseUnmodified.body.platform);
        expect(responseModified.body.media).toBe(responseUnmodified.body.media);
        expect(responseModified.body.image).toBe(responseUnmodified.body.image);

    }, 10000);

    // *** Borra producto por id con datos válidos (usa producto creado en la prueba anterior) *** // 
    test("DELETE /api/products/:id - Debería eliminar producto", async () => {

        const response = await request(app)
            .delete(`/api/products/${createdProductId}`)
            .set("Authorization", `Bearer ${authToken}`);

        // ** Comprobaciones ** //  

        // Petición al borrar
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("message");
        expect(response.body.message).toContain("eliminado");

        // Petición con elemento ya borrado
        const getAfterDelete = await request(app)
            .get(`/api/products/${createdProductId}`)
            .set("Authorization", `Bearer ${authToken}`);

        expect(getAfterDelete.status).toBe(404);
    });
});