import path from 'path';

const development = {
    dialect: 'sqlite',
    storage: path.join(__dirname, '../../storage/development.sqlite')
};

const production = {
    dialect: 'postgres' || 'mysql',
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    pool: {
        max: 20,
        min: 5,
        idle: 60000
    }
}

export {
    development,
    production
}
