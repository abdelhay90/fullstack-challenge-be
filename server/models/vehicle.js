'use strict';
module.exports = (sequelize, DataTypes) => {
    const Vehicle = sequelize.define('Vehicle', {
        vin: DataTypes.STRING,
        regNo: DataTypes.STRING,
        status: DataTypes.STRING,
    }, {});
    Vehicle.associate = function (models) {
        // associations can be defined here
      Vehicle.belongsTo(models.Customer)
    };

    return Vehicle;
};
