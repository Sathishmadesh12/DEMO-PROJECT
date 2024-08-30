const httpStatus = require('http-status');
const CourseService = require('../services/course.service');

class CourseController {
  async createCourse(req, res) {
    try {
      const course = await CourseService.createCourse(req.body);
      res.status(httpStatus.CREATED).json(course);
    } catch (error) {
      res.status(httpStatus.BAD_REQUEST).json({ error: error.message });
    }
  }

  async getCourse(req, res) {
    try {
      const course = await CourseService.getCourseById(req.params.id);
      console.log('coures', course)
      if (!course) {
        return res.status(httpStatus.NOT_FOUND).json({ message: 'Course not found' });
      }
      res.status(httpStatus.OK).json(course);
    } catch (error) {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
  }

  async updateCourse(req, res) {
    try {
      const updated = await CourseService.updateCourse(req.params.id, req.body);
      if (updated[0] === 0) {
        return res.status(httpStatus.NOT_FOUND).json({ message: 'Course not found or no change' });
      }
      res.status(httpStatus.OK).json({ message: 'Course updated successfully' });
    } catch (error) {
      res.status(httpStatus.BAD_REQUEST).json({ error: error.message });
    }
  }

  async deleteCourse(req, res) {
    try {
      const deleted = await CourseService.deleteCourse(req.params.id);
      if (deleted === 0) {
        return res.status(httpStatus.NOT_FOUND).json({ message: 'Course not found' });
      }
      res.status(httpStatus.NO_CONTENT).send();
    } catch (error) {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
  }

  async getCourses(req, res) {
    try {
      const { page = 1, limit = 10, search = '' } = req.query;
      const result = await CourseService.getCourses({
        page: parseInt(page, 10),
        limit: parseInt(limit, 10),
        search
      });
      res.status(httpStatus.OK).json(result);
    } catch (error) {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
  }
}

module.exports = new CourseController();
