<template>
  <AppMainHeader
    :currentTime="currentTime"
    :schoolName="schoolName"
    :userName="teacherName"
    :userSubtitle="`${subjectSpecialty} • ${department}`"
    :userTag="assignedSectionsText"
    avatarIcon="👨‍🏫"
    themeGradient="purple"
    :stats="teacherStats"
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
  teacherName: { type: String, default: 'أ. أحمد سالم' },
  subjectSpecialty: { type: String, default: 'معلم الرياضيات' },
  department: { type: String, default: 'المرحلة الإعدادية' },
  assignedSectionsText: { type: String, default: 'الفصول المسندة: 5أ ، 5ب ، 6أ' },
  assignedSectionsCount: { type: Number, default: 3 },
  activeHomeworksCount: { type: Number, default: 8 },
  scheduledExamsCount: { type: Number, default: 3 }
});

const emit = defineEmits(['logout', 'open-notifications', 'stat-click']);

const teacherStats = computed(() => [
  { id: 'subjects', label: 'الفصول والشعب', value: props.assignedSectionsCount, color: '#7c3aed', icon: 'subjects', route: '/teacher/subjects' },
  { id: 'homeworks', label: 'الواجبات النشطة', value: props.activeHomeworksCount, color: '#ea580c', icon: 'homework', route: '/teacher/homeworks' },
  { id: 'exams', label: 'الامتحانات', value: props.scheduledExamsCount, color: '#2563eb', icon: 'exam', route: '/teacher/exams' }
]);
</script>
