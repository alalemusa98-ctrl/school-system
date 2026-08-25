<template>
  <main class="cards-container">
    <!-- 1. الواجبات -->
    <div class="card homework" @click="navigateTo('/student/homeworks')">
      <img src="/images/واجبات.png" alt="الواجبات" class="card-bg" />
      <div class="card-overlay"></div>
      <div class="card-badge warning">{{ pendingHomeworksCount }} معلق</div>
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
    <div class="card exams" @click="navigateTo('/student/exams')">
      <img src="/images/امتحانات.png" alt="الامتحانات" class="card-bg" />
      <div class="card-overlay"></div>
      <div class="card-badge danger">{{ upcomingExamsCount }} قادمة</div>
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

    <!-- 3. المواد الدراسية -->
    <div class="card subjects" @click="navigateTo('/student/subjects')">
      <img src="/images/مواد.png" alt="المواد الدراسية" class="card-bg" />
      <div class="card-overlay"></div>
      <div class="card-badge info">{{ subjectsCount }} مواد</div>
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
    <div class="card schedule" @click="navigateTo('/student/schedule')">
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
</template>

<script setup>
import { useRouter } from 'vue-router';
import '@/assets/styles/student-design.css';

const props = defineProps({
  pendingHomeworksCount: { type: Number, default: 4 },
  upcomingExamsCount: { type: Number, default: 1 },
  subjectsCount: { type: Number, default: 8 },
  currentDayName: { type: String, default: 'الثلاثاء' }
});

const router = useRouter();

function navigateTo(path) {
  if (router) {
    router.push(path);
  }
}
</script>

<style scoped>
/* Using student-design.css classes: cards-container, card, homework, exams, subjects, schedule, card-bg, card-overlay, card-badge, card-content, card-link-btn */
</style>
