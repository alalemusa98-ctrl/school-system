<template>
  <div 
    class="base-card" 
    :class="{ 
      'clickable': isClickable, 
      'highlight-homework': variant === 'homework',
      'highlight-exam': variant === 'exam',
      'highlight-solution': variant === 'solution'
    }" 
    @click="handleClick"
  >
    <div v-if="$slots.header" class="card-header">
      <slot name="header"></slot>
    </div>
    <div class="card-body">
      <slot></slot>
    </div>
    <div v-if="$slots.footer" class="card-footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script setup>
defineProps({
  isClickable: { type: Boolean, default: false },
  variant: { type: String, default: 'default' } // default, homework, exam, solution
});

const emit = defineEmits(['click']);

function handleClick(event) {
  emit('click', event);
}
</script>

<style scoped>
.base-card {
  background: var(--bg-card);
  border-radius: var(--radius-lg);
  padding: 24px;
  box-shadow: var(--shadow-md);
  border: 2px solid var(--border-light);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
}

.base-card.clickable:hover {
  transform: translateY(-6px);
  box-shadow: var(--shadow-lg);
  cursor: pointer;
  border-color: var(--primary-light);
}

.base-card.highlight-homework {
  border-top: 6px solid var(--accent-homework);
}

.base-card.highlight-exam {
  border-top: 6px solid var(--accent-exam);
}

.base-card.highlight-solution {
  border-top: 6px solid var(--accent-solution);
}

.card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
  padding-bottom: 12px;
  border-bottom: 1px solid var(--border-light);
}

.card-body {
  font-size: 1.05rem;
  color: var(--text-main);
}

.card-footer {
  margin-top: 20px;
  padding-top: 16px;
  border-top: 1px solid var(--border-light);
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
