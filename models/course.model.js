const  DataTypes  = require('sequelize');
const sequelize = require('../config/db.config');
const city = require('./city.model');
const country = require('./country.model');
const university = require('./university.model');


const Course = sequelize.define('course', {
  courseName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  courseDescription: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  startDate: {
    type: DataTypes.DATEONLY,
    allowNull: false,
    validate: {
      isDate: true,
    },
  },
  endDate: {
    type: DataTypes.DATEONLY,
    allowNull: false,
    validate: {
      isDate: true, 
    },
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
    validate: {
      isFloat: true,
      min: 0,
    },
  },
  countryId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'countries', 
      key: 'id',
    },
  },
  universityId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'universities', 
      key: 'id',
    },
  },
  cityId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'cities', 
      key: 'id',
    },
  },
  status: {
    type: DataTypes.ENUM('active', 'inactive'),
    defaultValue: 'active',
   allowNull: false,
},
});

module.exports = Course;
Course.hasOne(city,{     
  as:"cityData",sourceKey:"cityId",foreignKey:"id" 
});

Course.hasOne(country,{       
  as:"countryData",sourceKey:"countryId",foreignKey:"id" 
});

Course.hasOne(university,{       
  as:"universityData",sourceKey:"universityId",foreignKey:"id" 
});