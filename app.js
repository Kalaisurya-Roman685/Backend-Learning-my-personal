import express from "express";
import dotenv from 'dotenv';

import mongoose from "mongoose";
import routinglogin from "./routers/loginrouter/Loginrouter.js";

const ConnectMongoose = async () => {
    try {
        await mongoose.connect(process?.env?.MONGO_URL);
    }
    catch (err) {
        throw err
    }
}
const app = express();
dotenv.config();
app.use(express.json());

// api routings


app.use("/auth",routinglogin);

app.listen(8000, (req, res) => {
    ConnectMongoose();
    console.log("Port Is Runing 8000");
})









