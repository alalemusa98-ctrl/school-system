<template>
  <AppTabs
    :activeTab="activeTab"
    :selectedSubject="selectedSubject"
    :currentCount="currentCount"
    :tabs="homeworkTabs"
    :pills="subjectOptions"
    @update:activeTab="$emit('update:activeTab', $event)"
    @update:selectedSubject="$emit('update:selectedSubject', $event)"
  />
</template>

<script setup>
import { computed } from 'vue';
import AppTabs from '../../shared/AppTabs.vue';

const props = defineProps({
  activeTab: { type: String, default: 'current' },
  selectedSubject: { type: String, default: 'ALL' },
  currentCount: { type: Number, default: 5 },
  subjectOptions: { type: Array, default: null }
});

const emit = defineEmits(['update:activeTab', 'update:selectedSubject']);

const homeworkTabs = computed(() => [
  { id: 'current', label: 'الواجبات الحالية', icon: '⏱️', badge: props.currentCount },
  { id: 'previous', label: 'الأرشيف', icon: '📁' }
]);
</script>
