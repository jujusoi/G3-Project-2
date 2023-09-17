const router = require('express').Router();
const bookRoute = require('./apiRoutes');

router.use('/books', bookRoute);

module.exports = router;