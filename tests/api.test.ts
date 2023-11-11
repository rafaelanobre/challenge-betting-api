import supertest from "supertest";
import app from "../src/app";

const api = supertest(app);

describe("API test", () => {
    it("should return 200 and OK message", async () => {
        const {status, text} = await api.get('/health');
        expect(status).toBe(200);
        expect(text).toBe('OK!');
    })
});