<template>
  <AppTabs
    :activeTab="activeTab"
    :selectedSectionId="selectedSectionId"
    :tabs="teacherExamTabs"
    :pills="sectionPills"
    actionButtonText="إضافة امتحان جديد"
    @update:activeTab="$emit('update:activeTab', $event)"
    @update:selectedSectionId="$emit('update:selectedSectionId', $event)"
    @action-click="$emit('open-create')"
  />
</template>

<script setup>
import { computed } from 'vue';
import AppTabs from '../../shared/AppTabs.vue';

const props = defineProps({
  activeTab: { type: String, default: 'upcoming' },
  upcomingCount: { type: Number, default: 1 },
  archiveCount: { type: Number, default: 1 },
  selectedSectionId: { type: [Number, String, null], default: null },
  assignedSections: {
    type: Array,
    default: () => [
      { id: 1, name: 'أ5', grade_name: 'الصف الخامس' },
      { id: 2, name: 'ب5', grade_name: 'الصف الخامس' },
      { id: 3, name: 'أ6', grade_name: 'الصف السادس' }
    ]
  }
});

const emit = defineEmits(['update:activeTab', 'update:selectedSectionId', 'open-create']);

const teacherExamTabs = computed(() => [
  { id: 'upcoming', label: 'الامتحانات القادمة', badge: props.upcomingCount },
  { id: 'archive', label: 'النتائج والأرشيف', badge: props.archiveCount }
]);

const sectionPills = computed(() => [
  { id: null, name: 'كافة الشعب', icon: '🌟' },
  ...(props.assignedSections || []).map(sec => ({
    id: sec.id,
    name: sec.name,
    grade_name: sec.grade_name,
    icon: '🏫'
  }))
]);
</script>
