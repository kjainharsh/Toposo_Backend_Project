const ToposoUser = require("../models/user-models");

const register = async (req, res, next) => {
    try {
        console.log(req.body);
        const { username, email, password, gender, country, dateOfBirth } = req.body;

        const UserExist = await ToposoUser.findOne({ email: email });
        if (UserExist) {
            return res.status(400).json({ message: "Email already exists" });
        }

        const data = await ToposoUser.create({ username, email, password, gender, country, dateOfBirth });
        res.status(200).json({ msg: "Registration Successfully Done ", token: await data.generateToken(), userId: data._id.toString() });
    } catch (error) {
        next(error);
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const userExist = await ToposoUser.findOne({ email });
        if (!userExist) {
            return res.status(400).json({ message: "Invalid Credentials" });
        }
        const user = await userExist.comparePassword(password);
        if (user) {
            res.status(200).json({ msg: "Login Successfully Done ", token: await userExist.generateToken(), userId: userExist._id.toString() });
        }
        else {
            res.status(401).json({ message: "Invalid Login Credentials" });
        }
    }
    catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

const searchUserByUsername = async (req, res) => {
    try {
        const { username } = req.params;
        const user = await ToposoUser.findOne({ username });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ user });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

module.exports = { register, login, searchUserByUsername };