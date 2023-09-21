const express = require("express");
const router = express.Router();
const auth = require('../config/middleware/auth');

router.get("/dashboard", auth, (req, res) => {    
    res.render("dashboard", { title: 'My Account', userInfo: req.session.user,   
     }); // Pass the user data to the dashboard view
});

module.exports = router;
