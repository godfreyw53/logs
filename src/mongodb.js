const mongoose = require('mongoose');


const connect = mongoose.connect("mongodb://localhost:27017/LoginSignUp")
  .then(()=>{
    console.log("Mongodb Connected");
  }).catch(()=>{
    console.log("Mongodb not connected");
  });

  const loginSchema = new mongoose.Schema({
    name:{
      type: String,
      required: true
    },
     password:{
      type: String,
      required: true
    },
    createdAt:{
      type: Date,
      default:Date.now
    }
  });

  const collection = new mongoose.model("users", loginSchema);

  module.exports = collection;