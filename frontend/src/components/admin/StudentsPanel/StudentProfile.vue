<template>
  <div class="profile-container animate-fade-in">
    <!-- Back Button -->
    <button class="back-btn" @click="$emit('back')">
      <span>←</span>
      <span>العودة لسجل الطلاب</span>
    </button>

    <!-- Profile Header Flex -->
    <div class="profile-header-flex">
      <div class="profile-main-info">
        <h2 class="student-display-name">{{ student.full_name }}</h2>
        <div class="student-sub-meta">
          <span>كود الطالب: <code>{{ student.student_code }}</code></span>
          <span>•</span>
          <span>رقم الجلوس: <strong>{{ student.roll_number }}</strong></span>
        </div>
      </div>

      <!-- Actions Flex -->
      <div class="profile-actions-flex">
        <button class="btn-danger-action" @click="$emit('delete', student.id)" title="حذف الطالب">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="3 6 5 6 21 6"></polyline>
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
          </svg>
          <span>حذف الطالب</span>
        </button>

        <button class="btn-secondary-action" @click="$emit('transfer', student)">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="17 1 21 5 17 9"></polyline>
            <path d="M3 11V9a4 4 0 0 1 4-4h14"></path>
            <polyline points="7 23 3 19 7 15"></polyline>
            <path d="M21 13v2a4 4 0 0 1-4 4H3"></path>
          </svg>
          <span>نقل الطالب</span>
        </button>

        <button class="btn-primary-action" @click="$emit('edit', student)">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
          </svg>
          <span>تعديل البيانات</span>
        </button>
      </div>
    </div>

    <!-- 2-Column Info Grid -->
    <div class="profile-info-grid">
      <!-- Card 1: Academic Data -->
      <div class="info-card-box">
        <h3 class="info-card-title">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#4f46e5" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
            <path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5" />
          </svg>
          <span>البيانات الأكاديمية</span>
        </h3>
        <div class="info-details-list">
          <div class="detail-item-row">
            <span class="detail-label">الصف الدراسي:</span>
            <span class="detail-value">
              <span class="grade-pill-tag">{{ student.grade_name }}</span>
            </span>
          </div>
          <div class="detail-item-row">
            <span class="detail-label">الشعبة الدراسية:</span>
            <span class="detail-value">
              <span class="section-pill-tag">شعبة {{ student.section_name }}</span>
            </span>
          </div>
          <div class="detail-item-row">
            <span class="detail-label">حالة القيد:</span>
            <span class="detail-value">
              <span class="status-pill-emerald">🟢 مستمر / منتظم</span>
            </span>
          </div>
          <div class="detail-item-row">
            <span class="detail-label">العام الدراسي:</span>
            <span class="detail-value">2025 / 2026</span>
          </div>
        </div>
      </div>

      <!-- Card 2: Account & Access Credentials -->
      <div class="info-card-box">
        <h3 class="info-card-title">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#4f46e5" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
          <span>بيانات الدخول والحساب الطلابي</span>
        </h3>
        <div class="info-details-list">
          <div class="detail-item-row">
            <span class="detail-label">رقم الجلوس (اسم الدخول):</span>
            <span class="detail-value">
              <code>{{ student.roll_number }}</code>
            </span>
          </div>
          <div class="detail-item-row">
            <span class="detail-label">كود الطالب السري (كلمة المرور):</span>
            <span class="detail-value">
              <code>{{ student.student_code }}</code>
            </span>
          </div>
          <div class="detail-item-row">
            <span class="detail-label">الصلاحيات:</span>
            <span class="detail-value">طالب (بوابة الطالب التفاعلية)</span>
          </div>
          <div class="detail-item-row">
            <span class="detail-label">العزل الأمني (Isolation):</span>
            <span class="detail-value">شعبة {{ student.section_name }} حصراً</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  student: {
    type: Object,
    required: true
  }
});

defineEmits(['back', 'edit', 'transfer', 'delete']);
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

.back-btn {
  background: #ffffff;
  color: var(--primary);
  border: 1px solid #c7d2fe;
  padding: 8px 16px;
  border-radius: 12px;
  font-size: 13px;
  font-weight: 800;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 20px;
  transition: all 0.2s ease;
}

.back-btn:hover {
  background: var(--primary-light);
  transform: translateX(3px);
}

.profile-header-flex {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 20px;
  margin-bottom: 28px;
  flex-wrap: wrap;
}

.profile-main-info {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.student-display-name {
  font-size: 24px;
  font-weight: 900;
  color: var(--text-main);
  letter-spacing: -0.5px;
}

.student-sub-meta {
  font-size: 13px;
  color: var(--text-muted);
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 12px;
}

.student-sub-meta code {
  background: #f1f5f9;
  color: #334155;
  padding: 3px 8px;
  border-radius: 6px;
  font-family: monospace;
  font-weight: 700;
}

.profile-actions-flex {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
}

.btn-secondary-action {
  background: #ffffff;
  color: var(--primary);
  border: 1px solid #c7d2fe;
  padding: 10px 18px;
  border-radius: 12px;
  font-size: 13px;
  font-weight: 800;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  transition: all 0.2s ease;
}

.btn-secondary-action:hover {
  background: var(--primary-light);
}

.btn-danger-action {
  background: #fff1f2;
  color: #e11d48;
  border: 1px solid #fecaca;
  padding: 10px 18px;
  border-radius: 12px;
  font-size: 13px;
  font-weight: 800;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  transition: all 0.2s ease;
}

.btn-danger-action:hover {
  background: #be123c;
  color: #ffffff;
}

.btn-primary-action {
  background: var(--brand-gradient);
  color: #ffffff;
  border: none;
  padding: 10px 18px;
  border-radius: 12px;
  font-size: 13px;
  font-weight: 800;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  box-shadow: 0 4px 14px rgba(79, 70, 229, 0.25);
  transition: all 0.2s ease;
}

.btn-primary-action:hover {
  transform: translateY(-1px);
  box-shadow: 0 6px 18px rgba(79, 70, 229, 0.35);
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

.grade-pill-tag {
  background: var(--primary-light);
  color: var(--primary);
  padding: 4px 12px;
  border-radius: var(--radius-full);
  font-size: 12px;
  font-weight: 800;
}

.section-pill-tag {
  background: #f1f5f9;
  color: #334155;
  padding: 4px 12px;
  border-radius: var(--radius-full);
  font-size: 12px;
  font-weight: 800;
}

.status-pill-emerald {
  background: #dcfce7;
  color: #15803d;
  padding: 4px 12px;
  border-radius: var(--radius-full);
  font-size: 12px;
  font-weight: 800;
}
</style>
