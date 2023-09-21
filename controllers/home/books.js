const book = require('express').Router();
const { User, Books, Categories, Reviews } = require('../../models');
const handlebars = require('handlebars');
const auth = require('../config/../../config/middleware/auth');

handlebars.registerHelper("equals", function(val1, val2){
    return val1 === val2;
});


book.get('/:id', auth, async (req, res) => {
    try {
        const bookData = await Books.findByPk(req.params.id, {
            include: [
                {
                    model: Categories,
                }, {
                    model: User, attributes: {
                        exclude: [ 'password', 'email' ],
                    },
                },
                {
                    model: Reviews, include: [{
                        model: User,
                    }],
                },
            ],
        });

        if (bookData) {
            const userInfo = req.session.user;
            const serializedData = bookData.get({plain: true});
            const numberOfReviews = serializedData.reviews.length;
            console.log(serializedData);
            res.status(200).render('unique-book', { 
                serializedData, userInfo, numberOfReviews, title:`READMi: ${serializedData.book_title}`, },
            );
        } else {
            res.status(404).json({ message: `Could not find book`});
        };
    } catch (err) {
        res.status(500).json({ message: `Get request failed, ${err}`});
    };
});



module.exports = book;