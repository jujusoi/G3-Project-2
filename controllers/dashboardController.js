const express = require("express");
const router = express.Router();
const auth = require('../config/middleware/auth');
const { Wishlist, Books, Categories, User} = require('.//../models');

router.get("/dashboard", auth, async (req, res) => {    
    try {
        const wishlistData = await Wishlist.findAll({
            where:{
                user_id: req.session.user.id,
            }, 
            include: [
                {
                    model: Books, include: [{
                        model: Categories,
                    }],
                },
            ],
        });
        const userStuff = await User.findOne({
            where: {
                id: req.session.user.id,
            }, attributes: {
                exclude: ['password'],
            },
        });
        const userDate = userStuff.created_at;
        const mappedWishlist = wishlistData.map((wishlist) => wishlist.get({ plain: true }));
        res.render("dashboard", { title: 'My Account', userInfo: req.session.user, mappedWishlist, userDate,
    }); // Pass the user data to the dashboard view
    } catch (err) {
        res.status(500).json({message : `Could not make request, ${err}`});
    }
});

module.exports = router;
