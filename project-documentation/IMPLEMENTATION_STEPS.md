# دليل وخطوات التنفيذ التفصيلية للمطورين (Master Step-by-Step Implementation Recipes)

يوفر هذا الدليل الوصفة الإجرائية البرمجية خطوة بخطوة لبناء وتطوير كامل منظومة المدرسة من الصفر، مقسمة إلى 12 خطوة ذرية (Atomic Steps) متسلسلة بدقة مع تحديد الملفات المتأثرة، الأوامر التنفيذية، والنتائج المتوقعة لكل خطوة.

---

## 📋 الفهرس التنفيذي للخطوات الـ 12:

```
[Backend Steps]
Step 1: تهيئة بيئة العمل ومجلد الخادم الخلفي (Backend Workspace Setup)
Step 2: بناء محول قاعدة البيانات الهجين وسكريبت الترحيل (DB Adapter & Migrations)
Step 3: سكريبت تعبئة البيانات التجريبية الشاملة (Database Seeding)
Step 4: أداة توكن JWT ووسائط الأمان والتحقق من الصلاحيات (JWT & RBAC Middleware)
Step 5: معالج ومسارات المصادقة وتسجيل الدخول للأدوار الثلاثة (Auth Controller & Routes)
Step 6: معالجات الأعمال ونظام رفع الملفات المزدوج (Domain Controllers & Uploads)
Step 7: تجميع مسارات الخادم ومعالجة الأخطاء الشاملة (Server Assembly & Error Handlers)

[Frontend Steps]
Step 8: تهيئة تطبيق Vue 3 وتضمين خط SF Arabic ورموز التصميم (Frontend Core & Tokens)
Step 9: بناء عميل Axios المركزي، المكونات المشتركة، وحراس التوجيه (Common UI & Guards)
Step 10: بناء واجهات وتجربة الطالب بنمط iOS والحلول النموذجية (Student iOS Views)
Step 11: بناء بوابة المعلم وإدارة ونشر الواجبات والحلول (Teacher Publishing Portal)
Step 12: بناء لوحة تحكم الإدارة المفككة وشبكة الجدول الأسبوعي (Admin SaaS Dashboard)
```

---

## 🛠️ تفاصيل خطوات التنفيذ البرمجية (Granular Implementation Steps)

---

### Step 1: Initial Backend Workspace & Environment Setup
* **الهدف:** إنشاء مجلد `backend/` وإعداد ملفات التبعيات وخادم Express الأولي.
* **المهام الإجرائية:**
  1. تهيئة `backend/package.json` وتثبيت الحزم: `express`, `cors`, `dotenv`, `sqlite3`, `mysql2`, `jsonwebtoken`, `bcryptjs`, `multer`.
  2. إنشاء ملف `.env` وضبط القيم الافتراضية: `PORT=5000`, `DB_DRIVER=sqlite`, `JWT_SECRET`, `JWT_EXPIRES_IN=7d`.
  3. إنشاء `server.js` الأولي وتفعيل وسائط `cors()` و `express.json()`.
* **الملفات المنشأة:**
  * `backend/package.json`
  * `backend/.env`
  * `backend/server.js`
* **أمر التحقق:** `npm run dev` (أو `node server.js`).
* **النتيجة المتوقعة:** عمل الخادم بنجاح والاستماع على المنفذ `5000`.

---

### Step 2: Hybrid Database Adapter & Migration Script
* **الهدف:** بناء طبقة تجريد الاتصال بقاعدة البيانات وسكريبت إنشاء الجداول الـ 10.
* **المهام الإجرائية:**
  1. إنشاء `backend/config/db.js` لتوفير دالة موحدة `query(sql, params)` تدعم التبديل بين SQLite و MySQL مع تفعيل `PRAGMA foreign_keys = ON;`.
  2. إنشاء سكريبت `backend/database/migrations/migrate.js` لتنفيذ استعلامات الـ DDL للجداول الـ 10 بالتسلسل المرجعي:
     (`admins`, `academic_years`, `grades`, `sections`, `subjects`, `students`, `teachers`, `teacher_assignments`, `assessment_tasks`, `schedule_slots`).
* **الملفات المنشأة:**
  * `backend/config/db.js`
  * `backend/database/migrations/migrate.js`
* **أمر التحقق:** `npm run db:migrate`
* **النتيجة المتوقعة:** توليد ملف `backend/database/school.sqlite` وإنشاء كافة الجداول العشرة دون أخطاء.

---

### Step 3: Comprehensive Libyan Seed Script
* **الهدف:** زرع شحنة بيانات اختبارية واقعية متكاملة لمدارس التعليم الأساسي الليبية.
* **المهام الإجرائية:**
  1. إنشاء سكريبت `backend/database/seeds/seed.js`.
  2. إدراج السنة الدراسية `2025/2026`، الصفوف من 1 إلى 9، وحساب `admin` (`admin123`).
  3. إدراج 5 حسابات معلمين بتخصصاتهم وفصولهم المسندة (`teacher123`).
  4. تسجيل الطالب التجريبي **أحمد خالد المصراتي** (`1001` / `ST1001`) في شعبة 5أ.
  5. زرع واجبات وامتحانات بالحلول النموذجية المعتمدة وجدول حصص أسبوعي كامل (30 حصة).
* **الملفات المنشأة:**
  * `backend/database/seeds/seed.js`
* **أمر التحقق:** `npm run db:seed`
* **النتيجة المتوقعة:** تعبئة كافة الجداول وجاهزية المنظومة للاختبار الفوري.

---

### Step 4: JWT Utilities & RBAC Auth Middlewares
* **الهدف:** بناء أدوات التوكن المشفر وحراس الصلاحيات القائمة على الأدوار.
* **المهام الإجرائية:**
  1. إنشاء `backend/utils/jwt.js` لتوفير دوال `generateToken` و `verifyToken`.
  2. إنشاء `backend/middlewares/authMiddleware.js` لكتابة وسيط فحص التوكن `authenticateToken` وحارس الأدوار `requireRole(...roles)`.
* **الملفات المنشأة:**
  * `backend/utils/jwt.js`
  * `backend/middlewares/authMiddleware.js`
* **النتيجة المتوقعة:** القدرة على حماية أي مسار وفحص صلاحية المستخدم المشفرة في التوكن.

---

### Step 5: Authentication Controller & Login Routes
* **الهدف:** برمجة مسارات تسجيل الدخول المخصصة لكل دور واستخراج بيانات الجلسة.
* **المهام الإجرائية:**
  1. إنشاء `backend/controllers/authController.js` لبرمجة دوال: `loginAdmin`, `loginTeacher`, `loginStudent`, `getMe`.
  2. في دالة `loginStudent`: استخراج `grade_id` و `section_id` وحقنهما مباشرة في توكن الـ JWT.
  3. إنشاء `backend/routes/authRoutes.js` وتوصيل مسارات `/api/auth/*`.
* **الملفات المنشأة:**
  * `backend/controllers/authController.js`
  * `backend/routes/authRoutes.js`
* **أمر التحقق:** طلب cURL لتسجيل دخول الطالب `1001` وكود `ST1001`.
* **النتيجة المتوقعة:** استلام كود `200 OK` مع رمز توكن مشفر يحمل `sectionId: 1`.

---

### Step 6: Core Domain Controllers & Upload Utility
* **الهدف:** بناء معالجات الأعمال للطلاب والمعلمين والإدارة ونظام رفع الملفات.
* **المهام الإجرائية:**
  1. إنشاء `backend/utils/upload.js` باستخدام `Multer` للرفع المزدوج (`attachment` و `solution_attachment`) بحد أقصى 10MB وفحص الامتدادات.
  2. إنشاء `backend/controllers/studentController.js` (الملف الشخصي، المهام مع الحلول المعزولة، الجدول، والمواد).
  3. إنشاء `backend/controllers/teacherController.js` (التكليفات، إدارة المهام CRUD مع فحص الملكية والتكليف).
  4. إنشاء `backend/controllers/adminController.js` (الإحصائيات، الهيكل، الطلاب ونقلهم، المعلمين، التكليفات، وجدول الحصص بنمط `Upsert`).
  5. ربط المسارات في `studentRoutes.js`, `teacherRoutes.js`, و `adminRoutes.js`.
* **الملفات المنشأة:**
  * `backend/utils/upload.js`
  * `backend/controllers/studentController.js`, `routes/studentRoutes.js`
  * `backend/controllers/teacherController.js`, `routes/teacherRoutes.js`
  * `backend/controllers/adminController.js`, `routes/adminRoutes.js`
* **النتيجة المتوقعة:** اكتمال كافة مسارات الخادم الخلفي الـ 34 مع الأمان والعزل الكامل.

---

### Step 7: Express Server Assembly & Central Error Handlers
* **الهدف:** تجميع كافة الموديولات في `server.js` وتفعيل معالجة الأخطاء والمسار الثابت للملفات.
* **المهام الإجرائية:**
  1. إتاحة مجلد المرفقات كملفات ثابتة عامة: `app.use('/uploads', express.static(...))`.
  2. توصيل مسارات الـ API: `/api/auth`, `/api/student`, `/api/teacher`, `/api/admin`.
  3. كتابة معالج 404 المركزي ومعالج 500 لاعتراض الاستثناءات غير المعالجة.
* **الملفات المعدلة:**
  * `backend/server.js`
* **أمر التحقق:** تشغيل `curl http://localhost:5000/` والتأكد من استلام حالة `Running`.

---

### Step 8: Frontend Setup, SF Arabic Typography & Design Tokens
* **الهدف:** تهيئة مشروع Vite Vue 3 وتجهيز الخط العربي الرسمي ونظام الرموز البصرية.
* **المهام الإجرائية:**
  1. إنشاء مشروع Vite: `npm create vite@latest frontend -- --template vue`.
  2. تثبيت الحزم: `vue-router@4`, `axios`, `lucide-vue-next`.
  3. نسخ خطوط **SF Arabic** إلى `frontend/src/assets/fonts/`.
  4. كتابة `frontend/src/assets/styles/main.css` و `student-design.css` بمتغيرات الألوان والتدرجات والزجاج الضبابي.
* **الملفات المنشأة:**
  * `frontend/src/assets/styles/main.css`
  * `frontend/src/assets/styles/student-design.css`
  * `frontend/src/assets/fonts/*`
* **النتيجة المتوقعة:** واجهة أمامية مجهزة بخطوط أبل الفاخرة ونظام CSS معياري.

---

### Step 9: Axios Client, Common UI Primitives & Navigation Guards
* **الهدف:** بناء وسائط الاتصال والمكونات القابلة لإعادة الاستخدام وحماية المسارات.
* **المهام الإجرائية:**
  1. إنشاء `frontend/src/services/api.js` لضبط Axios وحقن توكن `school_token` تلقائياً ومعالجة أخطاء 401.
  2. بناء المكونات المشتركة: `BaseButton.vue`, `BaseBadge.vue`, `CustomSelect.vue`, `ShadcnDrawer.vue`, `ShadcnDialog.vue`, `MobileNav.vue`.
  3. إعداد `frontend/src/router/index.js` مع حراس المسارات (`router.beforeEach`) للتحقق من `requiresAuth` وتطابق الأدوار (`role`).
  4. بناء شاشة الدخول الموحدة `frontend/src/views/auth/LoginView.vue`.
* **الملفات المنشأة:**
  * `frontend/src/services/api.js`
  * `frontend/src/components/common/*`
  * `frontend/src/router/index.js`
  * `frontend/src/views/auth/LoginView.vue`
* **النتيجة المتوقعة:** عمل شاشة الدخول بتبديل الأدوار الثلاثة وحماية المسارات وتوجيه المستخدمين بدقة.

---

### Step 10: Student Native iOS Views & Model Answer Drawer
* **الهدف:** تنفيذ واجهات الطالب الفاخرة وسيناريوهات الكروت والحلول النموذجية.
* **المهام الإجرائية:**
  1. بناء `StudentLayout.vue` مع الهيدر النمطي، الجزيرة التفاعلية، بطاقة الهيرو المتراكبة (-50px) وشريط الإحصائيات الثلاثي.
  2. بناء `StudentDashboardView.vue` بشريط تقويم الأيام وشبكة البطاقات البصرية الـ 4 (240px).
  3. بناء `HomeworksView.vue` بنظام كروت الأيام المجمعة (`sched-ref-card`) ودرج الواجب مع صندوق الحل النموذجي (`has_solution = 1`).
  4. بناء `ExamsView.vue`, `ScheduleView.vue` (30 حصة), و `SubjectsView.vue`.
* **الملفات المنشأة:**
  * `frontend/src/components/student/*`
  * `frontend/src/views/student/*`
* **النتيجة المتوقعة:** تجربة تفاعلية متطابقة 100% مع مواصفات `design/student design/`.

---

### Step 11: Teacher Management Portal & Publishing Dialogs
* **الهدف:** بناء واجهات المعلم لإدارة الفصول ونشر وتعديل الواجبات والامتحانات والحلول.
* **المهام الإجرائية:**
  1. بناء `TeacherLayout.vue` وبطاقة الهيرو الخاصة بنصاب تدريس المعلم.
  2. بناء `TeacherDashboardView.vue`, `TeacherSubjectsView.vue`, و `TeacherScheduleView.vue`.
  3. بناء `TeacherHomeworksView.vue` و `TeacherExamsView.vue`:
     * صندوق التبويبات المبوب (الحالية / الأرشيف) مع زر الإدراج البارز `+ إضافة واجب جديد`.
     * شريط كبسولات تصفية الفصول المسندة.
     * نافذة الإدراج المنبثقة مع تفعيل الحل النموذجي ورفع المرفقات.
     * الدرج الجانبي (`ShadcnDrawer`) لاستعراض التفاصيل ومعاينة الحل وزر الحذف النهائي.
* **الملفات المنشأة:**
  * `frontend/src/components/teacher/*`
  * `frontend/src/views/teacher/*`
* **النتيجة المتوقعة:** تمكين المعلم من إدارة واجبات فصوله ونشر الحلول وحذف المهام بسلاسة.

---

### Step 12: Modular Admin SaaS Dashboard & Timetable Grid
* **الهدف:** بناء لوحة تحكم الإدارة المفككة بمكونات معيارية نظيفة وشبكة جدول الحصص.
* **المهام الإجرائية:**
  1. بناء `AdminHeader.vue` (قائمة macOS المنسدلة واختصارات الكيبورد) وبطاقات الـ 3D KPI مع مجسماتها.
  2. بناء موديول الهيكل التعليمي المتدرج (`GradesOverview.vue` ➔ `GradeDetailsPanel.vue` ➔ `ClassDetailsPanel.vue`).
  3. بناء موديول الطلاب: جدول السجلات وشاشة **الملف التفصيلي للطالب (`StudentProfile.vue`)**.
  4. بناء موديول المعلمين: جدول السجلات وشاشة **الملف الأكاديمي للمعلم (`TeacherProfile.vue`)**.
  5. بناء شبكة الجدول الأسبوعي التفاعلية (5×6) مع نافذة التخصيص والاستبدال الفوري (`AssignSlotModal.vue`).
* **الملفات المنشأة:**
  * `frontend/src/components/admin/*`
  * `frontend/src/views/admin/AdminDashboardView.vue`
* **النتيجة المتوقعة:** لوحة تحكم مكتبية شاملة متكاملة ومرتبطة بكافة مسارات الخادم الخلفي.
