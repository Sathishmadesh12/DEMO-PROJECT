const express = require('express');
const CourseController = require('../../controllers/course.controller');
const { validateCourse, validateRequest } = require('../../validations/course.validation');

const router = express.Router();


router.post('/',validateCourse,validateRequest, CourseController.createCourse);
router.get('/:id', CourseController.getCourse);
router.put('/:id',validateCourse,validateRequest, CourseController.updateCourse);
router.delete('/:id', CourseController.deleteCourse);
router.get('/', CourseController.getCourses);

module.exports = router;
