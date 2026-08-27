<template>
  <section class="attendance-section">
    <div class="attendance-content">
      <div class="days-row">
        <div 
          v-for="(day, index) in calendarDays" 
          :key="index"
          class="day-card"
          :class="{ active: selectedDayIndex === index }"
          @click="selectDay(index)"
        >
          <span class="day-name">{{ day.name }}</span>
          <span class="day-date">{{ day.date }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import '@/assets/styles/student-design.css';

const props = defineProps({
  selectedDayIndex: {
    type: Number,
    default: 2
  },
  calendarDays: {
    type: Array,
    default: () => [
      { name: 'أحد', date: '25' },
      { name: 'إثن', date: '26' },
      { name: 'ثلا', date: '27' },
      { name: 'أرب', date: '28' },
      { name: 'خمي', date: '29' }
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
/* Using student-design.css classes: attendance-section, attendance-content, days-row, day-card, day-name, day-date */
</style>
