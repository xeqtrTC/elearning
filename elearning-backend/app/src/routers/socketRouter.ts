import express from 'express';
const router = express.Router();
import * as socketQuery from '../socket/socket';

// GET
router.route('/getLiveRooms').get(socketQuery.getLiveRooms);
router.route('/getLiveMessages').get(socketQuery.getLiveMessages)

// POST.
router.route('/deleteAllChats').post(socketQuery.deleteAllChats);
router.route('/deleteOneChat').post(socketQuery.deleteOneChat);


export = router