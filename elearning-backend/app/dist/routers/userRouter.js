"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const authController = __importStar(require("../controllers/authController"));
const userController = __importStar(require("../controllers/userController"));
const emailController = __importStar(require("../controllers/emailSubController"));
const middleware_1 = require("../middleware/");
//GET
router.route('/whoAmI').get(authController.whoAmI);
router.route('/getAllRoles').get(authController.getAllRoles);
router.route('/verifyAccountByToken/:token').get(authController.verifyAccountByToken);
router.route('/getAllUsers').get(userController.getAllUsers);
router.route('/findOneUserRoles/:id').get(userController.findOneUser);
router.route('/getEmailByUniqueID/:uniqueID').get(emailController.getEmailByUniqueID);
//POST
router.route('/addUser').post([
    middleware_1.verifySignUp.checkUsernameOrEmail,
    middleware_1.verifySignUp.checkRoleExisted
], authController.signUp);
router.route('/login').post(authController.loginUser);
router.route('/logout').post(authController.logoutUser);
router.route('/addRoleToUser').post(userController.addRoleToUser);
router.route('/removeRoleFromUser').post(userController.removeRoleFromUser);
router.route('/editUserProfile').post(userController.editUserProfile);
router.route('/subscribeToEmail').post([middleware_1.verifySignUp.checkIsEmailSubscribed], emailController.subscribeToEmail);
router.route('/sendEmailToSubscribers').post(emailController.sendEmailToSubscribers);
router.route('/removeSubscription').post(emailController.removeSubscription);
exports.default = router;
