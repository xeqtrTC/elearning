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
exports.updateRoleName = exports.removeRole = exports.addNewRole = void 0;
const models_1 = __importDefault(require("../models"));
const Role = models_1.default.roles;
const addNewRole = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { addRoleName, id } = req.body;
    console.log(addRoleName);
    const addRole = {
        name: addRoleName,
    };
    console.log(addRole);
    try {
        yield Role.create(addRole);
        return res.status(201).json({ message: "New role added" });
    }
    catch (error) {
        console.log(error);
        return res.status(401).json({ message: error.message });
    }
});
exports.addNewRole = addNewRole;
const removeRole = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.body;
    try {
        const findRole = yield Role.findOne({
            where: {
                id: id
            }
        });
        if (findRole) {
            yield findRole.destroy();
            return res.status(201).json({ message: "Deleted role" });
        }
        return res.status(401).json({ message: "That role doesn't exist" });
    }
    catch (error) {
        return res.status(401).json({ message: error.message });
    }
});
exports.removeRole = removeRole;
const updateRoleName = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, name } = req.body;
    try {
        yield Role.update({
            name: name
        }, {
            where: {
                id: id
            }
        });
        return res.status(201).json({ message: 'Role updated' });
    }
    catch (error) {
        return res.status(401).json({ message: error.message });
    }
});
exports.updateRoleName = updateRoleName;
