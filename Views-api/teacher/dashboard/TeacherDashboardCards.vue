<template>
  <AppDashboardCards
    :cards="teacherCards"
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
  activeHomeworksCount: { type: Number, default: 8 },
  scheduledExamsCount: { type: Number, default: 3 },
  assignedSectionsCount: { type: Number, default: 3 },
  currentDayName: { type: String, default: 'الثلاثاء' }
});

const emit = defineEmits(['card-click']);

// بناء وتمرير بيانات كروت المعلم مع الصور الصريحة
const teacherCards = computed(() => [
  {
    id: 'homeworks',
    title: 'إدارة الواجبات',
    subtitle: 'نشر التكليفات ومتابعة تسليمات الطلاب والحل النموذجي',
    buttonText: 'عرض الواجبات',
    badge: `${props.activeHomeworksCount} نشطة`,
    badgeType: 'warning',
    cardClass: 'homework',
    image: hwCardImg,
    route: '/teacher/homeworks'
  },
  {
    id: 'exams',
    title: 'جدول الامتحانات',
    subtitle: 'جدولة مواعيد الاختبارات ورصد الدرجات والحلول',
    buttonText: 'عرض الامتحانات',
    badge: `${props.scheduledExamsCount} مجدولة`,
    badgeType: 'danger',
    cardClass: 'exams',
    image: examCardImg,
    route: '/teacher/exams'
  },
  {
    id: 'subjects',
    title: 'الفصول الدراسية',
    subtitle: 'إدارة الشعب ومتابعة حضور وسجلات الطلاب',
    buttonText: 'استكشاف الفصول',
    badge: `${props.assignedSectionsCount} شعب مسندة`,
    badgeType: 'info',
    cardClass: 'subjects',
    image: subCardImg,
    route: '/teacher/subjects'
  },
  {
    id: 'schedule',
    title: 'الجدول الأسبوعي',
    subtitle: 'مواعيد الحصص اليومية وتوزيع القاعات الدراسية',
    buttonText: 'عرض الحصص',
    badge: `اليوم: ${props.currentDayName}`,
    badgeType: 'success',
    cardClass: 'schedule',
    image: schedCardImg,
    route: '/teacher/schedule'
  }
]);
</script>
