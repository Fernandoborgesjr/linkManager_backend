'use-strict';

module.exports = (sequelize, DataTypes) => {
  const Account = sequelize.define('Account', {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  Account.associate = (models) => {
    Account.hasMany(models.Link, { foreignKey: 'accountId' });
  };

  Account.prototype.toJSON = function dontShowPassword() {
    const values = { ...this.get() };
    delete values.password;
    return values;
  };

  return Account;
};
