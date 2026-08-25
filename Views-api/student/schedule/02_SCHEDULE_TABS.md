# 📑 02. مواصفات ومكون تابات وفلاتر الجدول الدراسي (`ScheduleTabs`)

> **الملف المرجعي:** [`Views-api/student/schedule/02_SCHEDULE_TABS.md`](file:///c:/Users/alhareth/Desktop/work/school-system/Views-api/student/schedule/02_SCHEDULE_TABS.md)  
> **اسم المكون البرمجي:** `ScheduleTabs.vue`  
> **الوصف:** المكون المخصص للتابات السريعة وفلاتر الحصص لصفحة الجدول الأسبوعي (الجزء الثاني في التصميم المعتمد)، ويتكون من زر التحكم المقسم (Segmented Control) للتنقل بين الحصص اليومية والجدول الأسبوعي الكامل مع عداد الحصص، بالإضافة لصف كبسولات فلاتر المواد لتظليل حصص مادة معينة بالجدول.

---

## 📸 1. الوصف البصري والتشريحي للجزء (Component Anatomy)

```
+-----------------------------------------------------------------------+
|  +-----------------------------------------------------------------+  |
|  |  (📅) الجدول الأسبوعي               (🟢 30) (🕒) الحصص اليومية     |  |
|  +-----------------------------------------------------------------+  |
|                                                                       |
|  +--------+   +--------+   +--------+   +--------+   +--------+       |
|  |   🌟   |   |   📐   |   |   🔬   |   |   📖   |   |   🔤   |       |
|  |  الكل  |   |رياضيات |   | علوم   |   | عربية  |   | إنجليزي|       |
|  +--------+   +--------+   +--------+   +--------+   +--------+       |
+-----------------------------------------------------------------------+
```

### عناصر التابات والفلاتر الأساسية:
1. **التحكم المقسم السريع (Segmented Control):**
   - **تاب الحصص اليومية (Daily Slots Tab):** زر كبسولي عائم بخلفية بيضاء وظل متميز يحتوي على أيقونة ساعة، نص `"الحصص اليومية"`، وعلامة نوتيفيكيشن خضراء دائرية تحتوي على إجمالي حصص الأسبوع (`30`).
   - **تاب الجدول الأسبوعي (Full Weekly Tab):** زر كبسولي يحتوي على أيقونة تقويم ونص `"الجدول الأسبوعي"`.
2. **شريط كبسولات المواد (Vertical Subject Pills Row):**
   - كبسولات تفاعلية أفقية قابلة للسحب، كل كبسولة تتوزع عمودياً (الأيقونة أو الصورة 3D في الأعلى واسم المادة في الأسفل).
   - **كبسولة "الكل":** الكبسولة النشطة ملونة بالتدرج الزمردي الأخضر المضيء بنجمة ذهبية 3D (`🌟`).
   - **كبسولات المواد التخصصية:** الرياضيات، العلوم العامة، اللغة العربية، اللغة الإنجليزية، التربية الإسلامية، الحاسوب، والدراسات الاجتماعية.

---

## 📐 2. كود المكون الكامل Vue 3 Component (`ScheduleTabs.vue`)

```vue
<template>
  <section class="schedule-filter-section">
    <!-- Segmented Control Tab Switcher -->
    <div class="schedule-segmented-control">
      <button 
        class="schedule-tab-btn" 
        :class="{ active: activeTab === 'daily' }" 
        @click="selectTab('daily')"
      >
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
          <circle cx="12" cy="12" r="10"></circle>
          <polyline points="12 6 12 12 16 14"></polyline>
        </svg>
        <span>الحصص اليومية</span>
        <span v-if="totalSlotsCount > 0" class="schedule-count-badge">{{ totalSlotsCount }}</span>
      </button>

      <button 
        class="schedule-tab-btn" 
        :class="{ active: activeTab === 'weekly' }" 
        @click="selectTab('weekly')"
      >
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
          <line x1="16" y1="2" x2="16" y2="6"></line>
          <line x1="8" y1="2" x2="8" y2="6"></line>
          <line x1="3" y1="10" x2="21" y2="10"></line>
        </svg>
        <span>الجدول الأسبوعي</span>
      </button>
    </div>

    <!-- Quick Subject Filter Pills -->
    <div class="subject-pills-row">
      <button 
        class="sub-pill" 
        :class="{ active: selectedSubject === 'ALL' }" 
        @click="selectSubject('ALL')"
      >
        <div class="sub-pill-icon-top">🌟</div>
        <span class="sub-pill-name">الكل</span>
      </button>

      <button 
        v-for="sub in subjectOptions" 
        :key="sub.id"
        class="sub-pill"
        :class="{ active: selectedSubject === sub.id }"
        @click="selectSubject(sub.id)"
      >
        <img v-if="sub.image" :src="sub.image" class="sub-pill-3d-img" alt="" />
        <div v-else class="sub-pill-icon-top">{{ sub.icon }}</div>
        <span class="sub-pill-name">{{ sub.name }}</span>
      </button>
    </div>
  </section>
</template>

<script setup>
const props = defineProps({
  activeTab: {
    type: String,
    default: 'daily'
  },
  selectedSubject: {
    type: String,
    default: 'ALL'
  },
  totalSlotsCount: {
    type: Number,
    default: 30
  },
  subjectOptions: {
    type: Array,
    default: () => [
      { id: 'math', name: 'الرياضيات', icon: '📐' },
      { id: 'science', name: 'العلوم العامة', icon: '🔬' },
      { id: 'arabic', name: 'اللغة العربية', icon: '📖' },
      { id: 'english', name: 'اللغة الإنجليزية', icon: '🔤' },
      { id: 'islamic', name: 'التربية الإسلامية', icon: '🕌' },
      { id: 'computer', name: 'الحاسوب والتقنية', icon: '💻' },
      { id: 'social', name: 'الدراسات الاجتماعية', icon: '🌍' }
    ]
  }
});

const emit = defineEmits(['update:activeTab', 'update:selectedSubject']);

function selectTab(tab) {
  emit('update:activeTab', tab);
}

function selectSubject(subjectId) {
  emit('update:selectedSubject', subjectId);
}
</script>

<style scoped>
.schedule-filter-section {
  padding: 16px 16px 8px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

/* Segmented Control Styling */
.schedule-segmented-control {
  background: #f1f5f9;
  border-radius: 18px;
  padding: 4px;
  display: flex;
  gap: 4px;
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.04);
}

.schedule-tab-btn {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 10px 14px;
  border: none;
  border-radius: 14px;
  font-size: 14px;
  font-weight: 700;
  color: #64748b;
  background: transparent;
  cursor: pointer;
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
}

.schedule-tab-btn.active {
  background: #ffffff;
  color: #059669;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
}

.schedule-count-badge {
  background-color: #10b981;
  color: #ffffff;
  font-size: 11px;
  font-weight: 800;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 6px rgba(16, 185, 129, 0.4);
}

/* Vertical Subject Pills Row */
.subject-pills-row {
  display: flex;
  gap: 12px;
  overflow-x: auto;
  padding-bottom: 6px;
  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch;
}

.subject-pills-row::-webkit-scrollbar {
  display: none;
}

.sub-pill {
  min-width: 72px;
  padding: 12px 10px;
  border-radius: 20px;
  background: #ffffff;
  border: 1.5px solid #e2e8f0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
  flex-shrink: 0;
}

.sub-pill.active {
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  border-color: transparent;
  color: #ffffff;
  box-shadow: 0 8px 18px rgba(5, 150, 105, 0.3);
  transform: translateY(-2px);
}

.sub-pill-icon-top {
  font-size: 24px;
  line-height: 1;
}

.sub-pill-3d-img {
  width: 32px;
  height: 32px;
  object-fit: contain;
}

.sub-pill-name {
  font-size: 12px;
  font-weight: 700;
  white-space: nowrap;
}

.sub-pill.active .sub-pill-name {
  color: #ffffff;
}
</style>
```

---

## ⚙️ 3. الـ Props و الـ Events الخاصة بـ `ScheduleTabs`

| اسم الـ Prop / Event | Tipo | الوصف | القيمة الافتراضية |
| :--- | :--- | :--- | :--- |
| `activeTab` | `String` | اسم التاب المفعّل (`'daily'` أو `'weekly'`) | `'daily'` |
| `selectedSubject` | `String` | كود المادة المحددة (`'ALL'`, `'math'`, الخ) | `'ALL'` |
| `totalSlotsCount` | `Number` | إجمالي عدد الحصص الأسبوعية | `30` |
| `@update:activeTab` | `Event` | إشعار الأب عند تغيير التاب | ترسل اسم التاب الجديد |
| `@update:selectedSubject` | `Event` | إشعار الأب عند اختيار مادة | ترسل كود المادة |
