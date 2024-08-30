const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');

const Country = sequelize.define('country', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: true,
      len: [1, 255] 
    },
  },
  code: {
    type: DataTypes.STRING(3),
    allowNull: false,
    unique: true,
    validate: {
      is: /^[A-Z]{3}$/,
    },
  },  
  status: {
    type: DataTypes.ENUM('active', 'inactive'),
    defaultValue: 'active',
    allowNull: false,
  },
});

module.exports = Country;
