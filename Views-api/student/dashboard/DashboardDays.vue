<template>
  <section class="days-strip-section">
    <div class="days-strip-card">
      <div class="days-grid-row">
        <button 
          v-for="(day, index) in calendarDays" 
          :key="index"
          class="day-capsule-btn"
          :class="{ active: selectedDayIndex === index }"
          @click="selectDay(index)"
        >
          <span class="day-short-name">{{ day.name }}</span>
          <span class="day-num-date">{{ day.date }}</span>
        </button>
      </div>
    </div>
  </section>
</template>

<script setup>
const props = defineProps({
  selectedDayIndex: {
    type: Number,
    default: 2 // اليوم الأوسط (الثلاثاء 25)
  },
  calendarDays: {
    type: Array,
    default: () => [
      { name: 'أحد', date: '23' },
      { name: 'إثن', date: '24' },
      { name: 'ثلا', date: '25' },
      { name: 'ارب', date: '26' },
      { name: 'خمي', date: '27' }
    ]
  }
});

const emit = defineEmits(['update:selectedDayIndex', 'day-selected']);

function selectDay(index) {
  emit('update:selectedDayIndex', index);
  emit('day-selected', props.calendarDays[index]);
}
</script>

<style scoped>
.days-strip-section {
  padding: 0 16px;
  margin-top: 14px;
  margin-bottom: 18px;
}

.days-strip-card {
  background: #ffffff;
  border-radius: 22px;
  padding: 10px 12px;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.05);
  border: 1px solid #f1f5f9;
}

.days-grid-row {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 8px;
}

.day-capsule-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 10px 6px;
  border-radius: 16px;
  background: #f8fafc;
  border: 1.5px solid #e2e8f0;
  cursor: pointer;
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
}

.day-short-name {
  font-size: 13px;
  font-weight: 700;
  color: #64748b;
  margin-bottom: 2px;
}

.day-num-date {
  font-size: 16px;
  font-weight: 800;
  color: #0f172a;
}

.day-capsule-btn.active {
  background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%);
  border-color: transparent;
  box-shadow: 0 8px 18px rgba(79, 70, 229, 0.35);
  transform: translateY(-2px);
}

.day-capsule-btn.active .day-short-name,
.day-capsule-btn.active .day-num-date {
  color: #ffffff;
}
</style>
