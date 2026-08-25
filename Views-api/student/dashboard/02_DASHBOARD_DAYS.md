# 📑 02. مواصفات ومكون شريط أيام الأسبوع (`DashboardDays`)

> **الملف المرجعي:** [`Views-api/student/dashboard/02_DASHBOARD_DAYS.md`](file:///c:/Users/alhareth/Desktop/work/school-system/Views-api/student/dashboard/02_DASHBOARD_DAYS.md)  
> **اسم المكون البرمجي:** `DashboardDays.vue`  
> **الوصف:** المكون المخصص لشريط كبسولات التقويم وأيام الأسبوع المدرسية (الجزء الثاني المحدد بالمستطيل الأحمر في التصميم المعتمد)، ويتكون من شريط كبسولات ملون يعرض 5 أيام متتالية (من الأحد إلى الخميس) مع اسم اليوم المختصر وتاريخه، ويمكّن الطالب من اختيار اليوم النشط لاستعراض الجدول أو المهام المرتبطة به.

---

## 📸 1. الوصف البصري والتشريحي للجزء (Component Anatomy)

```
+-----------------------------------------------------------------------+
|  +-----------------------------------------------------------------+  |
|  |  +------+   +------+   +------+   +------+   +------+           |  |
|  |  | خمي  |   | ارب  |   |  ثلا |   | إثن  |   | أحد  |           |  |
|  |  |  27  |   |  26  |   |[ 25 ]|   |  24  |   |  23  |           |  |
|  |  +------+   +------+   +------+   +------+   +------+           |  |
|  +-----------------------------------------------------------------+  |
+-----------------------------------------------------------------------+
```

### عناصر أيام الأسبوع الأساسية:
1. **الشريط الكبسولي المحتوي (Capsule Bar Container):** شريط سفلي بعواف ملونة وخلفية بيضاء محاطة بظل خفيف.
2. **كبسولات الأيام الـ 5 (5 Day Capsules):**
   - **كبسولة 1:** اسم اليوم المختصر `"أحد"` (أعلى) / تاريخ اليوم `"23"` (أسفل).
   - **كبسولة 2:** اسم اليوم المختصر `"إثن"` (أعلى) / تاريخ اليوم `"24"` (أسفل).
   - **كبسولة 3 (الكبسولة النشطة المفعّلة):** اسم اليوم المختصر `"ثلا"` (أعلى) / تاريخ اليوم `"25"` (أسفل)، ملونة بالتدرج البنفسجي المضيء (`#6366f1` / `#4f46e5`) مع ظل متميز ونصوص بيضاء.
   - **كبسولة 4:** اسم اليوم المختصر `"ارب"` (أعلى) / تاريخ اليوم `"26"` (أسفل).
   - **كبسولة 5:** اسم اليوم المختصر `"خمي"` (أعلى) / تاريخ اليوم `"27"` (أسفل).
3. **التفاعل والنقر (Click Handler):** حدث النقر لتغيير اليوم النشط وتحديث البيانات.

---

## 📐 2. كود المكون الكامل Vue 3 Component (`DashboardDays.vue`)

```vue
<template>
  <section class="days-strip-section">
    <div class="days-strip-card">
      <div class="days-grid-row">
        <button 
          v-for="(day, index) in calendarDays" 
          :key="index"
          class="day-capsule-btn"
          :class="{ active: selectedDayIndex === index }"
          @click="selectDay(index)"
        >
          <span class="day-short-name">{{ day.name }}</span>
          <span class="day-num-date">{{ day.date }}</span>
        </button>
      </div>
    </div>
  </section>
</template>

<script setup>
const props = defineProps({
  selectedDayIndex: {
    type: Number,
    default: 2 // اليوم الأوسط (الثلاثاء 25) كما في التصميم
  },
  calendarDays: {
    type: Array,
    default: () => [
      { name: 'أحد', date: '23' },
      { name: 'إثن', date: '24' },
      { name: 'ثلا', date: '25' },
      { name: 'ارب', date: '26' },
      { name: 'خمي', date: '27' }
    ]
  }
});

const emit = defineEmits(['update:selectedDayIndex', 'day-selected']);

function selectDay(index) {
  emit('update:selectedDayIndex', index);
  emit('day-selected', props.calendarDays[index]);
}
</script>

<style scoped>
.days-strip-section {
  padding: 0 16px;
  margin-top: 14px;
  margin-bottom: 18px;
}

.days-strip-card {
  background: #ffffff;
  border-radius: 22px;
  padding: 10px 12px;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.05);
  border: 1px solid #f1f5f9;
}

.days-grid-row {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 8px;
}

.day-capsule-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 10px 6px;
  border-radius: 16px;
  background: #f8fafc;
  border: 1.5px solid #e2e8f0;
  cursor: pointer;
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
}

.day-short-name {
  font-size: 13px;
  font-weight: 700;
  color: #64748b;
  margin-bottom: 2px;
}

.day-num-date {
  font-size: 16px;
  font-weight: 800;
  color: #0f172a;
}

.day-capsule-btn.active {
  background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%);
  border-color: transparent;
  box-shadow: 0 8px 18px rgba(79, 70, 229, 0.35);
  transform: translateY(-2px);
}

.day-capsule-btn.active .day-short-name,
.day-capsule-btn.active .day-num-date {
  color: #ffffff;
}
</style>
```

---

## ⚙️ 3. الـ Props و الـ Events الخاصة بـ `DashboardDays`

| اسم الـ Prop / Event | النوع | الوصف | القيمة الافتراضية |
| :--- | :--- | :--- | :--- |
| `selectedDayIndex` | `Number` | مؤشر اليوم المفعّل في الشريط | `2` (الثلاثاء) |
| `calendarDays` | `Array` | مصفوفة أيام الأسبوع الـ 5 والتأريخ | قائمة من الأحد إلى الخميس |
| `@update:selectedDayIndex` | `Event` | إشعار الأب بمؤشر اليوم الجديد | ترسل رقم المؤشر |
| `@day-selected` | `Event` | إشعار الأب بكائن اليوم المختار | ترسل بيانات اليوم الكاملة |
