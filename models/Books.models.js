import mongoose from "mongoose";

const BooksSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  title: {
    type: String,
    trim: true,
    required: true,
  },

  author: {
    type: String,
    trim: true,
  },

  status: {
    type: String,
    enum: ["want", "reading", "completed"],
    default: "want",
  },

  source: {
    type: String,
    enum: ["manual", "google"],
    default: "manual",
  },

  cover:{
    type:String
  },

  notes:{
    type: String,
  },
},{timestamps:true});

export default mongoose.model("Books", BooksSchema);