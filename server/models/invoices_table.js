module.exports = (sequelize, DataTypes) => {
  const invoices_table = sequelize.define("invoices_table", {
    reference_id: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        notEmpty: false,
      },
    },
    cases_invovled: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        notEmpty: false,
      },
    },
    client_id: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        notEmpty: false,
      },
    },
    admin_id: {
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
    sent: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
    },
  });
  return invoices_table;
};
