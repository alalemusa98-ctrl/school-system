# 📚 03. مواصفات ومكون كروت التوجيه السريع الأساسية (`DashboardCards`)

> **الملف المرجعي:** [`Views-api/student/dashboard/03_DASHBOARD_CARDS.md`](file:///c:/Users/alhareth/Desktop/work/school-system/Views-api/student/dashboard/03_DASHBOARD_CARDS.md)  
> **اسم المكون البرمجي:** `DashboardCards.vue`  
> **الوصف:** المكون المخصص لشبكة كروت التوجيه الرئيسية الأربعة المتميزة في الصفحة الرئيسية للطالب (الجزء الثالث المحدد بالمستطيل الأصفر في التصميم المعتمد)، وتضم 4 كروت ملونة بنمط التدرجات والرسوم 3D (الواجبات، الامتحانات، المواد الدراسية، والجدول الأسبوعي)، وكل كارت يحتوي على العنوان، الوصف، شارة الحالة، وزر التوجيه.

---

## 📸 1. الوصف البصري والتشريحي للجزء (Component Anatomy)

```
+-----------------------------------------------------------------------+
|  +---------------------------+   +---------------------------+        |
|  | [ 4 معلق ]                |   | [ 1 قادمة ]               |        |
|  |                           |   |                           |        |
|  | الواجبات                  |   | الامتحانات                |        |
|  | متابعة المهام المطلوبة    |   | جدول الامتحانات والاختبارات|        |
|  | ( عرض المهام > )          |   | ( عرض الجدول > )          |        |
|  |                           |   |                           |        |
|  | [ 🎒 صورة 3D لحقيبة ]    |   | [ 🤖 صورة 3D لروبوت/كتب ] |        |
|  +---------------------------+   +---------------------------+        |
|                                                                       |
|  +---------------------------+   +---------------------------+        |
|  | [ 8 مواد ]                |   | [ اليوم: الثلاثاء ]        |        |
|  |                           |   |                           |        |
|  | المواد الدراسية           |   | الجدول الأسبوعي           |        |
|  | المناهج والملخصات المتاحة |   | توزيع الحصص اليومية       |        |
|  | ( استكشاف المواد > )      |   | ( عرض الحصص > )           |        |
|  |                           |   |                           |        |
|  | [ 🔬 صورة 3D لمجهر ]      |   | [ 📅 صورة 3D لتقويم ]     |        |
|  +---------------------------+   +---------------------------+        |
+-----------------------------------------------------------------------+
```

### عناصر الكروت الأساسية:
1. **شبكة الكروت الأربعة (2x2 Grid Layout):** شبكة ثنائية لبطاقات التوجيه الأربعة المعتمدة بنمط iOS 3D.
2. **كارت الواجبات (Homework Card - Blue Gradient):**
   - **شارة الحالة:** `"4 معلق"` (برتقالي تحذيري).
   - **العنوان والوصف:** `"الواجبات"` / `"متابعة المهام المطلوبة والواجبات اليومية"`.
   - **زر التوجيه:** `"عرض المهام >"`.
   - **الرسمة 3D:** الحقيبة والكتب المدرسية.
   - **المسار:** `/student/homeworks`.
3. **كارت الامتحانات (Exams Card - Purple Gradient):**
   - **شارة الحالة:** `"1 قادمة"` (أحمر تنبيهي).
   - **العنوان والوصف:** `"الامتحانات"` / `"جدول الامتحانات والاختبارات الشهرية"`.
   - **زر التوجيه:** `"عرض الجدول >"`.
   - **الرسمة 3D:** كتب والذكاء الاصطناعي/الروبوت.
   - **المسار:** `/student/exams`.
4. **كارت المواد الدراسية (Subjects Card - Gold/Orange Gradient):**
   - **شارة الحالة:** `"8 مواد"` (سماوي معلوماتي).
   - **العنوان والوصف:** `"المواد الدراسية"` / `"المناهج والملخصات التعليمية المتاحة"`.
   - **زر التوجيه:** `"استكشاف المواد >"`.
   - **الرسمة 3D:** المجهر والكرة الأرضية.
   - **المسار:** `/student/subjects`.
5. **كارت الجدول الأسبوعي (Weekly Schedule Card - Emerald Green Gradient):**
   - **شارة الحالة:** `"اليوم: الثلاثاء"` (أخضر نجاح).
   - **العنوان والوصف:** `"الجدول الأسبوعي"` / `"توزيع الحصص اليومية والمعلمين"`.
   - **زر التوجيه:** `"عرض الحصص >"`.
   - **الرسمة 3D:** تقويم المكتب والساعة.
   - **المسار:** `/student/schedule`.

---

## 📐 2. كود المكون الكامل Vue 3 Component (`DashboardCards.vue`)

```vue
<template>
  <main class="cards-grid-section">
    <div class="main-cards-grid">
      <!-- 1. كارت الواجبات -->
      <article class="nav-card homework-card" @click="navigateTo('/student/homeworks')">
        <div class="card-glass-shine"></div>
        <div class="card-badge warning">{{ pendingHomeworksCount }} معلق</div>
        <div class="card-inner-body">
          <h3 class="card-title">الواجبات</h3>
          <p class="card-desc">متابعة المهام المطلوبة والواجبات اليومية</p>
          <div class="card-action-btn">
            <span>عرض المهام</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </div>
        </div>
        <div class="card-3d-illustration">🎒</div>
      </article>

      <!-- 2. كارت الامتحانات -->
      <article class="nav-card exams-card" @click="navigateTo('/student/exams')">
        <div class="card-glass-shine"></div>
        <div class="card-badge danger">{{ upcomingExamsCount }} قادمة</div>
        <div class="card-inner-body">
          <h3 class="card-title">الامتحانات</h3>
          <p class="card-desc">جدول الامتحانات والاختبارات الشهرية</p>
          <div class="card-action-btn">
            <span>عرض الجدول</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </div>
        </div>
        <div class="card-3d-illustration">📚</div>
      </article>

      <!-- 3. كارت المواد الدراسية -->
      <article class="nav-card subjects-card" @click="navigateTo('/student/subjects')">
        <div class="card-glass-shine"></div>
        <div class="card-badge info">{{ subjectsCount }} مواد</div>
        <div class="card-inner-body">
          <h3 class="card-title">المواد الدراسية</h3>
          <p class="card-desc">المناهج والملخصات التعليمية المتاحة</p>
          <div class="card-action-btn">
            <span>استكشاف المواد</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </div>
        </div>
        <div class="card-3d-illustration">🔬</div>
      </article>

      <!-- 4. كارت الجدول الأسبوعي -->
      <article class="nav-card schedule-card" @click="navigateTo('/student/schedule')">
        <div class="card-glass-shine"></div>
        <div class="card-badge success">اليوم: {{ currentDayName }}</div>
        <div class="card-inner-body">
          <h3 class="card-title">الجدول الأسبوعي</h3>
          <p class="card-desc">توزيع الحصص اليومية والمعلمين</p>
          <div class="card-action-btn">
            <span>عرض الحصص</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </div>
        </div>
        <div class="card-3d-illustration">📅</div>
      </article>
    </div>
  </main>
</template>

<script setup>
import { useRouter } from 'vue-router';

const props = defineProps({
  pendingHomeworksCount: { type: Number, default: 4 },
  upcomingExamsCount: { type: Number, default: 1 },
  subjectsCount: { type: Number, default: 8 },
  currentDayName: { type: String, default: 'الثلاثاء' }
});

const router = useRouter();

function navigateTo(path) {
  router.push(path);
}
</script>

<style scoped>
.cards-grid-section {
  padding: 0 16px 32px;
}

.main-cards-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}

.nav-card {
  border-radius: 26px;
  padding: 20px 16px;
  position: relative;
  overflow: hidden;
  color: #ffffff;
  min-height: 220px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  cursor: pointer;
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.12);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.nav-card:hover {
  transform: translateY(-5px) scale(1.02);
  box-shadow: 0 18px 36px rgba(0, 0, 0, 0.18);
}

/* Card Gradients */
.homework-card {
  background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
}

.exams-card {
  background: linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%);
}

.subjects-card {
  background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
}

.schedule-card {
  background: linear-gradient(135deg, #10b981 0%, #047857 100%);
}

.card-badge {
  font-size: 11px;
  font-weight: 800;
  padding: 4px 10px;
  border-radius: 12px;
  width: fit-content;
  backdrop-filter: blur(10px);
}

.card-badge.warning { background: rgba(254, 243, 199, 0.25); color: #ffffff; }
.card-badge.danger { background: rgba(254, 226, 226, 0.25); color: #ffffff; }
.card-badge.info { background: rgba(224, 242, 254, 0.25); color: #ffffff; }
.card-badge.success { background: rgba(209, 250, 229, 0.25); color: #ffffff; }

.card-inner-body {
  position: relative;
  z-index: 2;
  margin-top: 12px;
}

.card-title {
  font-size: 18px;
  font-weight: 800;
  margin: 0 0 4px;
}

.card-desc {
  font-size: 12px;
  opacity: 0.9;
  line-height: 1.3;
  margin: 0 0 14px;
}

.card-action-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  background: rgba(255, 255, 255, 0.22);
  backdrop-filter: blur(8px);
  padding: 6px 12px;
  border-radius: 14px;
  font-size: 12px;
  font-weight: 700;
  width: fit-content;
}

.card-3d-illustration {
  position: absolute;
  bottom: -6px;
  left: -4px;
  font-size: 64px;
  opacity: 0.85;
  filter: drop-shadow(0 8px 12px rgba(0, 0, 0, 0.15));
  pointer-events: none;
}
</style>
```

---

## ⚙️ 3. الـ Props و الـ Events الخاصة بـ `DashboardCards`

| اسم الـ Prop / Event | النوع | الوصف | القيمة الافتراضية |
| :--- | :--- | :--- | :--- |
| `pendingHomeworksCount` | `Number` | عدد الواجبات المعلقة للبطاقة | `4` |
| `upcomingExamsCount` | `Number` | عدد الامتحانات القادمة | `1` |
| `subjectsCount` | `Number` | عدد المواد المنهجية | `8` |
| `currentDayName` | `String` | اسم اليوم الحالي للبطاقة | `"الثلاثاء"` |
