<template>
  <main class="hw-container">
    <!-- Loading State -->
    <div v-if="loading" class="loading-state">
      جاري استرجاع الواجبات المدرسية... ⏳
    </div>

    <!-- Current Homeworks List -->
    <div v-else-if="activeTab === 'current'">
      <div v-if="groupedCurrentHomeworks.length === 0" class="empty-state">
        🎉 لا توجد واجبات معلقة حالياً في هذا القسم. أنت رائع!
      </div>

      <div v-else class="schedule-days-list">
        <article 
          v-for="group in groupedCurrentHomeworks" 
          :key="group.dateKey" 
          class="sched-ref-card"
        >
          <!-- 1. رقم اليوم/المجموعة في النتوء العلوي -->
          <div class="sched-ref-top-notch">
            {{ group.index }}
          </div>

          <!-- 2. اسم اليوم في رأس الكارد -->
          <div class="sched-ref-header-info">
            <h3 class="sched-ref-day-title">واجبات يوم {{ group.dayName }}</h3>
          </div>

          <!-- 3. شبكة مواد الواجبات لهذا اليوم (زوز مواد كحد أقصى لكل صف) -->
          <div class="exam-ref-grid">
            <div 
              v-for="hw in group.homeworks" 
              :key="hw.id" 
              class="sched-subject-squircle hw-squircle-click"
              @click="openHomeworkDrawer(hw)"
            >
              <!-- Squircle Icon -->
              <div class="sched-icon-box" :class="getSubjectColorClass(hw.subject_name)">
                <img v-if="getSubjectImage(hw.subject_name)" :src="getSubjectImage(hw.subject_name)" class="subject-3d-icon-render" alt="" />
                <span v-else>{{ getSubjectIcon(hw.subject_name) }}</span>
              </div>

              <!-- Status Badge -->
              <span class="sched-period-tag" :class="{ pending: !hw.submitted }">
                {{ hw.submitted ? 'تم الإرسال' : 'معلق' }}
              </span>

              <!-- Subject Name -->
              <h4 class="sched-subject-name" :title="hw.subject_name">{{ hw.subject_name }}</h4>

              <!-- Teacher Name -->
              <span class="sched-teacher-name" :title="hw.teacher_name || 'أستاذ المادة'">
                {{ hw.teacher_name || 'أستاذ المادة' }}
              </span>
            </div>
          </div>

          <!-- 4. تاريخ التسليم في الأسفل -->
          <div class="sched-ref-footer-date">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="16" y1="2" x2="16" y2="6"></line>
              <line x1="8" y1="2" x2="8" y2="6"></line>
              <line x1="3" y1="10" x2="21" y2="10"></line>
            </svg>
            <span>تاريخ التسليم: {{ group.dateFormatted }}</span>
          </div>
        </article>
      </div>
    </div>

    <!-- Archive Homeworks List -->
    <div v-else>
      <div v-if="groupedArchiveHomeworks.length === 0" class="empty-state">
        لا توجد واجبات مكتملة في الأرشيف حالياً.
      </div>

      <div v-else class="schedule-days-list">
        <article 
          v-for="group in groupedArchiveHomeworks" 
          :key="group.dateKey" 
          class="sched-ref-card"
        >
          <!-- 1. Top Notch Badge -->
          <div class="sched-ref-top-notch">
            {{ group.index }}
          </div>

          <!-- 2. Header Title -->
          <div class="sched-ref-header-info">
            <h3 class="sched-ref-day-title">أرشيف واجبات يوم {{ group.dayName }}</h3>
          </div>

          <!-- 3. Squircle Grid -->
          <div class="exam-ref-grid">
            <div 
              v-for="hw in group.homeworks" 
              :key="hw.id" 
              class="sched-subject-squircle hw-squircle-click"
              @click="openHomeworkDrawer(hw)"
            >
              <div class="sched-icon-box" :class="getSubjectColorClass(hw.subject_name)">
                <img v-if="getSubjectImage(hw.subject_name)" :src="getSubjectImage(hw.subject_name)" class="subject-3d-icon-render" alt="" />
                <span v-else>{{ getSubjectIcon(hw.subject_name) }}</span>
              </div>
              <span class="sched-period-tag success">{{ hw.score || 'مكتمل' }}</span>
              <h4 class="sched-subject-name" :title="hw.subject_name">{{ hw.subject_name }}</h4>
              <span class="sched-teacher-name" :title="hw.teacher_name || 'أستاذ المادة'">
                {{ hw.teacher_name || 'أستاذ المادة' }}
              </span>
            </div>
          </div>

          <!-- 4. Date Footer -->
          <div class="sched-ref-footer-date">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
              <circle cx="12" cy="12" r="10"></circle>
              <polyline points="12 6 12 12 16 14"></polyline>
            </svg>
            <span>تاريخ الأرشيف: {{ group.dateFormatted }}</span>
          </div>
        </article>
      </div>
    </div>

    <!-- Side Drawer details -->
    <ShadcnDrawer 
      v-model="isDrawerOpen" 
      :title="selectedHw ? selectedHw.title : 'تفاصيل الواجب المدرسي'"
      :description="selectedHw ? `مادة ${selectedHw.subject_name} • إعداد ${selectedHw.teacher_name || 'أستاذ المادة'}` : ''"
      :icon="selectedHw ? getSubjectIcon(selectedHw.subject_name) : '📚'"
    >
      <div v-if="selectedHw" class="drawer-exam-details">
        <div class="drawer-status-banner" :class="{ verified: selectedHw.submitted }">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
          <span>{{ selectedHw.submitted ? 'تم إرسال الواجب وتسليمه بنجاح' : 'واجب معلق - مطلوب إنجازه وتسليمه' }}</span>
        </div>

        <div class="drawer-info-grid">
          <div class="drawer-info-item">
            <span class="info-label">📅 تاريخ التسليم الأقصى</span>
            <span class="info-val">{{ selectedHw.due_date }}</span>
          </div>
          <div class="drawer-info-item">
            <span class="info-label">👨‍🏫 الأستاذ المسؤول</span>
            <span class="info-val">{{ selectedHw.teacher_name || 'أستاذ المادة' }}</span>
          </div>
        </div>

        <div class="drawer-section">
          <h4 class="drawer-section-title">📌 المطلـوب في الواجب المدرسي:</h4>
          <p class="drawer-text-content">
            {{ selectedHw.description || 'يرجى حل تمارين الواجب المحددة بالكامل وإرسال الإجابة قبل تاريخ التسليم الأقصى.' }}
          </p>
        </div>

        <div class="drawer-solution-card">
          <div class="sol-card-info">
            <h5>📖 الحل النموذجي المعتمد</h5>
            <p v-if="selectedHw.has_solution">ملف PDF يحتوي على خطوات الحل والإجابة النموذجية المعتمدة.</p>
            <p v-else>لم يقم أستاذ المادة بإرفاق الحل النموذجي بعد.</p>
          </div>
          <button 
            class="hw-ref-primary-pill-btn"
            :disabled="!selectedHw.has_solution"
            @click="openSolutionModal(selectedHw)"
          >
            عرض الحل النموذجي ➔
          </button>
        </div>
      </div>
    </ShadcnDrawer>
  </main>
</template>

<script setup>
import { ref } from 'vue';
import ShadcnDrawer from '../../../frontend/src/components/common/ShadcnDrawer.vue';
import mathImg from '@/assets/math_3d.jpg';
import scienceImg from '@/assets/science_3d.jpg';
import englishImg from '@/assets/english_3d.jpg';
import islamicImg from '@/assets/islamic_3d.jpg';

const props = defineProps({
  loading: { type: Boolean, default: false },
  activeTab: { type: String, default: 'current' },
  groupedCurrentHomeworks: { type: Array, default: () => [] },
  groupedArchiveHomeworks: { type: Array, default: () => [] }
});

const isDrawerOpen = ref(false);
const selectedHw = ref(null);

function getSubjectColorClass(name) {
  if (!name) return 'default';
  if (name.includes('رياضيات')) return 'math';
  if (name.includes('علوم')) return 'science';
  if (name.includes('عرب')) return 'arabic';
  if (name.includes('إسلام')) return 'islamic';
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

function openHomeworkDrawer(hw) {
  selectedHw.value = hw;
  isDrawerOpen.value = true;
}

function openSolutionModal(hw) {
  alert(`فتح الحل النموذجي للواجب: ${hw.title}`);
}
</script>

<style scoped>
.hw-container {
  padding: 16px;
}

.loading-state, .empty-state {
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

/* Card Container with Top Notch */
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
  background: linear-gradient(352deg, #4f46e59e 0%, #c7d2feb3 100%);
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
  box-shadow: 0 6px 14px rgba(79, 70, 229, 0.35) inset;
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

/* 2-Column Grid Layout */
.exam-ref-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 14px;
  margin-bottom: 16px;
}

.sched-subject-squircle {
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 20px;
  padding: 16px 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.sched-subject-squircle:hover {
  transform: translateY(-3px);
  background: #ffffff;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.06);
  border-color: #c7d2fe;
}

.sched-icon-box {
  width: 48px;
  height: 48px;
  border-radius: 16px;
  background: #f1f5f9;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  overflow: hidden;
  border: 1px solid #e2e8f0;
}

.subject-3d-icon-render {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 14px;
}

.sched-period-tag {
  font-size: 11px;
  font-weight: 800;
  padding: 3px 8px;
  border-radius: 10px;
  background: #dcfce7;
  color: #166534;
}

.sched-period-tag.pending {
  background: #ffedd5;
  color: #c2410c;
}

.sched-subject-name {
  font-size: 14px;
  font-weight: 800;
  color: #1e293b;
  margin: 2px 0 0;
  text-align: center;
}

.sched-teacher-name {
  font-size: 12px;
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
