# الهيكلية المعمارية لمكونات الواجهة الأمامية (Vue 3 Component Hierarchy & Architecture)

يوفر هذا الدليل المرجع الهندسي الشامل لتنظيم، تفكيك، وهيكلة كافة مكونات الواجهة الأمامية في **Vue 3 (Composition API)**، موضحاً شجرة المكونات، واجهات الـ Props والـ Emits، أطر التخطيط (Layouts)، والمكونات المشتركة المستقلة.

---

## 1. شجرة المجلدات والمكونات الشاملة (Frontend Component Tree)

```
frontend/src/
├── assets/
│   ├── fonts/                    # خط SF Arabic بكافة أوزانه (Regular, Medium, Bold, Heavy)
│   ├── images/
│   │   ├── 3d-icons/             # مجسمات 3D عالية الدقة لبطاقات الـ KPI والواجهات
│   │   └── avatars/              # الأيقونات الرمزية الافتراضية
│   └── styles/
│       ├── main.css              # المتغيرات الأساسية ونظام التصميم العام (Design Tokens)
│       └── student-design.css    # نظام التصميم البصري لواجهة الطالب والمعلم (iOS Glassmorphism)
│
├── components/
│   ├── common/                   # المكونات المشتركة المستقلة (UI Primitives)
│   │   ├── BaseButton.vue        # أزرار تفاعلية متعددة الأحجام مع مؤشر تحميل (Loading Spinner)
│   │   ├── BaseBadge.vue         # كبسولات وشارات الحالات الملونة
│   │   ├── BaseCard.vue          # بطاقة الحاوية الأساسية بالزوايا والظلال الموحدة
│   │   ├── CustomSelect.vue      # قائمة منسدلة مخصصة مع دعم البحث الفوري
│   │   ├── MobileNav.vue         # شريط التنقل السفلي العائم (Glassmorphic Bottom Dock)
│   │   ├── ShadcnDialog.vue      # النوافذ المنبثقة المركزية (Central Modals)
│   │   └── ShadcnDrawer.vue      # الأدراج المنزلقة السفلية والجانبية (Slide-in Drawers)
│   │
│   ├── student/                  # مكونات واجهة الطالب
│   │   ├── StudentLayout.vue     # إطار وتخطيط واجهة الطالب (Status Bar + Dynamic Island + Overlapping Hero)
│   │   ├── TaskCard.vue          # كارد عرض الواجب أو الامتحان بنمط Squircle
│   │   ├── SubjectCard.vue       # كارد استعراض المادة الدراسية
│   │   ├── ScheduleCard.vue      # كارد الحصة بالجدول الأسبوعي
│   │   └── CalendarDayStrip.vue  # شريط تقويم الأيام الأفقي التفاعلي
│   │
│   ├── teacher/                  # مكونات واجهة المعلم
│   │   ├── TeacherLayout.vue     # إطار واجهة المعلم (Hero Card + 3-Stats Row)
│   │   ├── TeacherTaskCard.vue   # كارد الواجب أو الامتحان مع شارات الحلول المنشورة
│   │   ├── TaskCreateDialog.vue  # نافذة إدراج واجب/امتحان مع إرفاق الحلول النموذجية
│   │   └── ClassFilterPills.vue  # شريط كبسولات تصفية الفصول والشعب المسندة
│   │
│   └── admin/                    # المكونات المفككة للوحة تحكم الإدارة (Modular Admin Architecture)
│       ├── AdminHeader.vue       # الهيدر التنفيذي وقائمة macOS المنسدلة واختصارات الكيبورد
│       ├── KpiCardsGrid.vue      # شبكة بطاقات الإحصائيات ثلاثية الأبعاد (3D KPI Cards)
│       ├── GradesPanel/          # موديول الهيكل التعليمي
│       │   ├── GradesOverview.vue    # استعراض بطاقات الصفوف الـ 9
│       │   ├── GradeDetailsPanel.vue # تفاصيل الصف (الشعب والمواد وسجل الطلاب)
│       │   └── ClassDetailsPanel.vue # تفاصيل الشعبة وشبكة الجدول الأسبوعي (5×6)
│       ├── StudentsPanel/        # موديول سجلات الطلاب
│       │   ├── StudentRecordsTable.vue # جدول سجلات الطلاب وفلاتر البحث السريعة
│       │   └── StudentProfile.vue      # شاشة الملف التفصيلي للطالب (أكاديمي + ولي أمر)
│       ├── TeachersPanel/        # موديول المعلمين والتكليفات
│       │   ├── TeacherRecordsTable.vue # جدول المعلمين وأزرار الإجراءات
│       │   └── TeacherProfile.vue      # شاشة الملف الأكاديمي للمعلم وتكليفاته
│       ├── TimetableGrid.vue     # شبكة الجدول الأسبوعي التفاعلية لتخصيص الحصص
│       └── modals/               # كافة النوافذ المنبثقة للإدارة
│           ├── AddGradeModal.vue
│           ├── AddSectionModal.vue
│           ├── AddSubjectModal.vue
│           ├── AddStudentModal.vue
│           ├── TransferStudentModal.vue
│           ├── AddTeacherModal.vue
│           ├── AssignTeacherModal.vue
│           └── AssignSlotModal.vue
│
├── router/
│   └── index.js                  # تعريف المسارات وحراس التوجيه والأدوار (Role Guards)
├── services/
│   └── api.js                    # عميل Axios المركزي مع وسائط حقن التوكن ومعالجة 401
└── views/                        # شاشات العرض الكاملة (Views / Pages)
    ├── auth/
    │   └── LoginView.vue         # بوابة الدخول الموحدة للأدوار الثلاثة
    ├── student/
    │   ├── StudentDashboardView.vue  # لوحة الطالب الرئيسية
    │   ├── HomeworksView.vue         # صفحة الواجبات والحلول النموذجية
    │   ├── ExamsView.vue             # صفحة الامتحانات والاختبارات
    │   ├── ScheduleView.vue          # صفحة الجدول الأسبوعي
    │   └── SubjectsView.vue          # صفحة المواد المقررة
    ├── teacher/
    │   ├── TeacherDashboardView.vue  # لوحة المعلم الرئيسية
    │   ├── TeacherHomeworksView.vue  # إدارة ونشر الواجبات
    │   ├── TeacherExamsView.vue      # إدارة ونشر الامتحانات
    │   ├── TeacherScheduleView.vue   # جدول حصص المعلم
    │   └── TeacherSubjectsView.vue   # قائمة الفصول والمواد المسندة
    └── admin/
        └── AdminDashboardView.vue    # لوحة تحكم الإدارة المجمعة
```

---

## 2. مواصفات وواجهات المكونات المشتركة (Common UI Primitives Specs)

### أ. `BaseButton.vue` (زر تفاعلي معياري):
* **الـ Props:**
  * `variant`: `'primary'` (بنفسجي), `'secondary'` (رمادي ناعم), `'danger'` (أحمر), `'ghost'` (شفاف).
  * `size`: `'sm'` (صغير), `'md'` (متوسط), `'lg'` (عريض).
  * `loading`: `Boolean` (لتفعيل مؤشر التحميل الدوار).
  * `disabled`: `Boolean`.
  * `icon`: `String` (اسم الأيقونة أو الإيموجي).
* **الـ Emits:** `@click`.

---

### ب. `CustomSelect.vue` (قائمة منسدلة احترافية):
* **الـ Props:**
  * `modelValue`: القيمة المختارة الحالية (`v-model`).
  * `options`: مصفوفة الكائنات `[{ label: 'الصف الخامس', value: 5 }]`.
  * `placeholder`: نص العنصر الافتراضي.
  * `searchable`: `Boolean` (لتفعيل حقل البحث السريع داخل القائمة).
* **الـ Emits:** `@update:modelValue`.

---

### ج. `ShadcnDrawer.vue` (الدرج المنزلق):
* **الـ Props:**
  * `modelValue`: حالة الفتح/الإغلاق (`Boolean`).
  * `title`: عنوان الدرج.
  * `description`: وصف فرعي.
  * `icon`: أيقونة الترويسة.
  * `position`: `'bottom'` (للهواتف والطالب) أو `'right'` (لشاشات المعلم).
* **الـ Slots:** `#default` (المحتوى الرئيسي), `#footer` (أزرار الإجراءات).

---

### د. `ShadcnDialog.vue` (النافذة المنبثقة المركزية):
* **الـ Props:**
  * `modelValue`: حالة الظهور (`Boolean`).
  * `title`: عنوان النافذة.
  * `description`: نص توضيحي.
  * `icon`: أيقونة الترويسة.
  * `maxWidth`: عرض النافذة (`'sm'`, `'md'`, `'lg'`).
* **الـ Emits:** `@update:modelValue`, `@confirm`, `@cancel`.

---

### هـ. `MobileNav.vue` (شريط التنقل السفلي العائم):
* كبسولة زجاجية مثبتة أسفل الشاشة (`position: fixed; bottom: 16px`) بتأثير `backdrop-filter: blur(16px)`.
* تتضمن 5 أزرار رئيسية مع مؤشر النقطة المضيئة وحركة الارتفاع `-4px` للتبويب النشط.

---

## 3. قواعد وهندسة بناء المكونات (Component Design Rules)

1. **الاعتماد الصارم على `<script setup>` (Composition API):**
   * كتابة كافة المكونات باستخدام Composition API مع استيراد دوال Vue الصريحة (`ref`, `computed`, `onMounted`, `watch`).
2. **فصل المسؤوليات ومنع التضخم (Modular Decoupling):**
   * تجنب كتابة شاشات تتجاوز 400 سطر؛ يجب نقل الجداول، الكروت، والنوافذ المنبثقة إلى مكونات فرعية في مجلدات `components/`.
3. **التواصل الصاعد والهابط القياسي (Props Down, Events Up):**
   * تمرير البيانات للأبناء عبر `Props`.
   * إشعار الآباء بالتغييرات أو طلبات التعديل/الحذف عبر `Emits` (`defineEmits(['update', 'delete'])`).
4. **التنسيق المغلف (Scoped CSS & Design Tokens):**
   * كتابة كافة التنسيقات داخل `<style scoped>` مع استدعاء متغيرات الألوان والظلال والزوايا من `main.css` لضمان التوافق البصري الكامل.
