<template>
  <nav class="bottom-nav">
    <!-- 1. الرئيسية -->
    <button 
      class="nav-item" 
      :class="{ active: currentRoute === homePath }"
      @click="$router.push(homePath)"
    >
      <div class="icon">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
          <polyline points="9 22 9 12 15 12 15 22"></polyline>
        </svg>
      </div>
      <span class="nav-text">الرئيسية</span>
    </button>

    <!-- 2. الفصول / المواد -->
    <button 
      class="nav-item" 
      :class="{ active: currentRoute === subjectsPath }"
      @click="$router.push(subjectsPath)"
    >
      <div class="icon">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
          <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
        </svg>
      </div>
      <span class="nav-text">{{ isTeacher ? 'الفصول' : 'المواد' }}</span>
    </button>

    <!-- 3. الجدول -->
    <button 
      class="nav-item" 
      :class="{ active: currentRoute === schedulePath }"
      @click="$router.push(schedulePath)"
    >
      <div class="icon">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
          <line x1="16" y1="2" x2="16" y2="6"></line>
          <line x1="8" y1="2" x2="8" y2="6"></line>
          <line x1="3" y1="10" x2="21" y2="10"></line>
        </svg>
      </div>
      <span class="nav-text">الجدول</span>
    </button>

    <!-- 4. الواجبات -->
    <button 
      class="nav-item" 
      :class="{ active: currentRoute === homeworksPath }"
      @click="$router.push(homeworksPath)"
    >
      <div class="icon">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
          <polyline points="14 2 14 8 20 8"></polyline>
          <line x1="16" y1="13" x2="8" y2="13"></line>
          <line x1="16" y1="17" x2="8" y2="17"></line>
          <polyline points="10 9 9 9 8 9"></polyline>
        </svg>
      </div>
      <span class="nav-text">الواجبات</span>
    </button>

    <!-- 5. الامتحانات -->
    <button 
      class="nav-item" 
      :class="{ active: currentRoute === examsPath }"
      @click="$router.push(examsPath)"
    >
      <div class="icon">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
        </svg>
      </div>
      <span class="nav-text">الامتحانات</span>
    </button>
  </nav>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const currentRoute = computed(() => route.path);

const isTeacher = computed(() => {
  const userStr = localStorage.getItem('school_user');
  const user = userStr ? JSON.parse(userStr) : {};
  return route.path.startsWith('/teacher') || user.role === 'TEACHER';
});

const homePath = computed(() => isTeacher.value ? '/teacher' : '/student');
const subjectsPath = computed(() => isTeacher.value ? '/teacher/subjects' : '/student/subjects');
const schedulePath = computed(() => isTeacher.value ? '/teacher/schedule' : '/student/schedule');
const homeworksPath = computed(() => isTeacher.value ? '/teacher/homeworks' : '/student/homeworks');
const examsPath = computed(() => isTeacher.value ? '/teacher/exams' : '/student/exams');
</script>
