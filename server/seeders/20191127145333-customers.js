'use strict'

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('Customers', [
            {
                name: 'Kalles Grustransporter AB',
                address: 'Cementvägen 8, 111 11 Södertälje',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: 'Johans Bulk AB',
                address: 'Balkvägen 12, 222 22 Stockholm',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: 'Haralds Värdetransporter AB',
                address: 'Budgetvägen 1, 333 33 Uppsala',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ])
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.truncate('Customers')
    },
}
