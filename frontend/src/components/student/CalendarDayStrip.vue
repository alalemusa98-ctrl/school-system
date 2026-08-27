<template>
  <div class="calendar-day-strip">
    <div
      v-for="(day, index) in weekDays"
      :key="index"
      class="day-pill"
      :class="{ 'is-today': day.isToday, 'is-selected': selectedDay === day.dayNumber }"
      @click="selectDay(day.dayNumber)"
    >
      <span class="day-name">{{ day.name }}</span>
      <span class="day-number">{{ day.dateFormatted }}</span>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const emit = defineEmits(['select-day']);

const selectedDay = ref(null);

const weekDays = computed(() => {
  const days = [
    { name: 'الأحد', dayNumber: 1 },
    { name: 'الإثنين', dayNumber: 2 },
    { name: 'الثلاثاء', dayNumber: 3 },
    { name: 'الأربعاء', dayNumber: 4 },
    { name: 'الخميس', dayNumber: 5 }
  ];

  const today = new Date();
  const currentDayIndex = today.getDay(); // 0 is Sunday, 1 Monday, etc.

  return days.map(d => ({
    ...d,
    isToday: currentDayIndex === (d.dayNumber % 7),
    dateFormatted: d.dayNumber
  }));
});

function selectDay(dayNum) {
  selectedDay.value = selectedDay.value === dayNum ? null : dayNum;
  emit('select-day', selectedDay.value);
}
</script>

<style scoped>
.calendar-day-strip {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 8px;
  margin: 16px 0 24px 0;
}

.day-pill {
  background: #ffffff;
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-md);
  padding: 10px 4px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
}

.day-pill:hover {
  background: #f8fafc;
}

.day-pill.is-today {
  border-color: var(--student-purple);
  background: rgba(124, 58, 237, 0.05);
}

.day-pill.is-today .day-name {
  color: var(--student-purple);
  font-weight: 800;
}

.day-pill.is-selected {
  background: var(--brand-gradient);
  color: #ffffff;
  border-color: transparent;
  box-shadow: 0 4px 14px rgba(124, 58, 237, 0.25);
  transform: translateY(-2px);
}

.day-pill.is-selected .day-name,
.day-pill.is-selected .day-number {
  color: #ffffff;
}

.day-name {
  font-size: 0.75rem;
  font-weight: 700;
  color: var(--text-muted);
}

.day-number {
  font-size: 1rem;
  font-weight: 900;
  color: var(--text-main);
}
</style>
