import express from "express"
import "dotenv/config";
import connectDB from "./database/db.js";
import userRoute from "./routes/userRoutes.js"

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

app.use('/user',userRoute)


app.listen(port, () => {
    connectDB()
    console.log(`Server is running at port ${port}`);
})