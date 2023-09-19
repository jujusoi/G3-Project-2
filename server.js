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

// Route to handle book search requests with advanced filters
app.get("/books/search", async (req, res) => {
  try {
    const query = req.query.q || "";
    const genre = req.query.genre || ""; // Get the selected genre from the query parameters
    const sortBy = req.query.sortBy || ""; // Get the selected sorting option from the query parameters
    0;
    // Build the API URL based on the selected filters
    const apiUrl = `https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=${1}&key=${
      process.env.GOOGLE_BOOKS_API_KEY
    }&genre=${genre}&orderBy=${sortBy}`;

    // Make the API request to fetch book data based on the filters
    const response = await axios.get(apiUrl);
    const books = response.data.items;

    // Render the search results view with the filtered books
    res.render("books/search", { books });
  } catch (error) {
    console.error(error);
    res.status(500).send(`Server error: ${error.message}`);
  }
});

// Import and use the general routes last
const routes = require("./controllers");
app.use(routes);

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
