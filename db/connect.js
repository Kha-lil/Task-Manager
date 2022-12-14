const mongoose = require("mongoose");
require('dotenv').config()

const connectDB = (url) => {
  return mongoose
  .connect(url, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log(`Database connected Successfully`);
  })
  .catch((err) => {
    console.log(err);
  });
}

module.exports = connectDB


  
