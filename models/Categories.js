const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Categories extends Model{};

Categories.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    category_name: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
},
{
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'category',
});

module.exports = Categories;