const request = require('supertest');
const app = require('../fixtures/server');
const token = async () => {
    const res = await request(app)
        .post('/api/auth/signin')
        .send({ name: 'admin', password: 'admin' });
    return res.body.token;
};
describe('Vehicles', function() {
    it('should get all vehicles in db', async () => {
        const authTok = await token();
        const res = await request(app)
            .get('/api/vehicles')
            .set({ Authorization: `Bearer ${authTok}` })
            .send();
        expect(res.statusCode).toEqual(200);
        expect(res.body).not.toHaveLength(0);
    });

    it('should get specified vehicle with id', async () => {
        const authTok = await token();
        const res = await request(app)
            .get('/api/vehicles/1')
            .set({ Authorization: `Bearer ${authTok}` })
            .send();
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('id');
        expect(res.body.id).toEqual(1);
    });

    it('should add new vehicle', async () => {
        const authTok = await token();
        const res = await request(app)
            .post('/api/vehicles')
            .set({ Authorization: `Bearer ${authTok}` })
            .send({
                vin: '23212542',
                regNo: '423r23e',
                status: 'STOPPED',
                customerId: 2,
            });
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('id');
        expect(res.body.vin).toEqual('23212542');
    });

    it('should delete existing vehicle', async () => {
        const authTok = await token();
        const resCustomer = await request(app)
            .post('/api/vehicles')
            .set({ Authorization: `Bearer ${authTok}` })
            .send({
                vin: '23212542d',
                regNo: '423r23er',
                status: 'STOPPED',
                customerId: 1,
            });
        const res = await request(app)
            .del(`/api/vehicles/${resCustomer.body.id}`)
            .set({ Authorization: `Bearer ${authTok}` })
            .send();
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('id');
        expect(res.body.vin).toEqual('23212542d');
    });

    it('should update existing vehicle', async () => {
        const authTok = await token();
        const resCustomer = await request(app)
            .post('/api/vehicles')
            .set({ Authorization: `Bearer ${authTok}` })
            .send({
                vin: '234s2542d',
                regNo: '423rgf3er',
                status: 'STOPPED',
                customerId: 1,
            });
        const res = await request(app)
            .put(`/api/vehicles/${resCustomer.body.id}`)
            .set({ Authorization: `Bearer ${authTok}` })
            .send({
                status: 'RUNNING',
            });
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('id');
        expect(res.body.status).toEqual('RUNNING');
    });
});
