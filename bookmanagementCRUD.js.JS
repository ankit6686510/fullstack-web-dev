const express = require("express");
const joi = require("joi");

const app = express(); // Express application ko initialize karta hai.
app.use(express.json()); // JSON body ko parse karta hai taaki hum data ko req.body ke through access kar sakein.

let books = [];

const bookSchema = joi.object({
    title: joi.string().min(3).required(), // .required() yahan par function ki tarah likhna zaroori hai
    author: joi.string().min(3).required(),
    year: joi.number().integer().min(1800).max(new Date().getFullYear()).required()
});

// Route to get all books
app.get('/books', (req, res) => {
    res.json(books); // Sabhi books ko JSON format mein return karta hai
});

// Route to add a new book
app.post('/books', (req, res) => {
    const { error } = bookSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const book = { id: books.length + 1, ...req.body };
    books.push(book);
    res.status(201).json(book);
});

// Route to update a book by ID
app.put('/books/:id', (req, res) => {
    const book = books.find(b => b.id === parseInt(req.params.id));
    if (!book) return res.status(404).json({ error: "Book not found" });

    const { error } = bookSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    Object.assign(book, req.body); // Book object mein naye data ko merge karta hai
    res.json(book);
});

// Route to delete a book by ID
app.delete('/books/:id', (req, res) => {
    const bookIndex = books.findIndex(b => b.id === parseInt(req.params.id));
    if (bookIndex === -1) return res.status(404).json({ error: "Book not found" });

    books.splice(bookIndex, 1); // bookIndex galat tha, isko sahi kiya gaya hai
    res.json({ message: "Book deleted successfully" });
});

app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
});
