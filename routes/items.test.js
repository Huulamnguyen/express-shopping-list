/* Test */
process.env.NODE_ENV = "test";
const request = require("supertest");

const app = require("../app");
let items = require("../fakeDb");

let item = { name: "cheerios", price: 3.99}

beforeEach(function () {
    items.push(item)
});

afterEach(function () {
    items.length = 0;
});

// todo: GET - Test Get list of all items.
describe("GET /items", () => {
    test("Get all items", async() => {
        const res = await request(app).get("/items");
        expect(res.statusCode).toEqual(200);
        expect(res.body). toEqual({items: [item]});
    });
});

// todo: GET - get a single item and if invalid item.
describe("GET /items/:name", () => {
    test("Get item by name", async() => {
        const res = await request(app).get(`/items/${item.name}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual({ item: item });
    });
    test("Responds with 404 for invalid item", async() => {
        const res = await request(app).get('/items/cereal');
        expect(res.statusCode).toEqual(404);
    });
});

// todo: POST - Creating new item and if invalid item.
describe("POST /items", () => {
    test("Creating a new item", async() => {
        const res = await request(app).post("/items").send({ name: "cereal", price: 3.45 });
        expect(res.statusCode).toEqual(201);
        expect(res.body).toEqual({ added: { name: "cereal", price: 3.45 } });
    });
    test("Responds with 400 if name and price are missing", async() =>{
        const res = await request(app).post("/items").send({});
        expect(res.statusCode).toEqual(400);
    });
});

// todo: PATCH - Updating new item.
describe("PACTH /items/:name", () => {
    test("Updating a item's name", async() => {
        const res = await request(app).patch(`/items/${item.name}`).send({ name: "updated cheerios", price: 4.99});
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual({ updated: {name: "updated cheerios", price: 4.99} });
    });
    test("Reponds with 404 for invalid name", async () => {
        const res = await request(app).patch("/items/invalidname").send({ name: "updated cheerios", price: 4.99 })
        expect(res.statusCode).toEqual(404);
    });
});

// todo: DELETE - deletinng an existing item
describe("DELETE /items/:name", () =>{
    test("Deleting a item", async () => {
        const res = await request(app).delete(`/items/${item.name}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual({ message: "Deleted"});
    });
    test("Responds with 404 for deleting invalid item", async () =>{
        const res = await request(app).delete(`/items/invalidname`);
        expect(res.statusCode).toEqual(404);
    });
});