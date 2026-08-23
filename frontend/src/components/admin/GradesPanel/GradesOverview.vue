<template>
  <div class="grades-overview-panel">
    <!-- Header with Action -->
    <div class="panel-top-bar">
      <div>
        <h2 class="panel-title">🏫 الهيكل الأكاديمي والصفوف الدراسية</h2>
        <p class="panel-desc">إدارة المراحل التعليمية الـ 9 والشعب والمواد المقررة</p>
      </div>
      <div class="top-actions">
        <BaseButton size="sm" icon="➕" @click="isAddSectionModalOpen = true">
          إضافة شعبة جديدة
        </BaseButton>
        <BaseButton size="sm" variant="secondary" icon="📖" @click="isAddSubjectModalOpen = true">
          إضافة مادة دراسية
        </BaseButton>
      </div>
    </div>

    <!-- 9 Grades List -->
    <div v-if="loading" class="loading-state">
      <span class="loading-spinner"></span>
      <p>جاري تحميل الهيكل الدراسي...</p>
    </div>

    <div v-else class="grades-grid">
      <div
        v-for="grade in grades"
        :key="grade.id"
        class="grade-card"
        :class="{ active: selectedGrade?.id === grade.id }"
        @click="selectGrade(grade)"
      >
        <div class="grade-header">
          <span class="grade-icon">🎒</span>
          <div class="grade-info">
            <h3 class="grade-name">{{ grade.name }}</h3>
            <span class="grade-level">المستوى الدراسي: {{ grade.level_order }}</span>
          </div>
        </div>

        <!-- Sections in this grade -->
        <div class="grade-sections-box">
          <span class="sec-label">الشعب المتاحة ({{ grade.sections ? grade.sections.length : 0 }}):</span>
          <div class="sections-tags">
            <span
              v-for="sec in grade.sections"
              :key="sec.id"
              class="sec-tag"
            >
              شعبة {{ sec.name }} ({{ sec.student_count || 0 }} طالب)
              <button class="del-sec-btn" @click.stop="deleteSection(sec.id)" title="حذف الشعبة">✕</button>
            </span>
            <span v-if="!grade.sections || grade.sections.length === 0" class="no-sec-hint">
              لا توجد شعب مفعلة
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- Add Section Modal -->
    <ShadcnDialog
      v-model="isAddSectionModalOpen"
      title="إضافة شعبة دراسية جديدة"
      description="حدد الصف الدراسي وأدخل اسم أو رمز الشعبة (مثال: أ، ب، ج)"
      icon="🏫"
      max-width="sm"
    >
      <form class="modal-form" @submit.prevent="handleAddSection">
        <div class="form-group">
          <label class="form-label">الصف الدراسي *</label>
          <select v-model="newSection.grade_id" class="form-select" required>
            <option value="" disabled>اختر الصف...</option>
            <option v-for="g in grades" :key="g.id" :value="g.id">{{ g.name }}</option>
          </select>
        </div>

        <div class="form-group">
          <label class="form-label">اسم / رمز الشعبة *</label>
          <input
            v-model="newSection.name"
            type="text"
            placeholder="مثال: أ أو ب أو ج"
            class="form-input"
            required
          />
        </div>

        <div class="form-actions">
          <BaseButton type="button" variant="secondary" @click="isAddSectionModalOpen = false">إلغاء</BaseButton>
          <BaseButton type="submit" :loading="submitting">حفظ الشعبة 💾</BaseButton>
        </div>
      </form>
    </ShadcnDialog>

    <!-- Add Subject Modal -->
    <ShadcnDialog
      v-model="isAddSubjectModalOpen"
      title="إضافة مادة دراسية جديدة"
      description="حدد الصف الدراسي واسم المادة المقررة"
      icon="📖"
      max-width="sm"
    >
      <form class="modal-form" @submit.prevent="handleAddSubject">
        <div class="form-group">
          <label class="form-label">الصف الدراسي *</label>
          <select v-model="newSubject.grade_id" class="form-select" required>
            <option value="" disabled>اختر الصف...</option>
            <option v-for="g in grades" :key="g.id" :value="g.id">{{ g.name }}</option>
          </select>
        </div>

        <div class="form-group">
          <label class="form-label">اسم المادة الدراسية *</label>
          <input
            v-model="newSubject.name"
            type="text"
            placeholder="مثال: الرياضيات، العلوم، اللغة العربية"
            class="form-input"
            required
          />
        </div>

        <div class="form-actions">
          <BaseButton type="button" variant="secondary" @click="isAddSubjectModalOpen = false">إلغاء</BaseButton>
          <BaseButton type="submit" :loading="submitting">إضافة المادة 💾</BaseButton>
        </div>
      </form>
    </ShadcnDialog>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
import api from '../../../services/api';
import BaseButton from '../../common/BaseButton.vue';
import ShadcnDialog from '../../common/ShadcnDialog.vue';

const emit = defineEmits(['refresh-stats']);

const grades = ref([]);
const loading = ref(true);
const submitting = ref(false);
const selectedGrade = ref(null);

const isAddSectionModalOpen = ref(false);
const isAddSubjectModalOpen = ref(false);

const newSection = reactive({
  grade_id: '',
  name: ''
});

const newSubject = reactive({
  grade_id: '',
  name: ''
});

async function fetchGrades() {
  loading.value = true;
  try {
    const res = await api.get('/admin/grades');
    if (res.data.success) {
      grades.value = res.data.data || [];
      if (grades.value.length > 0 && !selectedGrade.value) {
        selectedGrade.value = grades.value[0];
        newSection.grade_id = grades.value[0].id;
        newSubject.grade_id = grades.value[0].id;
      }
    }
  } catch (err) {
    console.error('Error fetching grades:', err);
  } finally {
    loading.value = false;
  }
}

function selectGrade(grade) {
  selectedGrade.value = grade;
  newSection.grade_id = grade.id;
  newSubject.grade_id = grade.id;
}

async function handleAddSection() {
  submitting.value = true;
  try {
    const res = await api.post('/admin/sections', {
      grade_id: newSection.grade_id,
      name: newSection.name
    });
    if (res.data.success) {
      newSection.name = '';
      isAddSectionModalOpen.value = false;
      fetchGrades();
      emit('refresh-stats');
    } else {
      alert(res.data.message || 'فشل إضافة الشعبة');
    }
  } catch (err) {
    alert(err.response?.data?.message || 'حدث خطأ أثناء إضافة الشعبة');
  } finally {
    submitting.value = false;
  }
}

async function deleteSection(sectionId) {
  if (!confirm('هل أنت متأكد من حذف هذه الشعبة؟ سيتم حذف جميع الطلاب المرتبطين بها.')) return;
  try {
    const res = await api.delete(`/admin/sections/${sectionId}`);
    if (res.data.success) {
      fetchGrades();
      emit('refresh-stats');
    } else {
      alert(res.data.message || 'فشل حذف الشعبة');
    }
  } catch (err) {
    alert('حدث خطأ أثناء حذف الشعبة.');
  }
}

async function handleAddSubject() {
  submitting.value = true;
  try {
    const res = await api.post('/admin/subjects', {
      grade_id: newSubject.grade_id,
      name: newSubject.name
    });
    if (res.data.success) {
      newSubject.name = '';
      isAddSubjectModalOpen.value = false;
      alert('تمت إضافة المادة الدراسية بنجاح.');
    } else {
      alert(res.data.message || 'فشل إضافة المادة');
    }
  } catch (err) {
    alert(err.response?.data?.message || 'حدث خطأ أثناء إضافة المادة');
  } finally {
    submitting.value = false;
  }
}

onMounted(() => {
  fetchGrades();
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

.top-actions {
  display: flex;
  gap: 10px;
}

.grades-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 16px;
}

.grade-card {
  background: #ffffff;
  border-radius: var(--radius-lg);
  padding: 18px 20px;
  border: 1px solid var(--border-subtle);
  box-shadow: 0 2px 8px rgba(15, 23, 42, 0.03);
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
  cursor: pointer;
}

.grade-card:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
  border-color: var(--primary-light);
}

.grade-card.active {
  border-color: var(--primary);
  box-shadow: 0 0 0 2px var(--primary-light);
}

.grade-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 14px;
}

.grade-icon {
  font-size: 2rem;
}

.grade-name {
  font-size: 1.1rem;
  font-weight: 800;
  color: var(--text-main);
}

.grade-level {
  font-size: 0.775rem;
  color: var(--text-muted);
}

.grade-sections-box {
  background: #f8fafc;
  border-radius: var(--radius-md);
  padding: 12px;
  border: 1px solid #f1f5f9;
}

.sec-label {
  font-size: 0.75rem;
  font-weight: 700;
  color: var(--text-muted);
  display: block;
  margin-bottom: 6px;
}

.sections-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.sec-tag {
  background: #ffffff;
  border: 1px solid var(--border-subtle);
  padding: 4px 10px;
  border-radius: var(--radius-full);
  font-size: 0.775rem;
  font-weight: 700;
  color: var(--text-secondary);
  display: flex;
  align-items: center;
  gap: 6px;
}

.del-sec-btn {
  background: transparent;
  border: none;
  color: #ef4444;
  cursor: pointer;
  font-size: 0.75rem;
  padding: 2px;
}

.del-sec-btn:hover {
  color: #b91c1c;
}

.no-sec-hint {
  font-size: 0.75rem;
  color: var(--text-light);
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

.form-input, .form-select {
  width: 100%;
  padding: 10px 14px;
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-md);
  font-size: 0.9rem;
  background: #f8fafc;
  outline: none;
}

.form-input:focus, .form-select:focus {
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
