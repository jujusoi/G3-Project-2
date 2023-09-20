const comment = require('express').Router();
const { Reviews } = require('../../models');

comment.post('/', async (req, res) => {
    try {
        const newComment = await Reviews.create({
            comment_description: req.body.descVal,
            score_given: req.body.ratingVal,
            user_id: req.session.user.id,
            book_id: req.body.bookVal,
        });
        res.json({ message: `Success!`});
    } catch (err) {
        res.json({ message: `Could not make post req, ${err}`});
    }
});

module.exports = comment;