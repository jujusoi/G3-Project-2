require("dotenv").config();
const path = require("path");
const express = require("express");
const session = require("express-session");
const exprhb = require("express-handlebars");
const SequelizeStore = require("connect-session-sequelize")(session.Store);

const sequelize = require("./config/connection");

const app = express();
const PORT = process.env.PORT || 6969;

const sess = {
  secret: "adnjoaewoiew",
  cookie: {
    maxAge: 60 * 60 * 2000, // will expire in 2 hours
    httpOnly: true,
    secure: false,
    sameSite: "strict",
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.use(session(sess));

const hbs = exprhb.create({});
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// Import auth and dashboard routes before the general routes
const authRoutes = require("./controllers/authController.js");
app.use(authRoutes);

const dashboardRoutes = require("./controllers/dashboardController.js");
app.use(dashboardRoutes);

const bookRoutes = require("./controllers/bookController.js");
app.use(bookRoutes);

// Import and use the general routes last
const routes = require("./controllers");
app.use(routes);

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
