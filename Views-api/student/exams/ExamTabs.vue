<template>
  <section class="exam-filter-section">
    <!-- Segmented Control Tab Switcher -->
    <div class="exam-segmented-control">
      <button 
        class="exam-tab-btn" 
        :class="{ active: activeTab === 'upcoming' }" 
        @click="selectTab('upcoming')"
      >
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
          <line x1="16" y1="2" x2="16" y2="6"></line>
          <line x1="8" y1="2" x2="8" y2="6"></line>
          <line x1="3" y1="10" x2="21" y2="10"></line>
        </svg>
        <span>الامتحانات القادمة</span>
        <span v-if="upcomingCount > 0" class="exam-count-badge">{{ upcomingCount }}</span>
      </button>

      <button 
        class="exam-tab-btn" 
        :class="{ active: activeTab === 'results' }" 
        @click="selectTab('results')"
      >
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
        </svg>
        <span>النتائج والأرشيف</span>
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
    default: 'upcoming'
  },
  selectedSubject: {
    type: String,
    default: 'ALL'
  },
  upcomingCount: {
    type: Number,
    default: 3
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
.exam-filter-section {
  padding: 16px 16px 8px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

/* Segmented Control Styling */
.exam-segmented-control {
  background: #f1f5f9;
  border-radius: 18px;
  padding: 4px;
  display: flex;
  gap: 4px;
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.04);
}

.exam-tab-btn {
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

.exam-tab-btn.active {
  background: #ffffff;
  color: #e11d48;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
}

.exam-count-badge {
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
  background: linear-gradient(135deg, #f43f5e 0%, #e11d48 100%);
  border-color: transparent;
  color: #ffffff;
  box-shadow: 0 8px 18px rgba(225, 29, 72, 0.3);
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
