# 📅 04. مواصفات كروت حصص الجدول الدراسي (`ScheduleCard.vue`)

> **الملف المرجعي:** [`Views-api/student-components/04_SCHEDULE_CARD_SPEC.md`](file:///c:/Users/alhareth/Desktop/work/school-system/Views-api/student-components/04_SCHEDULE_CARD_SPEC.md)  
> **اسم المكون البرمجي:** `ScheduleCard.vue` ([`src/components/student/ScheduleCard.vue`](file:///c:/Users/alhareth/Desktop/work/school-system/frontend/src/components/student/ScheduleCard.vue))  
> **الوصف:** مكون كرت الحصة الدراسية المخصص لعرض الجدول التفاعلي اليومي للطالب، يتضمن رقم الحصة، اسم المادة، واسم معلم المادة.

---

## 📐 1. هيكل الـ Vue / HTML Component Markup

```html
<template>
  <BaseCard class="schedule-card animate-fade-in">
    <!-- Period Slot Number Badge -->
    <div class="slot-badge">الحصة {{ slot.slot_number }}</div>
    
    <!-- Subject Name -->
    <div class="slot-subject">{{ slot.subject_name }}</div>
    
    <!-- Teacher Name -->
    <div class="slot-teacher">👨‍🏫 {{ slot.teacher_name }}</div>
  </BaseCard>
</template>
```

---

## ⚙️ 2. الـ Props المطلوبة

| الـ Prop | النوع | إجباري | وصف الكائن |
| :--- | :--- | :---: | :--- |
| `slot` | `Object` | **نعم** | يتضمن الحقول التالية: <br> • `slot_number`: رقم الحصة (1 إلى 7) <br> • `subject_name`: اسم المادة <br> • `teacher_name`: اسم أستاذ المادة |

---

## 🎨 3. قواعد الـ CSS الخاصة بكرت الحصة

```css
.schedule-card {
  text-align: center;
  background: linear-gradient(145deg, #ffffff 0%, #f8fafc 100%);
  border: 2px solid #e2e8f0;
  border-radius: 18px;
  padding: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.03);
  transition: transform 0.2s ease, border-color 0.2s ease;
}

.schedule-card:hover {
  transform: translateY(-2px);
  border-color: #7c3aed;
}

.slot-badge {
  display: inline-block;
  background: linear-gradient(135deg, #7c3aed 0%, #4f46e5 100%);
  color: #ffffff;
  font-weight: 700;
  font-size: 0.85rem;
  padding: 4px 14px;
  border-radius: 12px;
  margin-bottom: 8px;
  box-shadow: 0 4px 10px rgba(124, 58, 237, 0.2);
}

.slot-subject {
  font-size: 1.15rem;
  font-weight: 800;
  color: #0f172a;
  margin-bottom: 4px;
}

.slot-teacher {
  font-size: 0.85rem;
  color: #64748b;
  font-weight: 600;
}
```
