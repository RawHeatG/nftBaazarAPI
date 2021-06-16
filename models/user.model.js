const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema({
    name: {
        type: String,
        required: [true, "Name is required"]
    },
    username: {
        type: String,
        unique: [true, "Username should be unique"]
    },
    email:{
        type: String,
        required: [true, "Email is required"],
        match: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        match: /^[\w!@#\$%\^\&*\)\(+=._-]{6,}$/
    }
})

const User = mongoose.model("User", UserSchema);

module.exports = {User}