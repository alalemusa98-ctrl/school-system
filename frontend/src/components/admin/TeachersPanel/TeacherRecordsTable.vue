<template>
  <div class="teachers-panel-root">
    <!-- View 1: Teacher Profile View -->
    <TeacherProfile
      v-if="selectedTeacherForProfile"
      :teacher="selectedTeacherForProfile"
      :teacher-assignments="getTeacherAssignmentsList(selectedTeacherForProfile.id)"
      @back="selectedTeacherForProfile = null"
      @assign="openAssignModalForTeacher"
      @delete="handleDeleteTeacher"
      @remove-assignment="handleDeleteAssignment"
    />

    <!-- View 2: Main Records & Assignments Matrix -->
    <div v-else class="teachers-records-panel">
      <!-- Panel Top Bar -->
      <div class="panel-top-bar">
        <div>
          <h2 class="panel-title flex-align-center" style="gap: 8px;">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#4f46e5" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
              <circle cx="12" cy="7" r="4"/>
            </svg>
            <span>إدارة المعلمين والتكليفات المدرسية</span>
          </h2>
          <p class="panel-desc">إدارة المعلمين، نصاب التدريس، وإسناد المواد والشعب الدراسية</p>
        </div>
        <div class="top-actions">
          <button class="saas-btn-primary" @click="isAddTeacherModalOpen = true">
            <span>+ إضافة معلم جديد</span>
          </button>
          <button class="saas-btn-outline" @click="openAssignModal">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
              <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
            </svg>
            <span>تكليف معلم بالمادة 🔗</span>
          </button>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="loading-state">
        <span class="loading-spinner"></span>
        <p>جاري تحميل سجلات المعلمين والتكليفات...</p>
      </div>

      <!-- Teachers & Assignments Section -->
      <div v-else class="teachers-content-layout">
        <!-- 1. Teachers List Table -->
        <div class="table-container">
          <h3 class="sub-table-title">قائمة المعلمين المعتمدين</h3>
          <table class="saas-table">
            <thead>
              <tr>
                <th>اسم المعلم</th>
                <th>اسم المستخدم</th>
                <th>نصاب الفصول المسندة</th>
                <th class="text-center">إجراءات الإدارة</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="t in teachers" :key="t.id">
                <td>
                  <div class="teacher-name-cell" @click="viewTeacherProfile(t)" title="انقر لفتح الملف الأكاديمي">
                    <div class="teacher-avatar-sq">
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#4f46e5" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                        <circle cx="12" cy="7" r="4"/>
                      </svg>
                    </div>
                    <span class="teacher-name-txt clickable">{{ t.full_name }}</span>
                  </div>
                </td>
                <td>
                  <code class="code-tag">{{ t.username }}</code>
                </td>
                <td>
                  <span class="assign-count-badge">
                    {{ getTeacherAssignmentsCount(t.id) }} فصول/مواد
                  </span>
                </td>
                <td class="text-center">
                  <div class="action-btns">
                    <button
                      class="tbl-action-btn btn-assign"
                      @click="openAssignModalForTeacher(t)"
                      title="إسناد مادة جديدة"
                    >
                      🔗 تكليف
                    </button>
                    <button
                      class="tbl-action-btn btn-del"
                      @click="handleDeleteTeacher(t.id)"
                      title="حذف حساب المعلم"
                    >
                      🗑️ حذف
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- 2. Assignments Matrix Table -->
        <div class="table-container">
          <h3 class="sub-table-title">جدول التكليفات الأكاديمية (Teacher Assignments)</h3>
          <table class="saas-table">
            <thead>
              <tr>
                <th>المعلم المكلف</th>
                <th>الصف والشعبة</th>
                <th>المادة المسندة</th>
                <th class="text-center">إلغاء التكليف</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="a in assignments" :key="a.assignment_id">
                <td><strong>{{ a.teacher_name }}</strong></td>
                <td>
                  <span class="section-tag">{{ a.grade_name }} - شعبة {{ a.section_name }}</span>
                </td>
                <td>
                  <span class="subject-tag">📖 {{ a.subject_name }}</span>
                </td>
                <td class="text-center">
                  <button
                    class="tbl-action-btn btn-del"
                    @click="handleDeleteAssignment(a.assignment_id)"
                    title="إلغاء التكليف"
                  >
                    ✕ إلغاء
                  </button>
                </td>
              </tr>
              <tr v-if="assignments.length === 0">
                <td colspan="4" class="text-center empty-cell">
                  لا توجد تكليفات أكاديمية مسندة حالياً. اضغط على "تكليف معلم بالمادة" للبدء.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- 1. Add Teacher Modal -->
    <ShadcnDialog
      v-model="isAddTeacherModalOpen"
      title="إضافة معلم جديد"
      description="أدخل اسم المعلم الثلاثي واسم المستخدم وكلمة المرور لتسجيل الدخول"
      icon="👨‍🏫"
      max-width="sm"
    >
      <form class="modal-form" @submit.prevent="handleAddTeacher">
        <div class="form-group">
          <label class="form-label">الاسم الكامل *</label>
          <input
            v-model="newTeacher.full_name"
            type="text"
            placeholder="مثال: أ. محمود الفرجاني"
            class="form-input"
            required
          />
        </div>

        <div class="form-group">
          <label class="form-label">اسم المستخدم *</label>
          <input
            v-model="newTeacher.username"
            type="text"
            placeholder="مثال: teacher6"
            class="form-input"
            required
          />
        </div>

        <div class="form-group">
          <label class="form-label">كلمة المرور *</label>
          <input
            v-model="newTeacher.password"
            type="password"
            placeholder="••••••••"
            class="form-input"
            required
          />
        </div>

        <div class="form-actions">
          <BaseButton type="button" variant="secondary" @click="isAddTeacherModalOpen = false">إلغاء</BaseButton>
          <BaseButton type="submit" :loading="submitting">حفظ المعلم 💾</BaseButton>
        </div>
      </form>
    </ShadcnDialog>

    <!-- 2. Assign Teacher Modal -->
    <ShadcnDialog
      v-model="isAssignModalOpen"
      title="إسناد مادة وشعبة لمعلم"
      description="اختر المعلم والصف والشعبة والمادة لتمكين المعلم من نشر الواجبات والامتحانات لهذه الشعبة"
      icon="🔗"
      max-width="md"
    >
      <form class="modal-form" @submit.prevent="handleAssignTeacher">
        <div class="form-group">
          <label class="form-label">المعلم المكلف *</label>
          <select v-model="assignForm.teacher_id" class="form-select" required>
            <option value="" disabled>اختر المعلم...</option>
            <option v-for="t in teachers" :key="t.id" :value="t.id">{{ t.full_name }} ({{ t.username }})</option>
          </select>
        </div>

        <div class="form-group">
          <label class="form-label">الصف الدراسي *</label>
          <select v-model="assignForm.grade_id" class="form-select" @change="onAssignGradeChange" required>
            <option value="" disabled>اختر الصف...</option>
            <option v-for="g in grades" :key="g.id" :value="g.id">{{ g.name }}</option>
          </select>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label class="form-label">الشعبة الدراسية *</label>
            <select v-model="assignForm.section_id" class="form-select" required>
              <option value="" disabled>اختر الشعبة...</option>
              <option v-for="s in assignSections" :key="s.id" :value="s.id">{{ s.name }}</option>
            </select>
          </div>

          <div class="form-group">
            <label class="form-label">المادة الدراسية *</label>
            <select v-model="assignForm.subject_id" class="form-select" required>
              <option value="" disabled>اختر المادة...</option>
              <option v-for="sub in assignSubjects" :key="sub.id" :value="sub.id">{{ sub.name }}</option>
            </select>
          </div>
        </div>

        <div class="form-actions">
          <BaseButton type="button" variant="secondary" @click="isAssignModalOpen = false">إلغاء</BaseButton>
          <BaseButton type="submit" :loading="submitting">تأكيد الإسناد 💾</BaseButton>
        </div>
      </form>
    </ShadcnDialog>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue';
import api from '../../../services/api';
import BaseButton from '../../common/BaseButton.vue';
import ShadcnDialog from '../../common/ShadcnDialog.vue';
import TeacherProfile from './TeacherProfile.vue';

const emit = defineEmits(['refresh-stats']);

const teachers = ref([]);
const assignments = ref([]);
const grades = ref([]);
const subjects = ref([]);
const loading = ref(true);
const submitting = ref(false);

const selectedTeacherForProfile = ref(null);
const isAddTeacherModalOpen = ref(false);
const isAssignModalOpen = ref(false);

const newTeacher = reactive({
  full_name: '',
  username: '',
  password: ''
});

const assignForm = reactive({
  teacher_id: '',
  grade_id: '',
  section_id: '',
  subject_id: ''
});

const assignSections = computed(() => {
  if (!assignForm.grade_id) return [];
  const g = grades.value.find(gr => gr.id === Number(assignForm.grade_id));
  return g ? g.sections || [] : [];
});

const assignSubjects = computed(() => {
  if (!assignForm.grade_id) return [];
  return subjects.value.filter(s => s.grade_id === Number(assignForm.grade_id));
});

function getTeacherAssignmentsCount(teacherId) {
  return assignments.value.filter(a => a.teacher_id === teacherId).length;
}

function getTeacherAssignmentsList(teacherId) {
  return assignments.value.filter(a => a.teacher_id === teacherId);
}

function viewTeacherProfile(teacher) {
  selectedTeacherForProfile.value = teacher;
}

async function fetchData() {
  loading.value = true;
  try {
    const [tRes, aRes, gRes, sRes] = await Promise.all([
      api.get('/admin/teachers'),
      api.get('/admin/assignments'),
      api.get('/admin/grades'),
      api.get('/admin/subjects')
    ]);

    if (tRes.data.success) {
      teachers.value = tRes.data.data || [];
      if (selectedTeacherForProfile.value) {
        const updated = teachers.value.find(t => t.id === selectedTeacherForProfile.value.id);
        if (updated) selectedTeacherForProfile.value = updated;
      }
    }
    if (aRes.data.success) assignments.value = aRes.data.data || [];
    if (gRes.data.success) grades.value = gRes.data.data || [];
    if (sRes.data.success) subjects.value = sRes.data.data || [];
  } catch (err) {
    console.error('Error fetching teachers/assignments:', err);
  } finally {
    loading.value = false;
  }
}

function openAssignModal() {
  if (teachers.value.length > 0) assignForm.teacher_id = teachers.value[0].id;
  if (grades.value.length > 0) {
    assignForm.grade_id = grades.value[0].id;
    onAssignGradeChange();
  }
  isAssignModalOpen.value = true;
}

function openAssignModalForTeacher(teacher) {
  assignForm.teacher_id = teacher.id;
  if (grades.value.length > 0) {
    assignForm.grade_id = grades.value[0].id;
    onAssignGradeChange();
  }
  isAssignModalOpen.value = true;
}

function onAssignGradeChange() {
  assignForm.section_id = '';
  assignForm.subject_id = '';
  if (assignSections.value.length > 0) assignForm.section_id = assignSections.value[0].id;
  if (assignSubjects.value.length > 0) assignForm.subject_id = assignSubjects.value[0].id;
}

async function handleAddTeacher() {
  submitting.value = true;
  try {
    const res = await api.post('/admin/teachers', {
      full_name: newTeacher.full_name,
      username: newTeacher.username,
      password: newTeacher.password
    });
    if (res.data.success) {
      newTeacher.full_name = '';
      newTeacher.username = '';
      newTeacher.password = '';
      isAddTeacherModalOpen.value = false;
      await fetchData();
      emit('refresh-stats');
    } else {
      alert(res.data.message || 'فشل إضافة المعلم');
    }
  } catch (err) {
    alert(err.response?.data?.message || 'حدث خطأ أثناء إضافة المعلم');
  } finally {
    submitting.value = false;
  }
}

async function handleAssignTeacher() {
  submitting.value = true;
  try {
    const res = await api.post('/admin/assignments', {
      teacher_id: assignForm.teacher_id,
      section_id: assignForm.section_id,
      subject_id: assignForm.subject_id
    });
    if (res.data.success) {
      isAssignModalOpen.value = false;
      await fetchData();
    } else {
      alert(res.data.message || 'فشل إسناد التكليف');
    }
  } catch (err) {
    alert(err.response?.data?.message || 'حدث خطأ أثناء إسناد التكليف');
  } finally {
    submitting.value = false;
  }
}

async function handleDeleteTeacher(id) {
  if (!confirm('هل أنت متأكد من حذف هذا المعلم؟')) return;
  try {
    const res = await api.delete(`/admin/teachers/${id}`);
    if (res.data.success) {
      if (selectedTeacherForProfile.value && selectedTeacherForProfile.value.id === id) {
        selectedTeacherForProfile.value = null;
      }
      await fetchData();
      emit('refresh-stats');
    } else {
      alert(res.data.message || 'فشل حذف المعلم');
    }
  } catch (err) {
    alert('حدث خطأ أثناء حذف المعلم');
  }
}

async function handleDeleteAssignment(id) {
  if (!confirm('هل أنت متأكد من إلغاء هذا التكليف؟')) return;
  try {
    const res = await api.delete(`/admin/assignments/${id}`);
    if (res.data.success) {
      await fetchData();
    } else {
      alert(res.data.message || 'فشل إلغاء التكليف');
    }
  } catch (err) {
    alert('حدث خطأ أثناء إلغاء التكليف');
  }
}

onMounted(() => {
  fetchData();
});
</script>

<style scoped>
.teachers-panel-root {
  width: 100%;
}

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

.saas-btn-primary {
  background: var(--primary);
  color: #ffffff;
  border: none;
  padding: 8px 18px;
  border-radius: var(--radius-md);
  font-size: 0.85rem;
  font-weight: 800;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(79, 70, 229, 0.25);
  transition: all 0.2s ease;
}

.saas-btn-primary:hover {
  background: var(--primary-hover);
  transform: translateY(-1px);
}

.saas-btn-outline {
  background: #ffffff;
  color: var(--primary);
  border: 1px solid #c7d2fe;
  padding: 8px 18px;
  border-radius: var(--radius-md);
  font-size: 0.85rem;
  font-weight: 800;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  transition: all 0.2s ease;
}

.saas-btn-outline:hover {
  background: var(--primary-light);
}

.teachers-content-layout {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.table-container {
  background: #ffffff;
  border-radius: var(--radius-xl);
  border: 1px solid var(--border-subtle);
  box-shadow: 0 4px 18px rgba(15, 23, 42, 0.03);
  padding: 20px;
  overflow-x: auto;
}

.sub-table-title {
  font-size: 1.05rem;
  font-weight: 800;
  color: var(--text-main);
  margin-bottom: 14px;
}

.saas-table {
  width: 100%;
  border-collapse: collapse;
  text-align: right;
  font-size: 0.875rem;
}

.saas-table th {
  background: #f8fafc;
  padding: 14px 18px;
  font-weight: 800;
  color: var(--text-secondary);
  border-bottom: 1px solid var(--border-subtle);
}

.saas-table td {
  padding: 14px 18px;
  border-bottom: 1px solid #f1f5f9;
  color: var(--text-main);
}

.teacher-name-cell {
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
}

.teacher-avatar-sq {
  width: 32px;
  height: 32px;
  border-radius: 8px;
  background: #eef2ff;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.teacher-name-txt.clickable {
  font-weight: 800;
  color: var(--text-main);
  transition: color 0.15s ease;
}

.teacher-name-txt.clickable:hover {
  color: var(--primary);
  text-decoration: underline;
}

.code-tag {
  background: #f1f5f9;
  color: #334155;
  padding: 3px 8px;
  border-radius: var(--radius-xs);
  font-family: monospace;
  font-weight: 700;
}

.assign-count-badge {
  background: var(--primary-light);
  color: var(--primary);
  padding: 4px 12px;
  border-radius: var(--radius-full);
  font-weight: 800;
  font-size: 0.775rem;
}

.section-tag {
  background: #f1f5f9;
  color: #334155;
  padding: 4px 12px;
  border-radius: var(--radius-full);
  font-size: 0.8rem;
  font-weight: 700;
}

.subject-tag {
  background: #e0f2fe;
  color: #0369a1;
  padding: 4px 12px;
  border-radius: var(--radius-full);
  font-size: 0.8rem;
  font-weight: 700;
}

.text-center {
  text-align: center;
}

.empty-cell {
  padding: 24px;
  color: var(--text-muted);
}

.action-btns {
  display: flex;
  justify-content: center;
  gap: 6px;
}

.tbl-action-btn {
  padding: 5px 10px;
  border-radius: var(--radius-sm);
  font-size: 0.775rem;
  font-weight: 700;
  cursor: pointer;
  border: 1px solid transparent;
  transition: all 0.15s ease;
}

.btn-assign {
  background: #f1f5f9;
  color: #4338ca;
}
.btn-assign:hover {
  background: #e0e7ff;
}

.btn-del {
  background: #fff1f2;
  color: #e11d48;
}
.btn-del:hover {
  background: #fee2e2;
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

.form-row {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
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
