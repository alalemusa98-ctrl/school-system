# 🗺️ 05. مصفوفة التتبع والتطابق الشاملة (Full Traceability Matrix)

> **الهدف:** توفير خريطة مطابقة واضحة ومباشرة تربط كل ميزة في النظام بقواعد عملها، جداول قاعدة البيانات، مسارات الـ APIs، ملفات الواجهة، وحالة التحقق البرمجي (Status).

---

## 🧭 1. مصفوفة التتبع لميزات الطالب (Student Features Matrix)

| كود الميزة | اسم الميزة | الحالة | قاعدة العمل | جدول الـ DB | مسار الـ API | ملف التوثيق المرجعي | مكون الواجهة (Frontend View) |
| :--- | :--- | :---: | :--- | :--- | :--- | :--- | :--- |
| **F-STU-01** | تسجيل دخول الطالب | `VERIFIED 🟢` | التحقق من رقم الجلوس | `students` | `POST /api/auth/login/student` | [`Rest-api/STUDENT_REST_API.md`](../Rest-api/STUDENT_REST_API.md) | `LoginView.vue` |
| **F-STU-02** | بروفايل وكارد الهيرو | `VERIFIED 🟢` | استرجاع بيانات الفصل | `students`, `grades`, `sections` | `GET /api/student/profile` | [`Rest-api/STUDENT_REST_API.md`](../Rest-api/STUDENT_REST_API.md) | `StudentDashboardView.vue` |
| **F-STU-03** | استعراض الواجبات | `VERIFIED 🟢` | عزل الشعبة التلقائي | `assessment_tasks` | `GET /api/student/tasks?task_type=HOMEWORK` | [`Rest-api/STUDENT_REST_API.md`](../Rest-api/STUDENT_REST_API.md) | `HomeworksView.vue` |
| **F-STU-04** | استعراض الحل النموذجي | `VERIFIED 🟢` | شرط `has_solution=1` | `assessment_tasks` | `GET /api/student/tasks` | [`Rest-api/STUDENT_REST_API.md`](../Rest-api/STUDENT_REST_API.md) | `ShadcnDialog.vue` (Modal) |
| **F-STU-05** | جدول الامتحانات | `VERIFIED 🟢` | فرز حسب التاريخ | `assessment_tasks` | `GET /api/student/tasks?task_type=EXAM` | [`Rest-api/STUDENT_REST_API.md`](../Rest-api/STUDENT_REST_API.md) | `ExamsView.vue` |
| **F-STU-06** | الجدول الدراسي الأسبوعي| `VERIFIED 🟢` | مصفوفة 5 أيام × 6 حصص | `schedule_slots` | `GET /api/student/schedule` | [`Rest-api/STUDENT_REST_API.md`](../Rest-api/STUDENT_REST_API.md) | `ScheduleView.vue` |
| **F-STU-07** | قائمة المواد المنهجية | `VERIFIED 🟢` | مواد الصف الدراسي | `subjects`, `teacher_assignments`| `GET /api/student/subjects` | [`Rest-api/STUDENT_REST_API.md`](../Rest-api/STUDENT_REST_API.md) | `SubjectsView.vue` |

---

## 👨‍🏫 2. مصفوفة التتبع لميزات المعلم (Teacher Features Matrix)

| كود الميزة | اسم الميزة | الحالة | قاعدة العمل | جدول الـ DB | مسار الـ API | ملف التوثيق المرجعي | مكون الواجهة (Frontend View) |
| :--- | :--- | :---: | :--- | :--- | :--- | :--- | :--- |
| **F-TCH-01** | تسجيل دخول المعلم | `VERIFIED 🟢` | التحقق من كلمة المرور | `teachers` | `POST /api/auth/login/teacher` | [`Rest-api/TEACHER_REST_API.md`](../Rest-api/TEACHER_REST_API.md) | `LoginView.vue` |
| **F-TCH-02** | لوحة تحكم المعلم | `VERIFIED 🟢` | الهيكل النظيف بدون حشو | `teachers`, `teacher_assignments` | `GET /api/teacher/assignments` | [`Rest-api/TEACHER_REST_API.md`](../Rest-api/TEACHER_REST_API.md) | `TeacherDashboardView.vue` |
| **F-TCH-03** | إنشاء واجب أو امتحان | `VERIFIED 🟢` | التحقق من نصاب التدريس| `assessment_tasks` | `POST /api/teacher/tasks` | [`Rest-api/TEACHER_REST_API.md`](../Rest-api/TEACHER_REST_API.md) | `TeacherHomeworksView.vue` |
| **F-TCH-04** | تعديل مهمة وإرفاق حل | `VERIFIED 🟢` | إعادة فحص التكليف | `assessment_tasks` | `PUT /api/teacher/tasks/:id` | [`Rest-api/TEACHER_REST_API.md`](../Rest-api/TEACHER_REST_API.md) | `TeacherHomeworksView.vue` |
| **F-TCH-05** | جدول حصص المعلم | `VERIFIED 🟢` | جدول أيام المعلم | `schedule_slots` | `GET /api/teacher/schedule` | [`Rest-api/TEACHER_REST_API.md`](../Rest-api/TEACHER_REST_API.md) | `TeacherScheduleView.vue` |
| **F-TCH-06** | المواد والفصول المسندة | `VERIFIED 🟢` | قصر العرض على التكليفات| `teacher_assignments` | `GET /api/teacher/assignments` | [`Rest-api/TEACHER_REST_API.md`](../Rest-api/TEACHER_REST_API.md) | `TeacherSubjectsView.vue` |

---

## 👔 3. مصفوفة التتبع لميزات الإدارة العامة (Admin Features Matrix)

| كود الميزة | اسم الميزة | الحالة | قاعدة العمل | جدول الـ DB | مسار الـ API | ملف التوثيق المرجعي | مكون الواجهة (Frontend View) |
| :--- | :--- | :---: | :--- | :--- | :--- | :--- | :--- |
| **F-ADM-01** | إحصائيات لوحة التحكم | `VERIFIED 🟢` | عدادات النظام الـ 3D KPI | `students, teachers, sections, tasks` | `GET /api/admin/stats` | [`Rest-api/ADMIN_REST_API.md`](../Rest-api/ADMIN_REST_API.md) | `AdminDashboardView.vue` |
| **F-ADM-02** | الهيكل الأكاديمي | `VERIFIED 🟢` | الصفوف والشعب والمواد | `grades, sections, subjects` | `GET /api/admin/grades` | [`Rest-api/ADMIN_REST_API.md`](../Rest-api/ADMIN_REST_API.md) | `AdminDashboardView.vue` |
| **F-ADM-03** | إدارة الطلاب والسجلات | `VERIFIED 🟢` | إضافة وتعديل وحذف | `students` | `GET/POST/PUT/DELETE /api/admin/students` | [`Rest-api/ADMIN_REST_API.md`](../Rest-api/ADMIN_REST_API.md) | `AdminDashboardView.vue` |
| **F-ADM-04** | إدارة كادر المعلمين | `VERIFIED 🟢` | إنشاء وحذف حسابات | `teachers` | `GET/POST/DELETE /api/admin/teachers` | [`Rest-api/ADMIN_REST_API.md`](../Rest-api/ADMIN_REST_API.md) | `AdminDashboardView.vue` |
| **F-ADM-05** | تكليفات التدريس | `VERIFIED 🟢` | إسناد مادة وشعبة لمعلم | `teacher_assignments` | `GET/POST/DELETE /api/admin/assignments` | [`Rest-api/ADMIN_REST_API.md`](../Rest-api/ADMIN_REST_API.md) | `AdminDashboardView.vue` |
| **F-ADM-06** | إدارة الجدول الأسبوعي | `VERIFIED 🟢` | تخصيص وتفريغ الحصص | `schedule_slots` | `GET/POST/DELETE /api/admin/schedule` | [`Rest-api/ADMIN_REST_API.md`](../Rest-api/ADMIN_REST_API.md) | `AdminDashboardView.vue` |
