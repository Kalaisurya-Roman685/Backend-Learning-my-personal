import express from "express";
import { BannerControlsget, BannerDelete, BannerEdit, BannerGetAll } from "../../controlls/bannercontrol/Bannercontrol";

import multer from "multer";
import path from "path";



const RoutingBanner = express.Router();

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
RoutingBanner.post("/create", upload, BannerControlsget);
RoutingBanner.get("/getallbanners/:id", BannerGetAll);
RoutingBanner.put("/update/:id", upload, BannerEdit);
RoutingBanner.delete("/delete/:id", BannerDelete);


export default RoutingBanner;