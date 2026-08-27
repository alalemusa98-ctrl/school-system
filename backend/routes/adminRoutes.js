const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { authenticateToken, requireRole } = require('../middlewares/authMiddleware');

router.use(authenticateToken, requireRole('ADMIN'));

// 1. Stats
router.get('/stats', adminController.getStats);

// 2. Grades & Sections
router.get('/grades', adminController.getGradesHierarchy);
router.post('/grades', adminController.createGrade);
router.post('/sections', adminController.createSection);
router.delete('/sections/:id', adminController.deleteSection);

// 3. Subjects
router.get('/subjects', adminController.getSubjects);
router.post('/subjects', adminController.createSubject);
router.delete('/subjects/:id', adminController.deleteSubject);

// 4. Students
router.get('/students', adminController.getStudents);
router.post('/students', adminController.createStudent);
router.put('/students/:id', adminController.updateStudent);
router.delete('/students/:id', adminController.deleteStudent);

// 5. Teachers & Assignments
router.get('/teachers', adminController.getTeachers);
router.post('/teachers', adminController.createTeacher);
router.delete('/teachers/:id', adminController.deleteTeacher);
router.get('/assignments', adminController.getAssignments);
router.post('/assignments', adminController.createAssignment);
router.delete('/assignments/:id', adminController.deleteAssignment);

// 6. Weekly Timetable
router.get('/schedule', adminController.getSchedule);
router.post('/schedule', adminController.upsertScheduleSlot);
router.delete('/schedule/:id', adminController.deleteScheduleSlot);

module.exports = router;
