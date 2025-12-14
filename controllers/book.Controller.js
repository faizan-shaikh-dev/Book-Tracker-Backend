import Book from "../models/Books.models.js";

//Create new Book
export const createBook = async (req, res) => {
  try {
    const { title, author, status, source, cover, notes } = req.body;

    if (!title) return res.status(400).json({ message: "Title is required" });

    const newBook = await Book.create({
      userId: req.userId,
      title,
      author,
      status,
      source,
      cover,
      notes,
    });

    return res
      .status(201)
      .json({ message: "Book added successfully", newBook });
      
  } catch (error) {
   
      
    console.error(error);
    return res.status(500).json({ message: "Internal server error", error });
  }
};

//Get All Books
export const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find({ userId: req.userId }).sort({
      createdAt: -1,
    });

    return res.status(200).json({ message: "Books Fetched", books });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

//Update Books
export const updateBooks = async (req, res) => {
  try {
    const books = await Book.findByIdAndUpdate(
      { _id: req.params.id, userId: req.userId },
      req.body,
      { new: true }
    );

    if (!books) {
      return res.status(404).json({ message: "Book not found" });
    }

    return res.json({ message: "Book Updated Successfully", books });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error", error });
  }
};

//Delete Books
export const deleteBooks = async (req, res) => {
  try {
    const book = await Book.findOneAndDelete({
      _id: req.params.id,
      userId: req.userId,
    });

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    return res.status(200).json({ message: "Book deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
