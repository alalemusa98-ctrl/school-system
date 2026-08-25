# 📑 02. مواصفات ومكون تابات وفلاتر المواد الدراسية (`SubjectTabs`)

> **الملف المرجعي:** [`Views-api/student/subjects/02_SUBJECT_TABS.md`](file:///c:/Users/alhareth/Desktop/work/school-system/Views-api/student/subjects/02_SUBJECT_TABS.md)  
> **اسم المكون البرمجي:** `SubjectTabs.vue`  
> **الوصف:** المكون المخصص للتابات السريعة وفلاتر المواد لصفحة تفاصيل المواد الدراسية (الجزء الثاني في التصميم المعتمد)، ويتكون من زر التحكم المقسم (Segmented Control) للتنقل بين جميع الواجبات المدرسية وجميع الامتحانات والتقييمات الخاصة بالمادة المختارة مع عدادات الإحصائيات، بالإضافة لصف كبسولات المواد السريعة.

---

## 📸 1. الوصف البصري والتشريحي للجزء (Component Anatomy)

```
+-----------------------------------------------------------------------+
|  +-----------------------------------------------------------------+  |
|  | (🔴 3) (📝) الامتحانات والتقييمات       (🔵 5) (📄) الواجبات المدرسية  |  |
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
   - **تاب الواجبات المدرسية (Subject Homeworks Tab):** زر كبسولي عائم بخلفية بيضاء وظل متميز يحتوي على أيقونة المستندات، نص `"جميع الواجبات المدرسية"`، وعلامة نوتيفيكيشن زرقاء تحتوي على عدد واجبات المادة (`5`).
   - **تاب الامتحانات والتقييمات (Subject Exams Tab):** زر كبسولي يحتوي على أيقونة التقييمات، نص `"جميع الامتحانات والتقييمات"`، وعلامة نوتيفيكيشن حمراء تحتوي على عدد امتحانات المادة (`3`).
2. **شريط كبسولات المواد (Vertical Subject Pills Row):**
   - كبسولات تفاعلية أفقية قابلة للسحب، كل كبسولة تتوزع عمودياً (الأيقونة أو الصورة 3D في الأعلى واسم المادة في الأسفل).
   - **كبسولة "الكل":** الكبسولة النشطة ملونة بالتدرج الأزرق السماوي المضيء بنجمة ذهبية 3D (`🌟`).
   - **كبسولات المواد التخصصية:** الرياضيات، العلوم العامة، اللغة العربية، اللغة الإنجليزية، التربية الإسلامية، الحاسوب، والدراسات الاجتماعية.

---

## 📐 2. كود المكون الكامل Vue 3 Component (`SubjectTabs.vue`)

```vue
<template>
  <section class="subject-filter-section">
    <!-- Segmented Control Tab Switcher for Subject Detail -->
    <div class="subject-segmented-control">
      <button 
        class="subject-tab-btn" 
        :class="{ active: activeTab === 'homeworks' }" 
        @click="selectTab('homeworks')"
      >
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
          <polyline points="14 2 14 8 20 8"></polyline>
          <line x1="16" y1="13" x2="8" y2="13"></line>
          <line x1="16" y1="17" x2="8" y2="17"></line>
        </svg>
        <span>جميع الواجبات المدرسية</span>
        <span v-if="homeworksCount > 0" class="subject-count-badge cyan">{{ homeworksCount }}</span>
      </button>

      <button 
        class="subject-tab-btn" 
        :class="{ active: activeTab === 'exams' }" 
        @click="selectTab('exams')"
      >
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
          <line x1="16" y1="2" x2="16" y2="6"></line>
          <line x1="8" y1="2" x2="8" y2="6"></line>
          <line x1="3" y1="10" x2="21" y2="10"></line>
        </svg>
        <span>جميع الامتحانات والتقييمات</span>
        <span v-if="examsCount > 0" class="subject-count-badge pink">{{ examsCount }}</span>
      </button>
    </div>

    <!-- Quick Subject Filter Pills Row -->
    <div v-if="showSubjectPills" class="subject-pills-row">
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
    default: 'homeworks'
  },
  selectedSubject: {
    type: String,
    default: 'ALL'
  },
  homeworksCount: {
    type: Number,
    default: 5
  },
  examsCount: {
    type: Number,
    default: 3
  },
  showSubjectPills: {
    type: Boolean,
    default: true
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
.subject-filter-section {
  padding: 16px 16px 8px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

/* Segmented Control Styling */
.subject-segmented-control {
  background: #f1f5f9;
  border-radius: 18px;
  padding: 4px;
  display: flex;
  gap: 4px;
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.04);
}

.subject-tab-btn {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 10px 14px;
  border: none;
  border-radius: 14px;
  font-size: 13px;
  font-weight: 700;
  color: #64748b;
  background: transparent;
  cursor: pointer;
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
}

.subject-tab-btn.active {
  background: #ffffff;
  color: #0284c7;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
}

.subject-count-badge {
  font-size: 11px;
  font-weight: 800;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
}

.subject-count-badge.cyan {
  background-color: #06b6d4;
  box-shadow: 0 2px 6px rgba(6, 182, 212, 0.4);
}

.subject-count-badge.pink {
  background-color: #ec4899;
  box-shadow: 0 2px 6px rgba(236, 72, 153, 0.4);
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
  background: linear-gradient(135deg, #38bdf8 0%, #0284c7 100%);
  border-color: transparent;
  color: #ffffff;
  box-shadow: 0 8px 18px rgba(2, 132, 199, 0.3);
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

## ⚙️ 3. الـ Props و الـ Events الخاصة بـ `SubjectTabs`

| اسم الـ Prop / Event | النوع | الوصف | القيمة الافتراضية |
| :--- | :--- | :--- | :--- |
| `activeTab` | `String` | التاب النشط (`'homeworks'` أو `'exams'`) | `'homeworks'` |
| `selectedSubject` | `String` | كود المادة المحددة (`'ALL'`, `'math'`, الخ) | `'ALL'` |
| `homeworksCount` | `Number` | عدد الواجبات الخاصة بالمادة | `5` |
| `examsCount` | `Number` | عدد الامتحانات الخاصة بالمادة | `3` |
| `@update:activeTab` | `Event` | إشعار الأب عند تغيير التاب | ترسل اسم التاب الجديد |
| `@update:selectedSubject` | `Event` | إشعار الأب عند اختيار مادة | ترسل كود المادة |
