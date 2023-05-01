import mongoose from "mongoose";


const UserMange = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true,
    },
    des: {
        type: String,
        required: true,
    },
    startdate: {
        type: String,
        required: true
    },
    enddate: {
        type: String,
        required: true
    },
    refercode: {
        type: String,
    },
    image: {
        type: String,
    }
})


export default mongoose.model("usermanagement", UserMange);