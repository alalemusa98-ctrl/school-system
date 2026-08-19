# الدليل الشامل لمسارات وتدفقات المستخدمين (Master User Workflows & Journey Diagrams)

يوفر هذا الدليل المخططات التفاعلية والمسارات الإجرائية الكاملة للعمليات التشغيلية في المنظومة من منظور الأدوار الثلاثة (الطالب، المعلم، والإدارة)، متضمناً معالجة الحالات الاستثنائية ونقاط اتخاذ القرار.

---

## 1. مسار رحلة الطالب الكاملة (Student User Journey)

```mermaid
flowchart TD
    Start([1. فتح بوابة الدخول /login]) --> ChooseTab[اختيار تبويب دخول الطالب 🎒]
    ChooseTab --> InputCredentials[إدخال رقم الجلوس + كود الطالب]
    InputCredentials --> PostAuth[إرسال POST /api/auth/login/student]
    
    PostAuth --> CheckAuth{هل البيانات صحيحة ومطابقة؟}
    CheckAuth -- لا --> ShowAuthError[عرض تنبيه: رقم الجلوس أو الكود غير صحيح] --> InputCredentials
    
    CheckAuth -- نعم --> SaveToken[تخزين التوكن المشفر وبيانات الطالب في localStorage]
    SaveToken --> LoadDash[تحميل لوحة الطالب الرئيسية /student]
    
    LoadDash --> ViewHero[استعراض الهيرو المتراكب وشريط تقويم الأيام والعدادات]
    
    ViewHero --> SelectNav{اختيار الوجهة من شريط التنقل السفلي}
    
    %% مسار الواجبات
    SelectNav -->|الواجبات 📚| LoadHW[فتح صفحة الواجبات /student/homeworks]
    LoadHW --> FilterHW[تصفية بالمواد: الكل، رياضيات، علوم...]
    FilterHW --> GroupedCards[استعراض كروت الواجبات المجمعة بالأيام sched-ref-card]
    GroupedCards --> ClickHW[النقر على كارت الواجب المحدد]
    ClickHW --> OpenDrawer[فتح درج تفاصيل الواجب ShadcnDrawer]
    OpenDrawer --> ReadDetails[قراءة نص وتوجيهات الواجب وتحميل المرفق الأصلي]
    ReadDetails --> CheckSol{هل has_solution = 1؟}
    CheckSol -- نعم --> ShowSolBtn[ظهور زر: عرض الحل النموذجي المعتمد 💡]
    ShowSolBtn --> ClickSol[النقر لعرض خطوات الحل وتنزيل ملف الحل المعتمد]
    CheckSol -- لا --> HideSol[إخفاء قسم الحل النموذجي كلياً]
    
    %% مسار الامتحانات
    SelectNav -->|الامتحانات 📝| LoadExams[فتح صفحة الامتحانات /student/exams]
    LoadExams --> ViewExamCards[استعراض مواعيد الاختبارات ونماذج الأسئلة]
    
    %% مسار الجدول
    SelectNav -->|الجدول 📅| LoadSched[فتح صفحة الجدول /student/schedule]
    LoadSched --> View30Slots[استعراض الحصص الـ 30 موزعة من الأحد للخميس وأسماء المعلمين]
    
    %% مسار المواد
    SelectNav -->|المواد 📖| LoadSubs[فتح صفحة المواد /student/subjects]
    LoadSubs --> ViewSubCards[استعراض المواد وأسماء أساتذة الفصل الفعليين]
```

---

## 2. مسار رحلة المعلم الأكاديمية (Teacher User Journey)

```mermaid
flowchart TD
    TStart([1. فتح بوابة الدخول /login]) --> TTab[اختيار تبويب دخول المعلم 👨‍🏫]
    TTab --> TInput[إدخال اسم المستخدم + كلمة المرور]
    TInput --> TLoginReq[POST /api/auth/login/teacher]
    
    TLoginReq --> TCheckAuth{صحة الاعتماد؟}
    TCheckAuth -- لا --> TShowErr[عرض رسالة خطأ الدخول] --> TInput
    
    TCheckAuth -- نعم --> TSave[حفظ التوكن والتوجيه لشاشة المعلم /teacher]
    TSave --> TLoadDash[تحميل لوحة المعلم واسترجاع الفصول المسندة teacher_assignments]
    
    TLoadDash --> TAction{ما هو الإجراء المطلوب؟}
    
    %% مسار نشر واجب
    TAction -->|نشر واجب جديد ➕| ClickAddHW[الضغط على زر: إضافة واجب جديد]
    ClickAddHW --> OpenCreateModal[فتح نافذة الإدراج ShadcnDialog]
    OpenCreateModal --> FillForm[إدخال العنوان، الوصف، واختيار الشعبة والمادة وتاريخ التسليم]
    FillForm --> AttachOriginal[رفع ملف الواجب الأصلي PDF/صورة اختياري]
    AttachOriginal --> ToggleSol{هل يرغب بإرفاق حل نموذجي؟}
    ToggleSol -- نعم --> EnterSolData[كتابة نص الحل ورفع ملف الحل النموذجي]
    ToggleSol -- لا --> SubmitHW[الضغط على: نشر الواجب للطلاب 🚀]
    EnterSolData --> SubmitHW
    SubmitHW --> PostTaskReq[إرسال POST /api/teacher/tasks FormData]
    PostTaskReq --> VerifyAssignment{هل المعلم مكلف بالفصل والمادة؟}
    VerifyAssignment -- لا --> Ret403[403 Forbidden: أنت غير مكلف بهذه الشعبة]
    VerifyAssignment -- نعم --> SuccessTask[201 Created: ظهور الواجب فورياً في حسابات طلاب الشعبة]
    
    %% مسار إدارة المهام والحلول
    TAction -->|إدارة المهام والحذف| ViewTaskList[استعراض المهام وتصفيتها بالفصول المسندة]
    ViewTaskList --> ClickTask[النقر على مهمة لفتح الدرج الجانبي]
    ClickTask --> PreviewDrawer[معاينة التفاصيل والحل النموذجي المنشور]
    PreviewDrawer --> DeleteAction[الضغط على: حذف هذا الواجب نهائياً 🗑️]
    DeleteAction --> ConfirmDel[تأكيد الحذف ➔ إرسال DELETE /api/teacher/tasks/:id]
    ConfirmDel --> DoneDel[إزالة المهمة فورياً من المنظومة وقاعدة البيانات]
```

---

## 3. مسارات لوحة تحكم الإدارة (Admin Executive Workflows)

```mermaid
flowchart TD
    AStart([1. تسجيل دخول الإدارة /login]) --> ALogin[دخول المشرف admin / admin123]
    ALogin --> ADash[لوحة القيادة التنفيذية /admin مع بطاقات 3D KPI]
    
    ADash --> AModuleChoice{اختيار الموديول المطلوب}
    
    %% موديول الهيكل
    AModuleChoice -->|الهيكل والصفوف| GradesMod[لوحة الصفوف الـ 9 GradesPanel]
    GradesMod --> GradeActions{الإجراء}
    GradeActions --> AddG[إضافة صف دراسي جديد]
    GradeActions --> OpenGradeDetails[النقر على الصف ➔ فتح تفاصيل الصف والشعب والمواد]
    OpenGradeDetails --> AddSec[إضافة شعبة جديدة 5ج]
    OpenGradeDetails --> AddSub[إضافة مادة جديدة]
    OpenGradeDetails --> OpenClassDetails[النقر على الشعبة ➔ فتح تفاصيل الشعبة والجدول]
    
    %% موديول الطلاب
    AModuleChoice -->|سجلات الطلاب| StuMod[لوحة الطلاب StudentRecordsTable]
    StuMod --> StuActions{الإجراء}
    StuActions --> AddStu[تسجيل طالب جديد: الاسم، رقم الجلوس، الكود، الصف، الشعبة]
    StuActions --> ClickStu[النقر على طالب ➔ فتح الملف التفصيلي للطالب StudentProfile]
    ClickStu --> ViewStuProfile[استعراض البطاقة الأكاديمية وبطاقة ولي الأمر والتواصل]
    ViewStuProfile --> TransferStu[نقل الطالب لشعبة أخرى أو تعديل بياناته]
    
    %% موديول المعلمين
    AModuleChoice -->|المعلمين والتكليفات| TeachMod[لوحة المعلمين TeacherRecordsTable]
    TeachMod --> TeachActions{الإجراء}
    TeachActions --> AddTeach[إنشاء حساب معلم جديد مع تشفير كلمة المرور]
    TeachActions --> ClickTeach[النقر على اسم المعلم ➔ فتح الملف الأكاديمي للمعلم TeacherProfile]
    ClickTeach --> AssignSubject[تكليف المعلم بمادة وشعبة جديدة]
    ClickTeach --> RemoveAssign[إزالة تكليف مادة من نصاب المعلم]
    
    %% موديول الجدول الأسبوعي
    AModuleChoice -->|بناء الجدول الأسبوعي| SchedMod[شبكة الجدول الأسبوعي 5x6 لشعبة محددة]
    SchedMod --> ClickSlot[النقر على خانة حصة فارغة أو محجوزة]
    ClickSlot --> OpenSlotModal[فتح نافذة تخصيص الحصة: اختيار المادة والمعلم]
    OpenSlotModal --> SaveSlot[حفظ الحصة بنمط Upsert ➔ تظهر فوراً في جدول الطالب والمعلم]
    SchedMod --> ClearSlot[تفريغ الحصة من الجدول]
```

---

## 4. مصفوفة معالجة الحالات الخاصة والتعافي من الأخطاء (Edge Cases & Error Handling)

| السيناريو والحالة الاستثنائية | السلوك البرمجي والإجراء المتبع في المنظومة |
| :--- | :--- |
| **محاولة الدخول برقم جلوس غير مسجل أو كود خاطئ** | إرجاع `401 Unauthorized` وعرض شريط تنبيه أحمر ناعم أسفل النموذج دون إفراغ الحقول لمساعدة المستخدم على التصحيح. |
| **انتهاء صلاحية التوكن (Token Expired) أثناء التصفح** | يقوم `Axios Response Interceptor` باعتراض استجابة `401` فورياً، وتفريغ التخزين المحلي `localStorage`، وتحويل المتصفح لصفحة `/login`. |
| **محاولة طالب فتح رابط إداري (`/admin`) أو صفحة معلم** | يتدخل حارس المسارات (`router.beforeEach`) فورياً ويعيد توجيه الطالب إلى واجهته الرئيسية `/student` دون السماح بعرض أي مكوّن. |
| **محاولة معلم نشر واجب لشعبة غير مكلف بها** | يعترض الـ Backend الطلب عبر فحص جدول `teacher_assignments` ويرجع كود `403 Forbidden` برسالة واضحة تلغي العملية. |
| **تخصيص حصة في الجدول لخانة مشغولة مسبقاً** | تطبيق استراتيجية `Upsert / Overwrite` فيتم استبدال المادة والمعلم وتحديث الخانة مباشرة دون تعارض. |
| **حذف صف أو شعبة أو معلم مسند له جداول ومهام** | تفعيل الحذف التتابعي (`ON DELETE CASCADE`) لحذف كافة الارتباطات التابعة تلقائياً ومنع السجلات اليتيمة. |
| **رفع ملف بحجم أكبر من 10MB أو بامتداد غير مسموح** | اعتراض الطلب في وسيط Multer وإرجاع خطأ `400 Bad Request` باللغة العربية: *"يرجى رفع ملف PDF أو صورة فقط وبحد أقصى 10MB"*. |
