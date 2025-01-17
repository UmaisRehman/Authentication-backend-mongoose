import express from "express";
import cors from "cors"; // Import CORS package
import cookieParser from "cookie-parser";
import connectDB from "./src/db/index.js";
import userRoutes from "./src/routes/user.routes.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();

// Enable CORS for all origins (you can limit it to specific origins if needed)
app.use(cors({
  origin: 'http://localhost:5173', // Only allow your frontend's origin
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow specific methods
  credentials: true // Allow cookies to be sent with the requests
}));

app.use(cookieParser());
app.use(express.json());

// Routes
app.use('/api/v1', userRoutes);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

connectDB()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`⚙️  Server is running at port : ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log("MONGO DB connection failed !!! ", err);
  });
