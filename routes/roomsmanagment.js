const express = require("express");
const roomscontroller = require("../controllers/roomscontroller");
const router = express.Router();

router.route('/createroom').post(roomscontroller.createroom);
router.route('/checkuser').post(roomscontroller.checkuser);
router.route('/getroom').post(roomscontroller.getroom);



module.exports = router;