# الدليل الشامل للتطوير باستخدام الذكاء الاصطناعي (Master AI Development & Prompting Guide)

تم إعداد هذا الدليل ليكون المرجع الصارم لكافة نماذج الذكاء الاصطناعي (AI / LLM Agents) والمطورين عند المساهمة في كتابة، تعديل، صيانة، أو إعادة هيكلة (Refactoring) كود هذا المشروع، لضمان الالتزام الكامل بالمعمارية المعتمدة ونظام التصميم وقواعد الأمان.

---

## 1. القواعد الذهبية الصارمة للذكاء الاصطناعي (Golden Rules for AI)

1. **حظر تغيير المعمارية والتقنيات (Zero Architectural Deviation):**
   * **Frontend:** مبني حصرياً بـ **Vue 3 Composition API** (`<script setup>`) و **Vite** مع تنسيقات **Vanilla CSS Design Tokens**. يُمنع منعاً باتاً استبدال Vue 3 أو إضافة مكتبات خارجية ثقيلة (مثل TailwindCSS أو Vuetify أو Bootstrap) ما لم يطلب المستخدم ذلك صراحة.
   * **Backend:** مبني بـ **Node.js** و **Express.js** بنمط REST مع **Stateless JWT**.
   * **Database:** محول استعلامات هجين يدعم **SQLite3** محلياً و **MySQL2** إنتاجياً.
2. **الالتزام المطلق بالنطاق (Scope Strictness):**
   * عند العمل على النسخة الأولى V1، التزم بـ V1 فقط (واجب لكل شعبة، حل نموذجي فوري، طلاب للقراءة فقط). لا تقم بإدراج ميزات V2 (مثل الجدولة المؤقتة للحلول، أو الفترات، أو النشر المتعدد) إلا عند طلب ترقية V2 صراحة.
3. **حظر توليد ميزات غير موثقة (Zero Hallucinated Features):**
   * أي مسار API أو شاشة أو حقل قاعدة بيانات يجب أن يستند حصرياً إلى ملفات التوثيق المعتمدة في مجلد `project-documentation/`.
4. **الأمان الصارم وعزل البيانات (Zero-Trust Tenant Isolation):**
   * في واجهات وطلبات الطالب، **لا تعتمد أبداً على `section_id` ممرر من العميل**. يجب استخراجه في الـ Backend حصراً من `req.user.sectionId` المشفر في توكن الـ JWT.

---

## 2. مصفوفة السياق الإلزامي للقراءة قبل الكود (Mandatory Context Matrix)

قبل البدء في تنفيذ أي مهمة برمجية، **يجب على الـ AI قراءة الملفات التالية ذات الصلة أولاً**:

| نوع المهمة المطلوبة | الملفات الإلزامية للقراءة والفهم أولاً |
| :--- | :--- |
| **تطوير أو تعديل شاشات الطالب** | 1. [**`STUDENT_FRONTEND_SPEC.md`**](./frontend/STUDENT_FRONTEND_SPEC.md)<br>2. [**`FRONTEND_OVERVIEW.md`**](./frontend/FRONTEND_OVERVIEW.md)<br>3. `design/DESIGN_SPEC.md` (لتطبيق كروت iOS والزجاج الضبابي) |
| **تطوير أو تعديل شاشات المعلم** | 1. [**`TEACHER_FRONTEND_SPEC.md`**](./frontend/TEACHER_FRONTEND_SPEC.md)<br>2. [**`TEACHER_API_REFERENCE.md`**](./backend/TEACHER_API_REFERENCE.md) |
| **تطوير أو تعديل لوحة تحكم الإدارة** | 1. [**`ADMIN_FRONTEND_SPEC.md`**](./frontend/ADMIN_FRONTEND_SPEC.md)<br>2. [**`ADMIN_API_REFERENCE.md`**](./backend/ADMIN_API_REFERENCE.md)<br>3. `template/ADMIN_UI_SPECIFICATIONS.md` |
| **تطوير أو تعديل مسارات الـ Backend** | 1. [**`BACKEND_ARCHITECTURE.md`**](./backend/BACKEND_ARCHITECTURE.md)<br>2. [**`DATABASE_AND_MIGRATIONS.md`**](./backend/DATABASE_AND_MIGRATIONS.md)<br>3. [**`AUTHENTICATION_AND_MIDDLEWARES.md`**](./backend/AUTHENTICATION_AND_MIDDLEWARES.md) |
| **تعديل قواعد البيانات أو العلاقات** | 1. [**`DATABASE_DESIGN.md`**](./DATABASE_DESIGN.md)<br>2. [**`BUSINESS_RULES.md`**](./BUSINESS_RULES.md)<br>3. [**`DATABASE_AND_MIGRATIONS.md`**](./backend/DATABASE_AND_MIGRATIONS.md) |

---

## 3. نماذج توجيه الذكاء الاصطناعي (AI Context Prompting Templates)

### أ. قالب تكليف بميزة متكاملة (Full-Stack Feature Prompt):
```markdown
أنت تعمل كـ Senior Software Architect و Full-Stack Developer في مشروع "نظام إدارة المدرسة المرتكز على الطالب".
المهمة المطلوبة: [اكتب المهمة البرمجية بدقة هنا]
المراجع الهندسية الإلزامية:
- مواصفات الواجهة: `project-documentation/frontend/[اسم_الملف].md`
- مواصفات الخادم: `project-documentation/backend/[اسم_الملف].md`
- قواعد الأعمال: `project-documentation/BUSINESS_RULES.md`

القواعد الصارمة للتنفيذ:
1. التزم بخط SF Arabic ونظام التصميم المعتمد (الزجاج الضبابي والبطاقات المتراكبة).
2. استخدم Vue 3 Composition API مع `<script setup>`.
3. لا تقبل معرف الشعبة للطالب من العميل بل استخرجه من `req.user.sectionId` في التوكن.
4. تأكد من معالجة حالات التحميل والأخطاء برسائل عربية واضحة.
```

---

### ب. قالب تكليف بتعديل أو بناء واجهة (Frontend UI Prompt):
```markdown
المهمة: بناء/تعديل مكون أو شاشة في الواجهة الأمامية.
الملف المستهدف: `frontend/src/[المسار]`
المرجع: `project-documentation/frontend/[SPEC_FILE].md`
القواعد:
- التزم بالهيكل المعياري في `COMPONENT_STRUCTURE.md`.
- استخدم `<style scoped>` مع استدعاء متغيرات CSS من `main.css`.
- لا تقم بدمج موديولات ضخمة في ملف View واحد؛ فكك العناصر إلى كروت ونوافذ فرعية.
```

---

## 4. استراتيجية تفكيك المهام الكبيرة (Atomic Task Decomposition Strategy)

عند تنفيذ ميزة كبيرة، يجب اتباع التسلسل الهندسي الذري التالي:
1. **الطبقة الأولى (Database):** مراجعة استعلامات DDL في `DATABASE_AND_MIGRATIONS.md` والتأكد من القيود والمفاتيح الأجنبية.
2. **الطبقة الثانية (Backend):** كتابة دوال المعالج في `controllers/` وتطبيق وسيط الصلاحية `requireRole` والاستعلامات المعلمة (`?`).
3. **الطبقة الثالثة (Frontend Components):** بناء المكونات البصرية الصغرى (Sub-components) في `components/` واستخدام الـ Props والـ Emits.
4. **الطبقة الرابعة (Integration & Testing):** ربط الشاشة بـ Axios واختبار تدفق المستخدم الكامل وحالات الـ Error والـ Loading.

---

## 5. معايير قبول الكود ومراجعة الجودة (Definition of Done - DoD)

* ✅ **التوافق البصري:** دعم كامل لـ RTL، خط SF Arabic، وتناسق الألوان والظلال والبطاقات المتراكبة (-50px) ومجسمات الـ 3D.
* ✅ **النظافة المعمارية:** عدم دمج شاشات ضخمة متراكمة في ملف واحد (تجنب ملفات الـ Monolithic Views)؛ بل تفكيكها إلى مكونات مستقلة وقابلة لإعادة الاستخدام في مجلد `src/components/`.
* ✅ **الاستجابات المعيارية:** إرجاع رسائل باللغة العربية واضحة وسهلة الفهم للمستخدم النهائي في حال الخطأ أو النجاح.
* ✅ **الأمان:** حظر الاعتماد على مدخلات غير موثوقة، واستخدام الاستعلامات المعلمة (`?`) لمنع هجمات SQL Injection.
* ✅ **الأداء والتجاوب:** عمل الشاشات بسلاسة على الهواتف الذكية والأجهزة اللوحية والشاشات المكتبية الواسعة.
