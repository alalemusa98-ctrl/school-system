# 📝 03. مواصفات ومكون عرض الامتحانات (`ExamList`)

> **الملف المرجعي:** [`Views-api/student/exams/03_EXAM_LIST.md`](file:///c:/Users/alhareth/Desktop/work/school-system/Views-api/student/exams/03_EXAM_LIST.md)  
> **اسم المكون البرمجي:** `ExamList.vue`  
> **الوصف:** المكون الرئيسي المخصص لعرض جدول امتحانات الطالب وكروت الأيام (الجزء الثالث في التصميم المعتمد)، حيث يحتوي على كروت المجموعات اليومية المزودة برقم النتوء العلوي (Notch Badge)، عنوان اليوم، شبكة بطاقات مواد الامتحانات الثنائية (Squircle Grid)، تاريخ الإعلان أو اليوم في الأسفل، وتكامل الدرج الجاني (Side Drawer) والنافذة المنبثقة للحل الاسترشادي (Model Solution Modal).

---

## 📸 1. الوصف البصري والتشريحي للجزء (Component Anatomy)

```
+-----------------------------------------------------------------------+
|                                (  1  )                                |
|  +-----------------------------------------------------------------+  |
|  |                          يوم الأحد                              |  |
|  |                                                                 |  |
|  |  +---------------------------+   +---------------------------+  |  |
|  |  | [ 🔬 ]              محدد  |   | [ 📐 ]             تم الحل|  |  |
|  |  | العلوم العامة             |   | الرياضيات                 |  |  |
|  |  | أ. فاطمة العبيدي          |   | أ. أحمد سالم             |  |  |
|  |  +---------------------------+   +---------------------------+  |  |
|  |                                                                 |  |
|  |   📅 تاريخ اليوم: الأحد 16 أغسطس 2026                            |  |
|  +-----------------------------------------------------------------+  |
+-----------------------------------------------------------------------+
```

### عناصر عرض الامتحانات الكروت الأساسية:
1. **النتوء العلوي العائم (Top Notch Badge):** دائرة مرقمة متمركزة في النتوء العلوي للكارد لترتيب مجموعات أيام الامتحانات (`1` في النتوء).
2. **رأس الكارد اليومي (Header Title):** عنوان يوضح اسم اليوم `"يوم الأحد 16 أغسطس"`.
3. **شبكة السكواركل المزدوجة (2-Column Squircle Grid):**
   - شبكة ثنائية لبطاقات المواد المخصصة للامتحانات (`exam-squircle-click`).
   - **صندوق الأيقونة:** أيقونة المادة 3D أو الإيموجي داخل مربع دائر الحواف متناسق مع لون المادة.
   - **شارة الحالة:** كبسولة ملونة توضح حالة الامتحان (`"محدد"`, `"تم الحل"`, أو درجة الإجابة `"19.5/20"`).
   - **اسم المادة والمدرس:** اسم المادة ببنط عريض واسم المعلم المسؤول في الأسفل.
4. **تاريخ اليوم في الأسفل (Footer Date):** تاريخ يوم الامتحان الفعلي مرفق بأيقونة تقويم.
5. **الدرج النافذة (Side Drawer & Modal):** تفاصيل الامتحان، القاعة، الدرجة القصوى، والحل الاسترشادي عند النقر على أي مادة.

---

## 📐 2. كود المكون الكامل Vue 3 Component (`ExamList.vue`)

```vue
<template>
  <main class="hw-container">
    <!-- Loading State -->
    <div v-if="loading" class="loading-state">
      جاري استرجاع جدول الامتحانات... ⏳
    </div>

    <!-- Upcoming Exams View -->
    <div v-else-if="activeTab === 'upcoming'">
      <div v-if="groupedUpcomingExams.length === 0" class="empty-state">
        🎈 لا توجد امتحانات محددة حالياً لشعبتك!
      </div>

      <div v-else class="schedule-days-list">
        <article 
          v-for="group in groupedUpcomingExams" 
          :key="group.dateKey" 
          class="sched-ref-card"
        >
          <!-- 1. رقم المجموعة/اليوم في النتوء العلوي -->
          <div class="sched-ref-top-notch">
            {{ group.index }}
          </div>

          <!-- 2. اسم اليوم في رأس الكارد -->
          <div class="sched-ref-header-info">
            <h3 class="sched-ref-day-title">يوم {{ group.dayName }}</h3>
          </div>

          <!-- 3. شبكة مواد الامتحانات (زوز مواد كحد أقصى لكل صف) -->
          <div class="exam-ref-grid">
            <div 
              v-for="exam in group.exams" 
              :key="exam.id" 
              class="sched-subject-squircle exam-squircle-click"
              @click="openExamDrawer(exam)"
            >
              <!-- Squircle Icon -->
              <div class="sched-icon-box" :class="getSubjectColorClass(exam.subject_name)">
                <img v-if="getSubjectImage(exam.subject_name)" :src="getSubjectImage(exam.subject_name)" class="subject-3d-icon-render" alt="" />
                <span v-else>{{ getSubjectIcon(exam.subject_name) }}</span>
              </div>

              <!-- Status Badge -->
              <span class="sched-period-tag" :class="{ pending: !exam.has_solution }">
                {{ exam.has_solution ? 'تم الحل' : 'محدد' }}
              </span>

              <!-- Subject Name -->
              <h4 class="sched-subject-name" :title="exam.subject_name">{{ exam.subject_name }}</h4>

              <!-- Teacher Name -->
              <span class="sched-teacher-name" :title="exam.teacher_name || 'أستاذ المادة'">
                {{ exam.teacher_name || 'أستاذ المادة' }}
              </span>
            </div>
          </div>

          <!-- 4. تاريخ اليوم في الأسفل -->
          <div class="sched-ref-footer-date">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="16" y1="2" x2="16" y2="6"></line>
              <line x1="8" y1="2" x2="8" y2="6"></line>
              <line x1="3" y1="10" x2="21" y2="10"></line>
            </svg>
            <span>تاريخ اليوم: {{ group.dateFormatted }}</span>
          </div>
        </article>
      </div>
    </div>

    <!-- Exam Results Archive View -->
    <div v-else>
      <div v-if="groupedResultsExams.length === 0" class="empty-state">
        لا توجد نتائج اختبارات سابقة في السجل حالياً.
      </div>

      <div v-else class="schedule-days-list">
        <article 
          v-for="group in groupedResultsExams" 
          :key="group.dateKey" 
          class="sched-ref-card"
        >
          <!-- 1. Top Notch -->
          <div class="sched-ref-top-notch">
            {{ group.index }}
          </div>

          <!-- 2. Header Title -->
          <div class="sched-ref-header-info">
            <h3 class="sched-ref-day-title">نتائج يوم {{ group.dayName }}</h3>
          </div>

          <!-- 3. Squircle Grid -->
          <div class="exam-ref-grid">
            <div 
              v-for="exam in group.exams" 
              :key="exam.id" 
              class="sched-subject-squircle exam-squircle-click"
              @click="openExamDrawer(exam)"
            >
              <div class="sched-icon-box" :class="getSubjectColorClass(exam.subject_name)">
                <img v-if="getSubjectImage(exam.subject_name)" :src="getSubjectImage(exam.subject_name)" class="subject-3d-icon-render" alt="" />
                <span v-else>{{ getSubjectIcon(exam.subject_name) }}</span>
              </div>
              <span class="sched-period-tag success">{{ exam.score || '19.5/20' }}</span>
              <h4 class="sched-subject-name" :title="exam.subject_name">{{ exam.subject_name }}</h4>
              <span class="sched-teacher-name" :title="exam.teacher_name || 'أستاذ المادة'">
                {{ exam.teacher_name || 'أستاذ المادة' }}
              </span>
            </div>
          </div>

          <!-- 4. Date Footer -->
          <div class="sched-ref-footer-date">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
              <circle cx="12" cy="12" r="10"></circle>
              <polyline points="12 6 12 12 16 14"></polyline>
            </svg>
            <span>تاريخ الإعلان: {{ group.dateFormatted }}</span>
          </div>
        </article>
      </div>
    </div>

    <!-- Side Drawer details -->
    <ShadcnDrawer 
      v-model="isDrawerOpen" 
      :title="selectedExam ? selectedExam.title : 'تفاصيل الامتحان'"
      :description="selectedExam ? `مادة ${selectedExam.subject_name} • إعداد ${selectedExam.teacher_name || 'أستاذ المادة'}` : ''"
      :icon="selectedExam ? getSubjectIcon(selectedExam.subject_name) : '📝'"
    >
      <div v-if="selectedExam" class="drawer-exam-details">
        <div class="drawer-status-banner" :class="{ verified: selectedExam.has_solution }">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
          <span>{{ selectedExam.has_solution ? 'يتوفر حل استرشادي معتمد للامتحان' : 'موعد اختبار رسمي معتمد' }}</span>
        </div>

        <div class="drawer-info-grid">
          <div class="drawer-info-item">
            <span class="info-label">📅 تاريخ ووقت الإجراء</span>
            <span class="info-val">{{ selectedExam.due_date }}</span>
          </div>
          <div class="drawer-info-item">
            <span class="info-label">🏛️ القاعة واللجنة</span>
            <span class="info-val">{{ selectedExam.room || 'القاعة الرئيسية رقم 3' }}</span>
          </div>
        </div>

        <div class="drawer-section">
          <h4 class="drawer-section-title">📌 مفردات ونطاق الامتحان:</h4>
          <p class="drawer-text-content">
            {{ selectedExam.description || 'يشمل الامتحان الفصول 1 و 2 و 3 من الكتاب المدرسي المعتمد.' }}
          </p>
        </div>

        <div class="drawer-solution-card">
          <div class="sol-card-info">
            <h5>💡 الحل الاسترشادي النموذجي</h5>
            <p v-if="selectedExam.has_solution">ملف PDF يحتوي على الإجابة النموذجية المعتمدة.</p>
            <p v-else>لم يتم رفع الحل الاسترشادي من قبل أستاذ المادة بعد.</p>
          </div>
          <button 
            class="hw-ref-primary-pill-btn"
            :disabled="!selectedExam.has_solution"
            @click="openSolutionModal(selectedExam)"
          >
            عرض الحل الاسترشادي ➔
          </button>
        </div>
      </div>
    </ShadcnDrawer>
  </main>
</template>

<script setup>
import { ref } from 'vue';
import ShadcnDrawer from '../../../frontend/src/components/common/ShadcnDrawer.vue';

const props = defineProps({
  loading: { type: Boolean, default: false },
  activeTab: { type: String, default: 'upcoming' },
  groupedUpcomingExams: { type: Array, default: () => [] },
  groupedResultsExams: { type: Array, default: () => [] }
});

const isDrawerOpen = ref(false);
const selectedExam = ref(null);

function getSubjectColorClass(name) {
  if (!name) return 'default';
  if (name.includes('رياضيات')) return 'math';
  if (name.includes('علوم')) return 'science';
  if (name.includes('عرب')) return 'arabic';
  if (name.includes('إسلام')) return 'islamic';
  return 'default';
}

function getSubjectImage(name) {
  return null;
}

function getSubjectIcon(name) {
  if (!name) return '📝';
  if (name.includes('رياضيات')) return '📐';
  if (name.includes('علوم')) return '🔬';
  if (name.includes('عرب')) return '📖';
  if (name.includes('إنجليز')) return '🔤';
  if (name.includes('إسلام')) return '🕌';
  return '📝';
}

function openExamDrawer(exam) {
  selectedExam.value = exam;
  isDrawerOpen.value = true;
}

function openSolutionModal(exam) {
  alert(`فتح الحل الاسترشادي للامتحان: ${exam.title}`);
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

.schedule-days-list {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

/* Card Container with Top Notch */
.sched-ref-card {
  background: #ffffff;
  border-radius: 24px;
  padding: 24px 20px 16px;
  position: relative;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05);
  border: 1px solid #f1f5f9;
}

.sched-ref-top-notch {
  width: 44px;
  height: 44px;
  background: linear-gradient(135deg, #f43f5e 0%, #e11d48 100%);
  color: #ffffff;
  font-size: 18px;
  font-weight: 800;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: -22px;
  left: 50%;
  transform: translateX(-50%);
  border: 4px solid #f8fafc;
  box-shadow: 0 6px 14px rgba(225, 29, 72, 0.35);
}

.sched-ref-header-info {
  text-align: center;
  margin-bottom: 16px;
}

.sched-ref-day-title {
  font-size: 18px;
  font-weight: 800;
  color: #0f172a;
  margin: 0;
}

/* 2-Column Grid Layout */
.exam-ref-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 14px;
  margin-bottom: 16px;
}

.sched-subject-squircle {
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 20px;
  padding: 16px 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.sched-subject-squircle:hover {
  transform: translateY(-3px);
  background: #ffffff;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.06);
  border-color: #fca5a5;
}

.sched-icon-box {
  width: 48px;
  height: 48px;
  border-radius: 16px;
  background: #ffe4e6;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
}

.sched-period-tag {
  font-size: 11px;
  font-weight: 800;
  padding: 3px 8px;
  border-radius: 10px;
  background: #dcfce7;
  color: #166534;
}

.sched-period-tag.pending {
  background: #ffe4e6;
  color: #9f1239;
}

.sched-subject-name {
  font-size: 14px;
  font-weight: 800;
  color: #1e293b;
  margin: 2px 0 0;
  text-align: center;
}

.sched-teacher-name {
  font-size: 12px;
  color: #64748b;
  font-weight: 500;
}

.sched-ref-footer-date {
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

## ⚙️ 3. الـ Props و الـ Events الخاصة بـ `ExamList`

| اسم الـ Prop / Event | النوع | الوصف | القيمة الافتراضية |
| :--- | :--- | :--- | :--- |
| `loading` | `Boolean` | حالة التحميل من الـ Backend | `false` |
| `activeTab` | `String` | التاب الحالي النشط (`'upcoming'` أو `'results'`) | `'upcoming'` |
| `groupedUpcomingExams` | `Array` | مجموعات الامتحانات القادمة مفرزة حسب التاريخ | `[]` |
| `groupedResultsExams` | `Array` | مجموعات نتائج الامتحانات السابقة | `[]` |
