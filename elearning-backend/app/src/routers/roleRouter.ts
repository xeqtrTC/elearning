import express from 'express';
const router = express.Router();
import * as roles from '../controllers/rolesController';
import { verifySettings } from '../middleware';


router.route('/addRole').post(roles.addNewRole);
router.route('/removeRole').post(roles.removeRole);
router.route('/updateRoleName').post(roles.updateRoleName)

export = router