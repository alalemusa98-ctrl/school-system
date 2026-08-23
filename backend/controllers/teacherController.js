const db = require('../config/db');

// 1. استرجاع تكليفات المعلم الأكاديمية
exports.getAssignments = async (req, res) => {
  try {
    const teacherId = req.user.id;

    const [rows] = await db.query(
      `SELECT ta.id as assignment_id, ta.subject_id, s.name as subject_name,
              ta.section_id, sec.name as section_name, 
              sec.grade_id, g.name as grade_name
       FROM teacher_assignments ta
       JOIN subjects s ON ta.subject_id = s.id
       JOIN sections sec ON ta.section_id = sec.id
       JOIN grades g ON sec.grade_id = g.id
       WHERE ta.teacher_id = ?
       ORDER BY g.level ASC, sec.name ASC`,
      [teacherId]
    );

    return res.status(200).json({
      success: true,
      data: rows
    });
  } catch (err) {
    console.error('Error in getAssignments:', err);
    return res.status(500).json({
      success: false,
      message: 'حدث خطأ داخلي في الخادم.'
    });
  }
};

// 2. استرجاع مهام وواجبات المعلم
exports.getTasks = async (req, res) => {
  try {
    const teacherId = req.user.id;
    const { section_id, subject_id } = req.query;

    let query = `
      SELECT t.id, t.title, t.description, t.task_type, 
             t.attachment_path, t.due_date, t.created_at, 
             t.has_solution, t.solution_text, t.solution_attachment_path, 
             t.subject_id, s.name as subject_name, 
             t.section_id, sec.name as section_name, 
             g.name as grade_name
      FROM assessment_tasks t
      JOIN subjects s ON t.subject_id = s.id
      JOIN sections sec ON t.section_id = sec.id
      JOIN grades g ON sec.grade_id = g.id
      WHERE t.teacher_id = ?
    `;
    const params = [teacherId];

    if (section_id) {
      query += ` AND t.section_id = ?`;
      params.push(parseInt(section_id, 10));
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

// 3. إنشاء واجب أو امتحان جديد
exports.createTask = async (req, res) => {
  try {
    const teacherId = req.user.id;
    const { title, description, task_type, subject_id, section_id, due_date, has_solution, solution_text } = req.body;

    if (!title || !task_type || !subject_id || !section_id) {
      return res.status(400).json({
        success: false,
        message: 'يرجى ملء جميع الحقول الإلزامية (العنوان، النوع، المادة، الشعبة).'
      });
    }

    // التحقق من أن المعلم مكلف بتدريس هذه الشعبة والمادة
    const [assignments] = await db.query(
      `SELECT id FROM teacher_assignments 
       WHERE teacher_id = ? AND subject_id = ? AND section_id = ?`,
      [teacherId, subject_id, section_id]
    );

    if (assignments.length === 0) {
      return res.status(403).json({
        success: false,
        message: 'عذراً، أنت غير مكلف بتدريس هذه المادة لهذه الشعبة.'
      });
    }

    let attachmentPath = null;
    let solutionAttachmentPath = null;

    if (req.files) {
      if (req.files.attachment && req.files.attachment.length > 0) {
        attachmentPath = `/uploads/${req.files.attachment[0].filename}`;
      }
      if (req.files.solution_attachment && req.files.solution_attachment.length > 0) {
        solutionAttachmentPath = `/uploads/${req.files.solution_attachment[0].filename}`;
      }
    }

    const hasSolutionVal = (has_solution === '1' || has_solution === 'true' || has_solution === 1 || has_solution === true) ? 1 : 0;

    const [result] = await db.query(
      `INSERT INTO assessment_tasks 
       (title, description, task_type, subject_id, section_id, teacher_id, attachment_path, due_date, has_solution, solution_text, solution_attachment_path)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        title,
        description || null,
        task_type.toUpperCase(),
        subject_id,
        section_id,
        teacherId,
        attachmentPath,
        due_date || null,
        hasSolutionVal,
        solution_text || null,
        solutionAttachmentPath
      ]
    );

    return res.status(201).json({
      success: true,
      message: 'تم إنشاء المهمة بنجاح.',
      taskId: result.insertId
    });
  } catch (err) {
    console.error('Error in createTask:', err);
    return res.status(500).json({
      success: false,
      message: 'حدث خطأ داخلي في الخادم.'
    });
  }
};

// 4. تعديل مهمة منشأة
exports.updateTask = async (req, res) => {
  try {
    const teacherId = req.user.id;
    const taskId = req.params.id;
    const { title, description, task_type, subject_id, section_id, due_date, has_solution, solution_text } = req.body;

    const [existing] = await db.query(
      `SELECT * FROM assessment_tasks WHERE id = ? AND teacher_id = ?`,
      [taskId, teacherId]
    );

    if (existing.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'المهمة غير موجودة أو ليس لديك صلاحية تعديلها.'
      });
    }

    const currentTask = existing[0];

    let attachmentPath = currentTask.attachment_path;
    let solutionAttachmentPath = currentTask.solution_attachment_path;

    if (req.files) {
      if (req.files.attachment && req.files.attachment.length > 0) {
        attachmentPath = `/uploads/${req.files.attachment[0].filename}`;
      }
      if (req.files.solution_attachment && req.files.solution_attachment.length > 0) {
        solutionAttachmentPath = `/uploads/${req.files.solution_attachment[0].filename}`;
      }
    }

    const hasSolutionVal = has_solution !== undefined
      ? ((has_solution === '1' || has_solution === 'true' || has_solution === 1 || has_solution === true) ? 1 : 0)
      : currentTask.has_solution;

    await db.query(
      `UPDATE assessment_tasks 
       SET title = ?, description = ?, task_type = ?, subject_id = ?, section_id = ?, 
           attachment_path = ?, due_date = ?, has_solution = ?, solution_text = ?, 
           solution_attachment_path = ?
       WHERE id = ? AND teacher_id = ?`,
      [
        title || currentTask.title,
        description !== undefined ? description : currentTask.description,
        task_type ? task_type.toUpperCase() : currentTask.task_type,
        subject_id || currentTask.subject_id,
        section_id || currentTask.section_id,
        attachmentPath,
        due_date !== undefined ? due_date : currentTask.due_date,
        hasSolutionVal,
        solution_text !== undefined ? solution_text : currentTask.solution_text,
        solutionAttachmentPath,
        taskId,
        teacherId
      ]
    );

    return res.status(200).json({
      success: true,
      message: 'تم تعديل المهمة بنجاح.'
    });
  } catch (err) {
    console.error('Error in updateTask:', err);
    return res.status(500).json({
      success: false,
      message: 'حدث خطأ داخلي في الخادم.'
    });
  }
};

// 5. حذف مهمة
exports.deleteTask = async (req, res) => {
  try {
    const teacherId = req.user.id;
    const taskId = req.params.id;

    const [result] = await db.query(
      `DELETE FROM assessment_tasks WHERE id = ? AND teacher_id = ?`,
      [taskId, teacherId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: 'المهمة غير موجودة أو ليس لديك صلاحية حذفها.'
      });
    }

    return res.status(200).json({
      success: true,
      message: 'تم حذف المهمة بنجاح.'
    });
  } catch (err) {
    console.error('Error in deleteTask:', err);
    return res.status(500).json({
      success: false,
      message: 'حدث خطأ داخلي في الخادم.'
    });
  }
};

// 6. جدول حصص المعلم
exports.getSchedule = async (req, res) => {
  try {
    const teacherId = req.user.id;

    const [rows] = await db.query(
      `SELECT slot.id, slot.day_of_week, slot.slot_number, 
              s.name as subject_name, sec.name as section_name, 
              g.name as grade_name
       FROM schedule_slots slot
       JOIN subjects s ON slot.subject_id = s.id
       JOIN sections sec ON slot.section_id = sec.id
       JOIN grades g ON sec.grade_id = g.id
       WHERE slot.teacher_id = ?
       ORDER BY slot.day_of_week ASC, slot.slot_number ASC`,
      [teacherId]
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
