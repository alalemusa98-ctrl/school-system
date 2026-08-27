<template>
  <div class="student-app-root">
    <!-- Header (iOS Mobile App Architecture - مطابق لواجهة الطالب) -->
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
          <button class="glass-icon-btn" title="تسجيل الخروج" @click="handleLogout">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
              <polyline points="16 17 21 12 16 7"></polyline>
              <line x1="21" y1="12" x2="9" y2="12"></line>
            </svg>
          </button>

          <h1 class="ios-nav-title">مدرسة النور الإعدادية</h1>

          <div class="ios-nav-actions">
            <button class="glass-icon-btn" title="تنبيهات">
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
            <!-- 1. اسم المعلم -->
            <h2 class="hero-title">{{ teacherName }}</h2>
            <p class="hero-subtitle">الصف الخامس - الشعبة (أ5)</p>
            <p class="hero-tag">قسم المرحلة الإعدادية والنموذجية</p>
          </div>
        </div>

        <!-- 3 Key Stats Counters للمعلم -->
        <div class="hero-stats-row">
          <!-- 2. عدد المواد الدراسية التي يقوم بتدريسها -->
          <div class="stat-item">
            <div class="stat-icon-val">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#7c3aed" stroke-width="2.2">
                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
              </svg>
              <span class="stat-val">+{{ subjectsCount }}</span>
            </div>
            <span class="stat-lbl">المواد الدراسية</span>
          </div>

          <div class="stat-divider"></div>

          <!-- 3. عدد الطلاب الذين يدرسهم -->
          <div class="stat-item">
            <div class="stat-icon-val">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#7c3aed" stroke-width="2.2">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
              </svg>
              <span class="stat-val">+{{ studentsCount }}</span>
            </div>
            <span class="stat-lbl">عدد الطلاب</span>
          </div>

          <div class="stat-divider"></div>

          <!-- 4. عدد الفصول التي يدرسها -->
          <div class="stat-item">
            <div class="stat-icon-val">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#eab308" stroke-width="2.2">
                <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
                <path d="M6 12v5c3 3 9 3 12 0v-5"></path>
              </svg>
              <span class="stat-val">{{ sectionsCount }}</span>
            </div>
            <span class="stat-lbl">عدد الفصول</span>
          </div>
        </div>
      </div>
    </header>

    <!-- 5. قسم شريط التواريخ الأسبوعي -->
    <section class="attendance-section">
      <div class="attendance-content">
        <div class="days-row">
          <div 
            v-for="(day, index) in calendarDays" 
            :key="index"
            class="day-card"
            :class="{ active: selectedDayIndex === index }"
            @click="selectedDayIndex = index"
          >
            <span class="day-name">{{ day.name }}</span>
            <span class="day-date">{{ day.date }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- 6. شبكة الكروت الأربعة السريعة -->
    <main class="cards-container">
      <!-- 1. الواجبات -->
      <div class="card homework" @click="$router.push('/teacher/homeworks')">
        <img src="/images/واجبات.png" alt="الواجبات" class="card-bg" />
        <div class="card-overlay"></div>
        <div class="card-badge warning">{{ homeworkTasksCount }} معلق</div>
        <div class="card-content">
          <h3>الواجبات</h3>
          <p>متابعة المهام المطلوبة والواجبات اليومية</p>
          <div class="card-link-btn">
            <span>عرض المهام</span>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </div>
        </div>
      </div>

      <!-- 2. الامتحانات -->
      <div class="card exams" @click="$router.push('/teacher/exams')">
        <img src="/images/امتحانات.png" alt="الامتحانات" class="card-bg" />
        <div class="card-overlay"></div>
        <div class="card-badge danger">{{ examTasksCount }} قادمة</div>
        <div class="card-content">
          <h3>الامتحانات</h3>
          <p>جدول الامتحانات والاختبارات الشهرية</p>
          <div class="card-link-btn">
            <span>عرض الجدول</span>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </div>
        </div>
      </div>

      <!-- 3. المواد الدراسية / الفصول الدراسية -->
      <div class="card subjects" @click="$router.push('/teacher/subjects')">
        <img src="/images/مواد.png" alt="المواد الدراسية" class="card-bg" />
        <div class="card-overlay"></div>
        <div class="card-badge info">{{ assignmentsCount }} مواد</div>
        <div class="card-content">
          <h3>المواد الدراسية</h3>
          <p>المناهج والملخصات التعليمية المتاحة</p>
          <div class="card-link-btn">
            <span>استكشاف المواد</span>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </div>
        </div>
      </div>

      <!-- 4. الجدول الأسبوعي -->
      <div class="card schedule" @click="$router.push('/teacher/schedule')">
        <img src="/images/جدول.png" alt="الجدول الأسبوعي" class="card-bg" />
        <div class="card-overlay"></div>
        <div class="card-badge success">اليوم: {{ currentDayName }}</div>
        <div class="card-content">
          <h3>الجدول الأسبوعي</h3>
          <p>توزيع الحصص اليومية والمعلمين</p>
          <div class="card-link-btn">
            <span>عرض الحصص</span>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </div>
        </div>
      </div>
    </main>

    <!-- Bottom Navigation Dock -->
    <MobileNav />
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import MobileNav from '../../components/common/MobileNav.vue';
import api from '../../services/api';

const router = useRouter();
const currentTime = ref('9:41');
const selectedDayIndex = ref(0);
const calendarDays = ref([]);

const assignments = ref([]);
const tasks = ref([]);

// حساب أيام الأسبوع الأكاديمي (الأحد - الخميس)
function initCalendarDays() {
  const now = new Date();
  const dayOfWeek = now.getDay(); // 0: Sun, 1: Mon, 2: Tue, 3: Wed, 4: Thu, 5: Fri, 6: Sat

  let diffToSunday = -dayOfWeek;
  if (dayOfWeek === 5) diffToSunday = 2; // Fri -> next Sun
  if (dayOfWeek === 6) diffToSunday = 1; // Sat -> next Sun

  const sundayDate = new Date(now);
  sundayDate.setDate(now.getDate() + diffToSunday);

  const dayNamesShort = ['أحد', 'إثن', 'ثلا', 'أرب', 'خمي'];
  const days = [];
  let activeIndex = 0;

  for (let i = 0; i < 5; i++) {
    const d = new Date(sundayDate);
    d.setDate(sundayDate.getDate() + i);

    days.push({
      name: dayNamesShort[i],
      date: d.getDate().toString()
    });

    if (d.toDateString() === now.toDateString()) {
      activeIndex = i;
    }
  }

  calendarDays.value = days;
  selectedDayIndex.value = activeIndex;
}

initCalendarDays();

const userStr = localStorage.getItem('school_user');
const user = userStr ? JSON.parse(userStr) : {};

// 1. اسم المعلم
const teacherName = computed(() => user.name || user.fullName || 'أحمد خالد');

// 2. عدد المواد الدراسية التي يقوم بتدريسها
const subjectsCount = computed(() => {
  return assignments.value.length > 0 ? assignments.value.length : 8;
});

// 3. عدد الطلاب الذين يدرسهم
const studentsCount = computed(() => 350);

// 4. عدد الفصول التي يدرسها
const sectionsCount = computed(() => {
  const uniqueSecs = new Set(assignments.value.map(a => a.section_id));
  return uniqueSecs.size > 0 ? uniqueSecs.size : 3;
});

const homeworkTasksCount = computed(() => {
  const hw = tasks.value.filter(t => t.task_type === 'HOMEWORK');
  return hw.length > 0 ? hw.length : 3;
});

const examTasksCount = computed(() => {
  const exams = tasks.value.filter(t => t.task_type === 'EXAM');
  return exams.length > 0 ? exams.length : 2;
});

const assignmentsCount = computed(() => {
  return assignments.value.length > 0 ? assignments.value.length : 5;
});

const currentDayName = computed(() => {
  const days = ['الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'];
  return days[new Date().getDay()] || 'الأحد';
});

function handleLogout() {
  localStorage.removeItem('school_token');
  localStorage.removeItem('school_user');
  router.push('/login');
}

async function loadData() {
  try {
    const [assignRes, tasksRes] = await Promise.all([
      api.get('/teacher/assignments'),
      api.get('/teacher/tasks')
    ]);
    if (assignRes.data.success && assignRes.data.data.length > 0) {
      assignments.value = assignRes.data.data;
    }
    if (tasksRes.data.success && tasksRes.data.data.length > 0) {
      tasks.value = tasksRes.data.data;
    }
  } catch (err) {
    console.error('Failed to load teacher data:', err);
  }
}

onMounted(async () => {
  initCalendarDays();
  await loadData();

  // Set real clock time format
  const now = new Date();
  let hours = now.getHours();
  const minutes = now.getMinutes().toString().padStart(2, '0');
  hours = hours % 12 || 12;
  currentTime.value = `${hours}:${minutes}`;
});
</script>

<style scoped>
/* Page Specific Clean Structure */
.cards-container {
  margin-bottom: 24px;
}
</style>
