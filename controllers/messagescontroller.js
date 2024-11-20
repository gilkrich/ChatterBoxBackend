const Room = require('../models/room');
const User = require('../models/user');
const Message = require('../models/message');


exports.newmessage = async (req,res) => {
    try{
      console.log(req.body);
        const newmessage = await Message.create({message:req.body.newmessage,messageTime:req.body.messageTime,author:req.body.author})
        const pushmessege = await Room.findByIdAndUpdate(req.body.room,{$push:{messages:{_id:newmessage._id}}})
     }catch(err){
        res.status(500).send(err.message)
     }
}