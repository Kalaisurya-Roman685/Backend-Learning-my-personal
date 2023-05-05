import Usermodels from "../../models/usermodels/Usermodels";


import bcrypt from 'bcrypt';
import referralcodes from 'referral-codes'
import Loginmodel from "../../models/login/Loginmodel";

// create
export const UserCreate = async (req, res) => {
    const { title, des, startdate, enddate, refercode, userId, image } = req.body;
    try {


        console.log(req.file.path, "usercontrol")
        const RefferFriendsCode = Math.floor(Math.random() * 4567758476840000);
        const sample = referralcodes.generate({
            length: 10,
            count: 1,
            charset: referralcodes.charset('alphanumeric'),
        });
        const CreateUser = new Usermodels({
            title: title,
            userId: userId,
            des: des,
            startdate: startdate,
            enddate: enddate,
            image: req.file.path,
            refercode: RefferFriendsCode
        });
        await CreateUser.save();
        res.status(201).json(CreateUser);

    }
    catch (err) {
        res.status(404).json("Something Missing...");
    }
}


// update


export const UserUpdate = async (req, res) => {
    try {
        const RefferFriendsCode = Math.floor(Math.random() * 4567758476840000);
        await Usermodels.findByIdAndUpdate(req.params.id, {
            title: req.body.title,
            userId: req.body.userId,
            des: req.body.des,
            startdate: req.body.startdate,
            enddate: req.body.enddate,
            image: req.file.path,
            refercode: RefferFriendsCode
        }, { new: true });
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

        const Data = await Usermodels.find({userId:req.params.id});

        // const Samples = await Loginmodel.findOne({ email });

        console.log(Data,"kalai")


        res.status(200).json(Data);
    }
    catch (err) {
        res.status(404).json("Somehting error usermanagement");
    }
}

// get user details


export const getUserData = async (req, res) => {
    try {

        const Data = await Usermodels.findById(req.params.userId);

        // const Samples = await Loginmodel.findOne({ email });

        console.log(Data)


        res.status(200).json(Data);
    }
    catch (err) {
        res.status(404).json("Somehting error usermanagement");
    }
}