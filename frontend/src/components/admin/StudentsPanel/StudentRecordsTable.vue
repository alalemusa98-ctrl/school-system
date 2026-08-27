<template>
  <div class="students-panel-root">
    <!-- View 1: Student Profile Detail View -->
    <StudentProfile
      v-if="selectedStudentForProfile"
      :student="selectedStudentForProfile"
      @back="selectedStudentForProfile = null"
      @edit="openEditStudentModal"
      @transfer="openTransferModalForStudent"
      @delete="handleDeleteStudent"
    />

    <!-- View 2: Main Records Table & Panels -->
    <div v-else class="students-records-panel">
      <!-- Panel Top Bar -->
      <div class="panel-top-bar">
        <div>
          <h2 class="panel-title flex-align-center" style="gap: 8px;">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
              <path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5"/>
            </svg>
            <span>إدارة سجلات وحسابات الطلاب</span>
          </h2>
          <p class="panel-desc">انقر على أي طالب لمشاهدة ملفه الكامل أو تنفيذ إجراءات النقل والتعديل</p>
        </div>
        <div class="top-actions">
          <button class="saas-btn-primary" @click="openAddStudentModal">
            <span>+ إضافة طالب جديد</span>
          </button>
          <button class="saas-btn-outline" @click="openGlobalTransferModal">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="17 1 21 5 17 9"></polyline>
              <path d="M3 11V9a4 4 0 0 1 4-4h14"></path>
              <polyline points="7 23 3 19 7 15"></polyline>
              <path d="M21 13v2a4 4 0 0 1-4 4H3"></path>
            </svg>
            <span>نقل طالب</span>
          </button>
        </div>
      </div>

      <!-- Filters & Search Bar -->
      <div class="table-filters-bar">
        <div class="search-input-wrapper">
          <svg class="search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#64748b" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            v-model="searchQuery"
            type="text"
            placeholder="بحث باسم الطالب، كود الطالب، أو رقم الجلوس..."
            class="search-field"
          />
        </div>

        <div class="select-filters">
          <select v-model="filterGradeId" class="filter-select" @change="onGradeFilterChange">
            <option value="">جميع الصفوف</option>
            <option v-for="g in grades" :key="g.id" :value="g.id">{{ g.name }}</option>
          </select>

          <select v-model="filterSectionId" class="filter-select">
            <option value="">جميع الشعب</option>
            <option v-for="s in availableSections" :key="s.id" :value="s.id">شعبة {{ s.name }} ({{ s.grade_name }})</option>
          </select>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="loading-state">
        <span class="loading-spinner"></span>
        <p>جاري تحميل سجلات الطلاب...</p>
      </div>

      <!-- Empty State -->
      <div v-else-if="filteredStudents.length === 0" class="empty-state">
        <span class="empty-icon">👥</span>
        <h3>لا توجد نتائج مطابقة لبحثك</h3>
        <p>تأكد من كتابة الاسم أو رقم الجلوس بشكل صحيح، أو أضف طالباً جديداً.</p>
      </div>

      <!-- Students Data Table -->
      <div v-else class="table-container">
        <table class="saas-table">
          <thead>
            <tr>
              <th>رقم الجلوس</th>
              <th>كود الطالب</th>
              <th>الاسم الكامل للطالب</th>
              <th>الصف الدراسي</th>
              <th>الشعبة</th>
              <th class="text-center">إجراءات الإدارة</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="student in filteredStudents" :key="student.id">
              <td>
                <span class="roll-pill">{{ student.roll_number }}</span>
              </td>
              <td>
                <code class="code-secret">{{ student.student_code }}</code>
              </td>
              <td>
                <div class="student-name-cell" @click="viewStudentProfile(student)" title="انقر لفتح الملف الشامل">
                  <div class="student-avatar-sq">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#4f46e5" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
                      <path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5"/>
                    </svg>
                  </div>
                  <span class="student-name-txt clickable">{{ student.full_name }}</span>
                </div>
              </td>
              <td>
                <span class="grade-pill-tag">{{ student.grade_name }}</span>
              </td>
              <td>
                <span class="section-pill-tag">شعبة {{ student.section_name }}</span>
              </td>
              <td class="text-center">
                <div class="action-btns">
                  <button
                    class="tbl-action-btn btn-transfer"
                    @click="openTransferModalForStudent(student)"
                    title="نقل الطالب إلى صف/شعبة أخرى"
                  >
                    🔄 نقل
                  </button>
                  <button
                    class="tbl-action-btn btn-edit"
                    @click="openEditStudentModal(student)"
                    title="تعديل بيانات الطالب"
                  >
                    ✏️ تعديل
                  </button>
                  <button
                    class="tbl-action-btn btn-del"
                    @click="handleDeleteStudent(student.id)"
                    title="ترقين قيد / حذف الطالب"
                  >
                    🗑️ حذف
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- ===== MODALS CONTAINER ===== -->

    <!-- 1. Add Student Modal -->
    <ShadcnDialog
      v-model="isAddModalOpen"
      title="إضافة طالب جديد للمنظومة"
      description="أدخل البيانات الأساسية للطالب لتسجيله وتخصيص قيده الصفي"
      icon="🎓"
      max-width="md"
    >
      <form class="modal-form" @submit.prevent="handleAddStudent">
        <div class="form-group">
          <label class="form-label">الاسم الكامل للطالب *</label>
          <input
            v-model="newStudent.full_name"
            type="text"
            placeholder="الاسم الثلاثي أو الرباعي"
            class="form-input"
            required
          />
        </div>

        <div class="form-row">
          <div class="form-group">
            <label class="form-label">رقم الجلوس / القيد *</label>
            <input
              v-model="newStudent.roll_number"
              type="text"
              placeholder="مثال: 1005"
              class="form-input"
              required
            />
          </div>

          <div class="form-group">
            <label class="form-label">كود الدخول السري *</label>
            <input
              v-model="newStudent.student_code"
              type="text"
              placeholder="مثال: ST1005"
              class="form-input"
              required
            />
          </div>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label class="form-label">الصف الدراسي *</label>
            <select v-model="newStudent.grade_id" class="form-select" @change="onNewStudentGradeChange" required>
              <option value="" disabled>اختر الصف...</option>
              <option v-for="g in grades" :key="g.id" :value="g.id">{{ g.name }}</option>
            </select>
          </div>

          <div class="form-group">
            <label class="form-label">الشعبة الدراسية *</label>
            <select v-model="newStudent.section_id" class="form-select" required>
              <option value="" disabled>اختر الشعبة...</option>
              <option v-for="s in addStudentSections" :key="s.id" :value="s.id">{{ s.name }}</option>
            </select>
          </div>
        </div>

        <div class="form-actions">
          <BaseButton type="button" variant="secondary" @click="isAddModalOpen = false">إلغاء</BaseButton>
          <BaseButton type="submit" :loading="submitting">حفظ وتسجيل الطالب 💾</BaseButton>
        </div>
      </form>
    </ShadcnDialog>

    <!-- 2. Transfer Student Modal -->
    <ShadcnDialog
      v-model="isTransferModalOpen"
      title="نقل الطالب بين الصفوف والشعب"
      :description="transferStudent ? `الطالب المحدد: ${transferStudent.full_name}` : 'حدد الطالب والشعبة المستهدفة لنقله'"
      icon="🔄"
      max-width="md"
    >
      <form class="modal-form" @submit.prevent="handleExecuteTransfer">
        <div v-if="!transferStudent" class="form-group">
          <label class="form-label">اختر الطالب المراد نقله *</label>
          <select v-model="transferSelectedStudentId" class="form-select" required @change="onTransferStudentSelect">
            <option value="" disabled>اختر الطالب...</option>
            <option v-for="s in students" :key="s.id" :value="s.id">
              {{ s.full_name }} ({{ s.grade_name }} - شعبة {{ s.section_name }})
            </option>
          </select>
        </div>

        <div v-if="activeTransferStudent" class="current-placement-box">
          <span class="placement-lbl">القيد الحالي للطالب:</span>
          <div class="placement-val">
            <span class="grade-pill-tag">{{ activeTransferStudent.grade_name }}</span>
            <span class="section-pill-tag">شعبة {{ activeTransferStudent.section_name }}</span>
          </div>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label class="form-label">الصف الدراسي المنقول إليه *</label>
            <select v-model="transferForm.grade_id" class="form-select" @change="onTransferGradeChange" required>
              <option value="" disabled>اختر الصف...</option>
              <option v-for="g in grades" :key="g.id" :value="g.id">{{ g.name }}</option>
            </select>
          </div>

          <div class="form-group">
            <label class="form-label">الشعبة المنقول إليها *</label>
            <select v-model="transferForm.section_id" class="form-select" required>
              <option value="" disabled>اختر الشعبة...</option>
              <option v-for="s in transferSections" :key="s.id" :value="s.id">شعبة {{ s.name }}</option>
            </select>
          </div>
        </div>

        <div class="form-actions">
          <BaseButton type="button" variant="secondary" @click="isTransferModalOpen = false">إلغاء</BaseButton>
          <BaseButton type="submit" :loading="submitting">تنفيذ عملية النقل 🔄</BaseButton>
        </div>
      </form>
    </ShadcnDialog>

    <!-- 3. Edit Student Modal -->
    <ShadcnDialog
      v-model="isEditModalOpen"
      title="تعديل بيانات الطالب"
      :description="editingStudent ? `الطالب: ${editingStudent.full_name}` : ''"
      icon="✏️"
      max-width="md"
    >
      <form v-if="editingStudent" class="modal-form" @submit.prevent="handleUpdateStudent">
        <div class="form-group">
          <label class="form-label">الاسم الكامل للطالب</label>
          <input v-model="editForm.full_name" type="text" class="form-input" required />
        </div>

        <div class="form-row">
          <div class="form-group">
            <label class="form-label">كود الدخول السري</label>
            <input v-model="editForm.student_code" type="text" class="form-input" required />
          </div>

          <div class="form-group">
            <label class="form-label">الشعبة الدراسية</label>
            <select v-model="editForm.section_id" class="form-select" required>
              <option v-for="s in allSections" :key="s.id" :value="s.id">
                {{ s.grade_name }} - شعبة {{ s.name }}
              </option>
            </select>
          </div>
        </div>

        <div class="form-actions">
          <BaseButton type="button" variant="secondary" @click="isEditModalOpen = false">إلغاء</BaseButton>
          <BaseButton type="submit" :loading="submitting">حفظ التغييرات 💾</BaseButton>
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
import StudentProfile from './StudentProfile.vue';

const emit = defineEmits(['refresh-stats']);

const students = ref([]);
const grades = ref([]);
const allSections = ref([]);
const loading = ref(true);
const submitting = ref(false);

const searchQuery = ref('');
const filterGradeId = ref('');
const filterSectionId = ref('');

const selectedStudentForProfile = ref(null);
const isAddModalOpen = ref(false);
const isEditModalOpen = ref(false);
const isTransferModalOpen = ref(false);

const editingStudent = ref(null);
const transferStudent = ref(null);
const transferSelectedStudentId = ref('');

const newStudent = reactive({
  full_name: '',
  roll_number: '',
  student_code: '',
  grade_id: '',
  section_id: ''
});

const editForm = reactive({
  full_name: '',
  student_code: '',
  section_id: ''
});

const transferForm = reactive({
  grade_id: '',
  section_id: ''
});

const activeTransferStudent = computed(() => {
  if (transferStudent.value) return transferStudent.value;
  if (transferSelectedStudentId.value) {
    return students.value.find(s => s.id === Number(transferSelectedStudentId.value));
  }
  return null;
});

const addStudentSections = computed(() => {
  if (!newStudent.grade_id) return [];
  return allSections.value.filter(s => s.grade_id === Number(newStudent.grade_id));
});

const transferSections = computed(() => {
  if (!transferForm.grade_id) return [];
  return allSections.value.filter(s => s.grade_id === Number(transferForm.grade_id));
});

const availableSections = computed(() => {
  if (!filterGradeId.value) return allSections.value;
  return allSections.value.filter(s => s.grade_id === Number(filterGradeId.value));
});

const filteredStudents = computed(() => {
  return students.value.filter(s => {
    const q = searchQuery.value.toLowerCase().trim();
    const matchesSearch =
      !q ||
      s.full_name.toLowerCase().includes(q) ||
      (s.student_code && s.student_code.toLowerCase().includes(q)) ||
      s.roll_number.toLowerCase().includes(q);

    const matchesGrade = !filterGradeId.value || s.grade_id === Number(filterGradeId.value);
    const matchesSection = !filterSectionId.value || s.section_id === Number(filterSectionId.value);

    return matchesSearch && matchesGrade && matchesSection;
  });
});

async function fetchData() {
  loading.value = true;
  try {
    const [studentsRes, gradesRes] = await Promise.all([
      api.get('/admin/students'),
      api.get('/admin/grades')
    ]);

    if (studentsRes.data.success) {
      students.value = studentsRes.data.data || [];
      // Update selected student if open
      if (selectedStudentForProfile.value) {
        const updated = students.value.find(s => s.id === selectedStudentForProfile.value.id);
        if (updated) selectedStudentForProfile.value = updated;
      }
    }
    if (gradesRes.data.success) {
      grades.value = gradesRes.data.data || [];
      const secs = [];
      grades.value.forEach(g => {
        if (g.sections) {
          g.sections.forEach(s => {
            secs.push({ ...s, grade_name: g.name, grade_id: g.id });
          });
        }
      });
      allSections.value = secs;
    }
  } catch (err) {
    console.error('Error fetching students data:', err);
  } finally {
    loading.value = false;
  }
}

function viewStudentProfile(student) {
  selectedStudentForProfile.value = student;
}

function onGradeFilterChange() {
  filterSectionId.value = '';
}

function onNewStudentGradeChange() {
  newStudent.section_id = '';
  const list = addStudentSections.value;
  if (list.length > 0) {
    newStudent.section_id = list[0].id;
  }
}

function openAddStudentModal() {
  newStudent.full_name = '';
  newStudent.roll_number = '';
  newStudent.student_code = '';
  if (grades.value.length > 0) {
    newStudent.grade_id = grades.value[0].id;
    onNewStudentGradeChange();
  }
  isAddModalOpen.value = true;
}

async function handleAddStudent() {
  submitting.value = true;
  try {
    const res = await api.post('/admin/students', {
      full_name: newStudent.full_name,
      roll_number: newStudent.roll_number,
      student_code: newStudent.student_code,
      section_id: newStudent.section_id
    });
    if (res.data.success) {
      isAddModalOpen.value = false;
      await fetchData();
      emit('refresh-stats');
    } else {
      alert(res.data.message || 'فشل تسجيل الطالب');
    }
  } catch (err) {
    alert(err.response?.data?.message || 'حدث خطأ أثناء تسجيل الطالب');
  } finally {
    submitting.value = false;
  }
}

function openEditStudentModal(student) {
  editingStudent.value = student;
  editForm.full_name = student.full_name;
  editForm.student_code = student.student_code;
  editForm.section_id = student.section_id;
  isEditModalOpen.value = true;
}

async function handleUpdateStudent() {
  submitting.value = true;
  try {
    const res = await api.put(`/admin/students/${editingStudent.value.id}`, {
      full_name: editForm.full_name,
      student_code: editForm.student_code,
      section_id: editForm.section_id
    });
    if (res.data.success) {
      isEditModalOpen.value = false;
      await fetchData();
    } else {
      alert(res.data.message || 'فشل تعديل بيانات الطالب');
    }
  } catch (err) {
    alert(err.response?.data?.message || 'حدث خطأ أثناء تعديل بيانات الطالب');
  } finally {
    submitting.value = false;
  }
}

function openGlobalTransferModal() {
  transferStudent.value = null;
  transferSelectedStudentId.value = students.value.length > 0 ? students.value[0].id : '';
  onTransferStudentSelect();
  isTransferModalOpen.value = true;
}

function openTransferModalForStudent(student) {
  transferStudent.value = student;
  transferSelectedStudentId.value = student.id;
  transferForm.grade_id = student.grade_id;
  onTransferGradeChange();
  isTransferModalOpen.value = true;
}

function onTransferStudentSelect() {
  const st = activeTransferStudent.value;
  if (st) {
    transferForm.grade_id = st.grade_id;
    onTransferGradeChange();
  }
}

function onTransferGradeChange() {
  transferForm.section_id = '';
  const list = transferSections.value;
  if (list.length > 0) {
    transferForm.section_id = list[0].id;
  }
}

async function handleExecuteTransfer() {
  const targetStudent = activeTransferStudent.value;
  if (!targetStudent || !transferForm.section_id) {
    alert('يرجى تحديد الطالب والشعبة المستهدفة.');
    return;
  }

  submitting.value = true;
  try {
    const res = await api.put(`/admin/students/${targetStudent.id}`, {
      full_name: targetStudent.full_name,
      student_code: targetStudent.student_code,
      section_id: transferForm.section_id
    });

    if (res.data.success) {
      isTransferModalOpen.value = false;
      await fetchData();
      emit('refresh-stats');
    } else {
      alert(res.data.message || 'فشل تنفيذ عملية النقل');
    }
  } catch (err) {
    alert(err.response?.data?.message || 'حدث خطأ أثناء نقل الطالب');
  } finally {
    submitting.value = false;
  }
}

async function handleDeleteStudent(id) {
  if (!confirm('هل أنت متأكد من ترقين قيد/حذف هذا الطالب من المنظومة؟')) return;
  try {
    const res = await api.delete(`/admin/students/${id}`);
    if (res.data.success) {
      if (selectedStudentForProfile.value && selectedStudentForProfile.value.id === id) {
        selectedStudentForProfile.value = null;
      }
      await fetchData();
      emit('refresh-stats');
    } else {
      alert(res.data.message || 'فشل حذف الطالب');
    }
  } catch (err) {
    alert('حدث خطأ أثناء حذف الطالب');
  }
}

onMounted(() => {
  fetchData();
});
</script>

<style scoped>
.students-panel-root {
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

.table-filters-bar {
  background: #ffffff;
  border-radius: var(--radius-lg);
  padding: 14px 18px;
  border: 1px solid var(--border-subtle);
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 12px;
}

.search-input-wrapper {
  position: relative;
  flex: 1;
  min-width: 280px;
}

.search-icon {
  position: absolute;
  right: 14px;
  top: 50%;
  transform: translateY(-50%);
}

.search-field {
  width: 100%;
  padding: 9px 38px 9px 14px;
  border: 1px solid var(--border-subtle);
  border-radius: 40px;
  font-size: 0.875rem;
  background: #f8fafc;
  outline: none;
  transition: all 0.2s ease;
}

.search-field:focus {
  border-color: var(--primary);
  background: #ffffff;
  box-shadow: 0 0 0 3px var(--primary-light);
}

.select-filters {
  display: flex;
  gap: 10px;
}

.filter-select {
  padding: 9px 14px;
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-md);
  font-size: 0.875rem;
  background: #f8fafc;
  font-weight: 600;
  outline: none;
}

.table-container {
  background: #ffffff;
  border-radius: var(--radius-xl);
  border: 1px solid var(--border-subtle);
  box-shadow: 0 4px 18px rgba(15, 23, 42, 0.03);
  overflow-x: auto;
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

.roll-pill {
  background: var(--primary-light);
  color: var(--primary);
  padding: 4px 10px;
  border-radius: var(--radius-full);
  font-weight: 800;
  font-size: 0.8rem;
}

.code-secret {
  background: #f1f5f9;
  color: #334155;
  padding: 3px 8px;
  border-radius: 6px;
  font-family: monospace;
  font-size: 0.85rem;
  font-weight: 700;
}

.student-name-cell {
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
}

.student-avatar-sq {
  width: 32px;
  height: 32px;
  border-radius: 8px;
  background: #eef2ff;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.student-name-txt.clickable {
  font-weight: 800;
  color: var(--text-main);
  transition: color 0.15s ease;
}

.student-name-txt.clickable:hover {
  color: var(--primary);
  text-decoration: underline;
}

.grade-pill-tag {
  background: var(--primary-light);
  color: var(--primary);
  padding: 4px 12px;
  border-radius: var(--radius-full);
  font-size: 12px;
  font-weight: 800;
}

.section-pill-tag {
  background: #f1f5f9;
  color: #334155;
  padding: 4px 12px;
  border-radius: var(--radius-full);
  font-size: 12px;
  font-weight: 800;
}

.text-center {
  text-align: center;
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

.btn-transfer {
  background: #f1f5f9;
  color: #4338ca;
}
.btn-transfer:hover {
  background: #e0e7ff;
}

.btn-edit {
  background: #f8fafc;
  color: #334155;
  border-color: #e2e8f0;
}
.btn-edit:hover {
  background: #f1f5f9;
}

.btn-del {
  background: #fff1f2;
  color: #e11d48;
}
.btn-del:hover {
  background: #fee2e2;
}

.current-placement-box {
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: var(--radius-md);
  padding: 12px 14px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.placement-lbl {
  font-size: 0.8rem;
  font-weight: 700;
  color: var(--text-muted);
}

.placement-val {
  display: flex;
  gap: 6px;
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

.loading-state, .empty-state {
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
