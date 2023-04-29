import express from "express";
import { UserAlluserData, UserCreate, UserDelete, UserSingleUser, UserUpdate } from "../../controlls/userscontrolls/Usercontroll";

const routinguser = express.Router();

routinguser.post("/create", UserCreate);
routinguser.put("/update/:id", UserUpdate);
routinguser.delete("/delete/:id", UserDelete);
routinguser.get("/getuser/:id", UserSingleUser);
routinguser.get("/allusers", UserAlluserData);






export default routinguser;