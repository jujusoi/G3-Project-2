const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class FinalRating extends Model{};

FinalRating.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
    },
    rating: {
        type: DataTypes.NUMBER,
        allowNull: false,
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
},
{
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'final_score',
});

module.exports = FinalRating;