const book = require('express').Router();
const { User, Books, Categories, Reviews } = require('../../models');

book.get('/:id', async (req, res) => {
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
            console.log(serializedData);
            res.status(200).render('unique-book', { 
                serializedData, userInfo },
            );
        } else {
            res.status(404).json({ message: `Could not find book`});
        };
    } catch (err) {
        res.status(500).json({ message: `Get request failed, ${err}`});
    };
});

module.exports = book;