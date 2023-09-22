const wishlist = require('express').Router();
const { Wishlist, Books, User } = require("../../models");

wishlist.post('/:id', async (req, res) => {
    try {
        const wishlistData = await Wishlist.create({
            user_id: req.session.user.id,
            book_id: req.params.id,
        });
        if (wishlistData) {
            res.status(204).send();
        } else {
            return;
        }
    } catch (err) {
        return;
    }
});

wishlist.delete('/:id', async (req, res) => {
    try {
        const wishlistData = await Wishlist.destroy({
            where: {
                book_id: req.params.id,
                user_id: req.session.user.id,
            },
        });
        res.status(204).send();
    } catch (err) {
        return;
    }
});

module.exports = wishlist;