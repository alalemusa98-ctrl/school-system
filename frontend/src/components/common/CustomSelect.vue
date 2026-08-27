<template>
  <div 
    class="custom-select-wrapper" 
    :style="{ width: customWidth }" 
    ref="wrapperRef"
    v-click-outside="closeDropdown"
  >
    <!-- iOS Style Select Trigger Button -->
    <button 
      type="button"
      class="ios-select-trigger" 
      :class="{ open: isOpen, disabled: disabled }"
      @click="toggleDropdown"
      :disabled="disabled"
      :aria-expanded="isOpen"
    >
      <span class="trigger-label">
        <span v-if="selectedOption" class="selected-text">{{ selectedOption.label }}</span>
        <span v-else class="placeholder-text">{{ placeholder }}</span>
      </span>
      <svg 
        class="chevron-icon" 
        :class="{ rotated: isOpen }" 
        width="14" 
        height="14" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="#007aff" 
        stroke-width="2.5" 
        stroke-linecap="round" 
        stroke-linejoin="round"
      >
        <path d="M6 9l6 6 6-6"/>
      </svg>
    </button>

    <!-- iOS Style Floating Popover Menu -->
    <transition name="ios-menu-anim">
      <div v-if="isOpen" class="ios-select-menu" :style="{ minWidth: minMenuWidth }">
        <!-- Default Ungrouped List -->
        <div v-if="normalizedOptions.length > 0" class="options-list">
          <div 
            v-for="opt in normalizedOptions" 
            :key="opt.value"
            class="ios-select-option"
            :class="{ selected: isSelected(opt.value) }"
            @click="selectOption(opt)"
          >
            <span class="option-label-text">{{ opt.label }}</span>
            <svg 
              v-if="isSelected(opt.value)" 
              class="check-icon" 
              width="16" 
              height="16" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="#007aff" 
              stroke-width="2.8" 
              stroke-linecap="round" 
              stroke-linejoin="round"
            >
              <polyline points="20 6 9 17 4 12"/>
            </svg>
          </div>
        </div>

        <!-- Grouped List with Separators -->
        <template v-if="groups && groups.length > 0">
          <div v-for="(group, idx) in groups" :key="group.title || idx" class="options-group-block">
            <div v-if="idx > 0 || normalizedOptions.length > 0" class="ios-select-separator"></div>
            <div v-if="group.title" class="group-header-label">{{ group.title }}</div>
            <div 
              v-for="opt in group.options" 
              :key="opt.value"
              class="ios-select-option"
              :class="{ selected: isSelected(opt.value) }"
              @click="selectOption(opt)"
            >
              <span class="option-label-text">{{ opt.label }}</span>
              <svg 
                v-if="isSelected(opt.value)" 
                class="check-icon" 
                width="16" 
                height="16" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="#007aff" 
                stroke-width="2.8" 
                stroke-linecap="round" 
                stroke-linejoin="round"
              >
                <polyline points="20 6 9 17 4 12"/>
              </svg>
            </div>
          </div>
        </template>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';

const props = defineProps({
  modelValue: {
    type: [String, Number],
    default: ''
  },
  options: {
    type: Array,
    default: () => []
  },
  groups: {
    type: Array,
    default: null
  },
  placeholder: {
    type: String,
    default: 'اختر من القائمة...'
  },
  width: {
    type: String,
    default: 'auto'
  },
  disabled: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['update:modelValue', 'change']);

const isOpen = ref(false);
const wrapperRef = ref(null);

const customWidth = computed(() => {
  if (!props.width) return 'auto';
  return typeof props.width === 'number' ? `${props.width}px` : props.width;
});

const minMenuWidth = computed(() => {
  return customWidth.value === 'auto' ? '190px' : customWidth.value;
});

const normalizedOptions = computed(() => {
  return props.options.map(item => {
    if (typeof item === 'object' && item !== null) {
      return {
        value: item.value !== undefined ? item.value : item.id,
        label: item.label !== undefined ? item.label : (item.name || String(item.value))
      };
    }
    return { value: item, label: String(item) };
  });
});

const selectedOption = computed(() => {
  const allOpts = [...normalizedOptions.value];
  if (props.groups) {
    props.groups.forEach(g => {
      if (g.options) allOpts.push(...g.options);
    });
  }
  return allOpts.find(o => String(o.value) === String(props.modelValue));
});

const isSelected = (val) => {
  return String(props.modelValue) === String(val);
};

const toggleDropdown = () => {
  if (props.disabled) return;
  isOpen.value = !isOpen.value;
};

const closeDropdown = () => {
  isOpen.value = false;
};

const selectOption = (opt) => {
  emit('update:modelValue', opt.value);
  emit('change', opt.value);
  closeDropdown();
};

const vClickOutside = {
  mounted(el, binding) {
    el.clickOutsideEvent = (event) => {
      if (!(el === event.target || el.contains(event.target))) {
        binding.value();
      }
    };
    document.addEventListener('click', el.clickOutsideEvent);
  },
  unmounted(el) {
    document.removeEventListener('click', el.clickOutsideEvent);
  }
};

const handleKeyDown = (e) => {
  if (e.key === 'Escape' && isOpen.value) {
    closeDropdown();
  }
};

onMounted(() => {
  window.addEventListener('keydown', handleKeyDown);
});

onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleKeyDown);
});
</script>

<style scoped>
.custom-select-wrapper {
  position: relative;
  display: inline-block;
  font-family: -apple-system, BlinkMacSystemFont, "SF Pro Text", "SF Pro Display", "Readex Pro", sans-serif;
  direction: rtl;
  text-align: right;
}

/* iOS Style Pill Trigger */
.ios-select-trigger {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  width: 100%;
  background: #ffffff;
  border: 1px solid #e5e5ea;
  border-radius: 999px;
  padding: 8px 18px 8px 14px;
  font-family: inherit;
  font-size: 13.5px;
  font-weight: 600;
  color: #1c1c1e;
  cursor: pointer;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.04);
  transition: all 0.16s cubic-bezier(0.16, 1, 0.3, 1);
  outline: none;
  user-select: none;
}

.ios-select-trigger:hover {
  background: #f2f2f7;
  border-color: #d1d1d6;
}

.ios-select-trigger:active {
  transform: scale(0.98);
  background: #e5e5ea;
}

.ios-select-trigger.open {
  border-color: #007aff;
  box-shadow: 0 0 0 3px rgba(0, 122, 255, 0.14);
  background: #ffffff;
}

.ios-select-trigger.disabled {
  opacity: 0.55;
  cursor: not-allowed;
}

.trigger-label {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.selected-text {
  color: #1c1c1e;
  font-weight: 600;
}

.placeholder-text {
  color: #8e8e93;
}

.chevron-icon {
  flex-shrink: 0;
  transition: transform 0.18s ease;
}

.chevron-icon.rotated {
  transform: rotate(180deg);
}

/* iOS & Shadcn Floating Menu */
.ios-select-menu,
.shadcn-select-menu {
  position: absolute;
  top: calc(100% + 6px);
  right: 0;
  z-index: 999;
  width: 100%;
  background: #ffffff;
  border-radius: 16px;
  border: 1px solid rgba(0, 0, 0, 0.08);
  box-shadow: 0 14px 36px rgba(0, 0, 0, 0.12), 0 4px 12px rgba(0, 0, 0, 0.04);
  padding: 6px;
  max-height: 150px;
  overflow-y: auto;
}

.options-list {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.group-header-label {
  font-size: 11px;
  font-weight: 700;
  color: #8e8e93;
  padding: 6px 14px 2px 14px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.ios-select-option {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 10px 14px;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 500;
  color: #1c1c1e;
  cursor: pointer;
  transition: background 0.14s ease, color 0.14s ease;
  user-select: none;
}

.ios-select-option:hover {
  background: #f2f2f7;
  color: #000000;
}

.ios-select-option.selected {
  font-weight: 600;
  color: #007aff;
  background: rgba(0, 122, 255, 0.06);
}

.check-icon {
  flex-shrink: 0;
  margin-left: 4px;
}

.ios-select-separator {
  height: 1px;
  background: #e5e5ea;
  margin: 4px 0;
}

/* Slim Scrollbar */
.ios-select-menu::-webkit-scrollbar {
  width: 5px;
}

.ios-select-menu::-webkit-scrollbar-track {
  background: transparent;
}

.ios-select-menu::-webkit-scrollbar-thumb {
  background: #c7c7cc;
  border-radius: 10px;
}

/* iOS Animation */
.ios-menu-anim-enter-active,
.ios-menu-anim-leave-active {
  transition: opacity 0.15s ease-out, transform 0.15s cubic-bezier(0.16, 1, 0.3, 1);
}

.ios-menu-anim-enter-from,
.ios-menu-anim-leave-to {
  opacity: 0;
  transform: translateY(-6px) scale(0.98);
}
</style>
