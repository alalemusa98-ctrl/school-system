<template>
  <section class="hw-filter-section">
    <!-- Main Card Container Wrapper -->
    <div class="tabs-card-container">
      <!-- 1. Segmented Control Tab Switcher -->
      <div v-if="showTabs && resolvedTabs.length > 0" class="hw-segmented-control">
        <button 
          v-for="tab in resolvedTabs"
          :key="tab.id"
          class="hw-tab-btn" 
          :class="{ active: activeTab === tab.id }" 
          @click="selectTab(tab.id)"
        >
          <!-- Red Count Badge on Left in RTL -->
          <span 
            v-if="tab.badge !== undefined && tab.badge !== null && tab.badge > 0" 
            class="hw-count-badge"
          >
            {{ tab.badge }}
          </span>

          <!-- Tab Label Text -->
          <span class="tab-label-text">{{ tab.label }}</span>

          <!-- Icon (Clock for current/upcoming, Folder for archive) -->
          <span v-if="tab.iconSvg" class="tab-icon-wrap" v-html="tab.iconSvg"></span>
          <span v-else-if="tab.id === 'current' || tab.id === 'upcoming'" class="tab-icon-wrap">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <polyline points="12 6 12 12 16 14"></polyline>
            </svg>
          </span>
          <span v-else-if="tab.id === 'previous' || tab.id === 'archive' || tab.id === 'results'" class="tab-icon-wrap">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
            </svg>
          </span>
          <span v-else class="tab-emoji-icon">{{ tab.icon || '📁' }}</span>
        </button>
      </div>

      <!-- 2. Full-Width Action Button (+ إضافة واجب جديد / + جدولة امتحان) -->
      <slot name="action">
        <button 
          v-if="actionButtonText" 
          class="hw-create-action-btn" 
          @click="$emit('action-click')"
        >
          <span class="create-plus-icon">+</span>
          <span class="create-btn-label">{{ actionButtonText }}</span>
        </button>
      </slot>
    </div>

    <!-- 3. Quick Subject / Section Filter Pills Row -->
    <div v-if="showPills && resolvedPills.length > 0" class="subject-pills-row">
      <button 
        v-for="sub in resolvedPills" 
        :key="sub.id"
        class="sub-pill"
        :class="{ active: isPillActive(sub) }"
        @click="selectPill(sub)"
      >
        <img 
          v-if="resolvePillImage(sub)" 
          :src="resolvePillImage(sub)" 
          class="sub-pill-3d-img" 
          :alt="sub.name || sub.label" 
        />
        <div v-else class="sub-pill-icon-top">{{ sub.icon || (sub.grade_name || sub.name?.includes('شعبة') ? '🏫' : '📚') }}</div>
        <span class="sub-pill-name">{{ formatPillName(sub) }}</span>
      </button>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue';

// Import 3D Subject Images from shared assets
import mathImg from './assets/math_3d.jpg';
import scienceImg from './assets/science_3d.jpg';
import englishImg from './assets/english_3d.jpg';
import islamicImg from './assets/islamic_3d.jpg';

const props = defineProps({
  activeTab: { type: String, default: 'current' },
  selectedSubject: { type: [String, Number, null], default: 'ALL' },
  selectedSectionId: { type: [String, Number, null], default: null },
  tabs: { type: Array, default: null },
  pills: { type: Array, default: null },
  currentCount: { type: Number, default: 0 },
  showTabs: { type: Boolean, default: true },
  showPills: { type: Boolean, default: true },
  actionButtonText: { type: String, default: '' },
  actionButtonTag: { type: String, default: '' }
});

const emit = defineEmits([
  'update:activeTab', 
  'update:selectedSubject', 
  'update:selectedSectionId', 
  'change-tab', 
  'change-subject',
  'change-section',
  'action-click'
]);

// Default Segmented Tabs if none passed
const defaultTabs = computed(() => [
  { id: 'current', label: 'الواجبات الحالية', badge: props.currentCount },
  { id: 'previous', label: 'الأرشيف' }
]);

// Default Subject Filter Pills if none passed
const defaultPills = computed(() => [
  { id: 'ALL', name: 'الكل', icon: '🌟' },
  { id: 'math', name: 'الرياضيات', image: mathImg },
  { id: 'science', name: 'العلوم العامة', image: scienceImg },
  { id: 'arabic', name: 'اللغة العربية', icon: '📖' },
  { id: 'english', name: 'اللغة الإنجليزية', image: englishImg },
  { id: 'islamic', name: 'التربية الإسلامية', image: islamicImg },
  { id: 'computer', name: 'الحاسوب والتقنية', icon: '💻' },
  { id: 'social', name: 'الدراسات الاجتماعية', icon: '🌍' }
]);

const resolvedTabs = computed(() => props.tabs || defaultTabs.value);
const resolvedPills = computed(() => props.pills || defaultPills.value);

function selectTab(tabId) {
  emit('update:activeTab', tabId);
  emit('change-tab', tabId);
}

function selectPill(sub) {
  const targetId = sub.id !== undefined ? sub.id : null;
  emit('update:selectedSubject', targetId);
  emit('update:selectedSectionId', targetId);
  emit('change-subject', targetId);
  emit('change-section', targetId);
}

function isPillActive(sub) {
  if (props.selectedSectionId !== undefined && props.selectedSectionId !== null) {
    return props.selectedSectionId === sub.id;
  }
  if (props.selectedSubject === sub.id) return true;
  if (props.selectedSubject === 'ALL' && (sub.id === 'ALL' || sub.id === null)) return true;
  return false;
}

function formatPillName(sub) {
  if (sub.grade_name && sub.name) return `${sub.grade_name} (${sub.name})`;
  return sub.name || sub.label || 'الكل';
}

function resolvePillImage(sub) {
  if (sub.image) return sub.image;
  if (sub.imageUrl) return sub.imageUrl;
  const name = sub.name || sub.label || '';
  if (name.includes('رياضيات') || sub.id === 'math') return mathImg;
  if (name.includes('علوم') || sub.id === 'science') return scienceImg;
  if (name.includes('إنجليز') || sub.id === 'english') return englishImg;
  if (name.includes('إسلام') || name.includes('قرآن') || sub.id === 'islamic') return islamicImg;
  return null;
}
</script>

<style scoped>
.hw-filter-section {
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
  box-sizing: border-box;
}

/* Outer Floating Card Container matching Reference Design */
.tabs-card-container {
  background: #ffffff;
  border-radius: 24px;
  padding: 14px 16px;
  box-shadow: 0 10px 30px -4px rgba(15, 23, 42, 0.06), 0 4px 12px -2px rgba(15, 23, 42, 0.03);
  display: flex;
  flex-direction: column;
  gap: 12px;
  border: 1px solid rgba(241, 245, 249, 0.8);
}

/* Segmented Control Switcher Container */
.hw-segmented-control {
  background: #f8fafc;
  border-radius: 18px;
  padding: 0px;
  display: flex;
  gap: 4px;
  border: 0px solid #f1f5f9;
}

/* Individual Tab Button */
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
  font-family: 'SF Arabic', -apple-system, BlinkMacSystemFont, 'SF Pro Arabic', sans-serif !important;
  color: #64748b;
  background: transparent;
  cursor: pointer;
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  user-select: none;
  -webkit-tap-highlight-color: transparent;
}

/* Active Tab Floating White Pill Effect */
.hw-tab-btn.active {
  background: #ffffff;
  color: #6366f1;
  box-shadow: 0 4px 14px rgba(99, 102, 241, 0.12), 0 2px 6px rgba(0, 0, 0, 0.04);
  font-weight: 800;
}

.tab-icon-wrap {
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.tab-label-text {
  font-size: 14px;
  font-family: 'SF Arabic', -apple-system, BlinkMacSystemFont, 'SF Pro Arabic', sans-serif !important;
  letter-spacing: -0.2px;
}

/* Red Circular Count Badge */
.hw-count-badge {
  background-color: #ef4444;
  color: #ffffff;
  font-size: 11px;
  font-weight: 800;
  font-family: 'SF Arabic', -apple-system, BlinkMacSystemFont, sans-serif !important;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 6px rgba(239, 68, 68, 0.35);
  box-sizing: border-box;
}

/* Full-Width Action Button (+ إضافة واجب جديد) */
.hw-create-action-btn {
  width: 100%;
  background: linear-gradient(135deg, #4f46e5 0%, #4338ca 100%);
  color: #ffffff;
  border: none;
  border-radius: 20px;
  padding: 13px 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  cursor: pointer;
  font-family: 'SF Arabic', -apple-system, BlinkMacSystemFont, 'SF Pro Arabic', sans-serif !important;
  box-shadow: 0 8px 20px -4px rgba(79, 70, 229, 0.35);
  transition: all 0.22s ease;
  user-select: none;
  -webkit-tap-highlight-color: transparent;
}

.hw-create-action-btn:hover {
  background: linear-gradient(135deg, #4338ca 0%, #3730a3 100%);
  transform: translateY(-2px);
  box-shadow: 0 12px 24px -4px rgba(79, 70, 229, 0.45);
}

.hw-create-action-btn:active {
  transform: scale(0.98);
}

.create-plus-icon {
  font-size: 18px;
  font-weight: 800;
  font-family: 'SF Arabic', -apple-system, BlinkMacSystemFont, sans-serif !important;
  line-height: 1;
}

.create-btn-label {
  font-size: 14.5px;
  font-weight: 800;
  font-family: 'SF Arabic', -apple-system, BlinkMacSystemFont, 'SF Pro Arabic', sans-serif !important;
  letter-spacing: -0.2px;
}

/* Horizontal Scrollable Pills Row */
.subject-pills-row {
  display: flex;
  gap: 12px;
  overflow-x: auto;
  padding-bottom: 4px;
  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch;
}

.subject-pills-row::-webkit-scrollbar {
  display: none;
}

.sub-pill {
  min-width: 76px;
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
  font-family: 'SF Arabic', -apple-system, BlinkMacSystemFont, 'SF Pro Arabic', sans-serif !important;
  transition: all 0.2s ease;
  flex-shrink: 0;
  user-select: none;
  -webkit-tap-highlight-color: transparent;
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
  width: 36px;
  height: 36px;
  object-fit: cover;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.12);
  border: 1.5px solid #ffffff;
}

.sub-pill-name {
  font-size: 12px;
  font-weight: 700;
  font-family: 'SF Arabic', -apple-system, BlinkMacSystemFont, 'SF Pro Arabic', sans-serif !important;
  white-space: nowrap;
}

.sub-pill.active .sub-pill-name {
  color: #ffffff;
}
</style>
