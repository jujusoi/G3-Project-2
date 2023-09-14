const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Comments extends Model{};

Comments.init({
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
    modelName: 'comment',
});

module.exports = Comments;