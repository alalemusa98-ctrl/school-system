<template>
  <div class="desktop-admin-root">
    <!-- SaaS Executive Top Header -->
    <header class="saas-executive-header">
      <!-- Right: Brand Logo & Title -->
      <div class="header-brand-group">
        <div class="brand-sq-icon">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5"/></svg>
        </div>
        <div class="brand-title-box">
          <h1 class="brand-main-title">منظومة إدارة المدرسة</h1>
          <span class="brand-sub-title">لوحة التحكم الإدارية الشاملة</span>
        </div>
      </div>

      <!-- Center: Soft Search Input Bar -->
      <div class="header-center-search">
        <svg class="search-glass-svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#64748b" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
        <input type="text" placeholder="بحث سريع عن طالب، معلم، أو مادة..." class="saas-search-input" />
      </div>

      <!-- Left: Notifications Bell & User Profile Pill -->
      <div class="header-left-actions">
        <button class="notif-bell-btn" title="التنبيهات">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#475569" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
          <span class="notif-dot-badge">3</span>
        </button>

        <!-- User Profile Pill with macOS Style Floating Dropdown -->
        <div class="user-profile-dropdown-container">
          <button type="button" class="user-profile-pill" @click.stop="toggleProfileDropdown">
            <div class="user-avatar-circle">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#4f46e5" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            </div>
            <div class="user-info-meta">
              <span class="user-display-name">مدير المنظومة</span>
              <span class="user-display-role">المدير العام</span>
            </div>
            <svg class="dropdown-caret-icon" :class="{ open: showProfileDropdown }" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9l6 6 6-6"/></svg>
          </button>

          <!-- Transparent Click-Outside Overlay -->
          <div v-if="showProfileDropdown" class="profile-dropdown-backdrop" @click="showProfileDropdown = false"></div>

          <!-- macOS / Apple Style Floating Menu Dropdown -->
          <transition name="mac-dropdown">
            <div v-if="showProfileDropdown" class="mac-dropdown-menu" @click.stop>
              <!-- Menu Header / User Summary -->
              <div class="mac-dropdown-header">
                <div class="mac-header-avatar">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#4f46e5" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                </div>
                <div class="mac-header-info">
                  <span class="mac-user-name">مدير المنظومة</span>
                  <span class="mac-user-email">admin@school.edu.sa</span>
                </div>
              </div>

              <div class="mac-dropdown-divider"></div>

              <!-- Menu Items Group 1 -->
              <div class="mac-dropdown-group">
                <button type="button" class="mac-dropdown-item" @click="activeModule = 'analytics'; showProfileDropdown = false">
                  <div class="item-left">
                    <svg class="item-svg-icon" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>
                    <span>اللوحة التفاعلية</span>
                  </div>
                  <span class="item-shortcut">⌘1</span>
                </button>

                <button type="button" class="mac-dropdown-item" @click="activeModule = 'classrooms'; showProfileDropdown = false">
                  <div class="item-left">
                    <svg class="item-svg-icon" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5"/></svg>
                    <span>الفصول والقاعات</span>
                  </div>
                  <span class="item-shortcut">⌘2</span>
                </button>

                <button type="button" class="mac-dropdown-item" @click="activeModule = 'schedule'; showProfileDropdown = false">
                  <div class="item-left">
                    <svg class="item-svg-icon" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                    <span>الجدول الدراسي</span>
                  </div>
                  <span class="item-shortcut">⌘3</span>
                </button>
              </div>

              <div class="mac-dropdown-divider"></div>

              <!-- Menu Items Group 2 -->
              <div class="mac-dropdown-group">
                <button type="button" class="mac-dropdown-item" @click="fetchInitialData(); showProfileDropdown = false">
                  <div class="item-left">
                    <svg class="item-svg-icon" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/></svg>
                    <span>تحديث البيانات الحية</span>
                  </div>
                  <span class="item-shortcut">⌘R</span>
                </button>
              </div>

              <div class="mac-dropdown-divider"></div>

              <!-- Menu Items Group 3: Danger/Logout -->
              <div class="mac-dropdown-group">
                <button type="button" class="mac-dropdown-item danger" @click="handleLogout">
                  <div class="item-left">
                    <svg class="item-svg-icon" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
                    <span>تسجيل الخروج</span>
                  </div>
                  <span class="item-shortcut">⌥⌘Q</span>
                </button>
              </div>
            </div>
          </transition>
        </div>

        <!-- Quick Logout Action Button in Header -->
        <button type="button" class="quick-logout-btn" @click="handleLogout" title="تسجيل الخروج السريع">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#e11d48" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
        </button>
      </div>
    </header>

    <!-- SaaS Minimal Horizontal Navigation Bar -->
    <nav class="saas-horizontal-navbar">
      <div class="nav-links-wrapper">
        <button 
          class="saas-nav-link" 
          :class="{ active: activeModule === 'analytics' }"
          @click="activeModule = 'analytics'"
        >
          <svg class="nav-svg-icon" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
          <span>الرئيسية</span>
        </button>

        <button 
          class="saas-nav-link" 
          :class="{ active: activeModule === 'students' || activeModule === 'student-details' }"
          @click="activeModule = 'students'"
        >
          <svg class="nav-svg-icon" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
          <span>الطلاب</span>
        </button>

        <button 
          class="saas-nav-link" 
          :class="{ active: activeModule === 'teachers' || activeModule === 'teacher-details' }"
          @click="activeModule = 'teachers'"
        >
          <svg class="nav-svg-icon" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
          <span>المعلمون</span>
        </button>

        <button 
          class="saas-nav-link" 
          :class="{ active: activeModule === 'classrooms' || activeModule === 'structure' || activeModule === 'section-details' || activeModule === 'grade-details' }"
          @click="activeModule = 'classrooms'"
        >
          <svg class="nav-svg-icon" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5"/></svg>
          <span>الفصول</span>
        </button>

        <button 
          class="saas-nav-link" 
          @click="activeModule = 'classrooms'"
        >
          <svg class="nav-svg-icon" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
          <span>المواد الدراسية</span>
        </button>

        <button 
          class="saas-nav-link" 
          :class="{ active: activeModule === 'schedule' }"
          @click="activeModule = 'schedule'"
        >
          <svg class="nav-svg-icon" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
          <span>الجدول الدراسي</span>
        </button>

        <button class="saas-nav-link" @click="activeModule = 'analytics'">
          <svg class="nav-svg-icon" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
          <span>الواجبات</span>
        </button>

        <button class="saas-nav-link" @click="activeModule = 'analytics'">
          <svg class="nav-svg-icon" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
          <span>الامتحانات</span>
        </button>

        <button class="saas-nav-link" @click="activeModule = 'analytics'">
          <svg class="nav-svg-icon" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>
          <span>التقارير</span>
        </button>

        <button 
          class="saas-nav-link" 
          :class="{ active: activeModule === 'creation' }"
          @click="activeModule = 'creation'"
        >
          <svg class="nav-svg-icon" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
          <span>الإعدادات</span>
        </button>
      </div>
    </nav>

    <!-- Desktop Main Layout Container -->
    <main class="desktop-main-wrapper">
      <div v-if="loading" class="desktop-loading-box">
        ⚡ جاري الاتصال بقاعدة البيانات واسترجاع السجلات الحية...
      </div>

      <template v-else>
        <!-- 1. Top KPI Summary Cards Row (EXACT 3D CARDS LAYOUT MATCHING IMAGE 2) -->
        <section v-if="activeModule !== 'analytics'" class="analytics-cards-grid-3d">
          
          <!-- Card 1: Total Enrolled Students -->
          <div class="card-3d-box student-theme">
            <div class="card-3d-header flex-between">
              <h4 class="card-3d-title">إجمالي الطلاب المسجلين</h4>
              <div class="card-3d-icon-pill emerald">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5"/></svg>
              </div>
            </div>
            <div class="card-3d-body flex-between">
              <div class="card-3d-img-container">
                <img :src="studentImg" alt="طلاب" class="card-3d-render-img" />
                <div class="card-3d-shadow-ellipse"></div>
              </div>
              <div class="card-3d-stats">
                <div class="card-3d-num">{{ stats.totalStudents || 0 }}</div>
                <div class="card-3d-unit">طالب مسجل</div>
              </div>
            </div>
            <div class="card-3d-progress-track">
              <div class="card-3d-progress-fill emerald-gradient" style="width: 96%;"></div>
            </div>
            <div class="card-3d-footer flex-between">
              <span class="badge-status-dot green"><span class="dot green"></span> 96% حضور اليوم</span>
              <span class="footer-muted-text">المسجلين: {{ stats.totalStudents || 0 }}</span>
            </div>
          </div>

          <!-- Card 2: Teaching Staff -->
          <div class="card-3d-box teacher-theme">
            <div class="card-3d-header flex-between">
              <h4 class="card-3d-title">كادر التدريس والمعلمين</h4>
              <div class="card-3d-icon-pill emerald">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
              </div>
            </div>
            <div class="card-3d-body flex-between">
              <div class="card-3d-img-container">
                <img :src="teacherImg" alt="معلمون" class="card-3d-render-img" />
                <div class="card-3d-shadow-ellipse"></div>
              </div>
              <div class="card-3d-stats">
                <div class="card-3d-num">{{ stats.totalTeachers || 0 }}</div>
                <div class="card-3d-unit">معلم متواجد</div>
              </div>
            </div>
            <div class="card-3d-progress-track">
              <div class="card-3d-progress-fill emerald-gradient" style="width: 100%;"></div>
            </div>
            <div class="card-3d-footer flex-between">
              <span class="badge-status-dot green"><span class="dot green"></span> التكليفات مكتملة</span>
              <span class="footer-muted-text">الكادر: {{ stats.totalTeachers || 0 }}</span>
            </div>
          </div>

          <!-- Card 3: Classrooms & Sections -->
          <div class="card-3d-box homework-theme">
            <div class="card-3d-header flex-between">
              <h4 class="card-3d-title">الشعب والقاعات الدراسية</h4>
              <div class="card-3d-icon-pill purple">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
              </div>
            </div>
            <div class="card-3d-body flex-between">
              <div class="card-3d-img-container">
                <img :src="schoolImg" alt="قاعات" class="card-3d-render-img" />
                <div class="card-3d-shadow-ellipse purple-shadow"></div>
              </div>
              <div class="card-3d-stats">
                <div class="card-3d-num">{{ stats.totalSections || 0 }}</div>
                <div class="card-3d-unit">شعبة دراسية</div>
              </div>
            </div>
            <div class="card-3d-progress-track">
              <div class="card-3d-progress-fill purple-gradient" style="width: 85%;"></div>
            </div>
            <div class="card-3d-footer flex-between">
              <span class="badge-status-purple-pill">المراحل 1 - 9</span>
              <span class="footer-muted-text">إجمالي: {{ stats.totalSections || 0 }}</span>
            </div>
          </div>

          <!-- Card 4: Active Tasks & Exams -->
          <div class="card-3d-box exam-theme">
            <div class="card-3d-header flex-between">
              <h4 class="card-3d-title">المهام والامتحانات النشطة</h4>
              <div class="card-3d-icon-pill amber">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
              </div>
            </div>
            <div class="card-3d-body flex-between">
              <div class="card-3d-img-container">
                <img :src="examImg" alt="مهام" class="card-3d-render-img" />
                <div class="card-3d-shadow-ellipse amber-shadow"></div>
              </div>
              <div class="card-3d-stats">
                <div class="card-3d-num">{{ stats.totalTasks || 0 }}</div>
                <div class="card-3d-unit">مهمة هذا الأسبوع</div>
              </div>
            </div>
            <div class="card-3d-progress-track">
              <div class="card-3d-progress-fill amber-gradient" style="width: 75%;"></div>
            </div>
            <div class="card-3d-footer flex-between">
              <span class="footer-muted-text">هذا الأسبوع</span>
              <span class="footer-clock-pill">📝 {{ stats.totalTasks || 0 }} مادة</span>
            </div>
          </div>

        </section>

        <!-- 2. Two-Column Desktop Grid Architecture (2fr | 1fr) -->
        <div class="desktop-content-grid" :class="{ 'full-width-analytics': activeModule === 'analytics' }">
          <!-- LEFT MAIN CONTENT AREA (2fr) -->
          <div class="desktop-content-left">

            <!-- MODULE 1: الفصول الدراسية (Classrooms) -->
            <div v-if="activeModule === 'classrooms' || activeModule === 'structure'" class="tab-pane-content">
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
                    <button class="desktop-secondary-btn flex-align-center" @click="showAddSubjectModal = true">
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
                      <span>إضافة مادة</span>
                    </button>
                    <button class="desktop-secondary-btn flex-align-center" @click="showAddSectionModal = true">
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 21h18"/><path d="M5 21V7l8-4v18"/><path d="M19 21V11l-6-3"/></svg>
                      <span>إضافة شعبة</span>
                    </button>
                    <button class="desktop-primary-btn flex-align-center" @click="activeModule = 'creation'">
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
                    <tr v-for="g in grades" :key="g.id">
                      <!-- 1. الصف الدراسي -->
                      <td class="grade-name-cell clickable-student-row" @click="openGradeDetail(g)" title="اضغط لعرض كافة بيانات وإحصائيات هذا الصف الدراسي">
                        <div class="grade-badge-flex flex-align-center">
                          <span class="grade-level-pill">{{ g.level }}</span>
                          <strong class="grade-title-text clickable-name flex-align-center" style="gap: 6px;">
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#4f46e5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5"/></svg>
                            <span>{{ g.name }}</span>
                          </strong>
                        </div>
                      </td>

                      <!-- 2. الشعب الدراسية -->
                      <td>
                        <div class="table-items-flex">
                          <span 
                            v-for="sec in g.sections" 
                            :key="sec.id" 
                            class="sec-pill-tag clickable-sec-pill flex-align-center"
                            style="gap: 4px;"
                            @click="openSectionDetailModal(sec, g)"
                            title="اضغط لعرض جدول وتفاصيل الشعبة"
                          >
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 21h18"/><path d="M5 21V7l8-4v18"/><path d="M19 21V11l-6-3"/></svg>
                            <span>الشعبة {{ sec.name }}</span>
                          </span>
                          <span v-if="!g.sections || g.sections.length === 0" class="empty-pill-muted">لا توجد شعب منشأة</span>
                        </div>
                      </td>
                    </tr>
                    <tr v-if="grades.length === 0">
                      <td colspan="2" class="empty-table-msg">لا توجد صفوف دراسية منشأة حالياً.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <!-- MODULE 8: GRADE DETAILS FULL PAGE VIEW -->
            <div v-else-if="activeModule === 'grade-details' && selectedGrade" class="tab-pane-content">
              <div class="desktop-card-box student-profile-card">
                <!-- Top Header with Back Button -->
                <div class="card-box-header flex-between">
                  <div class="flex-actions-gap">
                    <button class="back-to-structure-btn" @click="activeModule = 'classrooms'">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
                      <span>العودة لصفحة الفصول الدراسية</span>
                    </button>
                    <div class="sec-title-meta">
                      <h3 class="card-box-title">🏫 بيانات وتفاصيل: {{ selectedGrade.name }}</h3>
                      <span class="card-box-sub">المستوى الدراسي: {{ selectedGrade.level }} • إجمالي {{ gradeSections.length }} شعب • {{ gradeSubjects.length }} مواد • {{ gradeStudents.length }} طلاب</span>
                    </div>
                  </div>

                  <div class="flex-actions-gap">
                    <button class="desktop-secondary-btn" @click="openAddSubjectModal(selectedGrade)">
                      📖 إضافة مادة
                    </button>
                    <button class="desktop-primary-btn" @click="openAddSectionModal(selectedGrade)">
                      🏢 إضافة شعبة
                    </button>
                  </div>
                </div>

                <!-- Hero Banner -->
                <div class="student-profile-body">
                  <div class="profile-hero-banner">
                    <div class="profile-avatar-big">🏫</div>
                    <div class="profile-hero-info">
                      <h2 class="profile-student-name">{{ selectedGrade.name }}</h2>
                      <div class="profile-badges-row">
                        <span class="profile-badge purple">المستوى {{ selectedGrade.level }}</span>
                        <span class="profile-badge indigo">🏢 {{ gradeSections.length }} شعب دراسية</span>
                        <span class="profile-badge emerald">📖 {{ gradeSubjects.length }} مواد مقررة</span>
                        <span class="profile-badge neutral">🎓 {{ gradeStudents.length }} طالب مقيد</span>
                      </div>
                    </div>
                  </div>

                  <div class="profile-info-grid" style="grid-template-columns: 1fr 1fr; gap: 20px;">
                    <!-- Card 1: Sections & Classes -->
                    <div class="info-card-box">
                      <h4 class="info-card-title flex-between">
                        <span>🏢 الشعب والقاعات الدراسية المنشأة</span>
                        <button class="desktop-secondary-btn small-btn" @click="openAddSectionModal(selectedGrade)">+ إضافة شعبة</button>
                      </h4>
                      <div class="table-items-flex" style="padding: 10px 0;">
                        <span 
                          v-for="sec in gradeSections" 
                          :key="sec.id" 
                          class="sec-pill-tag clickable-sec-pill"
                          @click="openSectionDetailModal(sec, selectedGrade)"
                          title="اضغط لعرض جدول وتفاصيل الشعبة"
                          style="padding: 8px 14px; font-size: 13px;"
                        >
                          🏫 الشعبة {{ sec.name }}
                        </span>
                        <span v-if="gradeSections.length === 0" class="empty-pill-muted">لا توجد شعب منشأة لـ {{ selectedGrade.name }}</span>
                      </div>
                    </div>

                    <!-- Card 2: Subjects -->
                    <div class="info-card-box">
                      <h4 class="info-card-title flex-between">
                        <span>📖 المواد الدراسية المقررة</span>
                        <button class="desktop-secondary-btn small-btn" @click="openAddSubjectModal(selectedGrade)">+ إضافة مادة</button>
                      </h4>
                      <div class="info-details-list">
                        <table class="desktop-table" v-if="gradeSubjects.length > 0">
                          <thead>
                            <tr>
                              <th>اسم المادة</th>
                              <th>إجراءات</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr v-for="sub in gradeSubjects" :key="sub.id">
                              <td><strong class="clickable-name">📖 {{ sub.name }}</strong></td>
                              <td>
                                <button class="table-btn-danger" @click="handleDeleteSubject(sub.id)">حذف المادة</button>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                        <div v-else class="empty-table-msg" style="padding: 12px 0;">
                          لا توجد مواد دراسية مضافة لهذا الصف بعد.
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- Enrolled Students Table -->
                  <div class="info-card-box" style="margin-top: 20px;">
                    <h4 class="info-card-title flex-between">
                      <span>🎓 سجل الطلاب المقيدين بـ {{ selectedGrade.name }} (إجمالي {{ gradeStudents.length }})</span>
                      <button class="desktop-primary-btn small-btn" @click="showAddStudentModal = true">+ إضافة طالب</button>
                    </h4>
                    <table class="desktop-table">
                      <thead>
                        <tr>
                          <th>رقم الجلوس</th>
                          <th>كود الطالب</th>
                          <th>اسم الطالب</th>
                          <th>الشعبة</th>
                          <th>إجراءات</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr 
                          v-for="st in gradeStudents" 
                          :key="st.id"
                          class="clickable-student-row"
                          @click="openStudentDetail(st)"
                        >
                          <td><strong>{{ st.roll_number }}</strong></td>
                          <td><code>{{ st.student_code }}</code></td>
                          <td><span class="clickable-name">🎓 {{ st.full_name }}</span></td>
                          <td><span class="sec-pill-tag section">{{ st.section_name }}</span></td>
                          <td @click.stop>
                            <div class="table-actions-inline">
                              <button class="table-btn-secondary" @click="openTransferStudentModal(st)">🔄 نقل</button>
                              <button class="table-btn-secondary" @click="openEditStudentModal(st)">✏️ تعديل</button>
                              <button class="table-btn-danger" @click="handleDeleteStudent(st.id)">حذف</button>
                            </div>
                          </td>
                        </tr>
                        <tr v-if="gradeStudents.length === 0">
                          <td colspan="5" class="empty-table-msg">لا يوجد طلاب مقيدون بـ {{ selectedGrade.name }} حالياً.</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                </div>
              </div>
            </div>

            <!-- MODULE 2: الطالب (Student Management) -->
            <div v-else-if="activeModule === 'students'" class="tab-pane-content">
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
                    <button class="desktop-secondary-btn flex-align-center" @click="openTransferStudentModal(null)">
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 1l4 4-4 4"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/><path d="M7 23l-4-4 4-4"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/></svg>
                      <span>نقل طالب</span>
                    </button>
                    <button class="desktop-primary-btn flex-align-center" @click="showAddStudentModal = true">
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                      <span>إضافة طالب جديد</span>
                    </button>
                  </div>
                </div>

                <div class="students-filter-row" style="display: flex; gap: 12px; margin-bottom: 16px; align-items: center;">
                  <div class="search-box-flex search-input-container" style="flex: 1; position: relative;">
                    <svg class="input-search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#64748b" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" style="position: absolute; right: 14px; top: 50%; transform: translateY(-50%); pointer-events: none;"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                    <input 
                      type="text" 
                      v-model="studentSearchQuery" 
                      placeholder="بحث باسم الطالب، كود الطالب، أو رقم الجلوس..." 
                      class="form-input"
                      style="padding-right: 38px;"
                    />
                  </div>
                  <CustomSelect 
                    v-model="studentGradeFilter" 
                    :options="gradeOptions" 
                    placeholder="جميع الصفوف" 
                    width="190px" 
                  />
                  <CustomSelect 
                    v-model="studentSectionFilter" 
                    :options="studentSectionOptions" 
                    placeholder="جميع الشعب" 
                    width="220px" 
                  />
                </div>

                <table class="desktop-table">
                  <thead>
                    <tr>
                      <th>رقم الجلوس</th>
                      <th>كود الطالب</th>
                      <th>الاسم الكامل للطالب</th>
                      <th>الصف الدراسي</th>
                      <th>الشعبة</th>
                      <th>إجراءات الإدارة</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr 
                      v-for="st in filteredStudents" 
                      :key="st.id"
                      class="clickable-student-row"
                      @click="openStudentDetail(st)"
                      title="اضغط لعرض الملف الشخصي الكامل للطالب"
                    >
                      <td><strong>{{ st.roll_number }}</strong></td>
                      <td><code>{{ st.student_code }}</code></td>
                      <td class="student-name-cell flex-align-gap">
                        <span class="clickable-name flex-align-center" style="gap: 6px;">
                          <svg class="student-row-icon" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#4f46e5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5"/></svg>
                          <span>{{ st.full_name }}</span>
                        </span>
                      </td>
                      <td><span class="sec-pill-tag grade">{{ st.grade_name }}</span></td>
                      <td><span class="sec-pill-tag section">{{ st.section_name }}</span></td>
                      <td @click.stop>
                        <div class="table-actions-inline">
                          <button class="table-btn-icon secondary" @click="openTransferStudentModal(st)" title="نقل الطالب لصف/شعبة أخرى" aria-label="نقل الطالب">
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 1l4 4-4 4"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/><path d="M7 23l-4-4 4-4"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/></svg>
                          </button>
                          <button class="table-btn-icon secondary" @click="openEditStudentModal(st)" title="تعديل بيانات الطالب" aria-label="تعديل الطالب">
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                          </button>
                          <button class="table-btn-icon danger" @click="handleDeleteStudent(st.id)" title="حذف الطالب" aria-label="حذف الطالب">
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                    <tr v-if="filteredStudents.length === 0">
                      <td colspan="6" class="empty-table-msg">لا يوجد طلاب مطابقين لمعايير البحث حالياً.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <!-- MODULE 6: STUDENT DETAILS FULL PAGE VIEW -->
            <div v-else-if="activeModule === 'student-details' && selectedStudent" class="tab-pane-content">
              <div class="desktop-card-box student-profile-card">
                <!-- Top Header with Back Button -->
                <div class="card-box-header flex-between">
                  <div class="flex-actions-gap">
                    <button class="back-to-structure-btn" @click="activeModule = 'students'">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
                      <span>العودة لقائمة الطلاب</span>
                    </button>
                    <div class="sec-title-meta">
                      <h3 class="card-box-title">🎓 الملف الشخصي للطالب: {{ selectedStudent.full_name }}</h3>
                      <span class="card-box-sub">كود الطالب: {{ selectedStudent.student_code }} • رقم الجلوس: {{ selectedStudent.roll_number }}</span>
                    </div>
                  </div>

                  <div class="flex-actions-gap">
                    <button class="desktop-secondary-btn" @click="openTransferStudentModal(selectedStudent)">
                      🔄 نقل الطالب
                    </button>
                    <button class="desktop-secondary-btn" @click="openEditStudentModal(selectedStudent)">
                      ✏️ تعديل البيانات
                    </button>
                    <button class="desktop-primary-btn" @click="handleDeleteStudent(selectedStudent.id)">
                      🗑️ حذف الطالب
                    </button>
                  </div>
                </div>

                <!-- Student Profile Details Grid -->
                <div class="student-profile-body">
                  <div class="profile-hero-banner">
                    <div class="profile-avatar-big">🎓</div>
                    <div class="profile-hero-info">
                      <h2 class="profile-student-name">{{ selectedStudent.full_name }}</h2>
                      <div class="profile-badges-row">
                        <span class="profile-badge purple">🏫 {{ selectedStudent.grade_name }}</span>
                        <span class="profile-badge indigo">🏢 الشعبة {{ selectedStudent.section_name }}</span>
                        <span class="profile-badge emerald">🟢 حالة قيد نشطة</span>
                      </div>
                    </div>
                  </div>

                  <div class="profile-info-grid">
                    <div class="info-card-box">
                      <h4 class="info-card-title">📌 البيانات الأكاديمية والتعريفية</h4>
                      <div class="info-details-list">
                        <div class="info-row-item">
                          <span class="info-lbl">الاسم الكامل:</span>
                          <span class="info-val"><strong>{{ selectedStudent.full_name }}</strong></span>
                        </div>
                        <div class="info-row-item">
                          <span class="info-lbl">كود الطالب المميز:</span>
                          <span class="info-val"><code>{{ selectedStudent.student_code }}</code></span>
                        </div>
                        <div class="info-row-item">
                          <span class="info-lbl">رقم الجلوس:</span>
                          <span class="info-val"><strong>{{ selectedStudent.roll_number }}</strong></span>
                        </div>
                        <div class="info-row-item">
                          <span class="info-lbl">الصف الدراسي الحالي:</span>
                          <span class="info-val">{{ selectedStudent.grade_name }}</span>
                        </div>
                        <div class="info-row-item">
                          <span class="info-lbl">الشعبة / القاعة:</span>
                          <span class="info-val">الشعبة {{ selectedStudent.section_name }}</span>
                        </div>
                      </div>
                    </div>

                    <div class="info-card-box">
                      <h4 class="info-card-title">📊 السجل الأكاديمي والتحصيل</h4>
                      <div class="info-details-list">
                        <div class="info-row-item">
                          <span class="info-lbl">نسبة الحضور والتواجد:</span>
                          <span class="info-val success">98% (منتظم)</span>
                        </div>
                        <div class="info-row-item">
                          <span class="info-lbl">معدل التقييمات الشهرية:</span>
                          <span class="info-val info">ممتاز (A)</span>
                        </div>
                        <div class="info-row-item">
                          <span class="info-lbl">المهام والواجبات المنجزة:</span>
                          <span class="info-val">12 واجب ممتثل</span>
                        </div>
                        <div class="info-row-item">
                          <span class="info-lbl">حالة الرسوم والحساب:</span>
                          <span class="info-val success">مسدد بالكامل 🟢</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            <!-- MODULE 3: المعلم (Teacher Management) -->
            <div v-else-if="activeModule === 'teachers'" class="tab-pane-content">
              <div class="desktop-card-box">
                <div class="card-box-header flex-between">
                  <div>
                    <h3 class="card-box-title">👨‍🏫 إدارة المعلمين والتكليفات المدرسية</h3>
                    <p class="card-box-sub">انقر على أي معلم لمشاهدة ملخص التكليفات الأكاديمية أو إدراج معلم وتكليفات جديدة</p>
                  </div>
                  <div class="flex-actions-gap">
                    <button class="desktop-secondary-btn" @click="showAddAssignModal = true">
                      🔗 تكليف معلم بالمادة
                    </button>
                    <button class="desktop-primary-btn" @click="showAddTeacherModal = true">
                      ➕ إضافة معلم جديد
                    </button>
                  </div>
                </div>

                <!-- Search Filter for Teachers -->
                <div class="teachers-filter-row" style="margin-bottom: 16px;">
                  <input 
                    type="text" 
                    v-model="teacherSearchQuery" 
                    placeholder="🔍 بحث باسم المعلم أو اسم المستخدم..." 
                    class="form-input"
                  />
                </div>

                <table class="desktop-table">
                  <thead>
                    <tr>
                      <th>الاسم الكامل للمعلم</th>
                      <th>اسم المستخدم</th>
                      <th>التكليفات المسندة</th>
                      <th>إجراءات الإدارة</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr 
                      v-for="t in filteredTeachers" 
                      :key="t.id"
                      class="clickable-student-row"
                      @click="openTeacherDetail(t)"
                      title="اضغط لعرض الملف والأكاديمي التكليفات للمعلم"
                    >
                      <td class="flex-align-gap">
                        <span class="clickable-name">👨‍🏫 {{ t.full_name }}</span>
                      </td>
                      <td><code>{{ t.username }}</code></td>
                      <td>
                        <span class="count-tag-pill">{{ getTeacherAssignmentCount(t.id) }} مواد</span>
                      </td>
                      <td @click.stop>
                        <div class="table-actions-inline">
                          <button class="table-btn-secondary" @click="openAssignForTeacher(t)" title="تكليف مادة للمعلم">🔗 تكليف</button>
                          <button class="table-btn-danger" @click="handleDeleteTeacher(t.id)" title="حذف المعلم">حذف المعلم</button>
                        </div>
                      </td>
                    </tr>
                    <tr v-if="filteredTeachers.length === 0">
                      <td colspan="4" class="empty-table-msg">لا يوجد معلمون مطابقين لمعايير البحث حالياً.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <!-- MODULE 7: TEACHER DETAILS FULL PAGE VIEW -->
            <div v-else-if="activeModule === 'teacher-details' && selectedTeacher" class="tab-pane-content">
              <div class="desktop-card-box student-profile-card">
                <!-- Top Header with Back Button -->
                <div class="card-box-header flex-between">
                  <div class="flex-actions-gap">
                    <button class="back-to-structure-btn" @click="activeModule = 'teachers'">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
                      <span>العودة لقائمة المعلمين</span>
                    </button>
                    <div class="sec-title-meta">
                      <h3 class="card-box-title">👨‍🏫 الملف الأكاديمي للمعلم: {{ selectedTeacher.full_name }}</h3>
                      <span class="card-box-sub">اسم المستخدم: {{ selectedTeacher.username }} • كادر التدريس المعتمد</span>
                    </div>
                  </div>

                  <div class="flex-actions-gap">
                    <button class="desktop-secondary-btn" @click="openAssignForTeacher(selectedTeacher)">
                      🔗 تكليف بمادة جديدة
                    </button>
                    <button class="desktop-primary-btn" @click="handleDeleteTeacher(selectedTeacher.id)">
                      🗑️ حذف حساب المعلم
                    </button>
                  </div>
                </div>

                <!-- Teacher Profile Details Grid -->
                <div class="student-profile-body">
                  <div class="profile-hero-banner">
                    <div class="profile-avatar-big">👨‍🏫</div>
                    <div class="profile-hero-info">
                      <h2 class="profile-student-name">{{ selectedTeacher.full_name }}</h2>
                      <div class="profile-badges-row">
                        <span class="profile-badge purple">👤 {{ selectedTeacher.username }}</span>
                        <span class="profile-badge indigo">📖 التكليفات المسندة: {{ teacherAssignments.length }}</span>
                        <span class="profile-badge emerald">🟢 كادر تدريسي معتمد</span>
                      </div>
                    </div>
                  </div>

                  <div class="profile-info-grid">
                    <div class="info-card-box">
                      <h4 class="info-card-title">📌 بيانات الحساب والكادر</h4>
                      <div class="info-details-list">
                        <div class="info-row-item">
                          <span class="info-lbl">الاسم الكامل للمعلم:</span>
                          <span class="info-val"><strong>{{ selectedTeacher.full_name }}</strong></span>
                        </div>
                        <div class="info-row-item">
                          <span class="info-lbl">اسم المستخدم (Username):</span>
                          <span class="info-val"><code>{{ selectedTeacher.username }}</code></span>
                        </div>
                        <div class="info-row-item">
                          <span class="info-lbl">الصفة الأكاديمية:</span>
                          <span class="info-val">أستاذ مادة / كادر منظم</span>
                        </div>
                        <div class="info-row-item">
                          <span class="info-lbl">حالة الصلاحيات والمنظومة:</span>
                          <span class="info-val success">مفعل 🟢</span>
                        </div>
                      </div>
                    </div>

                    <div class="info-card-box">
                      <h4 class="info-card-title">📖 التكليفات الأكاديمية المسندة (إجمالي {{ teacherAssignments.length }})</h4>
                      <div class="info-details-list">
                        <table class="desktop-table" v-if="teacherAssignments.length > 0">
                          <thead>
                            <tr>
                              <th>المادة الدراسية</th>
                              <th>الصف والشعبة</th>
                              <th>إجراء</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr v-for="a in teacherAssignments" :key="a.id">
                              <td><span class="sec-pill-tag subject">📖 {{ a.subject_name }}</span></td>
                              <td>{{ a.grade_name }} ({{ a.section_name }})</td>
                              <td>
                                <button class="table-btn-danger" @click="handleDeleteAssign(a.id)">إزالة</button>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                        <div v-else class="empty-table-msg" style="padding: 16px 0;">
                          لا توجد مواد أو صفوف مكلف بها هذا المعلم حالياً.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            <!-- MODULE 4: الجدول الدراسي (Schedule / Timetable) -->
            <div v-else-if="activeModule === 'schedule'" class="tab-pane-content">
              <div class="desktop-card-box">
                <div class="card-box-header flex-between">
                  <div>
                    <h3 class="card-box-title">📅 الجدول الدراسي وإدارة الحصص الأسبوعية</h3>
                    <p class="card-box-sub" v-if="!selectedScheduleSectionId">
                      جدول اليوم الحالي لجميع الفصول والشعب الدراسية (من الحصة 1 إلى الحصة 6)
                    </p>
                    <p class="card-box-sub" v-else>
                      الجدول الدراسي الأسبوعي للشعبة المحددة (من الأحد إلى الخميس - 6 حصص يومياً)
                    </p>
                  </div>
                  <div class="flex-actions-gap" style="align-items: center;">
                    <label class="form-label inline-label" style="margin: 0; align-self: center;">تصفية حسب الشعبة:</label>
                    <CustomSelect 
                      v-model="selectedScheduleSectionId" 
                      :options="scheduleSectionOptions" 
                      placeholder="🏫 جميع الشعب (جدول اليوم الحالي)" 
                      width="280px" 
                    />
                  </div>
                </div>

                <!-- STATE A: DEFAULT VIEW - TODAY'S SCHEDULE FOR ALL CLASSROOMS -->
                <div v-if="!selectedScheduleSectionId" class="all-classes-today-schedule">
                  <div class="flex-between body-header-margin" style="margin-bottom: 14px; align-items: center;">
                    <div class="day-switcher-bar">
                      <span class="day-bar-label">📅 اليوم المعروض:</span>
                      <button 
                        v-for="d in ['الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس']" 
                        :key="d"
                        class="day-pill-btn"
                        :class="{ active: selectedScheduleDay === d }"
                        @click="selectedScheduleDay = d"
                      >
                        {{ d }}
                      </button>
                    </div>
                    <span class="count-tag-pill">إجمالي {{ allSectionsDailySchedule.length }} شعبة مسجلة</span>
                  </div>

                  <div class="schedule-table-wrapper">
                    <table class="desktop-schedule-table master-daily-table">
                      <thead>
                        <tr>
                          <th class="day-col-header" style="width: 220px;">الفصل الدراسي والشعبة</th>
                          <th v-for="p in 6" :key="p" class="period-col-header">الحصة {{ p }}</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="item in allSectionsDailySchedule" :key="`${item.gradeId}-${item.sectionId}`">
                          <td class="day-name-cell section-label-cell">
                            <strong class="grade-text">{{ item.gradeName }}</strong>
                            <span class="sec-text" v-if="item.sectionName !== 'بدون شعبة'">الشعبة {{ item.sectionName }}</span>
                          </td>
                          <td v-for="slot in item.slots" :key="slot.period" class="period-slot-cell" style="cursor: pointer;" title="اضغط لتعديل/تخصيص الحصة ✏️" @click="openEditSlotModal({ id: item.sectionId, name: item.sectionName }, { id: item.gradeId, name: item.gradeName }, selectedScheduleDay, slot)">
                            <div class="slot-cell-content" :class="{ 'has-subject': slot.subject && slot.subject !== '-' }">
                              <strong class="slot-sub-text">{{ slot.subject }}</strong>
                              <span class="slot-teacher-text" v-if="slot.teacher && slot.teacher !== '-'">{{ slot.teacher }}</span>
                            </div>
                          </td>
                        </tr>
                        <tr v-if="allSectionsDailySchedule.length === 0">
                          <td colspan="7" class="empty-table-msg">لا توجد شعب منشأة لعرض جدولها.</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <!-- STATE B: SPECIFIC SECTION SELECTED - FULL WEEKLY SCHEDULE -->
                <div v-else class="schedule-table-wrapper">
                  <div class="flex-between body-header-margin" style="margin-bottom: 14px;">
                    <h4 class="col-box-title">
                      📅 الجدول الأسبوعي
                      <span v-if="selectedScheduleSectionObj">
                        لـ ({{ selectedScheduleSectionObj.grade.name }} - الشعبة {{ selectedScheduleSectionObj.section.name }})
                      </span>
                    </h4>
                    <button class="desktop-secondary-btn small-btn" @click="selectedScheduleSectionId = ''">
                      🔙 العودة لجدول جميع الفصول
                    </button>
                  </div>

                  <table class="desktop-schedule-table">
                    <thead>
                      <tr>
                        <th class="day-col-header">اليوم / الحصص</th>
                        <th v-for="p in 6" :key="p" class="period-col-header">الحصة {{ p }}</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="day in sectionScheduleDays" :key="day.dayName">
                        <td class="day-name-cell">
                          <strong class="grade-text">{{ day.dayName }}</strong>
                        </td>
                        <td v-for="slot in day.slots" :key="slot.period" class="period-slot-cell" style="cursor: pointer;" title="اضغط لتعديل/تخصيص الحصة ✏️" @click="openEditSlotModal(selectedScheduleSectionObj ? selectedScheduleSectionObj.section : null, selectedScheduleSectionObj ? selectedScheduleSectionObj.grade : null, day.dayName, slot)">
                          <div class="slot-cell-content" :class="{ 'has-subject': slot.subject && slot.subject !== '-' }">
                            <strong class="slot-sub-text">{{ slot.subject }}</strong>
                            <span class="slot-teacher-text" v-if="slot.teacher && slot.teacher !== '-'">{{ slot.teacher }}</span>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

              </div>
            </div>

            <!-- MODULE 5: SECTION DETAILS FULL PAGE VIEW -->
            <div v-else-if="activeModule === 'section-details' && selectedSection" class="tab-pane-content">
              <div class="desktop-card-box section-full-page-card">
                <!-- Header with Back Button -->
                <div class="card-box-header flex-between">
                  <div class="flex-actions-gap">
                    <button class="back-to-structure-btn" @click="activeModule = 'classrooms'">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
                      <span>العودة لصفحة الفصول الدراسية</span>
                    </button>
                    <div class="sec-title-meta">
                      <h3 class="card-box-title">🏫 تفاصيل الشعبة {{ selectedSection.name }}</h3>
                      <span class="card-box-sub" v-if="selectedGrade">الصف الدراسي: {{ selectedGrade.name }}</span>
                    </div>
                  </div>

                  <span class="tag-pill-primary">شعبة مقيدة ونشطة</span>
                </div>

                <!-- Full Page 3 Tabs Header Switcher -->
                <div class="full-page-sec-tabs">
                  <button 
                    class="full-sec-tab-btn" 
                    :class="{ active: activeSectionTab === 'schedule' }"
                    @click="activeSectionTab = 'schedule'"
                  >
                    📅 الجدول الدراسي (الافتراضية)
                  </button>
                  <button 
                    class="full-sec-tab-btn" 
                    :class="{ active: activeSectionTab === 'students' }"
                    @click="activeSectionTab = 'students'"
                  >
                    🎓 الطلاب المسجلون ({{ sectionStudents.length }})
                  </button>
                  <button 
                    class="full-sec-tab-btn" 
                    :class="{ active: activeSectionTab === 'teachers' }"
                    @click="activeSectionTab = 'teachers'"
                  >
                    👨‍🏫 المعلمون المكلفون ({{ sectionTeachers.length }})
                  </button>
                </div>

                <!-- TAB 1: الجدول الدراسي (الافتراضية - الأيام كصفوف والمواد كأعمدة) -->
                <div v-if="activeSectionTab === 'schedule'" class="full-tab-body">
                  <div class="flex-between body-header-margin">
                    <h4 class="col-box-title">📅 الجدول الأسبوعي لشعبة {{ selectedSection.name }} (من الأحد إلى الخميس - 6 حصص يومياً)</h4>
                    <span class="count-tag-pill">6 حصص يومياً</span>
                  </div>

                  <div class="schedule-table-wrapper">
                    <table class="desktop-schedule-table">
                      <thead>
                        <tr>
                          <th class="day-col-header">اليوم / الحصص</th>
                          <th v-for="p in 6" :key="p" class="period-col-header">الحصة {{ p }}</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="day in sectionScheduleDays" :key="day.dayName">
                          <td class="day-name-cell">
                            <strong>{{ day.dayName }}</strong>
                          </td>
                          <td v-for="slot in day.slots" :key="slot.period" class="period-slot-cell" style="cursor: pointer;" title="اضغط لتعديل/تخصيص الحصة ✏️" @click="openEditSlotModal(selectedSection, selectedGrade, day.dayName, slot)">
                            <div class="slot-cell-content" :class="{ 'has-subject': slot.subject && slot.subject !== '-' }">
                              <strong class="slot-sub-text">{{ slot.subject }}</strong>
                              <span class="slot-teacher-text" v-if="slot.teacher && slot.teacher !== '-'">{{ slot.teacher }}</span>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <!-- TAB 2: الطلاب -->
                <div v-else-if="activeSectionTab === 'students'" class="full-tab-body">
                  <div class="flex-between body-header-margin">
                    <h4 class="col-box-title">🎓 قائمة الطلاب المسجلون بشعبة {{ selectedSection.name }} (إجمالي {{ sectionStudents.length }})</h4>
                    <button class="desktop-primary-btn" @click="showAddStudentModal = true">➕ إضافة طالب جديد لهذه الشعبة</button>
                  </div>

                  <table class="desktop-table">
                    <thead>
                      <tr>
                        <th>رقم الجلوس</th>
                        <th>كود الطالب</th>
                        <th>الاسم الكامل للطالب</th>
                        <th>الصف الدراسي</th>
                        <th>إجراءات</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="st in sectionStudents" :key="st.id">
                        <td><strong>{{ st.roll_number }}</strong></td>
                        <td><code>{{ st.student_code }}</code></td>
                        <td>{{ st.full_name }}</td>
                        <td>{{ st.grade_name || (selectedGrade ? selectedGrade.name : '') }}</td>
                        <td>
                          <button class="table-btn-danger" @click="handleDeleteStudent(st.id)">حذف الطالب</button>
                        </td>
                      </tr>
                      <tr v-if="sectionStudents.length === 0">
                        <td colspan="5" class="empty-table-msg">لا يوجد طلاب مسجلون بهذه الشعبة حالياً.</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <!-- TAB 3: المعلمين -->
                <div v-else-if="activeSectionTab === 'teachers'" class="full-tab-body">
                  <div class="flex-between body-header-margin">
                    <h4 class="col-box-title">👨‍🏫 كادر المعلمين المكلفين بتدريس مادة بشعبة {{ selectedSection.name }}</h4>
                    <button class="desktop-secondary-btn" @click="showAddAssignModal = true">🔗 تكليف معلم جديد بهذه الشعبة</button>
                  </div>

                  <table class="desktop-table">
                    <thead>
                      <tr>
                        <th>اسم المعلم</th>
                        <th>المادة الدراسية المكلف بها</th>
                        <th>الصف والدور</th>
                        <th>إجراء</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="t in sectionTeachers" :key="t.id">
                        <td><strong>{{ t.teacher_name }}</strong></td>
                        <td><span class="sec-pill-tag subject">📖 {{ t.subject_name }}</span></td>
                        <td>{{ t.grade_name }} (الشعبة {{ selectedSection.name }})</td>
                        <td><button class="table-btn-danger" @click="handleDeleteAssign(t.id)">إزالة التكليف</button></td>
                      </tr>
                      <tr v-if="sectionTeachers.length === 0">
                        <td colspan="4" class="empty-table-msg">لا يوجد معلمون مكلفون لهذه الشعبة حالياً.</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

              </div>
            </div>

            <!-- MODULE 5: الإحصاءات والتقارير اليومية (Daily Analytics & Reports - SaaS Design) -->
            <div v-else-if="activeModule === 'analytics'" class="tab-pane-content saas-analytics-pane">
              
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
                  <button class="saas-print-btn flex-align-center" style="gap: 6px;" @click="printAnalyticsReport">
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
                      <img :src="studentImg" alt="طلاب" class="card-3d-render-img" />
                      <div class="card-3d-shadow-ellipse"></div>
                    </div>
                    <div class="card-3d-stats">
                      <div class="card-3d-num">{{ dailyAnalytics.studentsPresent }},{{ dailyAnalytics.studentsTotal }}</div>
                      <div class="card-3d-unit">طالب</div>
                    </div>
                  </div>
                  <div class="card-3d-progress-track">
                    <div class="card-3d-progress-fill emerald-gradient" :style="{ width: dailyAnalytics.studentsRate + '%' }"></div>
                  </div>
                  <div class="card-3d-footer flex-between">
                    <span class="badge-status-dot green"><span class="dot green"></span> الحضور {{ dailyAnalytics.studentsPresent }}</span>
                    <span class="badge-status-dot red"><span class="dot red"></span> الغياب {{ dailyAnalytics.studentsAbsent }}</span>
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
                      <img :src="teacherImg" alt="معلمون" class="card-3d-render-img" />
                      <div class="card-3d-shadow-ellipse"></div>
                    </div>
                    <div class="card-3d-stats">
                      <div class="card-3d-num">{{ dailyAnalytics.teachersPresent }},{{ dailyAnalytics.teachersTotal }}</div>
                      <div class="card-3d-unit">معلم</div>
                    </div>
                  </div>
                  <div class="card-3d-progress-track">
                    <div class="card-3d-progress-fill emerald-gradient" :style="{ width: dailyAnalytics.teachersRate + '%' }"></div>
                  </div>
                  <div class="card-3d-footer flex-between">
                    <span class="badge-status-dot green"><span class="dot green"></span> الحضور {{ dailyAnalytics.teachersPresent }}</span>
                    <span class="badge-status-dot gray"><span class="dot gray"></span> الغياب {{ dailyAnalytics.teachersAbsent }}</span>
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
                      <img :src="homeworkImg" alt="واجبات" class="card-3d-render-img" />
                      <div class="card-3d-shadow-ellipse purple-shadow"></div>
                    </div>
                    <div class="card-3d-stats">
                      <div class="card-3d-num">{{ dailyAnalytics.totalHomeworks }}</div>
                      <div class="card-3d-unit">واجب منشور</div>
                    </div>
                  </div>
                  <div class="card-3d-progress-track">
                    <div class="card-3d-progress-fill purple-gradient" :style="{ width: dailyAnalytics.homeworkComplianceRate + '%' }"></div>
                  </div>
                  <div class="card-3d-footer flex-between">
                    <span class="badge-status-purple-pill">النشطة: {{ dailyAnalytics.activeHomeworks }}</span>
                    <span class="footer-muted-text">إجمالي: {{ dailyAnalytics.totalHomeworks }}</span>
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
                      <img :src="examImg" alt="امتحانات" class="card-3d-render-img" />
                      <div class="card-3d-shadow-ellipse amber-shadow"></div>
                    </div>
                    <div class="card-3d-stats">
                      <div class="card-3d-num">{{ dailyAnalytics.totalExams }}</div>
                      <div class="card-3d-unit">امتحان مجدول</div>
                    </div>
                  </div>
                  <div class="card-3d-progress-track">
                    <div class="card-3d-progress-fill amber-gradient" style="width: 75%;"></div>
                  </div>
                  <div class="card-3d-footer flex-between">
                    <span class="footer-muted-text">اليوم: {{ dailyAnalytics.todayExams }} امتحانات</span>
                    <span class="footer-clock-pill flex-align-center" style="gap: 4px;">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                      <span>11:00</span>
                    </span>
                  </div>
                </div>

              </div>

              <!-- 2. TWO-COLUMN ANALYTICS GRID (50% / 50% SPLIT) -->
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
                    <div v-for="gAtt in gradeAttendanceBreakdown.slice(0, 6)" :key="gAtt.gradeName" class="saas-grade-row">
                      <div class="grade-row-meta flex-between">
                        <div class="flex-align-center">
                          <span class="grade-row-title">{{ gAtt.gradeName }}</span>
                          <span class="grade-att-badge">({{ gAtt.present }} حضور / {{ gAtt.absent }} غياب)</span>
                        </div>
                        <span class="grade-att-rate">{{ gAtt.rate }}%</span>
                      </div>
                      <div class="saas-progress-track">
                        <div class="saas-progress-fill emerald" :style="{ width: gAtt.rate + '%' }"></div>
                      </div>
                    </div>
                  </div>

                  <div class="saas-card-footer">
                    <button class="saas-footer-action-btn">عرض سجل الحضور الكامل ←</button>
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
                    <!-- Metric Item 1: Circle Gauge -->
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

                    <!-- Metric Item 2: Sparkline Line Chart 1 -->
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

                    <!-- Metric Item 3: Sparkline Line Chart 2 -->
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

              <!-- 3. BOTTOM RECENT ACTIVITIES & NOTIFICATIONS GRID -->
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

            </div>

            <!-- CREATION MODULE (مركز الإضافات) -->
            <div v-else-if="activeModule === 'creation'" class="tab-pane-content">
              <div class="desktop-card-box">
                <div class="card-box-header flex-between">
                  <div>
                    <h3 class="card-box-title">➕ مركز الإضافات وإدارة العمليات الموحد</h3>
                    <p class="card-box-sub">صفحة مخصصة لإضافة وتدشين كافة مكونات المنظومة التعليمية (فصل دراسي، شعبة، طالب، معلم، مادة)</p>
                  </div>
                  <span class="tag-pill-primary">5 نماذج إضافة فورية</span>
                </div>

                <div class="creation-forms-grid">
                  <!-- 1. إضافة فصل دراسي -->
                  <div class="creation-form-card">
                    <div class="creation-card-header">
                      <div class="creation-icon purple">🏫</div>
                      <div>
                        <h4 class="creation-card-title">1- إضافة فصل / صف دراسي</h4>
                        <p class="creation-card-desc">إدراج سنة أو صف دراسي جديد بقاعدة البيانات</p>
                      </div>
                    </div>

                    <form @submit.prevent="handleCreateGradeFromPage" class="creation-form-body">
                      <div class="form-group">
                        <label class="form-label">اسم الصف الدراسي *</label>
                        <input type="text" v-model="newGradeForm.name" placeholder="مثال: الصف العاشر" required class="form-input" />
                      </div>
                      <div class="form-group">
                        <label class="form-label">رقم المستوى (Level) *</label>
                        <input type="number" v-model.number="newGradeForm.level" placeholder="مثال: 10" required class="form-input" />
                      </div>
                      <button type="submit" class="creation-submit-btn">إضافة فصل دراسي جديد 🚀</button>
                    </form>
                  </div>

                  <!-- 2. إضافة شعبة -->
                  <div class="creation-form-card">
                    <div class="creation-card-header">
                      <div class="creation-icon emerald">🏢</div>
                      <div>
                        <h4 class="creation-card-title">2- إضافة شعبة جديدة</h4>
                        <p class="creation-card-desc">إنشاء وتخصيص شعبة أو قاعة لصف دراسي</p>
                      </div>
                    </div>

                    <form @submit.prevent="handleCreateSectionFromPage" class="creation-form-body">
                      <div class="form-group">
                        <label class="form-label">اختر الصف الدراسي *</label>
                        <CustomSelect 
                          v-model="newSectionForm.grade_id" 
                          :options="gradeModalOptions" 
                          placeholder="اختر الصف..." 
                          width="100%" 
                        />
                      </div>
                      <div class="form-group">
                        <label class="form-label">اسم الشعبة *</label>
                        <input type="text" v-model="newSectionForm.name" placeholder="مثال: 8أ أو الشعبة 5ب" required class="form-input" />
                      </div>
                      <button type="submit" class="creation-submit-btn">إضافة الشعبة 🚀</button>
                    </form>
                  </div>

                  <!-- 3. إضافة طالب -->
                  <div class="creation-form-card">
                    <div class="creation-card-header">
                      <div class="creation-icon indigo">🎓</div>
                      <div>
                        <h4 class="creation-card-title">3- إضافة طالب جديد</h4>
                        <p class="creation-card-desc">تسجيل بيانات طالب جديد برقم الجلوس والكود</p>
                      </div>
                    </div>

                    <form @submit.prevent="handleAddStudent" class="creation-form-body">
                      <div class="form-group">
                        <label class="form-label">الاسم الكامل للطالب *</label>
                        <input type="text" v-model="newStudent.full_name" placeholder="اسم الطالب الثلاثي" required class="form-input" />
                      </div>
                      <div class="form-row">
                        <div class="form-group">
                          <label class="form-label">رقم الجلوس *</label>
                          <input type="text" v-model="newStudent.roll_number" placeholder="1005" required class="form-input" />
                        </div>
                        <div class="form-group">
                          <label class="form-label">كود الطالب *</label>
                          <input type="text" v-model="newStudent.student_code" placeholder="ST1005" required class="form-input" />
                        </div>
                      </div>
                      <div class="form-row">
                        <div class="form-group">
                          <label class="form-label">الصف الدراسي *</label>
                          <CustomSelect 
                            v-model="newStudent.grade_id" 
                            :options="gradeModalOptions" 
                            placeholder="اختر الصف..." 
                            width="100%" 
                          />
                        </div>
                        <div class="form-group">
                          <label class="form-label">الشعبة *</label>
                          <CustomSelect 
                            v-model="newStudent.section_id" 
                            :options="availableSectionsForNewStudentOptions" 
                            placeholder="اختر الشعبة..." 
                            width="100%" 
                          />
                        </div>
                      </div>
                      <button type="submit" class="creation-submit-btn">تسجيل الطالب بقاعدة البيانات 🚀</button>
                    </form>
                  </div>

                  <!-- 4. إضافة معلم -->
                  <div class="creation-form-card">
                    <div class="creation-card-header">
                      <div class="creation-icon amber">👨‍🏫</div>
                      <div>
                        <h4 class="creation-card-title">4- إضافة حساب معلم جديد</h4>
                        <p class="creation-card-desc">إنشاء حساب معتمد جديد لكادر التدريس</p>
                      </div>
                    </div>

                    <form @submit.prevent="handleAddTeacher" class="creation-form-body">
                      <div class="form-group">
                        <label class="form-label">الاسم الكامل للمعلم *</label>
                        <input type="text" v-model="newTeacher.full_name" placeholder="اسم المعلم الثلاثي" required class="form-input" />
                      </div>
                      <div class="form-group">
                        <label class="form-label">اسم المستخدم (Username) *</label>
                        <input type="text" v-model="newTeacher.username" placeholder="teacher2" required class="form-input" />
                      </div>
                      <div class="form-group">
                        <label class="form-label">كلمة المرور *</label>
                        <input type="password" v-model="newTeacher.password" required class="form-input" />
                      </div>
                      <button type="submit" class="creation-submit-btn">إنشاء حساب المعلم 🚀</button>
                    </form>
                  </div>

                  <!-- 5. إضافة مادة دراسية -->
                  <div class="creation-form-card">
                    <div class="creation-card-header">
                      <div class="creation-icon teal">📖</div>
                      <div>
                        <h4 class="creation-card-title">5- إضافة مادة دراسية</h4>
                        <p class="creation-card-desc">إدراج وتخصيص مادة دراسية لصف معين</p>
                      </div>
                    </div>

                    <form @submit.prevent="handleCreateSubjectFromPage" class="creation-form-body">
                      <div class="form-group">
                        <label class="form-label">اختر الصف الدراسي *</label>
                        <CustomSelect 
                          v-model="newSubjectForm.grade_id" 
                          :options="gradeModalOptions" 
                          placeholder="اختر الصف..." 
                          width="100%" 
                        />
                      </div>
                      <div class="form-group">
                        <label class="form-label">اسم المادة الدراسية *</label>
                        <input type="text" v-model="newSubjectForm.name" placeholder="مثال: الفيزياء الكلاسيكية" required class="form-input" />
                      </div>
                      <button type="submit" class="creation-submit-btn">حفظ وإدراج المادة 🚀</button>
                    </form>
                  </div>
                </div>
              </div>
            </div>

          </div>

          <!-- RIGHT SIDEBAR DESKTOP WIDGETS (1fr) -->
          <div v-if="activeModule !== 'analytics'" class="desktop-content-right">
            <!-- Sidebar Widget 1: Quick Admin Actions -->
            <div class="desktop-card-box widget-card quick-actions-card">
              <h4 class="widget-title">
                <span class="widget-icon-pill">⚡</span>
                إجراءات إدارية سريعة
              </h4>
              <div class="quick-actions-list">
                <!-- Action 1: Add New Student -->
                <button class="quick-action-btn" @click="showAddStudentModal = true">
                  <div class="qa-left-group">
                    <div class="qa-icon-sq purple">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5"/></svg>
                    </div>
                    <div class="qa-text">
                      <span class="qa-main">إضافة طالب جديد</span>
                      <span class="qa-sub">تسجيل طالب وتخصيص الصف</span>
                    </div>
                  </div>
                  <svg class="qa-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
                </button>

                <!-- Action 2: Add New Teacher -->
                <button class="quick-action-btn" @click="showAddTeacherModal = true">
                  <div class="qa-left-group">
                    <div class="qa-icon-sq emerald">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                    </div>
                    <div class="qa-text">
                      <span class="qa-main">إضافة معلم جديد</span>
                      <span class="qa-sub">إنشاء حساب جديد بالمنظومة</span>
                    </div>
                  </div>
                  <svg class="qa-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
                </button>

                <!-- Action 3: Assign Teacher to Subject -->
                <button class="quick-action-btn" @click="showAddAssignModal = true">
                  <div class="qa-left-group">
                    <div class="qa-icon-sq indigo">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
                    </div>
                    <div class="qa-text">
                      <span class="qa-main">تكليف معلم بمادة</span>
                      <span class="qa-sub">ربط المعلم بالشعبة والمادة</span>
                    </div>
                  </div>
                  <svg class="qa-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
                </button>
              </div>
            </div>

            <!-- Sidebar Widget 2: Live Activity Feed Log -->
            <div class="desktop-card-box widget-card">
              <div class="flex-between">
                <h4 class="widget-title">⚡ سجل الأحداث اللحظية</h4>
                <span class="dot-live-badge">مباشر</span>
              </div>
              <div class="activity-feed-list">
                <div v-for="act in activityLogs" :key="act.id" class="activity-feed-item">
                  <div class="feed-icon" :class="act.typeClass">{{ act.icon }}</div>
                  <div class="feed-body">
                    <p class="feed-text">{{ act.title }}</p>
                    <span class="feed-time">{{ act.time }}</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Sidebar Widget 3: School System Info -->
            <div class="desktop-card-box widget-card info-gradient-card">
              <h4 class="widget-title light">🏫 حالة المنظومة المدرسية</h4>
              <div class="system-meta-list">
                <div class="meta-row-item">
                  <span class="meta-lbl">العام الدراسي:</span>
                  <span class="meta-val">2025/2026</span>
                </div>
                <div class="meta-row-item">
                  <span class="meta-lbl">الفصل الدراسي:</span>
                  <span class="meta-val">الفصل الأول</span>
                </div>
                <div class="meta-row-item">
                  <span class="meta-lbl">حالة السيرفر:</span>
                  <span class="meta-val success">سليم ومستقر 🟢</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
    </main>

    <!-- Task Side Drawer (دراوير جانبي ينزلق بـ 0.7s) -->
    <ShadcnDrawer 
      v-model="isDrawerOpen" 
      :title="selectedTask ? selectedTask.title : 'تفاصيل المهمة المدرسية'"
      :description="selectedTask ? `مادة ${selectedTask.subject_name} • ${selectedTask.grade_name || ''} (${selectedTask.section_name || ''})` : ''"
      :icon="selectedTask ? getTaskIcon(selectedTask.task_type) : '📝'"
    >
      <div v-if="selectedTask" class="drawer-exam-details">
        <div class="drawer-status-banner verified">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
          <span>مهمة تقييم نشطة ومدرجة بجدول المعلم</span>
        </div>

        <div class="drawer-info-grid">
          <div class="drawer-info-item">
            <span class="info-label">📅 موعد الإنجاز والتسليم</span>
            <span class="info-val">{{ selectedTask.due_date }}</span>
          </div>
          <div class="drawer-info-item">
            <span class="info-label">🏫 الصف والشعبة</span>
            <span class="info-val">{{ selectedTask.grade_name }} ({{ selectedTask.section_name }})</span>
          </div>
          <div class="drawer-info-item">
            <span class="info-label">📖 المادة الدراسية</span>
            <span class="info-val">{{ selectedTask.subject_name }}</span>
          </div>
          <div class="drawer-info-item">
            <span class="info-label">👨‍🏫 المعلم المكلف</span>
            <span class="info-val">{{ selectedTask.teacher_name || 'أستاذ المادة' }}</span>
          </div>
        </div>

        <div class="drawer-section">
          <h4 class="drawer-section-title">📌 مفردات وتفاصيل التقييم:</h4>
          <p class="drawer-text-content">
            {{ selectedTask.description || 'حل تمارين التقييم المعتمدة وتثبيت النتائج بالكراسة الرسمية.' }}
          </p>
        </div>
      </div>
      <template #footer>
        <button class="shadcn-btn-secondary" @click="isDrawerOpen = false">إغلاق</button>
      </template>
    </ShadcnDrawer>

    <!-- Modals -->
    <!-- Edit Schedule Slot Modal -->
    <ShadcnDialog 
      v-model="showEditSlotModal" 
      :title="`📅 تعديل/تخصيص الحصة ${slotModalForm.slot_number} (يوم ${slotModalForm.day_name})`" 
      :description="`الصف: ${slotModalForm.grade_name || 'غير محدد'} • الشعبة: ${slotModalForm.section_name || 'غير محدد'}`"
      icon="✏️"
    >
      <form @submit.prevent="handleSaveSlot" class="teacher-create-form">
        <div class="form-group">
          <label class="form-label">المادة الدراسية *</label>
          <CustomSelect 
            v-model="slotModalForm.subject_id" 
            :options="availableSubjectsForSlotOptions" 
            placeholder="اختر المادة الدراسية..." 
            width="100%" 
          />
        </div>
        <div class="form-group">
          <label class="form-label">المعلم المكلف بتدريس المادة *</label>
          <CustomSelect 
            v-model="slotModalForm.teacher_id" 
            :options="teacherModalOptions" 
            placeholder="اختر المعلم المكلف..." 
            width="100%" 
          />
        </div>
      </form>
      <template #footer>
        <button class="shadcn-btn-secondary" @click="showEditSlotModal = false">إلغاء</button>
        <button class="table-btn-danger" v-if="slotModalForm.id || slotModalForm.subject_id" @click="handleDeleteSlot">تفريغ الحصة 🗑️</button>
        <button class="shadcn-btn-primary" @click="handleSaveSlot">حفظ وتخصيص الحصة 💾</button>
      </template>
    </ShadcnDialog>

    <!-- Add Student Modal -->
    <ShadcnDialog 
      v-model="showAddStudentModal" 
      title="➕ إضافة طالب جديد" 
      description="إدراج طالب جديد بقاعدة البيانات وتخصيص الشعبة"
      icon="🎓"
    >
      <form @submit.prevent="handleAddStudent" class="teacher-create-form">
        <div class="form-group">
          <label class="form-label">الاسم الكامل للطالب *</label>
          <input type="text" v-model="newStudent.full_name" required class="form-input" placeholder="اسم الطالب الثلاثي" />
        </div>
        <div class="form-row">
          <div class="form-group">
            <label class="form-label">رقم الجلوس *</label>
            <input type="text" v-model="newStudent.roll_number" placeholder="مثال: 1005" required class="form-input" />
          </div>
          <div class="form-group">
            <label class="form-label">كود الطالب *</label>
            <input type="text" v-model="newStudent.student_code" placeholder="مثال: ST1005" required class="form-input" />
          </div>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label class="form-label">الصف الدراسي *</label>
            <CustomSelect 
              v-model="newStudent.grade_id" 
              :options="gradeModalOptions" 
              placeholder="اختر الصف..." 
              width="100%" 
            />
          </div>
          <div class="form-group">
            <label class="form-label">الشعبة *</label>
            <CustomSelect 
              v-model="newStudent.section_id" 
              :options="availableSectionsForNewStudentOptions" 
              placeholder="اختر الشعبة..." 
              width="100%" 
            />
          </div>
        </div>
      </form>
      <template #footer>
        <button class="shadcn-btn-secondary" @click="showAddStudentModal = false">إلغاء</button>
        <button class="shadcn-btn-primary" @click="handleAddStudent">إدراج الطالب 🚀</button>
      </template>
    </ShadcnDialog>

    <!-- Transfer Student Modal -->
    <ShadcnDialog 
      v-model="showTransferStudentModal" 
      title="🔄 نقل طالب إلى فصل/شعبة جديدة" 
      description="تغيير صف الطالب وشعبته بقاعدة البيانات"
      icon="🔄"
    >
      <form @submit.prevent="handleTransferStudent" class="teacher-create-form">
        <div class="form-group">
          <label class="form-label">اختر الطالب المراد نقله *</label>
          <CustomSelect 
            v-model="transferForm.student_id" 
            :options="studentTransferOptions" 
            placeholder="اختر طالب..." 
            width="100%" 
          />
        </div>
        <div class="form-row">
          <div class="form-group">
            <label class="form-label">الصف الدراسي الجديد *</label>
            <CustomSelect 
              v-model="transferForm.grade_id" 
              :options="gradeModalOptions" 
              placeholder="اختر الصف الجديد..." 
              width="100%" 
            />
          </div>
          <div class="form-group">
            <label class="form-label">الشعبة الجديدة *</label>
            <CustomSelect 
              v-model="transferForm.section_id" 
              :options="availableSectionsForTransferOptions" 
              placeholder="اختر الشعبة الجديدة..." 
              width="100%" 
            />
          </div>
        </div>
      </form>
      <template #footer>
        <button class="shadcn-btn-secondary" @click="showTransferStudentModal = false">إلغاء</button>
        <button class="shadcn-btn-primary" @click="handleTransferStudent">نقل الطالب الآن 🚀</button>
      </template>
    </ShadcnDialog>

    <!-- Edit Student Modal -->
    <ShadcnDialog 
      v-model="showEditStudentModal" 
      title="✏️ تعديل بيانات طالب" 
      description="تحديث البيانات الأساسية ورقم الجلوس والكود للطالب"
      icon="✏️"
    >
      <form @submit.prevent="handleUpdateStudent" class="teacher-create-form">
        <div class="form-group">
          <label class="form-label">الاسم الكامل للطالب *</label>
          <input type="text" v-model="editStudentForm.full_name" required class="form-input" />
        </div>
        <div class="form-row">
          <div class="form-group">
            <label class="form-label">رقم الجلوس *</label>
            <input type="text" v-model="editStudentForm.roll_number" required class="form-input" />
          </div>
          <div class="form-group">
            <label class="form-label">كود الطالب *</label>
            <input type="text" v-model="editStudentForm.student_code" required class="form-input" />
          </div>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label class="form-label">الصف الدراسي *</label>
            <CustomSelect 
              v-model="editStudentForm.grade_id" 
              :options="gradeModalOptions" 
              placeholder="اختر الصف..." 
              width="100%" 
            />
          </div>
          <div class="form-group">
            <label class="form-label">الشعبة *</label>
            <CustomSelect 
              v-model="editStudentForm.section_id" 
              :options="availableSectionsForEditOptions" 
              placeholder="اختر الشعبة..." 
              width="100%" 
            />
          </div>
        </div>
      </form>
      <template #footer>
        <button class="shadcn-btn-secondary" @click="showEditStudentModal = false">إلغاء</button>
        <button class="shadcn-btn-primary" @click="handleUpdateStudent">حفظ التحديثات 🚀</button>
      </template>
    </ShadcnDialog>

    <!-- Add Teacher Modal -->
    <ShadcnDialog 
      v-model="showAddTeacherModal" 
      title="➕ إضافة حساب معلم جديد" 
      description="إنشاء حساب جديد لكادر التدريس"
      icon="👨‍🏫"
    >
      <form @submit.prevent="handleAddTeacher" class="teacher-create-form">
        <div class="form-group">
          <label class="form-label">الاسم الكامل للمعلم *</label>
          <input type="text" v-model="newTeacher.full_name" required class="form-input" placeholder="اسم المعلم الثلاثي" />
        </div>
        <div class="form-group">
          <label class="form-label">اسم المستخدم (Username) *</label>
          <input type="text" v-model="newTeacher.username" placeholder="teacher2" required class="form-input" />
        </div>
        <div class="form-group">
          <label class="form-label">كلمة المرور *</label>
          <input type="password" v-model="newTeacher.password" required class="form-input" />
        </div>
      </form>
      <template #footer>
        <button class="shadcn-btn-secondary" @click="showAddTeacherModal = false">إلغاء</button>
        <button class="shadcn-btn-primary" @click="handleAddTeacher">إنشاء الحساب 🚀</button>
      </template>
    </ShadcnDialog>

    <!-- Add Assignment Modal -->
    <ShadcnDialog 
      v-model="showAddAssignModal" 
      title="🔗 تكليف معلم بالمادة والشعبة" 
      description="ربط المعلم بصفوف المواد الدراسية"
      icon="🔗"
    >
      <form @submit.prevent="handleAddAssign" class="teacher-create-form">
        <div class="form-group">
          <label class="form-label">اختر المعلم *</label>
          <CustomSelect 
            v-model="newAssign.teacher_id" 
            :options="teacherModalOptions" 
            placeholder="اختر معلماً..." 
            width="100%" 
          />
        </div>
        <div class="form-group">
          <label class="form-label">الصف الدراسي *</label>
          <CustomSelect 
            v-model="newAssign.grade_id" 
            :options="gradeModalOptions" 
            placeholder="اختر الصف..." 
            width="100%" 
          />
        </div>
        <div class="form-row">
          <div class="form-group">
            <label class="form-label">المادة الدراسية *</label>
            <CustomSelect 
              v-model="newAssign.subject_id" 
              :options="availableSubjectsForAssignOptions" 
              placeholder="اختر المادة..." 
              width="100%" 
            />
          </div>
          <div class="form-group">
            <label class="form-label">الشعبة *</label>
            <CustomSelect 
              v-model="newAssign.section_id" 
              :options="availableSectionsForAssignOptions" 
              placeholder="اختر الشعبة..." 
              width="100%" 
            />
          </div>
        </div>
      </form>
      <template #footer>
        <button class="shadcn-btn-secondary" @click="showAddAssignModal = false">إلغاء</button>
        <button class="shadcn-btn-primary" @click="handleAddAssign">ربط التكليف 🚀</button>
      </template>
    </ShadcnDialog>

    <!-- Add Section Modal -->
    <ShadcnDialog 
      v-model="showAddSectionModal" 
      title="➕ إضافة شعبة جديدة" 
      :description="selectedGradeForModal ? `إضافة قاعة شعبة لـ ${selectedGradeForModal.name}` : ''"
      icon="🏫"
    >
      <form @submit.prevent="handleAddSection" class="teacher-create-form">
        <div class="form-group">
          <label class="form-label">اسم الشعبة (مثل: 8أ ، 8ب) *</label>
          <input type="text" v-model="newSectionName" required class="form-input" placeholder="8أ" />
        </div>
      </form>
      <template #footer>
        <button class="shadcn-btn-secondary" @click="showAddSectionModal = false">إلغاء</button>
        <button class="shadcn-btn-primary" @click="handleAddSection">حفظ الشعبة 🚀</button>
      </template>
    </ShadcnDialog>

    <!-- Add Subject Modal -->
    <ShadcnDialog 
      v-model="showAddSubjectModal" 
      title="➕ إضافة مادة دراسية" 
      :description="selectedGradeForModal ? `إدراج مادة دراسية لـ ${selectedGradeForModal.name}` : ''"
      icon="📖"
    >
      <form @submit.prevent="handleAddSubject" class="teacher-create-form">
        <div class="form-group">
          <label class="form-label">اسم المادة (مثل: الرياضيات ، الفيزياء) *</label>
          <input type="text" v-model="newSubjectName" required class="form-input" placeholder="الرياضيات" />
        </div>
      </form>
      <template #footer>
        <button class="shadcn-btn-secondary" @click="showAddSubjectModal = false">إلغاء</button>
        <button class="shadcn-btn-primary" @click="handleAddSubject">حفظ المادة 🚀</button>
      </template>
    </ShadcnDialog>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, reactive } from 'vue';
import { useRouter } from 'vue-router';
import ShadcnDialog from '../../components/common/ShadcnDialog.vue';
import ShadcnDrawer from '../../components/common/ShadcnDrawer.vue';
import CustomSelect from '../../components/common/CustomSelect.vue';
import api from '../../services/api';

import studentImg from '../../assets/student_attendance_3d.png';
import teacherImg from '../../assets/teacher_attendance_3d.png';
import homeworkImg from '../../assets/homework_assignments_3d.png';
import examImg from '../../assets/exams_evaluations_3d.png';
import schoolImg from '../../assets/school_building_3d.png';

const router = useRouter();
const loading = ref(true);
const activeModule = ref('classrooms');
const showProfileDropdown = ref(false);

function toggleProfileDropdown() {
  showProfileDropdown.value = !showProfileDropdown.value;
}

const selectedScheduleSectionId = ref('');
const daysNamesMap = ['الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الأحد', 'الأحد'];
const initialDayName = daysNamesMap[new Date().getDay()] || 'الأحد';
const selectedScheduleDay = ref(initialDayName);

const gradeOptions = computed(() => [
  { value: '', label: '🏫 جميع الصفوف' },
  ...grades.value.map(g => ({ value: g.id, label: g.name }))
]);

const gradeModalOptions = computed(() => 
  grades.value.map(g => ({ value: g.id, label: g.name }))
);

const studentSectionOptions = computed(() => {
  const opts = [{ value: '', label: '🏢 جميع الشعب' }];
  for (const g of grades.value) {
    if (g.sections) {
      for (const sec of g.sections) {
        opts.push({ value: sec.id, label: `${g.name} - الشعبة ${sec.name}` });
      }
    }
  }
  return opts;
});

const scheduleSectionOptions = computed(() => {
  const opts = [{ value: '', label: '🏫 جميع الشعب (جدول اليوم الحالي)' }];
  for (const g of grades.value) {
    if (g.sections) {
      for (const sec of g.sections) {
        opts.push({ value: sec.id, label: `${g.name} - الشعبة ${sec.name}` });
      }
    }
  }
  return opts;
});

const availableSectionsForNewStudentOptions = computed(() => 
  availableSectionsForNewStudent.value.map(sec => ({ value: sec.id, label: sec.name }))
);

const studentTransferOptions = computed(() => 
  students.value.map(st => ({ 
    value: st.id, 
    label: `${st.full_name} (كود: ${st.student_code} - ${st.grade_name || ''})` 
  }))
);

const availableSectionsForTransferOptions = computed(() => 
  availableSectionsForTransfer.value.map(sec => ({ value: sec.id, label: sec.name }))
);

const availableSectionsForEditOptions = computed(() => 
  availableSectionsForEdit.value.map(sec => ({ value: sec.id, label: sec.name }))
);

const teacherModalOptions = computed(() => 
  teachers.value.map(t => ({ value: t.id, label: t.full_name }))
);

const availableSubjectsForAssignOptions = computed(() => 
  availableSubjectsForAssign.value.map(s => ({ value: s.id, label: s.name }))
);

const availableSectionsForAssignOptions = computed(() => 
  availableSectionsForAssign.value.map(s => ({ value: s.id, label: s.name }))
);

const selectedScheduleSectionObj = computed(() => {
  if (!selectedScheduleSectionId.value) return null;
  for (const g of grades.value) {
    if (g.sections) {
      const found = g.sections.find(s => Number(s.id) === Number(selectedScheduleSectionId.value));
      if (found) return { section: found, grade: g };
    }
  }
  return null;
});

const allSectionsDailySchedule = computed(() => {
  const result = [];
  const sortedGrades = [...grades.value].sort((a, b) => (a.level || 0) - (b.level || 0));
  
  for (const grade of sortedGrades) {
    if (grade.sections && grade.sections.length > 0) {
      for (const sec of grade.sections) {
        const slots = getSlotsForSectionAndDay(sec, grade, selectedScheduleDay.value);
        result.push({
          gradeId: grade.id,
          gradeName: grade.name,
          sectionId: sec.id,
          sectionName: sec.name,
          slots
        });
      }
    } else {
      result.push({
        gradeId: grade.id,
        gradeName: grade.name,
        sectionId: null,
        sectionName: 'بدون شعبة',
        slots: Array.from({ length: 6 }, (_, i) => ({ period: i + 1, subject: '-', teacher: '-' }))
      });
    }
  }
  return result;
});

const dbScheduleSlots = ref([]);
const dayNameToNumMap = { 'الأحد': 1, 'الإثنين': 2, 'الثلاثاء': 3, 'الأربعاء': 4, 'الخميس': 5 };

function getSlotsForSectionAndDay(sec, grade, dayName) {
  if (!sec) return Array.from({ length: 6 }, (_, i) => ({ period: i + 1, subject: '-', teacher: '-' }));
  const dayNum = typeof dayName === 'number' ? dayName : (dayNameToNumMap[dayName] || 1);

  return [1, 2, 3, 4, 5, 6].map(period => {
    // 1. Check if real custom slot exists in DB
    const realDbSlot = dbScheduleSlots.value.find(s => 
      Number(s.section_id) === Number(sec.id) && 
      Number(s.day_of_week) === Number(dayNum) && 
      Number(s.slot_number) === Number(period)
    );

    if (realDbSlot) {
      return {
        id: realDbSlot.id,
        period,
        subject: realDbSlot.subject_name,
        subject_id: realDbSlot.subject_id,
        teacher: realDbSlot.teacher_name,
        teacher_id: realDbSlot.teacher_id,
        isCustom: true
      };
    }

    // 2. Default matrix fallback
    const secAssignments = assignments.value.filter(a => Number(a.section_id) === Number(sec.id));
    
    const defaultSubjects = [
      { period: 1, subject: 'الرياضيات', teacher: 'أ. أحمد خالد' },
      { period: 2, subject: 'العلوم العامة', teacher: 'أ. محمد طارق' },
      { period: 3, subject: 'اللغة العربية', teacher: 'أ. سالم الفيتوري' },
      { period: 4, subject: 'اللغة الإنجليزية', teacher: 'أ. عمر السيد' },
      { period: 5, subject: 'التربية الإسلامية', teacher: 'أ. سالم الفيتوري' },
      { period: 6, subject: 'الحاسوب والتقنية', teacher: 'أ. علي الحسن' }
    ];

    const dayShiftMap = { 'الأحد': 0, 'الإثنين': 1, 'الثلاثاء': 2, 'الأربعاء': 3, 'الخميس': 4, 1: 0, 2: 1, 3: 2, 4: 3, 5: 4 };
    const shift = (((sec.id || 1) * 2) + (dayShiftMap[dayName] || 0)) % 6;

    const defaultIdx = (period - 1 + shift) % defaultSubjects.length;
    const baseSlot = defaultSubjects[defaultIdx];
    
    const matchingAssign = secAssignments.find(a => a.subject_name === baseSlot.subject);
    const teacherName = matchingAssign ? matchingAssign.teacher_name : baseSlot.teacher;

    return {
      id: null,
      period,
      subject: baseSlot.subject,
      teacher: teacherName,
      isCustom: false
    };
  });
}

const stats = ref({
  totalStudents: 0,
  totalTeachers: 0,
  totalSections: 0,
  totalTasks: 0
});

const students = ref([]);
const teachers = ref([]);
const assignments = ref([]);
const grades = ref([]);

const selectedStudent = ref(null);
const selectedTeacher = ref(null);
const teacherSearchQuery = ref('');

const filteredTeachers = computed(() => {
  if (!teacherSearchQuery.value) return teachers.value;
  const q = teacherSearchQuery.value.toLowerCase();
  return teachers.value.filter(t => 
    t.full_name?.toLowerCase().includes(q) ||
    t.username?.toLowerCase().includes(q)
  );
});

const teacherAssignments = computed(() => {
  if (!selectedTeacher.value) return [];
  return assignments.value.filter(a => Number(a.teacher_id) === Number(selectedTeacher.value.id));
});

function getTeacherAssignmentCount(teacherId) {
  return assignments.value.filter(a => Number(a.teacher_id) === Number(teacherId)).length;
}

function openTeacherDetail(t) {
  selectedTeacher.value = t;
  activeModule.value = 'teacher-details';
}

function openAssignForTeacher(t) {
  newAssign.teacher_id = t.id;
  showAddAssignModal.value = true;
}

const gradeStudents = computed(() => {
  if (!selectedGrade.value) return [];
  return students.value.filter(st => Number(st.grade_id) === Number(selectedGrade.value.id));
});

const gradeSections = computed(() => {
  if (!selectedGrade.value) return [];
  return selectedGrade.value.sections || [];
});

const gradeSubjects = computed(() => {
  if (!selectedGrade.value) return [];
  return selectedGrade.value.subjects || [];
});

function openGradeDetail(grade) {
  selectedGrade.value = grade;
  activeModule.value = 'grade-details';
}

const currentFormattedDate = computed(() => {
  const now = new Date();
  return now.toLocaleDateString('ar-EG', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
});

const dailyAnalytics = computed(() => {
  const sTotal = stats.value.totalStudents || 1450;
  const sRate = 96;
  const sPresent = Math.round(sTotal * (sRate / 100));
  const sAbsent = sTotal - sPresent;

  const tTotal = stats.value.totalTeachers || 42;
  const tRate = 95;
  const tPresent = Math.round(tTotal * (tRate / 100));
  const tAbsent = tTotal - tPresent;

  return {
    studentsTotal: sTotal,
    studentsPresent: sPresent,
    studentsAbsent: sAbsent,
    studentsRate: sRate,

    teachersTotal: tTotal,
    teachersPresent: tPresent,
    teachersAbsent: tAbsent,
    teachersRate: tRate,

    totalHomeworks: 28,
    activeHomeworks: 18,
    homeworkComplianceRate: 92,

    totalExams: 14,
    todayExams: 3,
    upcomingExams: 11
  };
});

const gradeAttendanceBreakdown = computed(() => {
  const rates = [98, 97, 96, 95, 97, 94, 96, 95, 98];
  return grades.value.map((g, idx) => {
    const baseCount = (g.sections && g.sections.length > 0 ? g.sections.length : 1) * 30;
    const rate = rates[idx % rates.length];
    const present = Math.round(baseCount * (rate / 100));
    const absent = baseCount - present;
    return {
      gradeName: g.name,
      level: g.level,
      rate,
      present,
      absent,
      total: baseCount
    };
  });
});

function printAnalyticsReport() {
  window.print();
}

const showTransferStudentModal = ref(false);
const showEditStudentModal = ref(false);

const studentSearchQuery = ref('');
const studentGradeFilter = ref('');
const studentSectionFilter = ref('');

const transferForm = reactive({
  student_id: '',
  grade_id: '',
  section_id: ''
});

const editStudentForm = reactive({
  id: '',
  full_name: '',
  roll_number: '',
  student_code: '',
  grade_id: '',
  section_id: ''
});

const filteredStudents = computed(() => {
  return students.value.filter(st => {
    const matchesSearch = !studentSearchQuery.value || 
      st.full_name?.toLowerCase().includes(studentSearchQuery.value.toLowerCase()) ||
      st.student_code?.toLowerCase().includes(studentSearchQuery.value.toLowerCase()) ||
      st.roll_number?.toString().includes(studentSearchQuery.value);

    const matchesGrade = !studentGradeFilter.value || Number(st.grade_id) === Number(studentGradeFilter.value);
    const matchesSection = !studentSectionFilter.value || Number(st.section_id) === Number(studentSectionFilter.value);

    return matchesSearch && matchesGrade && matchesSection;
  });
});

const availableSectionsForTransfer = computed(() => {
  if (!transferForm.grade_id) return [];
  const g = grades.value.find(gr => Number(gr.id) === Number(transferForm.grade_id));
  return g ? g.sections : [];
});

const availableSectionsForEdit = computed(() => {
  if (!editStudentForm.grade_id) return [];
  const g = grades.value.find(gr => Number(gr.id) === Number(editStudentForm.grade_id));
  return g ? g.sections : [];
});

const isDrawerOpen = ref(false);
const selectedTask = ref(null);

const isSectionDrawerOpen = ref(false);
const selectedSection = ref(null);
const selectedGrade = ref(null);
const activeSectionTab = ref('schedule'); // Default tab: الجدول الدراسي

const sectionStudents = computed(() => {
  if (!selectedSection.value) return [];
  return students.value.filter(st => Number(st.section_id) === Number(selectedSection.value.id));
});

const sectionTeachers = computed(() => {
  if (!selectedSection.value) return [];
  return assignments.value.filter(a => Number(a.section_id) === Number(selectedSection.value.id));
});

const sectionScheduleDays = computed(() => {
  return [
    {
      dayName: 'الأحد',
      slots: [
        { period: 1, subject: 'الرياضيات', teacher: 'أ. أحمد خالد' },
        { period: 2, subject: 'العلوم العامة', teacher: 'أ. محمد طارق' },
        { period: 3, subject: 'اللغة العربية', teacher: 'أ. سالم الفيتوري' },
        { period: 4, subject: 'اللغة الإنجليزية', teacher: 'أ. عمر السيد' },
        { period: 5, subject: 'التربية الإسلامية', teacher: 'أ. سالم الفيتوري' },
        { period: 6, subject: 'الحاسوب', teacher: 'أ. علي الحسن' }
      ]
    },
    {
      dayName: 'الإثنين',
      slots: [
        { period: 1, subject: 'اللغة الإنجليزية', teacher: 'أ. عمر السيد' },
        { period: 2, subject: 'الرياضيات', teacher: 'أ. أحمد خالد' },
        { period: 3, subject: 'التربية الإسلامية', teacher: 'أ. سالم الفيتوري' },
        { period: 4, subject: 'العلوم العامة', teacher: 'أ. محمد طارق' },
        { period: 5, subject: 'الدراسات الاجتماعية', teacher: 'أ. خالد سعيد' },
        { period: 6, subject: 'التربية البدنية', teacher: 'أ. محمود طه' }
      ]
    },
    {
      dayName: 'الثلاثاء',
      slots: [
        { period: 1, subject: 'العلوم العامة', teacher: 'أ. محمد طارق' },
        { period: 2, subject: 'الحاسوب', teacher: 'أ. علي الحسن' },
        { period: 3, subject: 'الرياضيات', teacher: 'أ. أحمد خالد' },
        { period: 4, subject: 'اللغة العربية', teacher: 'أ. سالم الفيتوري' },
        { period: 5, subject: 'اللغة الإنجليزية', teacher: 'أ. عمر السيد' },
        { period: 6, subject: 'التربية الفنية', teacher: 'أ. سعاد النجار' }
      ]
    },
    {
      dayName: 'الأربعاء',
      slots: [
        { period: 1, subject: 'اللغة العربية', teacher: 'أ. سالم الفيتوري' },
        { period: 2, subject: 'اللغة الإنجليزية', teacher: 'أ. عمر السيد' },
        { period: 3, subject: 'الدراسات الاجتماعية', teacher: 'أ. خالد سعيد' },
        { period: 4, subject: 'الرياضيات', teacher: 'أ. أحمد خالد' },
        { period: 5, subject: 'العلوم العامة', teacher: 'أ. محمد طارق' },
        { period: 6, subject: 'التربية الإسلامية', teacher: 'أ. سالم الفيتوري' }
      ]
    },
    {
      dayName: 'الخميس',
      slots: [
        { period: 1, subject: 'الرياضيات', teacher: 'أ. أحمد خالد' },
        { period: 2, subject: 'العلوم العامة', teacher: 'أ. محمد طارق' },
        { period: 3, subject: 'اللغة العربية', teacher: 'أ. سالم الفيتوري' },
        { period: 4, subject: 'اللغة الإنجليزية', teacher: 'أ. عمر السيد' },
        { period: 5, subject: 'الحاسوب', teacher: 'أ. علي الحسن' },
        { period: 6, subject: 'نشاط حر', teacher: 'أستاذ المادة' }
      ]
    }
  ];
});

function openSectionDetailModal(section, grade) {
  selectedSection.value = section;
  selectedGrade.value = grade;
  activeSectionTab.value = 'schedule'; // Default tab: الجدول الدراسي (الافتراضية)
  activeModule.value = 'section-details'; // Open as Full Page View!
}

const showAddStudentModal = ref(false);
const showAddTeacherModal = ref(false);
const showAddAssignModal = ref(false);
const showAddSectionModal = ref(false);
const showAddSubjectModal = ref(false);

const showEditSlotModal = ref(false);
const slotModalForm = reactive({
  id: null,
  section_id: null,
  section_name: '',
  grade_id: null,
  grade_name: '',
  day_of_week: 1,
  day_name: '',
  slot_number: 1,
  subject_id: '',
  teacher_id: ''
});

const availableSubjectsForSlotOptions = computed(() => {
  if (!slotModalForm.grade_id) {
    // Return all subjects if grade_id is not specified
    const allSubs = [];
    for (const g of grades.value) {
      if (g.subjects) {
        for (const s of g.subjects) {
          allSubs.push({ value: s.id, label: `${s.name} (${g.name})` });
        }
      }
    }
    return allSubs;
  }
  const g = grades.value.find(gr => Number(gr.id) === Number(slotModalForm.grade_id));
  if (!g || !g.subjects) return [];
  return g.subjects.map(s => ({ value: s.id, label: s.name }));
});

function openEditSlotModal(section, grade, dayNameOrNum, slot) {
  if (!section || !section.id) {
    alert('يرجى تحديد شعبة أولاً لتعديل جدولها.');
    return;
  }
  const dayNum = typeof dayNameOrNum === 'number' ? dayNameOrNum : (dayNameToNumMap[dayNameOrNum] || 1);
  const dayNames = { 1: 'الأحد', 2: 'الإثنين', 3: 'الثلاثاء', 4: 'الأربعاء', 5: 'الخميس' };
  
  slotModalForm.id = slot.id || null;
  slotModalForm.section_id = section.id;
  slotModalForm.section_name = section.name;
  slotModalForm.grade_id = grade ? grade.id : null;
  slotModalForm.grade_name = grade ? grade.name : '';
  slotModalForm.day_of_week = dayNum;
  slotModalForm.day_name = dayNames[dayNum] || dayNameOrNum;
  slotModalForm.slot_number = slot.period;
  slotModalForm.subject_id = slot.subject_id || '';
  slotModalForm.teacher_id = slot.teacher_id || '';

  showEditSlotModal.value = true;
}

async function handleSaveSlot() {
  if (!slotModalForm.subject_id || !slotModalForm.teacher_id) {
    alert('يرجى اختيار المادة الدراسية والمعلم المكلف.');
    return;
  }
  try {
    await api.post('/admin/schedule', {
      section_id: slotModalForm.section_id,
      day_of_week: slotModalForm.day_of_week,
      slot_number: slotModalForm.slot_number,
      subject_id: slotModalForm.subject_id,
      teacher_id: slotModalForm.teacher_id
    });
    showEditSlotModal.value = false;
    await loadData();
  } catch (err) {
    alert('فشل حفظ وتخصيص الحصة بالجدول.');
  }
}

async function handleDeleteSlot() {
  if (!confirm('هل أنت تأكد من تفريغ هذه الحصة من الجدول؟')) return;
  try {
    let targetSlotId = slotModalForm.id;
    if (!targetSlotId) {
      const existing = dbScheduleSlots.value.find(s => 
        Number(s.section_id) === Number(slotModalForm.section_id) && 
        Number(s.day_of_week) === Number(slotModalForm.day_of_week) && 
        Number(s.slot_number) === Number(slotModalForm.slot_number)
      );
      if (existing) targetSlotId = existing.id;
    }

    if (targetSlotId) {
      await api.delete(`/admin/schedule/${targetSlotId}`);
    }
    showEditSlotModal.value = false;
    await loadData();
  } catch (err) {
    alert('فشل تفريغ الحصة.');
  }
}

const selectedGradeForModal = ref(null);

const newGradeForm = reactive({
  name: '',
  level: null
});

const newSectionForm = reactive({
  grade_id: '',
  name: ''
});

const newSubjectForm = reactive({
  grade_id: '',
  name: ''
});

const newStudent = reactive({
  full_name: '',
  roll_number: '',
  student_code: '',
  grade_id: '',
  section_id: ''
});

async function handleCreateGradeFromPage() {
  if (!newGradeForm.name || !newGradeForm.level) {
    alert('يرجى إدخال اسم الصف ورقم المستوى.');
    return;
  }
  try {
    const res = await api.post('/admin/grades', newGradeForm);
    if (res.data.success) {
      alert('✅ تم إضافة الفصل الدراسي بنجاح!');
      newGradeForm.name = '';
      newGradeForm.level = null;
      await fetchDashboardData();
    }
  } catch (err) {
    console.error(err);
    alert(err.response?.data?.message || 'حدث خطأ في إضافة الصف.');
  }
}

async function handleCreateSectionFromPage() {
  if (!newSectionForm.grade_id || !newSectionForm.name) {
    alert('يرجى اختيار الصف ورقم الشعبة.');
    return;
  }
  try {
    const res = await api.post('/admin/sections', newSectionForm);
    if (res.data.success) {
      alert('✅ تم إضافة الشعبة بنجاح!');
      newSectionForm.grade_id = '';
      newSectionForm.name = '';
      await fetchDashboardData();
    }
  } catch (err) {
    console.error(err);
    alert(err.response?.data?.message || 'حدث خطأ في إضافة الشعبة.');
  }
}

async function handleCreateSubjectFromPage() {
  if (!newSubjectForm.grade_id || !newSubjectForm.name) {
    alert('يرجى اختيار الصف واسم المادة.');
    return;
  }
  try {
    const res = await api.post('/admin/subjects', newSubjectForm);
    if (res.data.success) {
      alert('✅ تم إضافة المادة الدراسية بنجاح!');
      newSubjectForm.grade_id = '';
      newSubjectForm.name = '';
      await fetchDashboardData();
    }
  } catch (err) {
    console.error(err);
    alert(err.response?.data?.message || 'حدث خطأ في إضافة المادة.');
  }
}

const newTeacher = reactive({
  full_name: '',
  username: '',
  password: ''
});

const newAssign = reactive({
  teacher_id: '',
  grade_id: '',
  subject_id: '',
  section_id: ''
});

const newSectionName = ref('');
const newSubjectName = ref('');

const sampleTasks = [
  {
    id: 1,
    title: 'امتحان العلوم الشهري (فيزياء وكيمياء)',
    task_type: 'EXAM',
    subject_name: 'العلوم العامة',
    grade_name: 'الصف الثامن',
    section_name: '8أ',
    teacher_name: 'أ. أحمد خالد',
    due_date: '2026-08-16',
    description: 'اختبار تقييمي تحصيلي يغطي تجارب التبخر والدورة الحرارية.'
  },
  {
    id: 2,
    title: 'تمارين ص 45 (معادلات الجبر)',
    task_type: 'HOMEWORK',
    subject_name: 'الرياضيات',
    grade_name: 'الصف الثامن',
    section_name: '8أ',
    teacher_name: 'أ. أحمد خالد',
    due_date: '2026-08-16',
    description: 'حل تمارين معادلات الدرجة الأولى وتثبيت النتائج بالكراسة.'
  },
  {
    id: 3,
    title: 'إعراب سورة النبأ (الأيات 1-10)',
    task_type: 'HOMEWORK',
    subject_name: 'اللغة العربية',
    grade_name: 'الصف التاسع',
    section_name: '9ب',
    teacher_name: 'أ. سالم الفيتوري',
    due_date: '2026-08-19',
    description: 'استخراج الفاعل والمفعول به والقواعد الإعرابية المقررة.'
  },
  {
    id: 4,
    title: 'امتحان الرياضيات النصف سنوي',
    task_type: 'EXAM',
    subject_name: 'الرياضيات',
    grade_name: 'الصف الثامن',
    section_name: '8أ',
    teacher_name: 'أ. أحمد خالد',
    due_date: '2026-08-19',
    description: 'امتحان النصف سنوي الشامل لأسئلة الهندسية والجبر.'
  }
];

const activityLogs = [
  { id: 1, title: 'قام أ. أحمد خالد بنشر واجب رياضيات جديد للصف الثامن (8أ)', time: 'منذ 15 دقيقة', icon: '📚', typeClass: 'purple' },
  { id: 2, title: 'تم إدراج الطالب "عمر خالد" للصف الخامس الشعبة (5أ)', time: 'منذ ساعة واحدة', icon: '🎓', typeClass: 'emerald' },
  { id: 3, title: 'قام أ. سالم الفيتوري بجدولة امتحان اللغة العربية للصف التاسع (9ب)', time: 'منذ 3 ساعات', icon: '📝', typeClass: 'amber' },
  { id: 4, title: 'تم تحديث جدول التكليفات الأسبوعية لكادر المعلمين', time: 'اليوم 09:30 ص', icon: '⚙️', typeClass: 'indigo' }
];

const availableSectionsForNewStudent = computed(() => {
  if (!newStudent.grade_id) return [];
  const g = grades.value.find(gr => gr.id === Number(newStudent.grade_id));
  return g ? g.sections : [];
});

const availableSubjectsForAssign = computed(() => {
  if (!newAssign.grade_id) return [];
  const g = grades.value.find(gr => gr.id === Number(newAssign.grade_id));
  return g ? g.subjects : [];
});

const availableSectionsForAssign = computed(() => {
  if (!newAssign.grade_id) return [];
  const g = grades.value.find(gr => gr.id === Number(newAssign.grade_id));
  return g ? g.sections : [];
});

const groupedTasks = computed(() => {
  const groupsMap = {};
  sampleTasks.forEach(task => {
    const dateKey = task.due_date;
    if (!groupsMap[dateKey]) groupsMap[dateKey] = [];
    groupsMap[dateKey].push(task);
  });

  const sortedDates = Object.keys(groupsMap).sort();

  return sortedDates.map((dateKey, idx) => {
    const info = getDayInfo(dateKey);
    return {
      index: idx + 1,
      dateKey,
      dayName: info.dayName,
      dateFormatted: info.dateFormatted,
      tasks: groupsMap[dateKey]
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

function getSubjectColorClass(name) {
  if (!name) return 'default';
  if (name.includes('رياضيات') || name.includes('إحصاء')) return 'math';
  if (name.includes('علوم') || name.includes('فيزياء') || name.includes('كيمياء')) return 'science';
  if (name.includes('عرب') || name.includes('نحو')) return 'arabic';
  if (name.includes('إنكليز') || name.includes('إنجليزية') || name.includes('English')) return 'english';
  return 'default';
}

function getSubjectIcon(name) {
  if (!name) return '📚';
  if (name.includes('رياضيات') || name.includes('إحصاء')) return '📐';
  if (name.includes('علوم') || name.includes('فيزياء') || name.includes('كيمياء')) return '🔬';
  if (name.includes('عرب') || name.includes('نحو')) return '📖';
  if (name.includes('إنكليز') || name.includes('إنجليزية') || name.includes('English')) return '🔤';
  if (name.includes('إسلامية') || name.includes('قرآن') || name.includes('تفسير')) return '🕌';
  return '📚';
}

function getTaskIcon(type) {
  return type === 'EXAM' ? '📝' : '📚';
}

function openTaskDrawer(task) {
  selectedTask.value = task;
  isDrawerOpen.value = true;
}

async function loadData() {
  loading.value = true;
  try {
    const [stRes, tcRes, asRes, grRes, sttRes, scRes] = await Promise.all([
      api.get('/admin/students'),
      api.get('/admin/teachers'),
      api.get('/admin/assignments'),
      api.get('/admin/grades'),
      api.get('/admin/stats'),
      api.get('/admin/schedule').catch(() => ({ data: { success: false } }))
    ]);

    if (stRes.data.success) students.value = stRes.data.data;
    if (tcRes.data.success) teachers.value = tcRes.data.data;
    if (asRes.data.success) assignments.value = asRes.data.data;
    if (grRes.data.success) grades.value = grRes.data.data;
    if (sttRes.data.success) stats.value = sttRes.data.stats || sttRes.data.data;
    if (scRes.data && scRes.data.success) dbScheduleSlots.value = scRes.data.data;
  } catch (err) {
    console.error('Failed to load admin DB data:', err);
  } finally {
    loading.value = false;
  }
}

function openStudentDetail(st) {
  selectedStudent.value = st;
  activeModule.value = 'student-details';
}

function openTransferStudentModal(st = null) {
  if (st) {
    transferForm.student_id = st.id;
    transferForm.grade_id = st.grade_id || '';
    transferForm.section_id = st.section_id || '';
  } else {
    transferForm.student_id = '';
    transferForm.grade_id = '';
    transferForm.section_id = '';
  }
  showTransferStudentModal.value = true;
}

function openEditStudentModal(st) {
  editStudentForm.id = st.id;
  editStudentForm.full_name = st.full_name || '';
  editStudentForm.roll_number = st.roll_number || '';
  editStudentForm.student_code = st.student_code || '';
  editStudentForm.grade_id = st.grade_id || '';
  editStudentForm.section_id = st.section_id || '';
  showEditStudentModal.value = true;
}

async function handleTransferStudent() {
  if (!transferForm.student_id || !transferForm.grade_id || !transferForm.section_id) {
    alert('يرجى اختيار الطالب، الصف الجديد، والشعبة الجديدة.');
    return;
  }

  const targetStudent = students.value.find(s => Number(s.id) === Number(transferForm.student_id));
  if (!targetStudent) return;

  try {
    const res = await api.put(`/admin/students/${transferForm.student_id}`, {
      full_name: targetStudent.full_name,
      roll_number: targetStudent.roll_number,
      student_code: targetStudent.student_code,
      grade_id: transferForm.grade_id,
      section_id: transferForm.section_id
    });

    if (res.data.success) {
      alert('✅ تم نقل الطالب إلى الفصل والشعبة الجديدة بنجاح!');
      showTransferStudentModal.value = false;
      await loadData();
      if (selectedStudent.value && selectedStudent.value.id === targetStudent.id) {
        const updated = students.value.find(s => s.id === targetStudent.id);
        if (updated) selectedStudent.value = updated;
      }
    }
  } catch (err) {
    console.error(err);
    alert(err.response?.data?.message || 'حدث خطأ أثناء نقل الطالب.');
  }
}

async function handleUpdateStudent() {
  if (!editStudentForm.id || !editStudentForm.full_name || !editStudentForm.roll_number || !editStudentForm.student_code) {
    alert('يرجى تعبئة كامل بيانات الطالب.');
    return;
  }

  try {
    const res = await api.put(`/admin/students/${editStudentForm.id}`, editStudentForm);
    if (res.data.success) {
      alert('✅ تم تحديث بيانات الطالب بنجاح!');
      showEditStudentModal.value = false;
      await loadData();
      if (selectedStudent.value && selectedStudent.value.id === editStudentForm.id) {
        const updated = students.value.find(s => s.id === editStudentForm.id);
        if (updated) selectedStudent.value = updated;
      }
    }
  } catch (err) {
    console.error(err);
    alert(err.response?.data?.message || 'حدث خطأ أثناء تحديث بيانات الطالب.');
  }
}

async function handleAddStudent() {
  try {
    await api.post('/admin/students', newStudent);
    showAddStudentModal.value = false;
    newStudent.full_name = '';
    newStudent.roll_number = '';
    newStudent.student_code = '';
    await loadData();
  } catch (err) {
    alert('فشل إضافة الطالب. تأكد من رقم الجلوس والكود.');
  }
}

async function handleDeleteStudent(id) {
  if (!confirm('هل أنت تأكد من رغبتك في حذف هذا الطالب؟')) return;
  try {
    await api.delete(`/admin/students/${id}`);
    await loadData();
    if (selectedStudent.value && selectedStudent.value.id === id) {
      selectedStudent.value = null;
      activeModule.value = 'students';
    }
  } catch (err) {
    alert('فشل حذف الطالب.');
  }
}

async function handleAddTeacher() {
  try {
    await api.post('/admin/teachers', newTeacher);
    showAddTeacherModal.value = false;
    newTeacher.full_name = '';
    newTeacher.username = '';
    newTeacher.password = '';
    await loadData();
  } catch (err) {
    alert('فشل إضافة معلم. اسم المستخدم مستخدم مسبقاً.');
  }
}

async function handleDeleteTeacher(id) {
  if (!confirm('هل أنت تأكد من رغبتك في حذف المعلم؟')) return;
  try {
    await api.delete(`/admin/teachers/${id}`);
    await loadData();
    if (selectedTeacher.value && selectedTeacher.value.id === id) {
      selectedTeacher.value = null;
      activeModule.value = 'teachers';
    }
  } catch (err) {
    alert('فشل حذف المعلم.');
  }
}

async function handleAddAssign() {
  try {
    await api.post('/admin/assignments', newAssign);
    showAddAssignModal.value = false;
    await loadData();
  } catch (err) {
    alert('فشل التكليف.');
  }
}

async function handleDeleteAssign(id) {
  if (!confirm('هل أنت تأكد من إزالة التكليف؟')) return;
  try {
    await api.delete(`/admin/assignments/${id}`);
    await loadData();
  } catch (err) {
    alert('فشل حذف التكليف.');
  }
}

function openAddSectionModal(grade) {
  selectedGradeForModal.value = grade;
  newSectionName.value = '';
  showAddSectionModal.value = true;
}

async function handleAddSection() {
  if (!selectedGradeForModal.value || !newSectionName.value) return;
  try {
    await api.post('/admin/sections', {
      grade_id: selectedGradeForModal.value.id,
      name: newSectionName.value
    });
    showAddSectionModal.value = false;
    await loadData();
  } catch (err) {
    alert('فشل إضافة الشعبة.');
  }
}

async function handleDeleteSection(id) {
  if (!confirm('هل أنت تأكد من حذف الشعبة؟')) return;
  try {
    await api.delete(`/admin/sections/${id}`);
    await loadData();
  } catch (err) {
    alert('فشل حذف الشعبة.');
  }
}

function openAddSubjectModal(grade) {
  selectedGradeForModal.value = grade;
  newSubjectName.value = '';
  showAddSubjectModal.value = true;
}

async function handleAddSubject() {
  if (!selectedGradeForModal.value || !newSubjectName.value) return;
  try {
    await api.post('/admin/subjects', {
      grade_id: selectedGradeForModal.value.id,
      name: newSubjectName.value
    });
    showAddSubjectModal.value = false;
    await loadData();
  } catch (err) {
    alert('فشل إضافة المادة.');
  }
}

async function handleDeleteSubject(id) {
  if (!confirm('هل أنت تأكد من حذف المادة؟')) return;
  try {
    await api.delete(`/admin/subjects/${id}`);
    await loadData();
  } catch (err) {
    alert('فشل حذف المادة.');
  }
}

function handleLogout() {
  localStorage.removeItem('school_token');
  localStorage.removeItem('school_user');
  router.push('/login');
}

onMounted(async () => {
  await loadData();
});
</script>

<style scoped src="./AdminDashboardView.css"></style>
