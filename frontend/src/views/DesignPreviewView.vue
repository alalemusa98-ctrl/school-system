<template>
  <div :class="['design-preview-root', themeMode]">
    <!-- Ambient Background Lighting -->
    <div class="glow-orb orb-1"></div>
    <div class="glow-orb orb-2"></div>

    <!-- Header Navigation Bar -->
    <header class="preview-header">
      <div class="preview-header-container">
        <div class="brand-title-group">
          <div class="brand-badge">
            <span class="pulse-dot"></span>
            معاينة التصاميم والمكونات v1.0
          </div>
          <h1 class="main-title">🎨 استعراض مكونات وصفحات النظام</h1>
          <p class="sub-title">اختر المستخدم ثم الصفحة المطلوبة لعرض المكونات والـ .vue Components حياً</p>
        </div>

        <div class="header-actions-group">
          <!-- Light / Dark Mode Toggle Button -->
          <button 
            class="theme-toggle-btn" 
            @click="toggleTheme" 
            :title="themeMode === 'dark' ? 'التحويل إلى الوضع الفاتح (Light Mode)' : 'التحويل إلى الوضع الليلي (Dark Mode)'"
          >
            <span v-if="themeMode === 'dark'" class="theme-icon">☀️ الوضع الفاتح</span>
            <span v-else class="theme-icon">🌙 الوضع الليلي</span>
          </button>

          <button class="back-to-login-btn" @click="$router.push('/login')" title="الرجوع لصفحة تسجيل الدخول">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
            <span>الرجوع لتسجيل الدخول</span>
          </button>
        </div>
      </div>
    </header>

    <!-- Main Workspace Container -->
    <main class="preview-workspace">
      <!-- Step 1: User Role Selection Cards -->
      <section class="step-section">
        <div class="step-header">
          <span class="step-num">1</span>
          <h2 class="step-title">اختر نوع المستخدم (User Role)</h2>
        </div>

        <div class="role-selector-grid">
          <!-- Student Role -->
          <div 
            class="role-card" 
            :class="{ active: selectedRole === 'STUDENT' }"
            @click="selectRole('STUDENT')"
          >
            <div class="role-icon-box student">🎓</div>
            <div class="role-info">
              <h3 class="role-name">بوابة الطالب (Student)</h3>
              <span class="role-desc">5 صفحات رئيسية • 15 مكون .vue معتمد</span>
            </div>
            <div class="active-check-icon" v-if="selectedRole === 'STUDENT'">✓</div>
          </div>

          <!-- Teacher Role -->
          <div 
            class="role-card" 
            :class="{ active: selectedRole === 'TEACHER' }"
            @click="selectRole('TEACHER')"
          >
            <div class="role-icon-box teacher">👨‍🏫</div>
            <div class="role-info">
              <h3 class="role-name">بوابة المعلم (Teacher)</h3>
              <span class="role-desc">5 صفحات إدارة الحصص والدرجات</span>
            </div>
            <div class="active-check-icon" v-if="selectedRole === 'TEACHER'">✓</div>
          </div>

          <!-- Admin Role -->
          <div 
            class="role-card" 
            :class="{ active: selectedRole === 'ADMIN' }"
            @click="selectRole('ADMIN')"
          >
            <div class="role-icon-box admin">🏫</div>
            <div class="role-info">
              <h3 class="role-name">لوحة الإدارة (Admin Dashboard)</h3>
              <span class="role-desc">إدارة الطلاب والمعلمين والإحصائيات</span>
            </div>
            <div class="active-check-icon" v-if="selectedRole === 'ADMIN'">✓</div>
          </div>

          <!-- Shared Components Role -->
          <div 
            class="role-card" 
            :class="{ active: selectedRole === 'SHARED' }"
            @click="selectRole('SHARED')"
          >
            <div class="role-icon-box shared">🧩</div>
            <div class="role-info">
              <h3 class="role-name">المكونات المشتركة (Shared)</h3>
              <span class="role-desc">عناصر UI موحدة وقابلة لإعادة الاستخدام</span>
            </div>
            <div class="active-check-icon" v-if="selectedRole === 'SHARED'">✓</div>
          </div>
        </div>
      </section>

      <!-- Step 2: Page Selection -->
      <section class="step-section">
        <div class="step-header">
          <span class="step-num">2</span>
          <h2 class="step-title">اختر الصفحة المتاحة للعرض (Available Page)</h2>
        </div>

        <div class="page-pills-row">
          <button 
            v-for="page in availablePages" 
            :key="page.id"
            class="page-pill-btn"
            :class="{ active: selectedPage === page.id }"
            @click="selectPage(page.id)"
          >
            <span class="page-icon">{{ page.icon }}</span>
            <span class="page-name">{{ page.name }}</span>
            <span class="page-count-badge">{{ page.components.length }} مكونات</span>
          </button>
        </div>
      </section>

      <!-- Step 3: Component Selection & Viewport Controls -->
      <section class="step-section">
        <div class="step-header-with-actions">
          <div class="step-header">
            <span class="step-num">3</span>
            <h2 class="step-title">اختر المكون البرمجي للعرض (Vue Component)</h2>
          </div>

          <!-- Viewport Mode Switcher (Mobile iPhone Frame vs Desktop Container) -->
          <div class="device-toggle-group">
            <button 
              class="device-btn" 
              :class="{ active: viewMode === 'mobile' }" 
              @click="viewMode = 'mobile'"
              title="عرض داخل إطار هاتف محمول"
            >
              📱 إطار هاتف محمول
            </button>
            <button 
              class="device-btn" 
              :class="{ active: viewMode === 'desktop' }" 
              @click="viewMode = 'desktop'"
              title="عرض ملء الشاشة الكاملة"
            >
              💻 العرض الكامل
            </button>
          </div>
        </div>

        <!-- Component Sub-tabs -->
        <div class="component-tabs-bar">
          <button 
            v-for="comp in activePageComponents" 
            :key="comp.id"
            class="comp-subtab-btn"
            :class="{ active: selectedComponent === comp.id }"
            @click="selectedComponent = comp.id"
          >
            <span class="comp-icon">🧩</span>
            <span class="comp-title">{{ comp.name }}</span>
            <code class="comp-file-tag">{{ comp.file }}</code>
          </button>
        </div>

        <!-- File Info Bar -->
        <div class="file-path-banner">
          <div class="path-info">
            <span class="path-label">📂 ملف المكون المرجعي:</span>
            <code class="path-code">{{ selectedRole === 'SHARED' ? `Views-api/shared/${currentComponentObj?.file || ''}` : `Views-api/${selectedRole.toLowerCase()}/${selectedPage}/${currentComponentObj?.file || ''}` }}</code>
          </div>
          <span class="path-desc">{{ currentComponentObj?.desc || '' }}</span>
        </div>

        <!-- Component Render Canvas -->
        <div class="component-render-canvas" :class="viewMode">
          <div :class="viewMode === 'mobile' ? 'mobile-iphone-shell' : 'desktop-shell'">
            
            <!-- Mobile Frame Top Notch Header -->
            <div v-if="viewMode === 'mobile'" class="mobile-notch-header">
              <span class="notch-time">9:41</span>
              <div class="notch-island"></div>
              <span class="notch-icons">📶 🔋</span>
            </div>

            <!-- Dynamic Live Rendered Vue Component -->
            <div class="live-component-wrapper">
              <component 
                :is="activeComponentInstance" 
                currentTime="9:41"
                schoolName="مدرسة النور الإعدادية"
                studentName="أحمد خالد المصراتي"
                gradeSection="الصف الخامس - الشعبة (أ5)"
                department="قسم المرحلة الإعدادية والنموذجية"
                :subjectsCount="7"
                :pendingHomeworksCount="4"
                :upcomingExamsCount="1"
                :calendarDays="[
                  { name: 'أحد', date: '25' },
                  { name: 'إثن', date: '24' },
                  { name: 'ثلا', date: '25' },
                  { name: 'أرب', date: '26' },
                  { name: 'خمي', date: '27' }
                ]"
                currentDayName="الثلاثاء"
                :groupedCurrentHomeworks="mockHomeworks"
                :groupedExams="mockExams"
                :scheduleDays="mockSchedule"
                :subjectsList="selectedRole === 'TEACHER' ? mockTeacherSubjects : mockSubjects"
                :cardsList="mockDashboardCards"
                activeTab="current"
                :loading="false"
                :title="dynamicPageTitle"
                :subtitle="dynamicPageSubtitle"
                teacherName="أ. أحمد سالم"
                subjectSpecialty="معلم الرياضيات"
                assignedSectionsText="الصف الخامس (أ5 ، ب5) - الصف السادس (أ6)"
                semesterInfo="الفصل الدراسي الأول 2026"
                :homeworks="mockTeacherHomeworks"
                :exams="mockTeacherExams"
                :assignedSections="mockTeacherAssignedSections"
                :assignedSectionsCount="3"
                :activeHomeworksCount="8"
                :scheduledExamsCount="3"
                :currentCount="3"
                :upcomingCount="3"
                :archiveCount="1"
                userName="أحمد خالد المصراتي"
                userSubtitle="الصف الخامس - الشعبة (أ5)"
                userTag="قسم المرحلة الإعدادية والنموذجية"
                avatarIcon="🏫"
                themeGradient="purple"
                :stats="[
                  { id: 'subjects', label: 'المواد الدراسية', value: 7, color: '#7c3aed', icon: 'book', route: '/student/subjects' },
                  { id: 'homeworks', label: 'الواجبات المعلقة', value: 4, color: '#ea580c', icon: 'homework', route: '/student/homeworks' },
                  { id: 'exams', label: 'الامتحانات القادمة', value: 1, color: '#2563eb', icon: 'exam', route: '/student/exams' }
                ]"
              />
            </div>

          </div>
        </div>

      </section>
    </main>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import '@/assets/styles/student-design.css';

// Import Views-api Student Components
import HomeworkHeader from '@views-api/student/homeworks/HomeworkHeader.vue';
import HomeworkTabs from '@views-api/student/homeworks/HomeworkTabs.vue';
import HomeworkList from '@views-api/student/homeworks/HomeworkList.vue';

import DashboardHeader from '@views-api/student/dashboard/DashboardHeader.vue';
import DashboardDays from '@views-api/student/dashboard/DashboardDays.vue';
import DashboardCards from '@views-api/student/dashboard/DashboardCards.vue';

import ExamHeader from '@views-api/student/exams/ExamHeader.vue';
import ExamTabs from '@views-api/student/exams/ExamTabs.vue';
import ExamList from '@views-api/student/exams/ExamList.vue';

import ScheduleHeader from '@views-api/student/schedule/ScheduleHeader.vue';
import ScheduleTabs from '@views-api/student/schedule/ScheduleTabs.vue';
import ScheduleList from '@views-api/student/schedule/ScheduleList.vue';

import SubjectHeader from '@views-api/student/subjects/SubjectHeader.vue';
import SubjectTabs from '@views-api/student/subjects/SubjectTabs.vue';
import SubjectList from '@views-api/student/subjects/SubjectList.vue';

// Import Views-api Teacher Components
import TeacherDashboardHeader from '@views-api/teacher/dashboard/TeacherDashboardHeader.vue';
import TeacherDashboardDays from '@views-api/teacher/dashboard/TeacherDashboardDays.vue';
import TeacherDashboardCards from '@views-api/teacher/dashboard/TeacherDashboardCards.vue';

import TeacherHomeworkHeader from '@views-api/teacher/homeworks/TeacherHomeworkHeader.vue';
import TeacherHomeworkTabs from '@views-api/teacher/homeworks/TeacherHomeworkTabs.vue';
import TeacherHomeworkList from '@views-api/teacher/homeworks/TeacherHomeworkList.vue';

import TeacherExamHeader from '@views-api/teacher/exams/TeacherExamHeader.vue';
import TeacherExamTabs from '@views-api/teacher/exams/TeacherExamTabs.vue';
import TeacherExamList from '@views-api/teacher/exams/TeacherExamList.vue';

import TeacherSubjectHeader from '@views-api/teacher/subjects/TeacherSubjectHeader.vue';
import TeacherSubjectTabs from '@views-api/teacher/subjects/TeacherSubjectTabs.vue';
import TeacherSubjectList from '@views-api/teacher/subjects/TeacherSubjectList.vue';

import TeacherScheduleHeader from '@views-api/teacher/schedule/TeacherScheduleHeader.vue';
import TeacherScheduleTabs from '@views-api/teacher/schedule/TeacherScheduleTabs.vue';
import TeacherScheduleList from '@views-api/teacher/schedule/TeacherScheduleList.vue';

// Import Shared Components
import AppMainHeader from '@views-api/shared/AppMainHeader.vue';
import AppSubHeader from '@views-api/shared/AppSubHeader.vue';

// Component Instance Mapping Table
const componentInstances = {
  HomeworkHeader,
  HomeworkTabs,
  HomeworkList,
  DashboardHeader,
  DashboardDays,
  DashboardCards,
  ExamHeader,
  ExamTabs,
  ExamList,
  ScheduleHeader,
  ScheduleTabs,
  ScheduleList,
  SubjectHeader,
  SubjectTabs,
  SubjectList,
  TeacherDashboardHeader,
  TeacherDashboardDays,
  TeacherDashboardCards,
  TeacherHomeworkHeader,
  TeacherHomeworkTabs,
  TeacherHomeworkList,
  TeacherExamHeader,
  TeacherExamTabs,
  TeacherExamList,
  TeacherSubjectHeader,
  TeacherSubjectTabs,
  TeacherSubjectList,
  TeacherScheduleHeader,
  TeacherScheduleTabs,
  TeacherScheduleList,
  AppMainHeader,
  AppSubHeader
};

// Selection & Theme State
const themeMode = ref(localStorage.getItem('preview_theme') || 'dark'); // 'dark' or 'light'
const selectedRole = ref('STUDENT');
const selectedPage = ref('homeworks');
const selectedComponent = ref('HomeworkHeader');
const viewMode = ref('mobile'); // 'mobile' or 'desktop'

function toggleTheme() {
  themeMode.value = themeMode.value === 'dark' ? 'light' : 'dark';
  localStorage.setItem('preview_theme', themeMode.value);
}

// Role Definitions & Pages
const rolePagesMap = {
  STUDENT: [
    {
      id: 'homeworks',
      name: 'الواجبات المدرسية',
      icon: '📚',
      components: [
        { id: 'HomeworkHeader', name: 'الهيدر العلوي (HomeworkHeader)', file: 'HomeworkHeader.vue', desc: 'الهيدر العلوي لصفحة الواجبات مع شريط الحالة وكارت الهيرو الأبيض والمؤشر المضيء' },
        { id: 'HomeworkTabs', name: 'التابات والكبسولات (HomeworkTabs)', file: 'HomeworkTabs.vue', desc: 'زر التحكم المقسم للتنقل بين الحالية والأرشيف مع كبسولات المواد الدراسية' },
        { id: 'HomeworkList', name: 'قائمة الكروت والحلول (HomeworkList)', file: 'HomeworkList.vue', desc: 'مجموعات الكروت اليومية المزودة برقم النتوء العلوي والدرج الجاني والحل النموذجي' }
      ]
    },
    {
      id: 'dashboard',
      name: 'اللوحة الرئيسية (Dashboard)',
      icon: '🏠',
      components: [
        { id: 'DashboardHeader', name: 'الهيدر ومؤشرات الطاقة (DashboardHeader)', file: 'DashboardHeader.vue', desc: 'هيدر اللوحة الرئيسية مع كارت البروفايل وعدادات المواد والواجبات والتنبيهات' },
        { id: 'DashboardDays', name: 'شريط الأيام المدرسية (DashboardDays)', file: 'DashboardDays.vue', desc: 'شريط الأيام الأسبوعي التفاعلي لاختيار اليوم الدراسي الحالي' },
        { id: 'DashboardCards', name: 'كروت الشبكة الرئيسية (DashboardCards)', file: 'DashboardCards.vue', desc: 'شبكة بطاقات الملاحة السريعة للخدمات الأكاديمية والجدول والواجبات' }
      ]
    },
    {
      id: 'exams',
      name: 'جدول الامتحانات',
      icon: '📝',
      components: [
        { id: 'ExamHeader', name: 'هيدر الامتحانات (ExamHeader)', file: 'ExamHeader.vue', desc: 'الهيدر العلوي لصفحة الامتحانات مع عنوان التقييم الأكاديمي' },
        { id: 'ExamTabs', name: 'تابات الامتحانات (ExamTabs)', file: 'ExamTabs.vue', desc: 'أزرار التصفية بين الامتحانات القادمة والسابقة' },
        { id: 'ExamList', name: 'قائمة الاختبارات (ExamList)', file: 'ExamList.vue', desc: 'كروت جدول الاختبارات مجمعة حسب الأيام والقاعات والتوقيت' }
      ]
    },
    {
      id: 'schedule',
      name: 'الجدول الدراسي',
      icon: '📅',
      components: [
        { id: 'ScheduleHeader', name: 'هيدر الجدول (ScheduleHeader)', file: 'ScheduleHeader.vue', desc: 'هيدر التوقيتات والحصص المدرسية' },
        { id: 'ScheduleList', name: 'قائمة الحصص (ScheduleList)', file: 'ScheduleList.vue', desc: 'كروت الحصص المدرسية بالترتيب مع المعلمين والقاعات' }
      ]
    },
    {
      id: 'subjects',
      name: 'المواد الدراسية',
      icon: '📘',
      components: [
        { id: 'SubjectHeader', name: 'هيدر المواد (SubjectHeader)', file: 'SubjectHeader.vue', desc: 'هيدر المقررات المدرسية والمدرسين' },
        { id: 'SubjectList', name: 'قائمة المقررات (SubjectList)', file: 'SubjectList.vue', desc: 'شبكة كروت المواد مع الكتب الإلكترونية ونسب التقدم' }
      ]
    }
  ],
  TEACHER: [
    {
      id: 'dashboard',
      name: 'لوحة التحكم الرئيسية',
      icon: '🏠',
      components: [
        { id: 'TeacherDashboardHeader', name: 'هيدر المعلم والبروفايل (TeacherDashboardHeader)', file: 'TeacherDashboardHeader.vue', desc: 'الهيدر العلوي للوحة تحكم المعلم مع شريط الحالة، كارت البروفايل العائم، وعدادات الفصول والواجبات والامتحانات' },
        { id: 'TeacherDashboardDays', name: 'شريط الأيام الأسبوعي (TeacherDashboardDays)', file: 'TeacherDashboardDays.vue', desc: 'شريط الأيام الأسبوعي التفاعلي لاختيار اليوم وتصفية الحصص والمتابعة' },
        { id: 'TeacherDashboardCards', name: 'كروت الشبكة الرئيسية (TeacherDashboardCards)', file: 'TeacherDashboardCards.vue', desc: 'شبكة بطاقات الملاحة السريعة للمعلم (الواجبات، الامتحانات، الفصول، الجدول الأسبوعي)' }
      ]
    },
    {
      id: 'homeworks',
      name: 'إدارة الواجبات المدرسية',
      icon: '📚',
      components: [
        { id: 'TeacherHomeworkHeader', name: 'هيدر المعلم (TeacherHomeworkHeader)', file: 'TeacherHomeworkHeader.vue', desc: 'الهيدر العلوي لشاشة المعلم مع شريط الحالة وكارت البروفايل والشعب المسندة والمؤشر الحي' },
        { id: 'TeacherHomeworkTabs', name: 'التابات والفلترة (TeacherHomeworkTabs)', file: 'TeacherHomeworkTabs.vue', desc: 'التحكم المقسم بين الواجبات الحالية والأرشيف مع زر النشر الفوري وكبسولات الشعب' },
        { id: 'TeacherHomeworkList', name: 'قائمة الواجبات والدراوير (TeacherHomeworkList)', file: 'TeacherHomeworkList.vue', desc: 'كروت الواجبات اليومية، دراوير التفاصيل، مودل إضافة واجب، ومودل الحل النموذجي' }
      ]
    },
    {
      id: 'exams',
      name: 'جدول الامتحانات',
      icon: '📝',
      components: [
        { id: 'TeacherExamHeader', name: 'هيدر الامتحانات (TeacherExamHeader)', file: 'TeacherExamHeader.vue', desc: 'الهيدر العلوي لصفحة امتحانات المعلم مع كارت البروفايل العائم ومجسم 3D' },
        { id: 'TeacherExamTabs', name: 'تابات وفلاتر الامتحانات (TeacherExamTabs)', file: 'TeacherExamTabs.vue', desc: 'التبديل بين الامتحانات القادمة والأرشيف مع زر جدولة امتحان جديد وشريط الشعب' },
        { id: 'TeacherExamList', name: 'قائمة الامتحانات والدراوير (TeacherExamList)', file: 'TeacherExamList.vue', desc: 'كروت الامتحانات المجمعة بالتواريخ، دراوير التفاصيل الكاملة، ومودلات الجدولة والحل' }
      ]
    },
    {
      id: 'subjects',
      name: 'الفصول الدراسية',
      icon: '🏫',
      components: [
        { id: 'TeacherSubjectHeader', name: 'هيدر الفصول والشعب (TeacherSubjectHeader)', file: 'TeacherSubjectHeader.vue', desc: 'الهيدر العلوي لشاشة الفصول مع كارت البروفايل العائم ومجسم الكتب 3D' },
        { id: 'TeacherSubjectList', name: 'قائمة الفصول والدراوير (TeacherSubjectList)', file: 'TeacherSubjectList.vue', desc: 'كروت الفصول والشعب مع الواجبات والامتحانات ودراوير تفاصيل الشعب والطلاب' }
      ]
    },
    {
      id: 'schedule',
      name: 'الجدول الدراسي الأسبوعي',
      icon: '📅',
      components: [
        { id: 'TeacherScheduleHeader', name: 'هيدر جدول المعلم (TeacherScheduleHeader)', file: 'TeacherScheduleHeader.vue', desc: 'الهيدر العلوي لجدول الحصص الأسبوعي مع البروفايل والمؤشر الحي' },
        { id: 'TeacherScheduleList', name: 'جدول الحصص والقاعات (TeacherScheduleList)', file: 'TeacherScheduleList.vue', desc: 'كروت الحصص الموزعة على أيام الأسبوع الخمسة مع الشعب والمقررات ودراوير التفاصيل' }
      ]
    }
  ],
  ADMIN: [
    {
      id: 'dashboard',
      name: 'لوحة الإدارة المركزية',
      icon: '🏫',
      components: [
        { id: 'DashboardHeader', name: 'هيدر نظام الإدارة (DashboardHeader)', file: 'DashboardHeader.vue', desc: 'المؤشرات العامة للمدرسة والطلاب والكادر' }
      ]
    }
  ],
  SHARED: [
    {
      id: 'headers',
      name: 'الهيدرات المشتركة (Headers)',
      icon: '📱',
      components: [
        { id: 'AppMainHeader', name: 'الهيدر الرئيسي الموحد (AppMainHeader)', file: 'AppMainHeader.vue', desc: 'هيدر رئيسي موحد متعدد الاستخدامات لكافة أدوار وصفحات المنظومة مع كارت البروفايل والعدادات القابلة للتخصيص الكامل' },
        { id: 'AppSubHeader', name: 'هيدر الصفحات الفرعية (AppSubHeader)', file: 'AppSubHeader.vue', desc: 'هيدر موحد للصفحات الداخلية مع زر الرجوع، عنوان الصفحة، زر التصفية، وكارت الهيرو مع مجسم 3D' }
      ]
    }
  ]
};

// Computed Properties
const availablePages = computed(() => rolePagesMap[selectedRole.value] || rolePagesMap.STUDENT);

const activePageComponents = computed(() => {
  const currentPage = availablePages.value.find(p => p.id === selectedPage.value);
  return currentPage ? currentPage.components : [];
});

const currentComponentObj = computed(() => {
  return activePageComponents.value.find(c => c.id === selectedComponent.value) || activePageComponents.value[0];
});

const activeComponentInstance = computed(() => {
  const compId = selectedComponent.value;
  return componentInstances[compId] || HomeworkHeader;
});

const dynamicPageTitle = computed(() => {
  if (selectedPage.value === 'exams') return 'جدول الامتحانات';
  if (selectedPage.value === 'schedule') return 'الجدول الدراسي';
  if (selectedPage.value === 'subjects') {
    return selectedRole.value === 'TEACHER' ? 'الفصول الدراسية' : 'المواد المقررة';
  }
  if (selectedPage.value === 'homeworks') {
    return selectedRole.value === 'TEACHER' ? 'إدارة الواجبات' : 'الواجبات المدرسية';
  }
  return selectedRole.value === 'TEACHER' ? 'لوحة تحكم المعلم' : 'اللوحة الرئيسية';
});

const dynamicPageSubtitle = computed(() => {
  if (selectedPage.value === 'exams') {
    return selectedRole.value === 'TEACHER' 
      ? 'إدارة وجدولة الامتحانات والاختبارات' 
      : 'مواعيد الاختبارات والحلول الاسترشادية';
  }
  if (selectedPage.value === 'homeworks') {
    return selectedRole.value === 'TEACHER' 
      ? 'متابعة ونشر الواجبات المدرسية' 
      : 'متابعة وتسليم الواجبات المدرسية';
  }
  if (selectedPage.value === 'subjects') {
    return selectedRole.value === 'TEACHER' 
      ? 'إدارة ومتابعة الفصول والشعب المسندة' 
      : 'المناهج والكتب المدرسية التفاعلية';
  }
  if (selectedPage.value === 'schedule') return 'مواعيد الحصص والقاعات الأسبوعية';
  return 'المتابعة اليومية والأنشطة المدرسية';
});

// Event Handlers
function selectRole(role) {
  selectedRole.value = role;
  const pages = rolePagesMap[role] || rolePagesMap.STUDENT;
  selectedPage.value = pages[0].id;
  selectedComponent.value = pages[0].components[0].id;
}

function selectPage(pageId) {
  selectedPage.value = pageId;
  const pageObj = availablePages.value.find(p => p.id === pageId);
  if (pageObj && pageObj.components.length > 0) {
    selectedComponent.value = pageObj.components[0].id;
  }
}

// Sample Mock Data
const mockHomeworks = ref([
  {
    dateKey: '2026-08-16',
    index: 1,
    dayName: 'الأحد',
    dateFormatted: '16 أغسطس 2026',
    homeworks: [
      { id: 1, subject_name: 'العلوم العامة', teacher_name: 'أ. فاطمة العبيدي', submitted: true, due_date: '16 أغسطس 2026', description: 'حل أسئلة الفصل الثالث من كتاب العلوم ص 45 إلى 48.' },
      { id: 2, subject_name: 'الرياضيات', teacher_name: 'أ. أحمد سالم', submitted: false, due_date: '16 أغسطس 2026', description: 'تمارين الهندسة وحساب المساحات في الصفحة 82.' }
    ]
  }
]);

const mockExams = ref([
  {
    dateKey: '2026-08-20',
    index: 1,
    dayName: 'الخميس',
    dateFormatted: '20 أغسطس 2026',
    exams: [
      { id: 1, subject_name: 'العلوم العامة', teacher_name: 'أ. فاطمة العبيدي', exam_time: '09:00 AM', room: 'قاعة 3', total_marks: 100 },
      { id: 2, subject_name: 'الرياضيات', teacher_name: 'أ. أحمد سالم', exam_time: '11:00 AM', room: 'قاعة 5', total_marks: 100 }
    ]
  }
]);

const mockSchedule = ref([
  {
    dayName: 'الأحد',
    periods: [
      { period_num: 1, subject_name: 'الرياضيات', teacher_name: 'أ. أحمد سالم', start_time: '08:00', end_time: '08:45' },
      { period_num: 2, subject_name: 'العلوم العامة', teacher_name: 'أ. فاطمة العبيدي', start_time: '08:50', end_time: '09:35' }
    ]
  }
]);

const mockSubjects = ref([
  { id: 1, name: 'الرياضيات', teacher_name: 'أ. أحمد سالم', icon: '📐', progress: 85 },
  { id: 2, name: 'العلوم العامة', teacher_name: 'أ. فاطمة العبيدي', icon: '🔬', progress: 90 },
  { id: 3, name: 'اللغة الإنجليزية', teacher_name: 'أ. سارة الحكيم', icon: '🔤', progress: 78 }
]);

const mockDashboardCards = ref([
  { id: 'hw', title: 'الواجبات والحلول', subtitle: '5 واجبات معلقة', icon: '📚', route: '/student/homeworks' },
  { id: 'exam', title: 'جدول الامتحانات', subtitle: 'التقييمات القادمة', icon: '📝', route: '/student/exams' },
  { id: 'sched', title: 'الجدول الأسبوعي', subtitle: 'الحصص والقاعات', icon: '📅', route: '/student/schedule' },
  { id: 'sub', title: 'المواد المقررة', subtitle: 'المناهج والكتب 3D', icon: '📘', route: '/student/subjects' }
]);

// Teacher Mock Data
const mockTeacherAssignedSections = ref([
  { id: 1, name: 'أ5', grade_name: 'الصف الخامس', pending_count: 3 },
  { id: 2, name: 'ب5', grade_name: 'الصف الخامس', pending_count: 2 },
  { id: 3, name: 'أ6', grade_name: 'الصف السادس', pending_count: 1 }
]);

const mockTeacherHomeworks = ref([
  {
    id: 101,
    title: 'تمارين القسمة المطولة ص 45',
    description: 'حل التمارين من رقم 1 إلى 8 في كراسة الواجب وكتاب التدريبات مع كتابة خطوات التحقق.',
    subject_name: 'الرياضيات',
    section_id: 1,
    section_name: 'أ5',
    grade_name: 'الصف الخامس',
    due_date: '2026-08-30',
    has_solution: 1,
    solution_text: 'خطوات الحل النموذجية:\n1) 450 ÷ 5 = 90\n2) 720 ÷ 8 = 90\n3) التحقق عبر ضرب الناتج في المقسوم عليه.'
  },
  {
    id: 102,
    title: 'مسائل الضرب في عددين',
    description: 'حل التدريب الثاني ص 38 مع توضيح خطوات إعادة التجميع بدقة.',
    subject_name: 'الرياضيات',
    section_id: 2,
    section_name: 'ب5',
    grade_name: 'الصف الخامس',
    due_date: '2026-08-30',
    has_solution: 0,
    solution_text: ''
  },
  {
    id: 103,
    title: 'استكشاف تركيب الخلية الحية',
    description: 'رسم وتحديد أجزاء الخلية النباتية والحيوانية وكتابة وظيفة الميتوكوندريا ص 56.',
    subject_name: 'العلوم العامة',
    section_id: 1,
    section_name: 'أ5',
    grade_name: 'الصف الخامس',
    due_date: '2026-08-31',
    has_solution: 1,
    solution_text: 'الإجابة النموذجية:\n- الغشاء الخلوي: حماية وتنظيم.\n- الميتوكوندريا: إنتاج الطاقة.\n- الجدار الخلوي: في الخلية النباتية فقط.'
  },
  {
    id: 104,
    title: 'تطبيقات القوة والحركة والسرعة',
    description: 'حل المسائل الحسابية في قانون السرعة = المسافة ÷ الزمن ص 64.',
    subject_name: 'العلوم العامة',
    section_id: 2,
    section_name: 'ب5',
    grade_name: 'الصف الخامس',
    due_date: '2026-08-31',
    has_solution: 0,
    solution_text: ''
  },
  {
    id: 105,
    title: 'حل المعادلات الخطية من الدرجة الأولى',
    description: 'إيجاد قيمة المتغير س في المسائل الخمس الأولى وتحديد مجموعة الحل ص 52.',
    subject_name: 'الرياضيات',
    section_id: 3,
    section_name: 'أ6',
    grade_name: 'الصف السادس',
    due_date: '2026-09-02',
    has_solution: 1,
    solution_text: 'س = 15 - 7 = 8\nالتحقق: 8 + 7 = 15.'
  },
  {
    id: 106,
    title: 'قواعد إعراب الفاعل والمفعول به',
    description: 'استخراج الفاعل والمفعول به وضبط أواخر الكلمات بالشكل التام ص 30.',
    subject_name: 'اللغة العربية',
    section_id: 1,
    section_name: 'أ5',
    grade_name: 'الصف الخامس',
    due_date: '2026-09-02',
    has_solution: 1,
    solution_text: 'كتبَ الطالبُ الدرسَ:\n- الطالبُ: فاعل مرفوع بالضمة.\n- الدرسَ: مفعول به منصوب بالفتحة.'
  },
  {
    id: 107,
    title: 'Present Perfect Tense Exercises Unit 3',
    description: 'Complete workbook exercises on page 24 with irregular verbs.',
    subject_name: 'اللغة الإنجليزية',
    section_id: 3,
    section_name: 'أ6',
    grade_name: 'الصف السادس',
    due_date: '2026-09-03',
    has_solution: 1,
    solution_text: 'Answers:\n1. has visited\n2. have finished\n3. have already seen.'
  },
  {
    id: 108,
    title: 'حفظ وتفسير سورة النبأ من 1-15',
    description: 'تسميع الآيات وحل أسئلة معاني المفردات والدروس المستفادة ص 18.',
    subject_name: 'التربية الإسلامية',
    section_id: 2,
    section_name: 'ب5',
    grade_name: 'الصف الخامس',
    due_date: '2026-09-03',
    has_solution: 1,
    solution_text: 'معاني الكلمات:\n- عمّ: عن أي شيء.\n- مهاداً: ممهدة وميسرة للعيش.'
  }
]);

const mockTeacherExams = ref([
  {
    id: 301,
    title: 'امتحان العلوم العامة النصفي',
    description: 'اختبار تحصيلي يشمل فصول الفيزياء والكيمياء والمفاهيم الأساسية.',
    subject_name: 'العلوم العامة',
    section_id: 1,
    section_name: 'أ5',
    grade_name: 'الصف الخامس',
    due_date: '2026-08-30',
    exam_time: '09:00 ص - 10:30 ص',
    has_solution: 1,
    solution_text: 'النموذج الاسترشادي:\nالسؤال الأول: (أ) تعريف الخلية، (ب) علل لما يأتي.\nتوزيع الدرجات: 20 درجة.'
  },
  {
    id: 302,
    title: 'امتحان الرياضيات الشهري الأول',
    description: 'يشمل وحدات الجبر والعمليات الحسابية والمعادلات الخطية.',
    subject_name: 'الرياضيات',
    section_id: 2,
    section_name: 'ب5',
    grade_name: 'الصف الخامس',
    due_date: '2026-08-30',
    exam_time: '11:00 ص - 12:30 م',
    has_solution: 0,
    solution_text: ''
  },
  {
    id: 303,
    title: 'امتحان قواعد النحو والإملاء',
    description: 'يشمل المبتدأ والخبر وكان وأخواتها وضبط الشواهد ص 40.',
    subject_name: 'اللغة العربية',
    section_id: 1,
    section_name: 'أ5',
    grade_name: 'الصف الخامس',
    due_date: '2026-09-02',
    exam_time: '08:30 ص - 10:00 ص',
    has_solution: 1,
    solution_text: 'نموذج الإجابة:\n1. الإعراب: الطالبُ اسم كان مرفوع.\n2. الاستخراج: الجملة الاسمية.'
  },
  {
    id: 304,
    title: 'امتحان الرياضيات المتقدمة',
    description: 'اختبار نصف الفصل في المصفوفات ونظم المعادلات الخطية.',
    subject_name: 'الرياضيات',
    section_id: 3,
    section_name: 'أ6',
    grade_name: 'الصف السادس',
    due_date: '2026-09-02',
    exam_time: '10:30 ص - 12:00 م',
    has_solution: 1,
    solution_text: 'خطوات الحل وسلم توزيع الدرجات: 25 درجة.'
  },
  {
    id: 305,
    title: 'English Midterm Exam Unit 1-4',
    description: 'Grammar, vocabulary, reading comprehension and writing paragraph.',
    subject_name: 'اللغة الإنجليزية',
    section_id: 3,
    section_name: 'أ6',
    grade_name: 'الصف السادس',
    due_date: '2026-09-06',
    exam_time: '09:00 AM - 10:30 AM',
    has_solution: 1,
    solution_text: 'Model Answer Key:\nPart 1: A, C, B, D\nPart 2: Passive voice transformation.'
  },
  {
    id: 306,
    title: 'امتحان التربية الإسلامية النصفي',
    description: 'يشمل سور القرآن الكريم المقررة وأحاديث العقيدة والفقه.',
    subject_name: 'التربية الإسلامية',
    section_id: 2,
    section_name: 'ب5',
    grade_name: 'الصف الخامس',
    due_date: '2026-09-06',
    exam_time: '11:00 ص - 12:30 م',
    has_solution: 1,
    solution_text: 'توزيع الدرجات: 30 درجة على الحفظ والفهم وأحكام التلاوة.'
  }
]);

const mockTeacherSubjects = ref([
  {
    id: 1,
    name: 'أ5',
    grade_name: 'الصف الخامس',
    subject_name: 'الرياضيات',
    students_count: '24 طالباً',
    active_homeworks_count: 3,
    scheduled_exams_count: 2,
    room_name: 'قاعة 4 (الجناح الشرقي)'
  },
  {
    id: 2,
    name: 'ب5',
    grade_name: 'الصف الخامس',
    subject_name: 'الرياضيات',
    students_count: '22 طالباً',
    active_homeworks_count: 2,
    scheduled_exams_count: 1,
    room_name: 'قاعة 5 (الجناح الشرقي)'
  },
  {
    id: 3,
    name: 'أ6',
    grade_name: 'الصف السادس',
    subject_name: 'الرياضيات',
    students_count: '23 طالباً',
    active_homeworks_count: 2,
    scheduled_exams_count: 1,
    room_name: 'قاعة 8 (الجناح الشمالي)'
  }
]);
</script>

<style scoped>
.design-preview-root {
  min-height: 100vh;
  width: 100%;
  background: linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #0f172a 100%);
  color: #f8fafc;
  direction: rtl;
  font-family: 'SF Arabic', -apple-system, BlinkMacSystemFont, 'Cairo', sans-serif;
  padding-bottom: 60px;
  position: relative;
  overflow-x: hidden;
}

.glow-orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(120px);
  opacity: 0.35;
  pointer-events: none;
}

.orb-1 {
  top: -100px;
  right: -100px;
  width: 500px;
  height: 500px;
  background: radial-gradient(circle, #6366f1 0%, transparent 70%);
}

.orb-2 {
  bottom: 0;
  left: -100px;
  width: 600px;
  height: 600px;
  background: radial-gradient(circle, #a855f7 0%, transparent 70%);
}

/* Header */
.preview-header {
  background: rgba(15, 23, 42, 0.75);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  padding: 20px 24px;
  position: sticky;
  top: 0;
  z-index: 100;
}

.preview-header-container {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  flex-wrap: wrap;
}

.brand-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  font-weight: 700;
  background: rgba(99, 102, 241, 0.2);
  color: #818cf8;
  padding: 4px 12px;
  border-radius: 20px;
  border: 1px solid rgba(99, 102, 241, 0.3);
  margin-bottom: 8px;
}

.pulse-dot {
  width: 8px;
  height: 8px;
  background: #22c55e;
  border-radius: 50%;
  box-shadow: 0 0 10px #22c55e;
}

.main-title {
  font-size: 22px;
  font-weight: 900;
  color: #ffffff;
  margin: 0 0 4px;
}

.sub-title {
  font-size: 13px;
  color: #94a3b8;
  margin: 0;
}

.header-actions-group {
  display: flex;
  align-items: center;
  gap: 12px;
}

.theme-toggle-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  background: rgba(255, 255, 255, 0.12);
  color: #ffffff;
  border: 1px solid rgba(255, 255, 255, 0.25);
  padding: 10px 18px;
  border-radius: 14px;
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.25s ease;
  font-family: inherit;
  backdrop-filter: blur(10px);
}

.theme-toggle-btn:hover {
  background: rgba(255, 255, 255, 0.22);
  transform: translateY(-2px);
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.15);
}

.back-to-login-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  background: rgba(255, 255, 255, 0.1);
  color: #ffffff;
  border: 1px solid rgba(255, 255, 255, 0.2);
  padding: 10px 18px;
  border-radius: 14px;
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.25s ease;
  font-family: inherit;
}

.back-to-login-btn:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: translateY(-2px);
}

/* Workspace */
.preview-workspace {
  max-width: 1200px;
  margin: 30px auto;
  padding: 0 20px;
  display: flex;
  flex-direction: column;
  gap: 32px;
  position: relative;
  z-index: 10;
}

/* Step Section Layout */
.step-section {
  background: rgba(30, 41, 59, 0.6);
  backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 24px;
  padding: 24px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
}

.step-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;
}

.step-header-with-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px;
  margin-bottom: 20px;
}

.step-num {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%);
  color: #ffffff;
  font-size: 15px;
  font-weight: 800;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(99, 102, 241, 0.4);
}

.step-title {
  font-size: 17px;
  font-weight: 800;
  color: #f1f5f9;
  margin: 0;
}

/* Step 1: Role Selector Grid */
.role-selector-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 16px;
}

.role-card {
  background: rgba(15, 23, 42, 0.5);
  border: 2px solid rgba(255, 255, 255, 0.08);
  border-radius: 20px;
  padding: 18px 20px;
  display: flex;
  align-items: center;
  gap: 16px;
  cursor: pointer;
  transition: all 0.25s ease;
  position: relative;
}

.role-card:hover {
  background: rgba(15, 23, 42, 0.8);
  border-color: rgba(99, 102, 241, 0.4);
  transform: translateY(-2px);
}

.role-card.active {
  background: linear-gradient(135deg, rgba(79, 70, 229, 0.25) 0%, rgba(67, 56, 202, 0.35) 100%);
  border-color: #6366f1;
  box-shadow: 0 8px 24px rgba(79, 70, 229, 0.25);
}

.role-icon-box {
  width: 52px;
  height: 52px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 26px;
  flex-shrink: 0;
}

.role-icon-box.student {
  background: rgba(99, 102, 241, 0.2);
  border: 1px solid rgba(99, 102, 241, 0.3);
}

.role-icon-box.teacher {
  background: rgba(168, 85, 247, 0.2);
  border: 1px solid rgba(168, 85, 247, 0.3);
}

.role-icon-box.admin {
  background: rgba(14, 165, 233, 0.2);
  border: 1px solid rgba(14, 165, 233, 0.3);
}

.role-icon-box.shared {
  background: rgba(236, 72, 153, 0.2);
  border: 1px solid rgba(236, 72, 153, 0.3);
}

.role-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.role-name {
  font-size: 15px;
  font-weight: 800;
  color: #ffffff;
  margin: 0;
}

.role-desc {
  font-size: 12px;
  color: #94a3b8;
}

.active-check-icon {
  position: absolute;
  top: 14px;
  left: 16px;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: #6366f1;
  color: #ffffff;
  font-size: 12px;
  font-weight: 800;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Step 2: Page Pills Row */
.page-pills-row {
  display: flex;
  gap: 12px;
  overflow-x: auto;
  padding-bottom: 6px;
  scroll-behavior: smooth;
}

.page-pill-btn {
  background: rgba(15, 23, 42, 0.6);
  border: 1.5px solid rgba(255, 255, 255, 0.1);
  padding: 12px 18px;
  border-radius: 16px;
  color: #cbd5e1;
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
  font-family: inherit;
  flex-shrink: 0;
}

.page-pill-btn:hover {
  background: rgba(30, 41, 59, 0.9);
  color: #ffffff;
  border-color: rgba(99, 102, 241, 0.4);
}

.page-pill-btn.active {
  background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%);
  color: #ffffff;
  border-color: transparent;
  box-shadow: 0 6px 18px rgba(99, 102, 241, 0.35);
}

.page-icon {
  font-size: 18px;
}

.page-name {
  font-size: 14px;
  font-weight: 800;
}

.page-count-badge {
  font-size: 11px;
  background: rgba(255, 255, 255, 0.2);
  padding: 2px 8px;
  border-radius: 10px;
  font-weight: 700;
}

/* Step 3: Viewport Controls & Sub-tabs */
.device-toggle-group {
  display: flex;
  gap: 6px;
  background: rgba(15, 23, 42, 0.6);
  padding: 4px;
  border-radius: 14px;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.device-btn {
  padding: 8px 14px;
  border-radius: 10px;
  border: none;
  background: transparent;
  color: #94a3b8;
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s ease;
  font-family: inherit;
}

.device-btn.active {
  background: rgba(255, 255, 255, 0.15);
  color: #ffffff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

.component-tabs-bar {
  display: flex;
  gap: 10px;
  overflow-x: auto;
  padding-bottom: 8px;
}

.comp-subtab-btn {
  background: rgba(15, 23, 42, 0.7);
  border: 1.5px solid rgba(255, 255, 255, 0.1);
  padding: 12px 16px;
  border-radius: 16px;
  color: #cbd5e1;
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
  font-family: inherit;
}

.comp-subtab-btn:hover {
  background: rgba(30, 41, 59, 0.9);
  color: #ffffff;
  border-color: rgba(168, 85, 247, 0.4);
}

.comp-subtab-btn.active {
  background: linear-gradient(135deg, #a855f7 0%, #7e22ce 100%);
  color: #ffffff;
  border-color: transparent;
  box-shadow: 0 6px 18px rgba(168, 85, 247, 0.35);
}

.comp-title {
  font-size: 13.5px;
  font-weight: 800;
}

.comp-file-tag {
  font-size: 11px;
  background: rgba(0, 0, 0, 0.25);
  padding: 2px 6px;
  border-radius: 6px;
  font-family: monospace;
  color: #e2e8f0;
}

.file-path-banner {
  background: rgba(15, 23, 42, 0.8);
  border: 1px dashed rgba(168, 85, 247, 0.4);
  padding: 12px 16px;
  border-radius: 14px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 14px;
  margin-bottom: 20px;
}

.path-info {
  display: flex;
  align-items: center;
  gap: 8px;
}

.path-label {
  font-size: 12px;
  color: #94a3b8;
  font-weight: 700;
}

.path-code {
  font-size: 12px;
  color: #c084fc;
  font-family: monospace;
  font-weight: 700;
  direction: ltr;
}

.path-desc {
  font-size: 12px;
  color: #cbd5e1;
}

/* Component Render Canvas */
.component-render-canvas {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  min-height: 500px;
  background: rgba(15, 23, 42, 0.9);
  border-radius: 24px;
  padding: 24px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  overflow-x: auto;
}

/* Mobile Viewport Shell */
.mobile-iphone-shell {
  width: 100%;
  max-width: 440px;
  min-height: 680px;
  background: linear-gradient(180deg, rgba(248, 245, 255, 0.88) 0%, rgba(240, 247, 255, 0.92) 100%), url('/images/student_bg.jpg') center top / cover no-repeat fixed;
  border-radius: 36px;
  box-shadow: 0 25px 60px rgba(0, 0, 0, 0.6), 0 0 0 12px #1e293b;
  overflow: hidden;
  position: relative;
  color: #1e293b;
}

.mobile-notch-header {
  background: #0f172a;
  color: #ffffff;
  padding: 8px 18px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
  font-weight: 700;
}

.notch-island {
  width: 90px;
  height: 16px;
  background: #000000;
  border-radius: 12px;
}

/* Desktop Viewport Shell */
.desktop-shell {
  width: 100%;
  background: linear-gradient(180deg, rgba(248, 245, 255, 0.88) 0%, rgba(240, 247, 255, 0.92) 100%), url('/images/student_bg.jpg') center top / cover no-repeat fixed;
  border-radius: 20px;
  padding: 20px;
  color: #1e293b;
  min-height: 500px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
}

.live-component-wrapper {
  width: 100%;
}

/* =========================================================
   LIGHT MODE STYLING OVERRIDES (الوضع الفاتح)
   ========================================================= */
.design-preview-root.light {
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 50%, #e2e8f0 100%);
  color: #0f172a;
}

.design-preview-root.light .glow-orb {
  opacity: 0.12;
}

.design-preview-root.light .preview-header {
  background: rgba(255, 255, 255, 0.85);
  border-bottom: 1px solid rgba(203, 213, 225, 0.6);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04);
}

.design-preview-root.light .main-title {
  color: #0f172a;
}

.design-preview-root.light .sub-title {
  color: #64748b;
}

.design-preview-root.light .brand-badge {
  background: rgba(99, 102, 241, 0.1);
  color: #4f46e5;
  border-color: rgba(99, 102, 241, 0.25);
}

.design-preview-root.light .theme-toggle-btn {
  background: #ffffff;
  color: #0f172a;
  border-color: #cbd5e1;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}

.design-preview-root.light .theme-toggle-btn:hover {
  background: #f8fafc;
  border-color: #94a3b8;
}

.design-preview-root.light .back-to-login-btn {
  background: #ffffff;
  color: #334155;
  border-color: #cbd5e1;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}

.design-preview-root.light .back-to-login-btn:hover {
  background: #f8fafc;
  border-color: #94a3b8;
}

.design-preview-root.light .step-section {
  background: rgba(255, 255, 255, 0.95);
  border: 1px solid #e2e8f0;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.04);
}

.design-preview-root.light .step-title {
  color: #0f172a;
}

.design-preview-root.light .role-card {
  background: #ffffff;
  border-color: #e2e8f0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.03);
}

.design-preview-root.light .role-card:hover {
  background: #f8fafc;
  border-color: #818cf8;
}

.design-preview-root.light .role-card.active {
  background: linear-gradient(135deg, #eff6ff 0%, #ede9fe 100%);
  border-color: #6366f1;
  box-shadow: 0 8px 24px rgba(99, 102, 241, 0.15);
}

.design-preview-root.light .role-name {
  color: #0f172a;
}

.design-preview-root.light .role-desc {
  color: #64748b;
}

.design-preview-root.light .page-pill-btn {
  background: #ffffff;
  border-color: #e2e8f0;
  color: #475569;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.03);
}

.design-preview-root.light .page-pill-btn:hover {
  background: #f8fafc;
  color: #0f172a;
  border-color: #94a3b8;
}

.design-preview-root.light .page-pill-btn.active {
  background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%);
  color: #ffffff;
  border-color: transparent;
  box-shadow: 0 6px 18px rgba(99, 102, 241, 0.25);
}

.design-preview-root.light .device-toggle-group {
  background: #f1f5f9;
  border-color: #e2e8f0;
}

.design-preview-root.light .device-btn {
  color: #64748b;
}

.design-preview-root.light .device-btn.active {
  background: #ffffff;
  color: #0f172a;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
}

.design-preview-root.light .comp-subtab-btn {
  background: #ffffff;
  border-color: #e2e8f0;
  color: #475569;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.03);
}

.design-preview-root.light .comp-subtab-btn:hover {
  background: #f8fafc;
  color: #0f172a;
  border-color: #c084fc;
}

.design-preview-root.light .comp-subtab-btn.active {
  background: linear-gradient(135deg, #a855f7 0%, #7e22ce 100%);
  color: #ffffff;
  border-color: transparent;
  box-shadow: 0 6px 18px rgba(168, 85, 247, 0.25);
}

.design-preview-root.light .comp-file-tag {
  background: #f1f5f9;
  color: #475569;
}

.design-preview-root.light .file-path-banner {
  background: #ffffff;
  border-color: #d8b4fe;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.03);
}

.design-preview-root.light .path-label {
  color: #64748b;
}

.design-preview-root.light .path-code {
  color: #7e22ce;
}

.design-preview-root.light .path-desc {
  color: #334155;
}

.design-preview-root.light .component-render-canvas {
  background: #f1f5f9;
  border-color: #e2e8f0;
}

.design-preview-root.light .mobile-iphone-shell {
  box-shadow: 0 25px 60px rgba(0, 0, 0, 0.12), 0 0 0 12px #334155;
}

.design-preview-root.light .desktop-shell {
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.06);
  border: 1px solid #e2e8f0;
}
</style>
