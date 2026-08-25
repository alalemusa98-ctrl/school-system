<template>
  <StudentLayout 
    pageTitle="تفاصيل الواجبات" 
    pageSubtitle="متابعة الواجبات والحلول النموذجية"
    pageEmoji="📚"
  >
    <!-- Segmented Control Tab Switcher -->
    <section class="hw-filter-section">
      <div class="hw-segmented-control">
        <button 
          class="hw-tab-btn" 
          :class="{ active: activeTab === 'current' }" 
          @click="activeTab = 'current'"
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
            <circle cx="12" cy="12" r="10"></circle>
            <polyline points="12 6 12 12 16 14"></polyline>
          </svg>
          <span>الواجبات الحالية</span>
          <span class="hw-count-badge">{{ currentHomeworks.length }}</span>
        </button>

        <button 
          class="hw-tab-btn" 
          :class="{ active: activeTab === 'previous' }" 
          @click="activeTab = 'previous'"
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
            <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
          </svg>
          <span>الأرشيف</span>
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

    <!-- Main Homework List Container (مطابق للتصميم المعتمد في صفحة الامتحانات والجدول) -->
    <main class="hw-container">
      <div v-if="loading" class="loading-state">جاري استرجاع الواجبات المدرسية... ⏳</div>

      <!-- Current Homeworks List (كاردات مجمعة حسب أيام التسليم الفعلية) -->
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
            <!-- 1. رقم اليوم/المجموعة في النتوء العلوي (مكان رقم 1 في الصورة) -->
            <div class="sched-ref-top-notch">
              {{ group.index }}
            </div>

            <!-- 4. اسم اليوم في رأس الكارد (مكان رقم 4 في الصورة) -->
            <div class="sched-ref-header-info">
              <h3 class="sched-ref-day-title">واجبات يوم {{ group.dayName }}</h3>
            </div>

            <!-- 2. شبكة مواد الواجبات لهذا اليوم (زوز مواد 2 كحد أقصى لكل صف) -->
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

            <!-- 3. تاريخ التسليم في الأسفل (مكان رقم 3 في الصورة المرجعية) -->
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
            <!-- 1. Top Notch -->
            <div class="sched-ref-top-notch">
              {{ group.index }}
            </div>

            <!-- 4. Header Title -->
            <div class="sched-ref-header-info">
              <h3 class="sched-ref-day-title">أرشيف واجبات يوم {{ group.dayName }}</h3>
            </div>

            <!-- 2. Grid (2 max per row) -->
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

            <!-- 3. Date Footer -->
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
    </main>

    <!-- Side Drawer (دراوير جانبي تفاعلي عند الضغط على مادة الواجب) -->
    <ShadcnDrawer 
      v-model="isDrawerOpen" 
      :title="selectedHw ? selectedHw.title : 'تفاصيل الواجب المالي'"
      :description="selectedHw ? `مادة ${selectedHw.subject_name} • إعداد ${selectedHw.teacher_name || 'أستاذ المادة'}` : ''"
      :icon="selectedHw ? getSubjectIcon(selectedHw.subject_name) : '📚'"
    >
      <div v-if="selectedHw" class="drawer-exam-details">
        <!-- Status Banner -->
        <div class="drawer-status-banner" :class="{ verified: selectedHw.submitted }">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
          <span>{{ selectedHw.submitted ? 'تم إرسال الواجب وتسليمه بنجاح' : 'واجب معلق - مطلوب إنجازه وتسليمه' }}</span>
        </div>

        <!-- Meta Grid -->
        <div class="drawer-info-grid">
          <div class="drawer-info-item">
            <span class="info-label">📅 تاريخ التسليم الأقصى</span>
            <span class="info-val">{{ formatDate(selectedHw.due_date) }}</span>
          </div>

          <div class="drawer-info-item">
            <span class="info-label">👨‍🏫 الأستاذ المسؤول</span>
            <span class="info-val">{{ selectedHw.teacher_name || 'أستاذ المادة' }}</span>
          </div>

          <div class="drawer-info-item">
            <span class="info-label">📄 الملف المرفق</span>
            <span class="info-val">{{ selectedHw.attachment_name || selectedHw.attachment_path || 'تمرين_الواجب.pdf' }}</span>
          </div>

          <div class="drawer-info-item" v-if="selectedHw.score">
            <span class="info-label">🌟 الدرجة والتقييم</span>
            <span class="info-val score-highlight">{{ selectedHw.score }}</span>
          </div>
        </div>

        <!-- Description / Homework Instructions -->
        <div class="drawer-section">
          <h4 class="drawer-section-title">📌 المطلـوب في الواجب المدرسي:</h4>
          <p class="drawer-text-content">
            {{ selectedHw.description || 'يرجى حل تمارين الواجب المحددة بالكامل وإرسال الإجابة قبل تاريخ التسليم الأقصى.' }}
          </p>
        </div>

        <!-- Solution Action Box inside Drawer -->
        <div class="drawer-solution-card">
          <div class="sol-card-info">
            <h5>📖 الحل النموذجي المعتمد</h5>
            <p v-if="selectedHw.has_solution">ملف PDF يحتوي على خطوات الحل والإجابة النموذجية المعتمدة.</p>
            <p v-else>لم يقم أستاذ المادة بإرفاق الحل النموذجي بعد.</p>
          </div>
          <button 
            class="hw-ref-primary-pill-btn"
            :disabled="!selectedHw.has_solution"
            :class="{ disabled: !selectedHw.has_solution }"
            @click="openSolutionModal(selectedHw)"
          >
            عرض الحل النموذجي ➔
          </button>
        </div>
      </div>

      <template #footer>
        <button class="shadcn-btn-secondary" @click="isDrawerOpen = false">إغلاق</button>
        <button 
          class="shadcn-btn-primary" 
          :disabled="!selectedHw?.has_solution"
          @click="openSolutionModal(selectedHw)"
        >
          فتح الحل النموذجي
        </button>
      </template>
    </ShadcnDrawer>

    <!-- Shadcn UI Dialog for Homework Model Solution -->
    <ShadcnDialog 
      v-model="isModalOpen" 
      :title="selectedHw ? `الحل النموذجي: ${selectedHw.title}` : 'الحل النموذجي المعتمد'"
      :description="selectedHw ? `مادة ${selectedHw.subject_name} • إعداد ${selectedHw.teacher_name || 'أستاذ المادة'}` : ''"
      icon="💡"
    >
      <div v-if="selectedHw" class="solution-dialog-content">
        <div class="solution-section">
          <h4 class="section-title">📌 مفردات وخطوات الحل النموذجي المعتمد:</h4>
          <div class="solution-text-box">
            <p v-if="selectedHw.solution_text">
              {{ selectedHw.solution_text }}
            </p>
            <div v-else class="default-solution-steps">
              <p>1. صياغة القواعد الأساسية والإجابة النموذجية المعتمدة للمادة.</p>
              <p>2. توزيع الدرجات التفصيلية والخطوات الواجب إتباعها.</p>
            </div>
          </div>
        </div>

        <div class="solution-attachment-box">
          <div class="file-icon-wrapper">
            📄
          </div>
          <div class="file-details">
            <span class="file-name">{{ selectedHw.solution_filename || 'الحل_النموذجي_المعتمد.pdf' }}</span>
            <span class="file-meta">ملف PDF شامل يحتوي على الإجابات النموذجية (1.8 MB)</span>
          </div>
          <button class="download-action-btn" @click="downloadSolution(selectedHw)">
            تحميل
          </button>
        </div>
      </div>

      <template #footer>
        <button class="shadcn-btn-secondary" @click="isModalOpen = false">إغلاق</button>
        <button class="shadcn-btn-primary" @click="downloadSolution(selectedHw)">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
            <polyline points="7 10 12 15 17 10"></polyline>
            <line x1="12" y1="15" x2="12" y2="3"></line>
          </svg>
          تحميل الحل النموذجي (PDF)
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
import math3dImg from '../../assets/math_3d.jpg';
import science3dImg from '../../assets/science_3d.jpg';
import islamic3dImg from '../../assets/islamic_3d.jpg';
import english3dImg from '../../assets/english_3d.jpg';

const loading = ref(true);
const activeTab = ref('current');
const selectedSubject = ref('ALL');
const homeworks = ref([]);

const isDrawerOpen = ref(false);
const isModalOpen = ref(false);
const selectedHw = ref(null);

const subjectOptions = [
  { id: 'math', name: 'الرياضيات', image: math3dImg },
  { id: 'science', name: 'العلوم العامة', image: science3dImg },
  { id: 'arabic', name: 'اللغة العربية', icon: '📖' },
  { id: 'english', name: 'اللغة الإنجليزية', image: english3dImg },
  { id: 'islamic', name: 'التربية الإسلامية', image: islamic3dImg },
  { id: 'computer', name: 'الحاسوب والتقنية', icon: '💻' },
  { id: 'social', name: 'الدراسات الاجتماعية', icon: '🌍' }
];

const fallbackCurrentHomeworks = [
  // Day 1: الأحد 16 أغسطس 2026 (واجبين)
  {
    id: 101,
    title: 'تمارين ص 45 (معادلات الدرجة الأولى)',
    description: 'حل التمارين رقم (1، 3، 5، 7) في كراسة الواجبات مع كتابة خطوات الحل بالكامل والتأكد من صحة النتائج.',
    subject_name: 'الرياضيات',
    due_date: '2026-08-16',
    teacher_name: 'أ. أحمد سالم',
    attachment_name: 'ورقة_عمل_المعادلات.pdf',
    statusText: 'معلق - مطلوب تسليمه',
    submitted: false,
    has_solution: true,
    solution_text: 'خطوات حل معادلات الدرجة الأولى:\n1) تجميع المتغيرات في طرف والأعداد الثابتة في الطرف الآخر مع تغيير الإشارة.\n2) القسمة على معامل المتغير س للوصول للحل النهائي.\n3) س = 5 (النتيجة النموذجية للتمارين 1 و 3).',
    solution_filename: 'الحل_النموذجي_رياضيات_ص45.pdf'
  },
  {
    id: 102,
    title: 'تقرير تجربة دورة الماء والتبخر',
    description: 'كتابة ملخص تجربة المعمل حول مراحل التبخر والتكثف وتأثير الحرارة، مرفق برسم توضيحي لدورة الماء في الطبيعة.',
    subject_name: 'العلوم العامة',
    due_date: '2026-08-16',
    teacher_name: 'أ. فاطمة العبيدي',
    attachment_name: 'رسم_توضيحي_المعمل.png',
    statusText: 'قيد المراجعة والمعاينة',
    submitted: true,
    has_solution: false,
    solution_text: null
  },

  // Day 2: الأربعاء 19 أغسطس 2026 (واجب واحد)
  {
    id: 103,
    title: 'إعراب سورة النبأ (الأيات 1-10)',
    description: 'استخراج الفاعل والمفعول به والأفعال الماضية والمضارعة من السورة الكريمة وكتابتها في كراسة النحو والصرف.',
    subject_name: 'اللغة العربية',
    due_date: '2026-08-19',
    teacher_name: 'أ. عمر الشريف',
    attachment_name: 'جدول_القواعد_الإعرابية.pdf',
    statusText: 'جديد',
    submitted: false,
    has_solution: true,
    solution_text: 'إعراب نموذج الآية الكريمة:\n- "عَمَّ": عَنْ: حرف جر، ومَا: اسم استفهام مبني في محل جر بحرف الجر.\n- "يَتَسَاءَلُونَ": فعل مضارع مرفوع بثبوت النون لأنه من الأفعال الخمسة، والواو فاعل.',
    solution_filename: 'إعراب_سورة_النبأ_نموذجي.pdf'
  },

  // Day 3: الأحد 23 أغسطس 2026 (واجبين)
  {
    id: 104,
    title: 'Unit 3 Vocabulary & Reading Sheet',
    description: 'Solve page 24 exercises in workbook and upload final solution worksheet.',
    subject_name: 'اللغة الإنجليزية',
    due_date: '2026-08-23',
    teacher_name: 'أ. مريم الفيتوري',
    attachment_name: 'Workbook_Unit3.pdf',
    statusText: 'معلق',
    submitted: false,
    has_solution: true,
    solution_text: 'Unit 3 Vocabulary & Reading Answers.',
    solution_filename: 'English_Unit3_Worksheet.pdf'
  },
  {
    id: 105,
    title: 'تفسير وآيات سورة الملك',
    description: 'كتابة فوائد وأحكام سورة الملك ص 10 إلى ص 14.',
    subject_name: 'التربية الإسلامية',
    teacher_name: 'أ. أسامة علي',
    due_date: '2026-08-23',
    teacher_name: 'أ. أسامة علي',
    attachment_name: 'تفسير_سورة_الملك.pdf',
    statusText: 'معلق',
    submitted: false,
    has_solution: true,
    solution_text: 'نموذج التفسير والفوائد الاستنباطية.',
    solution_filename: 'تفسير_سورة_الملك_معتمد.pdf'
  }
];

const fallbackArchiveHomeworks = [
  {
    id: 201,
    title: 'Unit 3: Past Simple Grammar Exercises',
    description: 'حل أسئلة القواعد بكتاب النشاط صفحة 22 وإرسال صورة الحل.',
    subject_name: 'اللغة الإنجليزية',
    due_date: '2026-08-05',
    teacher_name: 'أ. مريم الفيتوري',
    score: '10 / 10 🌟',
    feedback: 'ممتاز جداً! خط واضح وإجابات دقيقة وإتقان تام للقواعد. أحسنت! 👏',
    has_solution: true,
    solution_text: 'Unit 3 Model Solution:\n1. Past Simple: subject + verb(-ed) / irregular verb.\n2. Example: She walked to school yesterday.',
    solution_filename: 'Unit3_PastSimple_Solution.pdf'
  }
];

const currentHomeworks = computed(() => {
  return homeworks.value.length > 0 ? homeworks.value.map(hw => ({
    ...hw,
    has_solution: hw.has_solution ?? Boolean(hw.solution_url || hw.solution_text)
  })) : fallbackCurrentHomeworks;
});

const archiveHomeworks = computed(() => {
  return fallbackArchiveHomeworks;
});

const filteredCurrentHomeworks = computed(() => {
  if (selectedSubject.value === 'ALL') return currentHomeworks.value;
  return currentHomeworks.value.filter(hw => getSubjectId(hw.subject_name) === selectedSubject.value);
});

const filteredArchiveHomeworks = computed(() => {
  if (selectedSubject.value === 'ALL') return archiveHomeworks.value;
  return archiveHomeworks.value.filter(hw => getSubjectId(hw.subject_name) === selectedSubject.value);
});

// Group current homeworks dynamically by due date (hiding empty days)
const groupedCurrentHomeworks = computed(() => {
  const filtered = filteredCurrentHomeworks.value;
  if (filtered.length === 0) return [];

  const groupsMap = {};
  filtered.forEach(hw => {
    const dateKey = hw.due_date || '2026-08-16';
    if (!groupsMap[dateKey]) {
      groupsMap[dateKey] = [];
    }
    groupsMap[dateKey].push(hw);
  });

  const sortedDates = Object.keys(groupsMap).sort();

  return sortedDates.map((dateKey, idx) => {
    const info = getDayInfo(dateKey);
    return {
      index: idx + 1,
      dateKey,
      dayName: info.dayName,
      dateFormatted: info.dateFormatted,
      homeworks: groupsMap[dateKey]
    };
  });
});

// Group archive homeworks dynamically by due date
const groupedArchiveHomeworks = computed(() => {
  const filtered = filteredArchiveHomeworks.value;
  if (filtered.length === 0) return [];

  const groupsMap = {};
  filtered.forEach(hw => {
    const dateKey = hw.due_date || '2026-08-05';
    if (!groupsMap[dateKey]) {
      groupsMap[dateKey] = [];
    }
    groupsMap[dateKey].push(hw);
  });

  const sortedDates = Object.keys(groupsMap).sort();

  return sortedDates.map((dateKey, idx) => {
    const info = getDayInfo(dateKey);
    return {
      index: idx + 1,
      dateKey,
      dayName: info.dayName,
      dateFormatted: info.dateFormatted,
      homeworks: groupsMap[dateKey]
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
  return '📚';
}

function formatDate(dateStr) {
  if (!dateStr) return 'غداً';
  return dateStr;
}

function openHomeworkDrawer(hw) {
  selectedHw.value = hw;
  isDrawerOpen.value = true;
}

function openSolutionModal(hw) {
  if (!hw || !hw.has_solution) return;
  selectedHw.value = hw;
  isDrawerOpen.value = true;
  isModalOpen.value = true;
}

function downloadSolution(hw) {
  alert(`جاري تحميل ملف الحل النموذجي: ${hw ? (hw.solution_filename || 'الحل_النموذجي.pdf') : 'الحل.pdf'}... 📥`);
}

onMounted(async () => {
  try {
    const res = await api.get('/student/tasks?task_type=HOMEWORK');
    if (res.data.success && res.data.data.length > 0) {
      homeworks.value = res.data.data;
    }
  } catch (err) {
    console.error('Failed to fetch homeworks:', err);
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

/* Solution Dialog & Drawer Styles */
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
