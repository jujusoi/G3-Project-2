# READMi

## 🌟 Features

This full stack project provides the following features:

- **Book Search:** Easily search for books by title, author, or category.
- **User Dashboard:** Manage your wishlist, reviews, and more.
- **Comments:** Engage with the community by leaving comments on books.
- **Wishlist:** Save books you're interested in for later.

## 📸 Screenshot

<div style="text-align:center">
  <img src="" alt="App Screenshot" width="50%"/>
</div>

## 🚀 Demo GIF

<div align="center">
  <img src=" " alt="App Demo GIF" width="75%">
</div>

## 📷 Deployment

- [Heroku]() add link to heroku here
- [Github](https://github.com/jujusoi/G3-Project-2)

## 🛠 Setup

To set up and run this project, follow these steps:

1. Clone the repository to your local machine.

```
git clone https://github.com/jujusoi/G3-Project-2``
```

2. Navigate to the project directory.
3. Install dependencies using

```
npm install
```

4. Create a `.env` file and set the following environment variables:

```
DB_NAME=(bookblog_db)
DB_USER=( Enter your database username or "root" )
DB_PASSWORD=( Enter your database password)
GOOGLE_BOOKS_API_KEY:( Enter your Google Books API key)
```

5. Initialize the database by running:

```
npm run seeds/seed.js
```

6. Start the server on localhost using:

```
npm start
```

## 📚 Resources

- [axios](https://www.npmjs.com/package/axios) - For making HTTP requests.
- [bcrypt](https://www.npmjs.com/package/bcrypt) - For hashing passwords.
- [connect-session-sequelize](https://www.npmjs.com/package/connect-session-sequelize) - Middleware for managing sessions with Sequelize.
- [dotenv](https://www.npmjs.com/package/dotenv) - For loading environment variables.
- [express](https://www.npmjs.com/package/express) - The web application framework.
- [express-handlebars](https://www.npmjs.com/package/express-handlebars) - The template engine for rendering views.
- [express-session](https://www.npmjs.com/package/express-session) - For managing sessions in Express.
- [mysql2](https://www.npmjs.com/package/mysql2) - The MySQL database driver.
- [sequelize](https://www.npmjs.com/package/sequelize) - For database ORM (Object-Relational Mapping).

Feel free to explore the documentation of these resources to learn more about how they were used in your project.

## 🤝 Contributing

Pull request are welcome, For major changes please open issue first to dicuss what you would like to change.

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
