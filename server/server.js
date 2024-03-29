import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import route from "./routes/route.js"; 

dotenv.config();
const PORT = process.env.PORT || 5000;

const app = express();

// middleware
app.use(express.json());
app.use(cors());

// routes for api endpoints
app.use("/api", route);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});