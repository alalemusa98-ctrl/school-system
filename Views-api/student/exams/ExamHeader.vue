<template>
  <AppSubHeader
    currentTime="9:41"
    :title="title"
    :subtitle="subtitle"
    :gradeSection="gradeSection"
    :semesterInfo="semesterInfo"
    :heroImage="examImg || '/images/exams_evaluations_3d.png'"
    themeGradient="rose"
    fallbackBackRoute="/student/dashboard"
    @back="$emit('back')"
    @open-filter="$emit('open-filter')"
  />
</template>

<script setup>
import AppSubHeader from '../../shared/AppSubHeader.vue';
import examImg from '@/assets/exams_evaluations_3d.png';

const props = defineProps({
  title: {
    type: String,
    default: 'جدول الامتحانات'
  },
  subtitle: {
    type: String,
    default: 'مواعيد الاختبارات والحلول الاسترشادية'
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
