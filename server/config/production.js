module.exports = {
    // disbable logging for production
    db:{
        "username": "root",
        "password": "password",
        "database": "database_production",
        "host": "mysql",
        "dialect": "mysql",
        logging: true,
    },
    logging: true,
    seed: true,
};
