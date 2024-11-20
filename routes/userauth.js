const express = require("express");
const userauthController = require("../controllers/userauthcontroller");
const router = express.Router();

router.route('/register').post(userauthController.register);
router.route('/login').post(userauthController.login);
router.route('/finduser').post(userauthController.finduser);



module.exports = router;