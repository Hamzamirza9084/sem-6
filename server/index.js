import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config()
import { UserRouter } from './routes/user.js'
import cookieParser from 'cookie-parser'

const app = express()

app.use(express.json())
app.use(cors({
    origin:["http://localhost:5173"],
    credentials: true
}))
app.use(cookieParser())
app.use('/auth',UserRouter)

mongoose.connect("mongodb+srv://hamzamirza9084:surge7698302331@cluster0.ixn2m.mongodb.net/attendance_db")

app.get("/",(req,res)=>{
    res.json("Hello");
}
)

app.listen(process.env.PORT,()=>{
    console.log("server is running")
})