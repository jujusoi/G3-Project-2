// Use this route to handle book search requests
const express = require("express");
const axios = require("axios");
const router = express.Router();

router.get("/books/search", async (req, res) => {
  const searchQuery = req.query.q;
  const genreFilter = req.query.genre;
  const minRating = parseFloat(req.query.minRating);

  try {
    if (!searchQuery) {
      // Handle case where no search query is provided
      res.render("books/search", { books: [] });
    } else {
      // Construct the Google Books API URL with query parameters
      let apiUrl = `https://www.googleapis.com/books/v1/volumes?q=${searchQuery}&maxResults=20&key=${process.env.GOOGLE_BOOKS_API_KEY}`;

      // Apply genre filter if provided
      if (genreFilter) {
        apiUrl += `&subject:${genreFilter}`;
      }

      // Fetch data from the Google Books API
      const response = await axios.get(apiUrl);
      const booksData = response.data.items || [];

      // Filter books based on the minimum rating
      const filteredBooks = booksData.filter((book) => {
        return book.volumeInfo.averageRating >= minRating;
      });

      // Sort filtered books by average rating (highest to lowest)
      filteredBooks.sort((a, b) => {
        return b.volumeInfo.averageRating - a.volumeInfo.averageRating;
      });

      // Render the search-results page with sorted data
      res.render("books/search-results", { books: filteredBooks });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send(`Server error: ${error.message}`);
  }
});

module.exports = router;
