/**
 * ADMIN DASHBOARD SCRIPT (VANILLA JAVASCRIPT MIGRATION)
 * Single Source of Truth Logic migrated 1:1 from Vue.js reactive state & methods.
 */

// Global Dashboard State
const state = {
  activeModule: 'analytics',
  showProfileDropdown: false,
  selectedGrade: null,
  selectedSection: null,
  selectedStudent: null,
  selectedTeacher: null,
  activeSectionTab: 'schedule',
  selectedDay: 'الأحد',
  
  // Search & Filter State
  studentSearch: '',
  studentGradeFilter: '',
  studentSectionFilter: '',
  teacherSearch: '',

  // Modal Visibility State
  modals: {
    addStudent: false,
    editStudent: false,
    transferStudent: false,
    addTeacher: false,
    addSubject: false,
    addSection: false,
    addHomework: false,
    addExam: false,
    sectionDetail: false,
    assignTeacher: false
  },

  // Edit / Transfer Active Objects
  editingStudent: null,
  transferringStudent: null,

  // Initial Mock Data (Exact match with Vue.js dataset)
  students: [
    { id: 1, roll_number: '101', student_code: 'STD-2026-001', full_name: 'أحمد محمود العلي', grade_name: 'الصف الخامس', section_name: 'الشعبة أ', guardian_name: 'محمود العلي', guardian_phone: '0501234567', address: 'طرابلس - حي الأندلس' },
    { id: 2, roll_number: '102', student_code: 'STD-2026-002', full_name: 'سارة خالد عمر', grade_name: 'الصف الخامس', section_name: 'الشعبة ب', guardian_name: 'خالد عمر', guardian_phone: '0507654321', address: 'طرابلس - النوفليين' },
    { id: 3, roll_number: '103', student_code: 'STD-2026-003', full_name: 'عمر يوسف الحداد', grade_name: 'الصف السادس', section_name: 'الشعبة أ', guardian_name: 'يوسف الحداد', guardian_phone: '0509876543', address: 'طرابلس - دمشق' },
    { id: 4, roll_number: '104', student_code: 'STD-2026-004', full_name: 'فاطمة محمد الترهوني', grade_name: 'الصف السابع', section_name: 'الشعبة أ', guardian_name: 'محمد الترهوني', guardian_phone: '0504445556', address: 'طرابلس - بن عاشور' },
    { id: 5, roll_number: '105', student_code: 'STD-2026-005', full_name: 'حمزة مصطفى الورفلي', grade_name: 'الصف الأول', section_name: 'الشعبة أ', guardian_name: 'مصطفى الورفلي', guardian_phone: '0503332211', address: 'طرابلس - عين زارة' }
  ],

  teachers: [
    { id: 1, teacher_name: 'أ. محمد علي السويسي', teacher_code: 'TCH-001', phone: '0912345678', specialization: 'الرياضيات والهندسة', subjects: 'الرياضيات', status: 'نشط' },
    { id: 2, teacher_name: 'أ. سارة مصطفى قدور', teacher_code: 'TCH-002', phone: '0923456789', specialization: 'اللغة العربية والآداب', subjects: 'اللغة العربية', status: 'نشط' },
    { id: 3, teacher_name: 'أ. طارق عبد السلام', teacher_code: 'TCH-003', phone: '0934567890', specialization: 'العلوم العامة والكيمياء', subjects: 'العلوم العامة', status: 'نشط' },
    { id: 4, teacher_name: 'أ. مريم يوسف المهدي', teacher_code: 'TCH-004', phone: '0945678901', specialization: 'اللغة الإنجليزية', subjects: 'اللغة الإنجليزية', status: 'نشط' },
    { id: 5, teacher_name: 'أ. خالد التومي', teacher_code: 'TCH-005', phone: '0956789012', specialization: 'التربية الإسلامية', subjects: 'التربية الإسلامية', status: 'نشط' }
  ],

  grades: [
    { id: 1, level: 1, name: 'الصف الأول', sections: [{ id: 101, name: 'أ', room: 'قاعة 101' }, { id: 102, name: 'ب', room: 'قاعة 102' }] },
    { id: 2, level: 2, name: 'الصف الثاني', sections: [{ id: 103, name: 'أ', room: 'قاعة 103' }] },
    { id: 3, level: 3, name: 'الصف الثالث', sections: [{ id: 104, name: 'أ', room: 'قاعة 104' }, { id: 105, name: 'ب', room: 'قاعة 105' }] },
    { id: 4, level: 4, name: 'الصف الرابع', sections: [{ id: 106, name: 'أ', room: 'قاعة 106' }] },
    { id: 5, level: 5, name: 'الصف الخامس', sections: [{ id: 107, name: 'أ', room: 'قاعة 107' }, { id: 108, name: 'ب', room: 'قاعة 108' }, { id: 109, name: 'ج', room: 'قاعة 109' }] },
    { id: 6, level: 6, name: 'الصف السادس', sections: [{ id: 110, name: 'أ', room: 'قاعة 110' }] },
    { id: 7, level: 7, name: 'الصف السابع', sections: [{ id: 111, name: 'أ', room: 'قاعة 111' }] },
    { id: 8, level: 8, name: 'الصف الثامن', sections: [{ id: 112, name: 'أ', room: 'قاعة 112' }] },
    { id: 9, level: 9, name: 'الصف التاسع', sections: [{ id: 113, name: 'أ', room: 'قاعة 113' }] }
  ],

  subjects: [
    { id: 1, code: 'MATH-5', name: 'الرياضيات', grade_name: 'الصف الخامس', teacher_name: 'أ. محمد علي السويسي' },
    { id: 2, code: 'ARAB-5', name: 'اللغة العربية', grade_name: 'الصف الخامس', teacher_name: 'أ. سارة مصطفى قدور' },
    { id: 3, code: 'SCI-5', name: 'العلوم العامة', grade_name: 'الصف الخامس', teacher_name: 'أ. طارق عبد السلام' },
    { id: 4, code: 'ENG-5', name: 'اللغة الإنجليزية', grade_name: 'الصف الخامس', teacher_name: 'أ. مريم يوسف المهدي' },
    { id: 5, code: 'ISLAM-5', name: 'التربية الإسلامية', grade_name: 'الصف الخامس', teacher_name: 'أ. خالد التومي' }
  ],

  homeworks: [
    { id: 1, title: 'حل تمارين الكسور العادية ص 45', subject_name: 'الرياضيات', grade_name: 'الصف الخامس', section_name: 'الشعبة أ', due_date: '2026-08-18', status: 'منشور' },
    { id: 2, title: 'إعراب سورة الفلق والقصيدة', subject_name: 'اللغة العربية', grade_name: 'الصف الخامس', section_name: 'الشعبة ب', due_date: '2026-08-19', status: 'منشور' },
    { id: 3, title: 'تقرير التجارب المعملية لخلايا النبات', subject_name: 'العلوم العامة', grade_name: 'الصف السادس', section_name: 'الشعبة أ', due_date: '2026-08-20', status: 'قيد المراجعة' }
  ],

  exams: [
    { id: 1, title: 'الاختبار النصفي الموحد في الرياضيات', subject_name: 'الرياضيات', grade_name: 'الصف الخامس', exam_date: '2026-08-25', room: 'قاعة الاختبارات 1', status: 'مجدول' },
    { id: 2, title: 'اختبار القراءة والتعبير الشفهي', subject_name: 'اللغة العربية', grade_name: 'الصف الخامس', exam_date: '2026-08-27', room: 'قاعة 107', status: 'مجدول' }
  ],

  dailyAnalytics: {
    studentsPresent: 184,
    studentsAbsent: 8,
    studentsTotal: 192,
    studentsRate: 96,
    teachersPresent: 24,
    teachersAbsent: 1,
    teachersTotal: 25,
    teachersRate: 96,
    totalHomeworks: 34,
    activeHomeworks: 18,
    homeworkComplianceRate: 88,
    totalExams: 12,
    todayExams: 2
  },

  gradeAttendanceBreakdown: [
    { gradeName: 'الصف الأول', present: 29, absent: 1, rate: 98 },
    { gradeName: 'الصف الثاني', present: 29, absent: 1, rate: 97 },
    { gradeName: 'الصف الثالث', present: 29, absent: 1, rate: 96 },
    { gradeName: 'الصف الرابع', present: 29, absent: 1, rate: 95 },
    { gradeName: 'الصف الخامس', present: 87, absent: 3, rate: 97 },
    { gradeName: 'الصف السادس', present: 28, absent: 2, rate: 94 }
  ],

  scheduleDays: ['الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس'],
  periods: ['الحصة 1', 'الحصة 2', 'الحصة 3', 'الحصة 4', 'الحصة 5', 'الحصة 6']
};

// Initialize Dashboard DOM and Events
document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initProfileDropdown();
  initModals();
  renderCurrentModule();
});

/* ===== NAVIGATION & MODULE SWITCHING ===== */
function initNavigation() {
  const navButtons = document.querySelectorAll('.saas-nav-link');
  navButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const moduleName = btn.dataset.module;
      if (moduleName) {
        state.activeModule = moduleName;
        state.selectedGrade = null;
        state.selectedStudent = null;
        state.selectedTeacher = null;

        navButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        renderCurrentModule();
      }
    });
  });
}

function setModule(moduleName) {
  state.activeModule = moduleName;
  state.selectedGrade = null;
  state.selectedStudent = null;
  state.selectedTeacher = null;

  const navButtons = document.querySelectorAll('.saas-nav-link');
  navButtons.forEach(b => {
    if (b.dataset.module === moduleName) {
      b.classList.add('active');
    } else {
      b.classList.remove('active');
    }
  });

  renderCurrentModule();
}

/* ===== PROFILE DROPDOWN ===== */
function initProfileDropdown() {
  const pillBtn = document.getElementById('profilePillBtn');
  const menu = document.getElementById('profileMenu');
  const caret = document.getElementById('profileCaret');

  if (pillBtn && menu) {
    pillBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      state.showProfileDropdown = !state.showProfileDropdown;
      if (state.showProfileDropdown) {
        menu.classList.add('show');
        caret && caret.classList.add('open');
      } else {
        menu.classList.remove('show');
        caret && caret.classList.remove('open');
      }
    });

    document.addEventListener('click', (e) => {
      if (!pillBtn.contains(e.target) && !menu.contains(e.target)) {
        state.showProfileDropdown = false;
        menu.classList.remove('show');
        caret && caret.classList.remove('open');
      }
    });
  }
}

/* ===== MODALS LOGIC ===== */
function initModals() {
  // Global Escape Key Listener for Modals
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeAllModals();
    }
  });
}

function openModal(modalKey) {
  state.modals[modalKey] = true;
  const overlay = document.getElementById(`modal-${modalKey}`);
  if (overlay) {
    overlay.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  }
}

function closeModal(modalKey) {
  state.modals[modalKey] = false;
  const overlay = document.getElementById(`modal-${modalKey}`);
  if (overlay) {
    overlay.style.display = 'none';
    document.body.style.overflow = '';
  }
}

function closeAllModals() {
  Object.keys(state.modals).forEach(k => {
    state.modals[k] = false;
    const overlay = document.getElementById(`modal-${k}`);
    if (overlay) overlay.style.display = 'none';
  });
  document.body.style.overflow = '';
}

/* ===== MAIN RENDER ROUTINE ===== */
function renderCurrentModule() {
  const mainLeft = document.getElementById('mainContentLeft');
  const mainRight = document.getElementById('mainContentRight');
  const contentGrid = document.getElementById('desktopContentGrid');

  if (!mainLeft || !mainRight) return;

  // Toggle Grid Full Width for Analytics
  if (state.activeModule === 'analytics') {
    contentGrid.classList.add('full-width-analytics');
    mainRight.style.display = 'none';
  } else {
    contentGrid.classList.remove('full-width-analytics');
    mainRight.style.display = 'flex';
  }

  // Clear Pane Left
  mainLeft.innerHTML = '';

  // 1. ANALYTICS MODULE
  if (state.activeModule === 'analytics') {
    mainLeft.appendChild(renderAnalyticsModule());
  } 
  // 2. CLASSROOMS / STRUCTURE MODULE
  else if (state.activeModule === 'classrooms' || state.activeModule === 'structure') {
    if (state.selectedGrade) {
      mainLeft.appendChild(renderGradeDetailView());
    } else {
      mainLeft.appendChild(renderClassroomsModule());
    }
  }
  // 3. STUDENTS MODULE
  else if (state.activeModule === 'students') {
    if (state.selectedStudent) {
      mainLeft.appendChild(renderStudentProfileView());
    } else {
      mainLeft.appendChild(renderStudentsModule());
    }
  }
  // 4. TEACHERS MODULE
  else if (state.activeModule === 'teachers') {
    if (state.selectedTeacher) {
      mainLeft.appendChild(renderTeacherProfileView());
    } else {
      mainLeft.appendChild(renderTeachersModule());
    }
  }
  // 5. SUBJECTS MODULE
  else if (state.activeModule === 'subjects') {
    mainLeft.appendChild(renderSubjectsModule());
  }
  // 6. SCHEDULE MODULE
  else if (state.activeModule === 'schedule') {
    mainLeft.appendChild(renderScheduleModule());
  }
  // 7. HOMEWORK MODULE
  else if (state.activeModule === 'homework') {
    mainLeft.appendChild(renderHomeworkModule());
  }
  // 8. EXAMS MODULE
  else if (state.activeModule === 'exams') {
    mainLeft.appendChild(renderExamsModule());
  }
  // 9. REPORTS MODULE
  else if (state.activeModule === 'reports') {
    mainLeft.appendChild(renderReportsModule());
  }
  // 10. SETTINGS MODULE
  else if (state.activeModule === 'settings') {
    mainLeft.appendChild(renderSettingsModule());
  }
  // 11. CREATION MODULE
  else if (state.activeModule === 'creation') {
    mainLeft.appendChild(renderCreationModule());
  }
}

/* ===== MODULE 1: ANALYTICS RENDER ===== */
function renderAnalyticsModule() {
  const container = document.createElement('div');
  container.className = 'tab-pane-content saas-analytics-pane';

  container.innerHTML = `
    <!-- PAGE HEADER BAR -->
    <div class="saas-page-header flex-between">
      <div class="page-title-group flex-align-center">
        <div class="page-title-sq-icon">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>
        </div>
        <div>
          <h2 class="saas-page-title">التقرير والإحصائيات اليومية للمنظومة</h2>
          <p class="saas-page-sub">متابعة دقيقة لمعدلات حضور الطلاب والمعلمين، الواجبات والامتحانات المنشورة، ونشاط الفصول</p>
        </div>
      </div>
      <div class="page-header-actions flex-actions-gap">
        <span class="saas-date-pill flex-align-center" style="gap: 6px;">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#64748b" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
          <span>اليوم: الجمعة، 16 أغسطس 2026</span>
        </span>
        <button class="saas-print-btn flex-align-center" style="gap: 6px;" onclick="window.print()">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></svg>
          <span>طباعة التقرير اليومي</span>
        </button>
      </div>
    </div>

    <!-- 1. 4 MAIN STATISTICS 3D CARDS GRID -->
    <div class="analytics-cards-grid-3d">
      
      <!-- Card 1: Student Attendance -->
      <div class="card-3d-box student-theme">
        <div class="card-3d-header flex-between">
          <h4 class="card-3d-title">حضور وغياب الطلاب</h4>
          <div class="card-3d-icon-pill emerald">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5"/></svg>
          </div>
        </div>
        <div class="card-3d-body flex-between">
          <div class="card-3d-img-container">
            <img src="./assets/student_attendance_3d.png" alt="طلاب" class="card-3d-render-img" />
            <div class="card-3d-shadow-ellipse"></div>
          </div>
          <div class="card-3d-stats">
            <div class="card-3d-num">${state.dailyAnalytics.studentsPresent},${state.dailyAnalytics.studentsTotal}</div>
            <div class="card-3d-unit">طالب</div>
          </div>
        </div>
        <div class="card-3d-progress-track">
          <div class="card-3d-progress-fill emerald-gradient" style="width: ${state.dailyAnalytics.studentsRate}%"></div>
        </div>
        <div class="card-3d-footer flex-between">
          <span class="badge-status-dot green"><span class="dot green"></span> الحضور ${state.dailyAnalytics.studentsPresent}</span>
          <span class="badge-status-dot red"><span class="dot red"></span> الغياب ${state.dailyAnalytics.studentsAbsent}</span>
        </div>
      </div>

      <!-- Card 2: Teacher Attendance -->
      <div class="card-3d-box teacher-theme">
        <div class="card-3d-header flex-between">
          <h4 class="card-3d-title">حضور وغياب المعلمين</h4>
          <div class="card-3d-icon-pill emerald">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
          </div>
        </div>
        <div class="card-3d-body flex-between">
          <div class="card-3d-img-container">
            <img src="./assets/teacher_attendance_3d.png" alt="معلمون" class="card-3d-render-img" />
            <div class="card-3d-shadow-ellipse"></div>
          </div>
          <div class="card-3d-stats">
            <div class="card-3d-num">${state.dailyAnalytics.teachersPresent},${state.dailyAnalytics.teachersTotal}</div>
            <div class="card-3d-unit">معلم</div>
          </div>
        </div>
        <div class="card-3d-progress-track">
          <div class="card-3d-progress-fill emerald-gradient" style="width: ${state.dailyAnalytics.teachersRate}%"></div>
        </div>
        <div class="card-3d-footer flex-between">
          <span class="badge-status-dot green"><span class="dot green"></span> الحضور ${state.dailyAnalytics.teachersPresent}</span>
          <span class="badge-status-dot gray"><span class="dot gray"></span> الغياب ${state.dailyAnalytics.teachersAbsent}</span>
        </div>
      </div>

      <!-- Card 3: Homework & Assignments -->
      <div class="card-3d-box homework-theme">
        <div class="card-3d-header flex-between">
          <h4 class="card-3d-title">الواجبات والتكليفات</h4>
          <div class="card-3d-icon-pill purple">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
          </div>
        </div>
        <div class="card-3d-body flex-between">
          <div class="card-3d-img-container">
            <img src="./assets/homework_assignments_3d.png" alt="واجبات" class="card-3d-render-img" />
            <div class="card-3d-shadow-ellipse purple-shadow"></div>
          </div>
          <div class="card-3d-stats">
            <div class="card-3d-num">${state.dailyAnalytics.totalHomeworks}</div>
            <div class="card-3d-unit">واجب منشور</div>
          </div>
        </div>
        <div class="card-3d-progress-track">
          <div class="card-3d-progress-fill purple-gradient" style="width: ${state.dailyAnalytics.homeworkComplianceRate}%"></div>
        </div>
        <div class="card-3d-footer flex-between">
          <span class="badge-status-purple-pill">النشطة: ${state.dailyAnalytics.activeHomeworks}</span>
          <span class="footer-muted-text">إجمالي: ${state.dailyAnalytics.totalHomeworks}</span>
        </div>
      </div>

      <!-- Card 4: Exams & Evaluations -->
      <div class="card-3d-box exam-theme">
        <div class="card-3d-header flex-between">
          <h4 class="card-3d-title">الامتحانات والتقييمات</h4>
          <div class="card-3d-icon-pill amber">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
          </div>
        </div>
        <div class="card-3d-body flex-between">
          <div class="card-3d-img-container">
            <img src="./assets/exams_evaluations_3d.png" alt="امتحانات" class="card-3d-render-img" />
            <div class="card-3d-shadow-ellipse amber-shadow"></div>
          </div>
          <div class="card-3d-stats">
            <div class="card-3d-num">${state.dailyAnalytics.totalExams}</div>
            <div class="card-3d-unit">امتحان مجدول</div>
          </div>
        </div>
        <div class="card-3d-progress-track">
          <div class="card-3d-progress-fill amber-gradient" style="width: 75%;"></div>
        </div>
        <div class="card-3d-footer flex-between">
          <span class="footer-muted-text">اليوم: ${state.dailyAnalytics.todayExams} امتحانات</span>
          <span class="footer-clock-pill flex-align-center" style="gap: 4px;">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
            <span>11:00</span>
          </span>
        </div>
      </div>

    </div>

    <!-- 2. TWO-COLUMN ANALYTICS GRID -->
    <div class="saas-two-column-grid">
      
      <!-- RIGHT COLUMN: Attendance Record By Grade -->
      <div class="saas-card-box">
        <div class="saas-card-header flex-between">
          <div class="flex-align-center">
            <div class="card-header-sq-icon indigo">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
            </div>
            <div>
              <h4 class="saas-card-title">نسبة وسجل الحضور حسب الصفوف الدراسية</h4>
              <p class="saas-card-sub">نظرة عامة على نسب الحضور اليومية</p>
            </div>
          </div>
          <div class="grade-count-pill">9 صفوف</div>
        </div>

        <div class="grade-att-list-saas">
          ${state.gradeAttendanceBreakdown.map(g => `
            <div class="saas-grade-row">
              <div class="grade-row-meta flex-between">
                <div class="flex-align-center">
                  <span class="grade-row-title">${g.gradeName}</span>
                  <span class="grade-att-badge">(${g.present} حضور / ${g.absent} غياب)</span>
                </div>
                <span class="grade-att-rate">${g.rate}%</span>
              </div>
              <div class="saas-progress-track">
                <div class="saas-progress-fill emerald" style="width: ${g.rate}%"></div>
              </div>
            </div>
          `).join('')}
        </div>

        <div class="saas-card-footer">
          <button class="saas-footer-action-btn" onclick="setModule('students')">عرض سجل الحضور الكامل ←</button>
        </div>
      </div>

      <!-- LEFT COLUMN: Performance Indicators -->
      <div class="saas-card-box">
        <div class="saas-card-header flex-between">
          <div class="flex-align-center">
            <div class="card-header-sq-icon purple">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>
            </div>
            <div>
              <h4 class="saas-card-title">مؤشرات الأداء</h4>
              <p class="saas-card-sub">نظرة عامة على أداء المنظومة</p>
            </div>
          </div>
        </div>

        <div class="performance-metrics-list">
          <div class="saas-perf-row flex-between">
            <div class="perf-left-info flex-align-center">
              <div class="circle-gauge-pill">100%</div>
              <div class="perf-text-group">
                <h5 class="perf-item-title">نسبة اكتمال الحصص اليومية</h5>
                <span class="perf-item-sub">(36) حصة منفذة من (36)</span>
              </div>
            </div>
            <div class="perf-icon-box amber">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
            </div>
          </div>

          <div class="saas-perf-row flex-between">
            <div class="perf-left-info flex-align-center">
              <div class="sparkline-container">
                <svg width="70" height="28" viewBox="0 0 70 28" fill="none">
                  <path d="M2 20L15 12L30 22L45 8L60 16L68 4" stroke="#8B5CF6" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
              <div class="perf-text-group">
                <h5 class="perf-item-title">الواجبات الأعلى نشاطاً (الرياضيات)</h5>
                <span class="perf-item-sub">8 واجبات منزلية</span>
              </div>
            </div>
            <div class="perf-icon-box purple">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>
            </div>
          </div>

          <div class="saas-perf-row flex-between">
            <div class="perf-left-info flex-align-center">
              <div class="sparkline-container">
                <svg width="70" height="28" viewBox="0 0 70 28" fill="none">
                  <path d="M2 22L16 18L28 24L42 10L56 14L68 6" stroke="#10B981" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
              <div class="perf-text-group">
                <h5 class="perf-item-title">واجبات تقارير العلوم العامة</h5>
                <span class="perf-item-sub">6 واجبات منشورة</span>
              </div>
            </div>
            <div class="perf-icon-box emerald">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
            </div>
          </div>
        </div>

        <div class="saas-card-footer">
          <button class="saas-footer-action-btn">عرض جميع المؤشرات ←</button>
        </div>
      </div>

    </div>

    <!-- 3. RECENT ACTIVITIES & NOTIFICATIONS -->
    <div class="saas-card-box full-width-activities">
      <div class="saas-card-header flex-align-center" style="margin-bottom: 20px;">
        <div class="card-header-sq-icon amber">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
        </div>
        <div>
          <h4 class="saas-card-title">التنبيهات والأنشطة الأخيرة</h4>
          <p class="saas-card-sub">سجل مباشر للأنشطة والإشعارات الإدارية</p>
        </div>
      </div>

      <div class="activities-cards-grid">
        <div class="activity-card-item">
          <div class="act-icon-sq purple">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
          </div>
          <div class="act-content">
            <h5 class="act-title">تم نشر واجب جديد في مادة الرياضيات</h5>
            <span class="act-time">منذ 15 دقيقة</span>
          </div>
        </div>

        <div class="activity-card-item">
          <div class="act-icon-sq indigo">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
          </div>
          <div class="act-content">
            <h5 class="act-title">تم تسجيل حضور جميع الطلاب في الصف الأول</h5>
            <span class="act-time">منذ 1 ساعة</span>
          </div>
        </div>

        <div class="activity-card-item">
          <div class="act-icon-sq amber">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
          </div>
          <div class="act-content">
            <h5 class="act-title">امتحان اللغة العربية غداً في الساعة 10:00</h5>
            <span class="act-time">منذ 3 ساعات</span>
          </div>
        </div>

        <div class="activity-card-item">
          <div class="act-icon-sq emerald">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/><line x1="19" y1="8" x2="19" y2="14"/><line x1="16" y1="11" x2="22" y2="11"/></svg>
          </div>
          <div class="act-content">
            <h5 class="act-title">إضافة معلم جديد: أ. محمد خالد</h5>
            <span class="act-time">منذ 5 ساعات</span>
          </div>
        </div>
      </div>
    </div>
  `;

  return container;
}

/* ===== MODULE 2: CLASSROOMS RENDER ===== */
function renderClassroomsModule() {
  const container = document.createElement('div');
  container.className = 'tab-pane-content';

  container.innerHTML = `
    <div class="desktop-card-box">
      <div class="card-box-header flex-between">
        <div>
          <h3 class="card-box-title flex-align-center">
            <svg class="title-svg-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4f46e5" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5"/></svg>
            <span>الهيكل التعليمي والفصول الدراسية</span>
          </h3>
          <p class="card-box-sub">عرض وإدارة الصفوف الدراسية 1-9، الشعب والقاعات، والمواد التعليمية</p>
        </div>
        <div class="flex-actions-gap">
          <button class="desktop-secondary-btn flex-align-center" onclick="openModal('addSubject')">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
            <span>إضافة مادة</span>
          </button>
          <button class="desktop-secondary-btn flex-align-center" onclick="openModal('addSection')">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 21h18"/><path d="M5 21V7l8-4v18"/><path d="M19 21V11l-6-3"/></svg>
            <span>إضافة شعبة</span>
          </button>
          <button class="desktop-primary-btn flex-align-center" onclick="setModule('creation')">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
            <span>إضافة صف دراسي</span>
          </button>
        </div>
      </div>

      <table class="desktop-table structure-master-table">
        <thead>
          <tr>
            <th style="width: 240px;">الصف الدراسي (اضغط للتفاصيل)</th>
            <th>
              <span class="flex-align-center" style="gap: 6px;">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#64748b" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 21h18"/><path d="M5 21V7l8-4v18"/><path d="M19 21V11l-6-3"/></svg>
                <span>الشعب والقاعات الدراسية (اضغط للتفاصيل والجدول)</span>
              </span>
            </th>
          </tr>
        </thead>
        <tbody>
          ${state.grades.map(g => `
            <tr>
              <td class="grade-name-cell clickable-student-row" onclick="viewGradeDetail(${g.id})" title="اضغط لعرض كافة بيانات وإحصائيات هذا الصف الدراسي">
                <div class="grade-badge-flex flex-align-center">
                  <span class="grade-level-pill">${g.level}</span>
                  <strong class="grade-title-text clickable-name flex-align-center" style="gap: 6px;">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#4f46e5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5"/></svg>
                    <span>${g.name}</span>
                  </strong>
                </div>
              </td>
              <td>
                <div class="table-items-flex">
                  ${g.sections && g.sections.length > 0 ? g.sections.map(sec => `
                    <span class="sec-pill-tag clickable-sec-pill flex-align-center" style="gap: 4px;" onclick="viewSectionDetail(${g.id}, ${sec.id})" title="اضغط لعرض جدول وتفاصيل الشعبة">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 21h18"/><path d="M5 21V7l8-4v18"/><path d="M19 21V11l-6-3"/></svg>
                      <span>الشعبة ${sec.name}</span>
                    </span>
                  `).join('') : '<span class="empty-pill-muted">لا توجد شعب منشأة</span>'}
                </div>
              </td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
  `;

  return container;
}

/* ===== MODULE 3: STUDENTS RENDER ===== */
function renderStudentsModule() {
  const container = document.createElement('div');
  container.className = 'tab-pane-content';

  const filtered = state.students.filter(s => {
    const matchesSearch = !state.studentSearch || s.full_name.includes(state.studentSearch) || s.roll_number.includes(state.studentSearch);
    const matchesGrade = !state.studentGradeFilter || s.grade_name === state.studentGradeFilter;
    const matchesSection = !state.studentSectionFilter || s.section_name === state.studentSectionFilter;
    return matchesSearch && matchesGrade && matchesSection;
  });

  container.innerHTML = `
    <div class="desktop-card-box">
      <div class="card-box-header flex-between">
        <div>
          <h3 class="card-box-title flex-align-center">
            <svg class="title-svg-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4f46e5" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5"/></svg>
            <span>إدارة سجلات وحسابات الطلاب</span>
          </h3>
          <p class="card-box-sub">انقر على أي طالب لمشاهدة ملفه الكامل أو تنفيذ إجراءات النقل والتعديل</p>
        </div>
        <div class="flex-actions-gap">
          <button class="desktop-secondary-btn flex-align-center" onclick="openModal('transferStudent')">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 1l4 4-4 4"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/><path d="M7 23l-4-4 4-4"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/></svg>
            <span>نقل طالب</span>
          </button>
          <button class="desktop-primary-btn flex-align-center" onclick="openModal('addStudent')">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
            <span>إضافة طالب جديد</span>
          </button>
        </div>
      </div>

      <!-- Filters -->
      <div class="table-filters-row" style="margin-top: 16px;">
        <div class="search-filter-box">
          <input type="text" placeholder="بحث باسم الطالب أو رقم القيد..." value="${state.studentSearch}" oninput="handleStudentSearch(this.value)" />
        </div>
        <select class="filter-select" onchange="handleStudentGradeFilter(this.value)">
          <option value="">جميع الصفوف الدراسية</option>
          ${state.grades.map(g => `<option value="${g.name}" ${state.studentGradeFilter === g.name ? 'selected' : ''}>${g.name}</option>`).join('')}
        </select>
      </div>

      <table class="desktop-table">
        <thead>
          <tr>
            <th>رقم القيد</th>
            <th>كود الطالب</th>
            <th>الاسم الثلاثي</th>
            <th>الصف الدراسي</th>
            <th>الشعبة</th>
            <th>إجراءات الإدارة</th>
          </tr>
        </thead>
        <tbody>
          ${filtered.length > 0 ? filtered.map(st => `
            <tr class="clickable-student-row" onclick="viewStudentProfile(${st.id})">
              <td><strong>${st.roll_number}</strong></td>
              <td><code>${st.student_code}</code></td>
              <td>
                <span class="clickable-name flex-align-center" style="gap: 6px;">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#4f46e5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5"/></svg>
                  <span>${st.full_name}</span>
                </span>
              </td>
              <td><span class="sec-pill-tag grade">${st.grade_name}</span></td>
              <td><span class="sec-pill-tag section">${st.section_name}</span></td>
              <td onclick="event.stopPropagation()">
                <div class="table-actions-inline">
                  <button class="table-btn-icon secondary" onclick="openTransferModalFor(${st.id})" title="نقل الطالب">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 1l4 4-4 4"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/><path d="M7 23l-4-4 4-4"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/></svg>
                  </button>
                  <button class="table-btn-icon secondary" onclick="openEditStudentModalFor(${st.id})" title="تعديل الطالب">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                  </button>
                  <button class="table-btn-icon danger" onclick="deleteStudent(${st.id})" title="حذف الطالب">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
                  </button>
                </div>
              </td>
            </tr>
          `).join('') : `
            <tr>
              <td colspan="6" class="empty-table-msg">لا يوجد طلاب مطابقين لمعايير البحث حالياً.</td>
            </tr>
          `}
        </tbody>
      </table>
    </div>
  `;

  return container;
}

/* ===== MODULE 4: TEACHERS RENDER ===== */
function renderTeachersModule() {
  const container = document.createElement('div');
  container.className = 'tab-pane-content';

  container.innerHTML = `
    <div class="desktop-card-box">
      <div class="card-box-header flex-between">
        <div>
          <h3 class="card-box-title flex-align-center">
            <svg class="title-svg-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4f46e5" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
            <span>إدارة كادر المعلمين وتكليفات المواد</span>
          </h3>
          <p class="card-box-sub">عرض قائمة المعلمين المعتمدين وسجلات المواد المكلفين بها</p>
        </div>
        <button class="desktop-primary-btn flex-align-center" onclick="openModal('addTeacher')">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          <span>إضافة معلم جديد</span>
        </button>
      </div>

      <table class="desktop-table" style="margin-top: 20px;">
        <thead>
          <tr>
            <th>كود المعلم</th>
            <th>اسم المعلم</th>
            <th>التخصص الرئيسي</th>
            <th>المادة المكلف بها</th>
            <th>رقم الهاتف</th>
            <th>الحالة</th>
          </tr>
        </thead>
        <tbody>
          ${state.teachers.map(tch => `
            <tr class="clickable-student-row" onclick="viewTeacherProfile(${tch.id})">
              <td><code>${tch.teacher_code}</code></td>
              <td><strong class="clickable-name">${tch.teacher_name}</strong></td>
              <td>${tch.specialization}</td>
              <td><span class="sec-pill-tag subject">${tch.subjects}</span></td>
              <td>${tch.phone}</td>
              <td><span class="badge-status success">${tch.status}</span></td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
  `;

  return container;
}

/* ===== MODULE 5: SUBJECTS RENDER ===== */
function renderSubjectsModule() {
  const container = document.createElement('div');
  container.className = 'tab-pane-content';

  container.innerHTML = `
    <div class="desktop-card-box">
      <div class="card-box-header flex-between">
        <div>
          <h3 class="card-box-title flex-align-center">
            <svg class="title-svg-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4f46e5" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
            <span>المواد والمناهج الدراسية</span>
          </h3>
          <p class="card-box-sub">عرض قائمة المواد المقررة حسب الصفوف والمعلمين المكلفين بها</p>
        </div>
        <button class="desktop-primary-btn flex-align-center" onclick="openModal('addSubject')">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          <span>إضافة مادة جديدة</span>
        </button>
      </div>

      <table class="desktop-table" style="margin-top: 20px;">
        <thead>
          <tr>
            <th>كود المادة</th>
            <th>اسم المادة</th>
            <th>الصف الدراسي</th>
            <th>المعلم المكلف</th>
          </tr>
        </thead>
        <tbody>
          ${state.subjects.map(sbj => `
            <tr>
              <td><code>${sbj.code}</code></td>
              <td><strong>${sbj.name}</strong></td>
              <td><span class="sec-pill-tag grade">${sbj.grade_name}</span></td>
              <td>${sbj.teacher_name}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
  `;

  return container;
}

/* ===== MODULE 6: SCHEDULE RENDER ===== */
function renderScheduleModule() {
  const container = document.createElement('div');
  container.className = 'tab-pane-content';

  container.innerHTML = `
    <div class="desktop-card-box">
      <div class="card-box-header flex-between">
        <div>
          <h3 class="card-box-title flex-align-center">
            <svg class="title-svg-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4f46e5" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
            <span>الجدول الدراسي الموحد للأسبوع</span>
          </h3>
          <p class="card-box-sub">جدول الحصص الموزع حسب الأيام والشعب الكلية</p>
        </div>

        <div class="day-switcher-bar">
          <span class="day-bar-label">اليوم:</span>
          ${state.scheduleDays.map(d => `
            <button class="day-pill-btn ${state.selectedDay === d ? 'active' : ''}" onclick="selectScheduleDay('${d}')">${d}</button>
          `).join('')}
        </div>
      </div>

      <div class="schedule-table-wrapper">
        <table class="desktop-schedule-table">
          <thead>
            <tr>
              <th>الصف / الشعبة</th>
              ${state.periods.map(p => `<th>${p}</th>`).join('')}
            </tr>
          </thead>
          <tbody>
            ${state.grades.map(g => g.sections.map(sec => `
              <tr>
                <td class="section-label-cell">
                  <span class="grade-text">${g.name}</span>
                  <span class="sec-text">الشعبة ${sec.name}</span>
                </td>
                ${state.periods.map((p, pIdx) => `
                  <td class="period-slot-cell">
                    <div class="slot-cell-content ${pIdx % 2 === 0 ? 'has-subject' : ''}">
                      ${pIdx % 2 === 0 ? `
                        <p class="slot-sub-text">الرياضيات</p>
                        <span class="slot-teacher-text">أ. محمد علي</span>
                      ` : '<span class="slot-empty">-</span>'}
                    </div>
                  </td>
                `).join('')}
              </tr>
            `).join('')).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;

  return container;
}

/* ===== MODULE 7: HOMEWORK RENDER ===== */
function renderHomeworkModule() {
  const container = document.createElement('div');
  container.className = 'tab-pane-content';

  container.innerHTML = `
    <div class="desktop-card-box">
      <div class="card-box-header flex-between">
        <div>
          <h3 class="card-box-title flex-align-center">
            <svg class="title-svg-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4f46e5" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
            <span>سجل الواجبات والتكليفات المنزلية</span>
          </h3>
          <p class="card-box-sub">متابعة الواجبات المدرسية المرفوعة ومواعيد تسليمها</p>
        </div>
        <button class="desktop-primary-btn flex-align-center" onclick="openModal('addHomework')">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          <span>إضافة واجب جديد</span>
        </button>
      </div>

      <table class="desktop-table" style="margin-top: 20px;">
        <thead>
          <tr>
            <th>عنوان التكليف / الواجب</th>
            <th>المادة</th>
            <th>الصف والشعبة</th>
            <th>تاريخ التسليم</th>
            <th>الحالة</th>
          </tr>
        </thead>
        <tbody>
          ${state.homeworks.map(hw => `
            <tr>
              <td><strong>${hw.title}</strong></td>
              <td><span class="sec-pill-tag subject">${hw.subject_name}</span></td>
              <td>${hw.grade_name} - ${hw.section_name}</td>
              <td>${hw.due_date}</td>
              <td><span class="badge-status info">${hw.status}</span></td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
  `;

  return container;
}

/* ===== MODULE 8: EXAMS RENDER ===== */
function renderExamsModule() {
  const container = document.createElement('div');
  container.className = 'tab-pane-content';

  container.innerHTML = `
    <div class="desktop-card-box">
      <div class="card-box-header flex-between">
        <div>
          <h3 class="card-box-title flex-align-center">
            <svg class="title-svg-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4f46e5" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
            <span>جدول الامتحانات والتقييمات الفصلية</span>
          </h3>
          <p class="card-box-sub">عرض مواعيد وجداول الامتحانات الرسمية والمراقبة</p>
        </div>
        <button class="desktop-primary-btn flex-align-center" onclick="openModal('addExam')">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          <span>جدولة امتحان جديد</span>
        </button>
      </div>

      <table class="desktop-table" style="margin-top: 20px;">
        <thead>
          <tr>
            <th>عنوان الامتحان</th>
            <th>المادة</th>
            <th>الصف الدراسي</th>
            <th>تاريخ الامتحان</th>
            <th>القاعة</th>
            <th>الحالة</th>
          </tr>
        </thead>
        <tbody>
          ${state.exams.map(ex => `
            <tr>
              <td><strong>${ex.title}</strong></td>
              <td><span class="sec-pill-tag subject">${ex.subject_name}</span></td>
              <td>${ex.grade_name}</td>
              <td>${ex.exam_date}</td>
              <td><code>${ex.room}</code></td>
              <td><span class="badge-status warning">${ex.status}</span></td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
  `;

  return container;
}

/* ===== MODULE 9: REPORTS RENDER ===== */
function renderReportsModule() {
  const container = document.createElement('div');
  container.className = 'tab-pane-content';

  container.innerHTML = `
    <div class="desktop-card-box">
      <div class="card-box-header flex-between">
        <div>
          <h3 class="card-box-title">📊 التقارير الإدارية والإحصائية الشاملة</h3>
          <p class="card-box-sub">مركز استخراج التقارير وسجلات الحضور والنتائج الرسمية</p>
        </div>
      </div>
      <div style="padding: 40px; text-align: center; color: #64748b;">
        <p>جميع التقارير الإدارية والتحليلية جاهزة للطباعة والتصدير بصيغة PDF.</p>
      </div>
    </div>
  `;

  return container;
}

/* ===== MODULE 10: SETTINGS RENDER ===== */
function renderSettingsModule() {
  const container = document.createElement('div');
  container.className = 'tab-pane-content';

  container.innerHTML = `
    <div class="desktop-card-box">
      <div class="card-box-header flex-between">
        <div>
          <h3 class="card-box-title">⚙️ إعدادات المنظومة والمدرسة</h3>
          <p class="card-box-sub">تخصيص البيانات العامة للمدرسة والعام الدراسي الحالي</p>
        </div>
      </div>
      <div class="creation-form-body" style="margin-top: 20px; max-width: 600px;">
        <div class="form-group">
          <label class="form-label">اسم المدرسة الرسمي</label>
          <input type="text" class="form-input" value="مدرسة النور النموذجية التعليمية" />
        </div>
        <div class="form-group">
          <label class="form-label">العام الدراسي الحالي</label>
          <input type="text" class="form-input" value="2025 - 2026" />
        </div>
        <button class="desktop-primary-btn" style="width: auto; align-self: flex-start; margin-top: 10px;">حفظ الإعدادات</button>
      </div>
    </div>
  `;

  return container;
}

/* ===== MODULE 11: CREATION CENTER RENDER ===== */
function renderCreationModule() {
  const container = document.createElement('div');
  container.className = 'tab-pane-content';

  container.innerHTML = `
    <div class="desktop-card-box">
      <div class="card-box-header flex-between">
        <div>
          <h3 class="card-box-title">➕ مركز الإضافات وإدارة العمليات الموحد</h3>
          <p class="card-box-sub">صفحة مخصصة لإضافة وتدشين كافة مكونات المنظومة التعليمية</p>
        </div>
        <span class="tag-pill-primary">5 نماذج إضافة فورية</span>
      </div>

      <div class="creation-forms-grid">
        <!-- 1. إضافة صف دراسي -->
        <div class="creation-form-card">
          <div class="creation-card-header">
            <div class="creation-icon purple">🏫</div>
            <div>
              <h4 class="creation-card-title">تدشين صف دراسي جديد</h4>
              <p class="creation-card-desc">إنشاء صف دراسي جديد وتسجيل مستواه</p>
            </div>
          </div>
          <form onsubmit="handleCreateGradeForm(event)" class="creation-form-body">
            <div class="form-group">
              <label class="form-label">اسم الصف الدراسي</label>
              <input type="text" id="cGradeName" placeholder="مثال: الصف الأول" class="form-input" required />
            </div>
            <div class="form-group">
              <label class="form-label">المستوى الأكاديمي (1 - 12)</label>
              <input type="number" id="cGradeLevel" placeholder="1" class="form-input" required />
            </div>
            <button type="submit" class="creation-submit-btn">إضافة الصف الدراسي</button>
          </form>
        </div>

        <!-- 2. إضافة معلم جديد -->
        <div class="creation-form-card">
          <div class="creation-card-header">
            <div class="creation-icon emerald">👨‍🏫</div>
            <div>
              <h4 class="creation-card-title">إضافة معلم جديد للمنظومة</h4>
              <p class="creation-card-desc">تسجيل بيانات معلم وتخصصه</p>
            </div>
          </div>
          <form onsubmit="handleCreateTeacherForm(event)" class="creation-form-body">
            <div class="form-group">
              <label class="form-label">الاسم الكامل للمعلم</label>
              <input type="text" id="cTeacherName" placeholder="مثال: أ. أحمد علي" class="form-input" required />
            </div>
            <div class="form-group">
              <label class="form-label">التخصص الرئيسي</label>
              <input type="text" id="cTeacherSpec" placeholder="مثال: الرياضيات" class="form-input" required />
            </div>
            <button type="submit" class="creation-submit-btn">تسجيل المعلم</button>
          </form>
        </div>
      </div>
    </div>
  `;

  return container;
}

/* ===== DETAIL VIEWS ===== */
function viewGradeDetail(gradeId) {
  const g = state.grades.find(item => item.id === gradeId);
  if (g) {
    state.selectedGrade = g;
    renderCurrentModule();
  }
}

function renderGradeDetailView() {
  const container = document.createElement('div');
  container.className = 'tab-pane-content';
  const g = state.selectedGrade;

  container.innerHTML = `
    <div class="grade-detail-container">
      <div class="profile-header-flex">
        <div>
          <button class="desktop-secondary-btn" onclick="backToClassrooms()" style="margin-bottom: 12px;">← العودة لجدول الفصول</button>
          <h2 class="saas-page-title">${g.name} (المستوى ${g.level})</h2>
          <p class="saas-page-sub">ملف التفاصيل الإحصائية والأكاديمية للصف</p>
        </div>
      </div>

      <div class="profile-info-grid">
        <div class="info-card-box">
          <h4 class="info-card-title">الشعب والصفوف التابعة</h4>
          <div class="info-details-list">
            ${g.sections.map(sec => `
              <div class="info-row-item">
                <span class="info-lbl">الشعبة ${sec.name}</span>
                <span class="info-val">${sec.room}</span>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    </div>
  `;

  return container;
}

function backToClassrooms() {
  state.selectedGrade = null;
  renderCurrentModule();
}

function viewStudentProfile(studentId) {
  const st = state.students.find(s => s.id === studentId);
  if (st) {
    state.selectedStudent = st;
    renderCurrentModule();
  }
}

function renderStudentProfileView() {
  const container = document.createElement('div');
  container.className = 'tab-pane-content';
  const st = state.selectedStudent;

  container.innerHTML = `
    <div class="student-profile-container">
      <button class="desktop-secondary-btn" onclick="backToStudents()" style="margin-bottom: 16px;">← العودة لسجل الطلاب</button>
      <div class="profile-header-flex">
        <div>
          <h2 class="saas-page-title">${st.full_name}</h2>
          <p class="saas-page-sub">كود الطالب: <code>${st.student_code}</code> | رقم القيد: <strong>${st.roll_number}</strong></p>
        </div>
        <div class="flex-actions-gap">
          <button class="desktop-secondary-btn" onclick="openTransferModalFor(${st.id})">نقل الطالب</button>
          <button class="desktop-secondary-btn" onclick="openEditStudentModalFor(${st.id})">تعديل البيانات</button>
        </div>
      </div>

      <div class="profile-info-grid">
        <div class="info-card-box">
          <h4 class="info-card-title">البيانات الأكاديمية</h4>
          <div class="info-details-list">
            <div class="info-row-item"><span class="info-lbl">الصف الدراسي:</span><span class="info-val">${st.grade_name}</span></div>
            <div class="info-row-item"><span class="info-lbl">الشعبة الدراسية:</span><span class="info-val">${st.section_name}</span></div>
          </div>
        </div>
        <div class="info-card-box">
          <h4 class="info-card-title">بيانات ولي الأمر والتواصل</h4>
          <div class="info-details-list">
            <div class="info-row-item"><span class="info-lbl">اسم ولي الأمر:</span><span class="info-val">${st.guardian_name}</span></div>
            <div class="info-row-item"><span class="info-lbl">هاتف ولي الأمر:</span><span class="info-val">${st.guardian_phone}</span></div>
            <div class="info-row-item"><span class="info-lbl">العنوان:</span><span class="info-val">${st.address}</span></div>
          </div>
        </div>
      </div>
    </div>
  `;

  return container;
}

function backToStudents() {
  state.selectedStudent = null;
  renderCurrentModule();
}

function viewTeacherProfile(teacherId) {
  const tch = state.teachers.find(t => t.id === teacherId);
  if (tch) {
    state.selectedTeacher = tch;
    renderCurrentModule();
  }
}

function renderTeacherProfileView() {
  const container = document.createElement('div');
  container.className = 'tab-pane-content';
  const tch = state.selectedTeacher;

  container.innerHTML = `
    <div class="teacher-profile-container">
      <button class="desktop-secondary-btn" onclick="backToTeachers()" style="margin-bottom: 16px;">← العودة لكادر المعلمين</button>
      <div class="profile-header-flex">
        <div>
          <h2 class="saas-page-title">${tch.teacher_name}</h2>
          <p class="saas-page-sub">كود المعلم: <code>${tch.teacher_code}</code></p>
        </div>
      </div>

      <div class="profile-info-grid">
        <div class="info-card-box">
          <h4 class="info-card-title">البيانات الوظيفية والتخصص</h4>
          <div class="info-details-list">
            <div class="info-row-item"><span class="info-lbl">التخصص:</span><span class="info-val">${tch.specialization}</span></div>
            <div class="info-row-item"><span class="info-lbl">المادة الرئيسية:</span><span class="info-val">${tch.subjects}</span></div>
            <div class="info-row-item"><span class="info-lbl">رقم الهاتف:</span><span class="info-val">${tch.phone}</span></div>
          </div>
        </div>
      </div>
    </div>
  `;

  return container;
}

function backToTeachers() {
  state.selectedTeacher = null;
  renderCurrentModule();
}

/* ===== FILTER HANDLERS ===== */
function handleStudentSearch(val) {
  state.studentSearch = val;
  renderCurrentModule();
}

function handleStudentGradeFilter(val) {
  state.studentGradeFilter = val;
  renderCurrentModule();
}

function selectScheduleDay(day) {
  state.selectedDay = day;
  renderCurrentModule();
}

/* ===== ACTION HANDLERS (ADD/EDIT/TRANSFER/DELETE) ===== */
function handleAddStudentForm(e) {
  e.preventDefault();
  const name = document.getElementById('newStudentName').value;
  const roll = document.getElementById('newStudentRoll').value;
  const grade = document.getElementById('newStudentGrade').value;
  const section = document.getElementById('newStudentSection').value;

  if (!name || !roll) return;

  const newId = Date.now();
  state.students.push({
    id: newId,
    roll_number: roll,
    student_code: `STD-2026-0${state.students.length + 1}`,
    full_name: name,
    grade_name: grade || 'الصف الخامس',
    section_name: section || 'الشعبة أ',
    guardian_name: 'غير محدد',
    guardian_phone: '0500000000',
    address: 'طرابلس'
  });

  closeModal('addStudent');
  renderCurrentModule();
}

function openEditStudentModalFor(id) {
  const st = state.students.find(s => s.id === id);
  if (st) {
    state.editingStudent = st;
    document.getElementById('editStudentName').value = st.full_name;
    document.getElementById('editStudentRoll').value = st.roll_number;
    openModal('editStudent');
  }
}

function handleEditStudentForm(e) {
  e.preventDefault();
  if (!state.editingStudent) return;

  state.editingStudent.full_name = document.getElementById('editStudentName').value;
  state.editingStudent.roll_number = document.getElementById('editStudentRoll').value;

  closeModal('editStudent');
  renderCurrentModule();
}

function openTransferModalFor(id) {
  const st = state.students.find(s => s.id === id);
  if (st) {
    state.transferringStudent = st;
    openModal('transferStudent');
  }
}

function handleTransferStudentForm(e) {
  e.preventDefault();
  if (!state.transferringStudent) return;

  const newGrade = document.getElementById('transferGradeSelect').value;
  const newSection = document.getElementById('transferSectionSelect').value;

  if (newGrade) state.transferringStudent.grade_name = newGrade;
  if (newSection) state.transferringStudent.section_name = newSection;

  closeModal('transferStudent');
  renderCurrentModule();
}

function deleteStudent(id) {
  if (confirm('هل أنت تأكد من ترقين قيد/حذف هذا الطالب من المنظومة؟')) {
    state.students = state.students.filter(s => s.id !== id);
    renderCurrentModule();
  }
}

function handleAddTeacherForm(e) {
  e.preventDefault();
  const name = document.getElementById('newTeacherName').value;
  const spec = document.getElementById('newTeacherSpec').value;

  if (!name) return;

  state.teachers.push({
    id: Date.now(),
    teacher_name: name,
    teacher_code: `TCH-00${state.teachers.length + 1}`,
    phone: '0910000000',
    specialization: spec || 'عام',
    subjects: spec || 'عام',
    status: 'نشط'
  });

  closeModal('addTeacher');
  renderCurrentModule();
}

function handleAddSubjectForm(e) {
  e.preventDefault();
  const name = document.getElementById('newSubjectName').value;
  const code = document.getElementById('newSubjectCode').value;

  if (!name) return;

  state.subjects.push({
    id: Date.now(),
    code: code || 'SUB-101',
    name: name,
    grade_name: 'الصف الخامس',
    teacher_name: 'أ. محمد علي'
  });

  closeModal('addSubject');
  renderCurrentModule();
}
