import express from "express";
import multer from "multer";
import { createListing, getListing } from "../controllers/listingControllers.js"

const router = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
});

const upload = multer({ storage });

router.post("/create", upload.array("listingPhotos"), createListing);
router.get("/", getListing);

export default router;