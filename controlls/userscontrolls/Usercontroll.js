import Usermodels from "../../models/usermodels/Usermodels";


import bcrypt from 'bcrypt';
import referralcodes from 'referral-codes'

// create
export const UserCreate = async (req, res) => {
    const { username, email, password, startdate, enddate, refercode } = req.body;
    try {
        const existuserscheck = await Usermodels.findOne({ email });
        if (existuserscheck) {
            return res.status(404).json("user already register")
        }
        const salt = bcrypt.genSaltSync(10);
        const hash = await bcrypt.hashSync(password, salt);
        const RefferFriendsCode = Math.floor(Math.random() * 4560000);
        const sample = referralcodes.generate({
            length: 10,
            count: 1,
            charset: referralcodes.charset('alphanumeric'),
        });
        const CreateUser = new Usermodels({
            username: username,
            email: email,
            password: hash,
            startdate: startdate,
            enddate: enddate,
            refercode: username.toUpperCase().concat(RefferFriendsCode)
        });
        await CreateUser.save();
        res.status(201).json(CreateUser);

    }
    catch (err) {
        res.status(404).json("Somehting error usermanagement");
    }
}


// update


export const UserUpdate = async (req, res) => {

    try {
        await Usermodels.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
        res.status(200).json("Update Data...");

    }
    catch (err) {
        res.status(404).json("Somehting error usermanagement");
    }
}


// delete


export const UserDelete = async (req, res) => {

    try {
        await Usermodels.findByIdAndDelete(req.params.id);
        res.status(200).json("Delete Data...");

    }
    catch (err) {
        res.status(404).json("Somehting error usermanagement");
    }
}


// single data


export const UserSingleUser = async (req, res) => {

    try {
        const Data = await Usermodels.findById(req.params.id);
        res.status(200).json(Data);

    }
    catch (err) {
        res.status(404).json("Somehting error usermanagement");
    }
}


// allusers data



export const UserAlluserData = async (req, res) => {

    try {
        const Data = await Usermodels.find();
        res.status(200).json(Data);

    }
    catch (err) {
        res.status(404).json("Somehting error usermanagement");
    }
}