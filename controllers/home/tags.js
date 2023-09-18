const tags = require('express').Router();
const { Books, Categories } = require('../../models');

tags.get('/:id', async (req, res) => {
    try {
        const tagData = await Categories.findByPk(req.params.id, {
            include: {
                model: Books,
            },
        });
        if (tagData) {
            res.status(200).json(tagData);
        } else {
            res.status(404).json({ message: `category not found`});
        };
    } catch (err) {
        res.status(500).json({ message: `Get request failed, ${err}`});
    }
});

module.exports = tags;