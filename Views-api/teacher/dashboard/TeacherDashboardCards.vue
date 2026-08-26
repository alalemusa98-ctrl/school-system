<template>
  <main class="cards-container">
    <!-- 1. إدارة الواجبات المدرسية -->
    <div class="card homework" @click="navigateTo('/teacher/homeworks')">
      <img src="/images/واجبات.png" alt="الواجبات" class="card-bg" />
      <div class="card-overlay"></div>
      <div class="card-badge warning">{{ activeHomeworksCount }} نشطة</div>
      <div class="card-content">
        <h3>إدارة الواجبات</h3>
        <p>نشر التكليفات ومتابعة تسليمات الطلاب والحل النموذجي</p>
        <div class="card-link-btn">
          <span>عرض الواجبات</span>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </div>
      </div>
    </div>

    <!-- 2. جدول الامتحانات -->
    <div class="card exams" @click="navigateTo('/teacher/exams')">
      <img src="/images/امتحانات.png" alt="الامتحانات" class="card-bg" />
      <div class="card-overlay"></div>
      <div class="card-badge danger">{{ scheduledExamsCount }} مجدولة</div>
      <div class="card-content">
        <h3>جدول الامتحانات</h3>
        <p>جدولة مواعيد الاختبارات ورصد الدرجات والحلول</p>
        <div class="card-link-btn">
          <span>عرض الامتحانات</span>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </div>
      </div>
    </div>

    <!-- 3. الفصول الدراسية -->
    <div class="card subjects" @click="navigateTo('/teacher/subjects')">
      <img src="/images/مواد.png" alt="الفصول الدراسية" class="card-bg" />
      <div class="card-overlay"></div>
      <div class="card-badge info">{{ assignedSectionsCount }} شعب مسندة</div>
      <div class="card-content">
        <h3>الفصول الدراسية</h3>
        <p>إدارة الشعب ومتابعة حضور وسجلات الطلاب</p>
        <div class="card-link-btn">
          <span>استكشاف الفصول</span>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </div>
      </div>
    </div>

    <!-- 4. الجدول الأسبوعي -->
    <div class="card schedule" @click="navigateTo('/teacher/schedule')">
      <img src="/images/جدول.png" alt="الجدول الأسبوعي" class="card-bg" />
      <div class="card-overlay"></div>
      <div class="card-badge success">اليوم: {{ currentDayName }}</div>
      <div class="card-content">
        <h3>الجدول الأسبوعي</h3>
        <p>مواعيد الحصص اليومية وتوزيع القاعات الدراسية</p>
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
  activeHomeworksCount: { type: Number, default: 8 },
  scheduledExamsCount: { type: Number, default: 3 },
  assignedSectionsCount: { type: Number, default: 3 },
  currentDayName: { type: String, default: 'الثلاثاء' }
});

let router = null;
try {
  router = useRouter();
} catch (e) {}

function navigateTo(path) {
  if (router) {
    router.push(path);
  }
}
</script>

<style scoped>
/* Using student-design.css classes: cards-container, card, homework, exams, subjects, schedule, card-bg, card-overlay, card-badge, card-content, card-link-btn */
</style>
