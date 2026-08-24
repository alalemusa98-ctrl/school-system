const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { authenticateToken } = require('../middlewares/authMiddleware');

// Standardized Auth Endpoints
router.post('/login/admin', authController.loginAdmin);
router.post('/login/teacher', authController.loginTeacher);
router.post('/login/student', authController.loginStudent);
router.get('/me', authenticateToken, authController.getMe);

// Backward compatibility aliases
router.post('/admin-login', authController.loginAdmin);
router.post('/teacher-login', authController.loginTeacher);
router.post('/student-login', authController.loginStudent);

module.exports = router;
