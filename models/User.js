const { Sequelize, Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");
const bcrypt = require("bcrypt");

class User extends Model {
  checkPassword(example) {
    return bcrypt.compareSync(example, this.password);
  }
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [2, 16], // Enforce username length between 2 and 16 characters
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true, // Ensure email format is correct
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [8], // Enforce minimum password length of 8 characters
      },
    },
    created_at: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      defaultValue: Sequelize.NOW,
  },
  },
  {
    // runs hook before creating a new user in db then hashes pw using bcrypt before saving
    hooks: {
      beforeCreate: async (newData) => {
        newData.password = await bcrypt.hash(newData.password, 10);
        return newData;
      },
    },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "user_table",
  }
);

module.exports = User;
