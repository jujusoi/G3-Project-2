const books = require('express').Router();
const { Books, User, Categories } = require('../../models');

books.get('/:id', async (req, res) => {
    try {
        const bookData = await Books.findAll({
            where: {
                id: req.params.id,
            },
            include: [
                {
                model: User, attributes: {
                    exclude: 'password',
                },
            }, {
                model: Categories,
            },
        ],
        });
        if (!bookData) {
            res.status(404).json(`404 book not found`);
        } else { 
            res.status(200).json(bookData);
        }
    } catch (err) {
        res.status(500).json({ message: 'Could not make request'});
    }
});

module.exports = books;