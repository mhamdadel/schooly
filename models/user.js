mongoose = require("mongoose");
// create schema strucure of model
const userSchema = mongoose.Schema({
    name: {
        type: String,
    },
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    active: {
        type: Boolean,
        default: true,
    },
    lastLogin: {
        type: Date,
    },
    roleId: {
        type: String,
    },
    // user or block user or admin etc...
    createdAt: {
        type: Date,
        default: new Date(),
    },
});

// create model which handle and control user information
const userModel = mongoose.model("User", userSchema);

module.exports = userModel;
