<template>
  <header class="exam-header-wrapper">
    <!-- iOS Status Bar & Dynamic Island Overlay -->
    <div class="ios-status-bar">
      <span class="ios-time">9:41</span>
      <div class="dynamic-island"></div>
      <div class="ios-icons">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M2 20h20L12 4z"></path>
        </svg>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M5 12.55a11 11 0 0 1 14.08 0"></path>
          <path d="M1.42 9a16 16 0 0 1 21.16 0"></path>
          <path d="M8.53 16.11a6 6 0 0 1 6.95 0"></path>
          <line x1="12" y1="20" x2="12.01" y2="20"></line>
        </svg>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <rect x="2" y="7" width="16" height="10" rx="2" ry="2"></rect>
          <line x1="22" y1="11" x2="22" y2="13"></line>
        </svg>
      </div>
    </div>

    <!-- Top Navigation Bar -->
    <div class="exam-nav-bar">
      <button class="nav-icon-btn filter-btn" @click="$emit('open-filter')" title="تصفية الفلاتر">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
          <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
        </svg>
      </button>

      <h1 class="exam-page-title">{{ title }}</h1>

      <button class="nav-icon-btn back-btn" @click="handleBack" title="الرجوع">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
          <line x1="19" y1="12" x2="5" y2="12"></line>
          <polyline points="12 19 5 12 12 5"></polyline>
        </svg>
      </button>
    </div>

    <!-- Main Exam Hero Card -->
    <div class="exam-hero-card">
      <div class="hero-text-content">
        <h2 class="hero-main-title">{{ subtitle }}</h2>
        <div class="hero-class-badge">{{ gradeSection }}</div>
        <span class="hero-term-text">{{ semesterInfo }}</span>
      </div>

      <div class="hero-illustration-wrapper">
        <div class="hero-3d-box">
          <span class="hero-emoji-icon">📝</span>
          <span class="status-indicator-dot"></span>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { useRouter } from 'vue-router';

const props = defineProps({
  title: {
    type: String,
    default: 'جدول الامتحانات'
  },
  subtitle: {
    type: String,
    default: 'مواعيد الاختبارات والحلول الاسترشادية'
  },
  gradeSection: {
    type: String,
    default: 'الصف الخامس - الشعبة (أ5)'
  },
  semesterInfo: {
    type: String,
    default: 'الفصل الدراسي الأول 2026'
  }
});

const emit = defineEmits(['back', 'open-filter']);
const router = useRouter();

function handleBack() {
  emit('back');
  if (window.history.length > 1) {
    router.back();
  } else {
    router.push('/student/dashboard');
  }
}
</script>

<style scoped>
.exam-header-wrapper {
  background: linear-gradient(135deg, #e11d48 0%, #be123c 50%, #9f1239 100%);
  padding: 12px 16px 24px;
  border-radius: 0 0 28px 28px;
  color: #ffffff;
  position: relative;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(225, 29, 72, 0.25);
}

.ios-status-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 13px;
  font-weight: 600;
  margin-bottom: 12px;
  opacity: 0.9;
}

.dynamic-island {
  width: 90px;
  height: 22px;
  background-color: #000000;
  border-radius: 14px;
}

.ios-icons {
  display: flex;
  gap: 6px;
  align-items: center;
}

.exam-nav-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
}

.exam-page-title {
  font-size: 20px;
  font-weight: 800;
  margin: 0;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.15);
}

.nav-icon-btn {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
}

.nav-icon-btn:hover {
  background: rgba(255, 255, 255, 0.35);
  transform: scale(1.05);
}

.exam-hero-card {
  background: #ffffff;
  border-radius: 24px;
  padding: 20px 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #1e293b;
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.08);
  position: relative;
  z-index: 2;
}

.hero-text-content {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.hero-main-title {
  font-size: 17px;
  font-weight: 800;
  color: #0f172a;
  margin: 0;
  line-height: 1.3;
}

.hero-class-badge {
  font-size: 13px;
  font-weight: 700;
  color: #e11d48;
  background: rgba(225, 29, 72, 0.08);
  padding: 4px 10px;
  border-radius: 12px;
  width: fit-content;
}

.hero-term-text {
  font-size: 12px;
  color: #64748b;
  font-weight: 500;
}

.hero-illustration-wrapper {
  position: relative;
}

.hero-3d-box {
  width: 64px;
  height: 64px;
  background: linear-gradient(135deg, #ffe4e6 0%, #fecdd3 100%);
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32px;
  box-shadow: inset 0 2px 4px rgba(255, 255, 255, 0.8), 0 8px 16px rgba(225, 29, 72, 0.15);
  position: relative;
}

.status-indicator-dot {
  width: 12px;
  height: 12px;
  background-color: #22c55e;
  border: 2px solid #ffffff;
  border-radius: 50%;
  position: absolute;
  bottom: -2px;
  left: -2px;
  box-shadow: 0 0 8px rgba(34, 197, 94, 0.6);
}
</style>
