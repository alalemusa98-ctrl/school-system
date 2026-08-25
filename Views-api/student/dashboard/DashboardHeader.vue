<template>
  <header class="ios-header">
    <!-- Gradient Top Header Banner -->
    <div class="ios-header-banner">
      <!-- Status Bar -->
      <div class="ios-status-bar">
        <span class="ios-time">{{ currentTime }}</span>
        <div class="ios-dynamic-island">
          <div class="camera-lens"></div>
        </div>
        <div class="ios-status-icons">
          <svg width="15" height="11" viewBox="0 0 18 12" fill="currentColor">
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

      <!-- Navigation Top Bar -->
      <div class="ios-nav-bar">
        <button class="glass-icon-btn" title="خروج" @click="$emit('logout')">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
            <polyline points="16 17 21 12 16 7"></polyline>
            <line x1="21" y1="12" x2="9" y2="12"></line>
          </svg>
        </button>

        <h1 class="ios-nav-title">{{ schoolName }}</h1>

        <div class="ios-nav-actions">
          <button class="glass-icon-btn" title="تنبيهات" @click="$emit('open-notifications')">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
              <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Floating Overlapping Hero Card -->
    <div class="ios-hero-card animate-fade-in">
      <div class="hero-card-header">
        <div class="hero-avatar-wrapper">
          <div class="hero-avatar">🏫</div>
          <span class="hero-status-dot"></span>
        </div>

        <div class="hero-info">
          <h2 class="hero-title">{{ studentName }}</h2>
          <p class="hero-subtitle">{{ gradeSection }}</p>
          <p class="hero-tag">{{ department }}</p>
        </div>
      </div>

      <!-- 3 Key Stats Counters (المواد الدراسية، الواجبات المعلقة، الامتحانات القادمة) -->
      <div class="hero-stats-row">
        <div class="stat-item">
          <div class="stat-icon-val">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#7c3aed" stroke-width="2.2">
              <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
              <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
            </svg>
            <span class="stat-val">{{ subjectsCount }}</span>
          </div>
          <span class="stat-lbl">المواد الدراسية</span>
        </div>

        <div class="stat-divider"></div>

        <div class="stat-item">
          <div class="stat-icon-val">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ea580c" stroke-width="2.2">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <polyline points="14 2 14 8 20 8"></polyline>
              <line x1="16" y1="13" x2="8" y2="13"></line>
              <line x1="16" y1="17" x2="8" y2="17"></line>
              <polyline points="10 9 9 9 8 9"></polyline>
            </svg>
            <span class="stat-val">{{ pendingHomeworksCount }}</span>
          </div>
          <span class="stat-lbl">الواجبات المعلقة</span>
        </div>

        <div class="stat-divider"></div>

        <div class="stat-item">
          <div class="stat-icon-val">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2563eb" stroke-width="2.2">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="16" y1="2" x2="16" y2="6"></line>
              <line x1="8" y1="2" x2="8" y2="6"></line>
              <line x1="3" y1="10" x2="21" y2="10"></line>
            </svg>
            <span class="stat-val">{{ upcomingExamsCount }}</span>
          </div>
          <span class="stat-lbl">الامتحانات القادمة</span>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import '@/assets/styles/student-design.css';

const props = defineProps({
  currentTime: { type: String, default: '9:41' },
  schoolName: { type: String, default: 'مدرسة النور الإعدادية' },
  studentName: { type: String, default: 'أحمد خالد المصراتي' },
  gradeSection: { type: String, default: 'الصف الخامس - الشعبة (أ5)' },
  department: { type: String, default: 'قسم المرحلة الإعدادية والنموذجية' },
  subjectsCount: { type: Number, default: 7 },
  pendingHomeworksCount: { type: Number, default: 4 },
  upcomingExamsCount: { type: Number, default: 1 }
});

const emit = defineEmits(['logout', 'open-notifications']);
</script>

<style scoped>
/* Importing student-design.css guarantees 100% design fidelity matching StudentDashboardView.vue */
</style>
