const request = require('supertest');
const app = require('../fixtures/server');

describe('Authentication', function () {
    it('should sign in with admin priviliges', async () => {
        const res = await request(app).post('/api/auth/signin')
            .send({name:'admin', password:'admin'});
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('token');
    });

    it('should not sign in with faulty admin priviliges', async () => {
        const res = await request(app).post('/api/auth/signin')
            .send({name:'admin', password:'admin22'});
        expect(res.statusCode).toEqual(401);
        // expect(res.body).toHaveProperty('token');
    });

    it('should sign up with new user with valid body', async () => {
        const res = await request(app).post('/api/auth/signup')
            .send({name:'user1',email:'a@a.com', role:'USER', password:'user1558'});
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('token');
    });

    it('should not sign up with new user with invalid body', async () => {
        const res = await request(app).post('/api/auth/signup')
            .send({name:'user1',email:'a@a.com', role:'USER', password:'use'});
        expect(res.statusCode).toEqual(422);
        expect(res.body).toHaveProperty('message');
    });
});
