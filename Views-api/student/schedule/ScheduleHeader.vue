<template>
  <AppSubHeader
    currentTime="9:41"
    :title="title"
    :subtitle="subtitle"
    :gradeSection="gradeSection"
    :semesterInfo="semesterInfo"
    heroIcon="📅"
    themeGradient="emerald"
    fallbackBackRoute="/student/dashboard"
    @back="$emit('back')"
    @open-filter="$emit('open-filter')"
  />
</template>

<script setup>
import AppSubHeader from '../../shared/AppSubHeader.vue';

const props = defineProps({
  title: {
    type: String,
    default: 'الجدول الدراسي'
  },
  subtitle: {
    type: String,
    default: 'مواعيد الحصص وتوزيع القاعات الدراسية'
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
