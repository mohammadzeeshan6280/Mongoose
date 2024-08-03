const mongoose = require("mongoose");

// connection creation and creatin a new db
mongoose
  .connect("mongodb://localhost:27017/ttchannel", {})
  .then(() => {
    console.log("connection successfull...");
  })
  .catch((err) => {
    console.log(err);
  });

// Schema
// A Mongoose schema defines the structure of the document,
// default values, validators,etc.,
const playSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  ctype: String,
  videos: Number,
  author: String,
  active: Boolean,
  date: {
    type: Date,
    default: Date.now,
  },
});

// A Mongoose model is a wrapper in the Mongoose schema.
// A Mongoose schema defines the structure of the document
// default values, validators, etc., whereas a Mongoose model
// provides an interface to the database for creating,
// querying, updating, deleting records, etc.

//collection creation
const Playlist = new mongoose.model("Playlist", playSchema);

/*
// create document or insert
const reactPlaylist = new Playlist({
      name : "React Js", 
    ctype : "Front End",
    videos : 25,
    author : "White Hat",
    active : true
})

// reactPlaylist.save();
*/

// Single Document Create in Mongoose
const createDocument = async () => {
  try {
    const reactPlaylist = new Playlist({
      name: "Node Js",
      ctype: "Back End",
      videos: 26,
      author: "Mohammad Zeeshan",
      active: true,
    });
    const result = await reactPlaylist.save();
    console.log(result);
  } catch (err) {
    console.log(err);
  }
};
createDocument();
