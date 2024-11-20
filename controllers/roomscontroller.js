const Room = require('../models/room');
const User = require('../models/user');

exports.createroom = async (req,res) => {
    try{
       const newroom = await Room.create({participants:[req.body.loggeduser,req.body.newfriend]})
       const pushtologged = await User.findOneAndUpdate({username:req.body.loggeduser},{$push:{rooms:{_id:newroom._id}}})
       const pushtonew = await User.findOneAndUpdate({username:req.body.newfriend},{$push:{rooms:{_id:newroom._id}}})
    }catch(err){
       res.status(500).send(err.message)
    }
}

exports.checkuser = async (req,res) => {
    try{
       const finduser = await User.findOne({phone:req.body.searchinfo})
       console.log(req.body.searchinfo);
       if (finduser) {
            res.status(200).send({username:finduser.username})        
       }else{
        res.status(401).send('user does not exist')
       }
    }catch(err){
       res.status(500).send(err.message)
    }
}

exports.getroom = async (req,res) => {
    try{
       const choosenroom = await Room.findById(req.body.roomnumber).populate("messages")
       if (choosenroom) {
         res.status(200).send(choosenroom)
       }else{
         res.status(401).send("room does not exist")
       }
    }catch(err){
       res.status(500).send(err.message)
    }
}