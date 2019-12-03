'use strict';
module.exports = (sequelize, DataTypes) => {
    const Vehicle = sequelize.define(
        'Vehicle',
        {
            vin: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            regNo: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            status: DataTypes.STRING,
        },
        {},
    );
    Vehicle.associate = function(models) {
        // associations can be defined here
        Vehicle.belongsTo(models.Customer);
    };

    return Vehicle;
};
