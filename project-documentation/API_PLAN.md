# المخطط العام الشامل لواجهات برمجة التطبيقات (Master API Plan & Schema Specification)

يوفر هذا الدليل المرجع المعماري الموحد والشامل لكافة واجهات الـ RESTful APIs التي يوفرها الخادم الخلفي للمنظومة (20 مساراً)، موضحاً معايير الطلب، الترويسات، الأجسام الصريحة (JSON Payloads)، الـ Query Parameters، ونماذج الاستجابة والأخطاء.

---

## 1. المعايير المعمارية العامة للـ APIs (Global API Standards)

* **الرابط الأساسي (Base URL):** `http://localhost:5000/api`
* **معيار المصادقة الموحد:** `Authorization: Bearer <JWT_TOKEN>` (لكافة المسارات المحمية).
* **نوع المحتوى الافتراضي:** `Content-Type: application/json` (باستثناء رفع المهام: `multipart/form-data`).
* **هيكل الاستجابة القياسي في حالة النجاح (Standard Success Response):**
```json
{
  "success": true,
  "message": "نص توضيحي اختياري",
  "count": 10,
  "data": { ... }
}
```
* **هيكل الاستجابة القياسي في حالة الخطأ (Standard Error Response):**
```json
{
  "success": false,
  "message": "رسالة الخطأ التوضيحية باللغة العربية"
}
```

---

## 2. مسارات المصادقة وإدارة الجلسات (Authentication Endpoints - `/api/auth`)

### 2.1 تسجيل دخول المشرف العام (Admin Login)
* **المسار:** `POST /api/auth/login/admin`
* **الصلاحية المطلوبة:** عامة (Public)
* **جسم الطلب (Request Body):**
```json
{
  "username": "admin",
  "password": "admin123"
}
```
* **الاستجابة الناجحة (200 OK):**
```json
{
  "success": true,
  "message": "تم تسجيل الدخول بنجاح",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "role": "ADMIN",
    "username": "admin",
    "fullName": "مدير المدرسة"
  }
}
```
* **الأخطاء:** `400 Bad Request` (نقص البيانات)، `401 Unauthorized` (بيانات غير صحيحة).

---

### 2.2 تسجيل دخول المعلم (Teacher Login)
* **المسار:** `POST /api/auth/login/teacher`
* **الصلاحية المطلوبة:** عامة (Public)
* **جسم الطلب (Request Body):**
```json
{
  "username": "teacher2",
  "password": "teacher123"
}
```
* **الاستجابة الناجحة (200 OK):**
```json
{
  "success": true,
  "message": "تم تسجيل دخول المعلم بنجاح",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 2,
    "role": "TEACHER",
    "username": "teacher2",
    "fullName": "أ. أحمد سالم"
  }
}
```
* **الأخطاء:** `400 Bad Request`، `401 Unauthorized`.

---

### 2.3 تسجيل دخول الطالب (Student Login)
* **المسار:** `POST /api/auth/login/student`
* **الصلاحية المطلوبة:** عامة (Public)
* **جسم الطلب (Request Body):**
```json
{
  "roll_number": "1001",
  "student_code": "ST1001"
}
```
* **الاستجابة الناجحة (200 OK):**
```json
{
  "success": true,
  "message": "تم تسجيل دخول الطالب بنجاح",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "role": "STUDENT",
    "rollNumber": "1001",
    "fullName": "أحمد خالد المصراتي",
    "gradeId": 5,
    "sectionId": 1,
    "gradeName": "الصف الخامس",
    "sectionName": "5أ"
  }
}
```
* **الأخطاء:** `400 Bad Request`، `401 Unauthorized`.

---

### 2.4 فحص والتحقق من الجلسة الحالية (Get Current User)
* **المسار:** `GET /api/auth/me`
* **الصلاحية المطلوبة:** `Bearer Token` (كافة الأدوار)
* **الاستجابة الناجحة (200 OK):**
```json
{
  "success": true,
  "user": {
    "id": 1,
    "role": "STUDENT",
    "rollNumber": "1001",
    "fullName": "أحمد خالد المصراتي",
    "gradeId": 5,
    "sectionId": 1
  }
}
```

---

## 3. مسارات الطالب المعزولة (Student Endpoints - `/api/student`)

> [!IMPORTANT]
> **مبدأ عزل المستأجر الصارم (Zero-Trust Tenant Isolation):**  
> لا يقبل الخادم أي `section_id` من المتصفح في طلبات الطالب، بل يستخرج معرف الشعبة والصف حصراً من توكن JWT المفكك على الخادم (`req.user.sectionId`).

---

### 3.1 استرجاع الملف الشخصي للطالب (Get Student Profile)
* **المسار:** `GET /api/student/profile`
* **الصلاحية:** `requireRole('STUDENT')`
* **الاستجابة الناجحة (200 OK):**
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

---

### 3.2 استرجاع الواجبات والامتحانات والحلول (Get Student Tasks)
* **المسار:** `GET /api/student/tasks`
* **الصلاحية:** `requireRole('STUDENT')`
* **معلمات التصفية الاختيارية (Query):**
  * `task_type`: `'HOMEWORK'` (واجبات فقط) أو `'EXAM'` (امتحانات فقط).
  * `subject_id`: تصفية حسب رقم المادة (مثال: `?subject_id=2`).
* **الاستجابة الناجحة (200 OK):**
```json
{
  "success": true,
  "count": 1,
  "data": [
    {
      "id": 12,
      "title": "واجب مادة الرياضيات - الفصل الأول",
      "description": "حل تمارين كراسة الواجب صفحة 24.",
      "task_type": "HOMEWORK",
      "attachment_path": "/uploads/hw_math_5a.pdf",
      "due_date": "2026-08-20",
      "created_at": "2026-08-16 10:30:00",
      "has_solution": 1,
      "solution_text": "خطوات الحل النموذجي المعتمد:\n1) الناتج الأول: 45.",
      "solution_attachment_path": "/uploads/sol_math_5a.pdf",
      "subject_id": 2,
      "subject_name": "الرياضيات",
      "teacher_name": "أ. أحمد سالم"
    }
  ]
}
```

---

### 3.3 استرجاع جدول الحصص الأسبوعي (Get Student Schedule)
* **المسار:** `GET /api/student/schedule`
* **الصلاحية:** `requireRole('STUDENT')`
* **الاستجابة الناجحة (200 OK):** مصفوفة الحصص (30 حصة) موزعة من الأحد إلى الخميس مع أرقام الحصص والمواد والمعلمين.

---

### 3.4 استرجاع المواد المقررة للطالب (Get Student Subjects)
* **المسار:** `GET /api/student/subjects`
* **الصلاحية:** `requireRole('STUDENT')`
* **الاستجابة الناجحة (200 OK):** قائمة بالمواد المقررة لصف الطالب مع اسم المعلم المكلف بتدريس شعبة الطالب تحديداً في كل مادة.

---

## 4. مسارات المعلم وإدارة المهام (Teacher Endpoints - `/api/teacher`)

### 4.1 استرجاع الفصول والمواد المسندة للمعلم (Get Teacher Assignments)
* **المسار:** `GET /api/teacher/assignments`
* **الصلاحية:** `requireRole('TEACHER')`
* **الاستجابة الناجحة (200 OK):** قائمة بالتكليفات الرسمية التي يدرسها المعلم (`subject_id`, `section_id`, `grade_name`, `section_name`).

---

### 4.2 استرجاع مهام وواجبات المعلم (Get Teacher Tasks)
* **المسار:** `GET /api/teacher/tasks`
* **الصلاحية:** `requireRole('TEACHER')`
* **معلمات التصفية الاختيارية:** `?section_id=1&subject_id=2`
* **الاستجابة الناجحة (200 OK):** كافة الواجبات والامتحانات التي أنشأها المعلم الحالي مع تفاصيل الشعب والمرفقات والحلول.

---

### 4.3 نشر واجب أو امتحان جديد (Create Task)
* **المسار:** `POST /api/teacher/tasks`
* **الصلاحية:** `requireRole('TEACHER')`
* **نوع المحتوى (Content-Type):** `multipart/form-data`
* **حقول الطلب (Form Fields):**
  * `title` (نص إلزامي): عنوان المهمة.
  * `description` (نص اختياري): وصف وتفاصيل المهمة.
  * `task_type` (إلزامي): `'HOMEWORK'` أو `'EXAM'`.
  * `subject_id` (رقم إلزامي): معرف المادة المسندة.
  * `section_id` (رقم إلزامي): معرف الشعبة المستهدفة.
  * `due_date` (تاريخ اختياري): `YYYY-MM-DD`.
  * `has_solution` (اختياري): `1` أو `'true'` لتفعيل وجود حل نموذجي.
  * `solution_text` (نص اختياري): شرح خطوات الحل النموذجي.
  * `attachment` (ملف اختياري): ملف PDF أو صورة للواجب (حد أقصى 10MB).
  * `solution_attachment` (ملف اختياري): ملف PDF أو صورة للحل النموذجي (حد أقصى 10MB).
* **الاستجابة الناجحة (201 Created):**
```json
{
  "success": true,
  "message": "تم إنشاء المهمة بنجاح.",
  "taskId": 18
}
```
* **الأخطاء:** `400 Bad Request` (نقص حقول)، `403 Forbidden` (المعلم غير مكلف بتدريس هذه الشعبة).

---

### 4.4 تعديل مهمة منشأة (Update Task)
* **المسار:** `PUT /api/teacher/tasks/:id`
* **نوع المحتوى:** `multipart/form-data`
* **الاستجابة الناجحة (200 OK):** `{ "success": true, "message": "تم تعديل المهمة بنجاح." }`
* **الأخطاء:** `404 Not Found` (المهمة غير موجودة أو لا يملكها المعلم).

---

### 4.5 حذف مهمة (Delete Task)
* **المسار:** `DELETE /api/teacher/tasks/:id`
* **الاستجابة الناجحة (200 OK):** `{ "success": true, "message": "تم حذف المهمة بنجاح." }`

---

## 5. مسارات الإدارة العامة (Admin Endpoints - `/api/admin`)

> [!IMPORTANT]
> كافة مسارات الإدارة تتطلب ترويسة التوكن `Authorization: Bearer <ADMIN_TOKEN>` مع فحص الصلاحية الإدارية الصارمة `requireRole('ADMIN')`.

---

### 5.1 الإحصائيات العامة للمنظومة
* **`GET /api/admin/stats`** ➔ جلب إجمالي الطلاب والمعلمين والشعب والمهام لتغذية بطاقات الـ 3D KPI.

---

### 5.2 إدارة الهيكل التعليمي والمقررات
* **`GET /api/admin/grades`** ➔ استرجاع قائمة الصفوف الـ 9 مدمجاً بها مصفوفات الشعب والمواد التابعة.
* **`POST /api/admin/grades`** ➔ إضافة صف جديد (`{ name, level }`). الاستجابة: `201 Created` مع `gradeId`.
* **`POST /api/admin/sections`** ➔ إضافة شعبة لصف محدد (`{ grade_id, name }`). الاستجابة: `201 Created` مع `sectionId`.
* **`DELETE /api/admin/sections/:id`** ➔ حذف شعبة وحصصها تتابعياً (`CASCADE`).
* **`GET /api/admin/subjects`** ➔ استرجاع المواد المقررة (يدعم التصفية بـ `?grade_id=`).
* **`POST /api/admin/subjects`** ➔ إضافة مادة جديدة لصف (`{ grade_id, name }`). الاستجابة: `201 Created` مع `subjectId`.
* **`DELETE /api/admin/subjects/:id`** ➔ حذف مادة دراسية تتابعياً (`CASCADE`).

---

### 5.3 إدارة وسجلات الطلاب
* **`GET /api/admin/students`** ➔ استرجاع قائمة الطلاب (يدعم الفلاتر: `?grade_id=&section_id=`).
* **`POST /api/admin/students`** ➔ تسجيل قيد طالب جديد (`{ roll_number, student_code, full_name, grade_id, section_id }`). الاستجابة: `201 Created` مع `studentId`.
* **`PUT /api/admin/students/:id`** ➔ تعديل بيانات الطالب أو نقله لشعبة/صف آخر (`{ roll_number, student_code, full_name, grade_id, section_id }`).
* **`DELETE /api/admin/students/:id`** ➔ حذف سجل طالب نهائياً من المنظومة.

---

### 5.4 إدارة المعلمين والتكليفات الأكاديمية
* **`GET /api/admin/teachers`** ➔ استرجاع قائمة المعلمين المسجلين.
* **`POST /api/admin/teachers`** ➔ إنشاء حساب معلم جديد وتشفير كلمة المرور بـ `Bcrypt` (`{ username, password, full_name }`). الاستجابة: `201 Created` مع `teacherId`.
* **`DELETE /api/admin/teachers/:id`** ➔ حذف حساب معلم وتكليفاته تتابعياً.
* **`GET /api/admin/assignments`** ➔ استرجاع كافة التكليفات الأكاديمية المسندة بالمواد والشعب والمعلمين.
* **`POST /api/admin/assignments`** ➔ تكليف معلم بمادة وشعبة (`{ teacher_id, subject_id, section_id }`). الاستجابة: `201 Created` مع `assignmentId`.
* **`DELETE /api/admin/assignments/:id`** ➔ إزالة تكليف معلم من مادة وشعبة محددة.

---

### 5.5 إدارة الجدول الدراسي الأسبوعي
* **`GET /api/admin/schedule`** ➔ استرجاع جدول حصص شعبة معينة (`?section_id=X`).
* **`POST /api/admin/schedule`** ➔ تخصيص أو تحديث حصة في الجدول الأسبوعي بآلية `Upsert` المباشرة (`{ section_id, day_of_week, slot_number, subject_id, teacher_id }`).
* **`DELETE /api/admin/schedule/:id`** ➔ تفريغ خانة حصة من الجدول الأسبوعي.

---

## 6. مصفوفة المسارات الشاملة (Master API Routing Matrix)

| # | الطريقة | المسار الكامل | الدور المصرح | نوع المحتوى | الغرض الوظيفي |
| :---: | :---: | :--- | :---: | :---: | :--- |
| **1** | `POST` | `/api/auth/login/admin` | Public | JSON | تسجيل دخول المشرف العام |
| **2** | `POST` | `/api/auth/login/teacher` | Public | JSON | تسجيل دخول المعلم |
| **3** | `POST` | `/api/auth/login/student` | Public | JSON | تسجيل دخول الطالب |
| **4** | `GET` | `/api/auth/me` | Authenticated | JSON | فحص واسترجاع الجلسة الحالية |
| **5** | `GET` | `/api/student/profile` | STUDENT | JSON | استرجاع ملف الطالب وقيده |
| **6** | `GET` | `/api/student/tasks` | STUDENT | JSON | جلب واجبات وامتحانات وحلول شعبة الطالب |
| **7** | `GET` | `/api/student/schedule` | STUDENT | JSON | جلب جدول حصص شعبة الطالب الأسبوعي |
| **8** | `GET` | `/api/student/subjects` | STUDENT | JSON | جلب مواد الصف وأسماء المعلمين المخصصين |
| **9** | `GET` | `/api/teacher/assignments` | TEACHER | JSON | جلب الفصول والمواد المسندة للمعلم |
| **10** | `GET` | `/api/teacher/tasks` | TEACHER | JSON | جلب مهام المعلم مع فلاتر الفصول |
| **11** | `POST` | `/api/teacher/tasks` | TEACHER | Multipart | نشر واجب/امتحان ورفع المرفقات والحلول |
| **12** | `PUT` | `/api/teacher/tasks/:id` | TEACHER | Multipart | تعديل مهمة منشأة مسبقاً |
| **13** | `DELETE`| `/api/teacher/tasks/:id` | TEACHER | JSON | حذف مهمة منشأة |
| **14** | `GET` | `/api/admin/stats` | ADMIN | JSON | جلب إحصائيات لوحة التحكم و 3D KPI |
| **15** | `GET` | `/api/admin/grades` | ADMIN | JSON | جلب هيكل الصفوف والشعب والمقررات |
| **16** | `POST` | `/api/admin/grades` | ADMIN | JSON | إضافة صف دراسي جديد |
| **17** | `POST` | `/api/admin/sections` | ADMIN | JSON | إضافة شعبة جديدة لصف |
| **18** | `DELETE`| `/api/admin/sections/:id` | ADMIN | JSON | حذف شعبة دراسية تتابعياً |
| **19** | `GET` | `/api/admin/subjects` | ADMIN | JSON | جلب المواد المقررة مع فلاتر الصف |
| **20** | `POST` | `/api/admin/subjects` | ADMIN | JSON | إضافة مادة جديدة لصف |
| **21** | `DELETE`| `/api/admin/subjects/:id` | ADMIN | JSON | حذف مادة دراسية تتابعياً |
| **22** | `GET` | `/api/admin/students` | ADMIN | JSON | جلب قائمة وسجلات الطلاب |
| **23** | `POST` | `/api/admin/students` | ADMIN | JSON | تسجيل قيد طالب جديد |
| **24** | `PUT` | `/api/admin/students/:id` | ADMIN | JSON | تعديل بيانات طالب أو نقله لشعبة أخرى |
| **25** | `DELETE`| `/api/admin/students/:id` | ADMIN | JSON | حذف سجل طالب نهائياً |
| **26** | `GET` | `/api/admin/teachers` | ADMIN | JSON | جلب قائمة المعلمين المسجلين |
| **27** | `POST` | `/api/admin/teachers` | ADMIN | JSON | إنشاء حساب معلم وتشفير كلمة المرور |
| **28** | `DELETE`| `/api/admin/teachers/:id` | ADMIN | JSON | حذف حساب معلم وتكليفاته تتابعياً |
| **29** | `GET` | `/api/admin/assignments` | ADMIN | JSON | جلب كافة التكليفات المسندة بالمواد والشعب |
| **30** | `POST` | `/api/admin/assignments` | ADMIN | JSON | تكليف معلم بمادة وشعبة |
| **31** | `DELETE`| `/api/admin/assignments/:id` | ADMIN | JSON | إزالة تكليف معلم من مادة وشعبة |
| **32** | `GET` | `/api/admin/schedule` | ADMIN | JSON | جلب جدول حصص شعبة محددة |
| **33** | `POST` | `/api/admin/schedule` | ADMIN | JSON | تعيين/تحديث حصة بالجدول (Upsert) |
| **34** | `DELETE`| `/api/admin/schedule/:id` | ADMIN | JSON | تفريغ خانة حصة من الجدول الأسبوعي |
