<template>
  <header class="app-navbar">
    <div class="navbar-container container">
      <div class="brand" @click="goHome">
        <div class="brand-icon">🏫</div>
        <div class="brand-text">
          <span class="brand-title">مدرستي الذهبية</span>
          <span class="brand-subtitle">نظام التعلم الذكي</span>
        </div>
      </div>

      <div class="user-section" v-if="user">
        <div class="user-info">
          <span class="user-name">👋 {{ user.fullName }}</span>
          <span class="user-role-badge" :class="user.role.toLowerCase()">
            {{ roleText }}
          </span>
        </div>
        <BaseButton variant="ghost" size="sm" @click="handleLogout">
          خروج 🚪
        </BaseButton>
      </div>
    </div>
  </header>
</template>

<script setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import BaseButton from './BaseButton.vue';

const router = useRouter();
const userStr = localStorage.getItem('school_user');
const user = userStr ? JSON.parse(userStr) : null;

const roleText = computed(() => {
  if (!user) return '';
  if (user.role === 'STUDENT') return `${user.gradeName} (${user.sectionName})`;
  if (user.role === 'TEACHER') return 'معلم مادة';
  if (user.role === 'ADMIN') return 'الإدارة المدرسة';
  return user.role;
});

function goHome() {
  if (!user) {
    router.push('/login');
    return;
  }
  if (user.role === 'STUDENT') router.push('/student');
  else if (user.role === 'TEACHER') router.push('/teacher');
  else if (user.role === 'ADMIN') router.push('/admin');
}

function handleLogout() {
  localStorage.removeItem('school_token');
  localStorage.removeItem('school_user');
  router.push('/login');
}
</script>

<style scoped>
.app-navbar {
  background: #ffffff;
  border-bottom: 2px solid var(--border-light);
  box-shadow: var(--shadow-sm);
  position: sticky;
  top: 0;
  z-index: 100;
}

.navbar-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 12px;
  padding-bottom: 12px;
}

.brand {
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
}

.brand-icon {
  font-size: 2rem;
  background: #eef2ff;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-md);
}

.brand-text {
  display: flex;
  flex-direction: column;
}

.brand-title {
  font-size: 1.25rem;
  font-weight: 800;
  color: var(--primary-color);
}

.brand-subtitle {
  font-size: 0.75rem;
  color: var(--text-muted);
}

.user-section {
  display: flex;
  align-items: center;
  gap: 16px;
}

.user-info {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.user-name {
  font-weight: 700;
  font-size: 0.95rem;
  color: var(--text-main);
}

.user-role-badge {
  font-size: 0.75rem;
  padding: 2px 8px;
  border-radius: 12px;
  background: #f1f5f9;
  color: var(--text-muted);
  font-weight: 600;
}

.user-role-badge.student {
  background: #e0f2fe;
  color: #0369a1;
}

.user-role-badge.teacher {
  background: #fef3c7;
  color: #92400e;
}

.user-role-badge.admin {
  background: #fce7f3;
  color: #9d174d;
}
</style>
