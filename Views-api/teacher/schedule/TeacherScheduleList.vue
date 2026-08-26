<template>
  <main class="hw-container">
    <!-- Loading State -->
    <div v-if="loading" class="loading-state">
      جاري استرجاع جدول حصص المعلم... ⏳
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
            @click="openSlotDrawer(slot, day)"
          >
            <!-- Squircle Subject Icon (صورة 3D) -->
            <div class="sched-icon-box" :class="getSubjectColorClass(slot.subject_name)">
              <img v-if="getSubjectImage(slot.subject_name)" :src="getSubjectImage(slot.subject_name)" class="subject-3d-icon-render" alt="" />
              <span v-else>{{ getSubjectIcon(slot.subject_name) }}</span>
            </div>

            <!-- Period Slot Badge -->
            <span class="sched-period-tag">الحصة {{ slot.slot_number }}</span>

            <!-- Subject Name -->
            <h4 class="sched-subject-name" :title="slot.subject_name">{{ slot.subject_name }}</h4>

            <!-- Grade & Section Name -->
            <span class="sched-section-name" :title="slot.grade_name + ' (' + slot.section_name + ')'">
              {{ slot.grade_name }} ({{ slot.section_name }})
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

    <!-- ================= Slot Details Drawer ================= -->
    <Teleport to="body">
      <div v-if="selectedSlot" class="drawer-backdrop" @click="closeDrawer">
        <div class="drawer-content" @click.stop>
          <div class="drawer-handle"></div>

          <div class="drawer-header">
            <div class="drawer-header-left">
              <span class="drawer-subject-pill">{{ selectedSlot.subject_name }}</span>
              <span class="drawer-section-pill">الحصة {{ selectedSlot.slot_number }}</span>
            </div>
            <button class="drawer-close-btn" @click="closeDrawer">&times;</button>
          </div>

          <div class="drawer-body">
            <h2 class="drawer-title">تفاصيل حصة {{ selectedSlot.subject_name }}</h2>

            <div class="drawer-meta-row">
              <div class="meta-item">
                <span class="meta-label">🏫 الفصل والشعبة:</span>
                <span class="meta-value">{{ selectedSlot.grade_name }} ({{ selectedSlot.section_name }})</span>
              </div>
              <div class="meta-item">
                <span class="meta-label">📍 القاعة:</span>
                <span class="meta-value">{{ selectedSlot.room_name || 'قاعة رقم 4 (الجناح الشرقي)' }}</span>
              </div>
            </div>

            <div class="drawer-section-block">
              <h4 class="block-heading">🕒 التوقيت المعتمد:</h4>
              <p class="drawer-desc">{{ getSlotTiming(selectedSlot.slot_number) }}</p>
            </div>

            <div class="drawer-section-block">
              <h4 class="block-heading">📌 خطة درس اليوم:</h4>
              <p class="drawer-desc">{{ selectedSlot.lesson_topic || 'شرح الدرس المقرر وفق الخطة الدراسية وحل التمارين التفاعلية مع الطلاب ورصد الحضور.' }}</p>
            </div>
          </div>

          <div class="drawer-footer">
            <button class="btn-primary-close" @click="closeDrawer">إغلاق التفاصيل</button>
          </div>
        </div>
      </div>
    </Teleport>
  </main>
</template>

<script setup>
import { ref } from 'vue';
import mathImg from '@/assets/math_3d.jpg';
import scienceImg from '@/assets/science_3d.jpg';
import englishImg from '@/assets/english_3d.jpg';
import islamicImg from '@/assets/islamic_3d.jpg';

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

const emit = defineEmits(['select-slot']);

const selectedSlot = ref(null);

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

function getSlotTiming(slotNum) {
  const timings = {
    1: '08:00 ص - 08:45 ص (الحصة الأولى)',
    2: '08:50 ص - 09:35 ص (الحصة الثانية)',
    3: '09:40 ص - 10:25 ص (الحصة الثالثة)',
    4: '10:45 ص - 11:30 ص (الحصة الرابعة - بعد الفسحة)',
    5: '11:35 ص - 12:20 م (الحصة الخامسة)',
    6: '12:25 م - 01:10 م (الحصة السادسة)'
  };
  return timings[slotNum] || 'الفترة الصباحية';
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
  if (name.includes('رياضيات')) return '📐';
  if (name.includes('علوم')) return '🔬';
  if (name.includes('عرب')) return '📖';
  if (name.includes('إنجليز')) return '🔤';
  return '📚';
}

function getSubjectColorClass(name) {
  if (!name) return 'cyan';
  if (name.includes('رياضيات')) return 'blue';
  if (name.includes('علوم')) return 'green';
  if (name.includes('عرب')) return 'orange';
  if (name.includes('إنجليز')) return 'purple';
  if (name.includes('إسلام')) return 'gold';
  return 'cyan';
}

function openSlotDrawer(slot, day) {
  selectedSlot.value = {
    ...slot,
    day_name: day.name
  };
  emit('select-slot', selectedSlot.value);
}

function closeDrawer() {
  selectedSlot.value = null;
}
</script>

<style scoped>
.hw-container {
  padding: 16px;
}

.loading-state, .sched-no-lessons {
  text-align: center;
  padding: 24px 16px;
  background: #ffffff;
  border-radius: 18px;
  font-weight: 700;
  color: #64748b;
  border: 1px dashed #cbd5e1;
}

.schedule-days-list {
  display: flex;
  flex-direction: column;
  gap: 28px;
}

.sched-ref-card {
  background: #ffffff;
  border-radius: 26px;
  padding: 26px 16px 14px;
  position: relative;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05);
  border: 1px solid #f1f5f9;
}

.sched-ref-top-notch {
  width: 54px;
  height: 54px;
  background: linear-gradient(135deg, #818cf8 0%, #6366f1 100%);
  color: #ffffff;
  font-size: 22px;
  font-weight: 900;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: -22px;
  left: 50%;
  transform: translateX(-50%);
  border: 7px solid #ffffff;
  box-shadow: 0 6px 14px rgba(99, 102, 241, 0.35) inset, 0 4px 12px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.25);
}

.sched-ref-header-info {
  text-align: center;
  margin-bottom: 16px;
}

.sched-ref-day-title {
  font-size: 19px;
  font-weight: 800;
  color: #0f172a;
  margin: 0;
  letter-spacing: -0.2px;
}

/* 3-Column Daily Slots Grid */
.sched-ref-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  margin-bottom: 14px;
}

.sched-subject-squircle {
  background: #f8fafc;
  border: 1.5px solid #f1f5f9;
  border-radius: 20px;
  padding: 14px 6px 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  cursor: pointer;
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
}

.sched-subject-squircle:hover {
  transform: translateY(-3px);
  background: #ffffff;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.06);
  border-color: #cbd5e1;
}

.sched-icon-box {
  width: 46px;
  height: 46px;
  border-radius: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 6px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
  background: #ede9fe;
}

.subject-3d-icon-render {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 15px;
}

.sched-period-tag {
  font-size: 10.5px;
  font-weight: 800;
  color: #6366f1;
  background: #ede9fe;
  padding: 2px 8px;
  border-radius: 8px;
  margin-bottom: 4px;
  white-space: nowrap;
}

.sched-subject-name {
  font-size: 13px;
  font-weight: 800;
  color: #0f172a;
  margin: 0 0 2px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
}

.sched-section-name {
  font-size: 10.5px;
  font-weight: 700;
  color: #64748b;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
}

.sched-ref-footer-date {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding-top: 12px;
  border-top: 1px dashed #e2e8f0;
  font-size: 12px;
  font-weight: 600;
  color: #64748b;
}

/* Drawer */
.drawer-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.6);
  backdrop-filter: blur(6px);
  z-index: 999;
  display: flex;
  justify-content: center;
  align-items: flex-end;
}

.drawer-content {
  width: 100%;
  max-width: 480px;
  background: #ffffff;
  border-radius: 28px 28px 0 0;
  padding: 16px 20px 28px;
  max-height: 85vh;
  overflow-y: auto;
  box-shadow: 0 -10px 40px rgba(0, 0, 0, 0.2);
}

.drawer-handle { width: 40px; height: 4px; background: #cbd5e1; border-radius: 2px; margin: 0 auto 16px; }
.drawer-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; }
.drawer-subject-pill { background: #ede9fe; color: #7c3aed; padding: 4px 10px; border-radius: 10px; font-size: 11.5px; font-weight: 700; }
.drawer-section-pill { background: #f1f5f9; color: #475569; padding: 4px 10px; border-radius: 10px; font-size: 11.5px; margin-right: 6px; font-weight: 600; }
.drawer-close-btn { background: #f1f5f9; border: none; width: 32px; height: 32px; border-radius: 50%; font-size: 18px; cursor: pointer; color: #64748b; }
.drawer-title { font-size: 17px; font-weight: 800; color: #0f172a; margin-bottom: 12px; }
.drawer-meta-row { display: flex; flex-direction: column; gap: 8px; background: #f8fafc; padding: 12px 14px; border-radius: 14px; margin-bottom: 16px; font-size: 12.5px; }
.meta-item { display: flex; gap: 6px; }
.meta-label { color: #64748b; }
.meta-value { font-weight: 700; color: #1e1b4b; }
.block-heading { font-size: 13px; font-weight: 700; color: #334155; margin-bottom: 6px; }
.drawer-desc { font-size: 13px; line-height: 1.6; color: #475569; background: #f8fafc; padding: 12px; border-radius: 14px; margin-bottom: 16px; }
.btn-primary-close { width: 100%; background: #6366f1; color: #ffffff; border: none; padding: 12px; border-radius: 14px; font-weight: 700; cursor: pointer; }
</style>
