"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_session_1 = __importDefault(require("express-session"));
const MySQLSTORE = require('express-mysql-session')(express_session_1.default);
const dbConfig_1 = __importDefault(require("./dbConfig"));
const options = {
    host: dbConfig_1.default.HOST,
    user: dbConfig_1.default.USER,
    password: dbConfig_1.default.PASSWORD,
    database: dbConfig_1.default.DB
};
const sessionStore = new MySQLSTORE(options);
exports.default = sessionStore;
