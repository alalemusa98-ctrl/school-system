<template>
  <AppSubHeader
    currentTime="9:41"
    :title="title"
    :subtitle="subtitle"
    :gradeSection="`${teacherName} • ${assignedSectionsText}`"
    :semesterInfo="semesterInfo"
    :heroImage="heroImage || examImg || '/images/exams_evaluations_3d.png'"
    themeGradient="rose"
    fallbackBackRoute="/teacher/dashboard"
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
    default: 'جدولة الاختبارات ورصد الدرجات'
  },
  teacherName: {
    type: String,
    default: 'أ. أحمد سالم'
  },
  subjectSpecialty: {
    type: String,
    default: 'معلم الرياضيات'
  },
  assignedSectionsText: {
    type: String,
    default: 'الصف 5 (أ5 ، ب5)'
  },
  semesterInfo: {
    type: String,
    default: 'الفصل الدراسي الأول 2026'
  },
  heroImage: {
    type: String,
    default: ''
  }
});

const emit = defineEmits(['back', 'open-filter']);
</script>
