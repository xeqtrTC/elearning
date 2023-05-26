import express from 'express';
import { getAllRoles, loginUser, logoutUser, signUp, verifyAccountByToken, whoAmI } from '../controllers/authController';
import { addRoleToUser, editUserProfile, findOneUser, getAllUsers, removeRoleFromUser } from '../controllers/userController';
import { getEmailByUniqueID, removeSubscription, sendEmailToSubscribers, subscribeToEmail } from '../controllers/emailSubController';
import { verifySettings } from '../middleware';
const router = express.Router();


//GET
router.route('/whoAmI').get(whoAmI);
router.route('/getAllRoles').get(getAllRoles);
router.route('/verifyAccountByToken/:token').get(verifyAccountByToken)
router.route('/getAllUsers').get(getAllUsers);
router.route('/findOneUserRoles/:id').get(findOneUser);
router.route('/getEmailByUniqueID/:uniqueID').get(getEmailByUniqueID)

//POST
router.route('/addUser').post(
    [verifySettings.checkUsernameOrEmail],
    signUp);
router.route('/login').post(loginUser);
router.route('/logout').post(logoutUser)
router.route('/addRoleToUser').post(addRoleToUser);
router.route('/removeRoleFromUser').post(removeRoleFromUser);
router.route('/editUserProfile').post(editUserProfile)
router.route('/subscribeToEmail').post( 
    [verifySettings.checkIsEmailSubscribed],
    subscribeToEmail)
router.route('/sendEmailToSubscribers').post(sendEmailToSubscribers)
router.route('/removeSubscription').post(removeSubscription);

export = router