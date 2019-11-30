'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('Vehicles', [
            {
                vin: 'YS2R4X20005399401',
                regNo: 'ABC123',
                status: 'STOPPED',
                customerId: 1,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                vin: 'VLUR4X20009093588',
                regNo: 'DEF456',
                status: 'STOPPED',
                customerId: 1,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                vin: 'VLUR4X20009048066',
                regNo: 'GHI789',
                status: 'STOPPED',
                customerId: 1,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                vin: 'YS2R4X20005388011',
                regNo: 'JKL012',
                status: 'STOPPED',
                customerId: 2,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                vin: 'YS2R4X20005387949',
                regNo: 'MNO345',
                status: 'STOPPED',
                customerId: 2,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                vin: 'VLUR4X20009048066',
                regNo: 'PQR678',
                status: 'STOPPED',
                customerId: 3,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                vin: 'YS2R4X20005387055',
                regNo: 'STU901',
                status: 'STOPPED',
                customerId: 3,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ]);
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.truncate('Vehicles');
    },
};
