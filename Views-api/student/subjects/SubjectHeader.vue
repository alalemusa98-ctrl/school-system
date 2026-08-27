<template>
  <AppSubHeader
    currentTime="9:41"
    :title="title"
    :subtitle="subtitle"
    :gradeSection="gradeSection"
    :semesterInfo="semesterInfo"
    :heroImage="subjectImg || '/images/homework_assignments_3d.png'"
    themeGradient="blue"
    fallbackBackRoute="/student/dashboard"
    @back="$emit('back')"
    @open-filter="$emit('open-filter')"
  />
</template>

<script setup>
import AppSubHeader from '../../shared/AppSubHeader.vue';
import subjectImg from '../../shared/assets/subjects_curriculum_3d.png';

const props = defineProps({
  title: {
    type: String,
    default: 'المواد المقررة'
  },
  subtitle: {
    type: String,
    default: 'المناهج والكتب الإلكترونية المقررة'
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
