const express = require("express");
const messagescontroller = require("../controllers/messagescontroller");
const router = express.Router();


router.route('/newmes').post(messagescontroller.newmessage);



module.exports = router;

