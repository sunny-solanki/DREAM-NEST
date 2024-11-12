import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";

import authRoutes from "./routes/auth.js";
import listingRoutes from "./routes/listing.js";
import bookingRoutes from "./routes/booking.js";
import userRoutes from "./routes/user.js";

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 3000;

// middlewares
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

// routes
app.use("/auth",authRoutes);
app.use("/properties",listingRoutes);
app.use("/bookings",bookingRoutes);
app.use("/users",userRoutes);

app.get("/",(req,res) => {
    res.send("Hello World!");
});

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
});