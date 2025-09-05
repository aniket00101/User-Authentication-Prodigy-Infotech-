import express from "express"
import "dotenv/config";
import connectDB from "./database/db.js";
import userRoute from "./routes/userRoutes.js"
import cors from 'cors'

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors({
    origin:'http://localhost:5173',
    credentials:true
}))

app.use('/user',userRoute)


app.listen(port, () => {
    connectDB()
    console.log(`Server is running at port ${port}`);
})