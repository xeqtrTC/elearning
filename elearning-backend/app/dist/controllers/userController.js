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
exports.editUserProfile = exports.removeRoleFromUser = exports.addRoleToUser = exports.findOneUser = exports.getAllUsers = void 0;
const models_1 = __importDefault(require("../models"));
const sequelize_1 = __importDefault(require("sequelize"));
const responses_1 = require("../middleware/responses");
const User = models_1.default.users;
const Roles = models_1.default.roles;
const Op = sequelize_1.default.Op;
const User_roles = models_1.default.user_roles;
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const findUsers = yield User.findAll({
            attributes: ['id', 'username', 'email'],
            include: [
                {
                    model: Roles,
                    attributes: ['name', 'id'],
                },
            ]
        });
        return (0, responses_1.sendResponseSuccess)(200, findUsers, res);
    }
    catch (error) {
        return (0, responses_1.sendResponseFailure)(401, error.message, res);
    }
});
exports.getAllUsers = getAllUsers;
const findOneUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const userInfo = yield User.findOne({
            attributes: ['id', 'username', 'email', 'isVerificated'],
            where: {
                id: id
            },
            include: [{ model: Roles, through: { attributes: [] } }]
        });
        const roleToBeAdded = yield Roles.findAll({
            where: {
                id: {
                    [Op.notIn]: sequelize_1.default.Sequelize.literal(`(SELECT roleId FROM user_roles WHERE userId = ${id})`)
                }
            }
        });
        if (userInfo && roleToBeAdded) {
            const combinedArrays = {
                id: userInfo.id,
                username: userInfo.username,
                email: userInfo.email,
                isVerificated: userInfo.isVerificated,
                rolesThatBelong: userInfo.roles,
                rolesToBeAdded: roleToBeAdded
            };
            return (0, responses_1.sendResponseSuccess)(200, combinedArrays, res);
        }
        return (0, responses_1.sendResponseFailure)(404, "User or roles doesn't exist!", res);
    }
    catch (error) {
        return (0, responses_1.sendResponseFailure)(401, error.message, res);
    }
});
exports.findOneUser = findOneUser;
const addRoleToUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { idOfUser, idOfRole } = req.body;
    try {
        const findUser = yield User.findOne({
            where: {
                id: idOfUser
            }
        });
        const findRole = yield Roles.findOne({
            where: {
                id: idOfRole
            }
        });
        if (!findRole || !findUser) {
            return (0, responses_1.sendResponseFailure)(401, "Role or user do not exist!", res);
        }
        findUser.addRoles(findRole);
        return (0, responses_1.sendResponseSuccess)(200, "You added role to user", res);
    }
    catch (error) {
        return (0, responses_1.sendResponseFailure)(401, error.message, res);
    }
});
exports.addRoleToUser = addRoleToUser;
const removeRoleFromUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { idOfUser, idOfRole } = req.body;
    try {
        const findUser = yield User.findOne({
            where: {
                id: idOfUser
            }
        });
        const findRole = yield Roles.findOne({
            where: {
                id: idOfRole
            }
        });
        if (!findRole || !findUser) {
            return (0, responses_1.sendResponseFailure)(401, "Role or user do not exist!", res);
        }
        findUser.removeRoles(findRole);
        return (0, responses_1.sendResponseSuccess)(200, "You removed role to user", res);
    }
    catch (error) {
        return (0, responses_1.sendResponseFailure)(401, error.message, res);
    }
});
exports.removeRoleFromUser = removeRoleFromUser;
const editUserProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, id, email, verificated } = req.body;
    try {
        const userForUpdate = yield User.findOne({
            where: {
                id: id
            }
        });
        if (userForUpdate.username === username || userForUpdate.email === email) {
            return (0, responses_1.sendResponseFailure)(401, "You provided with same username or email!", res);
        }
        if (userForUpdate.username !== username) {
            const checkUsername = yield User.findOne({
                where: {
                    username: username
                }
            });
            if (checkUsername) {
                return (0, responses_1.sendResponseFailure)(401, 'With that username user already exists!', res);
            }
        }
        if (userForUpdate.email !== email) {
            const checkForEmail = yield User.findOne({
                where: {
                    email: email
                }
            });
            if (checkForEmail) {
                return (0, responses_1.sendResponseFailure)(401, 'With that email user already exists!', res);
            }
        }
        if (userForUpdate) {
            userForUpdate.username = username;
            userForUpdate.email = email,
                yield userForUpdate.save();
            return (0, responses_1.sendResponseSuccess)(200, "You edited this user", res);
        }
        return (0, responses_1.sendResponseFailure)(401, "User doesn't exist", res);
    }
    catch (error) {
        return (0, responses_1.sendResponseFailure)(401, error.message, res);
    }
});
exports.editUserProfile = editUserProfile;
