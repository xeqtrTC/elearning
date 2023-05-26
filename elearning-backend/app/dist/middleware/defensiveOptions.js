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
const models_1 = __importDefault(require("../models"));
const User = models_1.default.users;
const Roles = models_1.default.roles;
const isAdmin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const checkUser = yield User.findByPk(req.user.id);
    const isAdmin = yield checkUser.getRoles();
    for (const nameOfRole of isAdmin) {
        if (nameOfRole.name === "admin") {
            next();
            return;
        }
    }
    return res.status(403).json({ message: 'Admin role required!' });
});
const defensiveOptions = {
    isAdmin: isAdmin
};
exports.default = defensiveOptions;
