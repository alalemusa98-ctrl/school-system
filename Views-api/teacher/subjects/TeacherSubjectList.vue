<template>
  <main class="hw-container">
    <!-- Loading State -->
    <div v-if="loading" class="loading-state">
      جاري تحميل بيانات الفصول والمواد المسندة... ⏳
    </div>

    <!-- Empty State -->
    <div v-else-if="gradesList.length === 0" class="empty-state">
      🎉 لا توجد فصول دراسية مسندة حالياً.
    </div>

    <!-- Main Classes/Grades List View -->
    <div v-else class="subjects-grid-list">
      <article 
        v-for="(grade, index) in gradesList" 
        :key="grade.id" 
        class="subj-ref-card"
      >
        <!-- 1. Top Notch Number (رقم السنة الدراسية / الترتيب) -->
        <div class="subj-ref-top-notch">
          <span class="notch-grade-number">{{ index + 1 }}</span>
        </div>

        <!-- 1. السنة الدراسية (العنوان الرئيسي للكارد) -->
        <div class="subj-ref-header-info">
          <h3 class="subj-ref-title">{{ grade.grade_name }}</h3>
        </div>

        <!-- 2. شبكة كروت المواد والشعب المسندة مع الصور المخصصة -->
        <div class="assignments-grid">
          <div 
            v-for="item in grade.assignments" 
            :key="item.id" 
            class="assignment-squircle-card"
            @click="openAssignmentDrawer(item, grade)"
          >
            <!-- الصورة المخصصة لكل مادة -->
            <div class="assignment-icon-box">
              <img 
                v-if="getSubjectImage(item.subject_name)" 
                :src="getSubjectImage(item.subject_name)" 
                class="assignment-img" 
                :alt="item.subject_name" 
              />
              <span v-else class="assignment-emoji">{{ getSubjectIcon(item.subject_name) }}</span>
            </div>

            <!-- اسم المادة مع ذكر الشعبة -->
            <h4 class="assignment-title">{{ item.subject_name }} ({{ item.section_name }})</h4>
          </div>
        </div>

        <!-- تذييل الكارد: الفصل الدراسي والسنة -->
        <div class="subj-ref-footer-row">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
            <circle cx="12" cy="12" r="10"></circle>
            <polyline points="12 6 12 12 16 14"></polyline>
          </svg>
          <span>{{ grade.semester || 'الفصل الدراسي الأول 2026' }}</span>
        </div>
      </article>
    </div>

    <!-- ================= Assignment Details Drawer ================= -->
    <Teleport to="body">
      <div v-if="selectedAssignment" class="drawer-backdrop" @click="closeDrawer">
        <div class="drawer-content" @click.stop>
          <div class="drawer-handle"></div>

          <div class="drawer-header">
            <div class="drawer-header-left">
              <span class="drawer-subject-pill">{{ selectedAssignment.grade_name }}</span>
              <span class="drawer-section-pill">شعبة {{ selectedAssignment.section_name }}</span>
            </div>
            <button class="drawer-close-btn" @click="closeDrawer">&times;</button>
          </div>

          <div class="drawer-body">
            <h2 class="drawer-title">{{ selectedAssignment.subject_name }} - شعبة ({{ selectedAssignment.section_name }})</h2>

            <div class="drawer-meta-row">
              <div class="meta-item">
                <span class="meta-label">👥 الطلاب:</span>
                <span class="meta-value">{{ selectedAssignment.students_count || '25 طالباً' }}</span>
              </div>
              <div class="meta-item">
                <span class="meta-label">📍 القاعة:</span>
                <span class="meta-value">{{ selectedAssignment.room_name || 'قاعة رقم 4' }}</span>
              </div>
            </div>

            <div class="drawer-section-block">
              <h4 class="block-heading">📌 إحصائيات الشعبة والمقرر:</h4>
              <div class="grade-dist-grid">
                <div class="grade-item">
                  <span class="grade-label">الواجبات المنشورة</span>
                  <strong class="grade-val">{{ selectedAssignment.active_homeworks || 3 }}</strong>
                </div>
                <div class="grade-item">
                  <span class="grade-label">الاختبارات</span>
                  <strong class="grade-val">{{ selectedAssignment.scheduled_exams || 2 }}</strong>
                </div>
                <div class="grade-item">
                  <span class="grade-label">نسبة الإنجاز</span>
                  <strong class="grade-val">96%</strong>
                </div>
              </div>
            </div>

            <div class="drawer-section-block">
              <h4 class="block-heading">🏫 بيانات التكليف:</h4>
              <p class="drawer-desc">تم إسناد هذا المقرر والشعبة للمعلم للعام الدراسي 2026. يشمل متابعة الحضور والغياب، التكليفات الأسبوعية، ورصد درجات أعمال الفصل والامتحانات.</p>
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
  subjectsList: {
    type: Array,
    default: () => []
  }
});

const emit = defineEmits(['select-assignment']);

const selectedAssignment = ref(null);

const gradesList = ref([
  {
    id: 1,
    grade_name: 'الصف الخامس',
    semester: 'الفصل الدراسي الأول 2026',
    assignments: [
      {
        id: 101,
        subject_name: 'التربية الإسلامية',
        section_name: 'أ5',
        students_count: '24 طالباً',
        room_name: 'قاعة 4 (الجناح الشرقي)',
        active_homeworks: 3,
        scheduled_exams: 2
      },
      {
        id: 102,
        subject_name: 'الرياضيات',
        section_name: 'أ5',
        students_count: '24 طالباً',
        room_name: 'قاعة 4 (الجناح الشرقي)',
        active_homeworks: 4,
        scheduled_exams: 2
      },
      {
        id: 103,
        subject_name: 'الرياضيات',
        section_name: 'ب5',
        students_count: '22 طالباً',
        room_name: 'قاعة 5 (الجناح الشرقي)',
        active_homeworks: 2,
        scheduled_exams: 1
      }
    ]
  },
  {
    id: 2,
    grade_name: 'الصف السادس',
    semester: 'الفصل الدراسي الأول 2026',
    assignments: [
      {
        id: 201,
        subject_name: 'الرياضيات',
        section_name: 'أ6',
        students_count: '23 طالباً',
        room_name: 'قاعة 8 (الجناح الشمالي)',
        active_homeworks: 3,
        scheduled_exams: 1
      },
      {
        id: 202,
        subject_name: 'العلوم العامة',
        section_name: 'أ6',
        students_count: '23 طالباً',
        room_name: 'قاعة 8 (الجناح الشمالي)',
        active_homeworks: 2,
        scheduled_exams: 1
      }
    ]
  }
]);

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

function openAssignmentDrawer(item, grade) {
  selectedAssignment.value = {
    ...item,
    grade_name: grade.grade_name
  };
  emit('select-assignment', selectedAssignment.value);
}

function closeDrawer() {
  selectedAssignment.value = null;
}
</script>

<style scoped>
.hw-container { padding: 16px; }

.loading-state, .empty-state {
  text-align: center;
  padding: 32px 16px;
  background: #ffffff;
  border-radius: 20px;
  font-weight: 700;
  color: #64748b;
  border: 1px dashed #cbd5e1;
}

.subjects-grid-list {
  display: flex;
  flex-direction: column;
  gap: 26px;
}

.subj-ref-card {
  background: #ffffff;
  border-radius: 26px;
  padding: 26px 18px 16px;
  position: relative;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05);
  border: 1px solid #f1f5f9;
}

.subj-ref-top-notch {
  width: 54px;
  height: 54px;
  background: linear-gradient(135deg, #818cf8 0%, #6366f1 100%);
  color: #ffffff;
  font-size: 24px;
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
}

.notch-grade-number {
  color: #ffffff;
  font-size: 22px;
  font-weight: 900;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.25);
  line-height: 1;
}

.subj-ref-header-info {
  text-align: center;
  margin-bottom: 18px;
}

.subj-ref-title {
  font-size: 20px;
  font-weight: 800;
  color: #0f172a;
  margin: 0;
  letter-spacing: -0.2px;
}

/* Assignments Grid */
.assignments-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(135px, 1fr));
  gap: 14px;
  margin-bottom: 16px;
}

.assignment-squircle-card {
  background: #f8fafc;
  border: 1.5px solid #f1f5f9;
  border-radius: 22px;
  padding: 20px 12px 18px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  gap: 10px;
  cursor: pointer;
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
}

.assignment-squircle-card:hover {
  transform: translateY(-4px);
  background: #ffffff;
  box-shadow: 0 10px 24px rgba(0, 0, 0, 0.06);
  border-color: #cbd5e1;
}

.assignment-icon-box {
  width: 62px;
  height: 62px;
  border-radius: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  box-shadow: 0 8px 18px rgba(0, 0, 0, 0.08);
  background: #f1f5f9;
}

.assignment-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 18px;
  transition: transform 0.25s ease;
}

.assignment-squircle-card:hover .assignment-img {
  transform: scale(1.06);
}

.assignment-emoji {
  font-size: 28px;
}

.assignment-title {
  font-size: 15px;
  font-weight: 800;
  color: #0f172a;
  margin: 0;
  line-height: 1.35;
}

.subj-ref-footer-row {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding-top: 14px;
  border-top: 1px dashed #e2e8f0;
  font-size: 12.5px;
  font-weight: 700;
  color: #6d28d9;
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
.drawer-meta-row { display: flex; gap: 16px; background: #f8fafc; padding: 10px 14px; border-radius: 14px; margin-bottom: 16px; font-size: 12px; }
.meta-item { display: flex; gap: 4px; }
.meta-label { color: #64748b; }
.meta-value { font-weight: 700; color: #1e1b4b; }
.block-heading { font-size: 13px; font-weight: 700; color: #334155; margin-bottom: 8px; }
.drawer-desc { font-size: 13px; line-height: 1.6; color: #475569; background: #f8fafc; padding: 12px; border-radius: 14px; margin-bottom: 16px; }
.grade-dist-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; margin-bottom: 16px; }
.grade-item { background: #f1f5f9; padding: 10px; border-radius: 12px; text-align: center; }
.grade-label { display: block; font-size: 11px; color: #64748b; margin-bottom: 2px; }
.grade-val { font-size: 14px; font-weight: 800; color: #4f46e5; }
.btn-primary-close { width: 100%; background: #6366f1; color: #ffffff; border: none; padding: 12px; border-radius: 14px; font-weight: 700; cursor: pointer; }
</style>
