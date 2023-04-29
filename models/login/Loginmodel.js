import mongoose from "mongoose";

const LoginModel = mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    dob: {
        type: String,
        required: true
    },
    contactno: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true
    }

});

export default mongoose.model("userlogin", LoginModel);