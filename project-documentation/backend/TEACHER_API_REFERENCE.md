# مرجع واجهات برمجة المعلم الشاملة (Teacher API Specification & Reference)

> **المسار الأساسي (Base Route):** `/api/teacher`  
> **المسؤول البرمجي:** `backend/controllers/teacherController.js` & `backend/routes/teacherRoutes.js`  
> **قاعدة الحماية والأمان:** كافة المسارات محمية بوسيط التحقق `authenticateToken` وفحص صلاحية المعلم `requireRole('TEACHER')`.  
> **مبدأ ملكية المهام والتكليف:** المعلم لا يرى إلا التكليفات المسندة إليه، ولا يمكنه إنشاء مهام إلا للشعب والمواد المصرح له بتدريسها، ولا يمكنه تعديل أو حذف مهام معلمين آخرين.

---

## 1. استرجاع تكليفات المعلم الأكاديمية (Get Teacher Assignments)

* **المسار:** `GET /api/teacher/assignments`
* **الهدف:** جلب قائمة الشعب والصفوف والمواد التي يدرسها المعلم حالياً، لتغذية القوائم المنسدلة وشريط الفلاتر وبطاقة الهيرو.
* **الترويسات (Headers):** `Authorization: Bearer <TEACHER_TOKEN>`

### آلية المعالجة:
ينفذ الخادم استعلاماً على جدول `teacher_assignments` مصفى بـ `WHERE ta.teacher_id = req.user.id` مع ربط جداول `subjects`, `sections`, و `grades`.

#### الاستجابة الناجحة (200 OK):
```json
{
  "success": true,
  "data": [
    {
      "assignment_id": 1,
      "subject_id": 2,
      "subject_name": "الرياضيات",
      "section_id": 1,
      "section_name": "5أ",
      "grade_id": 5,
      "grade_name": "الصف الخامس"
    },
    {
      "assignment_id": 2,
      "subject_id": 2,
      "subject_name": "الرياضيات",
      "section_id": 2,
      "section_name": "5ب",
      "grade_id": 5,
      "grade_name": "الصف الخامس"
    },
    {
      "assignment_id": 5,
      "subject_id": 3,
      "subject_name": "العلوم العامة",
      "section_id": 3,
      "section_name": "8أ",
      "grade_id": 8,
      "grade_name": "الصف الثامن"
    }
  ]
}
```

---

## 2. استرجاع مهام وواجبات المعلم (Get Teacher Tasks)

* **المسار:** `GET /api/teacher/tasks`
* **الهدف:** جلب كافة الواجبات والامتحانات التي أنشأها المعلم الحالي (`WHERE t.teacher_id = req.user.id`).
* **الترويسات (Headers):** `Authorization: Bearer <TEACHER_TOKEN>`

### معلمات التصفية الاختيارية (Query Parameters):
| المعلمة | النوع | الوصف | مثال |
| :--- | :---: | :--- | :--- |
| `section_id` | Integer | تصفية المهام التابعة لشعبة محددة | `?section_id=1` |
| `subject_id` | Integer | تصفية المهام التابعة لمادة محددة | `?subject_id=2` |

#### الاستجابة الناجحة (200 OK):
```json
{
  "success": true,
  "count": 2,
  "data": [
    {
      "id": 15,
      "title": "واجب الكسور والعمليات الحسابية",
      "description": "حل التمارين من رقم 1 إلى 5 بالكتاب المدرسي وتدوين خطوات الحل.",
      "task_type": "HOMEWORK",
      "attachment_path": "/uploads/attachment-1771391111.pdf",
      "due_date": "2026-08-25",
      "created_at": "2026-08-18 12:00:00",
      "has_solution": 1,
      "solution_text": "الخطوات النموذجية:\n1) توحيد المقامات الحسابية.\n2) جمع البسوط وتدوين الناتج النهائي.",
      "solution_attachment_path": "/uploads/solution_math_5a.pdf",
      "subject_id": 2,
      "subject_name": "الرياضيات",
      "section_id": 1,
      "section_name": "5أ",
      "grade_name": "الصف الخامس"
    },
    {
      "id": 16,
      "title": "امتحان الرياضيات الشهري الأول",
      "description": "اختبار تحصيلي في الجبر والهندسة.",
      "task_type": "EXAM",
      "attachment_path": "/uploads/exam_paper_5a.pdf",
      "due_date": "2026-08-28",
      "created_at": "2026-08-18 12:30:00",
      "has_solution": 0,
      "solution_text": null,
      "solution_attachment_path": null,
      "subject_id": 2,
      "subject_name": "الرياضيات",
      "section_id": 1,
      "section_name": "5أ",
      "grade_name": "الصف الخامس"
    }
  ]
}
```

---

## 3. إنشاء واجب أو امتحان جديد (Create Task)

* **المسار:** `POST /api/teacher/tasks`
* **الهدف:** نشر واجب أو امتحان لشعبة ومادة مسندة للمعلم مع إمكانية رفع الملفات والحل النموذجي.
* **نوع المحتوى (Content-Type):** `multipart/form-data`
* **الترويسات (Headers):** `Authorization: Bearer <TEACHER_TOKEN>`

### حقول الطلب (Form-Data Fields):
| الحقل | النوع | إلزامي؟ | الوصف والتحقق |
| :--- | :---: | :---: | :--- |
| `title` | Text | نعم | عنوان المهمة (مثال: واجب الدرس الثالث) |
| `description` | Text | لا | شرح وتفاصيل وتوجيهات المهمة |
| `task_type` | Text | نعم | نوع المهمة: `'HOMEWORK'` أو `'EXAM'` |
| `subject_id` | Number | نعم | معرف المادة (يجب أن يكون مسنداً للمعلم) |
| `section_id` | Number | نعم | معرف الشعبة المستهدفة |
| `due_date` | Date | لا | تاريخ الاستحقاق بصيغة `YYYY-MM-DD` |
| `has_solution` | Text/Bool | لا | تفعيل الحل النموذجي (`1` أو `'true'`) |
| `solution_text` | Text | لا | النص التوضيحي للحل النموذجي |
| `attachment` | File | لا | ملف PDF أو صورة للواجب/الامتحان (حد أقصى 10MB) |
| `solution_attachment` | File | لا | ملف PDF أو صورة للحل النموذجي (حد أقصى 10MB) |

### آلية التحقق الأمني في الخادم:
يقوم الخادم بفحص جدول `teacher_assignments` للتأكد من أن المعلم مكلف بتدريس هذه الشعبة والمادة:
```sql
SELECT id FROM teacher_assignments 
WHERE teacher_id = req.user.id AND subject_id = ? AND section_id = ?;
```
* إذا لم يوجد سجل ➔ يتم رفض الطلب بكود `403 Forbidden` برسالة: *"عذراً، أنت غير مكلف بتدريس هذه المادة لهذه الشعبة."*

#### الاستجابة الناجحة (201 Created):
```json
{
  "success": true,
  "message": "تم إنشاء المهمة بنجاح.",
  "taskId": 18
}
```

#### استجابات الخطأ المحتملة:
* `400 Bad Request`: نقص أحد الحقول الإلزامية (`"يرجى ملء جميع الحقول الإلزامية (العنوان، النوع، المادة، الشعبة)."`).
* `403 Forbidden`: محاولة نشر لشعبة غير مكلف بها المعلم.

---

## 4. تعديل مهمة منشأة (Update Task)

* **المسار:** `PUT /api/teacher/tasks/:id`
* **الهدف:** تعديل تفاصيل أو تاريخ أو مرفقات مهمة يملكها المعلم الحالي.
* **نوع المحتوى (Content-Type):** `multipart/form-data`
* **حقول الطلب:** نفس حقول الـ POST مع إرسال القيم المحدثة فقط.

### آلية التحقق من الملكية:
```sql
SELECT * FROM assessment_tasks WHERE id = ? AND teacher_id = req.user.id;
```

#### الاستجابة الناجحة (200 OK):
```json
{
  "success": true,
  "message": "تم تعديل المهمة بنجاح."
}
```

#### استجابات الخطأ المحتملة:
* `404 Not Found`: المهمة غير موجودة أو المعلم لا يملك صلاحية تعديلها (`"المهمة غير موجودة أو ليس لديك صلاحية تعديلها."`).

---

## 5. حذف مهمة (Delete Task)

* **المسار:** `DELETE /api/teacher/tasks/:id`
* **الهدف:** حذف الواجب أو الامتحان نهائياً من المنظومة.
* **الترويسات (Headers):** `Authorization: Bearer <TEACHER_TOKEN>`

### آلية التحقق والحذف:
```sql
DELETE FROM assessment_tasks WHERE id = ? AND teacher_id = req.user.id;
```

#### الاستجابة الناجحة (200 OK):
```json
{
  "success": true,
  "message": "تم حذف المهمة بنجاح."
}
```

#### استجابات الخطأ المحتملة:
* `404 Not Found`: المهمة غير موجودة أو المعلم لا يملك صلاحية حذفها.
