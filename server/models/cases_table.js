module.exports = (sequelize, DataTypes) => {
  const cases_table = sequelize.define("cases_table", {
    client_id: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        notEmpty: false,
      },
    },
    assignee_id: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        notEmpty: false,
      },
    },
    reference_number: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        notEmpty: false,
      },
    },
    status: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        notEmpty: false,
      },
    },
    paid: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
    },
    served: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
    },
    last_offer_date: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        notEmpty: false,
      },
    },
    qr_code: {
      type: DataTypes.TEXT("long"), // it is going to be an image base64 format
      allowNull: true,
      validate: {
        notEmpty: false,
      },
    },
  });
  return cases_table;
};
