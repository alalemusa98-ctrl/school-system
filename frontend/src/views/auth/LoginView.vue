<template>
  <div class="login-wrapper">
    <!-- Radiant Dynamic Ambient Glow Orbs -->
    <div class="ambient-glow glow-top-right"></div>
    <div class="ambient-glow glow-bottom-left"></div>
    <div class="ambient-glow glow-center"></div>

    <div class="login-container animate-fade-in">
      <!-- Centered Wide & Compact Login Form Card -->
      <div class="login-card">
        <!-- Brand Header with 3D Icon -->
        <div class="brand-header">
          <div class="brand-3d-box">
            <img :src="schoolImg" alt="School Logo" class="brand-3d-img" />
          </div>
          <div class="brand-titles">
            <div class="system-badge">
              <span class="pulse-dot"></span>
              نظام الإدارة المدرسيّة المعتمد
            </div>
            <h1 class="brand-main-title">منظومة مدرستي الذكية</h1>
            <p class="brand-sub-title">بوابة تسجيل الدخول المركزية للطلاب وكادر التدريس والإدارة</p>
          </div>
        </div>

        <!-- Sleek 3D Segmented Role Switcher -->
        <div class="role-segmented-control" role="tablist">
          <button 
            type="button"
            role="tab"
            :aria-selected="activeRole === 'STUDENT'"
            class="role-tab" 
            :class="{ active: activeRole === 'STUDENT' }"
            @click="selectRole('STUDENT')"
          >
            <div class="tab-icon-wrap student-icon">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5"/></svg>
            </div>
            <span class="tab-label">الطالب</span>
          </button>

          <button 
            type="button"
            role="tab"
            :aria-selected="activeRole === 'TEACHER'"
            class="role-tab" 
            :class="{ active: activeRole === 'TEACHER' }"
            @click="selectRole('TEACHER')"
          >
            <div class="tab-icon-wrap teacher-icon">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            </div>
            <span class="tab-label">المعلم</span>
          </button>

          <button 
            type="button"
            role="tab"
            :aria-selected="activeRole === 'ADMIN'"
            class="role-tab" 
            :class="{ active: activeRole === 'ADMIN' }"
            @click="selectRole('ADMIN')"
          >
            <div class="tab-icon-wrap admin-icon">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
            </div>
            <span class="tab-label">الإدارة</span>
          </button>

          <button 
            type="button"
            role="tab"
            :aria-selected="activeRole === 'VIEWS_PREVIEW'"
            class="role-tab views-tab" 
            :class="{ active: activeRole === 'VIEWS_PREVIEW' }"
            @click="selectRole('VIEWS_PREVIEW')"
          >
            <div class="tab-icon-wrap views-icon">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
              </svg>
            </div>
            <span class="tab-label">تصاميم .vue</span>
          </button>
        </div>

        <!-- Views-API Component Explorer Section -->
        <div v-if="activeRole === 'VIEWS_PREVIEW'" class="views-preview-panel">
          <!-- Folder Pills -->
          <div class="api-folder-pills">
            <button 
              type="button" 
              class="api-pill" 
              :class="{ active: selectedApiFolder === 'homeworks' }"
              @click="selectedApiFolder = 'homeworks'; selectedApiComponent = 'HomeworkHeader'"
            >
              📚 الواجبات (`homeworks`)
            </button>
            <button 
              type="button" 
              class="api-pill" 
              :class="{ active: selectedApiFolder === 'dashboard' }"
              @click="selectedApiFolder = 'dashboard'; selectedApiComponent = 'DashboardHeader'"
            >
              🏠 الداشبورد (`dashboard`)
            </button>
            <button 
              type="button" 
              class="api-pill" 
              :class="{ active: selectedApiFolder === 'exams' }"
              @click="selectedApiFolder = 'exams'; selectedApiComponent = 'ExamHeader'"
            >
              📝 الامتحانات (`exams`)
            </button>
            <button 
              type="button" 
              class="api-pill" 
              :class="{ active: selectedApiFolder === 'schedule' }"
              @click="selectedApiFolder = 'schedule'; selectedApiComponent = 'ScheduleHeader'"
            >
              📅 الجدول (`schedule`)
            </button>
            <button 
              type="button" 
              class="api-pill" 
              :class="{ active: selectedApiFolder === 'subjects' }"
              @click="selectedApiFolder = 'subjects'; selectedApiComponent = 'SubjectHeader'"
            >
              📘 المواد (`subjects`)
            </button>
          </div>

          <!-- Component Sub-tabs -->
          <div class="api-component-tabs">
            <template v-if="selectedApiFolder === 'homeworks'">
              <button type="button" class="comp-btn" :class="{ active: selectedApiComponent === 'HomeworkHeader' }" @click="selectedApiComponent = 'HomeworkHeader'">HomeworkHeader.vue</button>
              <button type="button" class="comp-btn" :class="{ active: selectedApiComponent === 'HomeworkTabs' }" @click="selectedApiComponent = 'HomeworkTabs'">HomeworkTabs.vue</button>
              <button type="button" class="comp-btn" :class="{ active: selectedApiComponent === 'HomeworkList' }" @click="selectedApiComponent = 'HomeworkList'">HomeworkList.vue</button>
            </template>
            <template v-else-if="selectedApiFolder === 'dashboard'">
              <button type="button" class="comp-btn" :class="{ active: selectedApiComponent === 'DashboardHeader' }" @click="selectedApiComponent = 'DashboardHeader'">DashboardHeader.vue</button>
              <button type="button" class="comp-btn" :class="{ active: selectedApiComponent === 'DashboardDays' }" @click="selectedApiComponent = 'DashboardDays'">DashboardDays.vue</button>
              <button type="button" class="comp-btn" :class="{ active: selectedApiComponent === 'DashboardCards' }" @click="selectedApiComponent = 'DashboardCards'">DashboardCards.vue</button>
            </template>
            <template v-else-if="selectedApiFolder === 'exams'">
              <button type="button" class="comp-btn" :class="{ active: selectedApiComponent === 'ExamHeader' }" @click="selectedApiComponent = 'ExamHeader'">ExamHeader.vue</button>
              <button type="button" class="comp-btn" :class="{ active: selectedApiComponent === 'ExamTabs' }" @click="selectedApiComponent = 'ExamTabs'">ExamTabs.vue</button>
              <button type="button" class="comp-btn" :class="{ active: selectedApiComponent === 'ExamList' }" @click="selectedApiComponent = 'ExamList'">ExamList.vue</button>
            </template>
            <template v-else-if="selectedApiFolder === 'schedule'">
              <button type="button" class="comp-btn" :class="{ active: selectedApiComponent === 'ScheduleHeader' }" @click="selectedApiComponent = 'ScheduleHeader'">ScheduleHeader.vue</button>
              <button type="button" class="comp-btn" :class="{ active: selectedApiComponent === 'ScheduleTabs' }" @click="selectedApiComponent = 'ScheduleTabs'">ScheduleTabs.vue</button>
              <button type="button" class="comp-btn" :class="{ active: selectedApiComponent === 'ScheduleList' }" @click="selectedApiComponent = 'ScheduleList'">ScheduleList.vue</button>
            </template>
            <template v-else-if="selectedApiFolder === 'subjects'">
              <button type="button" class="comp-btn" :class="{ active: selectedApiComponent === 'SubjectHeader' }" @click="selectedApiComponent = 'SubjectHeader'">SubjectHeader.vue</button>
              <button type="button" class="comp-btn" :class="{ active: selectedApiComponent === 'SubjectTabs' }" @click="selectedApiComponent = 'SubjectTabs'">SubjectTabs.vue</button>
              <button type="button" class="comp-btn" :class="{ active: selectedApiComponent === 'SubjectList' }" @click="selectedApiComponent = 'SubjectList'">SubjectList.vue</button>
            </template>
          </div>

          <!-- Component File Info Banner -->
          <div class="file-path-badge">
            📂 مسار المكون في المشروع: <code>Views-api/student/{{ selectedApiFolder }}/{{ selectedApiComponent }}.vue</code>
          </div>

          <!-- Live Spec Preview Frame -->
          <div class="mobile-preview-frame">
            <component 
              :is="getComponentInstance(selectedApiComponent)" 
              :groupedCurrentHomeworks="mockHomeworks"
              :groupedExams="mockExams"
              :scheduleDays="mockSchedule"
              :subjectsList="mockSubjects"
              activeTab="current"
            />
          </div>
        </div>

        <!-- Student Login Form -->
        <form v-if="activeRole === 'STUDENT'" @submit.prevent="handleStudentLogin" class="auth-form">
          <div class="input-field-group">
            <label class="field-label">رقم الجلوس الأكاديمي</label>
            <div class="input-wrapper">
              <span class="input-prefix-icon">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#6366f1" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="16" rx="2"/><line x1="7" y1="8" x2="17" y2="8"/><line x1="7" y1="12" x2="13" y2="12"/></svg>
              </span>
              <input 
                type="text" 
                v-model="studentForm.roll_number" 
                placeholder="أدخل رقم الجلوس (مثال: 1001)" 
                required 
                autocomplete="username"
                class="modern-input"
              />
            </div>
          </div>

          <div class="input-field-group">
            <label class="field-label">كود التحقق الخاص بالطالب</label>
            <div class="input-wrapper">
              <span class="input-prefix-icon">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#6366f1" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
              </span>
              <input 
                :type="showPassword ? 'text' : 'password'" 
                v-model="studentForm.student_code" 
                placeholder="أدخل كود الطالب (مثال: ST1001)" 
                required 
                autocomplete="current-password"
                class="modern-input"
              />
              <button 
                type="button" 
                class="password-toggle-btn" 
                @click="showPassword = !showPassword"
                title="إظهار / إخفاء الرمز"
              >
                <svg v-if="!showPassword" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#64748b" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                <svg v-else width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#4f46e5" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
              </button>
            </div>
          </div>

          <!-- Quick Test Credentials Pill -->
          <div class="demo-credential-card" @click="fillDemo('STUDENT')">
            <div class="demo-card-content">
              <span class="demo-badge">⚡ تجربة سريعة:</span>
              <span class="demo-text">رقم الجلوس: <strong>1001</strong> | الكود: <strong>ST1001</strong></span>
            </div>
            <button type="button" class="demo-apply-btn">تعبئة فورية</button>
          </div>

          <button type="submit" class="submit-auth-btn" :disabled="loading">
            <span v-if="!loading" class="btn-inner">
              <span>تسجيل دخول الطالب</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
            </span>
            <span v-else class="btn-loader">
              <svg class="spinner" viewBox="0 0 50 50"><circle class="path" cx="25" cy="25" r="20" fill="none" stroke-width="5"></circle></svg>
              <span>جاري التحقق...</span>
            </span>
          </button>
        </form>

        <!-- Teacher / Admin Login Form -->
        <form v-else @submit.prevent="handleStaffLogin" class="auth-form">
          <div class="input-field-group">
            <label class="field-label">اسم المستخدم</label>
            <div class="input-wrapper">
              <span class="input-prefix-icon">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#6366f1" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
              </span>
              <input 
                type="text" 
                v-model="staffForm.username" 
                :placeholder="activeRole === 'TEACHER' ? 'أدخل اسم المعلم (مثال: teacher1)' : 'أدخل اسم المستخدم (مثال: admin)'" 
                required 
                autocomplete="username"
                class="modern-input"
              />
            </div>
          </div>

          <div class="input-field-group">
            <label class="field-label">كلمة المرور السرية</label>
            <div class="input-wrapper">
              <span class="input-prefix-icon">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#6366f1" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
              </span>
              <input 
                :type="showPassword ? 'text' : 'password'" 
                v-model="staffForm.password" 
                placeholder="••••••••" 
                required 
                autocomplete="current-password"
                class="modern-input"
              />
              <button 
                type="button" 
                class="password-toggle-btn" 
                @click="showPassword = !showPassword"
                title="إظهار / إخفاء كلمة المرور"
              >
                <svg v-if="!showPassword" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#64748b" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                <svg v-else width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#4f46e5" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
              </button>
            </div>
          </div>

          <!-- Quick Test Credentials Pill -->
          <div class="demo-credential-card" @click="fillDemo(activeRole)">
            <div class="demo-card-content">
              <span class="demo-badge">⚡ تجربة سريعة:</span>
              <span v-if="activeRole === 'TEACHER'" class="demo-text">المستخدم: <strong>teacher1</strong> | كلمة المرور: <strong>teacher123</strong></span>
              <span v-else class="demo-text">المستخدم: <strong>admin</strong> | كلمة المرور: <strong>admin123</strong></span>
            </div>
            <button type="button" class="demo-apply-btn">تعبئة فورية</button>
          </div>

          <button type="submit" class="submit-auth-btn" :disabled="loading">
            <span v-if="!loading" class="btn-inner">
              <span>{{ activeRole === 'TEACHER' ? 'تسجيل دخول كادر التدريس' : 'تسجيل دخول الإدارة العامة' }}</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
            </span>
            <span v-else class="btn-loader">
              <svg class="spinner" viewBox="0 0 50 50"><circle class="path" cx="25" cy="25" r="20" fill="none" stroke-width="5"></circle></svg>
              <span>جاري التحقق...</span>
            </span>
          </button>
        </form>

        <!-- Error Notification Banner -->
        <transition name="fade-slide">
          <div v-if="errorMsg" class="error-banner">
            <div class="error-icon-box">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#e11d48" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
            </div>
            <span class="error-text">{{ errorMsg }}</span>
          </div>
        </transition>

        <!-- Footer Credits -->
        <div class="login-footer">
          <span>نظام إدارة المدرسة الشامل © 2025/2026 - الإصدار 1.0 المعتمد</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import api from '../../services/api';
import schoolImg from '../../assets/school_building_3d.png';

// Import Views-api Student components
import HomeworkHeader from '@views-api/student/homeworks/HomeworkHeader.vue';
import HomeworkTabs from '@views-api/student/homeworks/HomeworkTabs.vue';
import HomeworkList from '@views-api/student/homeworks/HomeworkList.vue';

import DashboardHeader from '@views-api/student/dashboard/DashboardHeader.vue';
import DashboardDays from '@views-api/student/dashboard/DashboardDays.vue';
import DashboardCards from '@views-api/student/dashboard/DashboardCards.vue';

import ExamHeader from '@views-api/student/exams/ExamHeader.vue';
import ExamTabs from '@views-api/student/exams/ExamTabs.vue';
import ExamList from '@views-api/student/exams/ExamList.vue';

import ScheduleHeader from '@views-api/student/schedule/ScheduleHeader.vue';
import ScheduleTabs from '@views-api/student/schedule/ScheduleTabs.vue';
import ScheduleList from '@views-api/student/schedule/ScheduleList.vue';

import SubjectHeader from '@views-api/student/subjects/SubjectHeader.vue';
import SubjectTabs from '@views-api/student/subjects/SubjectTabs.vue';
import SubjectList from '@views-api/student/subjects/SubjectList.vue';

const router = useRouter();
const activeRole = ref('STUDENT');
const loading = ref(false);
const showPassword = ref(false);
const errorMsg = ref('');

const selectedApiFolder = ref('homeworks');
const selectedApiComponent = ref('HomeworkHeader');

const componentMap = {
  HomeworkHeader,
  HomeworkTabs,
  HomeworkList,
  DashboardHeader,
  DashboardDays,
  DashboardCards,
  ExamHeader,
  ExamTabs,
  ExamList,
  ScheduleHeader,
  ScheduleTabs,
  ScheduleList,
  SubjectHeader,
  SubjectTabs,
  SubjectList
};

function getComponentInstance(name) {
  return componentMap[name] || HomeworkHeader;
}

const mockHomeworks = ref([
  {
    dateKey: '2026-08-16',
    index: 1,
    dayName: 'الأحد',
    dateFormatted: '16 أغسطس 2026',
    homeworks: [
      { id: 1, subject_name: 'العلوم العامة', teacher_name: 'أ. فاطمة العبيدي', submitted: true, due_date: '16 أغسطس 2026', description: 'حل أسئلة الفصل الثالث من كتاب العلوم ص 45 إلى 48.' },
      { id: 2, subject_name: 'الرياضيات', teacher_name: 'أ. أحمد سالم', submitted: false, due_date: '16 أغسطس 2026', description: 'تمارين الهندسة وحساب المساحات في الصفحة 82.' }
    ]
  }
]);

const mockExams = ref([
  {
    dateKey: '2026-08-20',
    index: 1,
    dayName: 'الخميس',
    dateFormatted: '20 أغسطس 2026',
    exams: [
      { id: 1, subject_name: 'العلوم العامة', teacher_name: 'أ. فاطمة العبيدي', exam_time: '09:00 AM', room: 'قاعة 3', total_marks: 100 },
      { id: 2, subject_name: 'الرياضيات', teacher_name: 'أ. أحمد سالم', exam_time: '11:00 AM', room: 'قاعة 5', total_marks: 100 }
    ]
  }
]);

const mockSchedule = ref([
  {
    dayName: 'الأحد',
    periods: [
      { period_num: 1, subject_name: 'الرياضيات', teacher_name: 'أ. أحمد سالم', start_time: '08:00', end_time: '08:45' },
      { period_num: 2, subject_name: 'العلوم العامة', teacher_name: 'أ. فاطمة العبيدي', start_time: '08:50', end_time: '09:35' }
    ]
  }
]);

const mockSubjects = ref([
  { id: 1, name: 'الرياضيات', teacher_name: 'أ. أحمد سالم', icon: '📐', progress: 85 },
  { id: 2, name: 'العلوم العامة', teacher_name: 'أ. فاطمة العبيدي', icon: '🔬', progress: 90 },
  { id: 3, name: 'اللغة الإنجليزية', teacher_name: 'أ. سارة الحكيم', icon: '🔤', progress: 78 }
]);

const studentForm = reactive({
  roll_number: '1001',
  student_code: 'ST1001'
});

const staffForm = reactive({
  username: '',
  password: ''
});

function selectRole(role) {
  if (role === 'VIEWS_PREVIEW') {
    router.push('/design-preview');
    return;
  }

  activeRole.value = role;
  errorMsg.value = '';
  showPassword.value = false;

  if (role === 'STUDENT') {
    studentForm.roll_number = '1001';
    studentForm.student_code = 'ST1001';
  } else if (role === 'TEACHER') {
    staffForm.username = 'teacher1';
    staffForm.password = 'teacher123';
  } else if (role === 'ADMIN') {
    staffForm.username = 'admin';
    staffForm.password = 'admin123';
  }
}

function fillDemo(role) {
  if (role === 'STUDENT') {
    studentForm.roll_number = '1001';
    studentForm.student_code = 'ST1001';
  } else if (role === 'TEACHER') {
    staffForm.username = 'teacher1';
    staffForm.password = 'teacher123';
  } else if (role === 'ADMIN') {
    staffForm.username = 'admin';
    staffForm.password = 'admin123';
  }
}

async function handleStudentLogin() {
  loading.value = true;
  errorMsg.value = '';
  try {
    const res = await api.post('/auth/login/student', studentForm);
    if (res.data.success) {
      localStorage.setItem('school_token', res.data.token);
      localStorage.setItem('school_user', JSON.stringify(res.data.user));
      router.push('/student');
    }
  } catch (err) {
    errorMsg.value = err.response?.data?.message || 'فشل تسجيل دخول الطالب. يرجى التأكد من صحة رقم الجلوس والكود.';
  } finally {
    loading.value = false;
  }
}

async function handleStaffLogin() {
  loading.value = true;
  errorMsg.value = '';
  const endpoint = activeRole.value === 'TEACHER' ? '/auth/login/teacher' : '/auth/login/admin';
  try {
    const res = await api.post(endpoint, staffForm);
    if (res.data.success) {
      localStorage.setItem('school_token', res.data.token);
      localStorage.setItem('school_user', JSON.stringify(res.data.user));
      if (activeRole.value === 'TEACHER') {
        router.push('/teacher');
      } else {
        router.push('/admin');
      }
    }
  } catch (err) {
    errorMsg.value = err.response?.data?.message || 'اسم المستخدم أو كلمة المرور غير صحيحة.';
  } finally {
    loading.value = false;
  }
}
</script>

<style scoped>
/* ===== LIVELY & BRIGHT MODERN APPLE/SAAS LOGIN STYLES ===== */
.login-wrapper {
  min-height: 100vh;
  width: 100%;
  background: linear-gradient(135deg, #f0f4ff 0%, #eef2ff 50%, #fdf4ff 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px 16px;
  position: relative;
  overflow: hidden;
  direction: rtl;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Arabic", sans-serif;
  -webkit-font-smoothing: antialiased;
}

/* Radiant Ambient glowing mesh orbs */
.ambient-glow {
  position: absolute;
  border-radius: 50%;
  filter: blur(100px);
  opacity: 0.65;
  pointer-events: none;
  z-index: 1;
}

.glow-top-right {
  top: -12%;
  right: -8%;
  width: 580px;
  height: 580px;
  background: radial-gradient(circle, rgba(99, 102, 241, 0.38) 0%, rgba(199, 210, 254, 0.28) 50%, rgba(240, 244, 255, 0) 70%);
}

.glow-bottom-left {
  bottom: -15%;
  left: -10%;
  width: 620px;
  height: 620px;
  background: radial-gradient(circle, rgba(244, 114, 182, 0.28) 0%, rgba(192, 132, 252, 0.22) 45%, rgba(240, 244, 255, 0) 70%);
}

.glow-center {
  top: 30%;
  left: 40%;
  width: 500px;
  height: 500px;
  background: radial-gradient(circle, rgba(56, 189, 248, 0.3) 0%, rgba(147, 197, 253, 0.15) 50%, rgba(240, 244, 255, 0) 70%);
}

/* Centered Layout Container */
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 580px;
  width: 100%;
  position: relative;
  z-index: 10;
}

/* Single Wide & Compact Form Card */
.login-card {
  width: 100%;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 26px;
  padding: 30px 36px;
  box-shadow: 0 20px 50px rgba(79, 70, 229, 0.12), 0 4px 16px rgba(15, 23, 42, 0.04);
  border: 1.5px solid rgba(255, 255, 255, 0.95);
  display: flex;
  flex-direction: column;
  backdrop-filter: blur(28px);
}

@media (max-width: 640px) {
  .login-card {
    padding: 24px 20px;
    border-radius: 20px;
  }
}

.brand-header {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 18px;
}

.brand-3d-box {
  width: 54px;
  height: 54px;
  border-radius: 16px;
  background: linear-gradient(135deg, #eef2ff 0%, #e0e7ff 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 6px 18px rgba(79, 70, 229, 0.2);
  flex-shrink: 0;
  border: 1.5px solid #c7d2fe;
}

.brand-3d-img {
  width: 42px;
  height: 42px;
  object-fit: contain;
}

.brand-titles {
  display: flex;
  flex-direction: column;
}

.system-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: #eef2ff;
  color: #4f46e5;
  font-size: 11px;
  font-weight: 800;
  padding: 2px 9px;
  border-radius: 20px;
  width: fit-content;
  margin-bottom: 4px;
  border: 1px solid #c7d2fe;
}

.pulse-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #4f46e5;
  box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.25);
}

.brand-main-title {
  font-size: 20px;
  font-weight: 900;
  color: #0f172a;
  margin: 0;
  letter-spacing: -0.02em;
}

.brand-sub-title {
  font-size: 12px;
  color: #64748b;
  margin: 1px 0 0 0;
  font-weight: 600;
}

/* Role Segmented Controller */
.role-segmented-control {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  background: #f1f5f9;
  padding: 4px;
  border-radius: 16px;
  gap: 6px;
  margin-bottom: 18px;
  border: 1px solid #e2e8f0;
}

.role-tab {
  border: none;
  background: transparent;
  padding: 8px 8px;
  border-radius: 12px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 7px;
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
  color: #64748b;
  font-family: inherit;
  font-size: 13.5px;
  font-weight: 700;
}

.role-tab:hover {
  color: #0f172a;
  background: rgba(255, 255, 255, 0.6);
}

.role-tab.active {
  background: #ffffff;
  color: #4f46e5;
  box-shadow: 0 3px 10px rgba(79, 70, 229, 0.12), 0 1px 2px rgba(15, 23, 42, 0.04);
}

.tab-icon-wrap {
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.2s ease;
}

.role-tab.active .tab-icon-wrap {
  transform: scale(1.1);
}

/* Form Styles */
.auth-form {
  display: flex;
  flex-direction: column;
  gap: 13px;
}

.input-field-group {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.field-label {
  font-size: 12.5px;
  font-weight: 800;
  color: #1e293b;
}

.input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.input-prefix-icon {
  position: absolute;
  right: 13px;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
}

.modern-input {
  width: 100%;
  padding: 10.5px 38px 10.5px 38px;
  border-radius: 13px;
  background: #ffffff;
  border: 1.5px solid #cbd5e1;
  font-family: inherit;
  font-size: 13.5px;
  font-weight: 600;
  color: #0f172a;
  outline: none;
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
  box-shadow: 0 1px 3px rgba(15, 23, 42, 0.02);
}

.modern-input:focus {
  border-color: #6366f1;
  box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.14);
}

.password-toggle-btn {
  position: absolute;
  left: 11px;
  background: transparent;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px;
  color: #64748b;
  border-radius: 6px;
  transition: opacity 0.15s ease;
}

.password-toggle-btn:hover {
  opacity: 0.8;
}

/* Demo Credential Quick Box */
.demo-credential-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #f8fafc;
  border: 1.5px dashed #c7d2fe;
  border-radius: 13px;
  padding: 8px 12px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.demo-credential-card:hover {
  background: #eef2ff;
  border-color: #818cf8;
  transform: translateY(-1px);
  box-shadow: 0 3px 10px rgba(99, 102, 241, 0.1);
}

.demo-card-content {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}

.demo-badge {
  font-size: 11px;
  font-weight: 800;
  color: #4f46e5;
}

.demo-text {
  font-size: 11.5px;
  color: #475569;
}

.demo-apply-btn {
  background: #4f46e5;
  border: none;
  color: #ffffff;
  font-family: inherit;
  font-size: 11px;
  font-weight: 800;
  padding: 4px 10px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.15s ease;
  box-shadow: 0 2px 6px rgba(79, 70, 229, 0.25);
  flex-shrink: 0;
}

.demo-credential-card:hover .demo-apply-btn {
  background: #4338ca;
  transform: scale(1.03);
}

/* Submit Action Button */
.submit-auth-btn {
  margin-top: 4px;
  width: 100%;
  background: linear-gradient(135deg, #4f46e5 0%, #6366f1 100%);
  color: #ffffff;
  border: none;
  padding: 12.5px 18px;
  border-radius: 14px;
  font-family: inherit;
  font-size: 14.5px;
  font-weight: 800;
  cursor: pointer;
  box-shadow: 0 6px 20px rgba(79, 70, 229, 0.32);
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
  display: flex;
  align-items: center;
  justify-content: center;
}

.submit-auth-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 10px 24px rgba(79, 70, 229, 0.42);
  background: linear-gradient(135deg, #4338ca 0%, #4f46e5 100%);
}

.submit-auth-btn:active:not(:disabled) {
  transform: translateY(0);
}

.submit-auth-btn:disabled {
  opacity: 0.75;
  cursor: not-allowed;
}

.btn-inner {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 9px;
}

.btn-loader {
  display: flex;
  align-items: center;
  gap: 9px;
}

.spinner {
  animation: rotate 1.8s linear infinite;
  width: 18px;
  height: 18px;
}

.spinner .path {
  stroke: #ffffff;
  stroke-linecap: round;
  animation: dash 1.4s ease-in-out infinite;
}

@keyframes rotate {
  100% { transform: rotate(360deg); }
}

@keyframes dash {
  0% { stroke-dasharray: 1, 150; stroke-dashoffset: 0; }
  50% { stroke-dasharray: 90, 150; stroke-dashoffset: -35; }
  100% { stroke-dasharray: 90, 150; stroke-dashoffset: -124; }
}

/* Error Banner */
.error-banner {
  margin-top: 14px;
  background: #fff1f2;
  border: 1px solid #ffe4e6;
  border-radius: 12px;
  padding: 9px 12px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.error-icon-box {
  flex-shrink: 0;
  display: flex;
}

.error-text {
  font-size: 11.5px;
  font-weight: 700;
  color: #be123c;
}

/* Footer */
.login-footer {
  margin-top: 18px;
  text-align: center;
  font-size: 11px;
  color: #94a3b8;
  font-weight: 600;
}

/* Animations */
.animate-fade-in {
  animation: fadeIn 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px) scale(0.99);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.22s ease;
}

.fade-slide-enter-from,
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}

/* ===== Views API Component Explorer Styles ===== */
.views-icon {
  background: rgba(168, 85, 247, 0.12);
  color: #a855f7;
}

.role-tab.active .views-icon {
  background: rgba(255, 255, 255, 0.25);
  color: #ffffff;
}

.views-preview-panel {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 14px;
}

.api-folder-pills {
  display: flex;
  gap: 6px;
  overflow-x: auto;
  padding-bottom: 4px;
  scroll-behavior: smooth;
}

.api-folder-pills::-webkit-scrollbar {
  display: none;
}

.api-pill {
  padding: 6px 12px;
  border-radius: 12px;
  border: 1.5px solid #e2e8f0;
  background: #ffffff;
  color: #475569;
  font-size: 11.5px;
  font-weight: 700;
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.2s ease;
  flex-shrink: 0;
}

.api-pill.active {
  background: linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%);
  color: #ffffff;
  border-color: transparent;
  box-shadow: 0 4px 12px rgba(139, 92, 246, 0.3);
}

.api-component-tabs {
  display: flex;
  gap: 4px;
  background: #f1f5f9;
  padding: 4px;
  border-radius: 14px;
}

.comp-btn {
  flex: 1;
  padding: 7px 8px;
  border-radius: 10px;
  border: none;
  background: transparent;
  color: #64748b;
  font-size: 11px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s ease;
  font-family: monospace;
}

.comp-btn.active {
  background: #ffffff;
  color: #6d28d9;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}

.file-path-badge {
  font-size: 11.5px;
  color: #475569;
  background: #f8fafc;
  padding: 8px 12px;
  border-radius: 10px;
  border: 1px dashed #cbd5e1;
  text-align: center;
  direction: ltr;
}

.file-path-badge code {
  color: #6d28d9;
  font-weight: 700;
}

.mobile-preview-frame {
  max-height: 480px;
  overflow-y: auto;
  border-radius: 20px;
  border: 1px solid #e2e8f0;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  background: #f8fafc;
}
</style>
