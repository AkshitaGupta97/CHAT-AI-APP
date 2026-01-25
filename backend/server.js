import express from "express";
import cors from 'cors';
import 'dotenv/config';
import connectDB from "./config/db.js";
import userRoute from "./routes/userRoute.js";
import chatRouter from "./routes/chatRoute.js";
import messageRouter from "./routes/messageRoutes.js";
import creditRouter from "./routes/creditRoute.js";
import { stripeWebhook } from "./controllers/webhookController.js";

const app = express();

// Database
await connectDB();

// stripe webhook
app.post('api/stripe', express.raw({type: 'application/json'}), stripeWebhook);

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/', (req, res) => res.send('Server is Live!'));
app.use('/api/user', userRoute);
app.use('/api/chat', chatRouter);
app.use('/api/message', messageRouter);
app.use('/api/credit', creditRouter);

const PORT = 3000; // or process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})
