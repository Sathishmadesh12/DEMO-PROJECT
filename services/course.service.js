const { Op } = require('sequelize');
const Course = require('../models/course.model');
const city = require('../models/city.model');
const university = require('../models/university.model');
const country = require('../models/country.model');


class CourseService {
  async createCourse(courseData) {
    return Course.create(courseData);
  }

  async getCourseById(id) {
    return Course.findByPk(id, {
      include: [
        { model: city, as: 'cityData'},  //{ model: city, as: 'cityData', attributes: [] },
        { model: country, as: 'countryData'},
        { model: university, as: 'universityData'}
      ]

    }
    );
  }

  async updateCourse(id, courseData) {
    return Course.update(courseData, { where: { id } });
  }

  async deleteCourse(id) {
    return Course.destroy({ where: { id } });
  }

  async getCourses({ page = 1, limit = 10, search = '' }) {
    page = parseInt(page, 10);
    limit = parseInt(limit, 10);

    if (isNaN(page) || page <= 0) {
      page = 1;
    }
    if (isNaN(limit) || limit <= 0) {
      limit = 10;
    }

    const offset = (page - 1) * limit;

    const where = search
      ? {
        [Op.or]: [
          { courseName: { [Op.iLike]: `%${search}%` } },
          { courseDescription: { [Op.iLike]: `%${search}%` } }
        ]
      }
      : {};

    return Course.findAndCountAll({
      where,
      limit,
      offset,
    });
  }
}

module.exports = new CourseService();
