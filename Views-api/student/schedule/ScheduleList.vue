<template>
  <main class="hw-container">
    <!-- Loading State -->
    <div v-if="loading" class="loading-state">
      جاري استرجاع جدول الحصص المدرسية... ⏳
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
      />
    </div>
  </main>
</template>

<script setup>
import AppGroupCard from '../../shared/AppGroupCard.vue';

const props = defineProps({
  loading: { type: Boolean, default: false },
  selectedSubject: { type: String, default: 'ALL' },
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

const fallbackSlots = [
  // Day 1
  { id: 1, day_of_week: 1, slot_number: 1, subject_name: 'الرياضيات', teacher_name: 'أ. أحمد سالم' },
  { id: 2, day_of_week: 1, slot_number: 2, subject_name: 'العلوم العامة', teacher_name: 'أ. فاطمة العبيدي' },
  { id: 3, day_of_week: 1, slot_number: 3, subject_name: 'اللغة العربية', teacher_name: 'أ. عمر الشريف' },
  { id: 4, day_of_week: 1, slot_number: 4, subject_name: 'اللغة الإنجليزية', teacher_name: 'أ. مريم الفيتوري' },
  { id: 5, day_of_week: 1, slot_number: 5, subject_name: 'التربية الإسلامية', teacher_name: 'أ. أسامة علي' },
  { id: 6, day_of_week: 1, slot_number: 6, subject_name: 'الرياضيات', teacher_name: 'أ. أحمد سالم' },
  // Day 2
  { id: 7, day_of_week: 2, slot_number: 1, subject_name: 'العلوم العامة', teacher_name: 'أ. فاطمة العبيدي' },
  { id: 8, day_of_week: 2, slot_number: 2, subject_name: 'اللغة الإنجليزية', teacher_name: 'أ. مريم الفيتوري' },
  { id: 9, day_of_week: 2, slot_number: 3, subject_name: 'الرياضيات', teacher_name: 'أ. أحمد سالم' },
  { id: 10, day_of_week: 2, slot_number: 4, subject_name: 'التربية الإسلامية', teacher_name: 'أ. أسامة علي' },
  { id: 11, day_of_week: 2, slot_number: 5, subject_name: 'اللغة العربية', teacher_name: 'أ. عمر الشريف' },
  { id: 12, day_of_week: 2, slot_number: 6, subject_name: 'الحاسوب', teacher_name: 'أ. طارق محمود' },
  // Day 3
  { id: 13, day_of_week: 3, slot_number: 1, subject_name: 'اللغة العربية', teacher_name: 'أ. عمر الشريف' },
  { id: 14, day_of_week: 3, slot_number: 2, subject_name: 'الرياضيات', teacher_name: 'أ. أحمد سالم' },
  { id: 15, day_of_week: 3, slot_number: 3, subject_name: 'العلوم العامة', teacher_name: 'أ. فاطمة العبيدي' },
  { id: 16, day_of_week: 3, slot_number: 4, subject_name: 'اللغة الإنجليزية', teacher_name: 'أ. مريم الفيتوري' },
  // Day 4
  { id: 17, day_of_week: 4, slot_number: 1, subject_name: 'التربية الإسلامية', teacher_name: 'أ. أسامة علي' },
  { id: 18, day_of_week: 4, slot_number: 2, subject_name: 'اللغة العربية', teacher_name: 'أ. عمر الشريف' },
  { id: 19, day_of_week: 4, slot_number: 3, subject_name: 'الرياضيات', teacher_name: 'أ. أحمد سالم' },
  // Day 5
  { id: 20, day_of_week: 5, slot_number: 1, subject_name: 'العلوم العامة', teacher_name: 'أ. فاطمة العبيدي' },
  { id: 21, day_of_week: 5, slot_number: 2, subject_name: 'اللغة الإنجليزية', teacher_name: 'أ. مريم الفيتوري' },
  { id: 22, day_of_week: 5, slot_number: 3, subject_name: 'الرياضيات', teacher_name: 'أ. أحمد سالم' }
];

function getSlotsForDay(dayId) {
  const filtered = props.scheduleSlots.filter(s => s.day_of_week === dayId);
  if (filtered.length > 0) return filtered;
  return fallbackSlots.filter(s => s.day_of_week === dayId);
}

function getSlotsForDayFormatted(dayId) {
  const slots = getSlotsForDay(dayId);
  return slots.map(s => ({
    id: s.id,
    title: s.subject_name,
    subtitle: s.teacher_name || 'أستاذ المادة',
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
