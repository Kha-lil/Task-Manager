const express = require("express");
const path = require("path");
require("dotenv").config();

//Database connection import
const connectDB = require("./db/connect");

//task route
const tasks = require("./routes/tasks");

//404 route page
const notFound = require("./middleware/not-found");

const port = 3000;
const app = express();

app.use(express.static(path.join(__dirname, "./public")));
app.use(express.json());

app.use("/api/v1/tasks", tasks);
app.use(notFound)

const start = async (url) => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`App listening on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
