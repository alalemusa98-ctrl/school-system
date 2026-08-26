# 📱 01. مواصفات ومكون هيدر جدول المعلم (`TeacherScheduleHeader`)

> **الملف المرجعي:** [`Views-api/teacher/schedule/01_SCHEDULE_HEADER.md`](file:///c:/Users/alhareth/Desktop/work/school-system/Views-api/teacher/schedule/01_SCHEDULE_HEADER.md)  
> **اسم المكون البرمجي:** `TeacherScheduleHeader.vue`  
> **التصميم المرجعي المعتمد:** مطابق 100% لمواصفات [`Views-api/student/homeworks/01_HOMEWORK_HEADER.md`](file:///c:/Users/alhareth/Desktop/work/school-system/Views-api/student/homeworks/01_HOMEWORK_HEADER.md)  
> **الوصف:** الهيدر العلوي لصفحة الجدول الدراسي الأسبوعي للمعلم بنمط iOS، ويتكون من شريط الحالة مع الجزيرة التفاعلية (Dynamic Island)، وشريط التنقل، وكارت البروفايل العائم المتداخل مع مجسم 3D ونقطة الحالة المضيئة الخضراء.

---

## 📸 1. الوصف البصري والتشريحي للجزء (Component Anatomy)

```
+-----------------------------------------------------------------------+
|  9:41                      ( [●] )                      📶 🛜 🔋      |
|                                                                       |
|  ( < )                      الجدول الدراسي                     ( ⚙️ )  |
|                                                                       |
|  +-----------------------------------------------------------------+  |
|  |  مواعيد الحصص والقاعات والشعب                   +------------+  |  |
|  |  [ أ. أحمد سالم • معلم الرياضيات ]              |   [ 🏫 ]   |  |  |
|  |  الفصل الدراسي الأول 2026                       |  ( 🟢 )    |  |  |
|  |                                                 +------------+  |  |
|  +-----------------------------------------------------------------+  |
+-----------------------------------------------------------------------+
```

### عناصر الهيدر الأساسية:
1. **الخلفية العلوية (Purple Header Banner):**
   * تدرج لوني أرجواني فاخر (`linear-gradient(180deg, rgba(109, 40, 217, 0.78), rgba(91, 33, 182, 0.92))`).
   * انحناء سفلي عريض `border-radius: 0 0 36px 36px`.
2. **شريط الحالة بنمط iOS:**
   * الوقت الرقمي `9:41`.
   * الجزيرة التفاعلية `Dynamic Island` بقطر كبسولي داكن وعدسة كاميرا دقيقة.
   * مؤشرات الشبكة والواي فاي والبطارية.
3. **شريط التنقل (Navigation Bar):**
   * زر الرجوع الدائري الأيمن بتأثير الزجاج البلوري `backdrop-filter: blur(12px)`.
   * عنوان الصفحة: **الجدول الدراسي**.
   * زر الفلترة والإعدادات الأيسر.
4. **كارت الهيرو العائم المتداخل (`ios-hero-card`):**
   * إزاحة سالبة متداخلة مع الهيدر `margin: -55px 16px 0`.
   * خلفية بيضاء نقية مع زوايا ناعمة `border-radius: 28px` وظل بنفسجي فاخر `box-shadow: 0 20px 45px -10px rgba(91, 33, 182, 0.22)`.
   * العنوان: `مواعيد الحصص والقاعات والشعب`.
   * شارة المعلم والتخصص: `أ. أحمد سالم • معلم الرياضيات`.
   * صندوق المجسم ثلاثي الأبعاد 3D مع نقطة الحالة المضيئة الخضراء (Live Status Indicator).

---

## 📐 2. كود المكون الكامل Vue 3 Component (`TeacherScheduleHeader.vue`)

```vue
<template>
  <header class="ios-header">
    <!-- Gradient Top Header Banner -->
    <div class="ios-header-banner">
      <!-- iOS Status Bar Overlay -->
      <div class="ios-status-bar">
        <span class="ios-time">9:41</span>
        
        <div class="dynamic-island">
          <span class="camera-lens"></span>
        </div>

        <div class="ios-icons">
          <svg width="18" height="11" viewBox="0 0 18 12" fill="currentColor">
            <rect x="0" y="8" width="3" height="4" rx="0.5" />
            <rect x="5" y="6" width="3" height="6" rx="0.5" />
            <rect x="10" y="3" width="3" height="9" rx="0.5" />
            <rect x="15" y="0" width="3" height="12" rx="0.5" />
          </svg>
          <svg width="14" height="11" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 3C7.5 3 3.7 4.9 1 8l2.5 3C5.7 8.6 8.7 7 12 7s6.3 1.6 8.5 4L23 8c-2.7-3.1-6.5-5-11-5zm0 6c-3.1 0-5.8 1.3-7.7 3.4l2.5 3C8.2 13.9 10 13 12 13s3.8.9 5.2 2.4l2.5-3C17.8 10.3 15.1 9 12 9zm0 6c-1.4 0-2.6.6-3.5 1.6L12 20l3.5-3.4C14.6 15.6 13.4 15 12 15z" />
          </svg>
          <svg width="20" height="11" viewBox="0 0 24 12" fill="currentColor">
            <rect x="1" y="1" width="19" height="10" rx="2" fill="none" stroke="currentColor" stroke-width="1.8" />
            <rect x="3" y="3" width="13" height="6" rx="1" />
            <path d="M22 4v4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
          </svg>
        </div>
      </div>

      <!-- Top Navigation Bar -->
      <div class="sched-nav-bar">
        <button class="nav-icon-btn back-btn" @click="handleBack" title="الرجوع للوحة التحكم">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
        </button>

        <h1 class="sched-page-title">{{ title }}</h1>

        <button class="nav-icon-btn filter-btn" @click="$emit('open-filter')" title="تصفية الحصص">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
            <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
          </svg>
        </button>
      </div>
    </div>

    <!-- Floating Overlapping Hero Card -->
    <div class="ios-hero-card animate-fade-in">
      <div class="hero-text-content">
        <h2 class="hero-main-title">{{ subtitle }}</h2>
        <div class="hero-class-badge">{{ teacherName }} • {{ subjectSpecialty }}</div>
        <span class="hero-term-text">{{ semesterInfo }}</span>
      </div>

      <div class="hero-illustration-wrapper">
        <div class="hero-3d-box">
          <img :src="heroImage || scheduleImg || '/images/school_building_3d.png'" class="schedule-3d-img" alt="جدول 3D" />
          <span class="status-indicator-dot"></span>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { useRouter } from 'vue-router';
import scheduleImg from '@/assets/school_building_3d.png';

const props = defineProps({
  title: { type: String, default: 'الجدول الدراسي' },
  subtitle: { type: String, default: 'مواعيد الحصص والقاعات والشعب' },
  teacherName: { type: String, default: 'أ. أحمد سالم' },
  subjectSpecialty: { type: String, default: 'معلم الرياضيات' },
  semesterInfo: { type: String, default: 'الفصل الدراسي الأول 2026' },
  heroImage: { type: String, default: '' }
});

const emit = defineEmits(['back', 'open-filter']);
let router = null;
try {
  router = useRouter();
} catch (e) {}

function handleBack() {
  emit('back');
  if (router && window.history.length > 1) {
    router.back();
  } else if (router) {
    router.push('/teacher');
  } else {
    window.history.back();
  }
}
</script>
```
