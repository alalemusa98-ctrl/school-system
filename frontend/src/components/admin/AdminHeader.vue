<template>
  <header class="saas-executive-header">
    <div class="header-brand-group">
      <div class="brand-sq-icon">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
          <path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5" />
        </svg>
      </div>
      <div class="brand-title-box">
        <h1 class="brand-main-title">منظومة إدارة المدرسة</h1>
        <span class="brand-sub-title">لوحة التحكم الإدارية الشاملة</span>
      </div>
    </div>

    <!-- Center Search Input -->
    <div class="header-center-search">
      <svg class="search-glass-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#64748b" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
      <input
        v-model="searchQuery"
        type="text"
        placeholder="بحث سريع عن طالب، معلم، أو مادة..."
        class="saas-search-input"
        @input="$emit('search', searchQuery)"
      />
    </div>

    <!-- Left Header Actions -->
    <div class="header-left-actions">
      <button class="notif-bell-btn" title="التنبيهات">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#475569" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
          <path d="M13.73 21a2 2 0 0 1-3.46 0" />
        </svg>
        <span class="notif-dot-badge">3</span>
      </button>

      <!-- macOS Style Profile Dropdown -->
      <div class="user-profile-dropdown-container" ref="dropdownRef">
        <button id="profilePillBtn" class="user-profile-pill" @click="toggleMenu">
          <div class="user-avatar-circle">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#4f46e5" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </div>
          <div class="user-info-meta">
            <span class="user-display-name">{{ adminUser.username || 'مدير المنظومة' }}</span>
            <span class="user-display-role">المدير العام</span>
          </div>
          <svg id="profileCaret" class="dropdown-caret-icon" :class="{ open: isMenuOpen }" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M6 9l6 6 6-6" />
          </svg>
        </button>

        <div id="profileMenu" class="mac-dropdown-menu" :class="{ show: isMenuOpen }">
          <div class="mac-dropdown-header">
            <div class="mac-header-avatar">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#4f46e5" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </div>
            <div class="mac-header-info">
              <span class="mac-user-name">{{ adminUser.username || 'مدير المنظومة' }}</span>
              <span class="mac-user-email">admin@school.ly</span>
            </div>
          </div>
          <div class="mac-dropdown-divider"></div>
          <div class="mac-dropdown-group">
            <button class="mac-dropdown-item" @click="handleSelectTab('GRADES')">
              <div class="item-left">
                <svg class="item-svg-icon" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                  <path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5" />
                </svg>
                <span>الفصول والقاعات</span>
              </div>
              <span class="item-shortcut">⌘1</span>
            </button>
            <button class="mac-dropdown-item" @click="handleSelectTab('TIMETABLE')">
              <div class="item-left">
                <svg class="item-svg-icon" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
                <span>الجدول الدراسي</span>
              </div>
              <span class="item-shortcut">⌘2</span>
            </button>
          </div>
          <div class="mac-dropdown-divider"></div>
          <div class="mac-dropdown-group">
            <button class="mac-dropdown-item danger" @click="handleLogout">
              <div class="item-left">
                <svg class="item-svg-icon" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                  <polyline points="16 17 21 12 16 7" />
                  <line x1="21" y1="12" x2="9" y2="12" />
                </svg>
                <span>تسجيل الخروج</span>
              </div>
              <span class="item-shortcut">⌥⌘Q</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';

const emit = defineEmits(['search', 'select-tab']);

const router = useRouter();
const adminUser = ref({});
const isMenuOpen = ref(false);
const searchQuery = ref('');
const dropdownRef = ref(null);

onMounted(() => {
  const stored = localStorage.getItem('school_user');
  if (stored) {
    try {
      adminUser.value = JSON.parse(stored);
    } catch (e) {}
  }
  document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
});

function toggleMenu() {
  isMenuOpen.value = !isMenuOpen.value;
}

function handleClickOutside(e) {
  if (dropdownRef.value && !dropdownRef.value.contains(e.target)) {
    isMenuOpen.value = false;
  }
}

function handleSelectTab(tabId) {
  isMenuOpen.value = false;
  emit('select-tab', tabId);
}

function handleLogout() {
  localStorage.removeItem('school_token');
  localStorage.removeItem('school_user');
  router.push('/login');
}
</script>

<style scoped>
/* Inherits full styling from admin-design.css */
</style>
