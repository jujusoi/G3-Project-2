const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Reviews extends Model{};

Reviews.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
    },
    comment_description: {
        type: DataTypes.STRING(4000),
        allowNull: false,
    },
    comment_date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        defaultValue: Sequelize.NOW,
    },
    score_given: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    user_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'user',
            key: 'id',
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
    modelName: 'review',
});

module.exports = Reviews;