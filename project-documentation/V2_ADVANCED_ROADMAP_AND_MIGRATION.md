# الدليل الشامل لترقية المنظومة وخريطة طريق النسخة الثانية (Master V2 Upgrade & Seamless Migration Blueprint)

> **النوع:** المرجع الفني والهندسي الشامل لترقية المنظومة من النسخة الأولى (V1 MVP) إلى النسخة المتقدمة (V2) دون فقدان للبيانات أو انقطاع في الخدمة.

---

## 1. أهداف ورؤية النسخة الثانية (V2 Strategic Vision & Goals)

تهدف النسخة الثانية (V2) إلى نقل المنظومة من مرحلة **"التشغيل الأولي السريع" (MVP)** إلى مرحلة **"الأتمتة الذكية والتحكم الزمني المتقدم"**، عبر:
1. مواءمة المنظومة مع التقويم الدراسي الليبي (الفترات الدراسية والترم).
2. تقليص وقت المعلم في نشر الواجبات المتطابقة لعدة شعب من دقائق إلى ثوانٍ معدودة.
3. فرض قفل أمان زمني على الحلول النموذجية لمنع وصول الطلاب إليها قبل انتهاء وقت التسليم.
4. حفظ السجل التراكمي للطلاب عند نقلهم بين الشعب والفصول دون ضياع تاريخهم الأكاديمي.
5. تفعيل نظام التنبيهات الفورية (Push Notifications).

---

## 2. المواصفات الفنية لميزات النسخة الثانية الـ 5 (V2 Detailed Feature Specs)

```
                            ميزات النسخة المتقدمة V2
                                       │
    ┌──────────────────┬───────────────┴───────────────┬──────────────────┐
    ▼                  ▼                               ▼                  ▼
┌──────────────┐ ┌──────────────┐             ┌─────────────────┐ ┌──────────────┐
│ 1. الفترات   │ │ 2. النشر     │             │ 3. الجدولة      │ │ 4. السجل     │
│ والأرشفة     │ │ متعدد الشعب  │             │ الزمنية للحلول  │ │ التراكمي     │
│ الذكية       │ │ Broadcasting │             │ Time-Lock Sol.  │ │ للنقل        │
└──────────────┘ └──────────────┘             └─────────────────┘ └──────────────┘
```

---

### 2.1 الفترات الدراسية والأرشفة التلقائية (Active Periods & Auto-Archiving)
* **المفهوم:** تقسيم العام الدراسي إلى فترات زمنية محددة (`الفترة الأولى` / `الفترة الثانية` / `الفترة الثالثة` / `الامتحانات النهائية`).
* **آلية العمل المعمارية:**
  1. تقوم الإدارة بتعيين فترة دراسية واحدة كـ **"الفترة الحالية النشطة" (Active Period)** عبر `is_active = 1`.
  2. كل واجب أو امتحان جديد يُربط تلقائياً بـ `period_id` الخاصة بالفترة النشطة.
  3. **في واجهة الطالب:** تعرض الشاشات الرئيسية حصراً واجبات وامتحانات الفترة النشطة فقط لتخفيف العبء البصري والذهني على الطفل.
  4. **الأرشفة الذكية التلقائية:** عند انتقال الإدارة للفترة التالية، تنتقل مهام الفترة السابقة تلقائياً إلى صفحة **"الأرشيف (المهام السابقة)"** في واجهة الطالب والمعلم دون الحاجة لأي سكريبتات تنظيف يدوية.

---

### 2.2 النشر المتعدد للشعب بنقرة واحدة (Multi-Section Task Broadcasting)
* **المفهوم:** إتاحة خيار نشر نفس الواجب أو الامتحان لكافة الشعب التي يدرسها المعلم لنفس المادة (مثال: أستاذ الرياضيات يدرس 5أ و 5ب و 5ج).
* **آلية العمل المعمارية:**
  1. في نافذة إنشاء الواجب، تظهر للمعلم مربعات اختيار (Checkboxes) لجميع الشعب المسندة له في المادة المختارة.
  2. يتم حفظ الواجب مرة واحدة في `assessment_tasks`، ويتم إنشاء سجلات الربط في جدول `task_sections`.
  3. عند تعديل المعلم للواجب أو الحل النموذجي، ينعكس التعديل فورياً لجميع الشعب المستهدفة.

---

### 2.3 القفل والجدولة الزمنية للحلول النموذجية (Time-Locked Model Answers)
* **المفهوم:** منع وصول الطلاب للحلول النموذجية قبل انتهاء المهلة المحددة لمنع الغش والاعتماد على النفس.
* **أنماط إتاحة الحل:**
  1. **فوري (`IMMEDIATE`):** يظهر الحل للطالب لحظياً بمجرد نشر الواجب (نفس سلوك V1).
  2. **مجدول زمنياً (`SCHEDULED`):** يحدد المعلم تاريخاً ووقتاً مستقبلياً (`publish_at`) لظهور الحل (مثال: الخميس الساعة 20:00).
* **قاعدة الأمان الصارمة في الخادم (Backend Security Guard):**
  * في مسار `GET /api/student/tasks`: إذا كان `visibility_type = 'SCHEDULED'` و `publish_at > NOW()`، يقوم الخادم بحجب حقول `solution_text` و `solution_attachment_path` تماماً من استجابة الـ JSON، ولا يظهر أي زر للحل في واجهة الطالب حتى يحين الموعد تماماً.

---

### 2.4 سجل تنقلات الطلاب التراكمي (Smart Transfer & Student History)
* **المفهوم:** حفظ السجل الأكاديمي للطالب عند نقله من شعبة إلى أخرى منتصف العام الدراسي.
* **آلية العمل المعمارية:**
  1. عند نقل الطالب من شعبة (5أ) إلى (5ب)، يتم إغلاق فترته السابقة بتسجيل `removed_at = NOW()` في جدول `student_section_history`، وتسجيل قيد جديد بشعبة (5ب).
  2. تصبح واجهة الطالب الحالية مرتبطة بمهام وجدول 5ب.
  3. يتاح للطالب تبويب خاص في الأرشيف لاستعراض المهام والواجبات التي كُلف بها أثناء تواجده في شعبة 5أ السابقة مع حلولها المعتمدة.

---

### 2.5 نظام الإشعارات والتنبيهات الفورية (Push Notifications Engine)
* **المفهوم:** إشعار الطالب وولي الأمر فور نشر واجب جديد، أو اقتراب موعد تسليم، أو فتح موعد الحل النموذجي عبر تقنية WebPush / Service Workers.

---

## 3. تعديلات قاعدة البيانات التراكمية (V2 Schema Migration Delta DDL)

لتطبيق الترقية على قاعدة بيانات V1 دون مساس بالبيانات الحالية، يتم تشغيل استعلامات التهجير التالية:

```sql
-- =========================================================================
-- 1. إنشاء جدول الفترات الدراسية (Academic Periods)
-- =========================================================================
CREATE TABLE IF NOT EXISTS academic_periods (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  academic_year_id INT NOT NULL,
  name VARCHAR(50) NOT NULL, -- مثال: "الفترة الأولى (الترم الأول)"
  is_active TINYINT(1) DEFAULT 0,
  start_date DATE NULL,
  end_date DATE NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (academic_year_id) REFERENCES academic_years(id) ON DELETE CASCADE
);

-- ربط جدول المهام بالفترة الدراسية
ALTER TABLE assessment_tasks ADD COLUMN period_id INT NULL REFERENCES academic_periods(id);

-- =========================================================================
-- 2. جدول الربط المتعدد للمهام والشعب (Multi-Section Broadcasting)
-- =========================================================================
CREATE TABLE IF NOT EXISTS task_sections (
  task_id INT NOT NULL,
  section_id INT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (task_id, section_id),
  FOREIGN KEY (task_id) REFERENCES assessment_tasks(id) ON DELETE CASCADE,
  FOREIGN KEY (section_id) REFERENCES sections(id) ON DELETE CASCADE
);

-- ترحيل بيانات V1 القائمة إلى جدول الربط الجديد تلقائياً
INSERT OR IGNORE INTO task_sections (task_id, section_id)
SELECT id, section_id FROM assessment_tasks WHERE section_id IS NOT NULL;

-- =========================================================================
-- 3. جدول الحلول النموذجية المتقدم المجدول (Time-Locked Model Answers)
-- =========================================================================
CREATE TABLE IF NOT EXISTS model_answers (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  task_id INT NOT NULL UNIQUE,
  answer_text TEXT NULL,
  attachment_path VARCHAR(255) NULL,
  visibility_type VARCHAR(20) DEFAULT 'IMMEDIATE', -- 'IMMEDIATE' أو 'SCHEDULED'
  publish_at DATETIME NULL, -- تاريخ ووقت الجدولة الدقيق
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (task_id) REFERENCES assessment_tasks(id) ON DELETE CASCADE
);

-- =========================================================================
-- 4. جدول سجل تنقلات الطلاب التراكمي (Student Section History)
-- =========================================================================
CREATE TABLE IF NOT EXISTS student_section_history (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  student_id INT NOT NULL,
  section_id INT NOT NULL,
  assigned_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  removed_at DATETIME NULL,
  FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE,
  FOREIGN KEY (section_id) REFERENCES sections(id) ON DELETE CASCADE
);

-- =========================================================================
-- 5. جدول الإشعارات والتنبيهات (Notifications)
-- =========================================================================
CREATE TABLE IF NOT EXISTS notifications (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INT NOT NULL,
  user_role VARCHAR(20) NOT NULL, -- 'STUDENT', 'TEACHER', 'ADMIN'
  title VARCHAR(150) NOT NULL,
  body TEXT NOT NULL,
  is_read TINYINT(1) DEFAULT 0,
  action_url VARCHAR(255) NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

---

## 4. الفروقات في مسارات الـ API (V2 API Delta Matrix)

| المسار الجديد / المعدل | الطريقة | الدور | الوظيفة المحدثة |
| :--- | :---: | :---: | :--- |
| `/api/admin/periods` | `GET/POST` | `ADMIN` | استعراض وإنشاء الفترات الدراسية وتعيين الفترة النشطة |
| `/api/admin/periods/:id/activate` | `PUT` | `ADMIN` | تفعيل فترة ونقل مهام الفترة السابقة للأرشيف فورياً |
| `/api/teacher/tasks` (Broadcast) | `POST` | `TEACHER` | إرسال مصفوفة `section_ids: [1, 2, 3]` لنشر المهمة لعدة شعب |
| `/api/teacher/tasks/:id/solution` | `POST` | `TEACHER` | إرفاق حل مجدول مع `visibility_type: 'SCHEDULED'` و `publish_at` |
| `/api/student/tasks/archive` | `GET` | `STUDENT` | استرجاع واجبات وامتحانات الفترات السابقة والشعب السابقة |

---

## 5. خطة التنفيذ والترقية دون انقطاع (Zero-Downtime Migration Plan)

```
المرحلة 1: النسخ الاحتياطي (Backup)
  └─ أخذ نسخة احتياطية كاملة من ملف school.sqlite أو قاعدة MySQL.

المرحلة 2: ترحيل المخطط (Schema Migration)
  └─ تشغيل سكريبت v2_migration.js لتنفيذ استعلامات DDL السابقة دون حذف أي جدول قائم.

المرحلة 3: تعيين الفترة الافتراضية
  └─ إنشاء "الفترة الأولى 2025/2026" وتعيينها كـ is_active = 1 وربط مهام V1 بها.

المرحلة 4: تحديث الـ Backend والـ Frontend
  └─ رفع كود المعالجات والواجهات المحدثة التي تدعم البث المتعدد والأرشفة.

المرحلة 5: التحقق والاختبار (Verification)
  └─ التأكد من ظهور مهام V1 القديمة في حسابات الطلاب، وتجربة نشر واجب متعدد بجدولة زمنية بنجاح.
```
