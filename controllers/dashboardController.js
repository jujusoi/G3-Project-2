const express = require("express");
const router = express.Router();

router.get("/dashboard", (req, res) => {
  if (req.session.isAuthenticated) {
    res.render("dashboard", { user: req.session.user }); // Pass the user data to the dashboard view
  } else {
    res.redirect("/login"); // Redirect to login if the user is not authenticated
  }
});

module.exports = router;
