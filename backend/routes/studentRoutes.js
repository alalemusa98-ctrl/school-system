const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');
const { authenticateToken, requireRole } = require('../middlewares/authMiddleware');

router.use(authenticateToken, requireRole('STUDENT'));

router.get('/profile', studentController.getProfile);
router.get('/tasks', studentController.getTasks);
router.get('/schedule', studentController.getSchedule);
router.get('/subjects', studentController.getSubjects);

module.exports = router;
