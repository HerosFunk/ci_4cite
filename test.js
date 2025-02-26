import request from "supertest";
import { expect } from "chai";
import app from "./index.js";

describe("POST /api/register", function () {
    
    // Reset fake database before each test
    beforeEach(() => {
        global.users = [];
    });

    it("should register a new user successfully", async function () {
        const response = await request(app)
            .post("/api/register")
            .send({ username: "JohnDoe", email: "john@example.com" });

        expect(response.status).to.equal(201);
        expect(response.body).to.have.property("message", "User registered");
        expect(response.body.user).to.deep.equal({
            username: "JohnDoe",
            email: "john@example.com"
        });
    });

    it("should fail when user already exists", async function () {
        // Add user to the fake database
        global.users = [{ username: "JohnDoe", email: "john@example.com" }];

        const response = await request(app)
            .post("/api/register")
            .send({ username: "JohnDoe", email: "john@example.com" });

        expect(response.status).to.equal(400);
        expect(response.body).to.have.property("error", "User already exists");
    });

    it("should fail on missing fields", async function () {
        const response = await request(app)
            .post("/api/register")
            .send({ username: "NoEmail" });

        expect(response.status).to.equal(400);
        expect(response.body).to.have.property("error", "Username and email are required");
    });

});