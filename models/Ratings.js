const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Ratings extends Model{};

Ratings.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNullw: false,
        autoIncrement: true,
    },
    score: {
        type: DataTypes.NUMBER,
        validate: {
            isNumeric: true,
            len: [0, 10],
        },
    },
    book_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'book',
            key: 'id',
        },
    },
    user_id: {
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
    modelName: 'rating',
});

module.exports = Ratings;