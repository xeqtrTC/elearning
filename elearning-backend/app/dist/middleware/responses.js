"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendResponseFailure = exports.sendResponseSuccess = void 0;
const sendResponseSuccess = (numberOfStatus, array, res) => {
    return res.status(numberOfStatus).json(array);
};
exports.sendResponseSuccess = sendResponseSuccess;
const sendResponseFailure = (numberOfStatus, message, res) => {
    return res.status(numberOfStatus).json({ message: message });
};
exports.sendResponseFailure = sendResponseFailure;
