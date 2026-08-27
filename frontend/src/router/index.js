import { createRouter, createWebHistory } from 'vue-router';

// Auth
import LoginView from '../views/auth/LoginView.vue';

// Student Views
import StudentDashboardView from '../views/student/StudentDashboardView.vue';
import HomeworksView from '../views/student/HomeworksView.vue';
import ExamsView from '../views/student/ExamsView.vue';
import ScheduleView from '../views/student/ScheduleView.vue';
import SubjectsView from '../views/student/SubjectsView.vue';

// Teacher Views
import TeacherDashboardView from '../views/teacher/TeacherDashboardView.vue';
import TeacherHomeworksView from '../views/teacher/TeacherHomeworksView.vue';
import TeacherExamsView from '../views/teacher/TeacherExamsView.vue';
import TeacherScheduleView from '../views/teacher/TeacherScheduleView.vue';
import TeacherSubjectsView from '../views/teacher/TeacherSubjectsView.vue';

// Admin View
import AdminDashboardView from '../views/admin/AdminDashboardView.vue';
import DesignPreviewView from '../views/DesignPreviewView.vue';

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginView,
    meta: { guestOnly: true }
  },
  {
    path: '/design-preview',
    name: 'DesignPreview',
    component: DesignPreviewView,
    meta: { requiresAuth: false }
  },

  // Student Routes
  {
    path: '/student',
    name: 'StudentDashboard',
    component: StudentDashboardView,
    meta: { requiresAuth: true, role: 'STUDENT' }
  },
  {
    path: '/student/homeworks',
    name: 'StudentHomeworks',
    component: HomeworksView,
    meta: { requiresAuth: true, role: 'STUDENT' }
  },
  {
    path: '/student/exams',
    name: 'StudentExams',
    component: ExamsView,
    meta: { requiresAuth: true, role: 'STUDENT' }
  },
  {
    path: '/student/schedule',
    name: 'StudentSchedule',
    component: ScheduleView,
    meta: { requiresAuth: true, role: 'STUDENT' }
  },
  {
    path: '/student/subjects',
    name: 'StudentSubjects',
    component: SubjectsView,
    meta: { requiresAuth: true, role: 'STUDENT' }
  },

  // Teacher Routes
  {
    path: '/teacher',
    name: 'TeacherDashboard',
    component: TeacherDashboardView,
    meta: { requiresAuth: true, role: 'TEACHER' }
  },
  {
    path: '/teacher/homeworks',
    name: 'TeacherHomeworks',
    component: TeacherHomeworksView,
    meta: { requiresAuth: true, role: 'TEACHER' }
  },
  {
    path: '/teacher/exams',
    name: 'TeacherExams',
    component: TeacherExamsView,
    meta: { requiresAuth: true, role: 'TEACHER' }
  },
  {
    path: '/teacher/schedule',
    name: 'TeacherSchedule',
    component: TeacherScheduleView,
    meta: { requiresAuth: true, role: 'TEACHER' }
  },
  {
    path: '/teacher/subjects',
    name: 'TeacherSubjects',
    component: TeacherSubjectsView,
    meta: { requiresAuth: true, role: 'TEACHER' }
  },

  // Admin Routes
  {
    path: '/admin',
    name: 'AdminDashboard',
    component: AdminDashboardView,
    meta: { requiresAuth: true, role: 'ADMIN' }
  },

  // Catch-all
  {
    path: '/:pathMatch(.*)*',
    redirect: '/login'
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 };
  }
});

// Role-Based Navigation Guards
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('school_token');
  const userJson = localStorage.getItem('school_user');
  let userRole = null;

  if (userJson) {
    try {
      const user = JSON.parse(userJson);
      userRole = user.role;
    } catch (e) {}
  }

  // 1. If guest-only route (like /login) and user already logged in
  if (to.meta.guestOnly && token && userRole) {
    if (userRole === 'STUDENT') return next('/student');
    if (userRole === 'TEACHER') return next('/teacher');
    if (userRole === 'ADMIN') return next('/admin');
  }

  // 2. If route requires authentication
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!token || !userRole) {
      return next('/login');
    }

    // Role check
    const requiredRole = to.matched.find(r => r.meta.role)?.meta.role;
    if (requiredRole && requiredRole !== userRole) {
      if (userRole === 'STUDENT') return next('/student');
      if (userRole === 'TEACHER') return next('/teacher');
      if (userRole === 'ADMIN') return next('/admin');
      return next('/login');
    }
  }

  next();
});

export default router;
