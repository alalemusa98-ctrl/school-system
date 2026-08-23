<template>
  <div class="student-app-root">
    <!-- Header (iOS Mobile App Architecture) -->
    <header class="ios-header">
      <!-- Gradient Top Header Banner -->
      <div class="ios-header-banner">
        <!-- Status Bar -->
        <div class="ios-status-bar">
          <span class="ios-time">9:41</span>
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
          <button class="glass-icon-btn" title="الرئيسية" @click="$router.push('/student')">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
          </button>

          <h1 class="ios-nav-title">{{ pageTitle || 'تفاصيل الطالب' }}</h1>

          <div class="ios-nav-actions">
            <button class="glass-icon-btn" title="تصفية">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
              </svg>
            </button>
          </div>
        </div>
      </div>

      <!-- Floating Overlapping Hero Card -->
      <div class="ios-hero-card">
        <div class="hero-card-header">
          <div class="hero-avatar-wrapper">
            <div class="hero-avatar">{{ pageEmoji || '📚' }}</div>
            <span class="hero-status-dot"></span>
          </div>

          <div class="hero-info">
            <h2 class="hero-title">{{ pageSubtitle || 'سجل الطالب المالي والأكاديمي' }}</h2>
            <p class="hero-subtitle">{{ studentGrade }} - الشعبة ({{ studentSection }})</p>
            <p class="hero-tag">الفصل الدراسي الأول 2026</p>
          </div>
        </div>
      </div>
    </header>

    <!-- Main Slot Content -->
    <main class="layout-body">
      <slot></slot>
    </main>

    <!-- Floating Dock Bottom Nav -->
    <MobileNav />
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import MobileNav from '../common/MobileNav.vue';

defineProps({
  pageTitle: { type: String, default: '' },
  pageSubtitle: { type: String, default: '' },
  pageEmoji: { type: String, default: '📚' }
});

const router = useRouter();

const userStr = localStorage.getItem('school_user');
const user = userStr ? JSON.parse(userStr) : {};

const studentGrade = computed(() => user.gradeName || 'الصف الثامن الإعدادي');
const studentSection = computed(() => user.sectionName || '8 أ');
</script>

<style scoped>
.layout-body {
  position: relative;
  z-index: 2;
}
</style>
