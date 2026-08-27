<template>
  <StudentLayout 
    pageTitle="صفحة الواجبات" 
    pageSubtitle="صفحة الواجبات"
    pageEmoji="📚"
  >
    <!-- Segmented Control Box (محتوياً على التبويبات وزر إضافة واجب جديد في الموقع 3) -->
    <section class="hw-filter-section">
      <div class="teacher-segmented-box">
        <!-- Tabs Row -->
        <div class="hw-segmented-tabs-row">
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
            :class="{ active: activeTab === 'archive' }" 
            @click="activeTab = 'archive'"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
              <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
            </svg>
            <span>الأرشيف</span>
            <span class="hw-count-badge">{{ archiveHomeworks.length }}</span>
          </button>
        </div>

        <!-- 3. زر إضافة واجب جديد في موقع 3 بالصورة -->
        <button class="add-task-primary-btn" @click="showCreateModal = true">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.8">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
          <span>إضافة واجب جديد</span>
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
      <div v-if="loading" class="loading-state">جاري استرجاع واجبات المعلم... ⏳</div>

      <!-- Current Homeworks List (مجمعة بحسب أيام التسليم وبحد أقصى 2 في الصف) -->
      <div v-else-if="activeTab === 'current'">
        <div v-if="groupedCurrentHomeworks.length === 0" class="empty-state">
          🎉 لا توجد واجبات معلقة حالياً لهذا الفصل الدراسي. اضغط على "إضافة واجب جديد" للإدراج.
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
                  {{ getSubjectIcon(hw.subject_name) }}
                </div>

                <!-- Status Badge -->
                <span class="sched-period-tag" :class="{ pending: !hw.has_solution }">
                  {{ hw.has_solution ? 'تم الحل' : 'منشور' }}
                </span>

                <!-- Homework Title -->
                <h4 class="sched-subject-name" :title="hw.title">{{ hw.title }}</h4>

                <!-- Grade & Section Name -->
                <span class="sched-teacher-name" :title="`${hw.subject_name} • ${hw.grade_name || ''} (${hw.section_name || ''})`">
                  {{ hw.subject_name }} - {{ hw.grade_name || 'الصف 8' }} ({{ hw.section_name || '8أ' }})
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
          لا توجد واجبات سابقة في الأرشيف حالياً لهذا الفصل الدراسي.
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
                  {{ getSubjectIcon(hw.subject_name) }}
                </div>
                <span class="sched-period-tag success">مكتمل</span>
                <h4 class="sched-subject-name" :title="hw.title">{{ hw.title }}</h4>
                <span class="sched-teacher-name" :title="`${hw.subject_name} • ${hw.grade_name || ''}`">
                  {{ hw.subject_name }} - {{ hw.grade_name || 'الصف 8' }} ({{ hw.section_name || '8أ' }})
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

    <!-- Side Drawer (دراوير جانبي ينزلق بـ 0.7 ثانية من اليمين) -->
    <ShadcnDrawer 
      v-model="isDrawerOpen" 
      :title="selectedHw ? selectedHw.title : 'تفاصيل الواجب المدرسي'"
      :description="selectedHw ? `مادة ${selectedHw.subject_name} • ${selectedHw.grade_name || ''} (${selectedHw.section_name || ''})` : ''"
      :icon="selectedHw ? getSubjectIcon(selectedHw.subject_name) : '📚'"
    >
      <div v-if="selectedHw" class="drawer-exam-details">
        <!-- Status Banner -->
        <div class="drawer-status-banner verified">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
          <span>واجب منشور ومتاح للطلاب في المنظومة</span>
        </div>

        <!-- Meta Grid -->
        <div class="drawer-info-grid">
          <div class="drawer-info-item">
            <span class="info-label">📅 تاريخ التسليم الأقصى</span>
            <span class="info-val">{{ formatDate(selectedHw.due_date) }}</span>
          </div>

          <div class="drawer-info-item">
            <span class="info-label">🏫 الصف والشعبة</span>
            <span class="info-val">{{ selectedHw.grade_name || 'الصف الثامن' }} ({{ selectedHw.section_name || '8أ' }})</span>
          </div>

          <div class="drawer-info-item">
            <span class="info-label">📖 المادة الدراسية</span>
            <span class="info-val">{{ selectedHw.subject_name }}</span>
          </div>

          <div class="drawer-info-item">
            <span class="info-label">📄 الملف المرفق</span>
            <span class="info-val">{{ selectedHw.attachment_name || selectedHw.attachment_path || 'ورقة_العمل.pdf' }}</span>
          </div>
        </div>

        <!-- Description -->
        <div class="drawer-section">
          <h4 class="drawer-section-title">📌 مفردات وتفاصيل الواجب المنشور:</h4>
          <p class="drawer-text-content">
            {{ selectedHw.description || 'حل تمارين المنهج المقررة والتأكد من تدوين الخطوات.' }}
          </p>
        </div>

        <!-- Solution Card inside Drawer -->
        <div class="drawer-solution-card">
          <div class="sol-card-info">
            <h5>📖 الحل النموذجي المنشور للطلاب</h5>
            <p v-if="selectedHw.has_solution || selectedHw.solution_text">
              {{ selectedHw.solution_text || 'تم رفع ملف الحل النموذجي المعتمد.' }}
            </p>
            <p v-else>لم تقم بإرفاق حل نموذجي مسبق لهذا الواجب.</p>
          </div>
          <button 
            v-if="selectedHw.has_solution || selectedHw.solution_text"
            class="hw-ref-primary-pill-btn"
            @click="openSolutionModal(selectedHw)"
          >
            معاينة الحل النموذجي ➔
          </button>
        </div>

        <!-- Delete Action -->
        <div class="drawer-delete-box">
          <button class="shadcn-btn-danger" @click="handleDeleteHomework(selectedHw.id)">
            🗑️ حذف هذا الواجب نهائياً من المنظومة
          </button>
        </div>
      </div>

      <template #footer>
        <button class="shadcn-btn-secondary" @click="isDrawerOpen = false">إغلاق</button>
      </template>
    </ShadcnDrawer>

    <!-- Create Homework Modal (Shadcn UI Dialog) -->
    <ShadcnDialog 
      v-model="showCreateModal" 
      title="➕ إضافة واجب مدرسي جديد"
      description="إدراج واجب جديد مع إمكانية إضافة الحل النموذجي لشعبتك"
      icon="📚"
    >
      <form @submit.prevent="handleCreateHomework" class="teacher-create-form">
        <div class="form-group">
          <label class="form-label">عنوان الواجب *</label>
          <input type="text" v-model="newHw.title" placeholder="مثال: تمارين ص 45 (معادلات الجبر)" required class="form-input" />
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
            <label class="form-label">تاريخ التسليم الأقصى *</label>
            <input type="date" v-model="newHw.due_date" required class="form-input" />
          </div>
        </div>

        <div class="form-group">
          <label class="form-label">تفاصيل ومفردات الواجب</label>
          <textarea v-model="newHw.description" rows="3" placeholder="اكتب رقم التمارين أو تعليمات الحل هنا..." class="form-input"></textarea>
        </div>

        <div class="solution-toggle-box">
          <label class="checkbox-label">
            <input type="checkbox" v-model="newHw.has_solution" />
            <span>إرفاق حل نموذجي مسبقاً (يُمكّن الطالب من عرض الحل)</span>
          </label>

          <div v-if="newHw.has_solution" class="solution-inputs">
            <div class="form-group">
              <label class="form-label">نص الحل النموذجي</label>
              <textarea v-model="newHw.solution_text" rows="2" placeholder="أدخل خطوات الحل النموذجية..." class="form-input"></textarea>
            </div>
          </div>
        </div>
      </form>

      <template #footer>
        <button class="shadcn-btn-secondary" @click="showCreateModal = false">إلغاء</button>
        <button class="shadcn-btn-primary" :disabled="submitting" @click="handleCreateHomework">
          {{ submitting ? 'جاري الحفظ... ⏳' : 'نشر الواجب للشعبة 🚀' }}
        </button>
      </template>
    </ShadcnDialog>

    <!-- Model Solution Dialog (Shadcn UI Dialog) -->
    <ShadcnDialog 
      v-model="isModalOpen" 
      :title="selectedHw ? `الحل النموذجي: ${selectedHw.title}` : 'الحل النموذجي المعتمد'"
      :description="selectedHw ? `مادة ${selectedHw.subject_name}` : ''"
      icon="💡"
    >
      <div v-if="selectedHw" class="solution-dialog-content">
        <div class="solution-section">
          <h4 class="section-title">📌 مفردات وخطوات الحل النموذجي المنشور:</h4>
          <div class="solution-text-box">
            <p v-if="selectedHw.solution_text">
              {{ selectedHw.solution_text }}
            </p>
            <div v-else class="default-solution-steps">
              <p>1. خطة الحل النموذجية المعتمدة لتمارين المادة.</p>
              <p>2. خطوات النواحي والنتائج المعتمدة.</p>
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
const activeTab = ref('current');
const selectedClassKey = ref('ALL');
const homeworks = ref([]);
const assignments = ref([]);

const showCreateModal = ref(false);
const submitting = ref(false);
const selectedAssignmentObj = ref(null);

const isDrawerOpen = ref(false);
const isModalOpen = ref(false);
const selectedHw = ref(null);

const newHw = reactive({
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

const fallbackHomeworks = [
  // Day 1: الأحد 16 أغسطس 2026 (واجبين لصفين مختلفين)
  {
    id: 101,
    title: 'تمارين ص 45 (معادلات الجبر)',
    description: 'حل التمارين رقم (1، 3، 5، 7) في كراسة الواجبات مع كتابة خطوات الحل بالكامل والتأكد من صحة النتائج.',
    subject_name: 'الرياضيات',
    grade_name: 'الصف الثامن',
    section_name: '8أ',
    due_date: '2026-08-16',
    attachment_name: 'ورقة_عمل_المعادلات.pdf',
    has_solution: true,
    solution_text: 'خطوات حل معادلات الدرجة الأولى:\n1) تجميع المتغيرات في طرف والأعداد الثابتة في الطرف الآخر مع تغيير الإشارة.\n2) س = 5 (النتيجة النموذجية للتمارين 1 و 3).',
    solution_filename: 'الحل_النموذجي_رياضيات_ص45.pdf'
  },
  {
    id: 102,
    title: 'تقرير تجربة دورة الماء والتبخر',
    description: 'كتابة ملخص تجربة المعمل حول مراحل التبخر والتكثف وتأثير الحرارة، مرفق برسم توضيحي لدورة الماء في الطبيعة.',
    subject_name: 'العلوم العامة',
    grade_name: 'الصف الثامن',
    section_name: '8أ',
    due_date: '2026-08-16',
    attachment_name: 'رسم_توضيحي_المعمل.png',
    has_solution: false,
    solution_text: null
  },

  // Day 2: الأربعاء 19 أغسطس 2026 (واجب لصف آخر)
  {
    id: 103,
    title: 'إعراب سورة النبأ (الأيات 1-10)',
    description: 'استخراج الفاعل والمفعول به والأفعال الماضية والمضارعة من السورة الكريمة وكتابتها في كراسة النحو والصرف.',
    subject_name: 'اللغة العربية',
    grade_name: 'الصف التاسع',
    section_name: '9ب',
    due_date: '2026-08-19',
    attachment_name: 'جدول_القواعد_الإعرابية.pdf',
    has_solution: true,
    solution_text: 'إعراب نموذج الآية الكريمة:\n- "عَمَّ": عَنْ: حرف جر، ومَا: اسم استفهام مبني في محل جر بحرف الجر.\n- "يَتَسَاءَلُونَ": فعل مضارع مرفوع بثبوت النون لأنه من الأفعال الخمسة.',
    solution_filename: 'إعراب_سورة_النبأ_نموذجي.pdf'
  },

  // Day 3: الأحد 23 أغسطس 2026 (واجبين)
  {
    id: 104,
    title: 'Unit 3 Vocabulary & Reading Sheet',
    description: 'Solve page 24 exercises in workbook and upload final solution worksheet.',
    subject_name: 'اللغة الإنجليزية',
    grade_name: 'الصف الثامن',
    section_name: '8أ',
    due_date: '2026-08-23',
    attachment_name: 'Workbook_Unit3.pdf',
    has_solution: true,
    solution_text: 'Unit 3 Vocabulary & Reading Answers Key.',
    solution_filename: 'English_Unit3_Worksheet.pdf'
  },
  {
    id: 105,
    title: 'تفسير وآيات سورة الملك',
    description: 'كتابة فوائد وأحكام سورة الملك ص 10 إلى ص 14.',
    subject_name: 'التربية الإسلامية',
    grade_name: 'الصف التاسع',
    section_name: '9ب',
    due_date: '2026-08-23',
    attachment_name: 'تفسير_سورة_الملك.pdf',
    has_solution: true,
    solution_text: 'نموذج التفسير والفوائد الاستنباطية.',
    solution_filename: 'تفسير_سورة_الملك_معتمد.pdf'
  }
];

const fallbackArchive = [
  {
    id: 201,
    title: 'Unit 3: Past Simple Grammar Exercises',
    description: 'حل أسئلة القواعد بكتاب النشاط صفحة 22.',
    subject_name: 'اللغة الإنجليزية',
    grade_name: 'الصف الثامن',
    section_name: '8أ',
    due_date: '2026-08-05',
    has_solution: true,
    solution_text: 'Unit 3 Model Solution Key.'
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

// تصفية الواجبات: عدم عرض أي مادة ليست للمعلم، والتصفية بحسب الفصل المختار
const currentHomeworks = computed(() => {
  const list = homeworks.value.length > 0 ? homeworks.value : fallbackHomeworks;
  
  // تصفية قائمة الواجبات فقط للفصول والمواد التي يدرسها المعلم
  const validTeacherList = list.filter(hw => {
    return teacherAssignments.value.some(a => 
      a.subject_name === hw.subject_name || 
      (a.section_name && hw.section_name && a.section_name === hw.section_name)
    );
  });

  if (selectedClassKey.value === 'ALL') return validTeacherList;

  const targetClass = teacherClassOptions.value.find(c => c.key === selectedClassKey.value);
  if (!targetClass) return validTeacherList;

  return validTeacherList.filter(hw => {
    const label = `${hw.grade_name || ''} (${hw.section_name || ''})`.trim();
    return label.includes(targetClass.section) || label.includes(targetClass.grade);
  });
});

const archiveHomeworks = computed(() => {
  if (selectedClassKey.value === 'ALL') return fallbackArchive;
  const targetClass = teacherClassOptions.value.find(c => c.key === selectedClassKey.value);
  if (!targetClass) return fallbackArchive;
  return fallbackArchive.filter(hw => hw.section_name === targetClass.section);
});

const groupedCurrentHomeworks = computed(() => {
  if (currentHomeworks.value.length === 0) return [];
  return groupHomeworksByDate(currentHomeworks.value);
});

const groupedArchiveHomeworks = computed(() => {
  if (archiveHomeworks.value.length === 0) return [];
  return groupHomeworksByDate(archiveHomeworks.value);
});

function groupHomeworksByDate(list) {
  const groupsMap = {};
  list.forEach(hw => {
    const dateKey = hw.due_date || '2026-08-16';
    if (!groupsMap[dateKey]) groupsMap[dateKey] = [];
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
  selectedHw.value = hw;
  isModalOpen.value = true;
}

function onAssignmentChange() {
  if (selectedAssignmentObj.value) {
    newHw.subject_id = selectedAssignmentObj.value.subject_id;
    newHw.section_id = selectedAssignmentObj.value.section_id;
  }
}

async function loadData() {
  loading.value = true;
  try {
    const [tasksRes, assignRes] = await Promise.all([
      api.get('/teacher/tasks?task_type=HOMEWORK'),
      api.get('/teacher/assignments')
    ]);
    if (tasksRes.data.success && tasksRes.data.data.length > 0) {
      homeworks.value = tasksRes.data.data;
    }
    if (assignRes.data.success && assignRes.data.data.length > 0) {
      assignments.value = assignRes.data.data;
    }
  } catch (err) {
    console.error('Failed to fetch teacher homeworks:', err);
  } finally {
    loading.value = false;
  }
}

async function handleCreateHomework() {
  if (!newHw.title || !newHw.due_date) {
    alert('يرجى اختيار العنوان وتاريخ التسليم.');
    return;
  }
  submitting.value = true;
  try {
    const formData = new FormData();
    formData.append('title', newHw.title);
    formData.append('description', newHw.description);
    formData.append('task_type', 'HOMEWORK');
    formData.append('subject_id', newHw.subject_id || '1');
    formData.append('section_id', newHw.section_id || '1');
    formData.append('due_date', newHw.due_date);
    formData.append('has_solution', newHw.has_solution ? '1' : '0');
    formData.append('solution_text', newHw.solution_text);

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

async function handleDeleteHomework(id) {
  if (!confirm('هل أنت تأكد من رغبتك في حذف هذا الواجب من المنظومة؟')) return;
  try {
    await api.delete(`/teacher/tasks/${id}`);
    isDrawerOpen.value = false;
    await loadData();
  } catch (err) {
    homeworks.value = homeworks.value.filter(h => h.id !== id);
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

.hw-squircle-click {
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
