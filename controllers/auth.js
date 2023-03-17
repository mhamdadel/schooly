const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const HttpError = require("../helpers/http-error");
const errHandler = require("../helpers/errHandler");
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
        return next(err);
    }
};

const signin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const existingUser = await userModel.findOne({ email });

        if (!existingUser) {
            return res.status(404).json({ message: "user doesn't exist" });
        }
        const isPasswordCorrect = await bcrypt.compare(
            password,
            existingUser.password
        );
        if (!isPasswordCorrect) {
            const error = new HttpError(
                "Invalid credentials, could not log you in.",
                403
            );
            return next(error);
        }
        const token = jwt.sign(
            {
                email: existingUser.email,
                id: existingUser._id,
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "48h",
            }
        );
        return res
            .cookie("authorization", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
            })
            .status(200)
            .json({ message: "Logged in successfully" });
    } catch (err) {
        const error = new HttpError(err.message, 403);
        return next(error);
    }
};

const signup = async (req, res) => {
    const { firstName, lastName, username, email, password, confirmPassword } =
        req.body;
    const name = firstName + " " + lastName;
    try {
        const existingUser = await userModel.findOne({
            $or: [{ email }, { username }],
        });

        if (existingUser)
            return res.status(400).json({
                message: "user already exist",
            });

        if (password !== confirmPassword) {
            return res
                .status(400)
                .json({ message: "two passwords doesn't match" });
        }

        const salt = await bcrypt.genSalt(10);
        await bcrypt.hash(password, salt, async (err, hashedPassword) => {
            if (err) res.status(400).json({ message: err.message });
            try {
                const result = await userModel.create({
                    email,
                    username,
                    password: hashedPassword,
                    name: name,
                });
                if (!result) {
                    return res.status(400).json({
                        status: res.statusCode,
                        message: "invalid password",
                    });
                } else {
                    const token = await jwt.sign(
                        {
                            email: result.email,
                            id: result._id,
                        },
                        process.env.JWT_SECRET,
                        {
                            expiresIn: "1h",
                        }
                    );

                    return res.status(200).json({
                        email: result.email,
                        username: result.username,
                        token,
                    });
                }
            } catch (err) {
                return new HttpError(401, err.message);
            }
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

const signout = (req, res) => {
    res.clearCookie("authorization");
    res.status(200).json({ message: "logged out successfully" });
};

module.exports = {
    getAll,
    signup,
    signin,
    signout,
};
