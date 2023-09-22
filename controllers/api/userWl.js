const wl = require('express').Router();
const { Wishlist } = require('../../models');

wl.delete('/:id', async (req, res) => {
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

module.exports = wl;