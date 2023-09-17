const sequelize = require('../config/connection');
const fs = require('fs');

const { Books, Categories, CategoryJunction, Reviews, User, UserRatings, Wishlist } = require('../models');
const bookSeedData = require("./booksInformation.json");
const categorySeedData = require('./categoryInformation.json');
const categoryJunctionData = require('./categoryJunctionInfo.json');
const reviewSeedData = require("./reviewInformation.json");
const userSeedData = require('./userInformation.json');
const userRatingData = require('./userRatingInformation.json');
const wishlistSeedData = require('./wishlistInformation.json');

const seed = async () => {
    try {
        await sequelize.sync({ force: true });


        await User.bulkCreate(userSeedData, {
            individualHooks: true,
            returning: true,
        });
        await Books.bulkCreate(bookSeedData);
        await Categories.bulkCreate(categorySeedData);
        await CategoryJunction.bulkCreate(categoryJunctionData);
        await Reviews.bulkCreate(reviewSeedData);
        await UserRatings.bulkCreate(userRatingData);
        await Wishlist.bulkCreate(wishlistSeedData);

        console.log(`Seeding success`);
        process.exit(0);
    } catch (err) {
        console.log(`Could not seed data, ${err}`);
        process.exit(1);
    }
};

seed();