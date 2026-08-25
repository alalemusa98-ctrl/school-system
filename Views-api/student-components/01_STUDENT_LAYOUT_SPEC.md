# 📱 01. مواصفات مكون الهيكل الرئيسي (`StudentLayout.vue`)

> **الملف المرجعي:** [`Views-api/student-components/01_STUDENT_LAYOUT_SPEC.md`](file:///c:/Users/alhareth/Desktop/work/school-system/Views-api/student-components/01_STUDENT_LAYOUT_SPEC.md)  
> **اسم المكون البرمجي:** `StudentLayout.vue` ([`src/components/student/StudentLayout.vue`](file:///c:/Users/alhareth/Desktop/work/school-system/frontend/src/components/student/StudentLayout.vue))  
> **الوصف:** المكون الموحد لغلاف واجهات الطالب بنمط iOS. يحتوي على شريط الحالة (Status Bar)، الجزيرة التفاعلية (Dynamic Island)، البار العلوي (Navigation Bar)، العنوان والوصف، زر العودة، وشريط التنقل السفلي (MobileNav).

---

## 📐 1. هيكل الـ Vue / HTML Component Markup

```html
<template>
  <div class="student-app-root">
    <!-- Header (iOS Mobile App Architecture) -->
    <header class="ios-header">
      <!-- Gradient Top Header Banner -->
      <div class="ios-header-banner">
        
        <!-- Status Bar -->
        <div class="ios-status-bar">
          <span class="ios-time">9:41</span>
          <div class="ios-dynamic-island">
            <div class="camera-lens"></div>
          </div>
          <div class="ios-status-icons">
            <!-- SVG Signal, Wifi, and Battery Icons -->
          </div>
        </div>

        <!-- Navigation Top Bar -->
        <div class="ios-nav-bar">
          <!-- Back / Home Button -->
          <button class="glass-icon-btn" title="الرئيسية" @click="$router.push('/student')">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
          </button>

          <!-- Dynamic Page Title -->
          <h1 class="ios-nav-title">{{ pageTitle || 'تفاصيل الطالب' }}</h1>

          <!-- Header Action Button (Filter / Notifications) -->
          <div class="ios-nav-actions">
            <button class="glass-icon-btn" title="تصفية">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
              </svg>
            </button>
          </div>
        </div>
      </div>

      <!-- Header Subtitle & Emoji Banner Section -->
      <div class="ios-page-intro-card" v-if="pageSubtitle || pageEmoji">
        <div class="intro-emoji-badge" v-if="pageEmoji">{{ pageEmoji }}</div>
        <div class="intro-text-group">
          <h2 class="intro-main-title">{{ pageTitle }}</h2>
          <p class="intro-subtitle" v-if="pageSubtitle">{{ pageSubtitle }}</p>
        </div>
      </div>
    </header>

    <!-- Main Dynamic Content Slot -->
    <main class="ios-main-content">
      <slot></slot>
    </main>

    <!-- Global Mobile Bottom Navigation Bar -->
    <MobileNav />
  </div>
</template>
```

---

## ⚙️ 2. الـ Props والـ Slots المعتمدة

| الـ Prop / Slot | النوع | الافتراضي | الوصف |
| :--- | :--- | :--- | :--- |
| `pageTitle` | `String` | `'بوابة الطالب'` | العنوان الرئيسي المعروض في أعلى البار والكرت التوضيحي. |
| `pageSubtitle` | `String` | `''` | الوصف التوضيحي السريع أسفل عنوان الصفحة. |
| `pageEmoji` | `String` | `'🎓'` | الأيقونة المعبرة بجانب عنوان الصفحة (مثل 📚 للمواد، 📝 للواجبات). |
| `default` Slot | `Slot` | `—` | المكان الذي يتم فيه إدراج محتوى الشاشة التفصيلية للطالب. |

---

## 🎨 3. قواعد أنماط الـ CSS الأساسية (CSS Specification Rules)

```css
.student-app-root {
  min-height: 100vh;
  background-color: var(--bg-main, #f8fafc);
  direction: rtl;
  font-family: 'SF Arabic', -apple-system, BlinkMacSystemFont, sans-serif;
  padding-bottom: 90px; /* مسافة حماية للشريط السفلي */
}

.ios-header-banner {
  background: var(--brand-gradient, linear-gradient(135deg, #7c3aed 0%, #4f46e5 100%));
  border-bottom-left-radius: 28px;
  border-bottom-right-radius: 28px;
  padding-bottom: 24px;
  box-shadow: 0 10px 25px rgba(124, 58, 237, 0.25);
}

.ios-nav-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 18px;
}

.ios-nav-title {
  color: #ffffff;
  font-size: 1.15rem;
  font-weight: 700;
  margin: 0;
}

.ios-page-intro-card {
  margin: -16px 16px 16px 16px;
  background: #ffffff;
  border-radius: 20px;
  padding: 16px 20px;
  display: flex;
  align-items: center;
  gap: 14px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.06);
  border: 1px solid #f1f5f9;
}

.intro-emoji-badge {
  font-size: 2.2rem;
  background: rgba(124, 58, 237, 0.08);
  width: 54px;
  height: 54px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.ios-main-content {
  padding: 16px;
  max-width: 800px;
  margin: 0 auto;
}
```
