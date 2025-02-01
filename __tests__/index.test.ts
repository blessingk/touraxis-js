import request from 'supertest';
import { app } from '../src';
let server: any;

beforeAll(async () => {
    server = app.listen(0, () => {
        const { port } = server.address() as any;
        process.env.PORT = String(port);
    });
});

afterAll(async () => {
    await server.close();
});

describe('API Tests', () => {
    it('should start the server', async () => {
        const res = await request(app).get('/');
        expect(res.status).toBe(200);
    });
});
