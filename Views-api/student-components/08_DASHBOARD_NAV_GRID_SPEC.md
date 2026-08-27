# 🧩 08. مواصفات كروت التوجيه السريع (`DashboardNavGrid.vue`)

> **الملف المرجعي:** [`Views-api/student-components/08_DASHBOARD_NAV_GRID_SPEC.md`](file:///c:/Users/alhareth/Desktop/work/school-system/Views-api/student-components/08_DASHBOARD_NAV_GRID_SPEC.md)  
> **اسم المكون البرمجي:** `DashboardNavGrid.vue` ([`src/components/student/DashboardNavGrid.vue`](file:///c:/Users/alhareth/Desktop/work/school-system/frontend/src/components/student/DashboardNavGrid.vue))  
> **الوصف:** شبكة الكروت الأربعة الرئيسية للتوجيه والتنقل السريع (الواجبات، الامتحانات، المواد الدراسية، والجدول الأسبوعي)، مصممة بكروت زجاجية متميزة مع صور وشارات سريعة وتأثيرات حركية.

---

## 📐 1. هيكل الـ Vue / HTML Component Markup

```html
<template>
  <main class="cards-container">
    <!-- Card 1: الواجبات -->
    <div class="card homework" @click="$emit('navigate', '/student/homeworks')">
      <img src="/images/واجبات.png" alt="الواجبات" class="card-bg" />
      <div class="card-overlay"></div>
      <div class="card-badge warning">{{ newHomeworksCount }} معلق</div>
      <div class="card-content">
        <h3>الواجبات</h3>
        <p>متابعة المهام المطلوبة والواجبات اليومية</p>
        <div class="card-link-btn">
          <span>عرض المهام</span>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </div>
      </div>
    </div>

    <!-- Card 2: الامتحانات -->
    <div class="card exams" @click="$emit('navigate', '/student/exams')">
      <img src="/images/امتحانات.png" alt="الامتحانات" class="card-bg" />
      <div class="card-overlay"></div>
      <div class="card-badge danger">{{ newExamsCount }} قادمة</div>
      <div class="card-content">
        <h3>الامتحانات</h3>
        <p>جدول الامتحانات والاختبارات الشهرية</p>
        <div class="card-link-btn">
          <span>عرض الجدول</span>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </div>
      </div>
    </div>

    <!-- Card 3: المواد الدراسية -->
    <div class="card subjects" @click="$emit('navigate', '/student/subjects')">
      <img src="/images/مواد.png" alt="المواد الدراسية" class="card-bg" />
      <div class="card-overlay"></div>
      <div class="card-badge info">8 مواد</div>
      <div class="card-content">
        <h3>المواد الدراسية</h3>
        <p>المناهج والملخصات التعليمية المتاحة</p>
        <div class="card-link-btn">
          <span>استكشاف المواد</span>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </div>
      </div>
    </div>

    <!-- Card 4: الجدول الأسبوعي -->
    <div class="card schedule" @click="$emit('navigate', '/student/schedule')">
      <img src="/images/جدول.png" alt="الجدول الأسبوعي" class="card-bg" />
      <div class="card-overlay"></div>
      <div class="card-badge success">اليوم: {{ currentDayName }}</div>
      <div class="card-content">
        <h3>الجدول الأسبوعي</h3>
        <p>توزيع الحصص اليومية والمعلمين</p>
        <div class="card-link-btn">
          <span>عرض الحصص</span>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </div>
      </div>
    </div>
  </main>
</template>
```

---

## ⚙️ 2. الـ Props والـ Events

| الـ Prop / Event | النوع | الوصف |
| :--- | :--- | :--- |
| `newHomeworksCount` | `Number/String` | عدد الواجبات المعلقة المعروض في شارة الكرت الأول. |
| `newExamsCount` | `Number/String` | عدد الامتحانات القادمة المعروض في شارة الكرت الثاني. |
| `currentDayName` | `String` | اسم اليوم الحالي المعروض في شارة كرت الجدول. |
| `@navigate` | `Emits` | ينطلق محصلاً مسار الانتقال مثل `'/student/homeworks'` عند الضغط على الكرت. |

---

## 🎨 3. قواعد الـ CSS لشبكة الكروت

```css
.cards-container {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 14px;
  padding: 0 16px 20px 16px;
  max-width: 800px;
  margin: 0 auto;
}

@media (max-width: 520px) {
  .cards-container {
    grid-template-columns: 1fr;
  }
}

.card {
  position: relative;
  height: 150px;
  border-radius: 20px;
  overflow: hidden;
  cursor: pointer;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
  transition: transform 0.25s ease, box-shadow 0.25s ease;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 16px;
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.15);
}
```
