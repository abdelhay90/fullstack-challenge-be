const request = require('supertest');
const app = require('../fixtures/server');
const token = async () => {
    const res = await request(app)
        .post('/api/auth/signin')
        .send({ name: 'admin', password: 'admin' });
    return res.body.token;
};
describe('Customers', function() {
    beforeAll(()=> {

    });
    it('should get all customers in db', async () => {
        const authTok = await token();
        const res = await request(app)
            .get('/api/customers')
            .set({ Authorization: `Bearer ${authTok}` })
            .send();
        expect(res.statusCode).toEqual(200);
        expect(res.body).not.toHaveLength(0);
    });

    it('should get specified customer with id', async () => {
        const authTok = await token();
        const res = await request(app)
            .get('/api/customers/1')
            .set({ Authorization: `Bearer ${authTok}` })
            .send();
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('id');
        expect(res.body.id).toEqual(1);
    });

    it('should add new customer', async () => {
        const authTok = await token();
        const res = await request(app)
            .post('/api/customers')
            .set({ Authorization: `Bearer ${authTok}` })
            .send({
                name: 'Ahmed Abdelhay11',
                address: 'Cairo, Egypt',
            });
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('id');
        expect(res.body.name).toEqual('Ahmed Abdelhay11');
    });

    it('should delete existing customer', async () => {
        const authTok = await token();
        const resCustomer = await request(app)
            .post('/api/customers')
            .set({ Authorization: `Bearer ${authTok}` })
            .send({
                name: 'Ahmed Abdelhay22',
                address: 'Cairo, Egypt22',
            });
        const res = await request(app)
            .del(`/api/customers/${resCustomer.body.id}`)
            .set({ Authorization: `Bearer ${authTok}` })
            .send();
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('id');
        expect(res.body.name).toEqual('Ahmed Abdelhay22');
    });

    it('should update existing customer', async () => {
        const authTok = await token();
        const resCustomer = await request(app)
            .post('/api/customers')
            .set({ Authorization: `Bearer ${authTok}` })
            .send({
                name: 'Ahmed Abdelhay45',
                address: 'Cairo, Egypt',
            });
        const res = await request(app)
            .put(`/api/customers/${resCustomer.body.id}`)
            .set({ Authorization: `Bearer ${authTok}` })
            .send({
                address: 'Giza, Egypt21',
            });
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('id');
        expect(res.body.address).toEqual('Giza, Egypt21');
    });
});
