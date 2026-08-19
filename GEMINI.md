# Project AI Operating Rules & Master Directives (دستور المنظومة للـ AI)

> **الحالة:** إلزامي وتلقائي (Enforced Rule) لكل تفاعل أو جلسة تطوير ذكاء اصطناعي في هذا المشروع.
> **المصدر المرجعي الأعلى (Single Source of Truth):** مجلد [`project-documentation/`](./project-documentation/) هو المرجع الحصري لكافة القرارات الهندسية، المعمارية، قواعد البيانات، والواجهات.

---

## 🛑 1. القواعد الحتمية والخطوط الحمراء (Non-Negotiable Red Lines)

1. **حظر التوسع في النطاق (Zero Scope Creep):**
   * الرجوع الإلزامي إلى [`project-documentation/MVP_BOUNDARY.md`](./project-documentation/MVP_BOUNDARY.md).
   * يُمنع منعاً باتاً إضافة أي ميزات، حقول، أو جداول تنتمي لـ V2 أو خارج نطاق V1 المحدد.

2. **قاعدة العزل الأمني الصارم للطلاب (Zero-Trust Isolation):**
   * يُستخرج `section_id` للطالب حصراً من التوكن المفكك (`req.user.sectionId`) في الـ Backend.
   * لا يُقبل ولا يُطلب `section_id` عبر `req.params` أو `req.query` أو `req.body` في أي مسار خاص بالطالب.

3. **قاعدة التحقق والتتبع قبل أي تعديل برمجياً:**
   * قبل البدء بكتابة أو تعديل أي كود، يجب تحديد كود الميزة ومسارها الكامل في [`project-documentation/TRACEABILITY_MATRIX.md`](./project-documentation/TRACEABILITY_MATRIX.md):
     $$\text{Feature Code} \to \text{Business Rule} \to \text{DB Table} \to \text{API} \to \text{Frontend Component} \to \text{Step}$$

4. **معايير إغلاق المهام والجودة (Definition of Done):**
   * لا تُعتبر أي خطوة (Step) أو مهمة (Task) مكتملة إلا بعد اجتياز معايير الجودة، الأمان، والتكامل المعرفة في [`project-documentation/DEFINITION_OF_DONE.md`](./project-documentation/DEFINITION_OF_DONE.md).

---

## 🗺️ 2. خريطة الملفات المرجعية وسياق التنفيذ (Context Router)

عند تنفيذ أي مهمة، يجب على الـ AI استدعاء الملفات الإلزامية التالية كمرجع وحيد:

| نطاق العمل | الملفات المرجعية الإلزامية في `project-documentation/` |
| :--- | :--- |
| **التخطيط والتسلسل العام** | [`DEVELOPMENT_ROADMAP.md`](./project-documentation/DEVELOPMENT_ROADMAP.md) و [`IMPLEMENTATION_STEPS.md`](./project-documentation/IMPLEMENTATION_STEPS.md) |
| **قواعد ونطاق الـ MVP** | [`MVP_BOUNDARY.md`](./project-documentation/MVP_BOUNDARY.md) و [`BUSINESS_RULES.md`](./project-documentation/BUSINESS_RULES.md) |
| **قواعد البيانات والـ Schema** | [`DATABASE_DESIGN.md`](./project-documentation/DATABASE_DESIGN.md) و [`backend/DATABASE_AND_MIGRATIONS.md`](./project-documentation/backend/DATABASE_AND_MIGRATIONS.md) |
| **الـ Backend والـ APIs** | [`backend/BACKEND_ARCHITECTURE.md`](./project-documentation/backend/BACKEND_ARCHITECTURE.md) و ملفات `*_API_REFERENCE.md` |
| **المصادقة والصلاحيات (Auth/RBAC)**| [`USERS_AND_ROLES.md`](./project-documentation/USERS_AND_ROLES.md) و [`backend/AUTHENTICATION_AND_MIDDLEWARES.md`](./project-documentation/backend/AUTHENTICATION_AND_MIDDLEWARES.md) |
| **الواجهات الأمامية (Frontend & UI)**| [`frontend/FRONTEND_OVERVIEW.md`](./project-documentation/frontend/FRONTEND_OVERVIEW.md) و ملفات `*_FRONTEND_SPEC.md` و [`COMPONENT_STRUCTURE.md`](./project-documentation/COMPONENT_STRUCTURE.md) |
| **سير العمل وتجربة المستخدم** | [`USER_WORKFLOWS.md`](./project-documentation/USER_WORKFLOWS.md) |

---

## ⚙️ 3. المواصفات التقنية الثابتة (Tech Stack Spec)

* **الخادم والـ Backend:** `Node.js` + `Express.js` + محول هجين `SQLite` (تطوير) / `MySQL` (إنتاج) + `JWT` + `bcryptjs` + `Multer`.
* **الواجهة والـ Frontend:** `Vue 3` (Composition API, `<script setup>`) + `Vue Router` + `Axios` + خط `SF Arabic` + مكونات نمط iOS للطالب والمعلم ولوحة SaaS للإدارة.
* **الروابط:** جميع الروابط داخل الوثائق يجب أن تكون نسبية (`./...`) وتبدأ شجرتها المرجعية من مجلد `project-documentation/`.
