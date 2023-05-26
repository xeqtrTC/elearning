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
exports.removeSubscription = exports.getEmailByUniqueID = exports.sendEmailToSubscribers = exports.sendEmailToSubscribersPromise = exports.subscribeToEmail = void 0;
const models_1 = __importDefault(require("../models"));
const emailSub = models_1.default.emailSubscription;
const uuid_1 = __importDefault(require("uuid"));
const emailSender_1 = require("../nodemailer/emailSender");
const responses_1 = require("../middleware/responses");
const subscribeToEmail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    const toBeAdded = {
        emailOfSub: email,
        uniqueID: uuid_1.default.v4()
    };
    try {
        yield emailSub.create(toBeAdded);
        return (0, responses_1.sendResponseSuccess)(200, 'Subbed', res);
    }
    catch (error) {
        return (0, responses_1.sendResponseFailure)(401, error.message, res);
    }
});
exports.subscribeToEmail = subscribeToEmail;
const sendEmailToSubscribersPromise = (text) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const allSubscribers = yield emailSub.findAll();
            if (allSubscribers) {
                for (const values of allSubscribers) {
                    const email = values.emailOfSub;
                    const uniqueId = values.uniqueID;
                    (0, emailSender_1.sendEmailUpon)(email, uniqueId, text);
                    resolve(true);
                }
            }
            return reject({ message: "There isn't any subscriber" });
        }
        catch (error) {
            return reject(error.message);
        }
    }));
});
exports.sendEmailToSubscribersPromise = sendEmailToSubscribersPromise;
const sendEmailToSubscribers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { text } = req.body;
    try {
        yield (0, exports.sendEmailToSubscribersPromise)(text);
        return (0, responses_1.sendResponseSuccess)(200, "You sent emails!", res);
    }
    catch (error) {
        return (0, responses_1.sendResponseFailure)(401, error.message, res);
    }
});
exports.sendEmailToSubscribers = sendEmailToSubscribers;
const getEmailByUniqueID = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const uniqueID = req.params.uniqueID;
    try {
        const correctEmail = yield emailSub.findOne({
            where: {
                uniqueID: uniqueID
            }
        });
        if (correctEmail) {
            const email = correctEmail.emailOfSub;
            const maskedEmail = email.replace(/....(?=@)/, '****');
            return (0, responses_1.sendResponseSuccess)(200, maskedEmail, res);
        }
        return (0, responses_1.sendResponseFailure)(404, 'Something went wrong!', res);
    }
    catch (error) {
        return (0, responses_1.sendResponseFailure)(404, error.message, res);
    }
});
exports.getEmailByUniqueID = getEmailByUniqueID;
const removeSubscription = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { uniqueID } = req.body;
    try {
        const correctEmailForDelete = yield emailSub.findOne({
            where: {
                uniqueID: uniqueID
            }
        });
        if (correctEmailForDelete) {
            correctEmailForDelete.destroy();
            return (0, responses_1.sendResponseSuccess)(200, 'Sub deleted', res);
        }
        return (0, responses_1.sendResponseFailure)(404, 'Doesnt exist', res);
    }
    catch (error) {
        return (0, responses_1.sendResponseFailure)(401, error.message, res);
    }
});
exports.removeSubscription = removeSubscription;
