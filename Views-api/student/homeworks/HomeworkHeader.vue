<template>
  <header class="ios-header">
    <!-- Gradient Top Header Banner with Purple Wallpaper -->
    <div class="ios-header-banner">
      <!-- iOS Status Bar Overlay -->
      <div class="ios-status-bar">
        <!-- Right: Time -->
        <span class="ios-time">9:41</span>
        
        <!-- Center: Dynamic Island -->
        <div class="dynamic-island">
          <span class="camera-lens"></span>
        </div>

        <!-- Left: Icons (Signal, Wifi, Battery) -->
        <div class="ios-icons">
          <svg width="18" height="11" viewBox="0 0 18 12" fill="currentColor">
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

      <!-- Top Navigation Bar -->
      <div class="hw-nav-bar">
        <!-- Right: Back Button -->
        <button class="nav-icon-btn back-btn" @click="handleBack" title="الرجوع">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
        </button>

        <!-- Center: Title -->
        <h1 class="hw-page-title">{{ title }}</h1>

        <!-- Left: Filter Button -->
        <button class="nav-icon-btn filter-btn" @click="$emit('open-filter')" title="تصفية الفلاتر">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
            <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
          </svg>
        </button>
      </div>
    </div>

    <!-- Floating Overlapping Hero Card (Floating style with negative top margin) -->
    <div class="ios-hero-card animate-fade-in">
      <div class="hero-text-content">
        <h2 class="hero-main-title">{{ subtitle }}</h2>
        <div class="hero-class-badge">{{ gradeSection }}</div>
        <span class="hero-term-text">{{ semesterInfo }}</span>
      </div>

      <div class="hero-illustration-wrapper">
        <div class="hero-3d-box">
          <img :src="homeworkImg || '/images/homework_assignments_3d.png'" class="books-3d-img" alt="كتب 3D" />
          <span class="status-indicator-dot"></span>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { useRouter } from 'vue-router';
import homeworkImg from '@/assets/homework_assignments_3d.png';

const props = defineProps({
  title: {
    type: String,
    default: 'تفاصيل الواجبات'
  },
  subtitle: {
    type: String,
    default: 'متابعة الواجبات والحلول النموذجية'
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
.ios-header {
  position: relative;
  margin-bottom: 24px;
}

.ios-header-banner {
  background: linear-gradient(180deg, rgba(109, 40, 217, 0.78) 0%, rgba(91, 33, 182, 0.92) 100%), url('/images/student_bg.jpg') center center / cover no-repeat;
  padding: 12px 18px 75px;
  border-radius: 0 0 36px 36px;
  color: #ffffff;
  box-shadow: 0 12px 32px rgba(91, 33, 182, 0.3);
  position: relative;
}

.ios-status-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 13px;
  font-weight: 700;
  margin-bottom: 14px;
  opacity: 0.95;
}

.dynamic-island {
  width: 90px;
  height: 20px;
  background-color: #0f172a;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 0 8px;
}

.camera-lens {
  width: 6px;
  height: 6px;
  background: #1e293b;
  border-radius: 50%;
  border: 1px solid #334155;
}

.ios-icons {
  display: flex;
  gap: 6px;
  align-items: center;
}

.hw-nav-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 22px;
}

.hw-page-title {
  font-size: 20px;
  font-weight: 800;
  margin: 0;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);
  color: #ffffff;
  letter-spacing: -0.2px;
}

.nav-icon-btn {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.35);
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

/* Floating Overlapping Hero Card */
.ios-hero-card {
  position: relative;
  margin: -55px 16px 0;
  background: #ffffff;
  border-radius: 28px;
  padding: 20px 22px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #1e293b;
  box-shadow: 0 20px 45px -10px rgba(91, 33, 182, 0.22), 0 4px 16px rgba(0, 0, 0, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.9);
  z-index: 10;
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
  letter-spacing: -0.2px;
}

.hero-class-badge {
  font-size: 13px;
  font-weight: 700;
  color: #5b21b6;
  background: #ede9fe;
  padding: 4px 12px;
  border-radius: 12px;
  width: fit-content;
}

.hero-term-text {
  font-size: 12px;
  color: #64748b;
  font-weight: 600;
}

.hero-illustration-wrapper {
  position: relative;
  flex-shrink: 0;
}

.hero-3d-box {
  width: 72px;
  height: 72px;
  background: linear-gradient(135deg, #ede9fe 0%, #ddd6fe 100%);
  border-radius: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  box-shadow: inset 0 2px 4px rgba(255, 255, 255, 0.8), 0 8px 18px rgba(109, 40, 217, 0.18);
  border: 2.5px solid #ffffff;
  padding: 4px;
}

.books-3d-img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  filter: drop-shadow(0 4px 10px rgba(91, 33, 182, 0.25));
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
