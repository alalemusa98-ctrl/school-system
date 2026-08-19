# مصفوفة التتبع والتربط الشاملة (Master Traceability Matrix)

> **الغرض:** يربط هذا الملف كل ميزة V1 بالخيط الكامل من السبب إلى الكود.  
> **للـ AI:** قبل لمس أي ملف — ابحث عن كود الميزة هنا (مثل `AUTH-01`) واقرأ كل خلية في صفه.  
> **مرجع الحقيقة:** هذا الملف أعلى سلطةً من أي ملف آخر في مجلد `project-documentation/`.

---

## كيفية قراءة هذه المصفوفة (How to Read This Matrix)

```
كود الميزة → القاعدة التجارية الحاكمة → جدول DB المؤثر → نقطة API → مكون Vue → Step التنفيذ → معيار القبول (DoD)
```

---

## المصفوفة الشاملة (Full Traceability Table)

---

### 🔐 AUTH — المصادقة والجلسات

| كود | اسم الميزة | Business Rule | DB Tables | API Endpoint | Frontend Component | Implementation Step | معيار القبول |
| :---: | :--- | :--- | :--- | :--- | :--- | :---: | :--- |
| AUTH-01 | بوابة الدخول الموحدة | `USERS_AND_ROLES.md §2` — 3 أدوار، 3 بيانات دخول مختلفة | `admins`, `teachers`, `students` | `POST /api/auth/login/admin`<br>`POST /api/auth/login/teacher`<br>`POST /api/auth/login/student` | `LoginView.vue` (3 tabs) | **Step 5** | المستخدم يدخل بياناته الصحيحة ويُعاد توجيهه لواجهته فوراً |
| AUTH-02 | جلسات التوكن اللامركزية | `BUSINESS_RULES.md §3.1` — تشفير Bcrypt، JWT 7 أيام | `admins`, `teachers`, `students` | `GET /api/auth/me` | `api.js` Interceptor | **Step 4+5** | التوكن المنتهي يعيد التوجيه لـ `/login` تلقائياً |

---

### 🎒 STU — واجهة الطالب (Read-Only)

| كود | اسم الميزة | Business Rule | DB Tables | API Endpoint | Frontend Component | Implementation Step | معيار القبول |
| :---: | :--- | :--- | :--- | :--- | :--- | :---: | :--- |
| STU-01 | بطاقة الهيرو المتراكبة | `BUSINESS_RULES.md §2.4` — عزل الطالب بالتوكن | `students`, `grades`, `sections` | `GET /api/student/profile` | `StudentLayout.vue` | **Step 10** | تعرض اسم الطالب وصفه وشعبته من التوكن — لا من Query |
| STU-02 | شريط تقويم الأيام | — | — | — | `CalendarDayStrip.vue` | **Step 10** | يُمييز اليوم الحالي بخلفية مضيئة |
| STU-03 | شبكة الكروت الـ 4 | — | — | — | `StudentDashboardView.vue` | **Step 10** | 4 كروت تفتح الأقسام الصحيحة |
| STU-04 | كروت الواجبات المجمعة | `BUSINESS_RULES.md §4.1` — section واحد، `MVP_BOUNDARY §3-ب` | `assessment_tasks`, `subjects` | `GET /api/student/tasks?type=HOMEWORK` | `HomeworksView.vue` | **Step 10** | يظهر واجبات شعبته فقط — مجمعة بالأيام |
| STU-05 | درج تفاصيل الواجب | `BUSINESS_RULES.md §4.4` — حد 10MB، امتدادات محددة | `assessment_tasks` | — (attachment_path يُقرأ من البيانات) | `ShadcnDrawer.vue` | **Step 10** | يفتح الدرج ويتيح تنزيل الملف |
| STU-06 | الحل النموذجي الفوري | `BUSINESS_RULES.md §4.3` — `has_solution = 1` → فوري | `assessment_tasks` | `GET /api/student/tasks` (حقل `has_solution`) | `ShadcnDrawer.vue` (solution section) | **Step 10** | الحل يظهر فقط إذا `has_solution = 1`، ويختفي إذا `= 0` |
| STU-07 | جدول الامتحانات | `BUSINESS_RULES.md §4.2` — `task_type = 'EXAM'` | `assessment_tasks` | `GET /api/student/tasks?type=EXAM` | `ExamsView.vue` | **Step 10** | يظهر الامتحانات مع مواعيدها فقط |
| STU-08 | الجدول الأسبوعي | `BUSINESS_RULES.md §5.3` — الأحد=1, الخميس=5, حصص 1-6 | `schedule_slots`, `subjects`, `teachers` | `GET /api/student/schedule` | `ScheduleView.vue` | **Step 10** | 30 حصة صحيحة مع اسم المادة والمعلم |
| STU-09 | استكشاف المواد | `BUSINESS_RULES.md §1.2` — مواد موحدة على مستوى الصف | `subjects`, `teacher_assignments` | `GET /api/student/subjects` | `SubjectsView.vue` | **Step 10** | تعرض مواد صفه مع أسماء معلمي فصله |

---

### 👨‍🏫 TCH — بوابة المعلم

| كود | اسم الميزة | Business Rule | DB Tables | API Endpoint | Frontend Component | Implementation Step | معيار القبول |
| :---: | :--- | :--- | :--- | :--- | :--- | :---: | :--- |
| TCH-01 | هيرو المعلم ونصاب التدريس | `USERS_AND_ROLES.md §2.2` | `teacher_assignments`, `sections`, `subjects` | `GET /api/teacher/assignments` | `TeacherLayout.vue` | **Step 11** | يعرض عدد المواد والطلاب الصحيح |
| TCH-02 | تصفية الفصول المسندة | `BUSINESS_RULES.md §3.2` — المعلم يرى فصوله فقط | `teacher_assignments` | `GET /api/teacher/assignments` | `ClassFilterPills.vue` | **Step 11** | كبسولات تصفية تعرض فصوله المسندة فقط |
| TCH-03 | نشر الواجبات والامتحانات | `BUSINESS_RULES.md §3.2` — فحص التكليف قبل النشر → 403 | `assessment_tasks`, `teacher_assignments` | `POST /api/teacher/tasks` | `TaskCreateDialog.vue` | **Step 11** | النشر لشعبة غير مسندة يُعيد 403 |
| TCH-04 | تفعيل الحل النموذجي | `BUSINESS_RULES.md §4.3` — `has_solution = 1` فوري | `assessment_tasks` | `POST /api/teacher/tasks` (has_solution, solution_text, solution_attachment) | `TaskCreateDialog.vue` (solution toggle) | **Step 11** | الحل يظهر للطالب فور نشره |
| TCH-05 | تعديل وحذف المهام | `BUSINESS_RULES.md §3.3` — `WHERE teacher_id = req.user.id` | `assessment_tasks` | `PUT /api/teacher/tasks/:id`<br>`DELETE /api/teacher/tasks/:id` | `ShadcnDrawer.vue` (edit/delete) | **Step 11** | لا يستطيع تعديل مهام معلم آخر |
| TCH-06 | جدول حصص المعلم | `BUSINESS_RULES.md §5.3` | `schedule_slots`, `sections`, `subjects` | `GET /api/teacher/schedule` | `TeacherScheduleView.vue` | **Step 11** | يعرض حصصه الخاصة فقط |

---

### ⚙️ ADM — لوحة تحكم الإدارة

| كود | اسم الميزة | Business Rule | DB Tables | API Endpoint | Frontend Component | Implementation Step | معيار القبول |
| :---: | :--- | :--- | :--- | :--- | :--- | :---: | :--- |
| ADM-01 | بطاقات 3D KPI | — | `students`, `teachers`, `sections`, `assessment_tasks` | `GET /api/admin/stats` | `KpiCardsGrid.vue` | **Step 12** | الأرقام صحيحة ومتوافقة مع DB |
| ADM-02 | الهيدر التنفيذي | — | — | — | `AdminHeader.vue` | **Step 12** | قائمة macOS تنزل بالنقر |
| ADM-03 | إدارة الصفوف والشعب والمواد | `BUSINESS_RULES.md §1.1, 1.2, 1.3` — Unique على مستوى الصف | `grades`, `sections`, `subjects` | `GET/POST/DELETE /api/admin/grades`<br>`GET/POST/DELETE /api/admin/sections`<br>`GET/POST/DELETE /api/admin/subjects` | `GradesPanel/*` | **Step 12** | حذف الصف يحذف شعبه ومواده (CASCADE) |
| ADM-04 | سجلات وملف الطالب | `BUSINESS_RULES.md §2.1` — roll_number فريد | `students`, `grades`, `sections` | `GET /api/admin/students`<br>`GET /api/admin/students/:id` | `StudentRecordsTable.vue`, `StudentProfile.vue` | **Step 12** | ملف الطالب يعرض بياناته الأكاديمية كاملة |
| ADM-05 | نقل وتعديل بيانات الطلاب | `BUSINESS_RULES.md §2.3` — قيد شعبة واحدة في V1 | `students` | `PUT /api/admin/students/:id` | `TransferStudentModal.vue` | **Step 12** | النقل يُحدّث section_id وgrade_id مباشرة |
| ADM-06 | إدارة المعلمين والتكليفات | `BUSINESS_RULES.md §3.1` — Bcrypt + UNIQUE username | `teachers`, `teacher_assignments` | `GET/POST /api/admin/teachers`<br>`POST/DELETE /api/admin/assignments` | `TeacherRecordsTable.vue`, `AssignTeacherModal.vue` | **Step 12** | التكليف لا يتكرر: UNIQUE(teacher_id, subject_id, section_id) |
| ADM-07 | الملف الأكاديمي للمعلم | — | `teachers`, `teacher_assignments`, `subjects`, `sections` | `GET /api/admin/teachers/:id` | `TeacherProfile.vue` | **Step 12** | يعرض نصاب المعلم الكامل |
| ADM-08 | شبكة الجدول الأسبوعي | `BUSINESS_RULES.md §5.1, 5.2` — UNIQUE slot، Upsert | `schedule_slots` | `POST /api/admin/schedule`<br>`DELETE /api/admin/schedule/:id` | `TimetableGrid.vue`, `AssignSlotModal.vue` | **Step 12** | الخانة المشغولة تُستبدل لا تُرفض |

---

### 🛡️ SEC — الأمان والتكامل المعماري

| كود | اسم الميزة | Business Rule | DB Tables | API Endpoint | Frontend Component | Implementation Step | معيار القبول |
| :---: | :--- | :--- | :--- | :--- | :--- | :---: | :--- |
| SEC-01 | عزل المستأجر الصارم | `BUSINESS_RULES.md §2.4` — section_id من التوكن حصراً | جميع جداول الطالب | جميع مسارات `/api/student/*` | — (Backend Guard) | **Step 4** | الطالب لا يرى أي بيانات من شعبة أخرى — اختبر بتعديل الـ JWT يدوياً |
| SEC-02 | الحذف التتابعي والتكامل | `BUSINESS_RULES.md §6` — CASCADE على الجداول التابعة | كل الجداول | — (Database constraint) | — | **Step 2** | حذف صف يحذف كل تابعاته دون أي سجلات يتيمة |
