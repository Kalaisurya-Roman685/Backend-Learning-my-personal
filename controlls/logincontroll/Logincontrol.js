import Loginmodel from "../../models/login/Loginmodel.js"

import bcrypt from 'bcrypt';

export const LoginControlsData = async (req, res) => {

    const { firstname, lastname, email, password, image, dob, contactno } = req.body;

    // let existusers;

    // try {
    //     existusers = await Loginmodel.findOne({ email });
    // }
    // catch (err) {
    //     console.log(err);
    // }

    // if (existusers) {
    //     return res.status(404).json("user Alredy Register!!");
    // }





    try {

        const users = await new Loginmodel({
            firstname, lastname, email, password, dob, contactno, image
        })

        if (email == "kalai@gmail.com" && password == "kalai1234") {
            await users.save();
            return res.status(201).json(users);
        }
        else {
            res.status(404).json("Something error!!!")
        }

    }
    catch (err) {
        res.status(404).json("Something Wrong")
    }

}





export const LoginAdmin = async (req, res) => {
    const { firstname, lastname, email, password, image, dob, contactno } = req.body;



    try {


        const salt = bcrypt.genSaltSync(10);
        const hash = await bcrypt.hashSync(password, salt);

        const exitsusers = await Loginmodel.findOne({ email: email });
        if (email == "kalai@gmail.com" && password == "kalai1234") {

            const data = {
                id: exitsusers?.id,
            }
            return await res.status(200).json(data);
        }
        else {
            return res.status(404).json("Username and password Wrong...!");

        }
    }
    catch (err) {
        res.status(404).json("User Not Found!!!");
    }
}


export const GetUserLogindata = async (req, res) => {
    try {
        const Data = await Loginmodel.findById(req.params.id);

        if (Data) {
            res.status(200).json(Data);
        }
        else {
            res.status(404).json("No Records and User Not Found...!");
        }
    }
    catch (err) {
        res.status(404).json("something error!!!");
    }
}



export const UpdateUserLogindata = async (req, res) => {
    try {
        const Data = await Loginmodel.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
        if (Data) {
            res.status(200).json(Data);
        }
        else {
            res.status(404).json("No Records and User Not Found...!");
        }
    }
    catch (err) {
        res.status(404).json("something error!!!");
    }
}




