const bcrypt = require('bcryptjs');
const db = require('../../config/db');

async function seed() {
  console.log('[Seed] جاري تعبئة البيانات الأولية في قاعدة البيانات...');

  try {
    // 1. السنة الدراسية
    await db.query(`DELETE FROM academic_years`);
    await db.query(`INSERT INTO academic_years (name, is_current) VALUES (?, ?)`, ['2025/2026', 1]);
    console.log('[Seed] تم إدراج السنة الدراسية الحالية 2025/2026.');

    // 2. الصفوف الـ 9
    await db.query(`DELETE FROM grades`);
    const gradeNames = [
      'الصف الأول', 'الصف الثاني', 'الصف الثالث',
      'الصف الرابع', 'الصف الخامس', 'الصف السادس',
      'الصف السابع', 'الصف الثامن', 'الصف التاسع'
    ];
    for (let i = 1; i <= 9; i++) {
      await db.query(`INSERT INTO grades (level, name) VALUES (?, ?)`, [i, gradeNames[i - 1]]);
    }
    console.log('[Seed] تم إدراج الصفوف الأساسية الـ 9.');

    // جلب معرفات الصفوف
    const [grades] = await db.query(`SELECT id, level FROM grades`);
    const gradeMap = {};
    grades.forEach(g => { gradeMap[g.level] = g.id; });

    // 3. الشعب
    await db.query(`DELETE FROM sections`);
    const [sec5aRes] = await db.query(`INSERT INTO sections (grade_id, name) VALUES (?, ?)`, [gradeMap[5], '5أ']);
    const [sec5bRes] = await db.query(`INSERT INTO sections (grade_id, name) VALUES (?, ?)`, [gradeMap[5], '5ب']);
    const [sec8aRes] = await db.query(`INSERT INTO sections (grade_id, name) VALUES (?, ?)`, [gradeMap[8], '8أ']);

    const sec5aId = sec5aRes.insertId;
    const sec5bId = sec5bRes.insertId;
    const sec8aId = sec8aRes.insertId;

    // 4. المواد الدراسية
    await db.query(`DELETE FROM subjects`);
    const [subIslamRes] = await db.query(`INSERT INTO subjects (grade_id, name) VALUES (?, ?)`, [gradeMap[5], 'التربية الإسلامية']);
    const [subMathRes] = await db.query(`INSERT INTO subjects (grade_id, name) VALUES (?, ?)`, [gradeMap[5], 'الرياضيات']);
    const [subSciRes] = await db.query(`INSERT INTO subjects (grade_id, name) VALUES (?, ?)`, [gradeMap[5], 'العلوم العامة']);
    const [subArabRes] = await db.query(`INSERT INTO subjects (grade_id, name) VALUES (?, ?)`, [gradeMap[5], 'اللغة العربية']);
    const [subEngRes] = await db.query(`INSERT INTO subjects (grade_id, name) VALUES (?, ?)`, [gradeMap[5], 'اللغة الإنجليزية']);

    const [subMath8Res] = await db.query(`INSERT INTO subjects (grade_id, name) VALUES (?, ?)`, [gradeMap[8], 'الرياضيات']);
    const [subSci8Res] = await db.query(`INSERT INTO subjects (grade_id, name) VALUES (?, ?)`, [gradeMap[8], 'العلوم العامة']);

    const subIslamId = subIslamRes.insertId;
    const subMathId = subMathRes.insertId;
    const subSciId = subSciRes.insertId;
    const subArabId = subArabRes.insertId;
    const subEngId = subEngRes.insertId;

    // 5. حساب المشرف العام
    await db.query(`DELETE FROM admins`);
    const adminPassHash = await bcrypt.hash('admin123', 10);
    await db.query(
      `INSERT INTO admins (username, password_hash, full_name) VALUES (?, ?, ?)`,
      ['admin', adminPassHash, 'مدير المدرسة']
    );
    console.log('[Seed] تم إنشاء حساب المشرف العام: admin.');

    // 6. حسابات المعلمين (5 معلمين)
    await db.query(`DELETE FROM teachers`);
    const teacherPassHash = await bcrypt.hash('teacher123', 10);

    const [t1Res] = await db.query(`INSERT INTO teachers (username, password_hash, full_name) VALUES (?, ?, ?)`, ['teacher1', teacherPassHash, 'أ. أسامة علي']);
    const [t2Res] = await db.query(`INSERT INTO teachers (username, password_hash, full_name) VALUES (?, ?, ?)`, ['teacher2', teacherPassHash, 'أ. أحمد سالم']);
    const [t3Res] = await db.query(`INSERT INTO teachers (username, password_hash, full_name) VALUES (?, ?, ?)`, ['teacher3', teacherPassHash, 'أ. فاطمة العبيدي']);
    const [t4Res] = await db.query(`INSERT INTO teachers (username, password_hash, full_name) VALUES (?, ?, ?)`, ['teacher4', teacherPassHash, 'أ. عمر الشريف']);
    const [t5Res] = await db.query(`INSERT INTO teachers (username, password_hash, full_name) VALUES (?, ?, ?)`, ['teacher5', teacherPassHash, 'أ. مريم الفيتوري']);

    const t1Id = t1Res.insertId;
    const t2Id = t2Res.insertId;
    const t3Id = t3Res.insertId;
    const t4Id = t4Res.insertId;
    const t5Id = t5Res.insertId;
    console.log('[Seed] تم إنشاء 5 حسابات للمعلمين (teacher1 إلى teacher5).');

    // 7. تكليفات المعلمين (Teacher Assignments)
    await db.query(`DELETE FROM teacher_assignments`);
    await db.query(`INSERT INTO teacher_assignments (teacher_id, subject_id, section_id) VALUES (?, ?, ?)`, [t1Id, subIslamId, sec5aId]);
    await db.query(`INSERT INTO teacher_assignments (teacher_id, subject_id, section_id) VALUES (?, ?, ?)`, [t2Id, subMathId, sec5aId]);
    await db.query(`INSERT INTO teacher_assignments (teacher_id, subject_id, section_id) VALUES (?, ?, ?)`, [t2Id, subMathId, sec5bId]);
    await db.query(`INSERT INTO teacher_assignments (teacher_id, subject_id, section_id) VALUES (?, ?, ?)`, [t3Id, subSciId, sec5aId]);
    await db.query(`INSERT INTO teacher_assignments (teacher_id, subject_id, section_id) VALUES (?, ?, ?)`, [t3Id, subSci8Res.insertId, sec8aId]);
    await db.query(`INSERT INTO teacher_assignments (teacher_id, subject_id, section_id) VALUES (?, ?, ?)`, [t4Id, subArabId, sec5aId]);
    await db.query(`INSERT INTO teacher_assignments (teacher_id, subject_id, section_id) VALUES (?, ?, ?)`, [t5Id, subEngId, sec5aId]);
    console.log('[Seed] تم تجهيز فصول ومواد الصف الخامس والثامن وتكليف المعلمين.');

    // 8. سجلات الطلاب
    await db.query(`DELETE FROM students`);
    await db.query(
      `INSERT INTO students (roll_number, student_code, full_name, grade_id, section_id) VALUES (?, ?, ?, ?, ?)`,
      ['1001', 'ST1001', 'أحمد خالد المصراتي', gradeMap[5], sec5aId]
    );
    await db.query(
      `INSERT INTO students (roll_number, student_code, full_name, grade_id, section_id) VALUES (?, ?, ?, ?, ?)`,
      ['1002', 'ST1002', 'سارة طارق محمد', gradeMap[5], sec5aId]
    );
    await db.query(
      `INSERT INTO students (roll_number, student_code, full_name, grade_id, section_id) VALUES (?, ?, ?, ?, ?)`,
      ['1003', 'ST1003', 'محمد عمر الفيتوري', gradeMap[5], sec5bId]
    );
    console.log('[Seed] تم تسجيل قيد الطالب التجريبي: أحمد خالد المصراتي (1001 / ST1001).');

    // 9. الواجبات والامتحانات والحلول النموذجية
    await db.query(`DELETE FROM assessment_tasks`);
    await db.query(
      `INSERT INTO assessment_tasks (title, description, task_type, subject_id, section_id, teacher_id, due_date, has_solution, solution_text)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        'واجب مادة الرياضيات - الفصل الأول',
        'الرجاء حل تمارين كراسة الواجب صفحة 24 وتأكيد إرسال النواتج بالدفتر المدرسي.',
        'HOMEWORK',
        subMathId,
        sec5aId,
        t2Id,
        '2026-08-20',
        1,
        'الحل النموذجي المعتمد لمادة الرياضيات:\n1) الناتج الأول: 45.\n2) الناتج الثاني: س = 12.'
      ]
    );
    await db.query(
      `INSERT INTO assessment_tasks (title, description, task_type, subject_id, section_id, teacher_id, due_date, has_solution, solution_text)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        'واجب العلوم العامة - حالات المادة',
        'حل أسئلة التقويم الذاتي للوحدة الثانية.',
        'HOMEWORK',
        subSciId,
        sec5aId,
        t3Id,
        '2026-08-22',
        0,
        null
      ]
    );
    await db.query(
      `INSERT INTO assessment_tasks (title, description, task_type, subject_id, section_id, teacher_id, due_date, has_solution, solution_text)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        'امتحان مادة الرياضيات الشهري',
        'اختبار تحصيلي في الجبر والمعادلات الخطية.',
        'EXAM',
        subMathId,
        sec5aId,
        t2Id,
        '2026-08-27',
        1,
        'النموذج الاسترشادي لاختبار الرياضيات:\nالإجابات النموذجية وفق معايير التصحيح المعتمدة.'
      ]
    );
    console.log('[Seed] تم إنشاء الواجبات والامتحانات والحلول النموذجية المعتمدة.');

    // 10. جدول الحصص الأسبوعي (30 حصة لشعبة 5أ)
    await db.query(`DELETE FROM schedule_slots`);
    const schedulePattern = [
      // يوم 1: الأحد
      [1, 1, subIslamId, t1Id],
      [1, 2, subMathId, t2Id],
      [1, 3, subSciId, t3Id],
      [1, 4, subArabId, t4Id],
      [1, 5, subEngId, t5Id],
      [1, 6, subMathId, t2Id],
      // يوم 2: الإثنين
      [2, 1, subArabId, t4Id],
      [2, 2, subIslamId, t1Id],
      [2, 3, subMathId, t2Id],
      [2, 4, subSciId, t3Id],
      [2, 5, subEngId, t5Id],
      [2, 6, subArabId, t4Id],
      // يوم 3: الثلاثاء
      [3, 1, subMathId, t2Id],
      [3, 2, subSciId, t3Id],
      [3, 3, subArabId, t4Id],
      [3, 4, subIslamId, t1Id],
      [3, 5, subEngId, t5Id],
      [3, 6, subSciId, t3Id],
      // يوم 4: الأربعاء
      [4, 1, subEngId, t5Id],
      [4, 2, subArabId, t4Id],
      [4, 3, subMathId, t2Id],
      [4, 4, subIslamId, t1Id],
      [4, 5, subSciId, t3Id],
      [4, 6, subArabId, t4Id],
      // يوم 5: الخميس
      [5, 1, subSciId, t3Id],
      [5, 2, subMathId, t2Id],
      [5, 3, subEngId, t5Id],
      [5, 4, subArabId, t4Id],
      [5, 5, subIslamId, t1Id],
      [5, 6, subMathId, t2Id]
    ];

    for (const [day, slot, subId, teachId] of schedulePattern) {
      await db.query(
        `INSERT INTO schedule_slots (section_id, day_of_week, slot_number, subject_id, teacher_id) VALUES (?, ?, ?, ?, ?)`,
        [sec5aId, day, slot, subId, teachId]
      );
    }
    console.log('[Seed] تم بناء جدول الحصص الأسبوعي الكامل (30 حصة).');

    console.log('🎉 اكتملت عملية تعبئة البيانات التجريبية بنجاح!');
    process.exit(0);
  } catch (err) {
    console.error('❌ خطأ أثناء تعبئة البيانات:', err);
    process.exit(1);
  }
}

seed();
