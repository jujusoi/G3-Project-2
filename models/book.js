module.exports = (sequelize, DataTypes) => {
  const Book = sequelize.define("Book", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    genre: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });

  Book.associate = (models) => {
    // Setting up association between Book and Review models
    Book.hasMany(models.Review, {
      foreignKey: "bookId",
      as: "reviews",
    });
  };

  return Book;
};
