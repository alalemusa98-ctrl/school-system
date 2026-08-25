# 📑 02. مواصفات ومكون تابات وفلاتر المواد (`HomeworkTabs`)

> **الملف المرجعي:** [`Views-api/student/homeworks/02_HOMEWORK_TABS.md`](file:///c:/Users/alhareth/Desktop/work/school-system/Views-api/student/homeworks/02_HOMEWORK_TABS.md)  
> **اسم المكون البرمجي:** `HomeworkTabs.vue`  
> **الوصف:** المكون المخصص للتابات السريعة وفلاتر التصفية حسب المادة (الجزء الثاني المحدد بالمستطيل البرتقالي في التصميم المعتمد)، ويتكون من زر التحكم المقسم (Segmented Control) للتنقل بين الواجبات الحالية والأرشيف مع عداد نوتيفيكيشن أحمر، بالإضافة لصف الكبسولات التفاعلية المخصصة لفلاتر المواد الدراسية.

---

## 📸 1. الوصف البصري والتشريحي للجزء (Component Anatomy)

```
+-----------------------------------------------------------------------+
|  +-----------------------------------------------------------------+  |
|  |  (📁) الأرشيف                       (🔴 5) (🕒) الواجبات الحالية  |  |
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
   - **التاب النشط (Current Homeworks Tab):** زر كبسولي عائم بخلفية بيضاء وظل متميز يحتوي على أيقونة ساعة، نص `"الواجبات الحالية"`، وعلامة نوتيفيكيشن دائرية حمراء تشير لعدد الواجبات الحالية (`5`).
   - **تاب الأرشيف (Archive Tab):** زر كبسولي شفاف يحتوي على أيقونة مجلد ونص `"الأرشيف"`.
2. **شريط كبسولات المواد (Vertical Subject Pills Row):**
   - كبسولات تفاعلية مصفوفة أفقياً وقابلة للسحب، كل كبسولة تتوزع عمودياً (الأيقونة أو الصورة 3D في الأعلى واسم المادة في الأسفل).
   - **كبسولة "الكل":** الكبسولة النشطة ملونة باللون البنفسجي المضيء ومزودة بنجمة ذهبية 3D (`🌟`).
   - **كبسولات المواد التخصصية:** الرياضيات، العلوم العامة، اللغة العربية، اللغة الإنجليزية، التربية الإسلامية، الحاسوب، والدراسات الاجتماعية.

---

## 📐 2. كود المكون الكامل Vue 3 Component (`HomeworkTabs.vue`)

```vue
<template>
  <section class="hw-filter-section">
    <!-- Segmented Control Tab Switcher -->
    <div class="hw-segmented-control">
      <button 
        class="hw-tab-btn" 
        :class="{ active: activeTab === 'current' }" 
        @click="selectTab('current')"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
          <circle cx="12" cy="12" r="10"></circle>
          <polyline points="12 6 12 12 16 14"></polyline>
        </svg>
        <span>الواجبات الحالية</span>
        <span v-if="currentCount > 0" class="hw-count-badge">{{ currentCount }}</span>
      </button>

      <button 
        class="hw-tab-btn" 
        :class="{ active: activeTab === 'previous' }" 
        @click="selectTab('previous')"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
          <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
        </svg>
        <span>الأرشيف</span>
      </button>
    </div>

    <!-- Subject Filter Pills Row -->
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
    default: 'current'
  },
  selectedSubject: {
    type: String,
    default: 'ALL'
  },
  currentCount: {
    type: Number,
    default: 5
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
.hw-filter-section {
  padding: 16px 16px 8px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

/* Segmented Control Styling */
.hw-segmented-control {
  background: #f1f5f9;
  border-radius: 18px;
  padding: 4px;
  display: flex;
  gap: 4px;
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.04);
}

.hw-tab-btn {
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

.hw-tab-btn.active {
  background: #ffffff;
  color: #4f46e5;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
}

.hw-count-badge {
  background-color: #ef4444;
  color: #ffffff;
  font-size: 11px;
  font-weight: 800;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 6px rgba(239, 68, 68, 0.4);
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
  background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%);
  border-color: transparent;
  color: #ffffff;
  box-shadow: 0 8px 18px rgba(79, 70, 229, 0.3);
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

## ⚙️ 3. الـ Props و الـ Events الخاصة بـ `HomeworkTabs`

| اسم الـ Prop / Event | النوع | الوصف | القيمة الافتراضية |
| :--- | :--- | :--- | :--- |
| `activeTab` | `String` | اسم التاب المفعّل (`'current'` أو `'previous'`) | `'current'` |
| `selectedSubject` | `String` | كود المادة المحددة (`'ALL'`, `'math'`, الخ) | `'ALL'` |
| `currentCount` | `Number` | عدد الواجبات الحالية لعرض شارة العداد | `5` |
| `subjectOptions` | `Array` | مصفوفة المواد والمؤشرات والأيقونات | قائمة المواد السبعة |
| `@update:activeTab` | `Event` | إشعار الأب عند تغيير التاب | ترسل اسم التاب الجديد |
| `@update:selectedSubject` | `Event` | إشعار الأب عند اختيار مادة جديدة | ترسل كود المادة |
