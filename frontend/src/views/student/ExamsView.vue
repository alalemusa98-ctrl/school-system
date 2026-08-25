<template>
  <StudentLayout 
    pageTitle="جدول الامتحانات" 
    pageSubtitle="مواعيد الاختبارات والحلول الاسترشادية"
    pageEmoji="📝"
  >
    <!-- Segmented Control Tab Switcher -->
    <section class="hw-filter-section">
      <div class="hw-segmented-control">
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
        </button>
      </div>

      <!-- Quick Subject Filter Pills (عمودياً: الأيقونة في الأعلى واسم المادة في الأسفل) -->
      <div class="subject-pills-row">
        <button 
          class="sub-pill" 
          :class="{ active: selectedSubject === 'ALL' }" 
          @click="selectedSubject = 'ALL'"
        >
          <div class="sub-pill-icon-top">🌟</div>
          <span class="sub-pill-name">الكل</span>
        </button>
        <button 
          v-for="sub in subjectOptions" 
          :key="sub.id"
          class="sub-pill"
          :class="{ active: selectedSubject === sub.id }"
          @click="selectedSubject = sub.id"
        >
          <img v-if="sub.image" :src="sub.image" class="sub-pill-3d-img" alt="" />
          <div v-else class="sub-pill-icon-top">{{ sub.icon }}</div>
          <span class="sub-pill-name">{{ sub.name }}</span>
        </button>
      </div>
    </section>

    <!-- Main Exams Grid Container (تجميع حسب أيام الامتحانات الفعليه فقط) -->
    <main class="hw-container">
      <div v-if="loading" class="loading-state">جاري استرجاع جدول الامتحانات... ⏳</div>

      <!-- Upcoming Exams View (كارد لكل يوم به امتحانات فقط) -->
      <div v-else-if="activeTab === 'upcoming'">
        <div v-if="groupedUpcomingExams.length === 0" class="empty-state">
          🎈 لا توجد امتحانات محددة حالياً لشعبتك!
        </div>

        <div v-else class="schedule-days-list">
          <article 
            v-for="group in groupedUpcomingExams" 
            :key="group.dateKey" 
            class="sched-ref-card"
          >
            <!-- 1. رقم المجموعة/اليوم في النتوء العلوي (مكان رقم 1 في الصورة) -->
            <div class="sched-ref-top-notch">
              {{ group.index }}
            </div>

            <!-- 4. اسم اليوم في رأس الكارد (مكان رقم 4 في الصورة) -->
            <div class="sched-ref-header-info">
              <h3 class="sched-ref-day-title">يوم {{ group.dayName }}</h3>
            </div>

            <!-- 2. شبكة مواد الامتحانات لهذا اليوم (زوز مواد كحد أقصى لكل صف) -->
            <div class="exam-ref-grid">
              <div 
                v-for="exam in group.exams" 
                :key="exam.id" 
                class="sched-subject-squircle exam-squircle-click"
                @click="openExamDrawer(exam)"
              >
                <!-- Squircle Icon -->
                <div class="sched-icon-box" :class="getSubjectColorClass(exam.subject_name)">
                  <img v-if="getSubjectImage(exam.subject_name)" :src="getSubjectImage(exam.subject_name)" class="subject-3d-icon-render" alt="" />
                  <span v-else>{{ getSubjectIcon(exam.subject_name) }}</span>
                </div>

                <!-- Status Badge -->
                <span class="sched-period-tag" :class="{ pending: !exam.has_solution }">
                  {{ exam.has_solution ? 'تم الحل' : 'محدد' }}
                </span>

                <!-- Subject Name -->
                <h4 class="sched-subject-name" :title="exam.subject_name">{{ exam.subject_name }}</h4>

                <!-- Teacher Name -->
                <span class="sched-teacher-name" :title="exam.teacher_name || 'أستاذ المادة'">
                  {{ exam.teacher_name || 'أستاذ المادة' }}
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
              <span>تاريخ اليوم: {{ group.dateFormatted }}</span>
            </div>
          </article>
        </div>
      </div>

      <!-- Exam Results Archive View -->
      <div v-else>
        <div v-if="groupedResultsExams.length === 0" class="empty-state">
          لا توجد نتائج اختبارات سابقة في السجل حالياً.
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
              <h3 class="sched-ref-day-title">نتائج يوم {{ group.dayName }}</h3>
            </div>

            <!-- 2. شبكة مواد الامتحانات (زوز مواد كحد أقصى لكل صف) -->
            <div class="exam-ref-grid">
              <div 
                v-for="exam in group.exams" 
                :key="exam.id" 
                class="sched-subject-squircle exam-squircle-click"
                @click="openExamDrawer(exam)"
              >
                <div class="sched-icon-box" :class="getSubjectColorClass(exam.subject_name)">
                  <img v-if="getSubjectImage(exam.subject_name)" :src="getSubjectImage(exam.subject_name)" class="subject-3d-icon-render" alt="" />
                  <span v-else>{{ getSubjectIcon(exam.subject_name) }}</span>
                </div>
                <span class="sched-period-tag success">{{ exam.score || '19.5/20' }}</span>
                <h4 class="sched-subject-name" :title="exam.subject_name">{{ exam.subject_name }}</h4>
                <span class="sched-teacher-name" :title="exam.teacher_name || 'أستاذ المادة'">
                  {{ exam.teacher_name || 'أستاذ المادة' }}
                </span>
              </div>
            </div>

            <!-- 3. Date Footer -->
            <div class="sched-ref-footer-date">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12 6 12 12 16 14"></polyline>
              </svg>
              <span>تاريخ الإعلان: {{ group.dateFormatted }}</span>
            </div>
          </article>
        </div>
      </div>
    </main>

    <!-- Side Drawer (دراوير جانبي يفتح عند النقر على المادة لعرض تفاصيل الامتحان) -->
    <ShadcnDrawer 
      v-model="isDrawerOpen" 
      :title="selectedExam ? selectedExam.title : 'تفاصيل الامتحان'"
      :description="selectedExam ? `مادة ${selectedExam.subject_name} • إعداد ${selectedExam.teacher_name || 'أستاذ المادة'}` : ''"
      :icon="selectedExam ? getSubjectIcon(selectedExam.subject_name) : '📝'"
    >
      <div v-if="selectedExam" class="drawer-exam-details">
        <!-- Status Banner -->
        <div class="drawer-status-banner" :class="{ verified: selectedExam.has_solution }">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
          <span>{{ selectedExam.has_solution ? 'تم توفير النموذج الإسترشادي والحل' : 'امتحان تحصيلي معتمد لشعبتك' }}</span>
        </div>

        <!-- Meta Grid -->
        <div class="drawer-info-grid">
          <div class="drawer-info-item">
            <span class="info-label">📅 تاريخ الامتحان</span>
            <span class="info-val">{{ formatDate(selectedExam.due_date) }}</span>
          </div>

          <div class="drawer-info-item">
            <span class="info-label">⏱️ التوقيت والزمن</span>
            <span class="info-val">{{ selectedExam.duration || '09:00 ص (ساعة ونصف)' }}</span>
          </div>

          <div class="drawer-info-item">
            <span class="info-label">🏫 القاعة الاختبارية</span>
            <span class="info-val">{{ selectedExam.location || 'القاعة رقم (3) - الدور الثاني' }}</span>
          </div>

          <div class="drawer-info-item" v-if="selectedExam.score">
            <span class="info-label">🌟 الدرجة المتحصل عليها</span>
            <span class="info-val score-highlight">{{ selectedExam.score }}</span>
          </div>
        </div>

        <!-- Description / Syllabus Topics -->
        <div class="drawer-section">
          <h4 class="drawer-section-title">📌 تفاصيل ومفردات المنهج المقررة:</h4>
          <p class="drawer-text-content">
            {{ selectedExam.description || 'امتحان تحصيلي تقييمي يهدف لقياس مدى استيعاب الطالب للمفاهيم والتمارين المقررة.' }}
          </p>
        </div>

        <!-- Solution Action Box inside Drawer -->
        <div class="drawer-solution-card">
          <div class="sol-card-info">
            <h5>📖 النموذج الاسترشادي والحل</h5>
            <p v-if="selectedExam.has_solution">ملف PDF يحتوي على أسئلة وإجابة النموذج الرسمي.</p>
            <p v-else>لم يقم أستاذ المادة بإرفاق النموذج الاسترشادي حتى الآن.</p>
          </div>
          <button 
            class="hw-ref-primary-pill-btn"
            :disabled="!selectedExam.has_solution"
            :class="{ disabled: !selectedExam.has_solution }"
            @click="openExamSolutionModal(selectedExam)"
          >
            عرض النموذج والحل ➔
          </button>
        </div>
      </div>

      <template #footer>
        <button class="shadcn-btn-secondary" @click="isDrawerOpen = false">إغلاق</button>
        <button 
          class="shadcn-btn-primary" 
          :disabled="!selectedExam?.has_solution"
          @click="openExamSolutionModal(selectedExam)"
        >
          فتح الحل النموذجي
        </button>
      </template>
    </ShadcnDrawer>

    <!-- Shadcn UI Dialog for Exam Model Solution -->
    <ShadcnDialog 
      v-model="isModalOpen" 
      :title="selectedExam ? `النموذج الاسترشادي: ${selectedExam.title}` : 'النموذج الاسترشادي'"
      :description="selectedExam ? `مادة ${selectedExam.subject_name} • إعداد ${selectedExam.teacher_name || 'أستاذ المادة'}` : ''"
      icon="📝"
    >
      <div v-if="selectedExam" class="solution-dialog-content">
        <div class="solution-section">
          <h4 class="section-title">📌 أسئلة ونموذج إجابة الامتحان الرسمي:</h4>
          <div class="solution-text-box">
            <p v-if="selectedExam.solution_text">
              {{ selectedExam.solution_text }}
            </p>
            <div v-else class="default-solution-steps">
              <p>• السؤال الأول (القسم النظري): الإجابة النموذجية معتمدة بناءً على مفاهيم كتاب المنهج الرسمي.</p>
              <p>• السؤال الثاني (التطبيقي): خطوات الإجابة النموذجية موضحة بالرسم وتوزيع درجات الجزئيات.</p>
              <p>• ملاحظة التصحيح: تم اعتماد الدرجات النهائية وتحديد ملخص مراجعة للامتحان النهائي.</p>
            </div>
          </div>
        </div>

        <div class="solution-attachment-box">
          <div class="file-icon-wrapper">
            📄
          </div>
          <div class="file-details">
            <span class="file-name">{{ selectedExam.solution_filename || 'النموذج_الاسترشادي_الرسمي.pdf' }}</span>
            <span class="file-meta">ملف الأسئلة والإجابة النموذجية (2.2 MB)</span>
          </div>
          <button class="download-action-btn" @click="downloadExamSolution(selectedExam)">
            تحميل
          </button>
        </div>
      </div>

      <template #footer>
        <button class="shadcn-btn-secondary" @click="isModalOpen = false">إغلاق</button>
        <button class="shadcn-btn-primary" @click="downloadExamSolution(selectedExam)">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
            <polyline points="7 10 12 15 17 10"></polyline>
            <line x1="12" y1="15" x2="12" y2="3"></line>
          </svg>
          تحميل النموذج (PDF)
        </button>
      </template>
    </ShadcnDialog>
  </StudentLayout>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import StudentLayout from '../../components/student/StudentLayout.vue';
import ShadcnDialog from '../../components/common/ShadcnDialog.vue';
import ShadcnDrawer from '../../components/common/ShadcnDrawer.vue';
import api from '../../services/api';
import math3dImg from '../../assets/math_3d.jpg';
import science3dImg from '../../assets/science_3d.jpg';
import islamic3dImg from '../../assets/islamic_3d.jpg';
import english3dImg from '../../assets/english_3d.jpg';

const loading = ref(true);
const activeTab = ref('upcoming');
const selectedSubject = ref('ALL');
const exams = ref([]);

const isDrawerOpen = ref(false);
const isModalOpen = ref(false);
const selectedExam = ref(null);

const subjectOptions = [
  { id: 'math', name: 'الرياضيات', image: math3dImg },
  { id: 'science', name: 'العلوم العامة', image: science3dImg },
  { id: 'arabic', name: 'اللغة العربية', icon: '📖' },
  { id: 'english', name: 'اللغة الإنجليزية', image: english3dImg },
  { id: 'islamic', name: 'التربية الإسلامية', image: islamic3dImg },
  { id: 'computer', name: 'الحاسوب والتقنية', icon: '💻' },
  { id: 'social', name: 'الدراسات الاجتماعية', icon: '🌍' }
];

const fallbackUpcomingExams = [
  // Day 1: الأحد 16 أغسطس 2026 (امتحانيين)
  {
    id: 1,
    title: 'امتحان العلوم الشهري',
    description: 'اختبار تحصيلي يشمل فصول الفيزياء، الكيمياء، والمفاهيم الأساسية.',
    subject_name: 'العلوم العامة',
    teacher_name: 'أ. فاطمة العبيدي',
    due_date: '2026-08-16',
    duration: '09:00 ص (ساعة ونصف)',
    location: 'القاعة رقم (3) - الدور الثاني',
    has_solution: true,
    solution_text: 'النموذج الاسترشادي لاختبار العلوم:\n1) أسئلة التبخر والتحول الحراري - الإجابة النموذجية المرفقة.',
    solution_filename: 'النموذج_الاسترشادي_علوم_شهر1.pdf'
  },
  {
    id: 2,
    title: 'اختبار القرآن والتفسير',
    description: 'اختبار في حفظ وتفسير السور المقررة للفصل الدراسي الأول.',
    subject_name: 'التربية الإسلامية',
    teacher_name: 'أ. أسامة علي',
    due_date: '2026-08-16',
    duration: '11:00 ص (ساعة واحدة)',
    location: 'القاعة رقم (1) - الدور الأول',
    has_solution: true,
    solution_text: 'نموذج إجابة مادة التربية الإسلامية المعتمد.',
    solution_filename: 'نموذج_إجابة_التربية_الإسلامية.pdf'
  },

  // Day 2: الأربعاء 19 أغسطس 2026 (امتحان واحد - بعد 3 أيام)
  {
    id: 3,
    title: 'امتحان الرياضيات النصف سنوي',
    description: 'تشمل أسئلة جبر وهندسة ومعادلات الدرجة الأولى والدرجة الثانية.',
    subject_name: 'الرياضيات',
    teacher_name: 'أ. أحمد سالم',
    due_date: '2026-08-19',
    duration: '10:30 ص (ساعتان)',
    location: 'المدرج التخصصي (أ)',
    has_solution: false,
    solution_text: null
  },

  // Day 3: الأحد 23 أغسطس 2026 (امتحانيين - بعد 4 أيام)
  {
    id: 4,
    title: 'اختبار النحو والقراءة',
    description: 'اختبار تحصيلي في قواعد اللغة العربية وإعراب الأفعال والأسماء الخمسة.',
    subject_name: 'اللغة العربية',
    teacher_name: 'أ. عمر الشريف',
    due_date: '2026-08-23',
    duration: '09:00 ص (ساعة واحدة)',
    location: 'القاعة رقم (5) - الدور الأول',
    has_solution: true,
    solution_text: 'النموذج الاسترشادي للغة العربية:\n- إعراب جملة الامتحان الرئيسية كاملة بجميع أركانها النحوية.',
    solution_filename: 'نموذج_إجابة_اللغة_العربية.pdf'
  },
  {
    id: 5,
    title: 'امتحان المعمل والفيزياء',
    description: 'تجارب المعمل والدائرة الكهربائية والقياس الفيزيائي المقررة.',
    subject_name: 'العلوم العامة',
    teacher_name: 'أ. فاطمة العبيدي',
    due_date: '2026-08-23',
    duration: '11:00 ص (ساعة ونصف)',
    location: 'معمل العلوم والتجريب',
    has_solution: true,
    solution_text: 'خطوات الحل والقياسات المعملية المعتمدة.',
    solution_filename: 'تقرير_المعمل_والفيزياء.pdf'
  },

  // Day 4: الخميس 27 أغسطس 2026 (امتحان واحد - بعد 4 أيام)
  {
    id: 6,
    title: 'Unit 3 Comprehensive Exam',
    description: 'Grammar, Reading Comprehension and Vocabulary Exam for Grade 8.',
    subject_name: 'اللغة الإنجليزية',
    teacher_name: 'أ. مريم الفيتوري',
    due_date: '2026-08-27',
    duration: '10:00 ص (ساعة ونصف)',
    location: 'المعمل التخصصي (2)',
    has_solution: true,
    solution_text: 'English Exam Model Answer Key.',
    solution_filename: 'English_Unit3_Solution.pdf'
  }
];

const fallbackResultsExams = [
  {
    id: 101,
    title: 'امتحان الشهر الأول - اللغة الإنجليزية',
    description: 'Unit 1 & Unit 2 Grammar and Comprehension Exam.',
    subject_name: 'اللغة الإنجليزية',
    teacher_name: 'أ. مريم الفيتوري',
    due_date: '2026-07-28',
    score: '19.5 / 20 🌟',
    feedback: 'أداء ممتاز جداً وإتقان تام لدروس والقواعد.',
    has_solution: true,
    solution_text: 'English Exam Model Solution:\n1. Section A (Comprehension): 5/5\n2. Section B (Grammar): 14.5/15',
    solution_filename: 'English_Exam1_Solution.pdf'
  }
];

const upcomingExams = computed(() => {
  return exams.value.length > 0 ? exams.value.map(e => ({
    ...e,
    has_solution: e.has_solution ?? true
  })) : fallbackUpcomingExams;
});

const resultsExams = computed(() => {
  return fallbackResultsExams;
});

const filteredUpcomingExams = computed(() => {
  if (selectedSubject.value === 'ALL') return upcomingExams.value;
  return upcomingExams.value.filter(e => getSubjectId(e.subject_name) === selectedSubject.value);
});

const filteredResultsExams = computed(() => {
  if (selectedSubject.value === 'ALL') return resultsExams.value;
  return resultsExams.value.filter(e => getSubjectId(e.subject_name) === selectedSubject.value);
});

// Group upcoming exams dynamically by day date
const groupedUpcomingExams = computed(() => {
  const filtered = filteredUpcomingExams.value;
  if (filtered.length === 0) return [];

  const groupsMap = {};
  filtered.forEach(exam => {
    const dateKey = exam.due_date || '2026-08-16';
    if (!groupsMap[dateKey]) {
      groupsMap[dateKey] = [];
    }
    groupsMap[dateKey].push(exam);
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
});

// Group results exams dynamically by day date
const groupedResultsExams = computed(() => {
  const filtered = filteredResultsExams.value;
  if (filtered.length === 0) return [];

  const groupsMap = {};
  filtered.forEach(exam => {
    const dateKey = exam.due_date || '2026-07-28';
    if (!groupsMap[dateKey]) {
      groupsMap[dateKey] = [];
    }
    groupsMap[dateKey].push(exam);
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
});

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

function getSubjectId(name) {
  if (!name) return 'other';
  if (name.includes('رياضيات')) return 'math';
  if (name.includes('علوم')) return 'science';
  if (name.includes('عرب')) return 'arabic';
  if (name.includes('إنكليز') || name.includes('إنجليزية') || name.includes('English')) return 'english';
  if (name.includes('إسلام') || name.includes('دين') || name.includes('قرآن')) return 'islamic';
  if (name.includes('حاسوب') || name.includes('تقنية')) return 'computer';
  if (name.includes('اجتماع') || name.includes('جغرافيا') || name.includes('تاريخ')) return 'social';
  return 'other';
}

function getSubjectColorClass(name) {
  const id = getSubjectId(name);
  if (id === 'math') return 'math';
  if (id === 'science') return 'science';
  if (id === 'arabic') return 'arabic';
  if (id === 'english') return 'english';
  if (id === 'islamic') return 'islamic';
  if (id === 'computer') return 'computer';
  if (id === 'social') return 'social';
  return 'default';
}

function getSubjectImage(name) {
  const id = getSubjectId(name);
  if (id === 'math') return math3dImg;
  if (id === 'science') return science3dImg;
  if (id === 'islamic') return islamic3dImg;
  if (id === 'english') return english3dImg;
  return null;
}

function getSubjectIcon(name) {
  const id = getSubjectId(name);
  if (id === 'math') return '📐';
  if (id === 'science') return '🔬';
  if (id === 'arabic') return '📖';
  if (id === 'english') return '🔤';
  if (id === 'islamic') return '🕌';
  if (id === 'computer') return '💻';
  if (id === 'social') return '🌍';
  return '📝';
}

function formatDate(d) {
  if (!d) return 'الخميس 13 أغسطس 2026';
  return d;
}

function openExamDrawer(exam) {
  selectedExam.value = exam;
  isDrawerOpen.value = true;
}

function openExamSolutionModal(exam) {
  if (!exam || !exam.has_solution) return;
  selectedExam.value = exam;
  isDrawerOpen.value = true;
  isModalOpen.value = true;
}

function downloadExamSolution(exam) {
  alert(`جاري تحميل النموذج الاسترشادي والحل: ${exam ? (exam.solution_filename || 'النموذج_الاسترشادي.pdf') : 'النموذج.pdf'}... 📥`);
}

onMounted(async () => {
  try {
    const res = await api.get('/student/tasks?task_type=EXAM');
    if (res.data.success && res.data.data.length > 0) {
      exams.value = res.data.data;
    }
  } catch (err) {
    console.error('Failed to fetch exams:', err);
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

.exam-squircle-click {
  cursor: pointer;
}

/* Drawer Internal Exam Details Styles */
.drawer-exam-details {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.drawer-status-banner {
  display: flex;
  align-items: center;
  gap: 8px;
  background: #fef3c7;
  color: #92400e;
  border: 1px solid #fcd34d;
  padding: 10px 14px;
  border-radius: 14px;
  font-size: 12px;
  font-weight: 700;
}

.drawer-status-banner.verified {
  background: #dcfce7;
  color: #15803d;
  border-color: #86efac;
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

.score-highlight {
  color: #b45309;
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

/* Solution Dialog Styles */
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

.default-solution-steps p {
  margin-bottom: 6px;
}

.solution-attachment-box {
  background: #eef2ff;
  border: 1px solid #c7d2fe;
  border-radius: 14px;
  padding: 12px 16px;
  display: flex;
  align-items: center;
  gap: 12px;
}

.file-icon-wrapper {
  font-size: 24px;
}

.file-details {
  display: flex;
  flex-direction: column;
  flex: 1;
}

.file-name {
  font-size: 13px;
  font-weight: 800;
  color: #312e81;
}

.file-meta {
  font-size: 11px;
  color: #4338ca;
  font-weight: 600;
}

.download-action-btn {
  background: #4338ca;
  color: #ffffff;
  border: none;
  padding: 6px 14px;
  border-radius: 10px;
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;
  transition: background 0.2s ease;
}

.download-action-btn:hover {
  background: #3730a3;
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
  display: inline-flex;
  align-items: center;
  gap: 6px;
  transition: all 0.2s ease;
}

.shadcn-btn-primary:hover {
  background: #1e293b;
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

.shadcn-btn-secondary:hover {
  background: #f1f5f9;
}
</style>
