const _ = require('lodash')

const config = {
    dev: 'development',
    test: 'test',
    prod: 'production',
    port: process.env.PORT || 3000,
    db: {
        host: process.env.POSTGRES_HOST,
        port: process.env.POSTGRES_PORT || 5432,
        dbName: process.env.POSTGRES_DB,
        user: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
    },
    // 10 days in hours
    expireTime: '240h' /*24 * 60 * 10*/,
    secrets: {
        jwt: process.env.JWT || 'gumball',
    },
}

process.env.NODE_ENV = process.env.NODE_ENV || config.dev
config.env = process.env.NODE_ENV

let envConfig
// require could error out if
// the file don't exist so lets try this statement
// and fallback to an empty object if it does error out
try {
    envConfig = require('./' + config.env)
    // just making sure the require actually
    // got something back :)
    envConfig = envConfig || {}
} catch (e) {
    envConfig = {}
}

// merge the two config files together
// the envConfig file will overwrite properties
// on the config object
module.exports = _.merge(config, envConfig)
