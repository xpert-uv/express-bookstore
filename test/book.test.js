process.env.NODE_ENV = "test";
const request = require("supertest");
const app = require("../app");
const db = require("../db");


beforeEach(async () => {
    let result = await db.query(`
    INSERT INTO 
      books (isbn, amazon_url,author,language,pages,publisher,title,year)   
      VALUES(
        '123432122', 
        'https://amazon.com/taco', 
        'Elie', 
        'English', 
        100,  
        'Nothing publishers', 
        'my first book', 2008) 
      RETURNING isbn`);

    book_isbn = result.rows[0].isbn
});

describe("Getting all the books", () => {
    test("Getting all the books", async () => {
        const result = await request(app).get("/books");
        expect(result.statusCode).toBe(200);

    })

})

describe("Getting single books", () => {
    test("getting single book using id", async () => {
        const result = await request(app).get("/books/123432122");
        expect(result.statusCode).toBe(200);
        expect(result.body).not.toBe(undefined);
    })
})

describe("Creating books", () => {
    test("create book", async () => {
        const result = await request(app).post("/books/").send({
            isbn: '32794782',
            amazon_url: "https://taco.com",
            author: "mctest",
            language: "english",
            pages: 1000,
            publisher: "yeah right",
            title: "amazing times",
            year: 2000
        });
        expect(result.statusCode).toBe(201);

    })
})

afterEach(async function () {
    await db.query("DELETE FROM BOOKS");
});


afterAll(async function () {
    await db.end()
});