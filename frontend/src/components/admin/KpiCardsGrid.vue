<template>
  <div class="analytics-cards-grid-3d">
    <!-- Card 1: Student Attendance -->
    <div class="card-3d-box student-theme animate-fade-in">
      <div class="card-3d-header flex-between">
        <h4 class="card-3d-title">حضور وغياب الطلاب</h4>
        <div class="card-3d-icon-pill emerald">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
            <path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5"/>
          </svg>
        </div>
      </div>
      <div class="card-3d-body flex-between">
        <div class="card-3d-img-container">
          <img src="/assets/student_attendance_3d.png" alt="طلاب" class="card-3d-render-img" />
          <div class="card-3d-shadow-ellipse"></div>
        </div>
        <div class="card-3d-stats">
          <div class="card-3d-num">{{ stats.totalStudents || 0 }}</div>
          <div class="card-3d-unit">طالب مقيد</div>
        </div>
      </div>
      <div class="card-3d-progress-track">
        <div class="card-3d-progress-fill emerald-gradient" style="width: 96%"></div>
      </div>
      <div class="card-3d-footer flex-between">
        <span class="badge-status-dot green"><span class="dot green"></span> الحضور {{ stats.totalStudents || 0 }}</span>
        <span class="badge-status-dot red"><span class="dot red"></span> الغياب 0</span>
      </div>
    </div>

    <!-- Card 2: Teacher Attendance -->
    <div class="card-3d-box teacher-theme animate-fade-in">
      <div class="card-3d-header flex-between">
        <h4 class="card-3d-title">الكادر التعليمي والمعلمون</h4>
        <div class="card-3d-icon-pill emerald">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
            <circle cx="9" cy="7" r="4"/>
            <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
            <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
          </svg>
        </div>
      </div>
      <div class="card-3d-body flex-between">
        <div class="card-3d-img-container">
          <img src="/assets/teacher_attendance_3d.png" alt="معلمون" class="card-3d-render-img" />
          <div class="card-3d-shadow-ellipse"></div>
        </div>
        <div class="card-3d-stats">
          <div class="card-3d-num">{{ stats.totalTeachers || 0 }}</div>
          <div class="card-3d-unit">معلم ومعلمة</div>
        </div>
      </div>
      <div class="card-3d-progress-track">
        <div class="card-3d-progress-fill emerald-gradient" style="width: 100%"></div>
      </div>
      <div class="card-3d-footer flex-between">
        <span class="badge-status-dot green"><span class="dot green"></span> الحضور {{ stats.totalTeachers || 0 }}</span>
        <span class="badge-status-dot gray"><span class="dot gray"></span> الغياب 0</span>
      </div>
    </div>

    <!-- Card 3: Homework & Assignments -->
    <div class="card-3d-box homework-theme animate-fade-in">
      <div class="card-3d-header flex-between">
        <h4 class="card-3d-title">الواجبات والتكليفات</h4>
        <div class="card-3d-icon-pill purple">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
            <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
          </svg>
        </div>
      </div>
      <div class="card-3d-body flex-between">
        <div class="card-3d-img-container">
          <img src="/assets/homework_assignments_3d.png" alt="واجبات" class="card-3d-render-img" />
          <div class="card-3d-shadow-ellipse purple-shadow"></div>
        </div>
        <div class="card-3d-stats">
          <div class="card-3d-num">{{ stats.totalTasks || 0 }}</div>
          <div class="card-3d-unit">واجب منشور</div>
        </div>
      </div>
      <div class="card-3d-progress-track">
        <div class="card-3d-progress-fill purple-gradient" style="width: 88%"></div>
      </div>
      <div class="card-3d-footer flex-between">
        <span class="badge-status-purple-pill">الفصول: {{ stats.totalSections || 0 }}</span>
        <span class="footer-muted-text">إجمالي المهام: {{ stats.totalTasks || 0 }}</span>
      </div>
    </div>

    <!-- Card 4: Exams & Evaluations -->
    <div class="card-3d-box exam-theme animate-fade-in">
      <div class="card-3d-header flex-between">
        <h4 class="card-3d-title">الامتحانات والتقييمات</h4>
        <div class="card-3d-icon-pill amber">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
            <line x1="16" y1="2" x2="16" y2="6"/>
            <line x1="8" y1="2" x2="8" y2="6"/>
            <line x1="3" y1="10" x2="21" y2="10"/>
          </svg>
        </div>
      </div>
      <div class="card-3d-body flex-between">
        <div class="card-3d-img-container">
          <img src="/assets/exams_evaluations_3d.png" alt="امتحانات" class="card-3d-render-img" />
          <div class="card-3d-shadow-ellipse amber-shadow"></div>
        </div>
        <div class="card-3d-stats">
          <div class="card-3d-num">{{ stats.totalTasks || 0 }}</div>
          <div class="card-3d-unit">امتحان مجدول</div>
        </div>
      </div>
      <div class="card-3d-progress-track">
        <div class="card-3d-progress-fill amber-gradient" style="width: 75%"></div>
      </div>
      <div class="card-3d-footer flex-between">
        <span class="footer-muted-text">العام الدراسي: 2025/2026</span>
        <span class="footer-clock-pill flex-align-center" style="gap: 4px;">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10"/>
            <polyline points="12 6 12 12 16 14"/>
          </svg>
          <span>مفعل</span>
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  stats: {
    type: Object,
    default: () => ({
      totalStudents: 0,
      totalTeachers: 0,
      totalSections: 0,
      totalTasks: 0
    })
  }
});
</script>

<style scoped>
/* Scoped overrides if needed, primary styles inherited from admin-design.css */
.card-3d-box {
  cursor: default;
}
</style>
