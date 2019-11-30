const request = require('supertest')
const app = require('../fixtures/server')
const token = async () => {
    const res = await request(app)
        .post('/api/auth/signin')
        .send({ name: 'admin', password: 'admin' })
    return res.body.token
}
describe('Users', function() {
    it('should get all users in db', async () => {
        const authTok = await token()
        const res = await request(app)
            .get('/api/users')
            .set({ Authorization: `Bearer ${authTok}` })
            .send()
        expect(res.statusCode).toEqual(200)
        expect(res.body).not.toHaveLength(0)
    })

    it('should get specified user with id', async () => {
        const authTok = await token()
        const res = await request(app)
            .get('/api/users/1')
            .set({ Authorization: `Bearer ${authTok}` })
            .send()
        expect(res.statusCode).toEqual(200)
        expect(res.body).toHaveProperty('id')
        expect(res.body.id).toEqual(1)
    })

    it('should get current user data', async () => {
        const authTok = await token()
        const res = await request(app)
            .get('/api/users/me')
            .set({ Authorization: `Bearer ${authTok}` })
            .send()
        expect(res.statusCode).toEqual(200)
        expect(res.body).toHaveProperty('name')
        expect(res.body.name).toEqual('admin')
    })

    it('should add new user', async () => {
        const authTok = await token()
        const res = await request(app)
            .post('/api/users')
            .set({ Authorization: `Bearer ${authTok}` })
            .send({
                name: 'Ahmed Abdelhay',
                email: 'ahmed@mido.com',
                role: 'SYS_USER',
                password: 'POPOPOPO',
            })
        expect(res.statusCode).toEqual(200)
        expect(res.body).toHaveProperty('id')
    })

    it('should delete existing user', async () => {
        const authTok = await token()
        const resUser = await request(app)
            .post('/api/users')
            .set({ Authorization: `Bearer ${authTok}` })
            .send({
                name: 'Ahmed Abdelhay',
                email: 'ahmed@mido.com',
                role: 'SYS_USER',
                password: 'POPOPOPO',
            })
        const res = await request(app)
            .del(`/api/users/${resUser.body.id}`)
            .set({ Authorization: `Bearer ${authTok}` })
            .send()
        expect(res.statusCode).toEqual(200)
        expect(res.body).toHaveProperty('id')
        expect(res.body.name).toEqual('Ahmed Abdelhay')
    })

    it('should update existing user', async () => {
        const authTok = await token()
        const resCustomer = await request(app)
            .post('/api/users')
            .set({ Authorization: `Bearer ${authTok}` })
            .send({
                name: 'Ahmed Abdelhay',
                email: 'ahmed@mido.com',
                role: 'SYS_USER',
                password: 'POPOPOPO',
            })
        const res = await request(app)
            .put(`/api/users/${resCustomer.body.id}`)
            .set({ Authorization: `Bearer ${authTok}` })
            .send({
                email: 'ahmed@mido22.com',
            })
        expect(res.statusCode).toEqual(200)
        expect(res.body).toHaveProperty('id')
        expect(res.body.email).toEqual('ahmed@mido22.com')
    })
})
