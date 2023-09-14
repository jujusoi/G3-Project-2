const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Tags extends Model{};

Tags.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    tag_name: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
},
{
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'tag',
});

module.exports = Tags;