const express = require('express');

const app = express();

app.use(express.json());

// Sample books
let books = [
    {
        id: 1,
        title: 'The Alchemist',
        author: 'Paulo Coelho',
        category: 'Fiction',
        available: true
    },
    {
        id: 2,
        title: 'Wings of Fire',
        author: 'A.P.J. Abdul Kalam',
        category: 'Biography',
        available: true
    }
];

// Home route
app.get('/', (req, res) => {
    res.send('Welcome to the Public Library API!');
});

// 1. Get all books
app.get('/books', (req, res) => {
    res.json(books);
});

// 2. Get a book by ID
app.get('/books/:id', (req, res) => {
    const bookId = Number(req.params.id);

    const book = books.find(b => b.id === bookId);

    if (!book) {
        return res.status(404).json({
            message: 'Book not found'
        });
    }

    res.json(book);
});

// 3. Add a new book
app.post('/books', (req, res) => {
    const { title, author, category } = req.body;

    if (!title || !author || !category) {
        return res.status(400).json({
            message: 'Title, author and category are required'
        });
    }

    const newBook = {
        id: books.length > 0
            ? Math.max(...books.map(b => b.id)) + 1
            : 1,
        title,
        author,
        category,
        available: true
    };

    books.push(newBook);

    res.status(201).json({
        message: 'Book added successfully',
        book: newBook
    });
});

// 4. Update a book
app.put('/books/:id', (req, res) => {
    const bookId = Number(req.params.id);

    const book = books.find(b => b.id === bookId);

    if (!book) {
        return res.status(404).json({
            message: 'Book not found'
        });
    }

    const { title, author, category, available } = req.body;

    if (title !== undefined) book.title = title;
    if (author !== undefined) book.author = author;
    if (category !== undefined) book.category = category;
    if (available !== undefined) book.available = available;

    res.json({
        message: 'Book updated successfully',
        book
    });
});

// 5. Delete a book
app.delete('/books/:id', (req, res) => {
    const bookId = Number(req.params.id);

    const index = books.findIndex(b => b.id === bookId);

    if (index === -1) {
        return res.status(404).json({
            message: 'Book not found'
        });
    }

    const deletedBook = books.splice(index, 1);

    res.json({
        message: 'Book deleted successfully',
        book: deletedBook[0]
    });
});

// Start server
const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});