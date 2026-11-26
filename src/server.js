import express from "express"
import adminRouter from "./routers/admins.js"
import teachersRouter from "./routers/teachers.js"
import { configDotenv } from "dotenv"
configDotenv()

const app = express()

app.use(express.json())
app.use(adminRouter)
app.use(teachersRouter)

app.listen(process.env.PORT, () => console.log("Server ishlayabdi..."))