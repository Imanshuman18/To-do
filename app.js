import express from "express"
import router from "./routes/user.js"
import taskrouter from "./routes/task.js"
import { config } from "dotenv"
import cookieParser from "cookie-parser"
import { errormiddleware } from "./middlewares/error.js"
import cors from "cors"
config({
    path:"./data/config.env"
})
export const app=express()

//middleware
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin:[process.env.FRONTEND_URI],
    methods:["GET","POST","PUT","DELETE"],
    credentials:true
}))
//routes]

app.use("/api/v1/users",router)
app.use("/api/v1/task",taskrouter)
//error
app.use(errormiddleware)


