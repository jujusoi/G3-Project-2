const search = require('express').Router();
const { Books, Categories, Wishlist } = require('../../models');
const { Op } = require('sequelize');
const auth = require('../../config/middleware/auth');

search.get('/', auth, async (req, res) => {
    try {
        if (req.query.genreVal !== 'Genre') {
            const bookData = await Books.findAll({
                where: {
                    book_title: {
                        [Op.like]: `%${req.query.searchVal}%`
                    },
                    average_score: {
                        [Op.gte]: req.query.starVal
                    },
                },
                include: [{ model: Categories, where: {
                    category_name: {
                        [Op.in]: [req.query.genreVal],
                    },
                } }],
                order: [[ 'average_score', 'DESC']],
            });
            searchies(bookData, req, res);
        } else {
            const bookData = await Books.findAll({
                where: {
                    book_title: {
                        [Op.like]: `%${req.query.searchVal}%`
                    },
                    average_score: {
                        [Op.gte]: req.query.starVal
                    },
                },
                include: [{ model: Categories }],
                order: [[ 'average_score', 'ASC']],
            });
            searchies(bookData, req, res);
        }
    } catch (err) {
        console.log(`Error, ${err}`);
    }
});

const searchies = async (bookData, req, res) => {
    const categoryData = await Categories.findAll();
    const mappedCategory = categoryData.map((category) => category.get({ plain: true }));
    if (req.session.user) {
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
        const userInfo = req.session.user;
        if (mappedData && mappedData.length < 1) {
            const empty = true;
            res.status(200).render('book-display', {
                mappedData, userInfo, mappedCategory, empty, title: 'READMi',
            });
        } else if (mappedData && mappedData.length >= 1) {
            res.status(200).render('book-display', {
                mappedData, userInfo, mappedCategory, title: 'READMi',
            });
        }
        else {
            res.status(400).json({ message: `Could not return books`});
        }
    } else {
        const mappedData = bookData.map((book) => book.get({ plain: true }));
        res.status(200).render('book-display', {
            mappedData, mappedCategory, empty, title: 'READMi',
        });
    }
}

module.exports = search;