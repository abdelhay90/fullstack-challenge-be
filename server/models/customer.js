'use strict'
module.exports = (sequelize, DataTypes) => {
    const Customer = sequelize.define(
        'Customer',
        {
            name: DataTypes.STRING,
            address: DataTypes.STRING,
        },
        {},
    )
    Customer.associate = function(models) {
        // associations can be defined here
        Customer.hasMany(models.Vehicle)
    }
    return Customer
}
