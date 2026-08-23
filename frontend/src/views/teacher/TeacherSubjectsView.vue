<template>
  <StudentLayout 
    pageTitle="الفصول الدراسية" 
    pageSubtitle="الفصول الدراسية"
    pageEmoji="🏫"
  >
    <main class="hw-container">
      <div v-if="loading" class="loading-state">جاري استرجاع الفصول والمواد المكلف بتدريسها... ⏳</div>

      <div v-else-if="groupedGrades.length === 0" class="empty-state">
        لا توجد فصول أو مواد دراسية مكلف بها حالياً.
      </div>

      <!-- قائمة الفصول الدراسية مجمعة بحسب السنة الدراسية (مطابقة للصورة المرفقة) -->
      <div v-else class="schedule-days-list">
        <article 
          v-for="(group, idx) in groupedGrades" 
          :key="group.gradeName" 
          class="sched-ref-card"
        >
          <!-- 1. رقم النتوء العلوي (مكان رقم 1 في الصورة المرجعية) -->
          <div class="sched-ref-top-notch">
            {{ idx + 1 }}
          </div>

          <!-- 1. السنة الدراسية في رأس الكارد (مكان رقم 1 في الصورة: مثل الصف الثامن) -->
          <div class="sched-ref-header-info">
            <h3 class="sched-ref-day-title">{{ group.gradeName }}</h3>
          </div>

          <!-- 2. المادة وتوضيح الفصل (مكان رقم 2 في الصورة: مثل الرياضيات 5أ ، الإحصاء 5ب) -->
          <div class="exam-ref-grid">
            <div 
              v-for="item in group.items" 
              :key="item.assignment_id || item.id" 
              class="sched-subject-squircle hw-squircle-click"
              @click="openClassDrawer(item)"
            >
              <!-- Squircle Icon -->
              <div class="sched-icon-box" :class="getSubjectColorClass(item.subject_name)">
                {{ getSubjectIcon(item.subject_name) }}
              </div>

              <!-- Status Tag -->
              <span class="sched-period-tag success">مكلف بتدريسه</span>

              <!-- 2. المادة وتوضيح الفصل (مثل: الرياضيات 5أ ، الإحصاء 5ب) -->
              <h4 class="sched-subject-name" :title="`${item.subject_name} (${item.section_name})`">
                {{ item.subject_name }} ({{ item.section_name }})
              </h4>

              <!-- 3. الفصل الدراسي فقط -->
              <span class="sched-teacher-name">
                الفصل الدراسي الأول
              </span>
            </div>
          </div>

          <!-- 3. تذييل الكارد السفلي (الفصل الدراسي فقط) -->
          <div class="sched-ref-footer-date">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
              <circle cx="12" cy="12" r="10"></circle>
              <polyline points="12 6 12 12 16 14"></polyline>
            </svg>
            <span>الفصل الدراسي الأول 2026</span>
          </div>
        </article>
      </div>
    </main>

    <!-- Side Drawer (دراوير جانبي ينزلق بـ 0.7s من اليمين لمطابقة النظام البصري) -->
    <ShadcnDrawer 
      v-model="isDrawerOpen" 
      :title="selectedClass ? `${selectedClass.subject_name} (${selectedClass.section_name})` : 'تفاصيل الفصل'"
      :description="selectedClass ? `${selectedClass.grade_name} • الشعبة (${selectedClass.section_name})` : ''"
      :icon="selectedClass ? getSubjectIcon(selectedClass.subject_name) : '🏫'"
    >
      <div v-if="selectedClass" class="drawer-exam-details">
        <!-- Status Banner -->
        <div class="drawer-status-banner verified">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
          <span>فصل ومادة دراسية نشطة ومكلف بها المعلم</span>
        </div>

        <!-- Meta Grid -->
        <div class="drawer-info-grid">
          <div class="drawer-info-item">
            <span class="info-label">1. السنة الدراسية</span>
            <span class="info-val">{{ selectedClass.grade_name }}</span>
          </div>

          <div class="drawer-info-item">
            <span class="info-label">2. المادة والفصل</span>
            <span class="info-val">{{ selectedClass.subject_name }} ({{ selectedClass.section_name }})</span>
          </div>

          <div class="drawer-info-item">
            <span class="info-label">3. اسم المعلم</span>
            <span class="info-val">{{ teacherName }}</span>
          </div>

          <div class="drawer-info-item">
            <span class="info-label">👥 عدد الطلاب بالحجرة</span>
            <span class="info-val">35 طالب وطالبة</span>
          </div>
        </div>

        <!-- Section Details -->
        <div class="drawer-section">
          <h4 class="drawer-section-title">📌 الخطة والمناهج الدراسية:</h4>
          <p class="drawer-text-content">
            تدريس كادر مادة {{ selectedClass.subject_name }} لطلاب {{ selectedClass.grade_name }} شعبة ({{ selectedClass.section_name }}) بالكامل ومتابعة التقييمات والحلول النموذجية.
          </p>
        </div>

        <!-- Quick Management Actions -->
        <div class="drawer-solution-card">
          <div class="sol-card-info">
            <h5>📚 إدارة الواجبات والامتحانات</h5>
            <p>الانتقال المباشر لنشر متابعة الواجبات والامتحانات لهذا الفصل.</p>
          </div>
          <div class="drawer-actions-row">
            <button class="hw-ref-primary-pill-btn" @click="$router.push('/teacher/homeworks')">
              واجبات الفصل ➔
            </button>
            <button class="hw-ref-primary-pill-btn" @click="$router.push('/teacher/exams')">
              امتحانات الفصل ➔
            </button>
          </div>
        </div>
      </div>

      <template #footer>
        <button class="shadcn-btn-secondary" @click="isDrawerOpen = false">إغلاق</button>
      </template>
    </ShadcnDrawer>
  </StudentLayout>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import StudentLayout from '../../components/student/StudentLayout.vue';
import ShadcnDrawer from '../../components/common/ShadcnDrawer.vue';
import api from '../../services/api';

const loading = ref(true);
const assignments = ref([]);

const isDrawerOpen = ref(false);
const selectedClass = ref(null);

const userStr = localStorage.getItem('school_user');
const user = userStr ? JSON.parse(userStr) : {};

// 3. اسم المعلم
const teacherName = computed(() => user.name || user.fullName || 'أحمد خالد');

const fallbackAssignments = [
  // 1. السنة الدراسية: الصف الخامس
  { assignment_id: 1, grade_name: 'الصف الخامس', section_name: '5أ', subject_name: 'الرياضيات' },
  { assignment_id: 2, grade_name: 'الصف الخامس', section_name: '5ب', subject_name: 'الإحصاء' },

  // 1. السنة الدراسية: الصف الثامن
  { assignment_id: 3, grade_name: 'الصف الثامن', section_name: '8أ', subject_name: 'الرياضيات' },
  { assignment_id: 4, grade_name: 'الصف الثامن', section_name: '8أ', subject_name: 'العلوم العامة' },

  // 1. السنة الدراسية: الصف التاسع
  { assignment_id: 5, grade_name: 'الصف التاسع', section_name: '9ب', subject_name: 'اللغة العربية' }
];

// تجميع الفصول بحسب 1. السنة الدراسية (الصف الخامس ، الصف الثامن ، الصف التاسع...)
const groupedGrades = computed(() => {
  const list = assignments.value.length > 0 ? assignments.value : fallbackAssignments;
  const groupsMap = {};

  list.forEach(item => {
    const gradeKey = item.grade_name || 'الصف الثامن';
    if (!groupsMap[gradeKey]) groupsMap[gradeKey] = [];
    groupsMap[gradeKey].push(item);
  });

  return Object.keys(groupsMap).map(gradeName => ({
    gradeName,
    items: groupsMap[gradeName]
  }));
});

function getSubjectColorClass(name) {
  if (!name) return 'default';
  if (name.includes('رياضيات') || name.includes('إحصاء')) return 'math';
  if (name.includes('علوم')) return 'science';
  if (name.includes('عرب')) return 'arabic';
  if (name.includes('إنكليز') || name.includes('إنجليزية') || name.includes('English')) return 'english';
  return 'default';
}

function getSubjectIcon(name) {
  if (!name) return '📚';
  if (name.includes('رياضيات') || name.includes('إحصاء')) return '📐';
  if (name.includes('علوم')) return '🔬';
  if (name.includes('عرب')) return '📖';
  if (name.includes('إنكليز') || name.includes('إنجليزية') || name.includes('English')) return '🔤';
  return '📚';
}

function openClassDrawer(item) {
  selectedClass.value = item;
  isDrawerOpen.value = true;
}

onMounted(async () => {
  try {
    const res = await api.get('/teacher/assignments');
    if (res.data.success && res.data.data.length > 0) {
      assignments.value = res.data.data;
    }
  } catch (err) {
    console.error('Failed to fetch teacher classes:', err);
  } finally {
    loading.value = false;
  }
});
</script>

<style scoped>
.loading-state, .empty-state {
  background: #ffffff;
  border-radius: 20px;
  padding: 30px;
  text-align: center;
  font-weight: 700;
  color: #64748b;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.03);
}

.hw-squircle-click {
  cursor: pointer;
}

.drawer-actions-row {
  display: flex;
  gap: 10px;
  margin-top: 8px;
}

/* Drawer Inner Styling */
.drawer-exam-details {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.drawer-status-banner {
  display: flex;
  align-items: center;
  gap: 8px;
  background: #dcfce7;
  color: #15803d;
  border: 1px solid #86efac;
  padding: 10px 14px;
  border-radius: 14px;
  font-size: 12px;
  font-weight: 700;
}

.drawer-info-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.drawer-info-item {
  background: #f8fafc;
  border: 1px solid #f1f5f9;
  border-radius: 14px;
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.info-label {
  font-size: 11px;
  color: #64748b;
  font-weight: 700;
}

.info-val {
  font-size: 13px;
  font-weight: 800;
  color: #0f172a;
}

.drawer-section-title {
  font-size: 13px;
  font-weight: 800;
  color: #0f172a;
  margin-bottom: 8px;
}

.drawer-text-content {
  font-size: 13px;
  color: #334155;
  line-height: 1.6;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 14px;
  padding: 14px;
}

.drawer-solution-card {
  background: linear-gradient(135deg, #eef2ff 0%, #e0e7ff 100%);
  border: 1px solid #c7d2fe;
  border-radius: 18px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.sol-card-info h5 {
  font-size: 14px;
  font-weight: 800;
  color: #312e81;
  margin: 0 0 4px 0;
}

.sol-card-info p {
  font-size: 11px;
  color: #4338ca;
  margin: 0;
  font-weight: 600;
}

.shadcn-btn-secondary {
  background: #ffffff;
  color: #475569;
  border: 1px solid #cbd5e1;
  padding: 10px 18px;
  border-radius: 12px;
  font-family: inherit;
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
}
</style>
