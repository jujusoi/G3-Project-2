const router = require('express').Router();
const bookRoute = require('./apiRoutes');
const wishlist = require("./wishlistRoute");

router.use('/books', bookRoute);
router.use('/wishlist', wishlist);

module.exports = router;