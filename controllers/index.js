const router = require('express').Router();

router.get('/', async (req, res) => {
    try {
        res.status(200).json(`Server works`);
    } catch (err) {
        res.status(500).json(`Couldn't load up server D:`);
    }
});

module.exports = router;

//create a bunch of controller routes for normal pages like homepage, etc in the main controller directory, use database routes for fetching user info in the /api