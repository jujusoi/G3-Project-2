const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Books extends Model{};

Books.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    book_title: {
        type: DataTypes.STRING(1000),
        allowNull: true,
    },
    book_description: {
        type: DataTypes.TEXT,
    },
    publisher: {
        type: DataTypes.STRING,
    },
    publish_year: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    author: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    page_count: {
        type: DataTypes.INTEGER,
    },
    mature: {
        type: DataTypes.BOOLEAN,
    },
    icon: {
        type: DataTypes.STRING(4000),
        allowNull: true,
    },
    average_score: {
        type: DataTypes.FLOAT,
        allowNull: true,
    },
    uploaded_by: {
        type: DataTypes.INTEGER,
        references: {
            model: 'user',
            key: 'id',
        },
    },
},
{
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'book',
});

module.exports = Books;