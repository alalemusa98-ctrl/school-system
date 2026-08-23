<template>
  <span class="base-badge" :class="`badge-${type}`">
    <slot></slot>
  </span>
</template>

<script setup>
defineProps({
  type: { type: String, default: 'primary' } // primary, homework, exam, solution, info
});
</script>

<style scoped>
.base-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 14px;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 700;
  line-height: 1;
}

.badge-primary {
  background: #e0e7ff;
  color: #4338ca;
}

.badge-homework {
  background: var(--accent-homework-bg);
  color: #b45309;
  border: 1px solid #fde68a;
}

.badge-exam {
  background: var(--accent-exam-bg);
  color: #b91c1c;
  border: 1px solid #fecaca;
}

.badge-solution {
  background: var(--accent-solution-bg);
  color: #047857;
  border: 1px solid #a7f3d0;
}

.badge-info {
  background: #e0f2fe;
  color: #0369a1;
}
</style>
