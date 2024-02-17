const mongoose = require("mongoose")

// connection creation and creatin a new db create
mongoose.connect("mongodb://localhost:27017/m2zinfo", { }).then(() => {
    console.log("connection successfull...")
}).catch((err) => {
    console.log(err)
});