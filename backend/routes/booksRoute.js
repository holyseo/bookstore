import express from "express";
import { Book } from "../models/bookModel.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.publication_date) {
      return res.status(400).send({
        message: "Please include all fields: title, author, publishYear",
      });
    }
    // const newBook = {
    //   title: req.body.title,
    //   author: req.body.author,
    //   publishYear: req.body.publishYear,
    // };
    const book = await Book.create(req.body);
    return res.status(201).send(book);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const books = await Book.find({});
    return res.status(200).json({
      count: books.length,
      data: books,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const book = await Book.findById(id);
    return res.status(200).json(book);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.publication_date) {
      return res.status(400).send({
        message: "Please include all fileds: title, author, publication date",
      });
    }
    const { id } = req.params;

    const result = await Book.findByIdAndUpdate(id, req.body);
    console.log(result);

    if (!result) {
      return res.status(404).json({ message: "Book not found" });
    }
    return res.status(200).json({ message: "Book updated successfully" });
  } catch (error) {
    console.log(error.message);
    if (error instanceof mongoose.CastError) {
      return res.status(404).json({ message: "invalid id" });
    }
    res.status(500).send({ message: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Book.findByIdAndDelete(id);
    if (!result) {
      return res.status(404).json({ message: "Book not found" });
    }
    return res.status(200).send({ message: "Book deleted successfully" });
  } catch (error) {
    console.log(error.message);
    return res.status(500).send({ message: error.message });
  }
});

export default router;
