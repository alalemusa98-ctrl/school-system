const db = require('../config/db');

// 1. استرجاع الملف الشخصي للطالب
exports.getProfile = async (req, res) => {
  try {
    const studentId = req.user.id;

    const [rows] = await db.query(
      `SELECT s.id, s.roll_number, s.student_code, s.full_name, 
              s.grade_id, g.name as grade_name, g.level, 
              s.section_id, sec.name as section_name
       FROM students s
       JOIN grades g ON s.grade_id = g.id
       JOIN sections sec ON s.section_id = sec.id
       WHERE s.id = ?`,
      [studentId]
    );

    if (rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'لم يتم العثور على بيانات الطالب.'
      });
    }

    return res.status(200).json({
      success: true,
      data: rows[0]
    });
  } catch (err) {
    console.error('Error in getProfile:', err);
    return res.status(500).json({
      success: false,
      message: 'حدث خطأ داخلي في الخادم.'
    });
  }
};

// 2. استرجاع واجبات وامتحانات وحلول شعبة الطالب
exports.getTasks = async (req, res) => {
  try {
    const sectionId = req.user.sectionId;
    const { task_type, subject_id } = req.query;

    let query = `
      SELECT t.id, t.title, t.description, t.task_type, 
             t.attachment_path, t.due_date, t.created_at, 
             t.has_solution, t.solution_text, t.solution_attachment_path, 
             t.subject_id, s.name as subject_name, 
             tch.full_name as teacher_name
      FROM assessment_tasks t
      JOIN subjects s ON t.subject_id = s.id
      JOIN teachers tch ON t.teacher_id = tch.id
      WHERE t.section_id = ?
    `;
    const params = [sectionId];

    if (task_type) {
      query += ` AND t.task_type = ?`;
      params.push(task_type.toUpperCase());
    }

    if (subject_id) {
      query += ` AND t.subject_id = ?`;
      params.push(parseInt(subject_id, 10));
    }

    query += ` ORDER BY t.created_at DESC`;

    const [rows] = await db.query(query, params);

    return res.status(200).json({
      success: true,
      count: rows.length,
      data: rows
    });
  } catch (err) {
    console.error('Error in getTasks:', err);
    return res.status(500).json({
      success: false,
      message: 'حدث خطأ داخلي في الخادم.'
    });
  }
};

// 3. استرجاع جدول الحصص الأسبوعي لشعبة الطالب
exports.getSchedule = async (req, res) => {
  try {
    const sectionId = req.user.sectionId;

    const [rows] = await db.query(
      `SELECT slot.id, slot.day_of_week, slot.slot_number, 
              s.name as subject_name, tch.full_name as teacher_name
       FROM schedule_slots slot
       JOIN subjects s ON slot.subject_id = s.id
       JOIN teachers tch ON slot.teacher_id = tch.id
       WHERE slot.section_id = ?
       ORDER BY slot.day_of_week ASC, slot.slot_number ASC`,
      [sectionId]
    );

    return res.status(200).json({
      success: true,
      data: rows
    });
  } catch (err) {
    console.error('Error in getSchedule:', err);
    return res.status(500).json({
      success: false,
      message: 'حدث خطأ داخلي في الخادم.'
    });
  }
};

// 4. استرجاع المواد المقررة للطالب مع معلمي فصله
exports.getSubjects = async (req, res) => {
  try {
    const gradeId = req.user.gradeId;
    const sectionId = req.user.sectionId;

    const [rows] = await db.query(
      `SELECT s.id, s.name, tch.full_name as teacher_name
       FROM subjects s
       LEFT JOIN teacher_assignments ta ON s.id = ta.subject_id AND ta.section_id = ?
       LEFT JOIN teachers tch ON ta.teacher_id = tch.id
       WHERE s.grade_id = ?
       ORDER BY s.id ASC`,
      [sectionId, gradeId]
    );

    return res.status(200).json({
      success: true,
      data: rows
    });
  } catch (err) {
    console.error('Error in getSubjects:', err);
    return res.status(500).json({
      success: false,
      message: 'حدث خطأ داخلي في الخادم.'
    });
  }
};
