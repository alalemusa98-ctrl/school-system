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
        <button class="glass-icon-btn" title="تسجيل الخروج" @click="$emit('logout')">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
            <polyline points="16 17 21 12 16 7"></polyline>
            <line x1="21" y1="12" x2="9" y2="12"></line>
          </svg>
        </button>

        <h1 class="ios-nav-title">{{ schoolName }}</h1>

        <div class="ios-nav-actions">
          <button class="glass-icon-btn" title="التنبيهات" @click="$emit('open-notifications')">
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
          <div class="hero-avatar">👨‍🏫</div>
          <span class="hero-status-dot"></span>
        </div>

        <div class="hero-info">
          <h2 class="hero-title">{{ teacherName }}</h2>
          <p class="hero-subtitle">{{ subjectSpecialty }} • {{ department }}</p>
          <p class="hero-tag">{{ assignedSectionsText }}</p>
        </div>
      </div>

      <!-- 3 Key Stats Counters (الفصول المسندة، الواجبات النشطة، الامتحانات المجدولة) -->
      <div class="hero-stats-row">
        <div class="stat-item" @click="navigateTo('/teacher/subjects')">
          <div class="stat-icon-val">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#7c3aed" stroke-width="2.2">
              <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
              <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
            </svg>
            <span class="stat-val">{{ assignedSectionsCount }}</span>
          </div>
          <span class="stat-lbl">الفصول والشعب</span>
        </div>

        <div class="stat-divider"></div>

        <div class="stat-item" @click="navigateTo('/teacher/homeworks')">
          <div class="stat-icon-val">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ea580c" stroke-width="2.2">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <polyline points="14 2 14 8 20 8"></polyline>
              <line x1="16" y1="13" x2="8" y2="13"></line>
              <line x1="16" y1="17" x2="8" y2="17"></line>
            </svg>
            <span class="stat-val">{{ activeHomeworksCount }}</span>
          </div>
          <span class="stat-lbl">الواجبات النشطة</span>
        </div>

        <div class="stat-divider"></div>

        <div class="stat-item" @click="navigateTo('/teacher/exams')">
          <div class="stat-icon-val">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2563eb" stroke-width="2.2">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="16" y1="2" x2="16" y2="6"></line>
              <line x1="8" y1="2" x2="8" y2="6"></line>
              <line x1="3" y1="10" x2="21" y2="10"></line>
            </svg>
            <span class="stat-val">{{ scheduledExamsCount }}</span>
          </div>
          <span class="stat-lbl">الامتحانات</span>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { useRouter } from 'vue-router';

const props = defineProps({
  currentTime: { type: String, default: '9:41' },
  schoolName: { type: String, default: 'مدرسة النور الإعدادية' },
  teacherName: { type: String, default: 'أ. أحمد سالم' },
  subjectSpecialty: { type: String, default: 'معلم الرياضيات' },
  department: { type: String, default: 'المرحلة الإعدادية' },
  assignedSectionsText: { type: String, default: 'الفصول المسندة: 5أ ، 5ب ، 6أ' },
  assignedSectionsCount: { type: Number, default: 3 },
  activeHomeworksCount: { type: Number, default: 8 },
  scheduledExamsCount: { type: Number, default: 3 }
});

const emit = defineEmits(['logout', 'open-notifications']);

let router = null;
try {
  router = useRouter();
} catch (e) {}

function navigateTo(path) {
  if (router) router.push(path);
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

.ios-dynamic-island {
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

.ios-status-icons {
  display: flex;
  gap: 6px;
  align-items: center;
}

.ios-nav-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 22px;
}

.ios-nav-title {
  font-size: 19px;
  font-weight: 800;
  margin: 0;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);
  color: #ffffff;
  letter-spacing: -0.2px;
}

.glass-icon-btn {
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

.glass-icon-btn:hover {
  background: rgba(255, 255, 255, 0.35);
  transform: scale(1.05);
}

.ios-hero-card {
  position: relative;
  margin: -55px 16px 0;
  background: #ffffff;
  border-radius: 28px;
  padding: 20px 22px 18px;
  box-shadow: 0 20px 45px -10px rgba(91, 33, 182, 0.22), 0 4px 16px rgba(0, 0, 0, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.9);
  z-index: 10;
}

.hero-card-header {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 16px;
}

.hero-avatar-wrapper {
  position: relative;
}

.hero-avatar {
  width: 58px;
  height: 58px;
  background: linear-gradient(135deg, #ede9fe 0%, #ddd6fe 100%);
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
  box-shadow: inset 0 2px 4px rgba(255, 255, 255, 0.8), 0 8px 16px rgba(109, 40, 217, 0.15);
  border: 2px solid #ffffff;
}

.hero-status-dot {
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

.hero-info {
  display: flex;
  flex-direction: column;
  gap: 3px;
}

.hero-title {
  font-size: 18px;
  font-weight: 800;
  color: #0f172a;
  margin: 0;
  letter-spacing: -0.2px;
}

.hero-subtitle {
  font-size: 12.5px;
  color: #64748b;
  font-weight: 600;
  margin: 0;
}

.hero-tag {
  font-size: 11.5px;
  font-weight: 700;
  color: #7c3aed;
  background: #ede9fe;
  padding: 2px 10px;
  border-radius: 10px;
  width: fit-content;
  margin: 2px 0 0;
}

.hero-stats-row {
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding-top: 14px;
  border-top: 1px solid #f1f5f9;
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3px;
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 12px;
  transition: all 0.2s ease;
}

.stat-item:hover {
  background: #f8fafc;
  transform: translateY(-2px);
}

.stat-icon-val {
  display: flex;
  align-items: center;
  gap: 6px;
}

.stat-val {
  font-size: 17px;
  font-weight: 900;
  color: #0f172a;
}

.stat-lbl {
  font-size: 11px;
  color: #64748b;
  font-weight: 700;
}

.stat-divider {
  width: 1px;
  height: 28px;
  background: #e2e8f0;
}
</style>
