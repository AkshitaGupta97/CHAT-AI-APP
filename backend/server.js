import express from "express";
import cors from 'cors';
import 'dotenv/config';
import connectDB from "./config/db.js";
import userRoute from "./routes/userRoute.js";

const app = express();

// Database
await connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/', (req, res) => res.send('Server is Live!'));
app.use('/api/user', userRoute);

const PORT = 3000; // or process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})
