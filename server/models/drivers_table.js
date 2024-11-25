module.exports = (sequelize, DataTypes) => {
  const drivers_table = sequelize.define("drivers_table", {
    name_surname: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        notEmpty: false,
      },
    },
    location_of_operation: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        notEmpty: false,
      },
    },
    phone_number: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        notEmpty: false,
      },
    },
    email_address: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        notEmpty: false,
      },
    },
    transport: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    document_id: {
      type: DataTypes.TEXT('long'),
      allowNull: true,
      validate: {
        notEmpty: false,
      },
    },
  });
  return drivers_table;
};
