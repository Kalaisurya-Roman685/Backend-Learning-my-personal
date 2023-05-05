import Loginmodel from "../../models/login/Loginmodel.js"

import bcrypt from 'bcrypt';

import asyncHandler from 'express-async-handler';
import { TokenGenrate } from "../../config/jwttoken.js";

import passport from "passport";


import GoogleStrategy from 'passport-google-oauth20'
// .Strategy;

const GOOGLE_CLIENT_ID = '466864356994-5qbj5ji7nf7rq1v0i6m9vfv1eqmoaoh0.apps.googleusercontent.com'
const GOOGLE_CLIENT_SECRET = "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"
passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:8000/auth/google/callback" || "http://localhost:3000/auth/google/callback"
},
    function (accessToken, refreshToken, profile, cb) {
        return cb(null, profile);

    }
));

passport.serializeUser(function (user, done) {
    done(null, user);
})

passport.deserializeUser(function (user, done) {
    done(null, user);
})

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



    const Data = await Loginmodel.findByIdAndUpdate(req.params.id, {
        firstname: req.body.firstname, lastname: req.body.lastname, email: req.body.email, password: req.body.password, image: req.file.path, dob: req.body.dob, contactno: req.body.contactno

    }, { new: true });
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


