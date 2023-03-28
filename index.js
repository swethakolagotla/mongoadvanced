import "./config.js";
import express from "express";
import mongoose from "mongoose";
import router from "./routes/productRoute.js";
import globalErrorHandling from "./controllers/errorController.js";
const DBConnectionString = process.env.DATABASE_CONNECTION_STRING.replace(
  "<mongodb_user>",
  process.env.DATABASE_USERNAME
).replace("<mongodb_password>", process.env.DATABASE_PASSWORD);
mongoose
  .connect(DBConnectionString)
  .then((con) => console.log("data connection established"))
  
mongoose.set("strictQuery", false);
const app = express();
app.use(express.json());
app.use(router);
app.use(globalErrorHandling);
const port=process.env.PORT||5000
app.listen(port, () => console.log(`listening port to ${port}...`));
