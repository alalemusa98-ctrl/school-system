# 📚 03. مواصفات ومكون عرض المواد والسكواركل (`SubjectList`)

> **الملف المرجعي:** [`Views-api/student/subjects/03_SUBJECT_LIST.md`](file:///c:/Users/alhareth/Desktop/work/school-system/Views-api/student/subjects/03_SUBJECT_LIST.md)  
> **اسم المكون البرمجي:** `SubjectList.vue`  
> **الوصف:** المكون الرئيسي المخصص لعرض كروت شبكة المواد المنهجية للطالب (الجزء الثالث في التصميم المعتمد)، حيث يحتوي كل كارت مادة على أيقونة النتوء العلوي 3D، عنوان المادة، كارتين سكواركل تفاعليين (كارت الواجبات وكارت الامتحانات)، اسم الأستاذ المسؤول في الأسفل، وتكامل العرض التفصيلي المباشر لمهام واختبارات المادة.

---

## 📸 1. الوصف البصري والتشريحي للجزء (Component Anatomy)

```
+-----------------------------------------------------------------------+
|                                ( 📐 )                                 |
|  +-----------------------------------------------------------------+  |
|  |                           مادة الرياضيات                       |  |
|  |                        المقرر الدراسي المعتمد                      |  |
|  |                                                                 |  |
|  |  +---------------------------+   +---------------------------+  |  |
|  |  | [ 📄 ]            الواجبات|   | [ 📝 ]          الامتحانات|  |  |
|  |  | תصفح الواجبات             |   | تصفح الامتحانات           |  |  |
|  |  +---------------------------+   +---------------------------+  |  |
|  |                                                                 |  |
|  |   👤 أستاذ المادة: أ. أحمد سالم                                 |  |
|  +-----------------------------------------------------------------+  |
+-----------------------------------------------------------------------+
```

### عناصر عرض المواد والكروت الأساسية:
1. **النتوء العلوي العائم (Subject Top Notch Badge):** أيقونة أو صورة 3D للمادة متمركزة في النتوء العلوي للكارد.
2. **رأس الكارد الرئيسي (Header Title & Subtitle):** عنوان يوضح اسم المادة `"مادة الرياضيات"` وعنوان فرعي `"المقرر الدراسي المعتمد"`.
3. **شبكة السكواركل المزدوجة لكل مادة (2-Column Action Grid):**
   - **كارت 1 (الواجبات):** يحتوي على أيقونة المستند السماوية Cyan، عنوان `"الواجبات"`، وشارة التصفح `"تصفح الواجبات"`.
   - **كارت 2 (الامتحانات):** يحتوي على أيقونة التقييم الوردي Pink، عنوان `"الامتحانات"`، وشارة التصفح `"تصفح الامتحانات"`.
4. **تذييل اسم المعلم في الأسفل (Teacher Footer Row):** اسم الأستاذ المسؤول مرفق بأيقونة معلم.

---

## 📐 2. كود المكون الكامل Vue 3 Component (`SubjectList.vue`)

```vue
<template>
  <main class="hw-container">
    <!-- Loading State -->
    <div v-if="loading" class="loading-state">
      جاري تحميل المواد الدراسية من قاعدة البيانات... ⏳
    </div>

    <!-- Main Subjects Grid View -->
    <div v-else-if="!selectedSubject">
      <div v-if="subjectsList.length === 0" class="empty-state">
        🎉 لا توجد مواد دراسية مضافة حالياً.
      </div>

      <div class="subjects-grid-list">
        <article 
          v-for="sub in subjectsList" 
          :key="sub.id" 
          class="subj-ref-card"
        >
          <!-- 1. أيقونة المادة في النتوء العلوي -->
          <div class="subj-ref-top-notch">
            <img v-if="getSubjectImage(sub.name)" :src="getSubjectImage(sub.name)" class="subject-3d-icon-render" alt="" />
            <span v-else>{{ getSubjectIcon(sub.name) }}</span>
          </div>

          <!-- 2. اسم المادة والتفاصيل -->
          <div class="subj-ref-header-info">
            <h3 class="subj-ref-title">مادة {{ sub.name }}</h3>
            <span class="subj-ref-subtitle">المقرر الدراسي المعتمد</span>
          </div>

          <!-- 3. كارتين عمليين: الواجبات والامتحانات -->
          <div class="subj-ref-action-grid">
            <!-- Card 1: الواجبات -->
            <div 
              class="action-squircle-card" 
              @click="$emit('select-subject-tab', { subject: sub, tab: 'homeworks' })"
            >
              <div class="squircle-icon-wrapper cyan">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                  <line x1="16" y1="13" x2="8" y2="13"></line>
                  <line x1="16" y1="17" x2="8" y2="17"></line>
                </svg>
              </div>
              <span class="action-card-label">الواجبات</span>
              <span class="action-card-badge cyan">تصفح الواجبات</span>
            </div>

            <!-- Card 2: الامتحانات -->
            <div 
              class="action-squircle-card" 
              @click="$emit('select-subject-tab', { subject: sub, tab: 'exams' })"
            >
              <div class="squircle-icon-wrapper pink">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="16" y1="2" x2="16" y2="6"></line>
                  <line x1="8" y1="2" x2="8" y2="6"></line>
                  <line x1="3" y1="10" x2="21" y2="10"></line>
                </svg>
              </div>
              <span class="action-card-label">الامتحانات</span>
              <span class="action-card-badge pink">تصفح الامتحانات</span>
            </div>
          </div>

          <!-- 4. تذييل اسم المعلم -->
          <div class="subj-ref-footer-row">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
            <span>أستاذ المادة: {{ sub.teacher_name || 'أستاذ المادة المعتمد' }}</span>
          </div>
        </article>
      </div>
    </div>
  </main>
</template>

<script setup>
const props = defineProps({
  loading: { type: Boolean, default: false },
  selectedSubject: { type: Object, default: null },
  subjectsList: { type: Array, default: () => [] }
});

const emit = defineEmits(['select-subject-tab']);

function getSubjectImage(name) {
  return null;
}

function getSubjectIcon(name) {
  if (!name) return '📖';
  if (name.includes('رياضيات')) return '📐';
  if (name.includes('علوم')) return '🔬';
  if (name.includes('عرب')) return '📖';
  if (name.includes('إنجليز')) return '🔤';
  if (name.includes('إسلام')) return '🕌';
  if (name.includes('حاسوب')) return '💻';
  return '📚';
}
</script>

<style scoped>
.hw-container {
  padding: 16px;
}

.loading-state, .empty-state {
  text-align: center;
  padding: 32px 16px;
  background: #ffffff;
  border-radius: 20px;
  font-weight: 700;
  color: #64748b;
  border: 1px dashed #cbd5e1;
}

.subjects-grid-list {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.subj-ref-card {
  background: #ffffff;
  border-radius: 24px;
  padding: 24px 20px 16px;
  position: relative;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05);
  border: 1px solid #f1f5f9;
}

.subj-ref-top-notch {
  width: 52px;
  height: 52px;
  background: linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%);
  color: #ffffff;
  font-size: 24px;
  border-radius: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: -26px;
  left: 50%;
  transform: translateX(-50%);
  border: 4px solid #f8fafc;
  box-shadow: 0 6px 14px rgba(2, 132, 199, 0.35);
}

.subj-ref-header-info {
  text-align: center;
  margin-bottom: 16px;
}

.subj-ref-title {
  font-size: 19px;
  font-weight: 800;
  color: #0f172a;
  margin: 0;
}

.subj-ref-subtitle {
  font-size: 12px;
  color: #64748b;
  font-weight: 600;
}

.subj-ref-action-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 14px;
  margin-bottom: 16px;
}

.action-squircle-card {
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 20px;
  padding: 16px 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.action-squircle-card:hover {
  transform: translateY(-3px);
  background: #ffffff;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.06);
  border-color: #bae6fd;
}

.squircle-icon-wrapper {
  width: 48px;
  height: 48px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.squircle-icon-wrapper.cyan {
  background: #e0f2fe;
  color: #0284c7;
}

.squircle-icon-wrapper.pink {
  background: #fce7f3;
  color: #db2777;
}

.action-card-label {
  font-size: 14px;
  font-weight: 800;
  color: #1e293b;
}

.action-card-badge {
  font-size: 11px;
  font-weight: 700;
  padding: 2px 8px;
  border-radius: 8px;
}

.action-card-badge.cyan {
  background: #e0f2fe;
  color: #0369a1;
}

.action-card-badge.pink {
  background: #fce7f3;
  color: #be185d;
}

.subj-ref-footer-row {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding-top: 12px;
  border-top: 1px dashed #e2e8f0;
  font-size: 13px;
  font-weight: 600;
  color: #64748b;
}
</style>
```

---

## ⚙️ 3. الـ Props و الـ Events الخاصة بـ `SubjectList`

| اسم الـ Prop / Event | النوع | الوصف | القيمة الافتراضية |
| :--- | :--- | :--- | :--- |
| `loading` | `Boolean` | حالة التحميل من الـ Backend | `false` |
| `selectedSubject` | `Object` | كائن المادة المحددة في الصفحة التفصيلية | `null` |
| `subjectsList` | `Array` | مصفوفة المواد المنهجية المقررة | `[]` |
| `@select-subject-tab` | `Event` | إشعار عند النقر على كارت واجبات أو امتحانات المادة | ترسل المادة والتاب |
