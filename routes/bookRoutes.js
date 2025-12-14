import express from "express";
import { createBook, deleteBooks, getAllBooks, updateBooks } from "../controllers/book.Controller.js";
import  authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

//Craete Books routes
router.post('/create',authMiddleware ,createBook);

//GetAll Books route
router.get('/all',authMiddleware ,getAllBooks);

//Update Book routes
router.put('/edit/:id', authMiddleware, updateBooks);

//Delete Books routes
router.delete('/delete/:id', authMiddleware, deleteBooks);

export default router;