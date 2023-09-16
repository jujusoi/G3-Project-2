const User = require('./User');
const Books = require('./Books');
const Categories = require('./Categories');
const CategoryJunction = require('./CategoryJunction');
const Reviews = require('./Reviews');
const UserRatings = require('./UserRatings');
const Wishlist = require('./Wishlist');

User.hasMany(Books, {
    foreignKey: 'uploaded_by',
    onDelete: 'CASCADE',
});
Books.belongsTo(User, {
    foreignKey: 'uploaded_by',
});

User.hasMany(Reviews, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
});
Reviews.belongsTo(User, {
    foreignKey: 'user_id',
});

User.hasMany(UserRatings, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
});
UserRatings.belongsTo(User, {
    foreignKey: 'user_id',
});

User.hasMany(Wishlist, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
});
Wishlist.belongsTo(User, {
    foreignKey: 'user_id',
});


Books.hasMany(UserRatings, {
    foreignKey: 'book_id',
    onDelete: 'CASCADE',
});
UserRatings.belongsTo(Books, {
    foreignKey: 'book_id',
});

Books.hasMany(Reviews, {
    foreignKey: 'book_id',
    onDelete: 'CASCADE',
});
Reviews.belongsTo(Books, {
    foreignKey: 'book_id',
});

Books.hasMany(Wishlist, {
    foreignKey: 'book_id',
    onDelete: 'CASCADE',
});
Wishlist.belongsTo(Books, {
    foreignKey: 'book_id',
});

Books.belongsToMany(Categories, 
    { 
    through: CategoryJunction,
    foreignKey: 'book_id',
    onDelete: 'CASCADE',
    }
);

Categories.belongsToMany(Books,
    {
    through: CategoryJunction,
    foreignKey: 'category_id',
    onDelete: 'CASCADE',
    }
);

module.exports = { User, Books, Categories, CategoryJunction, Reviews, UserRatings, Wishlist };