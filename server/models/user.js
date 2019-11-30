'use strict'

const bcrypt = require('bcrypt')

/**
 * user model definition
 * @param sequelize
 * @param DataTypes
 * @returns {Model|void}
 */
module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define(
        'User',
        {
            name: {
                type: DataTypes.STRING,
                unique: true,
                allowNull: false,
                validate: {
                    notEmpty: true,
                },
            },
            email: {
                type: DataTypes.STRING,
                unique: true,
                allowNull: false,
                validate: {
                    notEmpty: true,
                    isEmail: true,
                },
            },
            role: DataTypes.STRING,
            password: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: true,
                    len: [7, 255],
                },
            },
        },
        {},
    )
    User.associate = function(models) {
        // associations can be defined here
    }

    /**
     * find user
     * @param login
     * @returns {Promise<void>}
     */
    User.findByLogin = async (login) => {
        let user = await User.findOne({
            where: { username: login },
        })

        if (!user) {
            user = await User.findOne({
                where: { email: login },
            })
        }

        return user
    }

    /**
     * before create hook to hash password when saving
     */
    User.beforeCreate(async (user) => {
        user.password = await user.generatePasswordHash()
    })

    /**
     * generate hash for password
     * @returns {Promise<void>}
     */
    User.prototype.generatePasswordHash = async function() {
        const saltRounds = 10
        return await bcrypt.hash(this.password, saltRounds)
    }

    /**
     * validate password is validity
     * @param password
     * @returns {Promise<void>}
     */
    User.prototype.validatePassword = async function(password) {
        const res = await bcrypt.compare(password, this.password)
        return res
    }

    /**
     * used to return a clone of user without password
     * @returns {{}}
     */
    User.prototype.toJson = function() {
        let obj = Object.assign({}, this.dataValues)
        delete obj.password
        return obj
    }

    return User
}
