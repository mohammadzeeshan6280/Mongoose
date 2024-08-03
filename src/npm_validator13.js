const mongoose = require("mongoose");
const validator = require("validator");

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

/*
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
*/

// Vaildation on Mongoose
const playSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    uppercase: true,
    trim: true,
    minlength: 2,
    // minlength : [2, "Minimum 2 Letters"],
    maxlength: 20,
  },
  // ctype: String,
  ctype: {
    type: String,
    required: true,
    lowercase: true,
    enum: ["frontend", "backend", "database"],
  },
  videos: {
    type: Number,
    //   validate(value){
    //     if (value < 0) {
    //         throw new Error('videos cournt should not be negative')
    //     }
    //   }
    validate: {
      validator: function (value) {
        return value.length < 0;
      },
      message: "value count should not be negative",
    },
  },

  author: String,
  email: {
    type: String,
    required: true,
    unique: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Email is inValid");
      }
    },
  },
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

const createDocument = async () => {
  try {
    const mongoPlaylist = new Playlist({
      name: "SQL DBS",
      ctype: "database",
      videos: 3,
      author: "Mohammad Zeeshan",
      //   email : "white.yo@go",
      //   email : "white@gmail.c",
      email: "zeeshan@gmail.co",
      active: true,
    });
    const result = await Playlist.insertMany([mongoPlaylist]);
    console.log(result);
  } catch (err) {
    console.log(err);
  }
};
createDocument();

const getDocument = async () => {
  try {
    const result = await Playlist

      // .find({$and : [ {ctype: "Back End"}, {author: "Mohammad Zeeshan"} ] })
      .find({ author: "Mohammad Zeeshan" })
      .select({ name: 1 })
      // .countDocuments()
      // .sort()
      // .sort("name : 1")
      .sort({ name: -1 });
    // .limit(1);
    console.log(result);
  } catch (err) {
    console.log(err);
  }
};

// getDocument();

/*
// Update the document
const updateDocument = async (_id) => {
    try{
        const result = await  Playlist.updateOne({_id},{
            $set : {
                name : "NODE JS"
            }
        });
        console.log(result)
    }catch(err){
console.log(err)
    }
}
updateDocument("65b4f3a29743297cc398fb64");
*/

// Update the document
const updateDocument = async (_id) => {
  try {
    const result = await Playlist.findByIdAndUpdate(
      { _id },
      {
        $set: {
          name: "NODE JavaScript",
        },
      },
      {
        new: true, // new data show
      }
    );
    console.log(result);
  } catch (err) {
    console.log(err);
  }
};
// updateDocument("65b4f3a29743297cc398fb64");

/*
// Detele the document
const deleteDocument = async (_id) => {
    try{
        const result = await Playlist.deleteOne({_id});
      console.log(result)
    } catch(err){
console.log(err)
    }

}
deleteDocument("65b4f9d893b879f4393ae259")
*/

const deleteDocument = async (_id) => {
  try {
    const result = await Playlist.findByIdAndDelete({ _id });
    console.log(result);
  } catch (err) {
    console.log(err);
  }
};
// deleteDocument("65b4f5c8aec83967fe2c1742")
