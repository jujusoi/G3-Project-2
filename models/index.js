const BookTag = require("./BookTag");
const Comments = require('./Comments');
const FinalRating = require('./FinalRating');
const Ratings = require('./Ratings');
const Tags = require('./Tags');
const User = require('./User');
const Wishlist = require('./Wishlist');

User.hasMany(Wishlist, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
});

Wishlist.belongsTo(User, {
    foreignKey: 'user_id',
});

User.hasMany(Ratings, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
});

Ratings.belongsTo(User, {
    foreignKey: 'user_id',
});

User.hasMany(Comments, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
});

Comments.belongsTo(User, {
    foreignKey: 'user_id',
});

module.exports = { BookTag, Comments, FinalRating, Ratings, Tags, User, Wishlist };