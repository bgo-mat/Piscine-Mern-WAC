require('dotenv').config();

module.exports = {
    port: parseInt(process.env.PORT),
    environment: process.env.NODE_ENV || 'development',
    host: process.env.HOST || 'localhost',
};
