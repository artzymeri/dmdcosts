module.exports = (sequelize, DataTypes) => {
  const clients_table = sequelize.define("clients_table", {
    business_name: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        notEmpty: false,
      },
    },
    address: {
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
    rates_config: {
      type: DataTypes.TEXT("long"), // it is going to be an object parsed
      allowNull: true,
      validate: {
        notEmpty: false,
      },
    },
  });
  return clients_table;
};
