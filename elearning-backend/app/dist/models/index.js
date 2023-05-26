"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const dbConfig_1 = __importDefault(require("../config/dbConfig"));
const sequelize = new sequelize_typescript_1.Sequelize({
    database: dbConfig_1.default.DB,
    username: dbConfig_1.default.USER,
    password: dbConfig_1.default.PASSWORD,
    dialect: 'mysql'
});
// // const dbConfig = require("../config/dbConfig");
// // const Sequelize = require("sequelize");
// // const database = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
// //   host: dbConfig.HOST,
// //   dialect: dbConfig.dialect,
// //   operatorsAliases: false,
// //   pool: {
// //     max: dbConfig.pool.max,
// //     min: dbConfig.pool.min,
// //     acquire: dbConfig.pool.acquire,
// //     idle: dbConfig.pool.idle
// //   }
// // });
// // const db = {};
// // db.Sequelize = Sequelize;
// // db.databaseConf = database;
// // // function to drop existing tables and re-sync database
// // db.dropRestApiTable = () => {
// //   db.databaseConf.sync({ force: true }).then(() => {
// //     console.log("restTutorial table just dropped and db re-synced.");
// //   });
// // };
// // db.posts = require("./Sequelize.model")(database, Sequelize);
// // module.exports = db;
// "use strict";
// import fs from "fs";
// import path from "path";
// import Sequelize from "sequelize";
// const basename = path.basename(__filename);
// const env = process.env.NODE_ENV || "development";
// import config from '../config/dbConfig';
// const db = {};
// let sequelize;
// // if (config.use_env_variable) {
// //   sequelize = new Sequelize(process.env[config.use_env_variable], config);
// // } else {
// sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
//       host: config.HOST,
//       dialect: config.dialect,
//       operatorsAliases: false,
//       pool: {
//         max: config.pool.max,
//         min: config.pool.min,
//         acquire: config.pool.acquire,
//         idle: config.pool.idle
//       },
//       logging: false
//     });
// fs.readdirSync(__dirname)
//   .filter((file) => {
//     return (
//       file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
//     );
//   })
//   .forEach((file) => {
//     const model = require(path.join(__dirname, file))(
//       sequelize,
//       Sequelize.DataTypes
//     );
//     db[model.name] = model;
//   });
// Object.keys(db).forEach((modelName) => {
//   if (db[modelName].associate) {
//     db[modelName].associate(db);
//   }
// });
// db.sequelize = sequelize;
// db.Sequelize = Sequelize;
// sequelize.sync();
// module.exports = db;
