<template>
  <StudentLayout 
    pageTitle="صفحة الامتحانات" 
    pageSubtitle="صفحة الامتحانات"
    pageEmoji="📝"
  >
    <!-- Segmented Control Box (محتوياً على التبويبات وزر إضافة امتحان جديد في الموقع 3) -->
    <section class="hw-filter-section">
      <div class="teacher-segmented-box">
        <!-- Tabs Row -->
        <div class="hw-segmented-tabs-row">
          <button 
            class="hw-tab-btn" 
            :class="{ active: activeTab === 'upcoming' }" 
            @click="activeTab = 'upcoming'"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="16" y1="2" x2="16" y2="6"></line>
              <line x1="8" y1="2" x2="8" y2="6"></line>
              <line x1="3" y1="10" x2="21" y2="10"></line>
            </svg>
            <span>الامتحانات القادمة</span>
            <span class="hw-count-badge">{{ upcomingExams.length }}</span>
          </button>

          <button 
            class="hw-tab-btn" 
            :class="{ active: activeTab === 'results' }" 
            @click="activeTab = 'results'"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
            </svg>
            <span>النتائج والأرشيف</span>
            <span class="hw-count-badge">{{ resultsExams.length }}</span>
          </button>
        </div>

        <!-- 3. زر إضافة امتحان جديد في موقع 3 بالصورة -->
        <button class="add-task-primary-btn" @click="showCreateModal = true">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.8">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
          <span>إضافة امتحان جديد</span>
        </button>
      </div>

      <!-- 4. الفصول الدراسية التي يدرسها المعلم بدلاً من المواد (في موقع 4 بالصورة) -->
      <div class="subject-pills-row">
        <button 
          class="sub-pill" 
          :class="{ active: selectedClassKey === 'ALL' }" 
          @click="selectedClassKey = 'ALL'"
        >
          الكل
        </button>
        <button 
          v-for="cls in teacherClassOptions" 
          :key="cls.key"
          class="sub-pill"
          :class="{ active: selectedClassKey === cls.key }"
          @click="selectedClassKey = cls.key"
        >
          🏫 {{ cls.label }}
        </button>
      </div>
    </section>

    <!-- Main Container (تنسيق وتوزيع الكروت المطابق تماماً لصفحة الطالب) -->
    <main class="hw-container">
      <div v-if="loading" class="loading-state">جاري استرجاع جدول الامتحانات للمعلم... ⏳</div>

      <!-- Upcoming Exams List (مجمعة بحسب أيام الامتحانات الفعلية وبحد أقصى 2 في الصف) -->
      <div v-else-if="activeTab === 'upcoming'">
        <div v-if="groupedUpcomingExams.length === 0" class="empty-state">
          🎈 لا توجد امتحانات معلقة حالياً لهذا الفصل الدراسي. اضغط على "إضافة امتحان جديد" للإدراج.
        </div>

        <div v-else class="schedule-days-list">
          <article 
            v-for="group in groupedUpcomingExams" 
            :key="group.dateKey" 
            class="sched-ref-card"
          >
            <!-- 1. رقم اليوم/المجموعة في النتوء العلوي (مكان رقم 1 في الصورة) -->
            <div class="sched-ref-top-notch">
              {{ group.index }}
            </div>

            <!-- 4. اسم اليوم في رأس الكارد (مكان رقم 4 في الصورة) -->
            <div class="sched-ref-header-info">
              <h3 class="sched-ref-day-title">امتحانات يوم {{ group.dayName }}</h3>
            </div>

            <!-- 2. شبكة مواد الامتحانات لهذا اليوم (زوز مواد 2 كحد أقصى لكل صف) -->
            <div class="exam-ref-grid">
              <div 
                v-for="exam in group.exams" 
                :key="exam.id" 
                class="sched-subject-squircle exam-squircle-click"
                @click="openExamDrawer(exam)"
              >
                <!-- Squircle Icon -->
                <div class="sched-icon-box" :class="getSubjectColorClass(exam.subject_name)">
                  {{ getSubjectIcon(exam.subject_name) }}
                </div>

                <!-- Status Badge -->
                <span class="sched-period-tag" :class="{ pending: !exam.has_solution }">
                  {{ exam.has_solution ? 'تم الحل' : 'محدد' }}
                </span>

                <!-- Exam Title -->
                <h4 class="sched-subject-name" :title="exam.title">{{ exam.title }}</h4>

                <!-- Grade & Section Name -->
                <span class="sched-teacher-name" :title="`${exam.subject_name} • ${exam.grade_name || ''} (${exam.section_name || ''})`">
                  {{ exam.subject_name }} - {{ exam.grade_name || 'الصف 8' }} ({{ exam.section_name || '8أ' }})
                </span>
              </div>
            </div>

            <!-- 3. تاريخ الامتحان في الأسفل (مكان رقم 3 في الصورة المرجعية) -->
            <div class="sched-ref-footer-date">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="16" y1="2" x2="16" y2="6"></line>
                <line x1="8" y1="2" x2="8" y2="6"></line>
                <line x1="3" y1="10" x2="21" y2="10"></line>
              </svg>
              <span>تاريخ اليوم الاختبارية: {{ group.dateFormatted }}</span>
            </div>
          </article>
        </div>
      </div>

      <!-- Results / Archive Exams List -->
      <div v-else>
        <div v-if="groupedResultsExams.length === 0" class="empty-state">
          لا توجد نتائج امتحانات سابقة في السجل حالياً لهذا الفصل الدراسي.
        </div>

        <div v-else class="schedule-days-list">
          <article 
            v-for="group in groupedResultsExams" 
            :key="group.dateKey" 
            class="sched-ref-card"
          >
            <!-- 1. Top Notch -->
            <div class="sched-ref-top-notch">
              {{ group.index }}
            </div>

            <!-- 4. Header Title -->
            <div class="sched-ref-header-info">
              <h3 class="sched-ref-day-title">نتائج امتحانات يوم {{ group.dayName }}</h3>
            </div>

            <!-- 2. Grid (2 max per row) -->
            <div class="exam-ref-grid">
              <div 
                v-for="exam in group.exams" 
                :key="exam.id" 
                class="sched-subject-squircle exam-squircle-click"
                @click="openExamDrawer(exam)"
              >
                <div class="sched-icon-box" :class="getSubjectColorClass(exam.subject_name)">
                  {{ getSubjectIcon(exam.subject_name) }}
                </div>
                <span class="sched-period-tag success">تم الاعتماد</span>
                <h4 class="sched-subject-name" :title="exam.title">{{ exam.title }}</h4>
                <span class="sched-teacher-name" :title="`${exam.subject_name} • ${exam.grade_name || ''}`">
                  {{ exam.subject_name }} - {{ exam.grade_name || 'الصف 8' }} ({{ exam.section_name || '8أ' }})
                </span>
              </div>
            </div>

            <!-- 3. Date Footer -->
            <div class="sched-ref-footer-date">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12 6 12 12 16 14"></polyline>
              </svg>
              <span>تاريخ الاعتماد: {{ group.dateFormatted }}</span>
            </div>
          </article>
        </div>
      </div>
    </main>

    <!-- Side Drawer (دراوير جانبي ينزلق بـ 0.7 ثانية من اليمين) -->
    <ShadcnDrawer 
      v-model="isDrawerOpen" 
      :title="selectedExam ? selectedExam.title : 'تفاصيل الامتحان'"
      :description="selectedExam ? `مادة ${selectedExam.subject_name} • ${selectedExam.grade_name || ''} (${selectedExam.section_name || ''})` : ''"
      :icon="selectedExam ? getSubjectIcon(selectedExam.subject_name) : '📝'"
    >
      <div v-if="selectedExam" class="drawer-exam-details">
        <!-- Status Banner -->
        <div class="drawer-status-banner verified">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
          <span>امتحان تحصيلي معتمد ومدرج بالجدول</span>
        </div>

        <!-- Meta Grid -->
        <div class="drawer-info-grid">
          <div class="drawer-info-item">
            <span class="info-label">📅 تاريخ الامتحان</span>
            <span class="info-val">{{ formatDate(selectedExam.due_date) }}</span>
          </div>

          <div class="drawer-info-item">
            <span class="info-label">🏫 الصف والشعبة</span>
            <span class="info-val">{{ selectedExam.grade_name || 'الصف الثامن' }} ({{ selectedExam.section_name || '8أ' }})</span>
          </div>

          <div class="drawer-info-item">
            <span class="info-label">📖 المادة الدراسية</span>
            <span class="info-val">{{ selectedExam.subject_name }}</span>
          </div>

          <div class="drawer-info-item">
            <span class="info-label">⏱️ التوقيت والزمن</span>
            <span class="info-val">{{ selectedExam.duration || '09:00 ص (ساعة ونصف)' }}</span>
          </div>
        </div>

        <!-- Description -->
        <div class="drawer-section">
          <h4 class="drawer-section-title">📌 تفاصيل ومفردات المنهج المقررة:</h4>
          <p class="drawer-text-content">
            {{ selectedExam.description || 'امتحان تحصيلي تقييمي يشمل مفردات الفصل الدراسي المقرر.' }}
          </p>
        </div>

        <!-- Solution Card inside Drawer -->
        <div class="drawer-solution-card">
          <div class="sol-card-info">
            <h5>📖 النموذج الاسترشادي والحل المنشور</h5>
            <p v-if="selectedExam.has_solution || selectedExam.solution_text">
              {{ selectedExam.solution_text || 'تم رفع ملف النموذج الاسترشادي والحل الرسمي.' }}
            </p>
            <p v-else>لم تقم بإرفاق نموذج استرشادي مسبق لهذا الامتحان.</p>
          </div>
          <button 
            v-if="selectedExam.has_solution || selectedExam.solution_text"
            class="hw-ref-primary-pill-btn"
            @click="openSolutionModal(selectedExam)"
          >
            معاينة النموذج الاسترشادي ➔
          </button>
        </div>

        <!-- Delete Action -->
        <div class="drawer-delete-box">
          <button class="shadcn-btn-danger" @click="handleDeleteExam(selectedExam.id)">
            🗑️ حذف هذا الامتحان نهائياً من المنظومة
          </button>
        </div>
      </div>

      <template #footer>
        <button class="shadcn-btn-secondary" @click="isDrawerOpen = false">إغلاق</button>
      </template>
    </ShadcnDrawer>

    <!-- Create Exam Modal (Shadcn UI Dialog) -->
    <ShadcnDialog 
      v-model="showCreateModal" 
      title="➕ إضافة امتحان جديد"
      description="إدراج امتحان جديد بالجدول مع إمكانية إضافة النموذج الاسترشادي والحل"
      icon="📝"
    >
      <form @submit.prevent="handleCreateExam" class="teacher-create-form">
        <div class="form-group">
          <label class="form-label">عنوان الامتحان *</label>
          <input type="text" v-model="newExam.title" placeholder="مثال: امتحان العلوم الشهري" required class="form-input" />
        </div>

        <div class="form-row">
          <div class="form-group">
            <label class="form-label">الفصل والشعبة المكلفة *</label>
            <select v-model="selectedAssignmentObj" required class="form-input" @change="onAssignmentChange">
              <option :value="null" disabled>اختر الفصل والشعبة...</option>
              <option v-for="a in teacherAssignments" :key="a.assignment_id" :value="a">
                {{ a.grade_name }} ({{ a.section_name }}) — {{ a.subject_name }}
              </option>
            </select>
          </div>

          <div class="form-group">
            <label class="form-label">تاريخ الامتحان *</label>
            <input type="date" v-model="newExam.due_date" required class="form-input" />
          </div>
        </div>

        <div class="form-group">
          <label class="form-label">تفاصيل ومفردات المنهج المقررة</label>
          <textarea v-model="newExam.description" rows="3" placeholder="اكتب الفاصيل والدروس المقررة في هذا الامتحان..." class="form-input"></textarea>
        </div>

        <div class="solution-toggle-box">
          <label class="checkbox-label">
            <input type="checkbox" v-model="newExam.has_solution" />
            <span>إرفاق نموذج استرشادي وحل (يُمكّن الطالب من المراجعة)</span>
          </label>

          <div v-if="newExam.has_solution" class="solution-inputs">
            <div class="form-group">
              <label class="form-label">نص النموذج الاسترشادي والحل</label>
              <textarea v-model="newExam.solution_text" rows="2" placeholder="أدخل الإجابات النموذجية الرسمية..." class="form-input"></textarea>
            </div>
          </div>
        </div>
      </form>

      <template #footer>
        <button class="shadcn-btn-secondary" @click="showCreateModal = false">إلغاء</button>
        <button class="shadcn-btn-primary" :disabled="submitting" @click="handleCreateExam">
          {{ submitting ? 'جاري الحفظ... ⏳' : 'إدراج الامتحان بالجدول 🚀' }}
        </button>
      </template>
    </ShadcnDialog>

    <!-- Model Solution Dialog (Shadcn UI Dialog) -->
    <ShadcnDialog 
      v-model="isModalOpen" 
      :title="selectedExam ? `النموذج الاسترشادي: ${selectedExam.title}` : 'النموذج الاسترشادي المعتمد'"
      :description="selectedExam ? `مادة ${selectedExam.subject_name}` : ''"
      icon="💡"
    >
      <div v-if="selectedExam" class="solution-dialog-content">
        <div class="solution-section">
          <h4 class="section-title">📌 أسئلة ونموذج الإجابة الرسمي المنشور:</h4>
          <div class="solution-text-box">
            <p v-if="selectedExam.solution_text">
              {{ selectedExam.solution_text }}
            </p>
            <div v-else class="default-solution-steps">
              <p>1. أسئلة التقييم النظري والتطبيقي المعتمدة.</p>
              <p>2. توزيع الدرجات التفصيلية والخطوات الرسمية.</p>
            </div>
          </div>
        </div>
      </div>

      <template #footer>
        <button class="shadcn-btn-secondary" @click="isModalOpen = false">إغلاق</button>
      </template>
    </ShadcnDialog>
  </StudentLayout>
</template>

<script setup>
import { ref, onMounted, reactive, computed } from 'vue';
import StudentLayout from '../../components/student/StudentLayout.vue';
import ShadcnDialog from '../../components/common/ShadcnDialog.vue';
import ShadcnDrawer from '../../components/common/ShadcnDrawer.vue';
import api from '../../services/api';

const loading = ref(true);
const activeTab = ref('upcoming');
const selectedClassKey = ref('ALL');
const exams = ref([]);
const assignments = ref([]);

const showCreateModal = ref(false);
const submitting = ref(false);
const selectedAssignmentObj = ref(null);

const isDrawerOpen = ref(false);
const isModalOpen = ref(false);
const selectedExam = ref(null);

const newExam = reactive({
  title: '',
  description: '',
  subject_id: '',
  section_id: '',
  due_date: '',
  has_solution: false,
  solution_text: ''
});

// Fallback Teacher Assignments (فقط المواد والفصول التي يدرسها المعلم)
const fallbackAssignments = [
  { assignment_id: 1, grade_name: 'الصف الثامن', section_name: '8أ', subject_name: 'الرياضيات', subject_id: 1, section_id: 1 },
  { assignment_id: 2, grade_name: 'الصف الثامن', section_name: '8أ', subject_name: 'العلوم العامة', subject_id: 2, section_id: 1 },
  { assignment_id: 3, grade_name: 'الصف التاسع', section_name: '9ب', subject_name: 'اللغة العربية', subject_id: 3, section_id: 2 }
];

const fallbackUpcomingExams = [
  // Day 1: الأحد 16 أغسطس 2026 (امتحانيين لصفين مختلفين)
  {
    id: 1,
    title: 'امتحان العلوم الشهري',
    description: 'اختبار تحصيلي يشمل فصول الفيزياء، الكيمياء، والمفاهيم الأساسية.',
    subject_name: 'العلوم العامة',
    grade_name: 'الصف الثامن',
    section_name: '8أ',
    due_date: '2026-08-16',
    duration: '09:00 ص (ساعة ونصف)',
    has_solution: true,
    solution_text: 'النموذج الاسترشادي لاختبار العلوم:\n1) أسئلة التبخر والتحول الحراري - الإجابة النموذجية المرفقة.'
  },
  {
    id: 2,
    title: 'اختبار القرآن والتفسير',
    description: 'اختبار في حفظ وتفسير السور المقررة للفصل الدراسي الأول.',
    subject_name: 'التربية الإسلامية',
    grade_name: 'الصف التاسع',
    section_name: '9ب',
    due_date: '2026-08-16',
    duration: '11:00 ص (ساعة واحدة)',
    has_solution: true,
    solution_text: 'نموذج إجابة مادة التربية الإسلامية المعتمد.'
  },

  // Day 2: الأربعاء 19 أغسطس 2026 (امتحان لصف آخر)
  {
    id: 3,
    title: 'امتحان الرياضيات النصف سنوي',
    description: 'تشمل أسئلة جبر وهندسة ومعادلات الدرجة الأولى والدرجة الثانية.',
    subject_name: 'الرياضيات',
    grade_name: 'الصف الثامن',
    section_name: '8أ',
    due_date: '2026-08-19',
    duration: '10:30 ص (ساعتان)',
    has_solution: false,
    solution_text: null
  },

  // Day 3: الأحد 23 أغسطس 2026 (امتحانيين)
  {
    id: 4,
    title: 'اختبار النحو والقراءة',
    description: 'اختبار تحصيلي في قواعد اللغة العربية وإعراب الأفعال والأسماء الخمسة.',
    subject_name: 'اللغة العربية',
    grade_name: 'الصف التاسع',
    section_name: '9ب',
    due_date: '2026-08-23',
    duration: '09:00 ص (ساعة واحدة)',
    has_solution: true,
    solution_text: 'النموذج الاسترشادي للغة العربية النحوي.'
  },
  {
    id: 5,
    title: 'امتحان المعمل والفيزياء',
    description: 'تجارب المعمل والدائرة الكهربائية والقياس الفيزيائي المقررة.',
    subject_name: 'العلوم العامة',
    grade_name: 'الصف الثامن',
    section_name: '8أ',
    due_date: '2026-08-23',
    duration: '11:00 ص (ساعة ونصف)',
    has_solution: true,
    solution_text: 'خطوات الحل والقياسات المعملية المعتمدة.'
  }
];

const fallbackResultsExams = [
  {
    id: 101,
    title: 'امتحان الشهر الأول - الرياضيات',
    description: 'اختبار معادلات الجبر والهندسة.',
    subject_name: 'الرياضيات',
    grade_name: 'الصف الثامن',
    section_name: '8أ',
    due_date: '2026-07-28',
    has_solution: true,
    solution_text: 'نموذج الإجابة المعتمد.'
  }
];

// 4. خيارات الفصول الدراسية التي يدرسها المعلم بدلاً من المواد
const teacherAssignments = computed(() => {
  return assignments.value.length > 0 ? assignments.value : fallbackAssignments;
});

const teacherClassOptions = computed(() => {
  const map = new Map();
  teacherAssignments.value.forEach(a => {
    const label = `${a.grade_name || ''} (${a.section_name || ''})`.trim();
    const key = label.replace(/\s+/g, '_');
    if (!map.has(key)) {
      map.set(key, { key, label, grade: a.grade_name, section: a.section_name });
    }
  });
  return Array.from(map.values());
});

// تصفية الامتحانات: عدم عرض أي مادة ليست للمعلم، والتصفية بحسب الفصل المختار
const upcomingExams = computed(() => {
  const list = exams.value.length > 0 ? exams.value : fallbackUpcomingExams;

  // تصفية قائمة الامتحانات فقط للفصول والمواد التي يدرسها المعلم
  const validTeacherList = list.filter(ex => {
    return teacherAssignments.value.some(a => 
      a.subject_name === ex.subject_name || 
      (a.section_name && ex.section_name && a.section_name === ex.section_name)
    );
  });

  if (selectedClassKey.value === 'ALL') return validTeacherList;

  const targetClass = teacherClassOptions.value.find(c => c.key === selectedClassKey.value);
  if (!targetClass) return validTeacherList;

  return validTeacherList.filter(ex => {
    const label = `${ex.grade_name || ''} (${ex.section_name || ''})`.trim();
    return label.includes(targetClass.section) || label.includes(targetClass.grade);
  });
});

const resultsExams = computed(() => {
  if (selectedClassKey.value === 'ALL') return fallbackResultsExams;
  const targetClass = teacherClassOptions.value.find(c => c.key === selectedClassKey.value);
  if (!targetClass) return fallbackResultsExams;
  return fallbackResultsExams.filter(ex => ex.section_name === targetClass.section);
});

const groupedUpcomingExams = computed(() => {
  if (upcomingExams.value.length === 0) return [];
  return groupExamsByDate(upcomingExams.value);
});

const groupedResultsExams = computed(() => {
  if (resultsExams.value.length === 0) return [];
  return groupExamsByDate(resultsExams.value);
});

function groupExamsByDate(list) {
  const groupsMap = {};
  list.forEach(ex => {
    const dateKey = ex.due_date || '2026-08-16';
    if (!groupsMap[dateKey]) groupsMap[dateKey] = [];
    groupsMap[dateKey].push(ex);
  });

  const sortedDates = Object.keys(groupsMap).sort();

  return sortedDates.map((dateKey, idx) => {
    const info = getDayInfo(dateKey);
    return {
      index: idx + 1,
      dateKey,
      dayName: info.dayName,
      dateFormatted: info.dateFormatted,
      exams: groupsMap[dateKey]
    };
  });
}

function getDayInfo(dateStr) {
  if (!dateStr) return { dayName: 'اليوم', dateFormatted: 'أغسطس 2026' };
  const d = new Date(dateStr);
  const dayNames = ['الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'];
  const monthNames = ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'];

  const dayName = isNaN(d.getDay()) ? 'اليوم' : dayNames[d.getDay()];
  const dayNum = isNaN(d.getDate()) ? '' : d.getDate();
  const monthName = isNaN(d.getMonth()) ? '' : monthNames[d.getMonth()];
  const year = isNaN(d.getFullYear()) ? '' : d.getFullYear();

  return {
    dayName,
    dateFormatted: `${dayName} ${dayNum} ${monthName} ${year}`.trim()
  };
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
  return '📝';
}

function formatDate(dateStr) {
  if (!dateStr) return 'غداً';
  return dateStr;
}

function openExamDrawer(exam) {
  selectedExam.value = exam;
  isDrawerOpen.value = true;
}

function openSolutionModal(exam) {
  selectedExam.value = exam;
  isModalOpen.value = true;
}

function onAssignmentChange() {
  if (selectedAssignmentObj.value) {
    newExam.subject_id = selectedAssignmentObj.value.subject_id;
    newExam.section_id = selectedAssignmentObj.value.section_id;
  }
}

async function loadData() {
  loading.value = true;
  try {
    const [tasksRes, assignRes] = await Promise.all([
      api.get('/teacher/tasks?task_type=EXAM'),
      api.get('/teacher/assignments')
    ]);
    if (tasksRes.data.success && tasksRes.data.data.length > 0) {
      exams.value = tasksRes.data.data;
    }
    if (assignRes.data.success && assignRes.data.data.length > 0) {
      assignments.value = assignRes.data.data;
    }
  } catch (err) {
    console.error('Failed to fetch teacher exams:', err);
  } finally {
    loading.value = false;
  }
}

async function handleCreateExam() {
  if (!newExam.title || !newExam.due_date) {
    alert('يرجى اختيار العنوان وتاريخ الامتحان.');
    return;
  }
  submitting.value = true;
  try {
    const formData = new FormData();
    formData.append('title', newExam.title);
    formData.append('description', newExam.description);
    formData.append('task_type', 'EXAM');
    formData.append('subject_id', newExam.subject_id || '1');
    formData.append('section_id', newExam.section_id || '1');
    formData.append('due_date', newExam.due_date);
    formData.append('has_solution', newExam.has_solution ? '1' : '0');
    formData.append('solution_text', newExam.solution_text);

    await api.post('/teacher/tasks', formData);
    showCreateModal.value = false;
    await loadData();
  } catch (err) {
    showCreateModal.value = false;
    await loadData();
  } finally {
    submitting.value = false;
  }
}

async function handleDeleteExam(id) {
  if (!confirm('هل أنت تأكد من رغبتك في حذف هذا الامتحان من المنظومة؟')) return;
  try {
    await api.delete(`/teacher/tasks/${id}`);
    isDrawerOpen.value = false;
    await loadData();
  } catch (err) {
    exams.value = exams.value.filter(e => e.id !== id);
    isDrawerOpen.value = false;
  }
}

onMounted(async () => {
  await loadData();
});
</script>

<style scoped>
.teacher-segmented-box {
  display: flex;
  flex-direction: column;
  gap: 12px;
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 22px;
  padding: 14px;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.03);
}

.hw-segmented-tabs-row {
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
}

.add-task-primary-btn {
  width: 100%;
  background: linear-gradient(135deg, #4f46e5 0%, #4338ca 100%);
  color: #ffffff;
  border: none;
  padding: 12px;
  border-radius: 14px;
  font-size: 13px;
  font-weight: 800;
  font-family: inherit;
  cursor: pointer;
  box-shadow: 0 6px 18px rgba(67, 56, 202, 0.25);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  transition: all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.add-task-primary-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 22px rgba(67, 56, 202, 0.35);
}

.loading-state, .empty-state {
  background: #ffffff;
  border-radius: 20px;
  padding: 30px;
  text-align: center;
  font-weight: 700;
  color: #64748b;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.03);
}

.exam-squircle-click {
  cursor: pointer;
}

/* Drawer & Modal Styling */
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

.drawer-delete-box {
  margin-top: 10px;
}

.shadcn-btn-danger {
  width: 100%;
  background: #fef2f2;
  color: #dc2626;
  border: 1px solid #fecaca;
  padding: 12px;
  border-radius: 14px;
  font-size: 13px;
  font-weight: 700;
  font-family: inherit;
  cursor: pointer;
  transition: all 0.2s ease;
}

.shadcn-btn-danger:hover {
  background: #fee2e2;
  border-color: #fca5a5;
}

.teacher-create-form {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.form-label {
  font-size: 12px;
  font-weight: 700;
  color: #334155;
}

.form-input {
  width: 100%;
  padding: 10px 12px;
  border-radius: 12px;
  border: 1px solid #cbd5e1;
  background: #ffffff;
  font-family: inherit;
  font-size: 13px;
  color: #0f172a;
  outline: none;
  box-sizing: border-box;
}

.solution-toggle-box {
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 14px;
  padding: 14px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  font-weight: 700;
  color: #334155;
  cursor: pointer;
}

.solution-dialog-content {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.section-title {
  font-size: 14px;
  font-weight: 800;
  color: #0f172a;
  margin-bottom: 8px;
}

.solution-text-box {
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 14px;
  padding: 14px;
  font-size: 13px;
  color: #1e293b;
  white-space: pre-line;
  line-height: 1.6;
}

.shadcn-btn-primary {
  background: #0f172a;
  color: #ffffff;
  border: none;
  padding: 10px 20px;
  border-radius: 12px;
  font-family: inherit;
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
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
