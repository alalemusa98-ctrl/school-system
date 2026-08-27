<template>
  <Teleport to="body">
    <Transition name="shadcn-dialog">
      <div v-if="modelValue" class="shadcn-dialog-overlay" @click.self="close">
        <div class="shadcn-dialog-content" role="dialog" aria-modal="true">
          <!-- Header -->
          <div class="shadcn-dialog-header">
            <div class="shadcn-dialog-title-group">
              <h2 class="shadcn-dialog-title">
                <span v-if="icon" class="dialog-icon">{{ icon }}</span>
                {{ title }}
              </h2>
              <p v-if="description" class="shadcn-dialog-description">
                {{ description }}
              </p>
            </div>

            <!-- Close Button (Shadcn style X) -->
            <button class="shadcn-dialog-close" @click="close" aria-label="إغلاق">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>

          <!-- Body -->
          <div class="shadcn-dialog-body">
            <slot></slot>
          </div>

          <!-- Footer -->
          <div class="shadcn-dialog-footer">
            <slot name="footer">
              <button class="shadcn-btn-secondary" @click="close">
                إغلاق
              </button>
            </slot>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { onMounted, onUnmounted, watch } from 'vue';

const props = defineProps({
  modelValue: { type: Boolean, default: false },
  title: { type: String, default: '' },
  description: { type: String, default: '' },
  icon: { type: String, default: '' }
});

const emit = defineEmits(['update:modelValue', 'close']);

function close() {
  emit('update:modelValue', false);
  emit('close');
}

// Lock body scroll when dialog is open
watch(() => props.modelValue, (isOpen) => {
  if (isOpen) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = '';
  }
});

function handleKeyDown(e) {
  if (e.key === 'Escape' && props.modelValue) {
    close();
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeyDown);
});

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyDown);
  document.body.style.overflow = '';
});
</script>

<style scoped>
/* Shadcn UI Dialog Overlay & Animation */
.shadcn-dialog-overlay {
  position: fixed;
  inset: 0;
  z-index: 9999;
  background: rgba(15, 23, 42, 0.65);
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
  direction: rtl;
}

.shadcn-dialog-content {
  background: #ffffff;
  border-radius: 20px;
  border: 1px solid rgba(226, 232, 240, 0.9);
  width: 100%;
  max-width: 520px;
  box-shadow: 0 25px 50px -12px rgba(15, 23, 42, 0.25), 0 10px 20px -5px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  position: relative;
}

/* Header */
.shadcn-dialog-header {
  padding: 20px 24px 16px;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  border-bottom: 1px solid #f1f5f9;
}

.shadcn-dialog-title-group {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.shadcn-dialog-title {
  font-size: 18px;
  font-weight: 800;
  color: #0f172a;
  display: flex;
  align-items: center;
  gap: 8px;
  line-height: 1.3;
}

.dialog-icon {
  font-size: 20px;
}

.shadcn-dialog-description {
  font-size: 13px;
  color: #64748b;
  font-weight: 600;
  line-height: 1.4;
}

.shadcn-dialog-close {
  width: 32px;
  height: 32px;
  border-radius: 10px;
  border: 1px solid #e2e8f0;
  background: #f8fafc;
  color: #64748b;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  flex-shrink: 0;
}

.shadcn-dialog-close:hover {
  background: #f1f5f9;
  color: #0f172a;
  border-color: #cbd5e1;
}

/* Body */
.shadcn-dialog-body {
  padding: 20px 24px;
  font-size: 14px;
  color: #334155;
  line-height: 1.6;
}

/* Footer */
.shadcn-dialog-footer {
  padding: 16px 24px;
  border-top: 1px solid #f1f5f9;
  background: #f8fafc;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 10px;
}

/* Shadcn Buttons */
.shadcn-btn-primary {
  background: #0f172a;
  color: #ffffff;
  border: none;
  padding: 10px 20px;
  border-radius: 12px;
  font-family: inherit;
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  transition: all 0.2s ease;
  box-shadow: 0 4px 12px rgba(15, 23, 42, 0.15);
}

.shadcn-btn-primary:hover {
  background: #1e293b;
  transform: translateY(-1px);
}

.shadcn-btn-secondary {
  background: #ffffff;
  color: #475569;
  border: 1px solid #cbd5e1;
  padding: 10px 18px;
  border-radius: 12px;
  font-family: inherit;
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s ease;
}

.shadcn-btn-secondary:hover {
  background: #f1f5f9;
  color: #0f172a;
}

/* Vue Transitions matching Shadcn UI zoom-in effect */
.shadcn-dialog-enter-active,
.shadcn-dialog-leave-active {
  transition: opacity 0.25s ease, transform 0.25s cubic-bezier(0.16, 1, 0.3, 1);
}

.shadcn-dialog-enter-from,
.shadcn-dialog-leave-to {
  opacity: 0;
}

.shadcn-dialog-enter-from .shadcn-dialog-content {
  transform: scale(0.95) translateY(10px);
}

.shadcn-dialog-leave-to .shadcn-dialog-content {
  transform: scale(0.95) translateY(10px);
}
</style>
