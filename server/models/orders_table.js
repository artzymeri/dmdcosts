module.exports = (sequelize, DataTypes) => {
  const orders_table = sequelize.define("orders_table", {
    sender_id: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        notEmpty: false,
      },
    },
    sender_name_surname: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        notEmpty: false,
      },
    },
    sender_business_name: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        notEmpty: false,
      },
    },
    sender_email_address: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        notEmpty: false,
      },
    },
    sender_phone_number: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        notEmpty: false,
      },
    },
    receiver_name_surname: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        notEmpty: false,
      },
    },
    receiver_phone_number: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        notEmpty: false,
      },
    },
    receiver_phone_number_2: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        notEmpty: false,
      },
    },
    receiver_city: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        notEmpty: false,
      },
    },
    receiver_state: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        notEmpty: false,
      },
    },
    receiver_full_address: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        notEmpty: false,
      },
    },
    product_price: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        notEmpty: false,
      },
    },
    product_description: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        notEmpty: false,
      },
    },
    comment: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        notEmpty: false,
      },
    },
    progress: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: 'request',
      validate: {
        notEmpty: false,
      },
    },
    collector: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        notEmpty: false,
      },
    },
    driver: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        notEmpty: false,
      },
    },
    viewed_by_admin_for_request: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
      validate: {
        notEmpty: false,
      },
    },
    viewed_by_admin_for_cancelled: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
      validate: {
        notEmpty: false,
      },
    },
    viewed_by_admin_for_collected: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
      validate: {
        notEmpty: false,
      },
    },
    viewed_by_admin_for_on_delivery: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
      validate: {
        notEmpty: false,
      },
    },
    viewed_by_admin_for_delivered: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
      validate: {
        notEmpty: false,
      },
    },
    viewed_by_user_for_request: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
      validate: {
        notEmpty: false,
      },
    },
    viewed_by_user_for_cancelled: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
      validate: {
        notEmpty: false,
      },
    },
    viewed_by_user_for_collected: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
      validate: {
        notEmpty: false,
      },
    },
    viewed_by_user_for_on_delivery: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
      validate: {
        notEmpty: false,
      },
    },
    viewed_by_user_for_delivered: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
      validate: {
        notEmpty: false,
      },
    },
    qr_code: {
      type: DataTypes.TEXT('long'),
      allowNull: true,
      validate: {
        notEmpty: false,
      },
    },
  });
  return orders_table;
};
