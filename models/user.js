const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    phone : {type:Number,required:true,unique:true},
    username: { type: String, required: true ,unique:true},
    password: { type: String, required: true },
    rooms : [
        {type:mongoose.Types.ObjectId,ref:'Room'}
        ]
});

module.exports = mongoose.model('User', userSchema);