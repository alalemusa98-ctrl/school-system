<template>
  <AppSubHeader
    currentTime="9:41"
    :title="title"
    :subtitle="subtitle"
    :gradeSection="gradeSection"
    :semesterInfo="semesterInfo"
    :heroImage="homeworkImg || '/images/homework_assignments_3d.png'"
    themeGradient="purple"
    fallbackBackRoute="/student/dashboard"
    @back="$emit('back')"
    @open-filter="$emit('open-filter')"
  />
</template>

<script setup>
import AppSubHeader from '../../shared/AppSubHeader.vue';
import homeworkImg from '@/assets/homework_assignments_3d.png';

const props = defineProps({
  title: {
    type: String,
    default: 'تفاصيل الواجبات'
  },
  subtitle: {
    type: String,
    default: 'متابعة الواجبات والحلول النموذجية'
  },
  gradeSection: {
    type: String,
    default: 'الصف الخامس - الشعبة (أ5)'
  },
  semesterInfo: {
    type: String,
    default: 'الفصل الدراسي الأول 2026'
  }
});

const emit = defineEmits(['back', 'open-filter']);
</script>
