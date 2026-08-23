<template>
  <div class="login-page">
    <div class="login-card-wrapper animate-fade-in">
      <div class="login-header">
        <div class="app-logo">🏫</div>
        <h2>مدرستي الذهبية</h2>
        <p>نظام إدارة المدرسة المرتكز على الطالب</p>
      </div>

      <!-- Role Selector Cards -->
      <div class="role-selector">
        <div 
          class="role-card" 
          :class="{ active: activeRole === 'STUDENT' }"
          @click="selectRole('STUDENT')"
        >
          <span class="role-icon">🎒</span>
          <span class="role-label">دخول الطالب</span>
        </div>
        <div 
          class="role-card" 
          :class="{ active: activeRole === 'TEACHER' }"
          @click="selectRole('TEACHER')"
        >
          <span class="role-icon">👨‍🏫</span>
          <span class="role-label">دخول المعلم</span>
        </div>
        <div 
          class="role-card" 
          :class="{ active: activeRole === 'ADMIN' }"
          @click="selectRole('ADMIN')"
        >
          <span class="role-icon">⚙️</span>
          <span class="role-label">دخول الإدارة</span>
        </div>
      </div>

      <!-- Student Login Form -->
      <form v-if="activeRole === 'STUDENT'" @submit.prevent="handleStudentLogin" class="login-form">
        <div class="form-group">
          <label>رقم الجلوس</label>
          <input 
            type="text" 
            v-model="studentForm.roll_number" 
            placeholder="مثال: 1001" 
            required 
            class="form-control"
          />
        </div>
        <div class="form-group">
          <label>كود الطالب الخاص</label>
          <input 
            type="password" 
            v-model="studentForm.student_code" 
            placeholder="مثال: ST1001" 
            required 
            class="form-control"
          />
        </div>
        <div class="demo-hint">
          💡 بيانات الطالب التجريبي: رقم الجلوس <code>1001</code> والكود <code>ST1001</code>
        </div>
        <BaseButton variant="primary" block size="lg" :loading="loading" type="submit">
          دخول الطالب 🚀
        </BaseButton>
      </form>

      <!-- Teacher / Admin Login Form -->
      <form v-else @submit.prevent="handleStaffLogin" class="login-form">
        <div class="form-group">
          <label>اسم المستخدم</label>
          <input 
            type="text" 
            v-model="staffForm.username" 
            :placeholder="activeRole === 'TEACHER' ? 'مثال: teacher1' : 'مثال: admin'" 
            required 
            class="form-control"
          />
        </div>
        <div class="form-group">
          <label>كلمة المرور</label>
          <input 
            type="password" 
            v-model="staffForm.password" 
            placeholder="••••••••" 
            required 
            class="form-control"
          />
        </div>
        <div class="demo-hint" v-if="activeRole === 'TEACHER'">
          💡 بيانات المعلم التجريبي: اسم المستخدم <code>teacher1</code> وكلمة المرور <code>teacher123</code>
        </div>
        <div class="demo-hint" v-if="activeRole === 'ADMIN'">
          💡 بيانات الإدارة التجريبية: اسم المستخدم <code>admin</code> وكلمة المرور <code>admin123</code>
        </div>
        <BaseButton variant="primary" block size="lg" :loading="loading" type="submit">
          تسجيل الدخول 🔐
        </BaseButton>
      </form>

      <div v-if="errorMsg" class="error-banner">
        ⚠️ {{ errorMsg }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import api from '../../services/api';
import BaseButton from '../../components/common/BaseButton.vue';

const router = useRouter();
const activeRole = ref('STUDENT');
const loading = ref(false);
const errorMsg = ref('');

const studentForm = reactive({
  roll_number: '1001',
  student_code: 'ST1001'
});

const staffForm = reactive({
  username: '',
  password: ''
});

function selectRole(role) {
  activeRole.value = role;
  errorMsg.value = '';

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
    errorMsg.value = err.response?.data?.message || 'فشل تسجيل دخول الطالب. يرجى التأكد من البيانات.';
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
      if (activeRole.value === 'TEACHER') router.push('/teacher');
      else router.push('/admin');
    }
  } catch (err) {
    errorMsg.value = err.response?.data?.message || 'اسم المستخدم أو كلمة المرور غير صحيحة.';
  } finally {
    loading.value = false;
  }
}
</script>

<style scoped>
.login-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #eef2ff 0%, #e0e7ff 100%);
  padding: 20px;
}

.login-card-wrapper {
  background: #ffffff;
  width: 100%;
  max-width: 480px;
  border-radius: var(--radius-lg);
  padding: 40px 32px;
  box-shadow: var(--shadow-lg);
  border: 2px solid #e0e7ff;
}

.login-header {
  text-align: center;
  margin-bottom: 28px;
}

.app-logo {
  font-size: 3.5rem;
  margin-bottom: 8px;
}

.login-header h2 {
  font-size: 1.8rem;
  font-weight: 800;
  color: var(--primary-color);
}

.login-header p {
  font-size: 0.9rem;
  color: var(--text-muted);
}

.role-selector {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  margin-bottom: 24px;
}

.role-card {
  background: #f8fafc;
  border: 2px solid #e2e8f0;
  border-radius: var(--radius-md);
  padding: 12px 8px;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}

.role-card.active {
  background: #eef2ff;
  border-color: var(--primary-color);
  box-shadow: 0 4px 10px rgba(79, 70, 229, 0.15);
}

.role-icon {
  font-size: 1.5rem;
}

.role-label {
  font-size: 0.8rem;
  font-weight: 700;
  color: var(--text-main);
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.form-group label {
  font-weight: 700;
  font-size: 0.95rem;
  color: var(--text-main);
}

.form-control {
  font-family: inherit;
  font-size: 1.05rem;
  padding: 12px 16px;
  border-radius: var(--radius-md);
  border: 2px solid var(--border-light);
  outline: none;
  transition: border-color 0.2s;
}

.form-control:focus {
  border-color: var(--primary-color);
}

.demo-hint {
  background: #fefce8;
  border: 1px solid #fef08a;
  color: #854d0e;
  padding: 10px 14px;
  border-radius: var(--radius-sm);
  font-size: 0.85rem;
}

.demo-hint code {
  background: #fef08a;
  padding: 2px 6px;
  border-radius: 4px;
  font-weight: 700;
}

.error-banner {
  margin-top: 20px;
  background: #fef2f2;
  border: 1px solid #fecaca;
  color: #b91c1c;
  padding: 12px;
  border-radius: var(--radius-md);
  font-size: 0.9rem;
  font-weight: 600;
  text-align: center;
}
</style>
