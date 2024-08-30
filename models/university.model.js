const DataTypes  = require('sequelize');
const sequelize = require('../config/db.config'); 

const University = sequelize.define('university', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  
  address: {
    type: DataTypes.STRING,
    allowNull: false
  },

  code: {
    type: DataTypes.STRING,
    allowNull: false
  },

  establishedYear: {
    type: DataTypes.INTEGER,
    allowNull: false
  },

  location: {
    type: DataTypes.STRING,
    allowNull: false
  },  
  status: {
    type: DataTypes.ENUM('active', 'inactive'),
    defaultValue: 'active',
   allowNull: false,
},
});

module.exports = University;
