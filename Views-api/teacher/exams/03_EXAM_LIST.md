# 📚 03. مواصفات ومكون عرض الامتحانات للمعلم (`TeacherExamList`)

> **الملف المرجعي:** [`Views-api/teacher/exams/03_EXAM_LIST.md`](file:///c:/Users/alhareth/Desktop/work/school-system/Views-api/teacher/exams/03_EXAM_LIST.md)  
> **اسم المكون البرمجي:** `TeacherExamList.vue`  
> **التصميم المرجعي المعتمد:** مطابق 100% لمواصفات [`Views-api/student/exams/03_EXAM_LIST.md`](file:///c:/Users/alhareth/Desktop/work/school-system/Views-api/student/exams/03_EXAM_LIST.md)  
> **الوصف:** المكون التنفيذي الرئيسي لجدولة وعرض ومتابعة الامتحانات المدرسية الخاصة بالمعلم، مجمعة بتواريخ الاختبارات مع النتوء الدائري 54px، شبكة كروت السكواركل الثنائية، تذييل التوقيت، دراوير التفاصيل الكاملة، ومودل جدولة امتحان جديد، ومودل معاينة النموذج الاسترشادي والحل.

---

## 📸 1. الوصف البصري والتشريحي للجزء (Component Anatomy)

```
+-----------------------------------------------------------------------+
|                                (  1  )                                |
|  +-----------------------------------------------------------------+  |
|  |                       امتحانات يوم الأحد                        |  |
|  |                                                                 |  |
|  |  +---------------------------+   +---------------------------+  |  |
|  |  | [ 🔬 ]       تم الاعتماد  |   | [ 📐 ]             مجدول  |  |  |
|  |  | امتحان العلوم النصفي      |   | امتحان الرياضيات الشهري   |  |  |
|  |  | العلوم • الصف 5 (أ5)      |   | الرياضيات • الصف 5 (ب5)   |  |  |
|  |  +---------------------------+   +---------------------------+  |  |
|  |                                                                 |  |
|  |   📅 تاريخ الاختبار: الأحد 30 أغسطس 2026                        |  |
|  +-----------------------------------------------------------------+  |
+-----------------------------------------------------------------------+
```

---

## 📐 2. كود المكون الكامل Vue 3 Component (`TeacherExamList.vue`)

```vue
<template>
  <main class="hw-container">
    <!-- Loading State -->
    <div v-if="loading" class="loading-state">
      جاري استرجاع جدول الامتحانات... ⏳
    </div>

    <!-- Empty State -->
    <div v-else-if="filteredGroupedList.length === 0" class="empty-state">
      <span style="font-size: 40px; display: block; margin-bottom: 8px;">📝</span>
      <span>لا توجد امتحانات مجدولة في هذا القسم أو الشعبة.</span>
    </div>

    <!-- Grouped Exams List (Matching Student Reference Design) -->
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
          <h3 class="sched-ref-day-title">امتحانات يوم {{ group.dayName }}</h3>
        </div>

        <!-- 3. Squircle 2-Column Grid -->
        <div class="exam-ref-grid">
          <div 
            v-for="exam in group.items" 
            :key="exam.id" 
            class="sched-subject-squircle hw-squircle-click"
            @click="openExamDrawer(exam)"
          >
            <!-- Squircle Icon Box -->
            <div class="sched-icon-box" :class="getSubjectColorClass(exam.subject_name)">
              <img v-if="getSubjectImage(exam.subject_name)" :src="getSubjectImage(exam.subject_name)" class="subject-3d-icon-render" alt="" />
              <span v-else>{{ getSubjectIcon(exam.subject_name) }}</span>
            </div>

            <!-- Status Tag -->
            <span class="sched-period-tag" :class="{ pending: !exam.has_solution }">
              {{ exam.has_solution ? 'تم الاعتماد ✅' : 'مجدول 📝' }}
            </span>

            <!-- Subject & Exam Title -->
            <h4 class="sched-subject-name" :title="exam.title">{{ exam.title }}</h4>

            <!-- Class / Section Name -->
            <span class="sched-teacher-name" :title="`${exam.subject_name} • ${exam.section_name || exam.grade_name}`">
              {{ exam.subject_name }} • {{ exam.section_name || exam.grade_name }}
            </span>
          </div>
        </div>

        <!-- 4. Date & Timing Footer -->
        <div class="sched-ref-footer-date">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
            <line x1="16" y1="2" x2="16" y2="6"></line>
            <line x1="8" y1="2" x2="8" y2="6"></line>
            <line x1="3" y1="10" x2="21" y2="10"></line>
          </svg>
          <span>تاريخ الاختبار: {{ group.formattedDate }}</span>
        </div>
      </article>
    </div>

    <!-- ================= 1. Exam Details Drawer ================= -->
    <Teleport to="body">
      <div v-if="selectedExam" class="drawer-backdrop" @click="closeDrawer">
        <div class="drawer-content" @click.stop>
          <div class="drawer-handle"></div>

          <div class="drawer-header">
            <div class="drawer-header-left">
              <span class="drawer-subject-pill" :class="getSubjectColorClass(selectedExam.subject_name)">
                {{ selectedExam.subject_name }}
              </span>
              <span class="drawer-section-pill">
                {{ selectedExam.grade_name }} ({{ selectedExam.section_name }})
              </span>
            </div>
            <button class="drawer-close-btn" @click="closeDrawer">&times;</button>
          </div>

          <div class="drawer-body">
            <h2 class="drawer-title">{{ selectedExam.title }}</h2>

            <div class="drawer-meta-row">
              <div class="meta-item">
                <span class="meta-label">📅 التاريخ:</span>
                <span class="meta-value">{{ selectedExam.due_date }}</span>
              </div>
              <div class="meta-item">
                <span class="meta-label">⏰ التوقيت:</span>
                <span class="meta-value">{{ selectedExam.exam_time || '09:00 ص (ساعة ونصف)' }}</span>
              </div>
            </div>

            <div class="drawer-section-block">
              <h4 class="block-heading">📌 مفردات الاختبار والمقرر:</h4>
              <p class="drawer-desc">{{ selectedExam.description || 'اختبار تحصيلي يشمل الوحدات المقررة في المنهج.' }}</p>
            </div>

            <!-- Model Solution Card -->
            <div v-if="selectedExam.has_solution" class="drawer-solution-card">
              <div class="sol-card-header">
                <span class="sol-badge">📖 النموذج الاسترشادي والحل المعتمد</span>
                <button class="sol-view-btn" @click="openSolutionModal(selectedExam)">
                  عرض النموذج الكامل ➔
                </button>
              </div>
              <p class="sol-preview-text">{{ selectedExam.solution_text || 'نموذج الإجابة وسلم توزيع الدرجات معتمد.' }}</p>
            </div>
          </div>

          <!-- Drawer Action Footer -->
          <div class="drawer-footer">
            <button class="btn-delete-action" @click="confirmDelete(selectedExam.id)">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="3 6 5 6 21 6"></polyline>
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
              </svg>
              <span>حذف الامتحان نهائياً</span>
            </button>
          </div>
        </div>
      </div>
    </Teleport>

    <!-- ================= 2. Create Exam Modal ================= -->
    <Teleport to="body">
      <div v-if="showCreateModal" class="modal-backdrop" @click="closeCreateModal">
        <div class="modal-dialog" @click.stop>
          <div class="modal-header">
            <h3 class="modal-title">➕ جدولة امتحان مدرسي جديد</h3>
            <button class="modal-close-btn" @click="closeCreateModal">&times;</button>
          </div>

          <form @submit.prevent="submitCreateExam" class="modal-form">
            <div class="form-group">
              <label class="form-label">عنوان الامتحان <span class="req">*</span></label>
              <input 
                v-model="createForm.title" 
                type="text" 
                placeholder="مثال: امتحان الرياضيات النصفي" 
                class="form-input" 
                required 
              />
            </div>

            <div class="form-row">
              <div class="form-group">
                <label class="form-label">الشعبة الدراسية <span class="req">*</span></label>
                <select v-model="createForm.section_id" class="form-select" required>
                  <option value="" disabled>اختر الشعبة</option>
                  <option v-for="sec in assignedSections" :key="sec.id" :value="sec.id">
                    {{ sec.grade_name }} - {{ sec.name }}
                  </option>
                </select>
              </div>

              <div class="form-group">
                <label class="form-label">تاريخ الاختبار <span class="req">*</span></label>
                <input 
                  v-model="createForm.due_date" 
                  type="date" 
                  class="form-input" 
                  required 
                />
              </div>
            </div>

            <div class="form-group">
              <label class="form-label">مفردات المنهج والتعليمات</label>
              <textarea 
                v-model="createForm.description" 
                placeholder="أدخل الفصول المقررة وتعليمات الاختبار..." 
                class="form-textarea" 
                rows="3"
              ></textarea>
            </div>

            <!-- Model Solution Switch -->
            <div class="solution-toggle-card">
              <div class="toggle-row">
                <div class="toggle-text">
                  <strong>تفعيل النموذج الاسترشادي والحل</strong>
                  <p>إرفاق وتفعيل خطة الإجابة النموذجية المعتمدة</p>
                </div>
                <label class="switch">
                  <input type="checkbox" v-model="createForm.has_solution" />
                  <span class="slider round"></span>
                </label>
              </div>

              <div v-if="createForm.has_solution" class="toggle-expand">
                <label class="form-label">نص النموذج الاسترشادي وتوزيع الدرجات</label>
                <textarea 
                  v-model="createForm.solution_text" 
                  placeholder="أدخل خطوات الحل وسلم توزيع الدرجات..." 
                  class="form-textarea" 
                  rows="3"
                ></textarea>
              </div>
            </div>

            <div class="modal-actions">
              <button type="button" class="btn-cancel" @click="closeCreateModal">إلغاء</button>
              <button type="submit" class="btn-submit" :disabled="submitting">
                {{ submitting ? 'جاري الجدولة...' : 'جدولة وتعميم الامتحان 🚀' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Teleport>

    <!-- ================= 3. Solution Preview Modal ================= -->
    <Teleport to="body">
      <div v-if="solutionModalData" class="modal-backdrop" @click="solutionModalData = null">
        <div class="modal-dialog solution-modal" @click.stop>
          <div class="modal-header">
            <h3 class="modal-title">📖 النموذج الاسترشادي المعتمد</h3>
            <button class="modal-close-btn" @click="solutionModalData = null">&times;</button>
          </div>
          <div class="solution-modal-body">
            <div class="solution-box">
              <pre class="solution-content">{{ solutionModalData.solution_text || 'لا يوجد نص متاح للنموذج الاسترشادي.' }}</pre>
            </div>
          </div>
          <div class="modal-footer">
            <button class="btn-primary-close" @click="solutionModalData = null">إغلاق</button>
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
  activeTab: { type: String, default: 'upcoming' },
  selectedSectionId: { type: [Number, String, null], default: null },
  exams: { type: Array, default: () => [] },
  assignedSections: { type: Array, default: () => [] }
});

const emit = defineEmits(['open-create', 'create-exam', 'delete-exam']);

const selectedExam = ref(null);
const showCreateModal = ref(false);
const solutionModalData = ref(null);
const submitting = ref(false);

const createForm = ref({
  title: '',
  section_id: '',
  subject_id: 1,
  due_date: new Date().toISOString().split('T')[0],
  description: '',
  has_solution: false,
  solution_text: ''
});

const filteredList = computed(() => {
  let list = props.exams || [];
  if (props.selectedSectionId !== null) {
    list = list.filter(e => e.section_id === props.selectedSectionId);
  }
  return list;
});

const filteredGroupedList = computed(() => {
  const groups = {};
  filteredList.value.forEach((exam) => {
    const key = exam.due_date || '2026-08-30';
    if (!groups[key]) {
      const dateObj = new Date(exam.due_date);
      const days = ['الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'];
      const dayName = isNaN(dateObj) ? 'المحدد' : days[dateObj.getDay()];
      groups[key] = {
        dateKey: key,
        dayName,
        formattedDate: exam.due_date,
        items: []
      };
    }
    groups[key].items.push(exam);
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
  if (!name) return '📝';
  if (name.includes('رياضيات')) return '📐';
  if (name.includes('علوم')) return '🔬';
  if (name.includes('عرب')) return '📖';
  if (name.includes('إنجليزي')) return '🔤';
  if (name.includes('إسلام')) return '🕌';
  return '📝';
}

function openExamDrawer(exam) {
  selectedExam.value = exam;
}

function closeDrawer() {
  selectedExam.value = null;
}

function openSolutionModal(exam) {
  solutionModalData.value = exam;
}

function closeCreateModal() {
  showCreateModal.value = false;
}

function confirmDelete(id) {
  if (confirm('هل أنت متأكد من رغبتك في حذف هذا الامتحان نهائياً؟')) {
    emit('delete-exam', id);
    closeDrawer();
  }
}

function submitCreateExam() {
  submitting.value = true;
  emit('create-exam', { ...createForm.value });
  setTimeout(() => {
    submitting.value = false;
    showCreateModal.value = false;
    createForm.value = {
      title: '',
      section_id: '',
      subject_id: 1,
      due_date: new Date().toISOString().split('T')[0],
      description: '',
      has_solution: false,
      solution_text: ''
    };
  }, 400);
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

/* Drawer & Modals */
.drawer-backdrop, .modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.6);
  backdrop-filter: blur(6px);
  z-index: 999;
  display: flex;
  justify-content: center;
  align-items: flex-end;
}
.modal-backdrop { align-items: center; padding: 16px; }
.drawer-content {
  width: 100%;
  max-width: 480px;
  background: #ffffff;
  border-radius: 28px 28px 0 0;
  padding: 16px 20px 28px;
  max-height: 85vh;
  overflow-y: auto;
  box-shadow: 0 -10px 40px rgba(0, 0, 0, 0.2);
  animation: slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}
@keyframes slideUp { from { transform: translateY(100%); } to { transform: translateY(0); } }
.drawer-handle { width: 40px; height: 4px; background: #cbd5e1; border-radius: 2px; margin: 0 auto 16px; }
.drawer-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; }
.drawer-subject-pill { padding: 4px 10px; border-radius: 10px; font-size: 11.5px; font-weight: 700; }
.drawer-subject-pill.math { background: #ede9fe; color: #7c3aed; }
.drawer-subject-pill.science { background: #e0f2fe; color: #0284c7; }
.drawer-subject-pill.arabic { background: #fef3c7; color: #d97706; }
.drawer-subject-pill.islamic { background: #dcfce7; color: #16a34a; }
.drawer-section-pill { background: #f1f5f9; color: #475569; padding: 4px 10px; border-radius: 10px; font-size: 11.5px; margin-right: 6px; font-weight: 600; }
.drawer-close-btn, .modal-close-btn { background: #f1f5f9; border: none; width: 32px; height: 32px; border-radius: 50%; font-size: 18px; cursor: pointer; color: #64748b; }
.drawer-title { font-size: 17px; font-weight: 800; color: #0f172a; margin-bottom: 12px; }
.drawer-meta-row { display: flex; gap: 16px; background: #f8fafc; padding: 10px 14px; border-radius: 14px; margin-bottom: 16px; font-size: 12px; }
.meta-item { display: flex; gap: 4px; }
.meta-label { color: #64748b; }
.meta-value { font-weight: 700; color: #1e1b4b; }
.text-green { color: #15803d; }
.text-gray { color: #94a3b8; }
.block-heading { font-size: 13px; font-weight: 700; color: #334155; margin-bottom: 6px; }
.drawer-desc { font-size: 13px; line-height: 1.6; color: #475569; background: #f8fafc; padding: 12px; border-radius: 14px; margin-bottom: 16px; }
.drawer-solution-card { background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%); border: 1px solid #bbf7d0; padding: 14px; border-radius: 16px; margin-bottom: 20px; }
.sol-card-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; }
.sol-badge { font-size: 12px; font-weight: 800; color: #166534; }
.sol-view-btn { background: #16a34a; color: #ffffff; border: none; padding: 4px 10px; border-radius: 8px; font-size: 11px; font-weight: 700; cursor: pointer; }
.sol-preview-text { font-size: 12px; color: #15803d; line-height: 1.5; white-space: pre-wrap; }
.drawer-footer { margin-top: 12px; }
.btn-delete-action { width: 100%; display: flex; align-items: center; justify-content: center; gap: 8px; background: #fef2f2; color: #dc2626; border: 1px solid #fecaca; padding: 12px; border-radius: 14px; font-size: 13.5px; font-weight: 700; cursor: pointer; transition: all 0.2s ease; }
.btn-delete-action:hover { background: #fee2e2; }

/* Modal Dialogs */
.modal-dialog { width: 100%; max-width: 440px; background: #ffffff; border-radius: 24px; padding: 20px; box-shadow: 0 20px 50px rgba(0, 0, 0, 0.2); }
.modal-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; }
.modal-title { font-size: 16px; font-weight: 800; color: #0f172a; margin: 0; }
.modal-form { display: flex; flex-direction: column; gap: 12px; }
.form-group { display: flex; flex-direction: column; gap: 4px; }
.form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
.form-label { font-size: 12px; font-weight: 700; color: #334155; }
.req { color: #ef4444; }
.form-input, .form-select, .form-textarea { width: 100%; padding: 10px 12px; border: 1px solid #cbd5e1; border-radius: 12px; font-size: 12.5px; font-family: inherit; box-sizing: border-box; }
.solution-toggle-card { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 14px; padding: 12px; margin-top: 4px; }
.toggle-row { display: flex; justify-content: space-between; align-items: center; }
.toggle-text strong { font-size: 12.5px; color: #1e1b4b; }
.toggle-text p { font-size: 11px; color: #64748b; margin: 2px 0 0; }
.switch { position: relative; display: inline-block; width: 44px; height: 24px; }
.switch input { opacity: 0; width: 0; height: 0; }
.slider { position: absolute; cursor: pointer; inset: 0; background-color: #cbd5e1; transition: .3s; border-radius: 24px; }
.slider:before { position: absolute; content: ""; height: 18px; width: 18px; left: 3px; bottom: 3px; background-color: white; transition: .3s; border-radius: 50%; }
input:checked + .slider { background-color: #10b981; }
input:checked + .slider:before { transform: translateX(20px); }
.toggle-expand { margin-top: 10px; }
.modal-actions { display: flex; gap: 10px; margin-top: 10px; }
.btn-cancel { flex: 1; background: #f1f5f9; color: #475569; border: none; padding: 12px; border-radius: 14px; font-weight: 700; cursor: pointer; }
.btn-submit { flex: 2; background: #6366f1; color: #ffffff; border: none; padding: 12px; border-radius: 14px; font-weight: 700; cursor: pointer; }
.btn-primary-close { width: 100%; background: #6366f1; color: #ffffff; border: none; padding: 10px; border-radius: 12px; font-weight: 700; cursor: pointer; }
.solution-box { background: #f0fdf4; border: 1px solid #bbf7d0; padding: 16px; border-radius: 14px; margin-bottom: 14px; }
.solution-content { font-family: inherit; font-size: 13px; line-height: 1.6; color: #166534; white-space: pre-wrap; margin: 0; }
</style>
```
