import express from "express"
import cors from 'cors'
import 'dotenv/config'
import { connectDB } from "./config/db.js";
import testRouter from "./routes/testRoute.js";
import userRouter from "./routes/userRoute.js";
import cartRouter from "./routes/cartRoute.js";
import requestRouter from "./routes/requestRoute.js";
import path from "path";

const app = express()
const port = process.env.PORT || 4000;

app.use(express.json());
app.use(cors());

connectDB();

const __dirname = path.resolve();

// Serve the "pdfs" directory for mailing slips
app.use("/pdfs", express.static(path.join(__dirname, "pdfs")));

// Serve the public directory for instructions.pdf
// Place instructions.pdf in: backend/public/assets/instructions.pdf
app.use(express.static(path.join(__dirname, "public")));

// API endpoints
app.use('/api/test', testRouter)
app.use('/api/user', userRouter)
app.use('/api/cart', cartRouter)
app.use('/api/request', requestRouter)

app.get("/", (req, res) => {
    res.send("API Working habibi")
});

app.listen(port, () => console.log(`Server started on http://localhost:${port}`));
