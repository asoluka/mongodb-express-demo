const express = require("express");
const connectDB = require("./db");
require("dotenv").config();

const Book = require("./books.model.js");

const app = express();
app.use(express.json());

connectDB();

app.post("/books", async (req, res) => {
  const { title, author, genre } = req.body;

  try {
    const newBook = new Book({ title, author, genre });
    const savedBook = await newBook.save();
    res.json(savedBook);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

app.get("/books", async (req, res) => {
  const books = await Book.find();
  res.json(books);
});

app.get("/books/:id", async (req, res) => {
  const book = await Book.findById(req.params.id);
  if (!book) {
    return res.status(404).send("Book not found");
  }
  res.json(book);
});

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
