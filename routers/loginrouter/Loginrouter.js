import express from 'express';
import { GetUserLogindata, LoginAdmin, LoginControlsData, UpdateUserLogindata, UserDelete } from '../../controlls/logincontroll/Logincontrol.js';
import multer from "multer";
import path from "path";
import passport from "passport";
const routinglogin = express.Router();
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

routinglogin.post("/register", LoginControlsData);
routinglogin.post("/login", LoginAdmin);
routinglogin.delete("/delete/:id", UserDelete);
routinglogin.get("/user/:id", GetUserLogindata);
routinglogin.put("/user/update/:id", upload, UpdateUserLogindata);

routinglogin.get("/kalai", (req, res) => {
    res.send('<a href="/auth/google">Google</a>')
})


routinglogin.get("/google", passport.authenticate("google", { scope: ["email", "profile"] }));
routinglogin.get("/google/callback", passport.authenticate("google", {
    successRedirect: "http://localhost:3000/home",
    failureRedirect: "/auth/failure"
}));

routinglogin.get("/failure", (req, res) => {
    res.send("something went wrong...!");
})


export default routinglogin