# 👤 07. مواصفات كارت الهيرو والبروفايل (`StudentHeroCard.vue`)

> **الملف المرجعي:** [`Views-api/student-components/07_STUDENT_HERO_CARD_SPEC.md`](file:///c:/Users/alhareth/Desktop/work/school-system/Views-api/student-components/07_STUDENT_HERO_CARD_SPEC.md)  
> **اسم المكون البرمجي:** `StudentHeroCard.vue` ([`src/components/student/StudentHeroCard.vue`](file:///c:/Users/alhareth/Desktop/work/school-system/frontend/src/components/student/StudentHeroCard.vue))  
> **الوصف:** كارت البروفايل البارز والمعلق في أعلى الواجهة الرئيسية للطالب، يحتوي على اسم الطالب، الصف والشعبة، والعدادات الإحصائية الثلاثة (المواد الدراسية، الواجبات المعلقة، والامتحانات القادمة).

---

## 📐 1. هيكل الـ Vue / HTML Component Markup

```html
<template>
  <div class="ios-hero-card animate-fade-in">
    <!-- Header Info: Avatar + Student Details -->
    <div class="hero-card-header">
      <div class="hero-avatar-wrapper">
        <div class="hero-avatar">🏫</div>
        <span class="hero-status-dot"></span>
      </div>

      <div class="hero-info">
        <h2 class="hero-title">{{ studentName }}</h2>
        <p class="hero-subtitle">{{ studentGrade }} - الشعبة ({{ studentSection }})</p>
        <p class="hero-tag">قسم المرحلة الإعدادية والنموذجية</p>
      </div>
    </div>

    <!-- 3 Key Stats Counters -->
    <div class="hero-stats-row">
      <!-- 1. المواد الدراسية -->
      <div class="stat-item">
        <div class="stat-icon-val">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#7c3aed" stroke-width="2.2">
            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
            <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
          </svg>
          <span class="stat-val">{{ subjectsCount }}</span>
        </div>
        <span class="stat-lbl">المواد الدراسية</span>
      </div>

      <div class="stat-divider"></div>

      <!-- 2. الواجبات المعلقة -->
      <div class="stat-item">
        <div class="stat-icon-val">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ea580c" stroke-width="2.2">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
            <polyline points="14 2 14 8 20 8"></polyline>
            <line x1="16" y1="13" x2="8" y2="13"></line>
            <line x1="16" y1="17" x2="8" y2="17"></line>
            <polyline points="10 9 9 9 8 9"></polyline>
          </svg>
          <span class="stat-val">{{ newHomeworksCount }}</span>
        </div>
        <span class="stat-lbl">الواجبات المعلقة</span>
      </div>

      <div class="stat-divider"></div>

      <!-- 3. الامتحانات القادمة -->
      <div class="stat-item">
        <div class="stat-icon-val">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2563eb" stroke-width="2.2">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
            <line x1="16" y1="2" x2="16" y2="6"></line>
            <line x1="8" y1="2" x2="8" y2="6"></line>
            <line x1="3" y1="10" x2="21" y2="10"></line>
          </svg>
          <span class="stat-val">{{ newExamsCount }}</span>
        </div>
        <span class="stat-lbl">الامتحانات القادمة</span>
      </div>
    </div>
  </div>
</template>
```

---

## ⚙️ 2. الـ Props المعرفة في المكون

| اسم الـ Prop | النوع | الافتراضي | الوصف |
| :--- | :--- | :--- | :--- |
| `studentName` | `String` | `'تامر المصراتي'` | اسم الطالب الكامل. |
| `studentGrade` | `String` | `'الصف الثامن الإعدادي'` | اسم المرحلة والصف المنهجي. |
| `studentSection` | `String` | `'8 أ'` | رمز وشعبة الطالب. |
| `subjectsCount` | `Number/String` | `7` | عدد المواد المقررة على الطالب. |
| `newHomeworksCount` | `Number/String` | `0` | عدد الواجبات المعلقة بانتظار التسليم. |
| `newExamsCount` | `Number/String` | `0` | عدد الامتحانات القادمة في الجدول. |

---

## 🎨 3. قواعد الـ CSS الخاصة بالمكون

```css
.ios-hero-card {
  margin: -35px 16px 16px 16px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-radius: 24px;
  padding: 20px;
  box-shadow: 0 12px 32px rgba(124, 58, 237, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.8);
  position: relative;
  z-index: 10;
}

.hero-avatar {
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, #7c3aed 0%, #4f46e5 100%);
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.8rem;
  box-shadow: 0 8px 16px rgba(124, 58, 237, 0.3);
}

.hero-stats-row {
  display: flex;
  align-items: center;
  justify-content: space-around;
  background: #f8fafc;
  border-radius: 16px;
  padding: 12px 8px;
  border: 1px solid #e2e8f0;
}
```
