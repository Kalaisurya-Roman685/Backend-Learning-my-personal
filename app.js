import express from "express";
import dotenv from 'dotenv';

import cors from 'cors';



import mongoose, { now } from "mongoose";
import routinglogin from "./routers/loginrouter/Loginrouter.js";
import routinguser from "./routers/userrouting/Userrouting.js";
import { Notfound, errorHandler } from "./middlewares/errorhandler.js";
import bodyParser from 'body-parser';



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

app.use(bodyParser.json());


app.use("/Images", express.static("./Images"))

// api routings


app.use("/auth", routinglogin);
app.use("/users", routinguser);


app.use(Notfound);
app.use(errorHandler);


app.listen(8000, (req, res) => {
    ConnectMongoose();
    console.log("Port Is Runing 8000");
})









