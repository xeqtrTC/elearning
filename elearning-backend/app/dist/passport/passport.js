"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const localStrategy = require('passport-local').Strategy;
const passport_1 = __importDefault(require("passport"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const models_1 = __importDefault(require("../models/"));
const User = models_1.default.users;
const Roles = models_1.default.roles;
passport_1.default.use('local', new localStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
}, (req, username, password, done) => __awaiter(void 0, void 0, void 0, function* () {
    const findUser = yield User.findOne({
        where: {
            username: username
        }
    });
    if (findUser.isVerificated === false) {
        return done(null, false, { message: 'You need to verificate your account!' });
    }
    else if (findUser.isVerificated === true) {
        const comparePassword = bcrypt_1.default.compareSync(password, findUser.password);
        comparePassword ? (done(null, findUser)) : (done(null, false, { message: 'Not valid' }));
    }
    else {
        return done(null, false, { message: 'Something went wrong!' });
    }
})));
passport_1.default.serializeUser((user, done) => {
    console.log(user, 'user');
    done(null, user.id);
});
passport_1.default.deserializeUser((id, done) => __awaiter(void 0, void 0, void 0, function* () {
    const findUser = yield User.findOne({
        where: {
            id: id
        },
        attributes: ['id', 'username', 'email'],
        include: [
            {
                model: Roles,
                attributes: ['id', 'name'],
            },
        ]
    });
    // const findRoles = await findUser.getRoles();
    // console.log('OVO SU ROLE', findUser)
    // for (const ahs of findRoles) {
    //     console.log(ahs.name)
    // }
    return done(null, findUser);
}));
