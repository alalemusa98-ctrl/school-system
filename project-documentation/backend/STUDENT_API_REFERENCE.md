# مرجع واجهات برمجة الطالب الشاملة (Student API Specification & Reference)

> **المسار الأساسي (Base Route):** `/api/student`  
> **المسؤول البرمجي:** `backend/controllers/studentController.js` & `backend/routes/studentRoutes.js`  
> **قاعدة الحماية والأمان:** كافة المسارات محمية بوسيط التحقق `authenticateToken` وفحص صلاحية الطالب الصارمة `requireRole('STUDENT')`.  
> **مبدأ العزل التلقائي:** يتم استخراج `sectionId` و `gradeId` مباشرة من توكن JWT المشفر ولا يتم تمريرهما من المتصفح لضمان عدم تسريب أي بيانات من فصول أخرى.

---

## 1. استرجاع الملف الشخصي للطالب (Get Student Profile)

* **المسار:** `GET /api/student/profile`
* **الهدف:** جلب البيانات الشخصية والأكاديمية للطالب وصفه الدراسي وشعبته لتغذية الهيدر وبطاقة الهيرو.
* **الترويسات (Headers):** `Authorization: Bearer <STUDENT_TOKEN>`

### آلية المعالجة في قاعدة البيانات:
يقوم الخادم بالاستعلام عن سجل الطالب بالمعرف المستخرج من التوكن (`WHERE s.id = req.user.id`) ودمج اسم الصف والمستوى والشعبة عبر `JOIN`.

#### الاستجابة الناجحة (200 OK):
```json
{
  "success": true,
  "data": {
    "id": 1,
    "roll_number": "1001",
    "student_code": "ST1001",
    "full_name": "أحمد خالد المصراتي",
    "grade_id": 5,
    "grade_name": "الصف الخامس",
    "level": 5,
    "section_id": 1,
    "section_name": "5أ"
  }
}
```

#### استجابات الخطأ المحتملة:
* `401 Unauthorized`: غياب توكن الجلسة.
* `403 Forbidden`: الرمز منتهي الصلاحية أو لا ينتمي لطالب.
* `404 Not Found`: لم يتم العثور على سجل الطالب (`"لم يتم العثور على بيانات الطالب."`).

---

## 2. استرجاع الواجبات والامتحانات والحلول النموذجية (Get Student Tasks)

* **المسار:** `GET /api/student/tasks`
* **الهدف:** جلب الواجبات والاختبارات المقررة لشعبة الطالب فقط مرتبة من الأحدث إلى الأقدم، متضمنة المرفقات والحلول النموذجية المعتمدة.
* **الترويسات (Headers):** `Authorization: Bearer <STUDENT_TOKEN>`

### معلمات التصفية الاختيارية (Query Parameters):
| المعلمة (Query Param) | النوع | القيم المسموحة | الوصف |
| :--- | :---: | :--- | :--- |
| `task_type` | String | `HOMEWORK` أو `EXAM` | تصفية لعرض الواجبات فقط أو الامتحانات فقط |
| `subject_id` | Integer | رقم المادة (مثال: `2`) | تصفية لعرض مهام مادة معينة فقط |

---

### سيناريو 1: جلب الواجبات المدرسية (`?task_type=HOMEWORK`)

#### الطلب (Request):
`GET /api/student/tasks?task_type=HOMEWORK`

#### الاستجابة الناجحة (200 OK):
```json
{
  "success": true,
  "count": 2,
  "data": [
    {
      "id": 12,
      "title": "واجب مادة الرياضيات - الفصل الأول",
      "description": "الرجاء حل تمارين كراسة الواجب صفحة 24 وتأكيد إرسال النواتج بالدفتر المدرسي.",
      "task_type": "HOMEWORK",
      "attachment_path": "/uploads/attachment-1771390000.pdf",
      "due_date": "2026-08-20",
      "created_at": "2026-08-16 10:30:00",
      "has_solution": 1,
      "solution_text": "الحل النموذجي المعتمد لمادة الرياضيات:\n1) الناتج الأول: 45.\n2) الناتج الثاني: س = 12.",
      "solution_attachment_path": "/uploads/solution-1771390000.pdf",
      "subject_id": 2,
      "subject_name": "الرياضيات",
      "teacher_name": "أ. أحمد سالم"
    },
    {
      "id": 14,
      "title": "واجب العلوم العامة - حالات المادة",
      "description": "حل أسئلة التقويم الذاتي للوحدة الثانية.",
      "task_type": "HOMEWORK",
      "attachment_path": null,
      "due_date": "2026-08-22",
      "created_at": "2026-08-17 08:15:00",
      "has_solution": 0,
      "solution_text": null,
      "solution_attachment_path": null,
      "subject_id": 3,
      "subject_name": "العلوم العامة",
      "teacher_name": "أ. فاطمة العبيدي"
    }
  ]
}
```

---

### سيناريو 2: جلب الامتحانات والاختبارات (`?task_type=EXAM`)

#### الطلب (Request):
`GET /api/student/tasks?task_type=EXAM`

#### الاستجابة الناجحة (200 OK):
```json
{
  "success": true,
  "count": 1,
  "data": [
    {
      "id": 21,
      "title": "امتحان مادة الرياضيات الشهري",
      "description": "اختبار تحصيلي في الجبر والمعادلات الخطية.",
      "task_type": "EXAM",
      "attachment_path": "/uploads/exam_paper_101.pdf",
      "due_date": "2026-08-27",
      "created_at": "2026-08-18 09:00:00",
      "has_solution": 1,
      "solution_text": "النموذج الاسترشادي لاختبار الرياضيات:\nالإجابات النموذجية وفق معايير التصحيح المعتمدة.",
      "solution_attachment_path": "/uploads/model_answer_101.pdf",
      "subject_id": 2,
      "subject_name": "الرياضيات",
      "teacher_name": "أ. أحمد سالم"
    }
  ]
}
```

---

## 3. استرجاع الجدول الدراسي الأسبوعي (Get Student Schedule)

* **المسار:** `GET /api/student/schedule`
* **الهدف:** جلب حصص شعبة الطالب الأسبوعية (من الأحد إلى الخميس × من الحصة 1 إلى 6).
* **الترويسات (Headers):** `Authorization: Bearer <STUDENT_TOKEN>`

### آلية المعالجة:
ينفذ الخادم استعلاماً على جدول `schedule_slots` مع التصفية التلقائية بـ `WHERE slot.section_id = req.user.sectionId` مرتباً حسب اليوم ورقم الحصة (`ORDER BY day_of_week ASC, slot_number ASC`).

#### الاستجابة الناجحة (200 OK):
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "day_of_week": 1,
      "slot_number": 1,
      "subject_name": "التربية الإسلامية",
      "teacher_name": "أ. أسامة علي"
    },
    {
      "id": 2,
      "day_of_week": 1,
      "slot_number": 2,
      "subject_name": "الرياضيات",
      "teacher_name": "أ. أحمد سالم"
    },
    {
      "id": 3,
      "day_of_week": 1,
      "slot_number": 3,
      "subject_name": "العلوم العامة",
      "teacher_name": "أ. فاطمة العبيدي"
    },
    {
      "id": 7,
      "day_of_week": 2,
      "slot_number": 1,
      "subject_name": "اللغة العربية",
      "teacher_name": "أ. عمر الشريف"
    }
  ]
}
```

---

## 4. استرجاع المواد المقررة للطالب (Get Student Subjects)

* **المسار:** `GET /api/student/subjects`
* **الهدف:** استرجاع قائمة المواد المقررة لصف الطالب مع تحديد اسم المعلم المكلف بتدريس شعبة الطالب في كل مادة.
* **الترويسات (Headers):** `Authorization: Bearer <STUDENT_TOKEN>`

### آلية المعالجة الدقيقة:
يقوم الاستعلام بربط جدول `subjects` بجدول `teacher_assignments` لشعبة الطالب (`ta.section_id = req.user.sectionId`) لضمان ظهور اسم **معلم الفصل الفعلي** للطالب.

#### الاستجابة الناجحة (200 OK):
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "التربية الإسلامية",
      "teacher_name": "أ. أسامة علي"
    },
    {
      "id": 2,
      "name": "الرياضيات",
      "teacher_name": "أ. أحمد سالم"
    },
    {
      "id": 3,
      "name": "العلوم العامة",
      "teacher_name": "أ. فاطمة العبيدي"
    },
    {
      "id": 4,
      "name": "اللغة العربية",
      "teacher_name": "أ. عمر الشريف"
    },
    {
      "id": 5,
      "name": "اللغة الإنجليزية",
      "teacher_name": "أ. مريم الفيتوري"
    }
  ]
}
```
