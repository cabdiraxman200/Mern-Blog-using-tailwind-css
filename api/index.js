import express from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv'
import userRoutes from './routes/user_route.js'
import authRoutes from './routes/auth.route.js';
dotenv.config()
const app= express();
app.use(express.json());
mongoose.connect(process.env.MONGO)
.then(()=>{
    console.log("connection  to mangodb ")
})
.catch((err)=>{
    console.log(err);
})
app.listen(3000,()=>{
    console.log("sever is running on port 3000")
});
app.use("/api/user",userRoutes)
app.use("/api/auth",authRoutes);
app.use((err,req,res,next,)=>{
    const statusCode= err.statusCode || 500;
    const message= err.message || "internal server error";
    res.status(statusCode).json({
        success:false,
        statusCode,
        message
    })
})