module.exports = (sequelize, DataTypes) => {
  const users_table = sequelize.define("users_table", {
    name_surname: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        notEmpty: false,
      },
    },
    username: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        notEmpty: false,
      },
    },
    email_address: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        notEmpty: false,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        notEmpty: false,
      },
    },
    role: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        notEmpty: false,
      },
    },
    bank_details: {
      type: DataTypes.TEXT("long"), // it is going to be an object parsed
      allowNull: true,
      validate: {
        notEmpty: false,
      },
    },
  });
  return users_table;
};
