const express = require("express");
const router = express.Router();
const auth = require("../config/middleware/auth");
const { Wishlist, Books, Categories, User } = require(".//../models");

router.get("/dashboard", auth, async (req, res) => {
  try {
    const wishlistData = await Wishlist.findAll({
      where: {
        user_id: req.session.user.id,
      },
      include: [
        {
          model: Books,
          include: [
            {
              model: Categories,
            },
          ],
        },
      ],
    });
    const userStuff = await User.findOne({
      where: {
        id: req.session.user.id,
      },
      attributes: {
        exclude: ["password"],
      },
    });
    const dashBtnCheck = false;
    const userDate = userStuff.created_at;
    const mappedWishlist = wishlistData.map((wishlist) =>
      wishlist.get({ plain: true })
    );
    res.render("dashboard", {
      title: "My Account",
      userInfo: req.session.user,
      mappedWishlist,
      userDate,
      dashBtnCheck,
    }); // Pass the user data to the dashboard view
  } catch (err) {
    res.status(500).json({ message: `Could not make request, ${err}` });
  }
});

// PUT route for updating the username
router.put("/api/users/updateUsername", auth, async (req, res) => {
  try {
    const { newUsername } = req.body;

    // Check if the new username is valid (e.g., not empty)
    if (!newUsername || newUsername.trim() === "") {
      return res.status(400).json({ message: "Invalid username" });
    }

    // Update the username in the database
    await User.update(
      { username: newUsername },
      {
        where: {
          id: req.session.user.id,
        },
      }
    );

    res.status(200).json({ message: "Username updated successfully" });
  } catch (err) {
    res.status(500).json({ message: `Could not update username, ${err}` });
  }
});

// DELETE route for deleting the account
router.delete("/api/users/deleteAccount", auth, async (req, res) => {
  try {
    // Delete the user's account from the database
    await User.destroy({
      where: {
        id: req.session.user.id,
      },
    });

    req.session.destroy(() => {
      res.status(200).json({ message: "Account deleted successfully" });
    });
  } catch (err) {
    res.status(500).json({ message: `Could not delete account, ${err}` });
  }
});

module.exports = router;