const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require("dotenv").config();
const cors = require("cors");
const userauth = require("./routes/userauth")
const roomsmanagment = require("./routes/roomsmanagment")
const messages = require('./routes/messagesmanagment')
const { Server } = require("socket.io");

app.use(cors());

const server = app.listen(3014, () => {
  console.log("Server running on port 3014");
});


mongoose
  .connect(
    "mongodb+srv://gilmessege:y304tfc4nesNOd0U@meesenger.dguyfzd.mongodb.net/?retryWrites=true&w=majority",

    {}
  )
  .then(async () => {
    console.log("Successfully connected to MongoDB Atlas");
    // const collections = await mongoose.connection.db.listCollections().toArray();
    // console.log("Collections:", collections.map(collection => collection.name));
    // await mongoose.connection.db.collection('messages').deleteMany({});
    // console.log("Collection 'messages' cleared");
  })
  .catch((err) => {
    console.log("Unable to connect to MongoDB Atlas");
    console.error(err);
  });




const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});




app.get("/", (req, res) => {
  res.send("Hello World!");
});


app.use(bodyParser.json());

app.use('/messages',messages);

app.use('/users',userauth);

app.use('/rooms',roomsmanagment);



io.on("connection", (socket) => {

  // console.log(`connected ${socket.id}`);

  socket.on('join_room', (data) => {
    data&&data.map((item,index)=>{
      socket.join(item._id)
      console.log(`user logged in room ${item._id}`);
    })
  })
   

  socket.on('send_messege',(data)=>{
    console.log(data);
    // socket.to(data.room).emit("recive_messege",data)
    io.to(data.room).emit("recive_messege", data);
  })

  socket.on("disconnect", () => {
    console.log("user disconnect");
  })

});


