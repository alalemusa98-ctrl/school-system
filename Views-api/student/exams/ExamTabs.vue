<template>
  <AppTabs
    :activeTab="activeTab"
    :selectedSubject="selectedSubject"
    :tabs="examTabs"
    :pills="subjectOptions"
    @update:activeTab="$emit('update:activeTab', $event)"
    @update:selectedSubject="$emit('update:selectedSubject', $event)"
  />
</template>

<script setup>
import { computed } from 'vue';
import AppTabs from '../../shared/AppTabs.vue';

const props = defineProps({
  activeTab: { type: String, default: 'upcoming' },
  selectedSubject: { type: String, default: 'ALL' },
  upcomingCount: { type: Number, default: 3 },
  subjectOptions: { type: Array, default: null }
});

const emit = defineEmits(['update:activeTab', 'update:selectedSubject']);

const examTabs = computed(() => [
  { id: 'upcoming', label: 'الامتحانات القادمة', icon: '📅', badge: props.upcomingCount },
  { id: 'results', label: 'النتائج والأرشيف', icon: '⭐' }
]);
</script>
