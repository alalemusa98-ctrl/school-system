<template>
  <Teleport to="body">
    <Transition name="drawer-fade">
      <div 
        v-if="modelValue" 
        class="shadcn-drawer-backdrop"
        @click.self="close"
      >
        <div class="shadcn-drawer-panel" role="dialog" aria-modal="true">
          <!-- Header -->
          <div class="shadcn-drawer-header">
            <div class="drawer-title-group">
              <span class="drawer-emoji" v-if="icon">{{ icon }}</span>
              <div>
                <h3 class="drawer-title">{{ title }}</h3>
                <p class="drawer-desc" v-if="description">{{ description }}</p>
              </div>
            </div>
            <button class="drawer-close-btn" @click="close" aria-label="Close">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>

          <!-- Body -->
          <div class="shadcn-drawer-body">
            <slot />
          </div>

          <!-- Footer Slot -->
          <div v-if="$slots.footer" class="shadcn-drawer-footer">
            <slot name="footer" />
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { onMounted, onUnmounted, watch } from 'vue';

const props = defineProps({
  modelValue: { type: Boolean, required: true },
  title: { type: String, default: '' },
  description: { type: String, default: '' },
  icon: { type: String, default: '📝' }
});

const emit = defineEmits(['update:modelValue', 'close']);

function close() {
  emit('update:modelValue', false);
  emit('close');
}

function handleKeyDown(e) {
  if (e.key === 'Escape' && props.modelValue) {
    close();
  }
}

watch(() => props.modelValue, (val) => {
  if (val) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = '';
  }
});

onMounted(() => {
  window.addEventListener('keydown', handleKeyDown);
});

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyDown);
  document.body.style.overflow = '';
});
</script>

<style scoped>
/* Backdrop Fade Transition */
.drawer-fade-enter-active,
.drawer-fade-leave-active {
  transition: opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1);
}

.drawer-fade-enter-from,
.drawer-fade-leave-to {
  opacity: 0;
}

.shadcn-drawer-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.55);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  z-index: 9999;
  display: flex;
  justify-content: flex-end;
}

/* Panel Slide Transition for BOTH Opening and Closing (تعديل الزمن إلى 0.7 ثانية) */
.drawer-fade-enter-active .shadcn-drawer-panel,
.drawer-fade-leave-active .shadcn-drawer-panel {
  transition: transform 0.7s cubic-bezier(0.16, 1, 0.3, 1);
}

.drawer-fade-enter-from .shadcn-drawer-panel,
.drawer-fade-leave-to .shadcn-drawer-panel {
  transform: translateX(100%);
}

.shadcn-drawer-panel {
  width: 100%;
  max-width: 440px;
  height: 100%;
  background: #ffffff;
  box-shadow: -12px 0 40px rgba(0, 0, 0, 0.22);
  display: flex;
  flex-direction: column;
  position: relative;
  z-index: 10000;
  border-right: 1px solid rgba(226, 232, 240, 0.8);
  will-change: transform;
}

.shadcn-drawer-header {
  padding: 20px 24px;
  border-bottom: 1px solid #f1f5f9;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #ffffff;
}

.drawer-title-group {
  display: flex;
  align-items: center;
  gap: 12px;
}

.drawer-emoji {
  font-size: 24px;
  background: #f1f5f9;
  width: 44px;
  height: 44px;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.drawer-title {
  font-size: 17px;
  font-weight: 800;
  color: #0f172a;
  margin: 0 0 2px 0;
}

.drawer-desc {
  font-size: 12px;
  color: #64748b;
  margin: 0;
  font-weight: 600;
}

.drawer-close-btn {
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  color: #64748b;
  width: 34px;
  height: 34px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
}

.drawer-close-btn:hover {
  background: #f1f5f9;
  color: #0f172a;
  transform: scale(1.05);
}

.shadcn-drawer-body {
  padding: 24px;
  overflow-y: auto;
  flex: 1;
}

.shadcn-drawer-footer {
  padding: 16px 24px;
  border-top: 1px solid #f1f5f9;
  background: #f8fafc;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 10px;
}
</style>
