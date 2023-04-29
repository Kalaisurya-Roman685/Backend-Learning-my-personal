import express from "express";
import dotenv from 'dotenv';

import cors from 'cors';

import mongoose from "mongoose";
import routinglogin from "./routers/loginrouter/Loginrouter.js";
import routinguser from "./routers/userrouting/Userrouting.js";

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

app.use(cors());

// api routings


app.use("/auth", routinglogin);
app.use("/users", routinguser);


app.listen(8000, (req, res) => {
    ConnectMongoose();
    console.log("Port Is Runing 8000");
})









