const bcrypt = require('bcryptjs');
const db = require('../config/db');
const { generateToken } = require('../utils/jwt');

// 1. تسجيل دخول المشرف العام (Admin Login)
exports.loginAdmin = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: 'يرجى إدخال اسم المستخدم وكلمة المرور.'
      });
    }

    const [rows] = await db.query('SELECT * FROM admins WHERE username = ?', [username]);
    if (rows.length === 0) {
      return res.status(401).json({
        success: false,
        message: 'بيانات الدخول غير صحيحة.'
      });
    }

    const admin = rows[0];
    const isMatch = await bcrypt.compare(password, admin.password_hash);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'بيانات الدخول غير صحيحة.'
      });
    }

    const payload = {
      id: admin.id,
      role: 'ADMIN',
      username: admin.username
    };

    const token = generateToken(payload);

    return res.status(200).json({
      success: true,
      message: 'تم تسجيل الدخول بنجاح',
      token,
      user: {
        id: admin.id,
        role: 'ADMIN',
        username: admin.username,
        fullName: admin.full_name
      }
    });
  } catch (err) {
    console.error('Error in loginAdmin:', err);
    return res.status(500).json({
      success: false,
      message: 'حدث خطأ داخلي في الخادم.'
    });
  }
};

// 2. تسجيل دخول المعلم (Teacher Login)
exports.loginTeacher = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: 'يرجى إدخال اسم المستخدم وكلمة المرور.'
      });
    }

    const [rows] = await db.query('SELECT * FROM teachers WHERE username = ?', [username]);
    if (rows.length === 0) {
      return res.status(401).json({
        success: false,
        message: 'اسم المستخدم أو كلمة المرور غير صحيحة.'
      });
    }

    const teacher = rows[0];
    const isMatch = await bcrypt.compare(password, teacher.password_hash);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'اسم المستخدم أو كلمة المرور غير صحيحة.'
      });
    }

    const payload = {
      id: teacher.id,
      role: 'TEACHER',
      username: teacher.username,
      fullName: teacher.full_name
    };

    const token = generateToken(payload);

    return res.status(200).json({
      success: true,
      message: 'تم تسجيل دخول المعلم بنجاح',
      token,
      user: {
        id: teacher.id,
        role: 'TEACHER',
        username: teacher.username,
        fullName: teacher.full_name
      }
    });
  } catch (err) {
    console.error('Error in loginTeacher:', err);
    return res.status(500).json({
      success: false,
      message: 'حدث خطأ داخلي في الخادم.'
    });
  }
};

// 3. تسجيل دخول الطالب (Student Login)
exports.loginStudent = async (req, res) => {
  try {
    const { roll_number, student_code } = req.body;

    if (!roll_number || !student_code) {
      return res.status(400).json({
        success: false,
        message: 'يرجى إدخال رقم الجلوس وكود الطالب.'
      });
    }

    const [rows] = await db.query(
      `SELECT s.*, g.name as grade_name, sec.name as section_name 
       FROM students s 
       JOIN grades g ON s.grade_id = g.id 
       JOIN sections sec ON s.section_id = sec.id 
       WHERE s.roll_number = ? AND s.student_code = ?`,
      [roll_number, student_code]
    );

    if (rows.length === 0) {
      return res.status(401).json({
        success: false,
        message: 'رقم الجلوس أو كود الطالب غير صحيح.'
      });
    }

    const student = rows[0];

    const payload = {
      id: student.id,
      role: 'STUDENT',
      rollNumber: student.roll_number,
      fullName: student.full_name,
      gradeId: student.grade_id,
      sectionId: student.section_id
    };

    const token = generateToken(payload);

    return res.status(200).json({
      success: true,
      message: 'تم تسجيل دخول الطالب بنجاح',
      token,
      user: {
        id: student.id,
        role: 'STUDENT',
        rollNumber: student.roll_number,
        fullName: student.full_name,
        gradeId: student.grade_id,
        sectionId: student.section_id,
        gradeName: student.grade_name,
        sectionName: student.section_name
      }
    });
  } catch (err) {
    console.error('Error in loginStudent:', err);
    return res.status(500).json({
      success: false,
      message: 'حدث خطأ داخلي في الخادم.'
    });
  }
};

// 4. فحص الجلسة الحالية (Get Current User)
exports.getMe = async (req, res) => {
  try {
    return res.status(200).json({
      success: true,
      user: req.user
    });
  } catch (err) {
    console.error('Error in getMe:', err);
    return res.status(500).json({
      success: false,
      message: 'حدث خطأ داخلي في الخادم.'
    });
  }
};
