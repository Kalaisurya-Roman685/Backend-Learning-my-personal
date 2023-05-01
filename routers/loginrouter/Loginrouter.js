
import express from 'express';
import { GetUserLogindata, LoginAdmin, LoginControlsData, UpdateUserLogindata, UserDelete } from '../../controlls/logincontroll/Logincontrol.js';

const routinglogin = express.Router();


routinglogin.post("/register", LoginControlsData);
routinglogin.post("/login", LoginAdmin);
routinglogin.delete("/delete/:id", UserDelete);

routinglogin.get("/user/:id", GetUserLogindata);
routinglogin.put("/user/update/:id", UpdateUserLogindata);

export default routinglogin