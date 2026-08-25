# 📑 02. مواصفات ومكون تابات وفلاتر الامتحانات للمعلم (`TeacherExamTabs`)

> **الملف المرجعي:** [`Views-api/teacher/exams/02_EXAM_TABS.md`](file:///c:/Users/alhareth/Desktop/work/school-system/Views-api/teacher/exams/02_EXAM_TABS.md)  
> **اسم المكون البرمجي:** `TeacherExamTabs.vue`  
> **التصميم المرجعي المعتمد:** مطابق 100% لمواصفات [`Views-api/student/exams/02_EXAM_TABS.md`](file:///c:/Users/alhareth/Desktop/work/school-system/Views-api/student/exams/02_EXAM_TABS.md)  
> **الوصف:** المكون المخصص للتبديل بين الامتحانات القادمة والنتائج والأرشيف مع عداد الامتحانات المجدولة، زر جدولة امتحان جديد، وصف كبسولات الشعب والفصول المسندة للمعلم بنمط iOS.

---

## 📸 1. الوصف البصري والتشريحي للجزء (Component Anatomy)

```
+-----------------------------------------------------------------------+
|  +-----------------------------------------------------------------+  |
|  |  (📁) النتائج والأرشيف          (🔴 3) (🕒) الامتحانات القادمة  |  |
|  +-----------------------------------------------------------------+  |
|                                                                       |
|  +-----------------------------------------------------------------+  |
|  |             [ ➕ جدولة امتحان مدرسي جديد للشعبة ]                |  |
|  +-----------------------------------------------------------------+  |
|                                                                       |
|  +--------+   +---------------+   +---------------+   +-----------+   |
|  |   🌟   |   |      🏫       |   |      🏫       |   |    🏫     |   |
|  |  الكل  |   | الصف 5 (أ5)   |   | الصف 5 (ب5)   |   |الصف 6 (أ6)|   |
|  +--------+   +---------------+   +---------------+   +-----------+   |
+-----------------------------------------------------------------------+
```

---

## 📐 2. كود المكون الكامل Vue 3 Component (`TeacherExamTabs.vue`)

```vue
<template>
  <section class="hw-filter-section">
    <!-- Segmented Control Tab Switcher -->
    <div class="hw-segmented-control">
      <button 
        class="hw-tab-btn" 
        :class="{ active: activeTab === 'upcoming' }" 
        @click="selectTab('upcoming')"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
          <circle cx="12" cy="12" r="10"></circle>
          <polyline points="12 6 12 12 16 14"></polyline>
        </svg>
        <span>الامتحانات القادمة</span>
        <span v-if="upcomingCount > 0" class="hw-count-badge">{{ upcomingCount }}</span>
      </button>

      <button 
        class="hw-tab-btn" 
        :class="{ active: activeTab === 'archive' }" 
        @click="selectTab('archive')"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
          <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
        </svg>
        <span>النتائج والأرشيف</span>
      </button>
    </div>

    <!-- Teacher Exam Create Action Button -->
    <button class="hw-create-action-btn" @click="$emit('open-create')">
      <div class="create-btn-icon">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round">
          <line x1="12" y1="5" x2="12" y2="19"></line>
          <line x1="5" y1="12" x2="19" y2="12"></line>
        </svg>
      </div>
      <span class="create-btn-label">جدولة امتحان مدرسي جديد</span>
      <span class="create-btn-tag">مجدول</span>
    </button>

    <!-- Vertical Class/Section Pills Row -->
    <div class="subject-pills-row">
      <button 
        class="sub-pill" 
        :class="{ active: selectedSectionId === null }" 
        @click="selectSection(null)"
      >
        <div class="sub-pill-icon-top">🌟</div>
        <span class="sub-pill-name">كافة الشعب</span>
      </button>

      <button 
        v-for="section in assignedSections" 
        :key="section.id"
        class="sub-pill"
        :class="{ active: selectedSectionId === section.id }"
        @click="selectSection(section.id)"
      >
        <div class="sub-pill-icon-top">🏫</div>
        <span class="sub-pill-name">{{ section.grade_name }} ({{ section.name }})</span>
      </button>
    </div>
  </section>
</template>

<script setup>
const props = defineProps({
  activeTab: { type: String, default: 'upcoming' },
  upcomingCount: { type: Number, default: 3 },
  archiveCount: { type: Number, default: 1 },
  selectedSectionId: { type: [Number, String, null], default: null },
  assignedSections: {
    type: Array,
    default: () => [
      { id: 1, name: 'أ5', grade_name: 'الصف الخامس' },
      { id: 2, name: 'ب5', grade_name: 'الصف الخامس' },
      { id: 3, name: 'أ6', grade_name: 'الصف السادس' }
    ]
  }
});

const emit = defineEmits(['update:activeTab', 'update:selectedSectionId', 'open-create', 'change-tab', 'change-section']);

function selectTab(tab) {
  emit('update:activeTab', tab);
  emit('change-tab', tab);
}

function selectSection(sectionId) {
  emit('update:selectedSectionId', sectionId);
  emit('change-section', sectionId);
}
</script>

<style scoped>
.hw-filter-section {
  padding: 16px 16px 8px;
  display: flex;
  flex-direction: column;
  gap: 14px;
}

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

.hw-create-action-btn {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 18px;
  background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%);
  color: #ffffff;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  box-shadow: 0 8px 20px rgba(79, 70, 229, 0.28);
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

.hw-create-action-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 24px rgba(79, 70, 229, 0.38);
}

.create-btn-icon {
  width: 32px;
  height: 32px;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.22);
  display: flex;
  align-items: center;
  justify-content: center;
}

.create-btn-label {
  font-size: 14px;
  font-weight: 800;
}

.create-btn-tag {
  background: rgba(255, 255, 255, 0.25);
  font-size: 10.5px;
  font-weight: 800;
  padding: 3px 8px;
  border-radius: 8px;
}

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
  min-width: 80px;
  padding: 10px 12px;
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
  font-size: 22px;
  line-height: 1;
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
