const User = require('../models/user');
const bcrypt = require('bcrypt');
const saltRound = 10
const jwt = require('jsonwebtoken')
const secret = process.env.SECRET;



exports.register = async (req, res) => {
  try {
    hashedpassword = await bcrypt.hash(req.body.password, saltRound)
    const finduser = await User.findOne({ email: req.body.email })
    const finduserphone = await User.findOne({ phone: req.body.phone })
    if (finduser || finduserphone) {
      res.status(402).send("the user already exist")
    } else {
      const newuser = await User.create({ username: req.body.username, email: req.body.email, password: hashedpassword, phone: req.body.phone })
      if (newuser) {
        const token = jwt.sign({ id: newuser._id }, process.env.SECRET)
        res.status(200).json({ token })
      }
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
}




exports.login = async (req, res) => {
  try {
    const emailexist = await User.findOne({ email: req.body.email })
    if (emailexist) {
      const verifypassword = bcrypt.compare(req.body.password, emailexist.password)
      if (verifypassword) {
        const token = jwt.sign({ id: emailexist._id }, process.env.SECRET)
        res.status(200).json({ token })
      } else {
        res.status(402).send('password is incorrect')
      }
    } else {
      res.status(401).send('user email does not exists')
    }
  } catch (err) {
    res.status(500).send(err.message)
  }
}



exports.finduser = async (req, res) => {
  try {
    const verifiedtoken = jwt.verify(req.body.token, process.env.SECRET)
    if (verifiedtoken) {
      const olduser = await User.findById(verifiedtoken.id).populate("rooms")
      res.status(200).send(olduser)
    } else {
      res.status(401).send('user doesnt exist anymore')
    }
  } catch (err) {
     res.status(500).send(err.message)
  }
}


exports.searchuser = async (req,res) => {


}