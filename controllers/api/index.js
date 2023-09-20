const router = require('express').Router();
const bookRoute = require('./apiRoutes');
const wishlist = require("./wishlistRoute");
const comment = require('./commentRoute');

router.use('/books', bookRoute);
router.use('/wishlist', wishlist);
router.use('/reviews', comment);

module.exports = router;