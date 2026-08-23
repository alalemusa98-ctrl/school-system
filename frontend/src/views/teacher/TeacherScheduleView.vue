<template>
  <StudentLayout 
    pageTitle="الجدول الدراسي" 
    pageSubtitle="الجدول الدراسي"
    pageEmoji="📅"
  >
    <main class="hw-container">
      <div v-if="loading" class="loading-state">جاري استرجاع جدول الحصص الأسبوعي للمعلم... ⏳</div>

      <div v-else class="schedule-days-list">
        <article 
          v-for="day in daysOfWeek" 
          :key="day.id" 
          class="sched-ref-card"
        >
          <!-- 1. رقم اليوم في النتوء العلوي (مكان رقم 1 في الصورة) -->
          <div class="sched-ref-top-notch">
            {{ day.num }}
          </div>

          <!-- 4. اسم اليوم في رأس الكارد (مكان رقم 4 في الصورة) -->
          <div class="sched-ref-header-info">
            <h3 class="sched-ref-day-title">يوم {{ day.name }}</h3>
          </div>

          <!-- 2. شبكة المواد الحصص (في كل صف 3 عناصر كحد أقصى) -->
          <div v-if="getSlotsForDay(day.id).length === 0" class="sched-no-lessons">
            ☀️ لا توجد حصص دراسية مكلف بها لهذا اليوم.
          </div>

          <div v-else class="sched-ref-grid">
            <div 
              v-for="slot in getSlotsForDay(day.id)" 
              :key="slot.id" 
              class="sched-subject-squircle"
            >
              <!-- Squircle Subject Icon -->
              <div class="sched-icon-box" :class="getSubjectColorClass(slot.subject_name)">
                {{ getSubjectIcon(slot.subject_name) }}
              </div>

              <!-- Period Slot Badge -->
              <span class="sched-period-tag">الحصة {{ slot.slot_number }}</span>

              <!-- Subject Name -->
              <h4 class="sched-subject-name" :title="slot.subject_name">{{ slot.subject_name }}</h4>

              <!-- Class / Grade & Section Name -->
              <span class="sched-teacher-name" :title="`${slot.grade_name || 'الصف 8'} (${slot.section_name || '8أ'})`">
                {{ slot.grade_name || 'الصف الثامن' }} ({{ slot.section_name || '8أ' }})
              </span>
            </div>
          </div>

          <!-- 3. التاريخ الخاص باليوم في الأسفل (مكان رقم 3 في الصورة المرجعية) -->
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
  </StudentLayout>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import StudentLayout from '../../components/student/StudentLayout.vue';
import api from '../../services/api';

const loading = ref(true);
const scheduleSlots = ref([]);

const daysOfWeek = [
  { id: 1, name: 'الأحد', num: '1' },
  { id: 2, name: 'الإثنين', num: '2' },
  { id: 3, name: 'الثلاثاء', num: '3' },
  { id: 4, name: 'الأربعاء', num: '4' },
  { id: 5, name: 'الخميس', num: '5' }
];

const fallbackTeacherSlots = [
  // Day 1: الأحد (6 حصص)
  { id: 1, day_of_week: 1, slot_number: 1, subject_name: 'الرياضيات', grade_name: 'الصف الثامن', section_name: '8أ' },
  { id: 2, day_of_week: 1, slot_number: 2, subject_name: 'العلوم العامة', grade_name: 'الصف الثامن', section_name: '8أ' },
  { id: 3, day_of_week: 1, slot_number: 3, subject_name: 'اللغة العربية', grade_name: 'الصف التاسع', section_name: '9ب' },
  { id: 4, day_of_week: 1, slot_number: 4, subject_name: 'الرياضيات', grade_name: 'الصف الثامن', section_name: '8أ' },
  { id: 5, day_of_week: 1, slot_number: 5, subject_name: 'العلوم العامة', grade_name: 'الصف الثامن', section_name: '8أ' },
  { id: 6, day_of_week: 1, slot_number: 6, subject_name: 'اللغة العربية', grade_name: 'الصف التاسع', section_name: '9ب' },

  // Day 2: الإثنين (6 حصص)
  { id: 7, day_of_week: 2, slot_number: 1, subject_name: 'اللغة العربية', grade_name: 'الصف التاسع', section_name: '9ب' },
  { id: 8, day_of_week: 2, slot_number: 2, subject_name: 'الرياضيات', grade_name: 'الصف الثامن', section_name: '8أ' },
  { id: 9, day_of_week: 2, slot_number: 3, subject_name: 'العلوم العامة', grade_name: 'الصف الثامن', section_name: '8أ' },
  { id: 10, day_of_week: 2, slot_number: 4, subject_name: 'اللغة العربية', grade_name: 'الصف التاسع', section_name: '9ب' },
  { id: 11, day_of_week: 2, slot_number: 5, subject_name: 'الرياضيات', grade_name: 'الصف الثامن', section_name: '8أ' },
  { id: 12, day_of_week: 2, slot_number: 6, subject_name: 'العلوم العامة', grade_name: 'الصف الثامن', section_name: '8أ' },

  // Day 3: الثلاثاء (6 حصص)
  { id: 13, day_of_week: 3, slot_number: 1, subject_name: 'العلوم العامة', grade_name: 'الصف الثامن', section_name: '8أ' },
  { id: 14, day_of_week: 3, slot_number: 2, subject_name: 'اللغة العربية', grade_name: 'الصف التاسع', section_name: '9ب' },
  { id: 15, day_of_week: 3, slot_number: 3, subject_name: 'الرياضيات', grade_name: 'الصف الثامن', section_name: '8أ' },
  { id: 16, day_of_week: 3, slot_number: 4, subject_name: 'العلوم العامة', grade_name: 'الصف الثامن', section_name: '8أ' },
  { id: 17, day_of_week: 3, slot_number: 5, subject_name: 'اللغة العربية', grade_name: 'الصف التاسع', section_name: '9ب' },
  { id: 18, day_of_week: 3, slot_number: 6, subject_name: 'الرياضيات', grade_name: 'الصف الثامن', section_name: '8أ' },

  // Day 4: الأربعاء (6 حصص)
  { id: 19, day_of_week: 4, slot_number: 1, subject_name: 'الرياضيات', grade_name: 'الصف الثامن', section_name: '8أ' },
  { id: 20, day_of_week: 4, slot_number: 2, subject_name: 'العلوم العامة', grade_name: 'الصف الثامن', section_name: '8أ' },
  { id: 21, day_of_week: 4, slot_number: 3, subject_name: 'اللغة العربية', grade_name: 'الصف التاسع', section_name: '9ب' },
  { id: 22, day_of_week: 4, slot_number: 4, subject_name: 'الرياضيات', grade_name: 'الصف الثامن', section_name: '8أ' },
  { id: 23, day_of_week: 4, slot_number: 5, subject_name: 'العلوم العامة', grade_name: 'الصف الثامن', section_name: '8أ' },
  { id: 24, day_of_week: 4, slot_number: 6, subject_name: 'اللغة العربية', grade_name: 'الصف التاسع', section_name: '9ب' },

  // Day 5: الخميس (6 حصص)
  { id: 25, day_of_week: 5, slot_number: 1, subject_name: 'اللغة العربية', grade_name: 'الصف التاسع', section_name: '9ب' },
  { id: 26, day_of_week: 5, slot_number: 2, subject_name: 'الرياضيات', grade_name: 'الصف الثامن', section_name: '8أ' },
  { id: 27, day_of_week: 5, slot_number: 3, subject_name: 'العلوم العامة', grade_name: 'الصف الثامن', section_name: '8أ' },
  { id: 28, day_of_week: 5, slot_number: 4, subject_name: 'اللغة العربية', grade_name: 'الصف التاسع', section_name: '9ب' },
  { id: 29, day_of_week: 5, slot_number: 5, subject_name: 'الرياضيات', grade_name: 'الصف الثامن', section_name: '8أ' },
  { id: 30, day_of_week: 5, slot_number: 6, subject_name: 'العلوم العامة', grade_name: 'الصف الثامن', section_name: '8أ' }
];

function getSlotsForDay(dayId) {
  const filtered = scheduleSlots.value.filter(s => s.day_of_week === dayId);
  if (filtered.length > 0) return filtered;
  return fallbackTeacherSlots.filter(s => s.day_of_week === dayId);
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

function getSubjectColorClass(name) {
  if (!name) return 'default';
  if (name.includes('رياضيات')) return 'math';
  if (name.includes('علوم')) return 'science';
  if (name.includes('عرب')) return 'arabic';
  if (name.includes('إنكليز') || name.includes('إنجليزية') || name.includes('English')) return 'english';
  return 'default';
}

function getSubjectIcon(name) {
  if (!name) return '📚';
  if (name.includes('رياضيات')) return '📐';
  if (name.includes('علوم')) return '🔬';
  if (name.includes('عرب')) return '📖';
  if (name.includes('إنكليز') || name.includes('إنجليزية') || name.includes('English')) return '🔤';
  return '📚';
}

onMounted(async () => {
  try {
    const res = await api.get('/teacher/schedule');
    if (res.data.success && res.data.data.length > 0) {
      scheduleSlots.value = res.data.data;
    }
  } catch (err) {
    console.error('Failed to fetch teacher schedule:', err);
  } finally {
    loading.value = false;
  }
});
</script>

<style scoped>
.loading-state {
  background: #ffffff;
  border-radius: 20px;
  padding: 30px;
  text-align: center;
  font-weight: 700;
  color: #64748b;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.03);
}

.schedule-days-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
</style>
