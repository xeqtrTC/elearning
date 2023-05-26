"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    HOST: 'localhost',
    USER: 'root',
    PASSWORD: 'pass',
    DB: 'restapi',
    dialect: 'mysql',
    pool: {
        max: 10,
        min: 0,
        acquire: 30000,
        idle: 50000
    }
};
