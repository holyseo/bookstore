import express from "express";
import { PORT, MongoDBURL } from "./config.js";
import mongoose from "mongoose";
import booksRoute from "./routes/booksRoute.js";
import usersRoute from "./routes/usersRoute.js";
import cors from "cors";

const app = express();
app.use(express.json());

app.use(cors());

app.get("/", (req, res) => {
  console.log(req);
  return res.status(234).send("Welcome to MERN Stack Bookstore");
});

app.use("/books", booksRoute);
app.use("/users", usersRoute);

// app.use(
//   cors({
//     origin: "http://localhost:5173",
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     allowedHeaders: ["Content-Type"],
//   })
// );

mongoose
  .connect(MongoDBURL)
  .then(() => {
    console.log(`App connected to MongoDB`);
    app.listen(PORT, () => {
      console.log(`App is listening to  port: ${PORT} the server 🚀`);
    });
  })
  .catch((error) => console.log(error));
