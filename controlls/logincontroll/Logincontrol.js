import Loginmodel from "../../models/login/Loginmodel.js"

import bcrypt from 'bcrypt';

import asyncHandler from 'express-async-handler';
import { TokenGenrate } from "../../config/jwttoken.js";

export const LoginControlsData = asyncHandler(async (req, res) => {

    const email = req.body.email;

    const Existusercheck = await Loginmodel.findOne({ email });
    if (!Existusercheck) {
        const responsedata = await Loginmodel.create(req.body);
        res.status(201).json(responsedata);
    }
    else {
        throw new Error("User Already Register..")

    }




})





export const LoginAdmin = asyncHandler(async (req, res) => {
    const { firstname, lastname, email, password, image, dob, contactno } = req.body;



    const existsusers = await Loginmodel.findOne({ email });

    if (existsusers && existsusers.password == req.body.password) {
        const salt = bcrypt.genSaltSync(10);
        const hash = await bcrypt.hashSync(password, salt);
        const data = {
            id: existsusers?.id,
            token: TokenGenrate(existsusers?.id)
        }
        res.json(data);
    }
    else {
        throw new Error("Invalid Creaditional..")
    }










});


export const GetUserLogindata = asyncHandler(async (req, res) => {

    const Data = await Loginmodel.findById(req.params.id);

    if (Data) {
        res.json(Data);
    }
    else {
        throw new Error("No Records and User Not Found...!");
    }


})



export const UpdateUserLogindata = asyncHandler(async (req, res) => {

    const Data = await Loginmodel.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
    if (Data) {
        res.json(Data);
    }
    else {
        throw new Error("No Records and User Not Found...!");
    }


})




export const UserDelete = asyncHandler(async (req, res) => {

    const Data = await Loginmodel.findByIdAndDelete(req.params.id);
    if (Data) {
        res.json("User Deleted Successfully...");
    }
    else {
        throw new Error("No Records and User Not Found...!");
    }


})


