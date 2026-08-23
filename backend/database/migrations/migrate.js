const db = require('../../config/db');

async function runMigrations() {
  console.log('[Migration] جاري بدء ترحيل وبناء جداول قاعدة البيانات...');

  const queries = [
    // 1. جدول مدراء ومسؤولي المنظومة
    `CREATE TABLE IF NOT EXISTS admins (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username VARCHAR(50) NOT NULL UNIQUE,
      password_hash VARCHAR(255) NOT NULL,
      full_name VARCHAR(150) NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );`,

    // 2. جدول السنوات الأكاديمية
    `CREATE TABLE IF NOT EXISTS academic_years (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name VARCHAR(50) NOT NULL UNIQUE,
      is_current TINYINT(1) DEFAULT 1,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );`,

    // 3. جدول الصفوف والمستويات الأساسية (الصفوف من 1 إلى 9)
    `CREATE TABLE IF NOT EXISTS grades (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      level INT NOT NULL UNIQUE,
      name VARCHAR(50) NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );`,

    // 4. جدول الشعب والقاعات الدراسية التابعة لكل صف
    `CREATE TABLE IF NOT EXISTS sections (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      grade_id INT NOT NULL,
      name VARCHAR(50) NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (grade_id) REFERENCES grades(id) ON DELETE CASCADE,
      UNIQUE (grade_id, name)
    );`,

    // 5. جدول المواد والمناهج المقررة لكل صف
    `CREATE TABLE IF NOT EXISTS subjects (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      grade_id INT NOT NULL,
      name VARCHAR(100) NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (grade_id) REFERENCES grades(id) ON DELETE CASCADE,
      UNIQUE (grade_id, name)
    );`,

    // 6. جدول سجلات الطلاب
    `CREATE TABLE IF NOT EXISTS students (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      roll_number VARCHAR(50) NOT NULL UNIQUE,
      student_code VARCHAR(50) NOT NULL,
      full_name VARCHAR(150) NOT NULL,
      grade_id INT NOT NULL,
      section_id INT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (grade_id) REFERENCES grades(id),
      FOREIGN KEY (section_id) REFERENCES sections(id)
    );`,

    // 7. جدول المعلمين والكادر التدريسي
    `CREATE TABLE IF NOT EXISTS teachers (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username VARCHAR(50) NOT NULL UNIQUE,
      password_hash VARCHAR(255) NOT NULL,
      full_name VARCHAR(150) NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );`,

    // 8. جدول تكليفات المعلمين بالمواد والشعب (نصاب التدريس)
    `CREATE TABLE IF NOT EXISTS teacher_assignments (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      teacher_id INT NOT NULL,
      subject_id INT NOT NULL,
      section_id INT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (teacher_id) REFERENCES teachers(id) ON DELETE CASCADE,
      FOREIGN KEY (subject_id) REFERENCES subjects(id) ON DELETE CASCADE,
      FOREIGN KEY (section_id) REFERENCES sections(id) ON DELETE CASCADE,
      UNIQUE (teacher_id, subject_id, section_id)
    );`,

    // 9. جدول الواجبات والامتحانات والحلول النموذجية
    `CREATE TABLE IF NOT EXISTS assessment_tasks (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title VARCHAR(255) NOT NULL,
      description TEXT,
      task_type VARCHAR(20) NOT NULL,
      subject_id INT NOT NULL,
      section_id INT NOT NULL,
      teacher_id INT NOT NULL,
      attachment_path VARCHAR(255) NULL,
      due_date DATE NULL,
      has_solution TINYINT(1) DEFAULT 0,
      solution_text TEXT NULL,
      solution_attachment_path VARCHAR(255) NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (subject_id) REFERENCES subjects(id) ON DELETE CASCADE,
      FOREIGN KEY (section_id) REFERENCES sections(id) ON DELETE CASCADE,
      FOREIGN KEY (teacher_id) REFERENCES teachers(id) ON DELETE CASCADE
    );`,

    // 10. جدول الحصص الأسبوعية الموزعة (5 أيام × 6 حصص)
    `CREATE TABLE IF NOT EXISTS schedule_slots (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      section_id INT NOT NULL,
      day_of_week INT NOT NULL,
      slot_number INT NOT NULL,
      subject_id INT NOT NULL,
      teacher_id INT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (section_id) REFERENCES sections(id) ON DELETE CASCADE,
      FOREIGN KEY (subject_id) REFERENCES subjects(id) ON DELETE CASCADE,
      FOREIGN KEY (teacher_id) REFERENCES teachers(id) ON DELETE CASCADE,
      UNIQUE (section_id, day_of_week, slot_number)
    );`
  ];

  const tableNames = [
    'admins', 'academic_years', 'grades', 'sections', 'subjects',
    'students', 'teachers', 'teacher_assignments', 'assessment_tasks', 'schedule_slots'
  ];

  try {
    for (let i = 0; i < queries.length; i++) {
      await db.query(queries[i]);
      console.log(`[Migration] تم إنشاء جدول ${tableNames[i]} بنجاح.`);
    }
    console.log('✅ اكتمل الترحيل بنجاح وتم تجهيز كافة الجداول الـ 10!');
    process.exit(0);
  } catch (err) {
    console.error('❌ خطأ أثناء ترحيل قاعدة البيانات:', err);
    process.exit(1);
  }
}

runMigrations();
