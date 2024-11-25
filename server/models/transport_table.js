module.exports = (sequelize, DataTypes) => {
    const transport_table = sequelize.define("transport_table", {
        model: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        tag: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        expiry_date: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        assignee: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        document: {
            type: DataTypes.TEXT('long'),
            allowNull: true,
        },
    });
    return transport_table;
};
