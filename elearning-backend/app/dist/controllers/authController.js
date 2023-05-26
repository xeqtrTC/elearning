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
exports.verifyAccountByToken = exports.getAllRoles = exports.whoAmI = exports.logoutUser = exports.loginUser = exports.signUp = void 0;
const models_1 = __importDefault(require("../models"));
const User = models_1.default.users;
const Role = models_1.default.roles;
const Op = models_1.default.Sequelize.Op;
const emailSub = models_1.default.emailSubscription;
const http_status_1 = __importDefault(require("http-status"));
const passport_1 = __importDefault(require("passport"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const uuid_1 = __importDefault(require("uuid"));
const emailSender_1 = __importDefault(require("../nodemailer/emailSender"));
const responses_1 = require("../middleware/responses");
const sendEmailRegister = emailSender_1.default.sendMailUponRegister;
const signUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { password, username, email } = req.body;
    const hashedPassword = bcrypt_1.default.hashSync(password, 10);
    const tokenToBeAdded = uuid_1.default.v4();
    const userToAdd = {
        username: username,
        email: email,
        password: hashedPassword,
        verificationToken: tokenToBeAdded,
        isVerificated: false
    };
    try {
        const insertUser = yield User.create(userToAdd);
        if (req.body.roles) {
            const rolesOfUser = yield Role.findAll({
                where: {
                    name: {
                        [Op.or]: req.body.roles
                    }
                }
            });
            yield insertUser.setRoles(rolesOfUser);
            sendEmailRegister(email, tokenToBeAdded);
            return res.status(200).json({ message: 'You have added' });
        }
        else {
            const searchRoleUser = yield Role.findOne({
                where: {
                    name: 'User'
                }
            });
            yield insertUser.setRoles(searchRoleUser);
            sendEmailRegister(email, tokenToBeAdded);
            return res.status(http_status_1.default.OK).json({ message: "You have added" });
        }
    }
    catch (error) {
        return res.status(401).json({ message: error.message });
    }
});
exports.signUp = signUp;
const loginUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    passport_1.default.authenticate('local', (error, user, info) => __awaiter(void 0, void 0, void 0, function* () {
        if (error)
            return;
        if (info) {
            return res.status(401).json(info);
        }
        const findUser = yield User.findOne({
            where: {
                username: user.username
            }
        });
        const ahs = yield findUser.getRoles();
        let authorities = [];
        for (const hs of ahs) {
            authorities.push(hs.name);
        }
        console.log(authorities);
        const infoAboutUser = {
            id: user === null || user === void 0 ? void 0 : user.id,
            username: user === null || user === void 0 ? void 0 : user.username,
            email: user === null || user === void 0 ? void 0 : user.email,
            roles: authorities
        };
        req.logIn(user, () => {
            return res.status(200).json(infoAboutUser);
        });
    }))(req, res, next);
});
exports.loginUser = loginUser;
const logoutUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    req.logout((error) => {
        if (error) {
            return res.status(401).json({ message: error.message || 'Something went wrong on logout!' });
        }
        req.session.destroy();
        res.clearCookie('connect.sid');
        return res.status(200).json({ message: "You have logouted" });
    });
});
exports.logoutUser = logoutUser;
const whoAmI = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    return res.status(201).json(req.user);
});
exports.whoAmI = whoAmI;
const getAllRoles = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allRoles = yield Role.findAll();
        return res.status(200).json(allRoles);
    }
    catch (error) {
        return res.status(401).json({ message: error.message });
    }
});
exports.getAllRoles = getAllRoles;
const verifyAccountByToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const token = (_a = req === null || req === void 0 ? void 0 : req.params) === null || _a === void 0 ? void 0 : _a.token;
    try {
        if (token) {
            const userWithToken = yield User.findOne({
                where: {
                    verificationToken: token
                }
            });
            if (!userWithToken)
                return (0, responses_1.sendResponseFailure)(404, "That token doesn't exist", res);
            if (userWithToken.isVerificated === true) {
                return (0, responses_1.sendResponseFailure)(401, 'You are already verificated', res);
            }
            else {
                userWithToken.isVerificated = true;
                userWithToken.verificationToken = null;
                yield userWithToken.save();
                return (0, responses_1.sendResponseSuccess)(200, "You verificated, redirecting...", res);
            }
        }
        else {
            return (0, responses_1.sendResponseFailure)(404, "There isn't any token", res);
        }
    }
    catch (error) {
        return (0, responses_1.sendResponseFailure)(401, error.message, res);
    }
});
exports.verifyAccountByToken = verifyAccountByToken;
