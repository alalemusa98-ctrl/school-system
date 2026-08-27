<template>
  <div 
    class="glass-task-card animate-fade-in"
    :class="task.task_type === 'EXAM' ? 'exam-3d-glass' : 'homework-3d-glass'"
  >
    <!-- Top Gloss Reflection Layer -->
    <div class="card-glass-shine"></div>

    <!-- Vertical Stack Container (Each element on its own line) -->
    <div class="vertical-stack-container">
      
      <!-- Line 1: Subject Badge -->
      <div class="stack-row subject-row">
        <div class="vibrant-subject-badge">
          <span class="subject-icon">{{ getSubjectIcon(task.subject_name) }}</span>
          <span class="subject-name-text">{{ task.subject_name }}</span>
        </div>
      </div>

      <!-- Line 2: Task Title -->
      <div class="stack-row title-row">
        <h3 class="task-title">{{ task.title }}</h3>
      </div>

      <!-- Line 3: Description Text -->
      <div class="stack-row description-row" v-if="task.description">
        <p class="task-description">{{ task.description }}</p>
      </div>

      <!-- Line 4: Attachment Download Button -->
      <div class="stack-row attachment-row" v-if="task.attachment_path">
        <a :href="task.attachment_path" target="_blank" class="download-file-btn">
          📎 تحميل ملف {{ task.task_type === 'EXAM' ? 'الامتحان' : 'الواجب' }}
        </a>
      </div>

      <!-- Line 5: Solution Toggle & Drawer -->
      <div class="stack-row solution-row" v-if="task.has_solution">
        <button 
          class="toggle-solution-btn" 
          :class="{ active: showSolution }"
          @click="showSolution = !showSolution"
        >
          <span>💡 {{ showSolution ? 'إخفاء الحل النموذجي' : 'عرض الحل النموذجي' }}</span>
          <span class="arrow-indicator">{{ showSolution ? '▲' : '▼' }}</span>
        </button>

        <div class="solution-details animate-fade-in" v-if="showSolution">
          <p class="solution-text" v-if="task.solution_text">{{ task.solution_text }}</p>
          <a 
            v-if="task.solution_attachment_path" 
            :href="task.solution_attachment_path" 
            target="_blank" 
            class="solution-download-link"
          >
            📄 تحميل ملف الحل النموذجي
          </a>
        </div>
      </div>

      <!-- Line 6: Due Date Tag -->
      <div class="stack-row due-date-row" v-if="task.due_date">
        <div class="due-date-pill">
          <span>⏰ تاريخ التسليم:</span>
          <strong>{{ formatDate(task.due_date) }}</strong>
        </div>
      </div>

      <!-- Line 7: Publish Date -->
      <div class="stack-row publish-date-row">
        <span class="publish-date-text">تاريخ النشر: {{ formatDate(task.created_at) }}</span>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

defineProps({
  task: { type: Object, required: true }
});

const showSolution = ref(false);

function getSubjectIcon(name) {
  if (!name) return '📚';
  if (name.includes('إسلامية') || name.includes('قرآن')) return '🕌';
  if (name.includes('عربية') || name.includes('لغة')) return '📖';
  if (name.includes('رياضيات') || name.includes('حساب')) return '📐';
  if (name.includes('علوم') || name.includes('فيزياء') || name.includes('كيمياء')) return '🔬';
  if (name.includes('إنجليزية') || name.includes('English')) return '🔤';
  if (name.includes('تاريخ') || name.includes('جغرافيا') || name.includes('اجتماعيات')) return '🌍';
  if (name.includes('حاسوب') || name.includes('تقنية')) return '💻';
  return '📚';
}

function formatDate(dateStr) {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  return d.toLocaleDateString('ar-LY', { year: 'numeric', month: 'short', day: 'numeric' });
}
</script>

<style scoped>
/* 3D Glassmorphism Task Card */
.glass-task-card {
  position: relative;
  border-radius: 28px;
  padding: 24px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  transition: all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
  overflow: hidden;
  margin-bottom: 24px;
  border: 3px solid rgba(255, 255, 255, 0.9);
}

.glass-task-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 18px 36px rgba(0, 0, 0, 0.12);
}

.card-glass-shine {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 35%;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.55) 0%, rgba(255, 255, 255, 0) 100%);
  pointer-events: none;
  border-top-left-radius: 24px;
  border-top-right-radius: 24px;
}

/* Homework Theme - Golden Amber Glass */
.homework-3d-glass {
  background: linear-gradient(135deg, #ffffff 0%, #fffbeb 40%, #fef3c7 100%);
  border-color: #fcd34d;
}

/* Exam Theme - Rose Pink Castle Glass */
.exam-3d-glass {
  background: linear-gradient(135deg, #ffffff 0%, #fff1f2 40%, #ffe4e6 100%);
  border-color: #fda4af;
}

/* Vertical Stack - Every Element in its Own Line */
.vertical-stack-container {
  display: flex;
  flex-direction: column;
  gap: 14px;
  position: relative;
  z-index: 2;
}

.stack-row {
  width: 100%;
}

/* Line 1: Subject Badge */
.vibrant-subject-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
  color: #ffffff;
  padding: 8px 20px;
  border-radius: 20px;
  border: 2px solid #60a5fa;
  box-shadow: 0 4px 14px rgba(37, 99, 235, 0.25);
  font-weight: 900;
  font-size: 1.1rem;
}

.subject-icon {
  font-size: 1.25rem;
}

/* Line 2: Task Title */
.task-title {
  font-size: 1.6rem;
  font-weight: 900;
  color: #1e293b;
  line-height: 1.3;

}

/* Line 3: Description Text */
.task-description {
  font-size: 1.05rem;
  color: #334155;
  line-height: 1.6;
  background: rgba(255, 255, 255, 0.9);
  padding: 14px 18px;
  border-radius: 18px;
  border-right: 6px solid #3b82f6;
  font-weight: 600;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.03);
}

/* Line 4: Attachment Download Button */
.download-file-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  background: linear-gradient(180deg, #3b82f6 0%, #1d4ed8 100%);
  color: #ffffff;
  border: 2px solid #1e40af;
  padding: 12px 20px;
  border-radius: 18px;
  font-weight: 800;
  font-size: 1rem;
  text-decoration: none;
  box-shadow: 0 4px 12px rgba(29, 78, 216, 0.25);
  transition: all 0.2s ease;
}

.download-file-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(29, 78, 216, 0.35);
}

/* Line 5: Solution Toggle Button & Details */
.toggle-solution-btn {
  width: 100%;
  background: linear-gradient(180deg, #10b981 0%, #059669 100%);
  color: #ffffff;
  border: 2px solid #047857;
  padding: 12px 20px;
  border-radius: 18px;
  font-family: inherit;
  font-weight: 800;
  font-size: 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 4px 12px rgba(16, 185, 129, 0.25);
  transition: all 0.2s ease;
}

.toggle-solution-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(16, 185, 129, 0.35);
}

.solution-details {
  background: #ffffff;
  border: 3px solid #6ee7b7;
  padding: 16px;
  border-radius: 20px;
  margin-top: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.solution-text {
  font-size: 1rem;
  font-weight: 700;
  color: #065f46;
  white-space: pre-line;
  margin-bottom: 8px;
}

.solution-download-link {
  color: #047857;
  font-weight: 800;
  font-size: 0.95rem;
  text-decoration: underline;
}

/* Line 6: Due Date Pill */
.due-date-pill {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: #b45309;
  font-weight: 800;
  background: #fffbeb;
  padding: 8px 16px;
  border-radius: 14px;
  border: 1.5px solid #fde68a;
  font-size: 0.95rem;
}

/* Line 7: Publish Date */
.publish-date-row {
  padding-top: 4px;
  border-top: 1px solid rgba(0, 0, 0, 0.06);
}

.publish-date-text {
  color: #64748b;
  font-weight: 700;
  font-size: 0.85rem;
}
</style>
