<template>
  <BaseCard :isClickable="true" class="subject-card animate-fade-in" @click="$emit('click')">
    <div class="subject-icon">{{ getSubjectIcon(subject.name) }}</div>
    <div class="subject-title">{{ subject.name }}</div>
    <div class="subject-action">عرض الواجبات والامتحانات 👈</div>
  </BaseCard>
</template>

<script setup>
import BaseCard from '../common/BaseCard.vue';

defineProps({
  subject: { type: Object, required: true }
});

defineEmits(['click']);

function getSubjectIcon(name) {
  if (name.includes('إسلامية') || name.includes('قرآن')) return '🕌';
  if (name.includes('عربية') || name.includes('لغة')) return '📖';
  if (name.includes('رياضيات') || name.includes('حساب')) return '📐';
  if (name.includes('علوم') || name.includes('فيزياء')) return '🔬';
  if (name.includes('إنجليزية') || name.includes('English')) return '🔤';
  if (name.includes('تاريخ') || name.includes('جغرافيا') || name.includes('اجتماعيات')) return '🌍';
  if (name.includes('حاسوب') || name.includes('تقنية')) return '💻';
  return '📚';
}
</script>

<style scoped>
.subject-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 28px 20px;
  text-align: center;
  border: 2px solid #e2e8f0;
  background: #ffffff;
}

.subject-card:hover {
  border-color: var(--primary-color);
  background: #f4f5ff;
}

.subject-icon {
  font-size: 3rem;
  margin-bottom: 12px;
}

.subject-title {
  font-size: 1.25rem;
  font-weight: 800;
  color: var(--text-main);
  margin-bottom: 8px;
}

.subject-action {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--primary-color);
}
</style>
