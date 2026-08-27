<template>
  <AppSubHeader
    currentTime="9:41"
    :title="title"
    :subtitle="subtitle"
    :gradeSection="`${teacherName} • ${subjectSpecialty}`"
    :semesterInfo="semesterInfo"
    :heroImage="heroImage || scheduleImg || '/images/school_building_3d.png'"
    themeGradient="emerald"
    fallbackBackRoute="/teacher/dashboard"
    @back="$emit('back')"
    @open-filter="$emit('open-filter')"
  />
</template>

<script setup>
import AppSubHeader from '../../shared/AppSubHeader.vue';
import scheduleImg from '@/assets/school_building_3d.png';

const props = defineProps({
  title: {
    type: String,
    default: 'الجدول الدراسي الأسبوعي'
  },
  subtitle: {
    type: String,
    default: 'مواعيد الحصص اليومية وتوزيع القاعات'
  },
  teacherName: {
    type: String,
    default: 'أ. أحمد سالم'
  },
  subjectSpecialty: {
    type: String,
    default: 'معلم الرياضيات'
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
