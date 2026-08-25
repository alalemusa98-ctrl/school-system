# 🎨 01. مواصفات ومكون هيدر صفحة الامتحانات (`ExamHeader`)

> **الملف المرجعي:** [`Views-api/student/exams/01_EXAM_HEADER.md`](file:///c:/Users/alhareth/Desktop/work/school-system/Views-api/student/exams/01_EXAM_HEADER.md)  
> **اسم المكون البرمجي:** `ExamHeader.vue`  
> **الوصف:** الهيدر العلوي لصفحة جدول الامتحانات والاختبارات المدرسية الخاصة بالطالب (الجزء الأول المحدد في تصميم الشاشة)، ويشمل شريط الحالة بنمط iOS، زر الرجوع، عنوان الصفحة الرئيسي، زر التصفية الجانبية، وكارت البروفايل الهيدر الملون الذي يحتوي على عنوان المواعيد، الصف والشعبة، الفصل الدراسي، والأيقونة 3D المخصصة للاختبارات مع مؤشر الحالة التفاعلي.

---

## 📸 1. الوصف البصري والتشريحي للجزء (Component Anatomy)

```
+-----------------------------------------------------------------------+
|  9:41                     [ Dynamic Island ]                 📶 📶 🔋  |
|                                                                       |
|  ( 🍷 )                     جدول الامتحانات                      ( ← ) |
|                                                                       |
|  +-----------------------------------------------------------------+  |
|  |                                                                 |  |
|  |   مواعيد الاختبارات والحلول                                 [ 📝 ] |  |
|  |   الاسترشادية                                            🟢    |  |
|  |   الصف الخامس - الشعبة (أ5)                                      |  |
|  |   الفصل الدراسي الأول 2026                                      |  |
|  |                                                                 |  |
|  +-----------------------------------------------------------------+  |
+-----------------------------------------------------------------------+
```

### عناصر الهيدر الأساسية:
1. **شريط الحالة (iOS Status Bar):** وقت النظام (`9:41`)، الجزيرة التفاعلية (Dynamic Island)، وأيقونات الإشارة والبطارية.
2. **شريط العنوان الملاحة (Nav Bar):**
   - **زر الرجوع (Right Back Button):** زر دائري زجاجي مع أيقونة سهم للرجوع للوحة التحكم.
   - **عنوان الصفحة الرئيسي (Title):** text `"جدول الامتحانات"` بظلال وتأثير متألق.
   - **زر الفلترة الجانبية (Left Filter Button):** زر دائري زجاجي لأيقونة الفلترة التفاعلية.
3. **بطاقة الهيدر الرئيسية (Hero Banner Card):**
   - **العنوان الرئيسي:** `"مواعيد الاختبارات والحلول الاسترشادية"`.
   - **بيانات الطالب والأكاديميا:** `"الصف الخامس - الشعبة (أ5)"` باللون الوردي والأرجواني المتميز.
   - **الفصل الدراسي:** `"الفصل الدراسي الأول 2026"`.
   - **أيقونة الامتحانات 3D:** صورة 3D تفاعلية لدفتر الاختبارات والورقة المدرسية تحتوي على مؤشر أخضر مضيء في الزاوية المباشرة (Active Status Dot).

---

## 📐 2. كود المكون الكامل Vue 3 Component (`ExamHeader.vue`)

```vue
<template>
  <header class="exam-header-wrapper">
    <!-- iOS Status Bar & Dynamic Island Overlay -->
    <div class="ios-status-bar">
      <span class="ios-time">9:41</span>
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

    <!-- Top Navigation Bar -->
    <div class="exam-nav-bar">
      <button class="nav-icon-btn filter-btn" @click="$emit('open-filter')" title="تصفية الفلاتر">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
          <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
        </svg>
      </button>

      <h1 class="exam-page-title">{{ title }}</h1>

      <button class="nav-icon-btn back-btn" @click="handleBack" title="الرجوع">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
          <line x1="19" y1="12" x2="5" y2="12"></line>
          <polyline points="12 19 5 12 12 5"></polyline>
        </svg>
      </button>
    </div>

    <!-- Main Exam Hero Card -->
    <div class="exam-hero-card">
      <div class="hero-text-content">
        <h2 class="hero-main-title">{{ subtitle }}</h2>
        <div class="hero-class-badge">{{ gradeSection }}</div>
        <span class="hero-term-text">{{ semesterInfo }}</span>
      </div>

      <div class="hero-illustration-wrapper">
        <div class="hero-3d-box">
          <span class="hero-emoji-icon">📝</span>
          <span class="status-indicator-dot"></span>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { useRouter } from 'vue-router';

const props = defineProps({
  title: {
    type: String,
    default: 'جدول الامتحانات'
  },
  subtitle: {
    type: String,
    default: 'مواعيد الاختبارات والحلول الاسترشادية'
  },
  gradeSection: {
    type: String,
    default: 'الصف الخامس - الشعبة (أ5)'
  },
  semesterInfo: {
    type: String,
    default: 'الفصل الدراسي الأول 2026'
  }
});

const emit = defineEmits(['back', 'open-filter']);
const router = useRouter();

function handleBack() {
  emit('back');
  if (window.history.length > 1) {
    router.back();
  } else {
    router.push('/student/dashboard');
  }
}
</script>

<style scoped>
.exam-header-wrapper {
  background: linear-gradient(135deg, #e11d48 0%, #be123c 50%, #9f1239 100%);
  padding: 12px 16px 24px;
  border-radius: 0 0 28px 28px;
  color: #ffffff;
  position: relative;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(225, 29, 72, 0.25);
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

.exam-nav-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
}

.exam-page-title {
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

.exam-hero-card {
  background: #ffffff;
  border-radius: 24px;
  padding: 20px 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #1e293b;
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.08);
  position: relative;
  z-index: 2;
}

.hero-text-content {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.hero-main-title {
  font-size: 17px;
  font-weight: 800;
  color: #0f172a;
  margin: 0;
  line-height: 1.3;
}

.hero-class-badge {
  font-size: 13px;
  font-weight: 700;
  color: #e11d48;
  background: rgba(225, 29, 72, 0.08);
  padding: 4px 10px;
  border-radius: 12px;
  width: fit-content;
}

.hero-term-text {
  font-size: 12px;
  color: #64748b;
  font-weight: 500;
}

.hero-illustration-wrapper {
  position: relative;
}

.hero-3d-box {
  width: 64px;
  height: 64px;
  background: linear-gradient(135deg, #ffe4e6 0%, #fecdd3 100%);
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32px;
  box-shadow: inset 0 2px 4px rgba(255, 255, 255, 0.8), 0 8px 16px rgba(225, 29, 72, 0.15);
  position: relative;
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
</style>
```

---

## ⚙️ 3. الـ Props و الـ Events الخاصة بـ `ExamHeader`

| اسم الـ Prop / Event | النوع | الوصف | القيمة الافتراضية |
| :--- | :--- | :--- | :--- |
| `title` | `String` | عنوان الهيدر في شريط الملاحة | `"جدول الامتحانات"` |
| `subtitle` | `String` | العنوان داخل كارت الهيرو الأبيض | `"مواعيد الاختبارات والحلول الاسترشادية"` |
| `gradeSection` | `String` | اسم الصف والشعبة التكليفية | `"الصف الخامس - الشعبة (أ5)"` |
| `semesterInfo` | `String` | تذييل الفصل الدراسي | `"الفصل الدراسي الأول 2026"` |
| `@back` | `Event` | حدث عند ضغط زر الرجوع الجانبي | يوجه تلقائياً للخلف أو للداشبورد |
| `@open-filter` | `Event` | حدث عند ضغط زر الفلترة العلوي | يفتح الدرج الجاني للفلترة |
