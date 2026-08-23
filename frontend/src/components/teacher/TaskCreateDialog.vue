<template>
  <ShadcnDialog
    :model-value="modelValue"
    :title="defaultType === 'EXAM' ? 'نشر امتحان جديد' : 'نشر واجب مدرسي جديد'"
    description="قم بتعبئة تفاصيل المهمة وتحديد الشعبة وإرفاق الحل النموذجي المعتمد"
    icon="➕"
    max-width="md"
    @update:model-value="$emit('update:modelValue', $event)"
  >
    <form class="task-create-form" @submit.prevent="handleSubmit">
      <div v-if="errorMessage" class="error-box animate-fade-in">
        <span>⚠️</span>
        <span>{{ errorMessage }}</span>
      </div>

      <!-- Title -->
      <div class="form-group">
        <label class="form-label">عنوان المهمة *</label>
        <input
          v-model="form.title"
          type="text"
          class="form-input"
          placeholder="مثال: واجب الرياضيات - الدرس الثالث"
          required
        />
      </div>

      <!-- Assignment (Subject & Section) Selection -->
      <div class="form-group">
        <label class="form-label">الشعبة والمادة المستهدفة *</label>
        <select v-model="selectedAssignmentId" class="form-select" required>
          <option value="" disabled>اختر الفصل والمادة...</option>
          <option
            v-for="a in assignments"
            :key="a.assignment_id"
            :value="a.assignment_id"
          >
            {{ a.grade_name }} - شعبة {{ a.section_name }} ({{ a.subject_name }})
          </option>
        </select>
      </div>

      <!-- Type & Due Date -->
      <div class="form-row">
        <div class="form-group">
          <label class="form-label">نوع المهمة *</label>
          <select v-model="form.task_type" class="form-select" required>
            <option value="HOMEWORK">واجب منزلي</option>
            <option value="EXAM">امتحان / اختبار</option>
          </select>
        </div>

        <div class="form-group">
          <label class="form-label">تاريخ التسليم / الموعد</label>
          <input
            v-model="form.due_date"
            type="date"
            class="form-input"
          />
        </div>
      </div>

      <!-- Description -->
      <div class="form-group">
        <label class="form-label">الوصف والتوجيهات</label>
        <textarea
          v-model="form.description"
          class="form-textarea"
          rows="3"
          placeholder="اكتب تفاصيل التكليف أو صفحات الكتاب المطلوبة..."
        ></textarea>
      </div>

      <!-- Task Attachment File -->
      <div class="form-group">
        <label class="form-label">ملف الواجب / الامتحان (اختياري - حد 10MB)</label>
        <input
          type="file"
          accept=".pdf,.png,.jpg,.jpeg,.webp"
          class="form-file-input"
          @change="handleAttachmentChange"
        />
      </div>

      <!-- 💡 MODEL ANSWER TOGGLE & SECTION -->
      <div class="solution-toggle-box">
        <div class="toggle-header">
          <label class="toggle-label">
            <input v-model="form.has_solution" type="checkbox" class="toggle-checkbox" />
            <span>💡 تفعيل الحل النموذجي المعتمد (يظهر فورياً للطلاب)</span>
          </label>
        </div>

        <div v-if="form.has_solution" class="solution-fields animate-fade-in">
          <div class="form-group">
            <label class="form-label">خطوات وشرح الحل النموذجي</label>
            <textarea
              v-model="form.solution_text"
              class="form-textarea"
              rows="3"
              placeholder="اكتب خطوات الحل أو النواتج المعتمدة بالتفصيل..."
            ></textarea>
          </div>

          <div class="form-group">
            <label class="form-label">مستند الحل النموذجي المعتمد (PDF / صورة)</label>
            <input
              type="file"
              accept=".pdf,.png,.jpg,.jpeg,.webp"
              class="form-file-input"
              @change="handleSolutionAttachmentChange"
            />
          </div>
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="dialog-actions">
        <BaseButton
          type="button"
          variant="secondary"
          @click="$emit('update:modelValue', false)"
        >
          إلغاء
        </BaseButton>
        <BaseButton type="submit" :loading="loading">
          نشر المهمة للطلاب 🚀
        </BaseButton>
      </div>
    </form>
  </ShadcnDialog>
</template>

<script setup>
import { ref, reactive, watch, onMounted } from 'vue';
import api from '../../services/api';
import ShadcnDialog from '../common/ShadcnDialog.vue';
import BaseButton from '../common/BaseButton.vue';

const props = defineProps({
  modelValue: { type: Boolean, default: false },
  defaultType: { type: String, default: 'HOMEWORK' }
});

const emit = defineEmits(['update:modelValue', 'created']);

const loading = ref(false);
const errorMessage = ref('');
const assignments = ref([]);
const selectedAssignmentId = ref('');

const form = reactive({
  title: '',
  description: '',
  task_type: props.defaultType,
  due_date: '',
  has_solution: false,
  solution_text: '',
  attachment: null,
  solution_attachment: null
});

watch(() => props.defaultType, (newType) => {
  form.task_type = newType;
});

async function fetchAssignments() {
  try {
    const res = await api.get('/teacher/assignments');
    if (res.data.success) {
      assignments.value = res.data.data || [];
      if (assignments.value.length > 0 && !selectedAssignmentId.value) {
        selectedAssignmentId.value = assignments.value[0].assignment_id;
      }
    }
  } catch (err) {
    console.error('Error fetching assignments:', err);
  }
}

function handleAttachmentChange(e) {
  form.attachment = e.target.files[0] || null;
}

function handleSolutionAttachmentChange(e) {
  form.solution_attachment = e.target.files[0] || null;
}

async function handleSubmit() {
  errorMessage.value = '';

  const selectedAssign = assignments.value.find(a => a.assignment_id === selectedAssignmentId.value);
  if (!selectedAssign) {
    errorMessage.value = 'يرجى اختيار الشعبة والمادة المسندة.';
    return;
  }

  loading.value = true;

  try {
    const formData = new FormData();
    formData.append('title', form.title);
    formData.append('description', form.description);
    formData.append('task_type', form.task_type);
    formData.append('subject_id', selectedAssign.subject_id);
    formData.append('section_id', selectedAssign.section_id);
    if (form.due_date) formData.append('due_date', form.due_date);
    formData.append('has_solution', form.has_solution ? '1' : '0');
    if (form.solution_text) formData.append('solution_text', form.solution_text);

    if (form.attachment) {
      formData.append('attachment', form.attachment);
    }
    if (form.solution_attachment) {
      formData.append('solution_attachment', form.solution_attachment);
    }

    const res = await api.post('/teacher/tasks', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });

    if (res.data.success) {
      // Reset form
      form.title = '';
      form.description = '';
      form.has_solution = false;
      form.solution_text = '';
      form.attachment = null;
      form.solution_attachment = null;

      emit('update:modelValue', false);
      emit('created');
    } else {
      errorMessage.value = res.data.message || 'حدث خطأ أثناء إنشاء المهمة.';
    }
  } catch (err) {
    if (err.response && err.response.data && err.response.data.message) {
      errorMessage.value = err.response.data.message;
    } else {
      errorMessage.value = 'حدث خطأ في الاتصال بالخادم.';
    }
  } finally {
    loading.value = false;
  }
}

onMounted(() => {
  fetchAssignments();
});
</script>

<style scoped>
.task-create-form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.error-box {
  background: #fef2f2;
  border: 1px solid #fecaca;
  color: #b91c1c;
  padding: 10px 14px;
  border-radius: var(--radius-md);
  font-size: 0.85rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 8px;
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

.form-input, .form-select, .form-textarea {
  width: 100%;
  padding: 10px 14px;
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-md);
  font-size: 0.9rem;
  background: #f8fafc;
  outline: none;
  transition: all 0.2s ease;
}

.form-input:focus, .form-select:focus, .form-textarea:focus {
  border-color: var(--primary);
  background: #ffffff;
  box-shadow: 0 0 0 3px var(--primary-light);
}

.form-file-input {
  font-size: 0.85rem;
  color: var(--text-muted);
}

.solution-toggle-box {
  background: #f0fdf4;
  border: 1px solid #bbf7d0;
  border-radius: var(--radius-md);
  padding: 14px;
}

.toggle-label {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.9rem;
  font-weight: 800;
  color: #166534;
  cursor: pointer;
}

.toggle-checkbox {
  width: 18px;
  height: 18px;
  cursor: pointer;
}

.solution-fields {
  margin-top: 14px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding-top: 12px;
  border-top: 1px solid #bbf7d0;
}

.dialog-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 12px;
}
</style>
