const express = require('express');
const router = express.Router();
const teacherController = require('../controllers/teacherController');
const { authenticateToken, requireRole } = require('../middlewares/authMiddleware');
const { taskUpload } = require('../utils/upload');

router.use(authenticateToken, requireRole('TEACHER'));

router.get('/assignments', teacherController.getAssignments);
router.get('/tasks', teacherController.getTasks);
router.post('/tasks', taskUpload, teacherController.createTask);
router.put('/tasks/:id', taskUpload, teacherController.updateTask);
router.delete('/tasks/:id', teacherController.deleteTask);
router.get('/schedule', teacherController.getSchedule);

module.exports = router;
