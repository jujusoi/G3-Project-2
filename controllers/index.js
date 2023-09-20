const router = require("express").Router();
const api = require("./api");
const home = require("./home");

router.use("/api", api);
router.use("/home", home);

module.exports = router;

//create a bunch of controller routes for normal pages like homepage, etc in the main controller directory, use database routes for fetching user info in the /api
