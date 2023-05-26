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
exports.verifySignUp = exports.checkIsEmailSubscribed = exports.checkDoesRoleExists = exports.checkDidUserPurchaseCourseGuardian = exports.checkDidUserPurchaseCourse = exports.checkRoleExisted = exports.checkDoesUserExist = exports.checkUsernameOrEmail = void 0;
const models_1 = __importDefault(require("../models/"));
const responses_1 = require("./responses");
const lessondetails = models_1.default.lessondetails;
const User = models_1.default.users;
const ROLES = models_1.default.roles;
const Enrollment = models_1.default.enrollment;
const emailSub = models_1.default.emailSubscription;
const checkUsernameOrEmail = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const checkUsername = yield User.findOne({
        where: {
            username: req.body.username
        }
    });
    if (checkUsername) {
        return res.status(400).json({ message: 'Failed, username already exist!' });
    }
    const checkEmail = yield User.findOne({
        where: {
            email: req.body.email
        }
    });
    if (checkEmail) {
        return res.status(400).json({ message: 'Failed, email already exists!' });
    }
    next();
});
exports.checkUsernameOrEmail = checkUsernameOrEmail;
const checkDoesUserExist = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { username } = req.body;
    const checkUsername = yield User.findOne({
        where: {
            username: username
        }
    });
    if (checkUsername) {
        next();
        return;
    }
    return res.status(401).json({ message: "That client doesn't exist" });
});
exports.checkDoesUserExist = checkDoesUserExist;
const checkRoleExisted = (req, res, next) => {
    if (req.body.roles) {
        for (const role of req.body.roles) {
            if (!ROLES.includes(role)) {
                return res.status(400).json({ message: 'Failed, role doesnt exist!' });
            }
        }
    }
    next();
};
exports.checkRoleExisted = checkRoleExisted;
const checkDidUserPurchaseCourse = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { courseId } = req.body;
    const userId = req.user.id;
    try {
        const checkDidUserPurchase = yield Enrollment.findOne({
            where: {
                courseCourseId: courseId, userId: userId
            }
        });
        if (checkDidUserPurchase) {
            return res.status(401).json({ message: 'You already purchased this course!' });
        }
        next();
    }
    catch (error) {
        return res.status(401).json({ message: error.message });
    }
});
exports.checkDidUserPurchaseCourse = checkDidUserPurchaseCourse;
const checkDidUserPurchaseCourseGuardian = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const courseId = req.params.courseId;
    const lessonID = req.params.lessonID;
    const userId = req.user.id;
    console.log(courseId, lessonID, "OVO JE TO");
    try {
        const checkIsModelPrivate = yield lessondetails.findOne({
            where: {
                lesson_id: lessonID
            }
        });
        const checkDidUserPurchase = yield Enrollment.findOne({
            where: {
                courseCourseId: courseId, userId: userId
            }
        });
        if ((checkIsModelPrivate === null || checkIsModelPrivate === void 0 ? void 0 : checkIsModelPrivate.private) === false) {
            next();
        }
        else if ((checkIsModelPrivate === null || checkIsModelPrivate === void 0 ? void 0 : checkIsModelPrivate.private) === true && checkDidUserPurchase === null) {
            return res.status(401).json({ message: 'You have to pay for this course' });
        }
        else if ((checkIsModelPrivate === null || checkIsModelPrivate === void 0 ? void 0 : checkIsModelPrivate.private) === true && (checkDidUserPurchase === null || checkDidUserPurchase === void 0 ? void 0 : checkDidUserPurchase.userId) === userId) {
            next();
        }
    }
    catch (error) {
        return res.status(401).json({ message: error.message });
    }
});
exports.checkDidUserPurchaseCourseGuardian = checkDidUserPurchaseCourseGuardian;
const checkDoesRoleExists = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { addRoleName } = req.body;
    try {
        const doesRoleExist = yield ROLES.findOne({
            where: {
                name: addRoleName
            }
        });
        if (doesRoleExist) {
            return res.status(401).json({ message: 'That role already exists' });
        }
        next();
    }
    catch (error) {
        return res.status(401).json({ message: error.message });
    }
});
exports.checkDoesRoleExists = checkDoesRoleExists;
const checkIsEmailSubscribed = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    try {
        const findEmail = yield emailSub.findOne({
            where: {
                emailOfSub: email
            }
        });
        if (findEmail) {
            return (0, responses_1.sendResponseFailure)(401, 'Email already subscribed', res);
        }
        next();
    }
    catch (error) {
        return (0, responses_1.sendResponseFailure)(401, error.message, res);
    }
});
exports.checkIsEmailSubscribed = checkIsEmailSubscribed;
exports.verifySignUp = {
    checkUsernameOrEmail: exports.checkUsernameOrEmail,
    checkRoleExisted: exports.checkRoleExisted,
    checkDidUserPurchaseCourse: exports.checkDidUserPurchaseCourse,
    checkDidUserPurchaseCourseGuardian: exports.checkDidUserPurchaseCourseGuardian,
    checkDoesRoleExists: exports.checkDoesRoleExists,
    checkIsEmailSubscribed: exports.checkIsEmailSubscribed
};
exports.default = exports.verifySignUp;
