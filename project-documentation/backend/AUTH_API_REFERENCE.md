# مرجع واجهات برمجة المصادقة وإدارة الجلسات (Authentication & Session API Specification)

> **المسار الأساسي (Base Route):** `/api/auth`  
> **المسؤول البرمجي:** `backend/controllers/authController.js` & `backend/routes/authRoutes.js`  
> **آلية التوثيق:** تستخدم المنظومة توثيقاً لا مركزياً (Stateless Authentication) عبر رموز `JSON Web Tokens (JWT)` المشفرة، مع تشفير كلمات المرور باستخدام `bcryptjs`.

---

## 1. بنية التوكن المشفر لكل دور (JWT Payload Matrix)

عند تسجيل الدخول بنجاح لأي دور، يُصدر الخادم توكناً مشفراً يحمل البيانات التالية في الـ Payload:

| الدور (Role) | الحقول المحقونة في الـ JWT Token | استخدامات الحقول في الـ Backend |
| :--- | :--- | :--- |
| **`ADMIN`** | `{ id, role: "ADMIN", username }` | التحقق من الصلاحية الإدارية لكافة مسارات `/api/admin/*`. |
| **`TEACHER`** | `{ id, role: "TEACHER", username, fullName }` | تصفية التكليفات والتحقق من ملكية المهام المنشورة (`teacher_id`). |
| **`STUDENT`** | `{ id, role: "STUDENT", rollNumber, fullName, gradeId, sectionId }` | عزل مهام وجدول الطالب تلقائياً عبر `section_id` و `grade_id`. |

---

## 2. تسجيل دخول الإدارة (Admin Login)

* **المسار:** `POST /api/auth/login/admin`
* **الصلاحية المطلوبة:** عامة (Public).
* **الهدف:** التحقق من حساب المدير وإصدار توكن إداري بصلاحيات كاملة.
* **نوع المحتوى (Content-Type):** `application/json`

### جسم الطلب (Request Body):
```json
{
  "username": "admin",
  "password": "admin123"
}
```

#### الاستجابة الناجحة (200 OK):
```json
{
  "success": true,
  "message": "تم تسجيل الدخول بنجاح",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6IkFETUlOIiwidXNlcm5hbWUiOiJhZG1pbiIsImlhdCI6MTc3MTQwMDAwMCwiZXhwIjoxNzcxOTk1MjAwfQ.xxxx",
  "user": {
    "id": 1,
    "role": "ADMIN",
    "username": "admin",
    "fullName": "مدير المدرسة"
  }
}
```

#### استجابات الخطأ المحتملة:
* `400 Bad Request`: نقص البيانات (`"يرجى إدخال اسم المستخدم وكلمة المرور."`).
* `401 Unauthorized`: اسم المستخدم أو كلمة المرور غير صحيحة (`"بيانات الدخول غير صحيحة."`).

---

## 3. تسجيل دخول المعلم (Teacher Login)

* **المسار:** `POST /api/auth/login/teacher`
* **الصلاحية المطلوبة:** عامة (Public).
* **الهدف:** التحقق من حساب المعلم عبر اسم المستخدم ومقارنة كلمة المرور المشفرة بـ `Bcrypt`.
* **نوع المحتوى (Content-Type):** `application/json`

### جسم الطلب (Request Body):
```json
{
  "username": "teacher2",
  "password": "teacher123"
}
```

#### الاستجابة الناجحة (200 OK):
```json
{
  "success": true,
  "message": "تم تسجيل دخول المعلم بنجاح",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Miwicm9sZSI6IlRFQUNIRVIiLCJ1c2VybmFtZSI6InRlYWNoZXIyIiwiZnVsbE5hbWUiOiLYoS4g2KPYrdmF2K8g2LPYp9mE2YUiLCJpYXQiOjE3NzE0MDAwMDAsImV4cCI6MTc3MTk5NTIwMH0.xxxx",
  "user": {
    "id": 2,
    "role": "TEACHER",
    "username": "teacher2",
    "fullName": "أ. أحمد سالم"
  }
}
```

#### استجابات الخطأ المحتملة:
* `400 Bad Request`: نقص الحقول المطلوبة.
* `401 Unauthorized`: اسم المستخدم أو كلمة المرور غير صحيحة (`"اسم المستخدم أو كلمة المرور غير صحيحة."`).

---

## 4. تسجيل دخول الطالب (Student Login)

* **المسار:** `POST /api/auth/login/student`
* **الصلاحية المطلوبة:** عامة (Public).
* **الهدف:** تسجيل دخول الطالب عبر رقم الجلوس وكود الطالب الخاص واستخراج بيانات قيده وصفه وشعبته وحقنها في التوكن.
* **نوع المحتوى (Content-Type):** `application/json`

### جسم الطلب (Request Body):
```json
{
  "roll_number": "1001",
  "student_code": "ST1001"
}
```

#### الاستجابة الناجحة (200 OK):
```json
{
  "success": true,
  "message": "تم تسجيل دخول الطالب بنجاح",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6IlNUVURFTlQiLCJyb2xsTnVtYmVyIjoiMTAwMSIsImZ1bGxOYW1lIjoi2KPYrdmF2K8g2K7Yp9mE2K8g2KfZhNmF2LXYsdin2KrZiiIsImdyYWRlSWQiOjUsInNlY3Rpb25JZCI6MSwiaWF0IjoxNzcxNDAwMDAwLCJleHAiOjE3NzE5OTUyMDB9.xxxx",
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

#### استجابات الخطأ المحتملة:
* `400 Bad Request`: عدم إدخال رقم الجلوس أو الكود (`"يرجى إدخال رقم الجلوس وكود الطالب."`).
* `401 Unauthorized`: عدم تطابق السجل في قاعدة البيانات (`"رقم الجلوس أو كود الطالب غير صحيح."`).

---

## 5. فحص والتحقق من الجلسة الحالية (Get Current Auth User)

* **المسار:** `GET /api/auth/me`
* **الصلاحية المطلوبة:** `Authorization: Bearer <TOKEN>` لأي دور مسجل.
* **الهدف:** استرجاع بيانات المستخدم الحالي الموثق للتأكد من صلاحية الجلسة عند إعادة تحميل الصفحة في المتصفح.

#### الاستجابة الناجحة (200 OK):
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

#### استجابات الخطأ المحتملة:
* `401 Unauthorized`: التوكن غير موجود أو منتهي الصلاحية (`"رمز الدخول غير صالح أو منتهي الصلاحية."`).
