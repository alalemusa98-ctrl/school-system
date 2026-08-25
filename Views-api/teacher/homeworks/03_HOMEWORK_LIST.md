# 📚 03. مواصفات ومكون عرض الواجبات للمعلم (`TeacherHomeworkList`)

> **الملف المرجعي:** [`Views-api/teacher/homeworks/03_HOMEWORK_LIST.md`](file:///c:/Users/alhareth/Desktop/work/school-system/Views-api/teacher/homeworks/03_HOMEWORK_LIST.md)  
> **اسم المكون البرمجي:** `TeacherHomeworkList.vue`  
> **التصميم المرجعي المعتمد:** مطابق 100% لمواصفات [`Views-api/student/homeworks/03_HOMEWORK_LIST.md`](file:///c:/Users/alhareth/Desktop/work/school-system/Views-api/student/homeworks/03_HOMEWORK_LIST.md)  
> **الوصف:** المكون التنفيذي الرئيسي لعرض بطاقات الواجبات المنشورة للمعلم مجمعة بالأيام مع نتوء الترتيب العلوي الدائري (54px Top Notch Badge)، والشبكة الثنائية (2-Column Squircle Grid)، وتاريخ التسليم المنسق في الأسفل، مع دعم دراوير التفاصيل ومودل إضافة الواجب ومودل الحل النموذجي.

---

## 📸 1. الوصف البصري والتشريحي للجزء (Component Anatomy)

```
+-----------------------------------------------------------------------+
|                                (  1  )                                |
|  +-----------------------------------------------------------------+  |
|  |                        واجبات يوم الأحد                         |  |
|  |                                                                 |  |
|  |  +---------------------------+   +---------------------------+  |  |
|  |  | [ 📐 ]          تم الحل ✅ |   | [ 🔬 ]        بدون حل 📝  |  |  |
|  |  | تمارين القسمة ص 45        |   | تجارب المادة والطاقة      |  |  |
|  |  | الرياضيات • الصف 5 (أ5)    |   | العلوم • الصف 5 (ب5)      |  |  |
|  |  +---------------------------+   +---------------------------+  |  |
|  |                                                                 |  |
|  |   📅 تاريخ التسليم: الأحد 16 أغسطس 2026                         |  |
|  +-----------------------------------------------------------------+  |
+-----------------------------------------------------------------------+
```

### عناصر قائمة الواجبات الأساسية:
1. **النتوء العلوي العائم (54px Top Notch Badge):** دائرة مرقمة متمركزة في النتوء العلوي للكارد لترتيب مجموعات الأيام بتدرج لوني وبوردر عريض أبيض (`border: 8px solid #fff`).
2. **رأس الكارد اليومي (Header Title):** عنوان يوضح اسم اليوم (`"واجبات يوم الأحد"`).
3. **شبكة السكواركل المزدوجة (2-Column Squircle Grid):**
   - شبكة ثنائية لبطاقات المواد القابلة للنقر (`sched-subject-squircle`).
   - **صندوق الأيقونة:** مربع دائر الحواف متناسق مع لون المادة أو صورة المادة 3D.
   - **شارة الحالة:** كبسولة ملونة توضح حالة الحل (`"تم الحل ✅"` أو `"بدون حل 📝"`).
   - **عنوان الواجب واسم المادة والشعبة:** خط عريض ومقروء.
4. **تاريخ التسليم في الأسفل (Footer Date):** تاريخ الاستحقاق الفعلي مرفق بأيقونة تقويم.

---

## 📐 2. كود المكون الكامل Vue 3 Component (`TeacherHomeworkList.vue`)

```vue
<template>
  <main class="hw-container">
    <!-- Loading State -->
    <div v-if="loading" class="loading-state">
      جاري استرجاع الواجبات المدرسية... ⏳
    </div>

    <!-- Empty State -->
    <div v-else-if="filteredGroupedList.length === 0" class="empty-state">
      <span style="font-size: 40px; display: block; margin-bottom: 8px;">📭</span>
      <span>لا توجد واجبات مسجلة في هذا القسم أو الشعبة.</span>
    </div>

    <!-- Grouped Homeworks List -->
    <div v-else class="schedule-days-list">
      <article 
        v-for="(group, gIndex) in filteredGroupedList" 
        :key="group.dateKey" 
        class="sched-ref-card"
      >
        <!-- 1. Top Notch Badge (54px with 352deg gradient & inset shadow) -->
        <div class="sched-ref-top-notch">
          {{ gIndex + 1 }}
        </div>

        <!-- 2. Header Day Title -->
        <div class="sched-ref-header-info">
          <h3 class="sched-ref-day-title">واجبات يوم {{ group.dayName }}</h3>
        </div>

        <!-- 3. Squircle 2-Column Grid -->
        <div class="exam-ref-grid">
          <div 
            v-for="hw in group.items" 
            :key="hw.id" 
            class="sched-subject-squircle hw-squircle-click"
            @click="openHomeworkDrawer(hw)"
          >
            <!-- Squircle Icon Box -->
            <div class="sched-icon-box" :class="getSubjectColorClass(hw.subject_name)">
              <img v-if="getSubjectImage(hw.subject_name)" :src="getSubjectImage(hw.subject_name)" class="subject-3d-icon-render" alt="" />
              <span v-else>{{ getSubjectIcon(hw.subject_name) }}</span>
            </div>

            <!-- Status Tag -->
            <span class="sched-period-tag" :class="{ pending: !hw.has_solution }">
              {{ hw.has_solution ? 'تم الحل ✅' : 'بدون حل 📝' }}
            </span>

            <!-- Subject & Task Title -->
            <h4 class="sched-subject-name" :title="hw.title">{{ hw.title }}</h4>

            <!-- Class / Section Name -->
            <span class="sched-teacher-name" :title="`${hw.subject_name} • ${hw.section_name || hw.grade_name}`">
              {{ hw.subject_name }} • {{ hw.section_name || hw.grade_name }}
            </span>
          </div>
        </div>

        <!-- 4. Date Footer -->
        <div class="sched-ref-footer-date">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
            <line x1="16" y1="2" x2="16" y2="6"></line>
            <line x1="8" y1="2" x2="8" y2="6"></line>
            <line x1="3" y1="10" x2="21" y2="10"></line>
          </svg>
          <span>تاريخ التسليم: {{ group.formattedDate }}</span>
        </div>
      </article>
    </div>

    <!-- Details Drawer & Modals -->
    <Teleport to="body">
      <div v-if="selectedHomework" class="drawer-backdrop" @click="closeDrawer">
        <div class="drawer-content" @click.stop>
          <div class="drawer-handle"></div>

          <div class="drawer-header">
            <div class="drawer-header-left">
              <span class="drawer-subject-pill" :class="getSubjectColorClass(selectedHomework.subject_name)">
                {{ selectedHomework.subject_name }}
              </span>
              <span class="drawer-section-pill">
                {{ selectedHomework.grade_name }} ({{ selectedHomework.section_name }})
              </span>
            </div>
            <button class="drawer-close-btn" @click="closeDrawer">&times;</button>
          </div>

          <div class="drawer-body">
            <h2 class="drawer-title">{{ selectedHomework.title }}</h2>

            <div class="drawer-meta-row">
              <div class="meta-item">
                <span class="meta-label">📅 التسليم:</span>
                <span class="meta-value">{{ selectedHomework.due_date }}</span>
              </div>
              <div class="meta-item">
                <span class="meta-label">📊 الحل:</span>
                <span class="meta-value" :class="selectedHomework.has_solution ? 'text-green' : 'text-gray'">
                  {{ selectedHomework.has_solution ? 'معتمد' : 'غير مفعل' }}
                </span>
              </div>
            </div>

            <div class="drawer-section-block">
              <h4 class="block-heading">📌 المطلوب في الواجب المدرسي:</h4>
              <p class="drawer-desc">{{ selectedHomework.description || 'يرجى حل التمارين المحددة بدقة.' }}</p>
            </div>

            <div v-if="selectedHomework.has_solution" class="drawer-solution-card">
              <div class="sol-card-header">
                <span class="sol-badge">📖 الحل النموذجي المعتمد</span>
                <button class="sol-view-btn" @click="openSolutionModal(selectedHomework)">
                  عرض الحل الكامل ➔
                </button>
              </div>
              <p class="sol-preview-text">{{ selectedHomework.solution_text || 'خطوات الحل مسجلة ومعتمدة.' }}</p>
            </div>
          </div>

          <div class="drawer-footer">
            <button class="btn-delete-action" @click="confirmDelete(selectedHomework.id)">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="3 6 5 6 21 6"></polyline>
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
              </svg>
              <span>حذف الواجب نهائياً</span>
            </button>
          </div>
        </div>
      </div>
    </Teleport>
  </main>
</template>

<script setup>
import { ref, computed } from 'vue';
import mathImg from '@/assets/math_3d.jpg';
import scienceImg from '@/assets/science_3d.jpg';
import englishImg from '@/assets/english_3d.jpg';
import islamicImg from '@/assets/islamic_3d.jpg';

const props = defineProps({
  loading: { type: Boolean, default: false },
  activeTab: { type: String, default: 'current' },
  selectedSectionId: { type: [Number, String, null], default: null },
  homeworks: { type: Array, default: () => [] },
  assignedSections: { type: Array, default: () => [] }
});

const emit = defineEmits(['open-create', 'create-homework', 'delete-homework']);

const selectedHomework = ref(null);
const solutionModalData = ref(null);

const filteredList = computed(() => {
  let list = props.homeworks || [];
  if (props.selectedSectionId !== null) {
    list = list.filter(h => h.section_id === props.selectedSectionId);
  }
  return list;
});

const filteredGroupedList = computed(() => {
  const groups = {};
  filteredList.value.forEach((hw) => {
    const key = hw.due_date || '2026-08-30';
    if (!groups[key]) {
      const dateObj = new Date(hw.due_date);
      const days = ['الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'];
      const dayName = isNaN(dateObj) ? 'المحدد' : days[dateObj.getDay()];
      groups[key] = {
        dateKey: key,
        dayName,
        formattedDate: hw.due_date,
        items: []
      };
    }
    groups[key].items.push(hw);
  });
  return Object.values(groups);
});

function getSubjectColorClass(name) {
  if (!name) return 'default';
  if (name.includes('رياضيات')) return 'math';
  if (name.includes('علوم')) return 'science';
  if (name.includes('عرب')) return 'arabic';
  if (name.includes('إسلام')) return 'islamic';
  return 'default';
}

function getSubjectImage(name) {
  if (!name) return null;
  if (name.includes('رياضيات')) return mathImg || '/images/math_3d.jpg';
  if (name.includes('علوم')) return scienceImg || '/images/science_3d.jpg';
  if (name.includes('إنجليز')) return englishImg || '/images/english_3d.jpg';
  if (name.includes('إسلام')) return islamicImg || '/images/islamic_3d.jpg';
  return null;
}

function getSubjectIcon(name) {
  if (!name) return '📚';
  if (name.includes('عرب')) return '📖';
  if (name.includes('حاسوب')) return '💻';
  if (name.includes('اجتماع')) return '🌍';
  return '📚';
}

function openHomeworkDrawer(hw) {
  selectedHomework.value = hw;
}

function closeDrawer() {
  selectedHomework.value = null;
}

function openSolutionModal(hw) {
  solutionModalData.value = hw;
}

function confirmDelete(id) {
  if (confirm('هل أنت متأكد من رغبتك في حذف هذا الواجب نهائياً؟')) {
    emit('delete-homework', id);
    closeDrawer();
  }
}
</script>

<style scoped>
.hw-container { padding: 16px; }
.loading-state, .empty-state {
  text-align: center;
  padding: 32px 16px;
  background: #ffffff;
  border-radius: 20px;
  font-weight: 700;
  color: #64748b;
  border: 1px dashed #cbd5e1;
}
.schedule-days-list { display: flex; flex-direction: column; gap: 24px; }
.sched-ref-card {
  background: #ffffff;
  border-radius: 24px;
  padding: 24px 20px 16px;
  position: relative;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05);
  border: 1px solid #f1f5f9;
}
.sched-ref-top-notch {
  width: 54px;
  height: 54px;
  background: linear-gradient(352deg, #4f46e59e 0%, #c7d2feb3 100%);
  color: #ffffff;
  font-size: 22px;
  font-weight: 800;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: -22px;
  left: 50%;
  transform: translateX(-50%);
  border: 8px solid #fff;
  box-shadow: 0 6px 14px rgba(79, 70, 229, 0.35) inset;
}
.sched-ref-header-info { text-align: center; margin-bottom: 16px; }
.sched-ref-day-title { font-size: 18px; font-weight: 800; color: #0f172a; margin: 0; }
.exam-ref-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 14px; margin-bottom: 16px; }
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
  border-color: #c7d2fe;
}
.sched-icon-box {
  width: 48px;
  height: 48px;
  border-radius: 16px;
  background: #f1f5f9;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  overflow: hidden;
  border: 1px solid #e2e8f0;
}
.sched-icon-box.math { background: #ede9fe; color: #7c3aed; }
.sched-icon-box.science { background: #e0f2fe; color: #0284c7; }
.sched-icon-box.arabic { background: #fef3c7; color: #d97706; }
.sched-icon-box.islamic { background: #dcfce7; color: #16a34a; }
.subject-3d-icon-render { width: 100%; height: 100%; object-fit: cover; border-radius: 14px; }
.sched-period-tag {
  font-size: 11px;
  font-weight: 800;
  padding: 3px 8px;
  border-radius: 10px;
  background: #dcfce7;
  color: #166534;
}
.sched-period-tag.pending { background: #ffedd5; color: #c2410c; }
.sched-subject-name {
  font-size: 14px;
  font-weight: 800;
  color: #1e293b;
  margin: 2px 0 0;
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
}
.sched-teacher-name {
  font-size: 12px;
  color: #64748b;
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
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
