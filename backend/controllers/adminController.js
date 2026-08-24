const bcrypt = require('bcryptjs');
const db = require('../config/db');

// 1. إحصائيات لوحة التحكم المركزية (3D KPI)
exports.getStats = async (req, res) => {
  try {
    const [[{ totalStudents }]] = await db.query('SELECT COUNT(*) as totalStudents FROM students');
    const [[{ totalTeachers }]] = await db.query('SELECT COUNT(*) as totalTeachers FROM teachers');
    const [[{ totalSections }]] = await db.query('SELECT COUNT(*) as totalSections FROM sections');
    const [[{ totalTasks }]] = await db.query('SELECT COUNT(*) as totalTasks FROM assessment_tasks');

    return res.status(200).json({
      success: true,
      stats: {
        totalStudents,
        totalTeachers,
        totalSections,
        totalTasks
      },
      data: {
        totalStudents,
        totalTeachers,
        totalSections,
        totalTasks
      }
    });
  } catch (err) {
    console.error('Error in getStats:', err);
    return res.status(500).json({
      success: false,
      message: 'حدث خطأ أثناء جلب إحصائيات النظام.'
    });
  }
};

// 2. الهيكل والفصول (Grades & Sections)
exports.getGradesHierarchy = async (req, res) => {
  try {
    const [grades] = await db.query('SELECT * FROM grades ORDER BY level ASC');
    const [sections] = await db.query('SELECT * FROM sections ORDER BY name ASC');
    const [subjects] = await db.query('SELECT * FROM subjects ORDER BY name ASC');

    const data = grades.map(grade => ({
      ...grade,
      sections: sections.filter(sec => sec.grade_id === grade.id),
      subjects: subjects.filter(sub => sub.grade_id === grade.id)
    }));

    return res.status(200).json({
      success: true,
      data
    });
  } catch (err) {
    console.error('Error in getGradesHierarchy:', err);
    return res.status(500).json({
      success: false,
      message: 'حدث خطأ أثناء جلب الهيكل التعليمي.'
    });
  }
};

exports.createGrade = async (req, res) => {
  try {
    const { name, level } = req.body;

    if (!name || !level) {
      return res.status(400).json({
        success: false,
        message: 'يرجى إدخال اسم الصف والمستوى الرقمي.'
      });
    }

    const [existing] = await db.query('SELECT id FROM grades WHERE level = ?', [level]);
    if (existing.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'هذا الصف موجود بالفعل.'
      });
    }

    const [result] = await db.query(
      'INSERT INTO grades (name, level) VALUES (?, ?)',
      [name, level]
    );

    return res.status(201).json({
      success: true,
      message: 'تم إضافة الصف الدراسي بنجاح.',
      gradeId: result.insertId,
      data: {
        gradeId: result.insertId
      }
    });
  } catch (err) {
    console.error('Error in createGrade:', err);
    return res.status(500).json({
      success: false,
      message: 'حدث خطأ أثناء إضافة الصف الدراسي.'
    });
  }
};

exports.createSection = async (req, res) => {
  try {
    const { grade_id, name } = req.body;

    if (!grade_id || !name) {
      return res.status(400).json({
        success: false,
        message: 'يرجى إدخال معرف الصف واسم الشعبة.'
      });
    }

    const [existing] = await db.query(
      'SELECT id FROM sections WHERE grade_id = ? AND name = ?',
      [grade_id, name]
    );
    if (existing.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'هذه الشعبة موجودة بالفعل لهذا الصف.'
      });
    }

    const [result] = await db.query(
      'INSERT INTO sections (grade_id, name) VALUES (?, ?)',
      [grade_id, name]
    );

    return res.status(201).json({
      success: true,
      message: 'تم إضافة الشعبة بنجاح.',
      sectionId: result.insertId,
      data: {
        sectionId: result.insertId
      }
    });
  } catch (err) {
    console.error('Error in createSection:', err);
    return res.status(500).json({
      success: false,
      message: 'حدث خطأ أثناء إضافة الشعبة.'
    });
  }
};

exports.deleteSection = async (req, res) => {
  try {
    const sectionId = req.params.id;

    await db.query('DELETE FROM sections WHERE id = ?', [sectionId]);

    return res.status(200).json({
      success: true,
      message: 'تم حذف الشعبة بنجاح.'
    });
  } catch (err) {
    console.error('Error in deleteSection:', err);
    return res.status(500).json({
      success: false,
      message: 'حدث خطأ أثناء حذف الشعبة.'
    });
  }
};

// 3. إدارة المواد المقررة (Subjects)
exports.getSubjects = async (req, res) => {
  try {
    const { grade_id } = req.query;

    let query = `
      SELECT s.id, s.grade_id, s.name, g.name as grade_name, g.level
      FROM subjects s
      JOIN grades g ON s.grade_id = g.id
    `;
    const params = [];

    if (grade_id) {
      query += ` WHERE s.grade_id = ?`;
      params.push(parseInt(grade_id, 10));
    }

    query += ` ORDER BY g.level ASC, s.name ASC`;

    const [rows] = await db.query(query, params);

    return res.status(200).json({
      success: true,
      data: rows
    });
  } catch (err) {
    console.error('Error in getSubjects:', err);
    return res.status(500).json({
      success: false,
      message: 'حدث خطأ أثناء جلب المواد الدراسية.'
    });
  }
};

exports.createSubject = async (req, res) => {
  try {
    const { grade_id, name } = req.body;

    if (!grade_id || !name) {
      return res.status(400).json({
        success: false,
        message: 'يرجى إدخال معرف الصف واسم المادة.'
      });
    }

    const [existing] = await db.query(
      'SELECT id FROM subjects WHERE grade_id = ? AND name = ?',
      [grade_id, name]
    );
    if (existing.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'هذه المادة موجودة بالفعل لهذا الصف.'
      });
    }

    const [result] = await db.query(
      'INSERT INTO subjects (grade_id, name) VALUES (?, ?)',
      [grade_id, name]
    );

    return res.status(201).json({
      success: true,
      message: 'تم إضافة المادة بنجاح.',
      subjectId: result.insertId,
      data: {
        subjectId: result.insertId
      }
    });
  } catch (err) {
    console.error('Error in createSubject:', err);
    return res.status(500).json({
      success: false,
      message: 'حدث خطأ أثناء إضافة المادة.'
    });
  }
};

exports.deleteSubject = async (req, res) => {
  try {
    const subjectId = req.params.id;

    await db.query('DELETE FROM subjects WHERE id = ?', [subjectId]);

    return res.status(200).json({
      success: true,
      message: 'تم حذف المادة بنجاح.'
    });
  } catch (err) {
    console.error('Error in deleteSubject:', err);
    return res.status(500).json({
      success: false,
      message: 'حدث خطأ أثناء حذف المادة.'
    });
  }
};

// 4. إدارة وسجلات الطلاب (Students)
exports.getStudents = async (req, res) => {
  try {
    const { grade_id, section_id } = req.query;

    let query = `
      SELECT s.id, s.roll_number, s.student_code, s.full_name, 
             s.grade_id, g.name as grade_name, 
             s.section_id, sec.name as section_name, 
             s.created_at
      FROM students s
      JOIN grades g ON s.grade_id = g.id
      JOIN sections sec ON s.section_id = sec.id
      WHERE 1=1
    `;
    const params = [];

    if (grade_id) {
      query += ` AND s.grade_id = ?`;
      params.push(parseInt(grade_id, 10));
    }

    if (section_id) {
      query += ` AND s.section_id = ?`;
      params.push(parseInt(section_id, 10));
    }

    query += ` ORDER BY s.id DESC`;

    const [rows] = await db.query(query, params);

    return res.status(200).json({
      success: true,
      count: rows.length,
      data: rows
    });
  } catch (err) {
    console.error('Error in getStudents:', err);
    return res.status(500).json({
      success: false,
      message: 'حدث خطأ أثناء جلب سجلات الطلاب.'
    });
  }
};

exports.createStudent = async (req, res) => {
  try {
    const { roll_number, student_code, full_name, grade_id, section_id } = req.body;

    if (!roll_number || !student_code || !full_name || !grade_id || !section_id) {
      return res.status(400).json({
        success: false,
        message: 'يرجى ملء جميع الحقول الإلزامية لتسجيل الطالب.'
      });
    }

    const [existing] = await db.query(
      'SELECT id FROM students WHERE roll_number = ?',
      [roll_number]
    );
    if (existing.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'رقم الجلوس هذا مستخدم بالفعل لطالب آخر.'
      });
    }

    const [result] = await db.query(
      `INSERT INTO students (roll_number, student_code, full_name, grade_id, section_id)
       VALUES (?, ?, ?, ?, ?)`,
      [roll_number, student_code, full_name, grade_id, section_id]
    );

    return res.status(201).json({
      success: true,
      message: 'تم تسجيل الطالب بنجاح.',
      studentId: result.insertId,
      data: {
        studentId: result.insertId
      }
    });
  } catch (err) {
    console.error('Error in createStudent:', err);
    return res.status(500).json({
      success: false,
      message: 'حدث خطأ أثناء تسجيل الطالب.'
    });
  }
};

exports.updateStudent = async (req, res) => {
  try {
    const studentId = req.params.id;
    const { roll_number, student_code, full_name, grade_id, section_id } = req.body;

    const [existing] = await db.query(
      'SELECT id FROM students WHERE id = ?',
      [studentId]
    );
    if (existing.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'لم يتم العثور على سجل الطالب.'
      });
    }

    if (roll_number) {
      const [duplicate] = await db.query(
        'SELECT id FROM students WHERE roll_number = ? AND id != ?',
        [roll_number, studentId]
      );
      if (duplicate.length > 0) {
        return res.status(400).json({
          success: false,
          message: 'رقم الجلوس هذا مستخدم لطالب آخر.'
        });
      }
    }

    await db.query(
      `UPDATE students 
       SET roll_number = COALESCE(?, roll_number),
           student_code = COALESCE(?, student_code),
           full_name = COALESCE(?, full_name),
           grade_id = COALESCE(?, grade_id),
           section_id = COALESCE(?, section_id)
       WHERE id = ?`,
      [roll_number, student_code, full_name, grade_id, section_id, studentId]
    );

    return res.status(200).json({
      success: true,
      message: 'تم تحديث بيانات الطالب بنجاح.'
    });
  } catch (err) {
    console.error('Error in updateStudent:', err);
    return res.status(500).json({
      success: false,
      message: 'حدث خطأ أثناء تحديث بيانات الطالب.'
    });
  }
};

exports.deleteStudent = async (req, res) => {
  try {
    const studentId = req.params.id;

    await db.query('DELETE FROM students WHERE id = ?', [studentId]);

    return res.status(200).json({
      success: true,
      message: 'تم حذف الطالب بنجاح.'
    });
  } catch (err) {
    console.error('Error in deleteStudent:', err);
    return res.status(500).json({
      success: false,
      message: 'حدث خطأ أثناء حذف سجل الطالب.'
    });
  }
};

// 5. إدارة المعلمين والتكليفات (Teachers & Assignments)
exports.getTeachers = async (req, res) => {
  try {
    const [rows] = await db.query(
      'SELECT id, username, full_name, created_at FROM teachers ORDER BY id ASC'
    );

    return res.status(200).json({
      success: true,
      data: rows
    });
  } catch (err) {
    console.error('Error in getTeachers:', err);
    return res.status(500).json({
      success: false,
      message: 'حدث خطأ أثناء جلب قائمة المعلمين.'
    });
  }
};

exports.createTeacher = async (req, res) => {
  try {
    const { username, password, full_name } = req.body;

    if (!username || !password || !full_name) {
      return res.status(400).json({
        success: false,
        message: 'يرجى ملء جميع الحقول الإلزامية للمعلم.'
      });
    }

    const [existing] = await db.query(
      'SELECT id FROM teachers WHERE username = ?',
      [username]
    );
    if (existing.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'اسم المستخدم هذا مأخوذ بالفعل لمعلم آخر.'
      });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const [result] = await db.query(
      'INSERT INTO teachers (username, password_hash, full_name) VALUES (?, ?, ?)',
      [username, passwordHash, full_name]
    );

    return res.status(201).json({
      success: true,
      message: 'تم إضافة حساب المعلم بنجاح.',
      teacherId: result.insertId,
      data: {
        teacherId: result.insertId
      }
    });
  } catch (err) {
    console.error('Error in createTeacher:', err);
    return res.status(500).json({
      success: false,
      message: 'حدث خطأ أثناء إنشاء حساب المعلم.'
    });
  }
};

exports.deleteTeacher = async (req, res) => {
  try {
    const teacherId = req.params.id;

    await db.query('DELETE FROM teachers WHERE id = ?', [teacherId]);

    return res.status(200).json({
      success: true,
      message: 'تم حذف حساب المعلم بنجاح.'
    });
  } catch (err) {
    console.error('Error in deleteTeacher:', err);
    return res.status(500).json({
      success: false,
      message: 'حدث خطأ أثناء حذف حساب المعلم.'
    });
  }
};

exports.getAssignments = async (req, res) => {
  try {
    const [rows] = await db.query(
      `SELECT ta.id, ta.teacher_id, tch.full_name as teacher_name, 
              ta.subject_id, s.name as subject_name, 
              ta.section_id, sec.name as section_name, 
              g.name as grade_name
       FROM teacher_assignments ta
       JOIN teachers tch ON ta.teacher_id = tch.id
       JOIN subjects s ON ta.subject_id = s.id
       JOIN sections sec ON ta.section_id = sec.id
       JOIN grades g ON sec.grade_id = g.id
       ORDER BY ta.id DESC`
    );

    return res.status(200).json({
      success: true,
      data: rows
    });
  } catch (err) {
    console.error('Error in getAssignments:', err);
    return res.status(500).json({
      success: false,
      message: 'حدث خطأ أثناء جلب تكليفات المعلمين.'
    });
  }
};

exports.createAssignment = async (req, res) => {
  try {
    const { teacher_id, subject_id, section_id } = req.body;

    if (!teacher_id || !subject_id || !section_id) {
      return res.status(400).json({
        success: false,
        message: 'يرجى إدخال المعلم والمادة والشعبة.'
      });
    }

    const [existing] = await db.query(
      'SELECT id FROM teacher_assignments WHERE teacher_id = ? AND subject_id = ? AND section_id = ?',
      [teacher_id, subject_id, section_id]
    );
    if (existing.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'هذا المعلم مكلف بالفعل بهذه المادة لهذه الشعبة.'
      });
    }

    const [result] = await db.query(
      'INSERT INTO teacher_assignments (teacher_id, subject_id, section_id) VALUES (?, ?, ?)',
      [teacher_id, subject_id, section_id]
    );

    return res.status(201).json({
      success: true,
      message: 'تم تكليف المعلم بنجاح.',
      assignmentId: result.insertId,
      data: {
        assignmentId: result.insertId
      }
    });
  } catch (err) {
    console.error('Error in createAssignment:', err);
    return res.status(500).json({
      success: false,
      message: 'حدث خطأ أثناء إسناد التكليف للمعلم.'
    });
  }
};

exports.deleteAssignment = async (req, res) => {
  try {
    const assignmentId = req.params.id;

    await db.query('DELETE FROM teacher_assignments WHERE id = ?', [assignmentId]);

    return res.status(200).json({
      success: true,
      message: 'تم إزالة التكليف بنجاح.'
    });
  } catch (err) {
    console.error('Error in deleteAssignment:', err);
    return res.status(500).json({
      success: false,
      message: 'حدث خطأ أثناء إزالة التكليف.'
    });
  }
};

// 6. إدارة الجدول الدراسي الأسبوعي (Weekly Timetable)
exports.getSchedule = async (req, res) => {
  try {
    const { section_id } = req.query;

    let sql = `SELECT slot.id, slot.section_id, sec.name as section_name, 
                      slot.day_of_week, slot.slot_number, 
                      slot.subject_id, s.name as subject_name, 
                      slot.teacher_id, tch.full_name as teacher_name, 
                      g.name as grade_name, g.id as grade_id
               FROM schedule_slots slot
               JOIN sections sec ON slot.section_id = sec.id
               JOIN grades g ON sec.grade_id = g.id
               JOIN subjects s ON slot.subject_id = s.id
               JOIN teachers tch ON slot.teacher_id = tch.id`;
    const params = [];

    if (section_id) {
      sql += ` WHERE slot.section_id = ?`;
      params.push(section_id);
    }
    sql += ` ORDER BY slot.day_of_week ASC, slot.slot_number ASC`;

    const [rows] = await db.query(sql, params);

    return res.status(200).json({
      success: true,
      data: rows
    });
  } catch (err) {
    console.error('Error in getSchedule:', err);
    return res.status(500).json({
      success: false,
      message: 'حدث خطأ أثناء جلب جدول الحصص.'
    });
  }
};

exports.upsertScheduleSlot = async (req, res) => {
  try {
    const { section_id, day_of_week, slot_number, subject_id, teacher_id } = req.body;

    if (!section_id || !day_of_week || !slot_number || !subject_id || !teacher_id) {
      return res.status(400).json({
        success: false,
        message: 'يرجى ملء جميع بيانات الحصة (الشعبة، اليوم، رقم الحصة، المادة، المعلم).'
      });
    }

    // تحقق من وجود الحصة مسبقاً (Cross-driver Upsert)
    const [existing] = await db.query(
      `SELECT id FROM schedule_slots 
       WHERE section_id = ? AND day_of_week = ? AND slot_number = ?`,
      [section_id, day_of_week, slot_number]
    );

    if (existing.length > 0) {
      await db.query(
        `UPDATE schedule_slots 
         SET subject_id = ?, teacher_id = ? 
         WHERE id = ?`,
        [subject_id, teacher_id, existing[0].id]
      );
    } else {
      await db.query(
        `INSERT INTO schedule_slots (section_id, day_of_week, slot_number, subject_id, teacher_id)
         VALUES (?, ?, ?, ?, ?)`,
        [section_id, day_of_week, slot_number, subject_id, teacher_id]
      );
    }

    return res.status(200).json({
      success: true,
      message: 'تم تخصيص الحصة بالجدول بنجاح.'
    });
  } catch (err) {
    console.error('Error in upsertScheduleSlot:', err);
    return res.status(500).json({
      success: false,
      message: 'حدث خطأ أثناء حفظ الحصة بالجدول.'
    });
  }
};

exports.deleteScheduleSlot = async (req, res) => {
  try {
    const slotId = req.params.id;

    await db.query('DELETE FROM schedule_slots WHERE id = ?', [slotId]);

    return res.status(200).json({
      success: true,
      message: 'تم تفريغ الحصة من الجدول بنجاح.'
    });
  } catch (err) {
    console.error('Error in deleteScheduleSlot:', err);
    return res.status(500).json({
      success: false,
      message: 'حدث خطأ أثناء تفريغ الحصة.'
    });
  }
};
