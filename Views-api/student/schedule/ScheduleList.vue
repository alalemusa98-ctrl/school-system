<template>
  <main class="hw-container">
    <!-- Loading State -->
    <div v-if="loading" class="loading-state">
      جاري استرجاع جدول الحصص المدرسية... ⏳
    </div>

    <!-- Main Schedule Days List -->
    <div v-else class="schedule-days-list">
      <article 
        v-for="day in daysOfWeek" 
        :key="day.id" 
        class="sched-ref-card"
      >
        <!-- 1. رقم اليوم في النتوء العلوي (دائري 54px وإطار أبيض 8px) -->
        <div class="sched-ref-top-notch">
          {{ day.num }}
        </div>

        <!-- 2. اسم اليوم في رأس الكارد -->
        <div class="sched-ref-header-info">
          <h3 class="sched-ref-day-title">جدول يوم {{ day.name }}</h3>
        </div>

        <!-- 3. شبكة الحصص المدرسية (3 عناصر في كل صف) -->
        <div v-if="getSlotsForDay(day.id).length === 0" class="sched-no-lessons">
          ☀️ لا توجد حصص دراسية مقررة لهذا اليوم.
        </div>

        <div v-else class="sched-ref-grid">
          <div 
            v-for="slot in getSlotsForDay(day.id)" 
            :key="slot.id" 
            class="sched-subject-squircle"
            :class="{ highlighted: selectedSubject !== 'ALL' && getSubjectId(slot.subject_name) === selectedSubject }"
          >
            <!-- Squircle Subject Icon (صورة 3D أو إيموجي للمواد بدون صورة) -->
            <div class="sched-icon-box" :class="getSubjectColorClass(slot.subject_name)">
              <img v-if="getSubjectImage(slot.subject_name)" :src="getSubjectImage(slot.subject_name)" class="subject-3d-icon-render" alt="" />
              <span v-else>{{ getSubjectIcon(slot.subject_name) }}</span>
            </div>

            <!-- Period Slot Badge -->
            <span class="sched-period-tag">الحصة {{ slot.slot_number }}</span>

            <!-- Subject Name -->
            <h4 class="sched-subject-name" :title="slot.subject_name">{{ slot.subject_name }}</h4>

            <!-- Teacher Name -->
            <span class="sched-teacher-name" :title="slot.teacher_name || 'أستاذ المادة'">
              {{ slot.teacher_name || 'أستاذ المادة' }}
            </span>
          </div>
        </div>

        <!-- 4. تاريخ اليوم في الأسفل -->
        <div class="sched-ref-footer-date">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
            <line x1="16" y1="2" x2="16" y2="6"></line>
            <line x1="8" y1="2" x2="8" y2="6"></line>
            <line x1="3" y1="10" x2="21" y2="10"></line>
          </svg>
          <span>تاريخ اليوم: {{ getDayDateFormatted(day.id) }}</span>
        </div>
      </article>
    </div>
  </main>
</template>

<script setup>
import mathImg from '@/assets/math_3d.jpg';
import scienceImg from '@/assets/science_3d.jpg';
import englishImg from '@/assets/english_3d.jpg';
import islamicImg from '@/assets/islamic_3d.jpg';

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
  { id: 1, day_of_week: 1, slot_number: 1, subject_name: 'الرياضيات', teacher_name: 'أ. أحمد سالم' },
  { id: 2, day_of_week: 1, slot_number: 2, subject_name: 'العلوم العامة', teacher_name: 'أ. فاطمة العبيدي' },
  { id: 3, day_of_week: 1, slot_number: 3, subject_name: 'اللغة العربية', teacher_name: 'أ. عمر الشريف' },
  { id: 4, day_of_week: 1, slot_number: 4, subject_name: 'اللغة الإنجليزية', teacher_name: 'أ. مريم الفيتوري' },
  { id: 5, day_of_week: 1, slot_number: 5, subject_name: 'التربية الإسلامية', teacher_name: 'أ. أسامة علي' },
  { id: 6, day_of_week: 1, slot_number: 6, subject_name: 'الرياضيات', teacher_name: 'أ. أحمد سالم' },
  // Day 2
  { id: 7, day_of_week: 2, slot_number: 1, subject_name: 'العلوم العامة', teacher_name: 'أ. فاطمة العبيدي' },
  { id: 8, day_of_week: 2, slot_number: 2, subject_name: 'اللغة الإنجليزية', teacher_name: 'أ. مريم الفيتوري' },
  { id: 9, day_of_week: 2, slot_number: 3, subject_name: 'الرياضيات', teacher_name: 'أ. أحمد سالم' }
];

function getSlotsForDay(dayId) {
  const filtered = props.scheduleSlots.filter(s => s.day_of_week === dayId);
  if (filtered.length > 0) return filtered;
  return fallbackSlots.filter(s => s.day_of_week === dayId);
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

function getSubjectId(name) {
  if (!name) return 'other';
  if (name.includes('رياضيات')) return 'math';
  if (name.includes('علوم')) return 'science';
  if (name.includes('عرب')) return 'arabic';
  if (name.includes('إنجليز')) return 'english';
  if (name.includes('إسلام')) return 'islamic';
  return 'other';
}

function getSubjectColorClass(name) {
  const id = getSubjectId(name);
  if (id === 'math') return 'math';
  if (id === 'science') return 'science';
  if (id === 'arabic') return 'arabic';
  if (id === 'english') return 'english';
  if (id === 'islamic') return 'islamic';
  return 'default';
}

function getSubjectImage(name) {
  if (!name) return null;
  if (name.includes('رياضيات')) return mathImg || '/images/math_3d.jpg';
  if (name.includes('علوم')) return scienceImg || '/images/science_3d.jpg';
  if (name.includes('إنجليز')) return englishImg || '/images/english_3d.jpg';
  if (name.includes('إسلام')) return islamicImg || '/images/islamic_3d.jpg';
  return null;
}

function getSubjectIcon(name) {
  if (!name) return '📚';
  if (name.includes('عرب')) return '📖';
  if (name.includes('حاسوب')) return '💻';
  if (name.includes('اجتماع')) return '🌍';
  return '📚';
}
</script>

<style scoped>
.hw-container {
  padding: 16px;
}

.loading-state, .sched-no-lessons {
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

.sched-ref-card {
  background: #ffffff;
  border-radius: 24px;
  padding: 24px 20px 16px;
  position: relative;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05);
  border: 1px solid #f1f5f9;
}

.sched-ref-top-notch {
  width: 54px;
  height: 54px;
  background: linear-gradient(352deg, rgba(16, 185, 129, 0.62) 0%, rgba(167, 243, 208, 0.7) 100%);
  color: #ffffff;
  font-size: 22px;
  font-weight: 800;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: -22px;
  left: 50%;
  transform: translateX(-50%);
  border: 8px solid #fff;
  box-shadow: 0 6px 14px rgba(16, 185, 129, 0.35) inset;
}

.sched-ref-header-info {
  text-align: center;
  margin-bottom: 16px;
}

.sched-ref-day-title {
  font-size: 18px;
  font-weight: 800;
  color: #0f172a;
  margin: 0;
}

/* 3-Column Grid for Schedule Slots */
.sched-ref-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  margin-bottom: 16px;
}

.sched-subject-squircle {
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 20px;
  padding: 14px 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  transition: all 0.2s ease;
}

.sched-subject-squircle.highlighted {
  border-color: #10b981;
  background: #ecfdf5;
  box-shadow: 0 4px 12px rgba(16, 185, 129, 0.2);
}

.sched-icon-box {
  width: 46px;
  height: 46px;
  border-radius: 14px;
  background: #f1f5f9;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 22px;
  overflow: hidden;
  border: 1px solid #e2e8f0;
}

.subject-3d-icon-render {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 12px;
}

.sched-period-tag {
  font-size: 11px;
  font-weight: 800;
  padding: 2px 8px;
  border-radius: 8px;
  background: #d1fae5;
  color: #065f46;
}

.sched-subject-name {
  font-size: 13px;
  font-weight: 800;
  color: #1e293b;
  margin: 2px 0 0;
  text-align: center;
}

.sched-teacher-name {
  font-size: 11px;
  color: #64748b;
  font-weight: 500;
}

.sched-ref-footer-date {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding-top: 12px;
  border-top: 1px dashed #e2e8f0;
  font-size: 13px;
  font-weight: 600;
  color: #64748b;
}
</style>
