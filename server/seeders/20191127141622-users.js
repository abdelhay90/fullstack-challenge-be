'use strict';
const bcrypt = require('bcrypt');

module.exports = {
    up: async (queryInterface, Sequelize) => {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash('admin', saltRounds);
        return queryInterface.bulkInsert('Users', [
            {
                name: 'admin',
                password: hashedPassword,
                role: 'ADMIN',
                email: 'ahmed.abdelhay.90@gmail.com',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ]);
    },

    down: async (queryInterface, Sequelize) => {
        return queryInterface.truncate('Users');
    },
};
