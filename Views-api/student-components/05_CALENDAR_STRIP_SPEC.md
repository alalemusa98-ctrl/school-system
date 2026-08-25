# 🗓️ 05. مواصفات شريط الأيام الأسبوعية (`CalendarDayStrip.vue`)

> **الملف المرجعي:** [`Views-api/student-components/05_CALENDAR_STRIP_SPEC.md`](file:///c:/Users/alhareth/Desktop/work/school-system/Views-api/student-components/05_CALENDAR_STRIP_SPEC.md)  
> **اسم المكون البرمجي:** `CalendarDayStrip.vue` ([`src/components/student/CalendarDayStrip.vue`](file:///c:/Users/alhareth/Desktop/work/school-system/frontend/src/components/student/CalendarDayStrip.vue))  
> **الوصف:** مكون شريط التقويم التفاعلي المكون من 5 كبسولات للأيام الأسبوعية الدراسية (من الأحد إلى الخميس). يتيح للطالب تصفية الواجبات والامتحانات والجدول بناءً على اليوم المحدد.

---

## 📐 1. هيكل الـ Vue / HTML Component Markup

```html
<template>
  <div class="calendar-day-strip">
    <div
      v-for="(day, index) in weekDays"
      :key="index"
      class="day-pill"
      :class="{ 
        'is-today': day.isToday, 
        'is-selected': selectedDay === day.dayNumber 
      }"
      @click="selectDay(day.dayNumber)"
    >
      <span class="day-name">{{ day.name }}</span>
      <span class="day-number">{{ day.dateFormatted }}</span>
    </div>
  </div>
</template>
```

---

## ⚙️ 2. الـ Events والحالات الداخلية

| الحدث / الحالة | النوع | الوصف |
| :--- | :--- | :--- |
| `@select-day` | `Emits` | يُرسل رقم اليوم المختار (من `1` الأحد إلى `5` الخميس) أو `null` عند إلغاء التحديد. |
| `selectedDay` | `ref(null)` | رقم اليوم المحدد حالياً للتصفية. |
| `weekDays` | `computed` | مصفوفة تتكون من أزواج `{ name: 'الأحد', dayNumber: 1, isToday: boolean, dateFormatted: 1 }`. |

---

## 🎨 3. قواعد الـ CSS الخاصة بشريط الأيام

```css
.calendar-day-strip {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 8px;
  margin: 16px 0 24px 0;
}

.day-pill {
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 14px;
  padding: 10px 4px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
}

.day-pill:hover {
  background: #f8fafc;
}

/* حالة اليوم الحالي (Today) */
.day-pill.is-today {
  border-color: #7c3aed;
  background: rgba(124, 58, 237, 0.05);
}

.day-pill.is-today .day-name {
  color: #7c3aed;
  font-weight: 800;
}

/* حالة اليوم المحدد حالياً (Active Selected) */
.day-pill.is-selected {
  background: linear-gradient(135deg, #7c3aed 0%, #4f46e5 100%);
  color: #ffffff;
  border-color: transparent;
  box-shadow: 0 4px 14px rgba(124, 58, 237, 0.25);
  transform: translateY(-2px);
}

.day-pill.is-selected .day-name,
.day-pill.is-selected .day-number {
  color: #ffffff;
}

.day-name {
  font-size: 0.75rem;
  font-weight: 700;
  color: #64748b;
}

.day-number {
  font-size: 1rem;
  font-weight: 800;
  color: #0f172a;
}
```
