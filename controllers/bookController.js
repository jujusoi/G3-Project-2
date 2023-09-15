// use this route will handle book search requests
const express = require("express");
const axios = require("axios");
const router = express.Router();

router.get("/books/search", (req, res) => {
  if (!req.query.q) {
    res.render("books/search");
  } else {
    axios
      .get("https://www.googleapis.com/books/v1/volumes", {
        params: { q: req.query.q, key: process.env.GOOGLE_BOOKS_API_KEY },
      })
      .then((response) => {
        res.render("books/search-results", { books: response.data.items });
      })
      .catch((error) => {
        console.error(error);
        res.status(500).send(`Server error: ${error.message}`);
      });
  }
});
module.exports = router;
