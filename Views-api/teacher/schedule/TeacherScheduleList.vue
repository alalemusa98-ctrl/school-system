<template>
  <main class="hw-container">
    <!-- Loading State -->
    <div v-if="loading" class="loading-state">
      جاري استرجاع جدول حصص المعلم... ⏳
    </div>

    <!-- Main Schedule Days List (Using Shared AppGroupCard with 3 columns) -->
    <div v-else class="schedule-days-list">
      <AppGroupCard
        v-for="day in daysOfWeek"
        :key="day.id"
        :index="day.num"
        :title="`جدول يوم ${day.name}`"
        :columns="3"
        :items="getSlotsForDayFormatted(day.id)"
        :date="getDayDateFormatted(day.id)"
        dateLabel="تاريخ اليوم"
        notchGradient="linear-gradient(352deg, rgba(16, 185, 129, 0.8) 0%, rgba(167, 243, 208, 0.9) 100%)"
        @item-click="(slot) => $emit('item-click', slot)"
      />
    </div>
  </main>
</template>

<script setup>
import AppGroupCard from '../../shared/AppGroupCard.vue';

const props = defineProps({
  loading: { type: Boolean, default: false },
  daysOfWeek: {
    type: Array,
    default: () => [
      { id: 1, name: 'الأحد', num: '1' },
      { id: 2, name: 'الإثنين', num: '2' },
      { id: 3, name: 'الثلاثاء', num: '3' },
      { id: 4, name: 'الأربعاء', num: '4' },
      { id: 5, name: 'الخميس', num: '5' }
    ]
  },
  scheduleSlots: { type: Array, default: () => [] }
});

const emit = defineEmits(['item-click', 'select-slot']);

const fallbackSlots = [
  // Day 1: Sunday
  { id: 1, day_of_week: 1, slot_number: 1, subject_name: 'الرياضيات', grade_name: 'الصف الخامس', section_name: 'أ5', room_name: 'قاعة 4' },
  { id: 2, day_of_week: 1, slot_number: 2, subject_name: 'الرياضيات', grade_name: 'الصف الخامس', section_name: 'ب5', room_name: 'قاعة 5' },
  { id: 3, day_of_week: 1, slot_number: 3, subject_name: 'الرياضيات', grade_name: 'الصف السادس', section_name: 'أ6', room_name: 'قاعة 8' },
  { id: 4, day_of_week: 1, slot_number: 4, subject_name: 'العلوم العامة', grade_name: 'الصف الخامس', section_name: 'أ5', room_name: 'مختبر العلوم' },
  { id: 5, day_of_week: 1, slot_number: 5, subject_name: 'التربية الإسلامية', grade_name: 'الصف الخامس', section_name: 'أ5', room_name: 'قاعة 4' },
  { id: 6, day_of_week: 1, slot_number: 6, subject_name: 'الرياضيات', grade_name: 'الصف السادس', section_name: 'أ6', room_name: 'قاعة 8' },
  
  // Day 2: Monday
  { id: 7, day_of_week: 2, slot_number: 1, subject_name: 'الرياضيات', grade_name: 'الصف الخامس', section_name: 'أ5', room_name: 'قاعة 4' },
  { id: 8, day_of_week: 2, slot_number: 2, subject_name: 'العلوم العامة', grade_name: 'الصف السادس', section_name: 'أ6', room_name: 'مختبر العلوم' },
  { id: 9, day_of_week: 2, slot_number: 3, subject_name: 'الرياضيات', grade_name: 'الصف الخامس', section_name: 'ب5', room_name: 'قاعة 5' },
  { id: 10, day_of_week: 2, slot_number: 4, subject_name: 'اللغة الإنجليزية', grade_name: 'الصف السادس', section_name: 'أ6', room_name: 'قاعة 8' },

  // Day 3: Tuesday
  { id: 11, day_of_week: 3, slot_number: 1, subject_name: 'الرياضيات', grade_name: 'الصف السادس', section_name: 'أ6', room_name: 'قاعة 8' },
  { id: 12, day_of_week: 3, slot_number: 2, subject_name: 'الرياضيات', grade_name: 'الصف الخامس', section_name: 'أ5', room_name: 'قاعة 4' },
  { id: 13, day_of_week: 3, slot_number: 3, subject_name: 'العلوم العامة', grade_name: 'الصف الخامس', section_name: 'ب5', room_name: 'مختبر العلوم' },

  // Day 4: Wednesday
  { id: 14, day_of_week: 4, slot_number: 1, subject_name: 'الرياضيات', grade_name: 'الصف الخامس', section_name: 'ب5', room_name: 'قاعة 5' },
  { id: 15, day_of_week: 4, slot_number: 2, subject_name: 'التربية الإسلامية', grade_name: 'الصف الخامس', section_name: 'أ5', room_name: 'قاعة 4' },
  { id: 16, day_of_week: 4, slot_number: 3, subject_name: 'الرياضيات', grade_name: 'الصف السادس', section_name: 'أ6', room_name: 'قاعة 8' },

  // Day 5: Thursday
  { id: 17, day_of_week: 5, slot_number: 1, subject_name: 'الرياضيات', grade_name: 'الصف الخامس', section_name: 'أ5', room_name: 'قاعة 4' },
  { id: 18, day_of_week: 5, slot_number: 2, subject_name: 'العلوم العامة', grade_name: 'الصف السادس', section_name: 'أ6', room_name: 'مختبر العلوم' },
  { id: 19, day_of_week: 5, slot_number: 3, subject_name: 'الرياضيات', grade_name: 'الصف الخامس', section_name: 'ب5', room_name: 'قاعة 5' }
];

function getSlotsForDay(dayId) {
  if (props.scheduleSlots && props.scheduleSlots.length > 0) {
    return props.scheduleSlots.filter(s => s.day_of_week === dayId);
  }
  return fallbackSlots.filter(s => s.day_of_week === dayId);
}

function getSlotsForDayFormatted(dayId) {
  const slots = getSlotsForDay(dayId);
  return slots.map(s => ({
    ...s,
    id: s.id,
    title: s.subject_name,
    subtitle: `${s.grade_name} (${s.section_name})`,
    grade_name: s.grade_name,
    section_name: s.section_name,
    badge: `الحصة ${s.slot_number}`,
    subject_name: s.subject_name
  }));
}

function getDayDateFormatted(dayId) {
  const dates = {
    1: '16 أغسطس 2026',
    2: '17 أغسطس 2026',
    3: '18 أغسطس 2026',
    4: '19 أغسطس 2026',
    5: '20 أغسطس 2026'
  };
  return dates[dayId] || 'أغسطس 2026';
}
</script>

<style scoped>
.hw-container {
  padding: 16px;
}

.loading-state {
  text-align: center;
  padding: 32px 16px;
  background: #ffffff;
  border-radius: 20px;
  font-weight: 700;
  color: #64748b;
  border: 1px dashed #cbd5e1;
}

.schedule-days-list {
  display: flex;
  flex-direction: column;
  gap: 24px;
}
</style>
