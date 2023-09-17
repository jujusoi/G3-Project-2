module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define("Review", {
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    review_text: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: "Users", // Referring to the Users table
        key: "id",
      },
      allowNull: false,
    },
    bookId: {
      type: DataTypes.INTEGER,
      references: {
        model: "Books", // Referring to the books table
        key: "id",
      },
      allowNull: false,
    },
  });

  Review.associate = (models) => {
    // Setting up association between Review and User models
    Review.belongsTo(models.User, {
      foreignKey: "userId",
      as: "user",
    });

    // Setting up association between Review and Book models
    Review.belongsTo(models.Book, {
      foreignKey: "bookId",
      as: "book",
    });
  };

  return Review;
};
