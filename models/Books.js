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
        type: DataTypes.STRING(200),
        allowNull: false,
    },
    book_description: {
        type: DataTypes.TEXT,
    },
    publisher: {
        type: DataTypes.STRING,
    },
    publish_year: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    author: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    page_count: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    mature: {
        type: DataTypes.BOOLEAN,
    },
    icon: {
        type: DataTypes.STRING(1000),
        allowNull: false,
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