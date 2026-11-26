import express from "express"
import adminRouter from "./routers/admins.js"
import { configDotenv } from "dotenv"
configDotenv()

const app = express()

app.use(express.json())
app.use(adminRouter)

app.listen(process.env.PORT, () => console.log("Server ishlayabdi..."))