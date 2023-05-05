import mongoose from "mongoose";


const Bannermodel = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "userlogin",
        required: true
    },
    image: {
        type: String
    }
});

export default mongoose.model("banne", Bannermodel);