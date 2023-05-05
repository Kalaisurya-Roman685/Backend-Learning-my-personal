import express from "express";
import multer from "multer";

import path from "path";
import { UserAlluserData, UserCreate, UserDelete, UserSingleUser, UserUpdate } from "../../controlls/userscontrolls/Usercontroll";

const routinguser = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "Images")
    },
    filename: (req, file, cb) => {
        return cb(null, Date.now() + path.extname(file.originalname))
    }
})
const upload = multer({
    storage: storage,
    limits: { fileSize: "100000" },
    fileFilter: (req, file, cb) => {
        const fileTypes = /jpeg|jpg|png|gif/

        const mimeType = fileTypes.test(file.mimetype)
        const extname = fileTypes.test(path.extname(file.originalname))

        if (mimeType && extname) {
            return cb(null, true)
        }

        cb("Give proper files formate to upload images....")
    }
}).single("image");

routinguser.post("/create", upload, UserCreate);
routinguser.put("/update/:id", upload, UserUpdate);
routinguser.delete("/delete/:id", UserDelete);
routinguser.get("/getuser/:id", UserSingleUser);
routinguser.get("/allusers/:id", UserAlluserData);






export default routinguser;