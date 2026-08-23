<template>
  <div class="timetable-grid-panel">
    <!-- Panel Top Bar -->
    <div class="panel-top-bar">
      <div>
        <h2 class="panel-title">📅 شبكة الجدول الأسبوعي وتخصيص الحصص</h2>
        <p class="panel-desc">توزيع الحصص الـ 6 عبر أيام الأسبوع (الأحد إلى الخميس) لكل شعبة</p>
      </div>

      <!-- Section Selector -->
      <div class="section-selector-box">
        <label class="sel-lbl">اختر الشعبة لعرض جدولها:</label>
        <select v-model="selectedSectionId" class="section-select" @change="fetchSchedule">
          <option v-for="sec in allSections" :key="sec.id" :value="sec.id">
            {{ sec.grade_name }} - شعبة {{ sec.name }}
          </option>
        </select>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="loading-state">
      <span class="loading-spinner"></span>
      <p>جاري تحميل شبكة الجدول الأسبوعي...</p>
    </div>

    <!-- 5 Days x 6 Slots Matrix -->
    <div v-else class="matrix-wrapper">
      <div class="timetable-matrix">
        <!-- Header row for slot numbers (1 to 6) -->
        <div class="matrix-header-cell day-corner">اليوم / الحصة</div>
        <div v-for="slotNum in 6" :key="slotNum" class="matrix-header-cell slot-col-head">
          <span>الحصة {{ slotNum }}</span>
        </div>

        <!-- 5 Week Days (Sunday to Thursday) -->
        <template v-for="day in weekDays" :key="day.dayNumber">
          <!-- Day Name Column -->
          <div class="day-label-cell">
            <span class="day-icon">🗓️</span>
            <span class="day-txt">{{ day.name }}</span>
          </div>

          <!-- 6 Slots for this day -->
          <div
            v-for="slotNum in 6"
            :key="`${day.dayNumber}-${slotNum}`"
            class="slot-cell"
            :class="{ 'has-content': getSlot(day.dayNumber, slotNum) }"
            @click="openAssignSlotModal(day.dayNumber, slotNum)"
          >
            <template v-if="getSlot(day.dayNumber, slotNum)">
              <div class="slot-content">
                <span class="slot-subj">{{ getSlot(day.dayNumber, slotNum).subject_name }}</span>
                <span class="slot-teacher">👨‍🏫 {{ getSlot(day.dayNumber, slotNum).teacher_name }}</span>
              </div>
            </template>
            <template v-else>
              <div class="empty-slot-placeholder">
                <span>➕ تعيين حصة</span>
              </div>
            </template>
          </div>
        </template>
      </div>
    </div>

    <!-- Assign / Edit Slot Modal -->
    <ShadcnDialog
      v-model="isSlotModalOpen"
      :title="slotModalTitle"
      description="اختر المادة الدراسية والمعلم المكلف بتدريس هذه الحصة"
      icon="📅"
      max-width="sm"
    >
      <form class="modal-form" @submit.prevent="handleSaveSlot">
        <div class="form-group">
          <label class="form-label">المادة الدراسية *</label>
          <select v-model="slotForm.subject_id" class="form-select" required>
            <option value="" disabled>اختر المادة...</option>
            <option v-for="sub in filteredSubjects" :key="sub.id" :value="sub.id">{{ sub.name }}</option>
          </select>
        </div>

        <div class="form-group">
          <label class="form-label">المعلم المكلف *</label>
          <select v-model="slotForm.teacher_id" class="form-select" required>
            <option value="" disabled>اختر المعلم...</option>
            <option v-for="t in teachers" :key="t.id" :value="t.id">{{ t.full_name }} ({{ t.username }})</option>
          </select>
        </div>

        <div class="form-actions">
          <BaseButton
            v-if="currentSlotData"
            type="button"
            variant="danger"
            @click="handleClearSlot"
          >
            تفريغ الحصة 🗑️
          </BaseButton>
          <BaseButton type="button" variant="secondary" @click="isSlotModalOpen = false">إلغاء</BaseButton>
          <BaseButton type="submit" :loading="submitting">حفظ الحصة 💾</BaseButton>
        </div>
      </form>
    </ShadcnDialog>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue';
import api from '../../services/api';
import BaseButton from '../common/BaseButton.vue';
import ShadcnDialog from '../common/ShadcnDialog.vue';

const weekDays = [
  { dayNumber: 1, name: 'الأحد' },
  { dayNumber: 2, name: 'الإثنين' },
  { dayNumber: 3, name: 'الثلاثاء' },
  { dayNumber: 4, name: 'الأربعاء' },
  { dayNumber: 5, name: 'الخميس' }
];

const allSections = ref([]);
const subjects = ref([]);
const teachers = ref([]);
const scheduleSlots = ref([]);
const selectedSectionId = ref(null);
const loading = ref(true);
const submitting = ref(false);

const isSlotModalOpen = ref(false);
const activeDayNum = ref(1);
const activeSlotNum = ref(1);

const slotForm = reactive({
  subject_id: '',
  teacher_id: ''
});

const currentSelectedSection = computed(() => {
  return allSections.value.find(s => s.id === selectedSectionId.value);
});

const filteredSubjects = computed(() => {
  if (!currentSelectedSection.value) return subjects.value;
  return subjects.value.filter(s => s.grade_id === currentSelectedSection.value.grade_id);
});

const slotModalTitle = computed(() => {
  const day = weekDays.find(d => d.dayNumber === activeDayNum.value);
  return `تخصيص الحصة ${activeSlotNum.value} - يوم ${day ? day.name : ''}`;
});

const currentSlotData = computed(() => {
  return getSlot(activeDayNum.value, activeSlotNum.value);
});

function getSlot(dayNum, slotNum) {
  return scheduleSlots.value.find(s => s.day_of_week === dayNum && s.slot_number === slotNum);
}

async function fetchInitial() {
  loading.value = true;
  try {
    const [gradesRes, subjectsRes, teachersRes] = await Promise.all([
      api.get('/admin/grades'),
      api.get('/admin/subjects'),
      api.get('/admin/teachers')
    ]);

    const secs = [];
    if (gradesRes.data.success) {
      const grades = gradesRes.data.data || [];
      grades.forEach(g => {
        if (g.sections) {
          g.sections.forEach(s => {
            secs.push({ ...s, grade_name: g.name, grade_id: g.id });
          });
        }
      });
    }
    allSections.value = secs;
    if (subjectsRes.data.success) subjects.value = subjectsRes.data.data || [];
    if (teachersRes.data.success) teachers.value = teachersRes.data.data || [];

    if (secs.length > 0) {
      selectedSectionId.value = secs[0].id;
      await fetchSchedule();
    }
  } catch (err) {
    console.error('Error initializing schedule grid:', err);
  } finally {
    loading.value = false;
  }
}

async function fetchSchedule() {
  if (!selectedSectionId.value) return;
  try {
    const res = await api.get(`/admin/schedule?section_id=${selectedSectionId.value}`);
    if (res.data.success) {
      scheduleSlots.value = res.data.data || [];
    }
  } catch (err) {
    console.error('Error fetching section schedule:', err);
  }
}

function openAssignSlotModal(dayNum, slotNum) {
  activeDayNum.value = dayNum;
  activeSlotNum.value = slotNum;

  const existing = getSlot(dayNum, slotNum);
  if (existing) {
    slotForm.subject_id = existing.subject_id;
    slotForm.teacher_id = existing.teacher_id;
  } else {
    slotForm.subject_id = filteredSubjects.value.length > 0 ? filteredSubjects.value[0].id : '';
    slotForm.teacher_id = teachers.value.length > 0 ? teachers.value[0].id : '';
  }

  isSlotModalOpen.value = true;
}

async function handleSaveSlot() {
  submitting.value = true;
  try {
    const res = await api.post('/admin/schedule', {
      section_id: selectedSectionId.value,
      day_of_week: activeDayNum.value,
      slot_number: activeSlotNum.value,
      subject_id: slotForm.subject_id,
      teacher_id: slotForm.teacher_id
    });
    if (res.data.success) {
      isSlotModalOpen.value = false;
      fetchSchedule();
    } else {
      alert(res.data.message || 'فشل حفظ الحصة');
    }
  } catch (err) {
    alert(err.response?.data?.message || 'حدث خطأ أثناء حفظ الحصة');
  } finally {
    submitting.value = false;
  }
}

async function handleClearSlot() {
  const existing = currentSlotData.value;
  if (!existing || !existing.id) return;

  if (!confirm('هل أنت متأكد من تفريغ هذه الحصة؟')) return;

  try {
    const res = await api.delete(`/admin/schedule/${existing.id}`);
    if (res.data.success) {
      isSlotModalOpen.value = false;
      fetchSchedule();
    } else {
      alert(res.data.message || 'فشل تفريغ الحصة');
    }
  } catch (err) {
    alert('حدث خطأ أثناء تفريغ الحصة');
  }
}

onMounted(() => {
  fetchInitial();
});
</script>

<style scoped>
.panel-top-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  flex-wrap: wrap;
  gap: 12px;
}

.panel-title {
  font-size: 1.25rem;
  font-weight: 900;
  color: var(--text-main);
}

.panel-desc {
  font-size: 0.85rem;
  color: var(--text-muted);
}

.section-selector-box {
  display: flex;
  align-items: center;
  gap: 8px;
}

.sel-lbl {
  font-size: 0.85rem;
  font-weight: 700;
  color: var(--text-secondary);
}

.section-select {
  padding: 8px 14px;
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-md);
  font-size: 0.9rem;
  background: #ffffff;
  font-weight: 700;
  color: var(--primary);
  outline: none;
}

.matrix-wrapper {
  background: #ffffff;
  border-radius: var(--radius-lg);
  border: 1px solid var(--border-subtle);
  box-shadow: 0 2px 12px rgba(15, 23, 42, 0.04);
  padding: 16px;
  overflow-x: auto;
}

.timetable-matrix {
  display: grid;
  grid-template-columns: 140px repeat(6, minmax(130px, 1fr));
  gap: 8px;
  min-width: 900px;
}

.matrix-header-cell {
  background: #f8fafc;
  padding: 12px;
  border-radius: var(--radius-md);
  font-size: 0.85rem;
  font-weight: 800;
  color: var(--text-secondary);
  text-align: center;
  border: 1px solid var(--border-subtle);
}

.day-corner {
  background: var(--primary-light);
  color: var(--primary);
}

.day-label-cell {
  background: #f8fafc;
  padding: 16px 12px;
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  font-size: 0.95rem;
  font-weight: 800;
  color: var(--text-main);
  border: 1px solid var(--border-subtle);
}

.slot-cell {
  background: #fafafa;
  border: 1px dashed #cbd5e1;
  border-radius: var(--radius-md);
  padding: 12px;
  min-height: 85px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
}

.slot-cell:hover {
  border-color: var(--primary);
  background: var(--primary-light);
  transform: translateY(-2px);
}

.slot-cell.has-content {
  background: #ffffff;
  border: 1px solid #e2e8f0;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.03);
}

.slot-content {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.slot-subj {
  font-size: 0.9rem;
  font-weight: 900;
  color: var(--primary);
}

.slot-teacher {
  font-size: 0.75rem;
  color: var(--text-muted);
  font-weight: 600;
}

.empty-slot-placeholder {
  text-align: center;
  font-size: 0.775rem;
  color: var(--text-light);
  font-weight: 600;
}

.modal-form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.form-label {
  font-size: 0.85rem;
  font-weight: 700;
  color: var(--text-secondary);
}

.form-select {
  width: 100%;
  padding: 10px 14px;
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-md);
  font-size: 0.9rem;
  background: #f8fafc;
  outline: none;
}

.form-select:focus {
  border-color: var(--primary);
  background: #ffffff;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 10px;
}

.loading-state {
  text-align: center;
  padding: 50px 20px;
  background: #ffffff;
  border-radius: var(--radius-lg);
}

.loading-spinner {
  width: 28px;
  height: 28px;
  border: 3px solid #e2e8f0;
  border-top-color: var(--primary);
  border-radius: 50%;
  animation: spin 0.6s linear infinite;
  display: inline-block;
  margin-bottom: 10px;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}
</style>
