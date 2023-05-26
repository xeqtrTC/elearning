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
exports.sendEmailUpon = exports.sendMailUponRegister = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const nodemailer_2 = require("../config/nodemailer");
const models_1 = __importDefault(require("../models"));
const emailSub = models_1.default.emailSubscription;
const mailSetup = nodemailer_1.default.createTransport({
    service: "gmail",
    auth: {
        user: nodemailer_2.emailSender,
        pass: nodemailer_2.passwordEmail
    }
});
const sendMailUponRegister = (email, tokenToBeAdded) => __awaiter(void 0, void 0, void 0, function* () {
    const sendMailRegister = {
        from: nodemailer_2.emailSender,
        to: email,
        subject: "Register on Xeqtr's ELearning platform",
        html: `
            You need to click here <a href="http://127.0.0.1:5173/verify-account/${tokenToBeAdded}">Cl09i </a>.       
        `
    };
    mailSetup.sendMail(sendMailRegister, (error, info) => {
        if (info) {
            return;
        }
        else {
            console.log(error);
        }
    });
});
exports.sendMailUponRegister = sendMailUponRegister;
const sendEmailUpon = (email, uniqueID, text) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(email);
    const sendEmailToSubscribers = {
        from: nodemailer_2.emailSender,
        to: email,
        subject: "Subscribed!",
        html: `
            Hello! ${text}, 
            if you want to unsubscribe please click this
            <a href="http://127.0.0.1:5173/unsubscribe/${uniqueID}"><button>UNSUBSCRIBE</button></a>     
        `
    };
    mailSetup.sendMail(sendEmailToSubscribers, (error, info) => {
        if (info) {
            return;
        }
        else {
            console.log(error);
        }
    });
});
exports.sendEmailUpon = sendEmailUpon;
