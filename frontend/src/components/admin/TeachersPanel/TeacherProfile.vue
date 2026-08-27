<template>
  <div class="profile-container animate-fade-in">
    <!-- Top Navigation & Actions Bar -->
    <div class="top-nav-row">
      <div class="top-right-group">
        <button class="back-nav-btn" @click="$emit('back')">
          <span>←</span>
          <span>العودة لقائمة المعلمين</span>
        </button>
        <h2 class="top-page-title">
          <span>👨‍🏫</span>
          <span>الملف الأكاديمي والمعطيات الفنية للمعلم</span>
        </h2>
        <p class="top-page-sub">عرض وتحديث بيانات المعلم، نصاب التدريس الفعلي، والفصول المسندة</p>
      </div>

      <div class="top-actions-group">
        <button class="btn-danger-action" @click="$emit('delete', teacher.id)" title="حذف المعلم">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="3 6 5 6 21 6"></polyline>
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
          </svg>
          <span>حذف حساب المعلم</span>
        </button>

        <button class="btn-secondary-action" @click="$emit('assign', teacher)">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
            <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
          </svg>
          <span>إسناد مادة وشعبة جديدة</span>
        </button>
      </div>
    </div>

    <!-- Hero Card Banner -->
    <div class="teacher-hero-card">
      <div class="hero-left-meta">
        <div class="teacher-avatar-large">
          <span>👨‍🏫</span>
        </div>
        <div class="teacher-meta-details">
          <h1 class="teacher-hero-name">{{ teacher.full_name }}</h1>
          <div class="teacher-sub-tags">
            <span class="user-tag">اسم المستخدم: <code>{{ teacher.username }}</code></span>
            <span class="dot-separator">•</span>
            <span class="status-active-badge">🟢 كادر تعليمي نشط</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 2-Column Info & Assignments Grid -->
    <div class="profile-info-grid">
      <!-- Card 1: Account Details -->
      <div class="info-card-box">
        <h3 class="info-card-title">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#4f46e5" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
          <span>بيانات الحساب الأكاديمي</span>
        </h3>

        <div class="info-details-list">
          <div class="detail-item-row">
            <span class="detail-label">الاسم الكامل:</span>
            <span class="detail-value"><strong>{{ teacher.full_name }}</strong></span>
          </div>
          <div class="detail-item-row">
            <span class="detail-label">اسم المستخدم (تسجيل الدخول):</span>
            <span class="detail-value"><code>{{ teacher.username }}</code></span>
          </div>
          <div class="detail-item-row">
            <span class="detail-label">الصفة / الدور:</span>
            <span class="detail-value">معلم / عضو الكادر التعليمي</span>
          </div>
          <div class="detail-item-row">
            <span class="detail-label">عدد الفصول والمواد المسندة:</span>
            <span class="detail-value">
              <span class="assign-count-pill">{{ teacherAssignments.length }} فصول ومواد</span>
            </span>
          </div>
        </div>
      </div>

      <!-- Card 2: Assignments Matrix for Teacher -->
      <div class="info-card-box">
        <h3 class="info-card-title">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#4f46e5" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
            <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
          </svg>
          <span>نصاب التكليفات المسندة للمعلم</span>
        </h3>

        <div v-if="teacherAssignments.length === 0" class="no-assignments-box">
          <span>⚠️</span>
          <span>لا توجد مواد مسندة لهذا المعلم حالياً. انقر على "إسناد مادة وشعبة جديدة".</span>
        </div>

        <div v-else class="assignments-list-mini">
          <div
            v-for="a in teacherAssignments"
            :key="a.assignment_id"
            class="assign-item-row"
          >
            <div class="assign-meta">
              <span class="grade-sec-pill">{{ a.grade_name }} - شعبة {{ a.section_name }}</span>
              <span class="subject-name-txt">📖 {{ a.subject_name }}</span>
            </div>

            <button class="remove-assign-btn" @click="$emit('remove-assignment', a.assignment_id)" title="إلغاء التكليف">
              ✕ إزالة
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  teacher: {
    type: Object,
    required: true
  },
  teacherAssignments: {
    type: Array,
    default: () => []
  }
});

defineEmits(['back', 'assign', 'delete', 'remove-assignment']);
</script>

<style scoped>
.profile-container {
  width: 100%;
  background: #ffffff;
  border-radius: var(--radius-xl);
  padding: 32px;
  border: 1px solid rgba(226, 232, 240, 0.9);
  box-shadow: var(--shadow-sm);
}

.top-nav-row {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 20px;
  margin-bottom: 24px;
  flex-wrap: wrap;
}

.top-right-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.back-nav-btn {
  background: #ffffff;
  color: var(--text-secondary);
  border: 1px solid #cbd5e1;
  padding: 6px 14px;
  border-radius: 10px;
  font-size: 12.5px;
  font-weight: 800;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  align-self: flex-start;
  transition: all 0.18s ease;
}

.back-nav-btn:hover {
  background: #f8fafc;
  transform: translateX(2px);
}

.top-page-title {
  font-size: 18px;
  font-weight: 800;
  color: var(--text-main);
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 0;
}

.top-page-sub {
  font-size: 12.5px;
  color: var(--text-muted);
  font-weight: 600;
  margin: 0;
}

.top-actions-group {
  display: flex;
  align-items: center;
  gap: 12px;
}

.btn-secondary-action {
  background: #ffffff;
  color: var(--primary);
  border: 1px solid #c7d2fe;
  padding: 10px 18px;
  border-radius: 14px;
  font-size: 13px;
  font-weight: 800;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  transition: all 0.18s ease;
}

.btn-secondary-action:hover {
  background: var(--primary-light);
}

.btn-danger-action {
  background: #fff1f2;
  color: #e11d48;
  border: 1px solid #fecaca;
  padding: 10px 18px;
  border-radius: 14px;
  font-size: 13px;
  font-weight: 800;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  transition: all 0.18s ease;
}

.btn-danger-action:hover {
  background: #be123c;
  color: #ffffff;
}

.teacher-hero-card {
  background: linear-gradient(135deg, #f8fafc 0%, #eef2ff 100%);
  border: 1px solid #e0e7ff;
  border-radius: 20px;
  padding: 24px;
  margin-bottom: 28px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.hero-left-meta {
  display: flex;
  align-items: center;
  gap: 16px;
}

.teacher-avatar-large {
  width: 56px;
  height: 56px;
  border-radius: 16px;
  background: var(--primary-light);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.8rem;
}

.teacher-hero-name {
  font-size: 22px;
  font-weight: 900;
  color: var(--text-main);
  margin-bottom: 4px;
}

.teacher-sub-tags {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 13px;
  color: var(--text-muted);
}

.user-tag code {
  background: #ffffff;
  padding: 2px 8px;
  border-radius: 6px;
  font-family: monospace;
  font-weight: 700;
}

.status-active-badge {
  background: #dcfce7;
  color: #15803d;
  padding: 3px 10px;
  border-radius: var(--radius-full);
  font-size: 12px;
  font-weight: 800;
}

.profile-info-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

@media (max-width: 768px) {
  .profile-info-grid {
    grid-template-columns: 1fr;
  }
}

.info-card-box {
  background: #f8fafc;
  border: 1px solid #f1f5f9;
  border-radius: 20px;
  padding: 22px 24px;
}

.info-card-title {
  font-size: 15.5px;
  font-weight: 800;
  color: var(--text-main);
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.info-details-list {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.detail-item-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 10px;
  border-bottom: 1px solid #f1f5f9;
  font-size: 13.5px;
}

.detail-item-row:last-child {
  border-bottom: none;
  padding-bottom: 0;
}

.detail-label {
  color: var(--text-muted);
  font-weight: 600;
}

.detail-value {
  font-weight: 700;
  color: var(--text-main);
}

.assign-count-pill {
  background: var(--primary-light);
  color: var(--primary);
  padding: 4px 12px;
  border-radius: var(--radius-full);
  font-size: 12px;
  font-weight: 800;
}

.no-assignments-box {
  background: #fffbeb;
  border: 1px solid #fef3c7;
  color: #92400e;
  padding: 14px;
  border-radius: 12px;
  font-size: 13px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.assignments-list-mini {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.assign-item-row {
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 10px 14px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.assign-meta {
  display: flex;
  align-items: center;
  gap: 10px;
}

.grade-sec-pill {
  background: #f1f5f9;
  color: #334155;
  padding: 3px 10px;
  border-radius: var(--radius-full);
  font-size: 12px;
  font-weight: 800;
}

.subject-name-txt {
  font-size: 13px;
  font-weight: 800;
  color: var(--text-main);
}

.remove-assign-btn {
  background: #fff1f2;
  color: #e11d48;
  border: none;
  padding: 4px 10px;
  border-radius: 8px;
  font-size: 12px;
  font-weight: 800;
  cursor: pointer;
  transition: background 0.15s ease;
}

.remove-assign-btn:hover {
  background: #fee2e2;
}
</style>
