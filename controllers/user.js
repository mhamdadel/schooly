const HttpError = require("../helpers/http-error");
const userModel = require("../models/user");

const getAll = async (req, res, next) => {
    try {
        // we use here try and catch becuase is model
        // we use here asycronize becuase find() return Promise
        const allUsers = await userModel.find();
        // if all things are down send success response
        res.status(200).json(allUsers);
    } catch (err) {
        const error = new HttpError(err.message, 404);
        return next(error);
    }
};

module.exports = {
    getAll,
};
