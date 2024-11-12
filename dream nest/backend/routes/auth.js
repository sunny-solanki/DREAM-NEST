import express from "express"
import multer from "multer"
import { registerUser, loginUser } from "../controllers/authControllers.js"

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

router.post("/register", upload.single('profileImage'), registerUser);
router.post("/login", loginUser);

export default router;