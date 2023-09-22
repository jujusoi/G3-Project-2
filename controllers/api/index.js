const router = require('express').Router();
const bookRoute = require('./apiRoutes');
const wishlist = require("./wishlistRoute");
const comment = require('./commentRoute');
const userWl = require('./userWl');

router.use('/books', bookRoute);
router.use('/wishlist', wishlist);
router.use('/reviews', comment);
router.use('/userwishlist', userWl);

module.exports = router;