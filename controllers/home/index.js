const router = require('express').Router();
const book = require('./books');
const categories = require('./tags');
const { Books, Categories, Wishlist } = require('../../models');
const handlebars = require('handlebars');

handlebars.registerHelper("increment", function(val, options){
    return parseInt(val) + 1;
});

handlebars.registerHelper('inWishlist', function(id, wishlist) {
    return wishlist.some(wishItem => wishItem.book_id === id);
});

router.get('/', async (req, res) => {
    try {
        const bookData = await Books.findAll({
            include: [{ model: Categories }],
            order: [[ 'id', 'ASC']],
            limit: 20,
        });
        const wishlistData = await Wishlist.findAll({
            where: {
                user_id: req.session.user.id,
            },
        });
    const mappedWishlist = wishlistData.map((wish) => wish.get({ plain: true }));

    const mappedData = bookData.map((book) => book.get({ plain: true }));
    mappedData.forEach(book => {
        book.wishlistStuff = mappedWishlist
    });

    console.log(mappedData);
    if (mappedData) {
        res.status(200).render('book-display', {
            mappedData, mappedWishlist
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