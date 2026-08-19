# تعريف الإنجاز ومعايير إغلاق المهام (Definition of Done — DoD Checklist)

> **الغرض:** لا تُعتبر أي مهمة منجزة (Done) حتى تجتاز كل خانة في هذا الملف.  
> **للـ AI:** عند اكتمال Step أو Task → قِسها على هذا الملف سطراً بسطر.  
> **المبدأ:** الكود يعمل ≠ الكود مكتمل. الكود مكتمل = يجتاز كل هذه المعايير.

---

## 1. المعايير العامة لكل Task في المشروع (Universal DoD Checklist)

```
[ ] 1. FUNCTIONAL     — المهمة تؤدي وظيفتها المُعرّفة في TRACEABILITY_MATRIX.md
[ ] 2. BOUNDARY       — الميزة داخل نطاق V1 المحدد في MVP_BOUNDARY.md
[ ] 3. SECURITY       — تطبيق قواعد الأمان المعتمدة (راجع البند 2 أدناه)
[ ] 4. VALIDATION     — التحقق من صحة المدخلات (راجع البند 3 أدناه)
[ ] 5. ERROR_HANDLING — معالجة كل حالات الخطأ بكودات HTTP صحيحة ورسائل عربية
[ ] 6. ARCHITECTURE   — الكود ملتزم بالطبقات المعمارية المحددة في SYSTEM_ARCHITECTURE.md
[ ] 7. DESIGN_SYSTEM  — الواجهة تستخدم متغيرات CSS من main.css وخط SF Arabic
[ ] 8. ACCEPTANCE     — اجتياز معيار القبول المُعرَّف في TRACEABILITY_MATRIX.md
```

---

## 2. معايير الأمان المطلوبة في كل Task (Security DoD)

### للـ Backend:
```
[ ] S-01: استخراج section_id للطالب من req.user.sectionId فقط — ليس من req.query/body
[ ] S-02: تطبيق requireRole(role) على كل Route محمي
[ ] S-03: استخدام Parameterized Queries لكل استعلام SQL (no string concatenation)
[ ] S-04: فحص ملكية المهمة للمعلم: WHERE id = ? AND teacher_id = req.user.id
[ ] S-05: فحص تكليف المعلم قبل النشر في teacher_assignments → 403 إن لم يُكلَّف
[ ] S-06: فحص امتداد الملف والحجم (Multer whitelist) قبل الحفظ
```

### للـ Frontend:
```
[ ] S-07: حارس المسار (router.beforeEach) يمنع الدخول لصفحات الأدوار الأخرى
[ ] S-08: الـ Axios Interceptor يُرسل التوكن ويعترض 401 ويُعيد التوجيه لـ /login
[ ] S-09: لا يُرسَل section_id من أي Form أو Query String في واجهة الطالب
```

---

## 3. معايير التحقق من المدخلات (Validation DoD)

| السياق | ما يجب التحقق منه | الاستجابة عند الفشل |
| :--- | :--- | :--- |
| تسجيل دخول الطالب | `roll_number` غير فارغ + `student_code` غير فارغ | `401` + رسالة: "رقم الجلوس أو الكود غير صحيح" |
| تسجيل دخول المعلم/الإدارة | `username` + `password` غير فارغين | `401` + رسالة: "اسم المستخدم أو كلمة المرور غير صحيحة" |
| إنشاء مهمة (معلم) | `title` غير فارغ + `task_type` = HOMEWORK/EXAM + `subject_id` + `section_id` + `due_date` | `400` + رسالة: "يرجى تعبئة الحقول المطلوبة" |
| رفع ملف مرفق | امتداد من: `.pdf`, `.png`, `.jpg`, `.jpeg`, `.webp` + حجم ≤ 10MB | `400` + رسالة: "يرجى رفع ملف PDF أو صورة بحد أقصى 10MB" |
| إضافة طالب (إدارة) | `roll_number` فريد + `student_code` غير فارغ + `section_id` صالح | `409` + رسالة: "رقم الجلوس مستخدم مسبقاً" |
| إضافة شعبة | `name` + `grade_id` بحيث UNIQUE(grade_id, name) | `409` + رسالة: "اسم الشعبة موجود مسبقاً في هذا الصف" |
| إضافة تكليف | UNIQUE(teacher_id, subject_id, section_id) | `409` + رسالة: "هذا التكليف موجود مسبقاً" |

---

## 4. معايير معالجة الأخطاء (Error Handling DoD)

### كودات HTTP المعتمدة في المشروع:
```
200 OK           → طلب ناجح مع بيانات
201 Created      → إنشاء ناجح
400 Bad Request  → مدخلات غير صالحة
401 Unauthorized → لا يوجد توكن أو التوكن منتهي
403 Forbidden    → التوكن صالح لكن الصلاحية غير كافية
404 Not Found    → المورد غير موجود
409 Conflict     → تكرار بيانات فريدة
500 Server Error → خطأ غير متوقع في الخادم
```

### قالب استجابة الخطأ الموحد (Standard Error Response):
```json
{
  "success": false,
  "message": "رسالة عربية واضحة للمستخدم",
  "error": "تفاصيل تقنية للمطوّر (اختياري في الإنتاج)"
}
```

### قالب استجابة النجاح الموحد:
```json
{
  "success": true,
  "message": "تم بنجاح",
  "data": { }
}
```

---

## 5. معايير نظام التصميم (Design System DoD)

### للـ Backend:
```
[ ] D-01: الملفات تتبع هيكل routes/ → controllers/ → utils/ (لا business logic في routes)
[ ] D-02: كل Route يطبق authenticateToken ثم requireRole قبل Controller
[ ] D-03: لا magic numbers: الثوابت في متغيرات (maxFileSize = 10 * 1024 * 1024)
```

### للـ Frontend:
```
[ ] D-04: خط SF Arabic محدد في font-family لكل المكونات
[ ] D-05: الألوان والظلال من متغيرات CSS في main.css (لا Hard-coded hex)
[ ] D-06: كل مكون يستخدم <style scoped>
[ ] D-07: لا Monolithic Views — كل جدول أو نافذة أو كارد = مكون منفصل
[ ] D-08: واجهات الطالب والمعلم: Mobile-first، RTL كامل
[ ] D-09: لوحة الإدارة: Desktop-first، indigo-theme (#4f46e5)
```

---

## 6. DoD حسب كل Step في الخطة (Per-Step Acceptance Gate)

| Step | العنوان | Gate اجتيازه |
| :---: | :--- | :--- |
| **Step 1** | Backend Workspace Setup | `curl http://localhost:5000` → رسالة Running ✅ |
| **Step 2** | DB Adapter & Migrations | `npm run db:migrate` → 10 جداول بلا أخطاء ✅ |
| **Step 3** | Database Seeding | `npm run db:seed` → بيانات كاملة + دخول `1001/ST1001` يعمل ✅ |
| **Step 4** | JWT & RBAC Middleware | توكن منتهي يُعيد 401، دور خاطئ يُعيد 403 ✅ |
| **Step 5** | Auth Controller & Routes | دخول الأدوار الثلاثة ينجح + الـ Payload صحيح ✅ |
| **Step 6** | Domain Controllers & Uploads | 34 مسار يعمل + رفع PDF ينجح + رفع exe يُرفض ✅ |
| **Step 7** | Server Assembly | كل المسارات متوصلة + 404 مركزي يعمل ✅ |
| **Step 8** | Frontend Core & Tokens | `npm run dev` → واجهة تحمل بخط SF Arabic ✅ |
| **Step 9** | Common UI & Guards | `/admin` تُعيد التوجيه للطالب إذا كان role=STUDENT ✅ |
| **Step 10** | Student iOS Views | الطالب `1001` يرى واجباته وحلوله وجدوله دون أخطاء ✅ |
| **Step 11** | Teacher Publishing Portal | المعلم ينشر واجباً → يظهر فوراً للطالب ✅ |
| **Step 12** | Admin SaaS Dashboard | الإدارة تبني هيكلاً كاملاً + جدولاً + تنقل طالب ✅ |

---

## 7. اختبار دورة العمل الكاملة E2E (Full System Acceptance Test)

لا يُعلن عن اكتمال V1 إلا بعد اجتياز هذا السيناريو بالكامل:

```
السيناريو الكامل (E2E Journey):

Phase A — الإدارة تبني الهيكل:
[1] دخول admin → لوحة التحكم تحمل KPI صحيحة
[2] إضافة شعبة جديدة "5ج" للصف الخامس
[3] إضافة مادة "الفيزياء" للصف الخامس
[4] إنشاء حساب معلم جديد
[5] تكليف المعلم بـ "الفيزياء" لـ "5ج"
[6] بناء جدول "5ج" بـ 30 حصة (5 أيام × 6 حصص)

Phase B — المعلم يعمل:
[7] دخول المعلم → يرى شعبة "5ج" ومادة "الفيزياء" في تكليفاته
[8] نشر واجب "تمارين الفيزياء" مع ملف PDF + حل نموذجي نصي
[9] التحقق من ظهور الواجب في قائمة مهامه

Phase C — الطالب يستفيد:
[10] إضافة طالب "خالد" في شعبة "5ج" → دخوله بـ roll_number/student_code
[11] الطالب خالد يرى واجب "الفيزياء" في صفحة الواجبات
[12] الطالب يفتح الدرج → يرى التفاصيل + زر الحل النموذجي + ينزّل PDF

Phase D — الحدود والأمان:
[13] تجربة دخول طالب آخر من "5أ" → لا يرى واجبات "5ج"
[14] المعلم يحاول النشر لشعبة "5أ" (غير مكلف) → 403 Forbidden
[15] رفع ملف .exe → يُرفض برسالة عربية واضحة

✅ اجتياز الـ 15 سيناريو = V1 مكتمل ومعتمد
```
