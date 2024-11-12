import mongoose from "mongoose";

const connectDB = async() => {
    try {
        const response = await mongoose.connect(process.env.MONGO_URI);
        if(response){
            console.log("MongoDB Connected");
        }
    } catch (error) {
        console.log(error);
    }
}

export default connectDB;