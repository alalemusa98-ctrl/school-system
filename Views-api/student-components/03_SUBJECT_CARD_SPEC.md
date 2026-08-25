# 📖 03. مواصفات كروت المواد الدراسية (`SubjectCard.vue`)

> **الملف المرجعي:** [`Views-api/student-components/03_SUBJECT_CARD_SPEC.md`](file:///c:/Users/alhareth/Desktop/work/school-system/Views-api/student-components/03_SUBJECT_CARD_SPEC.md)  
> **اسم المكون البرمجي:** `SubjectCard.vue` ([`src/components/student/SubjectCard.vue`](file:///c:/Users/alhareth/Desktop/work/school-system/frontend/src/components/student/SubjectCard.vue))  
> **الوصف:** المكون المخصص لعرض بطاقة المادة الدراسية مع الأيقونات ثلاثية الأبعاد 3D (رياضيات، علوم، إسلامية، إلخ)، اسم المادة، واستدعاء حدث الضغط للانتقال إلى الواجبات والامتحانات الخاصة بهذه المادة.

---

## 📐 1. هيكل الـ Vue / HTML Component Markup

```html
<template>
  <BaseCard :isClickable="true" class="subject-card animate-fade-in" @click="$emit('click')">
    <!-- Top 3D Subject Icon Notch -->
    <div class="subject-icon">{{ getSubjectIcon(subject.name) }}</div>
    
    <!-- Subject Title Name -->
    <div class="subject-title">{{ subject.name }}</div>

    <!-- Quick Action Subtitle Indicator -->
    <div class="subject-action">عرض الواجبات والامتحانات 👈</div>
  </BaseCard>
</template>
```

### أيقونات المواد الافتراضية (Default 3D Subject Icons mapping):
```javascript
function getSubjectIcon(name) {
  if (name.includes('إسلامية') || name.includes('قرآن')) return '🕌';
  if (name.includes('عربية') || name.includes('لغة')) return '📖';
  if (name.includes('رياضيات') || name.includes('حساب')) return '📐';
  if (name.includes('علوم') || name.includes('فيزياء') || name.includes('كيمياء')) return '🔬';
  if (name.includes('إنجليزية') || name.includes('English')) return '🔤';
  if (name.includes('تاريخ') || name.includes('جغرافيا') || name.includes('اجتماعيات')) return '🌍';
  if (name.includes('حاسوب') || name.includes('تقنية')) return '💻';
  return '📚';
}
```

---

## ⚙️ 2. الـ Props والـ Events

| الـ Prop / Event | النوع | الوصف |
| :--- | :--- | :--- |
| `subject` | `Object` | كائن المادة المحتوي على `id` و `name` و `teacher_name`. |
| `@click` | `Emits` | الحدث الناتج عند ضغط الطالب على الكرت لفتح تفاصيل المادة. |

---

## 🎨 3. قواعد الـ CSS الخاصة ببطاقة المادة

```css
.subject-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 28px 20px;
  text-align: center;
  border: 2px solid #e2e8f0;
  background: #ffffff;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
}

.subject-card:hover {
  border-color: #7c3aed;
  background: #f4f5ff;
  transform: translateY(-4px);
  box-shadow: 0 12px 24px rgba(124, 58, 237, 0.15);
}

.subject-icon {
  font-size: 3rem;
  margin-bottom: 12px;
  line-height: 1;
}

.subject-title {
  font-size: 1.25rem;
  font-weight: 800;
  color: #0f172a;
  margin-bottom: 8px;
}

.subject-action {
  font-size: 0.85rem;
  font-weight: 600;
  color: #7c3aed;
}
```
