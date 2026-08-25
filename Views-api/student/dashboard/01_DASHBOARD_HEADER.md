# 🎨 01. مواصفات ومكون هيدر الرئيسية لبروفايل الطالب (`DashboardHeader`)

> **الملف المرجعي:** [`Views-api/student/dashboard/01_DASHBOARD_HEADER.md`](file:///c:/Users/alhareth/Desktop/work/school-system/Views-api/student/dashboard/01_DASHBOARD_HEADER.md)  
> **اسم المكون البرمجي:** `DashboardHeader.vue`  
> **الوصف:** الهيدر العلوي الرئيسي لصفحة البروفايل ولوحة تحكم الطالب (الجزء الأول المحدد في التصميم)، ويشمل شريط الحالة بنمط iOS، زر الخروج، اسم المدرسة، زر التنبيهات، وكارت الهيرو الأبيض العائم الذي يحتوي على اسم الطالب، الصف والشعبة، القسم الأكاديمي، والأيقونة 3D مع مؤشر الحالة التفاعلي والعدادات الإحصائية الثلاثة.

---

## 📸 1. الوصف البصري والتشريحي للجزء (Component Anatomy)

```
+-----------------------------------------------------------------------+
|  3:27                     [ Dynamic Island ]                 📶 📶 🔋  |
|                                                                       |
|  ( 🔔 )                 مدرسة النور الإعدادية                    ( → ) |
|                                                                       |
|  +-----------------------------------------------------------------+  |
|  |                                                                 |  |
|  |   أحمد خالد المصراتي                                    [ 🏫 ] |  |
|  |   الصف الخامس - الشعبة (أ5)                               🟢    |  |
|  |   قسم المرحلة الإعدادية والنموذجية                              |  |
|  |                                                                 |  |
|  |  -------------------------------------------------------------  |  |
|  |   ( 📖 5 )              ( 📄 4 )              ( 📅 1 )        |  |
|  |  المواد الدراسية       الواجبات المعلقة       الامتحانات القادمة |  |
|  +-----------------------------------------------------------------+  |
+-----------------------------------------------------------------------+
```

### عناصر الهيدر الأساسية:
1. **شريط الحالة (iOS Status Bar):** وقت النظام (`3:27`)، الجزيرة التفاعلية (Dynamic Island)، وأيقونات الإشارة والبطارية.
2. **شريط العنوان الملاحة (Nav Bar):**
   - **زر تسجيل الخروج (Right Action Button):** زر دائري زجاجي لأيقونة الخروج `(→)`.
   - **عنوان المدرسة الرئيسي (Title):** text `"مدرسة النور الإعدادية"` بظلال خط SF Arabic.
   - **زر التنبيهات الجانبي (Left Notification Button):** زر دائري زجاجي لأيقونة الجرس `(🔔)`.
3. **بطاقة الهيرو الرئيسية (Hero Profile Card):**
   - **اسم الطالب:** `"أحمد خالد المصراتي"`.
   - **الصف والشعبة:** `"الصف الخامس - الشعبة (أ5)"` باللون البنفسجي المميز.
   - **القسم الأكاديمي:** `"قسم المرحلة الإعدادية والنموذجية"`.
   - **أيقونة البروفايل 3D:** أيقونة 3D للمدرسة مع مؤشر أخضر مضيء في الزاوية (Active Dot).
   - **عدادات الـ KPI الثلاثة في أسفل الكارد:**
     1. `المواد الدراسية`: عداد `5` + أيقونة كتاب (`📖`).
     2. `الواجبات المعلقة`: عداد `4` + أيقونة ملف (`📄`).
     3. `الامتحانات القادمة`: عداد `1` + أيقونة تقويم (`📅`).

---

## 📐 2. كود المكون الكامل Vue 3 Component (`DashboardHeader.vue`)

```vue
<template>
  <header class="dash-header-wrapper">
    <!-- iOS Status Bar & Dynamic Island Overlay -->
    <div class="ios-status-bar">
      <span class="ios-time">{{ currentTime }}</span>
      <div class="dynamic-island"></div>
      <div class="ios-icons">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M2 20h20L12 4z"></path>
        </svg>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M5 12.55a11 11 0 0 1 14.08 0"></path>
          <path d="M1.42 9a16 16 0 0 1 21.16 0"></path>
          <path d="M8.53 16.11a6 6 0 0 1 6.95 0"></path>
          <line x1="12" y1="20" x2="12.01" y2="20"></line>
        </svg>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <rect x="2" y="7" width="16" height="10" rx="2" ry="2"></rect>
          <line x1="22" y1="11" x2="22" y2="13"></line>
        </svg>
      </div>
    </div>

    <!-- Navigation Top Bar -->
    <div class="dash-nav-bar">
      <button class="nav-icon-btn logout-btn" @click="$emit('logout')" title="تسجيل الخروج">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
          <polyline points="16 17 21 12 16 7"></polyline>
          <line x1="21" y1="12" x2="9" y2="12"></line>
        </svg>
      </button>

      <h1 class="dash-school-title">{{ schoolName }}</h1>

      <button class="nav-icon-btn notify-btn" @click="$emit('open-notifications')" title="التنبيهات">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
          <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
        </svg>
      </button>
    </div>

    <!-- Floating Profile Hero Card -->
    <div class="dash-hero-card">
      <div class="hero-header-row">
        <div class="hero-text-info">
          <h2 class="student-name">{{ studentName }}</h2>
          <div class="grade-badge">{{ gradeSection }}</div>
          <span class="dept-text">{{ department }}</span>
        </div>

        <div class="hero-avatar-box">
          <div class="avatar-3d">🏫</div>
          <span class="status-indicator-dot"></span>
        </div>
      </div>

      <!-- 3 KPI Counters Row -->
      <div class="hero-stats-row">
        <div class="stat-col">
          <div class="stat-icon-val">
            <span class="stat-emoji">📖</span>
            <span class="stat-val">{{ subjectsCount }}</span>
          </div>
          <span class="stat-label">المواد الدراسية</span>
        </div>

        <div class="stat-divider"></div>

        <div class="stat-col">
          <div class="stat-icon-val">
            <span class="stat-emoji">📄</span>
            <span class="stat-val">{{ pendingHomeworksCount }}</span>
          </div>
          <span class="stat-label">الواجبات المعلقة</span>
        </div>

        <div class="stat-divider"></div>

        <div class="stat-col">
          <div class="stat-icon-val">
            <span class="stat-emoji">📅</span>
            <span class="stat-val">{{ upcomingExamsCount }}</span>
          </div>
          <span class="stat-label">الامتحانات القادمة</span>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
const props = defineProps({
  currentTime: { type: String, default: '3:27' },
  schoolName: { type: String, default: 'مدرسة النور الإعدادية' },
  studentName: { type: String, default: 'أحمد خالد المصراتي' },
  gradeSection: { type: String, default: 'الصف الخامس - الشعبة (أ5)' },
  department: { type: String, default: 'قسم المرحلة الإعدادية والنموذجية' },
  subjectsCount: { type: Number, default: 5 },
  pendingHomeworksCount: { type: Number, default: 4 },
  upcomingExamsCount: { type: Number, default: 1 }
});

const emit = defineEmits(['logout', 'open-notifications']);
</script>

<style scoped>
.dash-header-wrapper {
  background: linear-gradient(135deg, #6366f1 0%, #4f46e5 50%, #4338ca 100%);
  padding: 12px 16px 28px;
  border-radius: 0 0 28px 28px;
  color: #ffffff;
  position: relative;
  box-shadow: 0 10px 30px rgba(79, 70, 229, 0.25);
}

.ios-status-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 13px;
  font-weight: 600;
  margin-bottom: 12px;
  opacity: 0.9;
}

.dynamic-island {
  width: 90px;
  height: 22px;
  background-color: #000000;
  border-radius: 14px;
}

.ios-icons {
  display: flex;
  gap: 6px;
  align-items: center;
}

.dash-nav-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
}

.dash-school-title {
  font-size: 20px;
  font-weight: 800;
  margin: 0;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.15);
}

.nav-icon-btn {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
}

.nav-icon-btn:hover {
  background: rgba(255, 255, 255, 0.35);
  transform: scale(1.05);
}

.dash-hero-card {
  background: #ffffff;
  border-radius: 24px;
  padding: 20px 24px 16px;
  color: #1e293b;
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.08);
  position: relative;
  z-index: 2;
}

.hero-header-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 18px;
}

.hero-text-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.student-name {
  font-size: 19px;
  font-weight: 800;
  color: #0f172a;
  margin: 0;
}

.grade-badge {
  font-size: 13px;
  font-weight: 700;
  color: #4f46e5;
  background: rgba(79, 70, 229, 0.08);
  padding: 4px 10px;
  border-radius: 12px;
  width: fit-content;
}

.dept-text {
  font-size: 12px;
  color: #64748b;
  font-weight: 500;
}

.hero-avatar-box {
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, #e0e7ff 0%, #c7d2fe 100%);
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
  position: relative;
  box-shadow: inset 0 2px 4px rgba(255, 255, 255, 0.8), 0 8px 16px rgba(79, 70, 229, 0.15);
}

.status-indicator-dot {
  width: 12px;
  height: 12px;
  background-color: #22c55e;
  border: 2px solid #ffffff;
  border-radius: 50%;
  position: absolute;
  bottom: -2px;
  left: -2px;
  box-shadow: 0 0 8px rgba(34, 197, 94, 0.6);
}

/* 3 KPI Counters Row */
.hero-stats-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 14px;
  border-top: 1px dashed #e2e8f0;
}

.stat-col {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}

.stat-icon-val {
  display: flex;
  align-items: center;
  gap: 6px;
}

.stat-emoji {
  font-size: 16px;
}

.stat-val {
  font-size: 18px;
  font-weight: 800;
  color: #0f172a;
}

.stat-label {
  font-size: 11px;
  font-weight: 700;
  color: #64748b;
}

.stat-divider {
  width: 1px;
  height: 28px;
  background-color: #e2e8f0;
}
</style>
```

---

## ⚙️ 3. الـ Props و الـ Events الخاصة بـ `DashboardHeader`

| اسم الـ Prop / Event | النوع | الوصف | القيمة الافتراضية |
| :--- | :--- | :--- | :--- |
| `studentName` | `String` | اسم الطالب المعروض في الكارت | `"أحمد خالد المصراتي"` |
| `gradeSection` | `String` | الصف والشعبة الأكاديمية | `"الصف الخامس - الشعبة (أ5)"` |
| `department` | `String` | القسم الأكاديمي والمرحلة | `"قسم المرحلة الإعدادية والنموذجية"` |
| `subjectsCount` | `Number` | عدد المواد الدراسية المقررة | `5` |
| `pendingHomeworksCount` | `Number` | عدد الواجبات المعلقة | `4` |
| `upcomingExamsCount` | `Number` | عدد الامتحانات القادمة | `1` |
| `@logout` | `Event` | حدث عند النقر على زر تسجيل الخروج | ينفذ عملي الخروج |
| `@open-notifications` | `Event` | حدث عند النقر على زر التنبيهات | يفتح مركز التنبيهات |
