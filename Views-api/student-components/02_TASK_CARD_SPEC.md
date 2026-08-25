# 📝 02. مواصفات كروت الواجبات والامتحانات (`TaskCard.vue`)

> **الملف المرجعي:** [`Views-api/student-components/02_TASK_CARD_SPEC.md`](file:///c:/Users/alhareth/Desktop/work/school-system/Views-api/student-components/02_TASK_CARD_SPEC.md)  
> **اسم المكون البرمجي:** `TaskCard.vue` ([`src/components/student/TaskCard.vue`](file:///c:/Users/alhareth/Desktop/work/school-system/frontend/src/components/student/TaskCard.vue))  
> **الوصف:** المكون المخصص لعرض كروت المهمة الدراسية (واجب مدرسي أو امتحان) مع شارة المادة، العنوان، الوصف، رابط الملف المرفق، خيار إظهار/إخفاء الحل النموذجي المعتمد، وتاريخ التسليم.

---

## 📐 1. هيكل الـ Vue / HTML Component Markup

```html
<template>
  <div 
    class="glass-task-card animate-fade-in"
    :class="task.task_type === 'EXAM' ? 'exam-3d-glass' : 'homework-3d-glass'"
  >
    <!-- Top Gloss Reflection Layer -->
    <div class="card-glass-shine"></div>

    <!-- Vertical Stack Container (Single-column layout) -->
    <div class="vertical-stack-container">
      
      <!-- Line 1: Subject Badge & Icon -->
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

      <!-- Line 5: Model Solution Toggle & Box -->
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
```

---

## ⚙️ 2. الـ Props والبيانات المطلوبة

| اسم الـ Prop | النوع | إجباري | وصف الكائن المطلوب |
| :--- | :--- | :---: | :--- |
| `task` | `Object` | **نعم** | يتكون الكائن من الحقول التالية: <br> • `id`: رقم المهمة <br> • `title`: عنوان الواجب/الامتحان <br> • `description`: التفاصيل والتعليمات <br> • `subject_name`: اسم المادة <br> • `task_type`: `'HOMEWORK'` أو `'EXAM'` <br> • `due_date`: تاريخ التسليم <br> • `attachment_path`: مسار الملف المرفق <br> • `has_solution`: `1` أو `0` (وجود حل نموذجي) <br> • `solution_text`: نص الحل <br> • `solution_attachment_path`: ملف الحل المرفق |

---

## 🎨 3. قواعد وتنسيقات الـ CSS الخواص بالكارت

```css
.glass-task-card {
  position: relative;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(16px);
  border-radius: 20px;
  padding: 20px;
  margin-bottom: 16px;
  box-shadow: 0 8px 24px rgba(15, 23, 42, 0.06);
  border: 1px solid rgba(226, 232, 240, 0.8);
  overflow: hidden;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.glass-task-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 12px 30px rgba(15, 23, 42, 0.1);
}

/* التمييز البصري بين الواجب المدرس والامتحان */
.homework-3d-glass {
  border-right: 5px solid #3b82f6;
}

.exam-3d-glass {
  border-right: 5px solid #ef4444;
}

.vibrant-subject-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: #f1f5f9;
  padding: 6px 14px;
  border-radius: 12px;
  font-size: 0.85rem;
  font-weight: 700;
  color: #334155;
}

.task-title {
  font-size: 1.15rem;
  font-weight: 800;
  color: #0f172a;
  margin: 12px 0 6px 0;
}

.toggle-solution-btn {
  width: 100%;
  padding: 10px 14px;
  background: rgba(124, 58, 237, 0.08);
  color: #7c3aed;
  border: 1px dashed rgba(124, 58, 237, 0.3);
  border-radius: 12px;
  font-weight: 700;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.solution-details {
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 14px;
  margin-top: 8px;
}
```
