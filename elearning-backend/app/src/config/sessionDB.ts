import session from 'express-session';
const MySQLSTORE = require('express-mysql-session')(session);
import dbConfig from './dbConfig';

const options = {
    host: dbConfig.HOST,
    user: dbConfig.USER,
    password: dbConfig.PASSWORD,
    database: dbConfig.DB
}

const sessionStore = new MySQLSTORE(options);

export default sessionStore;
