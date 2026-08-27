<template>
  <AppDashboardCards
    :cards="studentCards"
    @card-click="(card) => $emit('card-click', card)"
  />
</template>

<script setup>
import { computed } from 'vue';
import AppDashboardCards from '../../shared/AppDashboardCards.vue';

// استيراد صور الخلفيات ثلاثية الأبعاد من مجلد الأصول المشترك
import hwCardImg from '../../shared/assets/homeworks_card.jpg';
import examCardImg from '../../shared/assets/exams_card.jpg';
import subCardImg from '../../shared/assets/subjects_card.png';
import schedCardImg from '../../shared/assets/schedule_card.jpg';

const props = defineProps({
  pendingHomeworksCount: { type: Number, default: 4 },
  upcomingExamsCount: { type: Number, default: 1 },
  subjectsCount: { type: Number, default: 7 },
  currentDayName: { type: String, default: 'الثلاثاء' }
});

const emit = defineEmits(['card-click']);

// بناء وتمرير بيانات كروت الطالب مع الصور الصريحة
const studentCards = computed(() => [
  {
    id: 'homeworks',
    title: 'الواجبات',
    subtitle: 'متابعة المهام المطلوبة والواجبات اليومية',
    buttonText: 'عرض المهام',
    badge: `${props.pendingHomeworksCount} معلق`,
    badgeType: 'warning',
    cardClass: 'homework',
    image: hwCardImg,
    route: '/student/homeworks'
  },
  {
    id: 'exams',
    title: 'الامتحانات',
    subtitle: 'جدول الامتحانات والاختبارات الشهرية',
    buttonText: 'عرض الجدول',
    badge: `${props.upcomingExamsCount} قادمة`,
    badgeType: 'danger',
    cardClass: 'exams',
    image: examCardImg,
    route: '/student/exams'
  },
  {
    id: 'subjects',
    title: 'المواد الدراسية',
    subtitle: 'المناهج والملخصات التعليمية المتاحة',
    buttonText: 'استكشاف المواد',
    badge: `${props.subjectsCount} مواد`,
    badgeType: 'info',
    cardClass: 'subjects',
    image: subCardImg,
    route: '/student/subjects'
  },
  {
    id: 'schedule',
    title: 'الجدول الأسبوعي',
    subtitle: 'توزيع الحصص اليومية والمعلمين',
    buttonText: 'عرض الحصص',
    badge: `اليوم: ${props.currentDayName}`,
    badgeType: 'success',
    cardClass: 'schedule',
    image: schedCardImg,
    route: '/student/schedule'
  }
]);
</script>
