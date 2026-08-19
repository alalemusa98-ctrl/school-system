# مرجع واجهات برمجة الإدارة الشاملة (Admin API Specification & Reference)

> **المسار الأساسي (Base Route):** `/api/admin`  
> **المسؤول البرمجي:** `backend/controllers/adminController.js` & `backend/routes/adminRoutes.js`  
> **قاعدة الحماية والأمان:** كافة المسارات تتطلب إرسال الترويسة `Authorization: Bearer <ADMIN_TOKEN>` مع فحص الصلاحية الإدارية الصارمة `requireRole('ADMIN')`.

---

## 1. إحصائيات لوحة التحكم المركزية (Dashboard Stats)

### `GET /api/admin/stats`
* **الهدف:** جلب الإحصائيات والأعداد التراكمية للمدرسة لتغذية بطاقات الـ 3D KPI في اللوحة الرئيسية.
* **الترويسات (Headers):** `Authorization: Bearer <ADMIN_TOKEN>`
* **معلمات الاستعلام (Query):** لا يوجد.

#### الاستجابة الناجحة (200 OK):
```json
{
  "success": true,
  "stats": {
    "totalStudents": 350,
    "totalTeachers": 24,
    "totalSections": 12,
    "totalTasks": 48
  }
}
```

#### استجابات الخطأ المحتملة:
* `401 Unauthorized`: لم يتم إرسال التوكن الإداري.
* `403 Forbidden`: المستخدم ليس بصفة `ADMIN`.
* `500 Internal Server Error`: خطأ في استعلام قاعدة البيانات.

---

## 2. إدارة الهيكل والفصول (Grades & Sections)

### أ. استرجاع الهيكل الكامل (Get Grades Hierarchy)
* **المسار:** `GET /api/admin/grades`
* **الهدف:** جلب قائمة الصفوف الأساسية الـ 9 مدمجاً بها مصفوفات الشعب التابعة والمواد المقررة لكل صف.

#### الاستجابة الناجحة (200 OK):
```json
{
  "success": true,
  "data": [
    {
      "id": 5,
      "level": 5,
      "name": "الصف الخامس",
      "created_at": "2026-08-10 09:00:00",
      "sections": [
        { "id": 1, "grade_id": 5, "name": "5أ", "created_at": "2026-08-10 09:15:00" },
        { "id": 2, "grade_id": 5, "name": "5ب", "created_at": "2026-08-10 09:15:00" }
      ],
      "subjects": [
        { "id": 1, "grade_id": 5, "name": "التربية الإسلامية" },
        { "id": 2, "grade_id": 5, "name": "الرياضيات" },
        { "id": 3, "grade_id": 5, "name": "العلوم العامة" }
      ]
    }
  ]
}
```

---

### ب. إضافة صف دراسي جديد (Create Grade)
* **المسار:** `POST /api/admin/grades`
* **الهدف:** تسجيل مستوى دراسي جديد في قاعدة البيانات.
* **جسم الطلب (Request Body):**
```json
{
  "name": "الصف الأول",
  "level": 1
}
```

#### الاستجابة الناجحة (201 Created):
```json
{
  "success": true,
  "message": "تم إضافة الصف الدراسي بنجاح.",
  "gradeId": 1
}
```

#### حالات الخطأ:
* `400 Bad Request`: نقص `name` أو `level`، أو في حال كان الصف موجوداً مسبقاً (`"هذا الصف موجود بالفعل."`).

---

### ج. إضافة شعبة جديدة لصف (Create Section)
* **المسار:** `POST /api/admin/sections`
* **الهدف:** إنشاء شعبة/قاعة جديدة تابعة لصف دراسي محدد.
* **جسم الطلب (Request Body):**
```json
{
  "grade_id": 5,
  "name": "5ج"
}
```

#### الاستجابة الناجحة (201 Created):
```json
{
  "success": true,
  "message": "تم إضافة الشعبة بنجاح.",
  "sectionId": 3
}
```

#### حالات الخطأ:
* `400 Bad Request`: نقص البيانات أو تكرار اسم الشعبة لنفس الصف (`"هذه الشعبة موجودة بالفعل لهذا الصف."`).

---

### د. حذف شعبة (Delete Section)
* **المسار:** `DELETE /api/admin/sections/:id`
* **الهدف:** حذف شعبة دراسية وكافة ارتباطاتها وتكليفاتها وجدولها تتابعياً (`CASCADE`).

#### الاستجابة الناجحة (200 OK):
```json
{
  "success": true,
  "message": "تم حذف الشعبة بنجاح."
}
```

---

## 3. إدارة المواد الدراسية (Subjects Management)

### أ. استرجاع المواد المقررة (Get Subjects)
* **المسار:** `GET /api/admin/subjects`
* **معلمات التصفية (Query Params):** `?grade_id=5` (اختياري لجلب مواد صف محدد).

#### الاستجابة الناجحة (200 OK):
```json
{
  "success": true,
  "data": [
    {
      "id": 2,
      "grade_id": 5,
      "name": "الرياضيات",
      "grade_name": "الصف الخامس",
      "level": 5
    }
  ]
}
```

---

### ب. إضافة مادة مقررة لصف (Create Subject)
* **المسار:** `POST /api/admin/subjects`
* **جسم الطلب (Request Body):**
```json
{
  "grade_id": 5,
  "name": "اللغة الإنجليزية"
}
```

#### الاستجابة الناجحة (201 Created):
```json
{
  "success": true,
  "message": "تم إضافة المادة بنجاح.",
  "subjectId": 4
}
```

#### حالات الخطأ:
* `400 Bad Request`: نقص البيانات أو تكرار اسم المادة داخل نفس الصف.

---

### ج. حذف مادة دراسية (Delete Subject)
* **المسار:** `DELETE /api/admin/subjects/:id`
* **الاستجابة الناجحة (200 OK):**
```json
{
  "success": true,
  "message": "تم حذف المادة بنجاح."
}
```

---

## 4. إدارة وسجلات الطلاب (Students Management)

### أ. استرجاع قائمة الطلاب (Get Students List)
* **المسار:** `GET /api/admin/students`
* **معلمات التصفية (Query Params):**
  * `grade_id`: تصفية حسب الصف (مثال: `?grade_id=5`).
  * `section_id`: تصفية حسب الشعبة (مثال: `?section_id=1`).

#### الاستجابة الناجحة (200 OK):
```json
{
  "success": true,
  "count": 2,
  "data": [
    {
      "id": 1,
      "roll_number": "1001",
      "student_code": "ST1001",
      "full_name": "أحمد خالد المصراتي",
      "grade_id": 5,
      "grade_name": "الصف الخامس",
      "section_id": 1,
      "section_name": "5أ",
      "created_at": "2026-08-12 11:00:00"
    },
    {
      "id": 2,
      "roll_number": "1002",
      "student_code": "ST1002",
      "full_name": "سارة طارق محمد",
      "grade_id": 5,
      "grade_name": "الصف الخامس",
      "section_id": 1,
      "section_name": "5أ",
      "created_at": "2026-08-12 11:05:00"
    }
  ]
}
```

---

### ب. تسجيل قيد طالب جديد (Create Student)
* **المسار:** `POST /api/admin/students`
* **جسم الطلب (Request Body):**
```json
{
  "roll_number": "1003",
  "student_code": "ST1003",
  "full_name": "محمد عمر الفيتوري",
  "grade_id": 5,
  "section_id": 1
}
```

#### الاستجابة الناجحة (201 Created):
```json
{
  "success": true,
  "message": "تم تسجيل الطالب بنجاح.",
  "studentId": 3
}
```

#### حالات الخطأ:
* `400 Bad Request`: نقص أحد الحقول الإلزامية أو تكرار رقم الجلوس (`"رقم الجلوس هذا مستخدم بالفعل لطالب آخر."`).

---

### ج. تعديل بيانات أو نقل طالب (Update / Transfer Student)
* **المسار:** `PUT /api/admin/students/:id`
* **الهدف:** تعديل الاسم، الكود، أو نقل الطالب إلى شعبة/صف آخر.
* **جسم الطلب (Request Body):**
```json
{
  "roll_number": "1003",
  "student_code": "ST1003",
  "full_name": "محمد عمر الفيتوري",
  "grade_id": 5,
  "section_id": 2
}
```

#### الاستجابة الناجحة (200 OK):
```json
{
  "success": true,
  "message": "تم تحديث بيانات الطالب بنجاح."
}
```

---

### د. حذف سجل طالب (Delete Student)
* **المسار:** `DELETE /api/admin/students/:id`
* **الاستجابة الناجحة (200 OK):**
```json
{
  "success": true,
  "message": "تم حذف الطالب بنجاح."
}
```

---

## 5. إدارة المعلمين والتكليفات (Teachers & Assignments)

### أ. استرجاع قائمة المعلمين (Get Teachers List)
* **المسار:** `GET /api/admin/teachers`

#### الاستجابة الناجحة (200 OK):
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "username": "teacher1",
      "full_name": "أ. أسامة علي",
      "created_at": "2026-08-10 10:00:00"
    },
    {
      "id": 2,
      "username": "teacher2",
      "full_name": "أ. أحمد سالم",
      "created_at": "2026-08-10 10:05:00"
    }
  ]
}
```

---

### ب. إنشاء حساب معلم جديد (Create Teacher)
* **المسار:** `POST /api/admin/teachers`
* **آلية المعالجة:** يتم تشفير كلمة المرور فورياً عبر مكتبة `bcryptjs` (Salt = 10) قبل الحفظ.
* **جسم الطلب (Request Body):**
```json
{
  "username": "teacher6",
  "password": "teacher123",
  "full_name": "أ. خديجة المهدي"
}
```

#### الاستجابة الناجحة (201 Created):
```json
{
  "success": true,
  "message": "تم إضافة حساب المعلم بنجاح.",
  "teacherId": 6
}
```

#### حالات الخطأ:
* `400 Bad Request`: نقص البيانات أو تكرار اسم المستخدم (`"اسم المستخدم هذا مأخوذ بالفعل لمعلم آخر."`).

---

### ج. حذف حساب معلم (Delete Teacher)
* **المسار:** `DELETE /api/admin/teachers/:id`
* **الاستجابة الناجحة (200 OK):**
```json
{
  "success": true,
  "message": "تم حذف حساب المعلم بنجاح."
}
```

---

### د. استرجاع كافة التكليفات الأكاديمية (Get Teacher Assignments)
* **المسار:** `GET /api/admin/assignments`

#### الاستجابة الناجحة (200 OK):
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "teacher_id": 2,
      "teacher_name": "أ. أحمد سالم",
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

### هـ. تكليف معلم بمادة وشعبة (Create Teacher Assignment)
* **المسار:** `POST /api/admin/assignments`
* **جسم الطلب (Request Body):**
```json
{
  "teacher_id": 2,
  "subject_id": 2,
  "section_id": 1
}
```

#### الاستجابة الناجحة (201 Created):
```json
{
  "success": true,
  "message": "تم تكليف المعلم بنجاح.",
  "assignmentId": 5
}
```

#### حالات الخطأ:
* `400 Bad Request`: نقص البيانات أو تكرار التكليف (`"هذا المعلم مكلف بالفعل بهذه المادة لهذه الشعبة."`).

---

### و. إلغاء تكليف معلم (Delete Teacher Assignment)
* **المسار:** `DELETE /api/admin/assignments/:id`
* **الاستجابة الناجحة (200 OK):**
```json
{
  "success": true,
  "message": "تم إزالة التكليف بنجاح."
}
```

---

## 6. إدارة الجدول الدراسي الأسبوعي (Weekly Timetable Management)

### أ. استرجاع جدول حصص شعبة (Get Section Schedule)
* **المسار:** `GET /api/admin/schedule`
* **معلمة التصفية (Query Param):** `?section_id=1` (معرف الشعبة المستهدفة).

#### الاستجابة الناجحة (200 OK):
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "section_id": 1,
      "section_name": "5أ",
      "day_of_week": 1,
      "slot_number": 1,
      "subject_id": 1,
      "subject_name": "القرآن الكريم",
      "teacher_id": 1,
      "teacher_name": "أ. أسامة علي",
      "grade_name": "الصف الخامس"
    }
  ]
}
```

---

### ب. تخصيص أو تحديث حصة في الجدول (Upsert Schedule Slot)
* **المسار:** `POST /api/admin/schedule`
* **آلية المعالجة (Upsert):** إذا كانت الحصة فارغة يتم إدراجها، وإذا كانت محجوزة لمادة/معلم سابق يتم تحديثها بالبيانات الجديدة تلقائياً بدون تعارض.
* **جسم الطلب (Request Body):**
```json
{
  "section_id": 1,
  "day_of_week": 1,
  "slot_number": 2,
  "subject_id": 2,
  "teacher_id": 2
}
```

#### الاستجابة الناجحة (200 OK):
```json
{
  "success": true,
  "message": "تم تخصيص الحصة بالجدول بنجاح."
}
```

---

### ج. تفريغ حصة من الجدول (Delete Schedule Slot)
* **المسار:** `DELETE /api/admin/schedule/:id`
* **الاستجابة الناجحة (200 OK):**
```json
{
  "success": true,
  "message": "تم تفريغ الحصة من الجدول بنجاح."
}
```
