<template>
  <BaseCard class="schedule-card animate-fade-in">
    <div class="slot-badge">الحصة {{ slot.slot_number }}</div>
    <div class="slot-subject">{{ slot.subject_name }}</div>
    <div class="slot-teacher">👨‍🏫 {{ slot.teacher_name }}</div>
  </BaseCard>
</template>

<script setup>
import BaseCard from '../common/BaseCard.vue';

defineProps({
  slot: { type: Object, required: true }
});
</script>

<style scoped>
.schedule-card {
  text-align: center;
  background: linear-gradient(145deg, #ffffff 0%, #f8fafc 100%);
  border: 2px solid #e2e8f0;
  padding: 16px;
}

.slot-badge {
  display: inline-block;
  background: var(--primary-gradient);
  color: #ffffff;
  font-weight: 700;
  font-size: 0.85rem;
  padding: 4px 12px;
  border-radius: 12px;
  margin-bottom: 8px;
}

.slot-subject {
  font-size: 1.15rem;
  font-weight: 800;
  color: var(--text-main);
  margin-bottom: 4px;
}

.slot-teacher {
  font-size: 0.85rem;
  color: var(--text-muted);
}
</style>
