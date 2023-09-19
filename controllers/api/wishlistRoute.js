const wishlist = require('express').Router();
const { Wishlist, Books, User } = require("../../models");

wishlist.post('/:id', async (req, res) => {
    try {
        const wishlistData = await Wishlist.create({
            user_id: req.session.user.id,
            book_id: req.params.id,
        });
        console.log(wishlistData);
        if (wishlistData) {
            console.log(wishlistData);
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
        console.log(`Successfully deleted`);
    } catch (err) {
        return;
    }
})

module.exports = wishlist;