import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import User from "../models/User.js"


const registerUser = async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;
        const profileImage = req.file;

        if (!firstName || !lastName || !email || !password) {
            return res.status(400).json({ message: "Please fill in all fields." })
        }

        if (!profileImage) {
            return res.status(400).json({ message: "Please upload a profile image." })
        }

        const profileImagePath = profileImage.path;

        const exists = await User.findOne({ email });
        if (exists) {
            return res.status(400).json({ message: "Email already exists." })
        }

        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);

        // creating a new user
        const newUser = new User({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            profileImagePath,
        });

        await newUser.save();
        res.status(200).json({ message: "User registered successfully", user: newUser });
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Registeration Failed", error: error.message });
    }
}

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User doesn't exists!. Please sign in first" })
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid password!" })
        }

        // Generating JWT Token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY)
        delete user.password

        res.status(200).json({ token, user });

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message })
    }
}

export { loginUser, registerUser };