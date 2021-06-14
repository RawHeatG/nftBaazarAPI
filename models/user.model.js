const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema({
    username: {
        type: String,
        unique: [true, "Username should be unique"]
    },
    password: {
        type: String,
        required: [true, "Password is required"]
    },
    secret: String
})

const User = mongoose.model("User", UserSchema);

module.exports = {User}