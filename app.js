import express from "express";
import dotenv from 'dotenv';

import cors from 'cors';

import bodyParser from 'body-parser';

import morgan from "morgan";


import mongoose from "mongoose";
import routinglogin from "./routers/loginrouter/Loginrouter.js";
import routinguser from "./routers/userrouting/Userrouting.js";
import { Notfound, errorHandler } from "./middlewares/errorhandler.js";
import RoutingBanner from "./routers/bannerroutings/Bannerrouting.js";
import expresssession from 'express-session';
import passport from "passport";
import compression from "compression";

function isLoggined(req, res, next) {
    req?.user ? next() : res.sendStatus(404);
}



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

app.use(morgan("dev"));

app.use(cors());

app.use(bodyParser.json());

app.use(expresssession({ secret: 'cats' }));

app.use(passport.initialize());
app.use(passport.session());


app.use("/Images", express.static("./Images"))

// api routings


app.use(compression({
    level: 10 * 1000,
    filter: (req, res) => {
        if (req.headers["x-no-compression"]) {
            return false
        }
    }
}))



app.use("/auth", routinglogin);
app.use("/users", routinguser);
app.use("/banners", RoutingBanner);





app.use(Notfound);
app.use(errorHandler);


app.listen(8000, (req, res) => {
    ConnectMongoose();
    console.log("Port Is Runing 8000");
})









