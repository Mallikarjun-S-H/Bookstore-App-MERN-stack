import express from "express";
import { Book } from "../models/bookModel.js";

const router = express.Router();

// Route to add book to database

router.post("/", async (req, resp) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      return resp.status("400").send({
        message: "send all required fields: title, author, publishYear",
      });
    }
    const newBook = {
      title: req.body.title,
      author: req.body.author,
      publishYear: req.body.publishYear,
    };
    const book = await Book.create(newBook);
    return resp.status(201).send(book);
  } catch (error) {
    console.log(error);
    resp.status(500);
  }
});

// Route to get all books from database

router.get("/", async (req, resp) => {
  try {
    const books = await Book.find({});
    return resp.status(200).json({
      count: books.length,
      data: books,
    });
  } catch (error) {
    console.log(error);
    resp.status(500).send({ message: error.message });
  }
});

// Route to get one book from database

router.get("/:id", async (req, resp) => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id);
    return resp.status(200).json({ book });
  } catch (error) {
    console.log(error);
    resp.status(500).send({ message: error.message });
  }
});

// Route to get update book from database

router.put("/:id", async (req, resp) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      return resp.status("400").send({
        message: "send all required fields: title, author, publishYear",
      });
    }
    const { id } = req.params;
    const result = await Book.findByIdAndUpdate(id, req.body);
    if (!result) {
      return resp.status(404).json({ message: "Book not found" });
    }
    return resp.status(200).json({ message: "Book is updated" });
  } catch (error) {
    console.log(error);
    resp.status(500).send({ message: error.message });
  }
});

// Route to delete book from database

router.delete("/:id", async (req, resp) => {
  try {
    const { id } = req.params;
    const result = await Book.findByIdAndDelete(id);
    if (!result) {
      return resp.status(404).json({ message: "Book not found" });
    }
    return resp.status(200).json({ message: "Book is deleted" });
  } catch (error) {
    console.log(error);
    resp.status(500).send({ message: error.message });
  }
});

export default router;
