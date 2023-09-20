const comment = require('express').Router();
const { Reviews, Books } = require('../../models');

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

comment.put('/:id', async (req, res) => {
    try {
        const bookData = await Books.findByPk(req.params.id, {
            include: {
                model: Reviews,
            },
        });
        let finalScore = 0;
        bookData.reviews.forEach(review => {
            finalScore += review.score_given;
        });
        const newAvg = finalScore / bookData.reviews.length;
        bookData.set({
            average_score: newAvg.toFixed(1),
        });
        await bookData.save();
        if (bookData) {
            res.status(200).json({ message: 'Updated book score'});
        } else {
            res.status(404).json({ message: 'could not find book'});
        };
    } catch (err) {
        res.status(500).json({ message: `Could not make PUT request, ${err}`});
    };
});

module.exports = comment;