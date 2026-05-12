import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import userRouter from "./routes/users.js";
import productRouter from "./routes/products.js";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "API ishlayabdi " });
});

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.use("/users", userRouter);
app.use("/product", productRouter);

app.listen(PORT, () => {
  console.log(`Server ${PORT}-portda ishlamoqda `);
});
