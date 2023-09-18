const router = require('express').Router();
const book = require('./books');
const categories = require('./tags');
const { Books, Categories } = require('../../models');
const handlebars = require('handlebars');

handlebars.registerHelper("increment", function(val, options){
    return parseInt(val) + 1;
});

router.get('/', async (req, res) => {
    try {
        const bookData = await Books.findAll({
            include: [{ model: Categories }],
            order: [[ 'id', 'ASC']],
            limit: 20,
        });
    const mappedData = bookData.map((book) => book.get({ plain: true }));
    if (mappedData) {
        res.status(200).render('book-display', {
            mappedData
        })
    } else {
        res.status(400).json({ message: `Could not return books`});
    }
    } catch (err) {
        res.status(500).json({ message: `Failed to get book page`});
    }
});

router.use('/books', book);
router.use('/categories', categories);

module.exports = router;