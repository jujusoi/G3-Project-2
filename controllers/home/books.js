const book = require('express').Router();
const e = require('express');
const { User, Books, Categories } = require('../../models');

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
            ],
        });
        if (bookData) {
            res.status(200).json(bookData);
        } else {
            res.status(404).json({ message: `Could not find book`});
        };
    } catch (err) {
        res.status(500).json({ message: `Get request failed, ${err}`});
    };
});

module.exports = book;