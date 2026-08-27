<template>
  <button 
    class="base-btn" 
    :class="[
      `btn-${variant}`,
      `btn-${size}`,
      { 'btn-block': block, 'is-loading': loading }
    ]"
    :disabled="disabled || loading"
    @click="$emit('click', $event)"
  >
    <span v-if="loading" class="spinner"></span>
    <slot></slot>
  </button>
</template>

<script setup>
defineProps({
  variant: { type: String, default: 'primary' }, // primary, success, danger, outline, ghost
  size: { type: String, default: 'md' }, // sm, md, lg
  block: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
  loading: { type: Boolean, default: false }
});

defineEmits(['click']);
</script>

<style scoped>
.base-btn {
  font-family: inherit;
  font-weight: 600;
  border-radius: var(--radius-md);
  border: none;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: all 0.2s ease-in-out;
  text-decoration: none;
  line-height: 1;
}

/* Sizes */
.btn-sm {
  padding: 8px 16px;
  font-size: 0.9rem;
  border-radius: var(--radius-sm);
}

.btn-md {
  padding: 12px 24px;
  font-size: 1rem;
}

.btn-lg {
  padding: 16px 32px;
  font-size: 1.15rem;
  border-radius: var(--radius-lg);
}

/* Variants */
.btn-primary {
  background: var(--primary-gradient);
  color: #ffffff;
  box-shadow: 0 4px 12px rgba(79, 70, 229, 0.25);
}
.btn-primary:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(79, 70, 229, 0.35);
}

.btn-success {
  background: var(--accent-solution-gradient);
  color: #ffffff;
  box-shadow: 0 4px 12px rgba(16, 185, 129, 0.25);
}
.btn-success:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(16, 185, 129, 0.35);
}

.btn-danger {
  background: var(--accent-exam-gradient);
  color: #ffffff;
  box-shadow: 0 4px 12px rgba(239, 68, 68, 0.25);
}
.btn-danger:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(239, 68, 68, 0.35);
}

.btn-outline {
  background: transparent;
  color: var(--primary-color);
  border: 2px solid var(--primary-color);
}
.btn-outline:hover:not(:disabled) {
  background: rgba(79, 70, 229, 0.08);
}

.btn-ghost {
  background: #f1f5f9;
  color: var(--text-main);
}
.btn-ghost:hover:not(:disabled) {
  background: #e2e8f0;
}

.btn-block {
  width: 100%;
}

.base-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none !important;
  box-shadow: none !important;
}

.spinner {
  width: 18px;
  height: 18px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: #ffffff;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}
</style>
