module.exports = (req, res, next) => {
  if (req.session.user && req.session.isAuthenticated) {
    return next();
  } else {
    res.redirect("/login");
  }
};

// setup authentication for login
