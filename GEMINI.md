# Project AI Operating Rules & Master Directives (دستور المنظومة للـ AI)

> **الحالة:** إلزامي وتلقائي (Enforced Rule) لكل تفاعل أو جلسة تطوير ذكاء اصطناعي في هذا المشروع.
> **المصدر المرجعي الأعلى الموحد (Single Source of Truth):** مجلد [`project-documentation-v2/`](./project-documentation-v2/) مع مجلد [`Rest-api/`](./Rest-api/) هما المرجع الحصري لكافة القرارات الهندسية، المعمارية، قواعد البيانات، والواجهات.

---

## 🛑 1. القواعد الحتمية والخطوط الحمراء (Non-Negotiable Red Lines)

1. **حظر التوسع في النطاق (Zero Scope Creep):**
   * الرجوع الإلزامي إلى [`project-documentation-v2/01_SYSTEM_OVERVIEW.md`](./project-documentation-v2/01_SYSTEM_OVERVIEW.md) و [`project-documentation-v2/02_BUSINESS_RULES.md`](./project-documentation-v2/02_BUSINESS_RULES.md).
   * يُمنع منعاً باتاً إضافة أي ميزات، حقول، أو جداول تنتمي لـ V2 أو خارج نطاق V1 المحدد.

2. **قاعدة العزل الأمني الصارم للطلاب (Zero-Trust Isolation):**
   * يُستخرج `section_id` للطالب حصراً من التوكن المفكك (`req.user.sectionId`) في الـ Backend.
   * لا يُقبل ولا يُطلب `section_id` عبر `req.params` أو `req.query` أو `req.body` في أي مسار خاص بالطالب.

3. **قاعدة التحقق والتتبع قبل أي تعديل برمجياً:**
   * قبل البدء بكتابة أو تعديل أي كود، يجب مراجعة مصفوفة التتبع في [`project-documentation-v2/05_TRACEABILITY_MATRIX.md`](./project-documentation-v2/05_TRACEABILITY_MATRIX.md):
     $$\text{Feature Code} \to \text{Business Rule} \to \text{DB Table} \to \text{API} \to \text{Frontend Component}$$

---

## 🗺️ 2. خريطة الملفات المرجعية وسياق التنفيذ (Context Router)

عند تنفيذ أي مهمة، يجب على الـ AI استدعاء الملفات الإلزامية التالية كمرجع وحيد:

| نطاق العمل | الملفات المرجعية الإلزامية الموحدة |
| :--- | :--- |
| **النظرة العامة ومكدس التقنيات** | [`project-documentation-v2/01_SYSTEM_OVERVIEW.md`](./project-documentation-v2/01_SYSTEM_OVERVIEW.md) |
| **قواعد ومنطق العمل (Business Rules)**| [`project-documentation-v2/02_BUSINESS_RULES.md`](./project-documentation-v2/02_BUSINESS_RULES.md) |
| **قواعد البيانات والـ Schema** | [`project-documentation-v2/03_DATABASE_BLUEPRINT.md`](./project-documentation-v2/03_DATABASE_BLUEPRINT.md) و [`Rest-api/DATABASE_SCHEMA.md`](./Rest-api/DATABASE_SCHEMA.md) |
| **الـ Backend والمعمارية** | [`project-documentation-v2/04_BACKEND_ARCHITECTURE.md`](./project-documentation-v2/04_BACKEND_ARCHITECTURE.md) |
| **مصفوفة التتبع وتطابق الميزات** | [`project-documentation-v2/05_TRACEABILITY_MATRIX.md`](./project-documentation-v2/05_TRACEABILITY_MATRIX.md) |
| **دليل ومعايير تطوير الذكاء الاصطناعي** | [`project-documentation-v2/06_AI_DEVELOPMENT_GUIDE.md`](./project-documentation-v2/06_AI_DEVELOPMENT_GUIDE.md) |
| **شاشات وموديلات الـ Frontend والـ APIs** | [`Rest-api/STUDENT_REST_API.md`](./Rest-api/STUDENT_REST_API.md) و [`Rest-api/TEACHER_REST_API.md`](./Rest-api/TEACHER_REST_API.md) و [`Rest-api/ADMIN_REST_API.md`](./Rest-api/ADMIN_REST_API.md) |

---

## ⚙️ 3. المواصفات التقنية الثابتة (Tech Stack Spec)

* **الخادم والـ Backend:** `Node.js` + `Express.js` + محول هجين `SQLite` (تطوير) / `MySQL` (إنتاج) + `JWT` + `bcryptjs` + `Multer`.
* **الواجهة والـ Frontend:** `Vue 3` (Composition API, `<script setup>`) + `Vue Router` + `Axios` + خط `SF Arabic` + مكونات نمط iOS للطالب والمعلم ولوحة SaaS للإدارة.
* **الروابط:** جميع الروابط داخل الوثائق نسبية (`./...`).
