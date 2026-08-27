<template>
  <AppMainHeader
    :currentTime="currentTime"
    :schoolName="schoolName"
    :userName="studentName"
    :userSubtitle="gradeSection"
    :userTag="department"
    avatarIcon="🏫"
    themeGradient="purple"
    :stats="studentStats"
    @logout="$emit('logout')"
    @open-notifications="$emit('open-notifications')"
    @stat-click="$emit('stat-click', $event)"
  />
</template>

<script setup>
import { computed } from 'vue';
import AppMainHeader from '../../shared/AppMainHeader.vue';

const props = defineProps({
  currentTime: { type: String, default: '9:41' },
  schoolName: { type: String, default: 'مدرسة النور الإعدادية' },
  studentName: { type: String, default: 'أحمد خالد المصراتي' },
  gradeSection: { type: String, default: 'الصف الخامس - الشعبة (أ5)' },
  department: { type: String, default: 'قسم المرحلة الإعدادية والنموذجية' },
  subjectsCount: { type: Number, default: 7 },
  pendingHomeworksCount: { type: Number, default: 4 },
  upcomingExamsCount: { type: Number, default: 1 }
});

const emit = defineEmits(['logout', 'open-notifications', 'stat-click']);

const studentStats = computed(() => [
  { id: 'subjects', label: 'المواد الدراسية', value: props.subjectsCount, color: '#7c3aed', icon: 'book', route: '/student/subjects' },
  { id: 'homeworks', label: 'الواجبات المعلقة', value: props.pendingHomeworksCount, color: '#ea580c', icon: 'homework', route: '/student/homeworks' },
  { id: 'exams', label: 'الامتحانات القادمة', value: props.upcomingExamsCount, color: '#2563eb', icon: 'exam', route: '/student/exams' }
]);
</script>
