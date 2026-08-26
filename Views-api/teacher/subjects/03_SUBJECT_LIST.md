# 📚 03. مواصفات ومكون قائمة الفصول الدراسية والشعب للمعلم (`TeacherSubjectList`)

> **الملف المرجعي:** [`Views-api/teacher/subjects/03_SUBJECT_LIST.md`](file:///c:/Users/alhareth/Desktop/work/school-system/Views-api/teacher/subjects/03_SUBJECT_LIST.md)  
> **اسم المكون البرمجي:** `TeacherSubjectList.vue`  
> **التصميم المرجعي المعتمد:** مطابق 100% لمواصفات [`Views-api/student/subjects/03_SUBJECT_LIST.md`](file:///c:/Users/alhareth/Desktop/work/school-system/Views-api/student/subjects/03_SUBJECT_LIST.md)  
> **الوصف:** المكون التنفيذي الرئيسي لعرض بطاقات الفصول والشعب الدراسية المسندة للمعلم مع نتوء الأيقونة العائم 54px، كروت الواجبات والامتحانات السريعة لكل شعبة، وتذييل القاعة الأكاديمية، ودراوير تفاصيل الشعبة وإحصائيات الطلاب.

---

## 📸 1. الوصف البصري والتشريحي للجزء (Component Anatomy)

```
+-----------------------------------------------------------------------+
|                                (  1  )  <-- [1. نتوء ترتيب السنة]     |
|  +-----------------------------------------------------------------+  |
|  |           الصف الخامس           <-- [1. السنة الدراسية]          |  |
|  |                                                                 |  |
|  |  +---------------------------+   +---------------------------+  |  |
|  |  |       [ 3D Image ]        |   |       [ 3D Image ]        |  |  |
|  |  |                           |   |                           |  |  |
|  |  |     الرياضيات (أ5)        |   |    التربية الإسلامية (أ5) |  |  |
|  |  +---------------------------+   +---------------------------+  |  |
|  |                                                                 |  |
|  |   🕒 الفصل الدراسي الأول 2026                                    |  |
|  +-----------------------------------------------------------------+  |
+-----------------------------------------------------------------------+
```

### تفصيل الأقسام حسب متطلبات التصميم:
1. **[1] السنة الدراسية (القسم العلوي من البطاقة):**
   * **النتوء العلوي (`.subj-ref-top-notch`):** رقم ترتيبي بارز (`1`، `2`...).
   * **العنوان الرئيسي (`.subj-ref-title`):** اسم السنة الدراسية بخط عريض وداكن (`الصف الخامس`).
2. **[2] كروت المواد والشعب المسندة (`.assignment-squircle-card`):**
   * **الصورة ثلاثية الأبعاد المخصصة (`.assignment-img`):** صورة 3D بدقة عالية تمثل المادة (الرياضيات، العلوم، اللغة الإنجليزية، التربية الإسلامية).
   * **اسم المادة مع ذكر الشعبة (`.assignment-title`):** نص واضح وبارز بخط 15px عريض داكن (مثل: `التربية الإسلامية (أ5)` أو `الرياضيات (أ5)`).
3. **تذييل البطاقة (`.subj-ref-footer-row`):** `الفصل الدراسي الأول 2026` مع أيقونة الساعة البنفسجية.

---

## 📐 2. كود المكون الكامل Vue 3 Component (`TeacherSubjectList.vue`)

```vue
<template>
  <main class="hw-container">
    <!-- Loading State -->
    <div v-if="loading" class="loading-state">
      جاري تحميل المواد والمناهج الدراسية... ⏳
    </div>

    <!-- Empty State -->
    <div v-else-if="filteredSubjects.length === 0" class="empty-state">
      🎉 لا توجد مواد دراسية مسندة حالياً في هذا القسم.
    </div>

    <!-- Main Subjects Grid View -->
    <div v-else class="subjects-grid-list">
      <article 
        v-for="sub in filteredSubjects" 
        :key="sub.id" 
        class="subj-ref-card"
      >
        <!-- 1. Top Notch 3D Icon Badge -->
        <div class="subj-ref-top-notch">
          <img v-if="getSubjectImage(sub.name)" :src="getSubjectImage(sub.name)" class="subject-3d-icon-render" alt="" />
          <span v-else>{{ getSubjectIcon(sub.name) }}</span>
        </div>

        <!-- 2. Subject Title & Info -->
        <div class="subj-ref-header-info">
          <h3 class="subj-ref-title">مادة {{ sub.name }}</h3>
          <span class="subj-ref-subtitle">{{ sub.curriculum_name || 'المقرر الدراسي المعتمد لعام 2026' }}</span>
        </div>

        <!-- 3. Dual Action Squircle Grid (Homeworks & Exams) -->
        <div class="subj-ref-action-grid">
          <!-- Card 1: Homeworks -->
          <div 
            class="action-squircle-card" 
            @click="openSubjectDrawer(sub, 'homeworks')"
          >
            <div class="squircle-icon-wrapper cyan">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <line x1="16" y1="13" x2="8" y2="13"></line>
                <line x1="16" y1="17" x2="8" y2="17"></line>
              </svg>
            </div>
            <span class="action-card-label">الواجبات</span>
            <span class="action-card-badge cyan">{{ sub.active_homeworks_count || 3 }} واجبات نشطة</span>
          </div>

          <!-- Card 2: Exams -->
          <div 
            class="action-squircle-card" 
            @click="openSubjectDrawer(sub, 'exams')"
          >
            <div class="squircle-icon-wrapper pink">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="16" y1="2" x2="16" y2="6"></line>
                <line x1="8" y1="2" x2="8" y2="6"></line>
                <line x1="3" y1="10" x2="21" y2="10"></line>
              </svg>
            </div>
            <span class="action-card-label">الامتحانات</span>
            <span class="action-card-badge pink">{{ sub.scheduled_exams_count || 2 }} اختبارات مجدولة</span>
          </div>
        </div>

        <!-- 4. Footer Assigned Sections -->
        <div class="subj-ref-footer-row">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
            <circle cx="9" cy="7" r="4"></circle>
            <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
            <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
          </svg>
          <span>الشعب المسندة: {{ sub.assigned_sections_text || 'الصف 5 (أ5 ، ب5) • الصف 6 (أ6)' }}</span>
        </div>
      </article>
    </div>

    <!-- ================= Subject Details Drawer ================= -->
    <Teleport to="body">
      <div v-if="selectedSubject" class="drawer-backdrop" @click="closeDrawer">
        <div class="drawer-content" @click.stop>
          <div class="drawer-handle"></div>

          <div class="drawer-header">
            <div class="drawer-header-left">
              <span class="drawer-subject-pill math">{{ selectedSubject.name }}</span>
              <span class="drawer-section-pill">المقرر الدراسي</span>
            </div>
            <button class="drawer-close-btn" @click="closeDrawer">&times;</button>
          </div>

          <div class="drawer-body">
            <h2 class="drawer-title">مفردات ومنهج مادة {{ selectedSubject.name }}</h2>

            <div class="drawer-meta-row">
              <div class="meta-item">
                <span class="meta-label">📚 الكتاب:</span>
                <span class="meta-value">{{ selectedSubject.book_title || 'الكتاب المدرسي المعتمد طبعة 2026' }}</span>
              </div>
              <div class="meta-item">
                <span class="meta-label">👥 الطلاب:</span>
                <span class="meta-value">{{ selectedSubject.total_students || '68 طالباً' }}</span>
              </div>
            </div>

            <div class="drawer-section-block">
              <h4 class="block-heading">📌 خطة التقييم وتوزيع الدرجات:</h4>
              <div class="grade-dist-grid">
                <div class="grade-item">
                  <span class="grade-label">أعمال الفصل</span>
                  <strong class="grade-val">30%</strong>
                </div>
                <div class="grade-item">
                  <span class="grade-label">الامتحان النصفي</span>
                  <strong class="grade-val">20%</strong>
                </div>
                <div class="grade-item">
                  <span class="grade-label">الامتحان النهائي</span>
                  <strong class="grade-val">50%</strong>
                </div>
              </div>
            </div>

            <div class="drawer-section-block">
              <h4 class="block-heading">🏫 الشعب المسندة للمعلم:</h4>
              <p class="drawer-desc">{{ selectedSubject.assigned_sections_text || 'الصف الخامس (أ5 ، ب5) - الصف السادس (أ6)' }}</p>
            </div>
          </div>

          <div class="drawer-footer">
            <button class="btn-primary-close" @click="closeDrawer">إغلاق التفاصيل</button>
          </div>
        </div>
      </div>
    </Teleport>
  </main>
</template>

<script setup>
import { ref, computed } from 'vue';
import mathImg from '@/assets/math_3d.jpg';
import scienceImg from '@/assets/science_3d.jpg';
import englishImg from '@/assets/english_3d.jpg';
import islamicImg from '@/assets/islamic_3d.jpg';

const props = defineProps({
  loading: { type: Boolean, default: false },
  selectedSectionId: { type: [Number, String, null], default: null },
  subjectsList: {
    type: Array,
    default: () => [
      {
        id: 1,
        name: 'الرياضيات',
        curriculum_name: 'منهج الحساب والجبر والهندسة المتقدمة',
        assigned_sections_text: 'الصف 5 (أ5 ، ب5) • الصف 6 (أ6)',
        active_homeworks_count: 3,
        scheduled_exams_count: 2,
        book_title: 'الرياضيات للصف الخامس والسادس - الجزء 1',
        total_students: '68 طالباً'
      },
      {
        id: 2,
        name: 'العلوم العامة',
        curriculum_name: 'منهج الأحياء والفيزياء والطبيعة',
        assigned_sections_text: 'الصف 5 (أ5 ، ب5)',
        active_homeworks_count: 2,
        scheduled_exams_count: 1,
        book_title: 'العلوم العامة والأنشطة العملية',
        total_students: '45 طالباً'
      },
      {
        id: 3,
        name: 'اللغة الإنجليزية',
        curriculum_name: 'English for Today - Level 5 & 6',
        assigned_sections_text: 'الصف 6 (أ6)',
        active_homeworks_count: 2,
        scheduled_exams_count: 1,
        book_title: 'English Skills Pupil Book 6',
        total_students: '23 طالباً'
      }
    ]
  }
});

const emit = defineEmits(['select-subject-tab']);

const selectedSubject = ref(null);
const activeDrawerTab = ref('homeworks');

const filteredSubjects = computed(() => {
  return props.subjectsList || [];
});

function getSubjectImage(name) {
  if (!name) return null;
  if (name.includes('رياضيات')) return mathImg || '/images/math_3d.jpg';
  if (name.includes('علوم')) return scienceImg || '/images/science_3d.jpg';
  if (name.includes('إنجليز')) return englishImg || '/images/english_3d.jpg';
  if (name.includes('إسلام')) return islamicImg || '/images/islamic_3d.jpg';
  return null;
}

function getSubjectIcon(name) {
  if (!name) return '📚';
  if (name.includes('عرب')) return '📖';
  if (name.includes('حاسوب')) return '💻';
  if (name.includes('اجتماع')) return '🌍';
  return '📚';
}

function openSubjectDrawer(sub, tab) {
  selectedSubject.value = sub;
  activeDrawerTab.value = tab;
}

function closeDrawer() {
  selectedSubject.value = null;
}
</script>

<style scoped>
.hw-container { padding: 16px; }
.loading-state, .empty-state {
  text-align: center;
  padding: 32px 16px;
  background: #ffffff;
  border-radius: 20px;
  font-weight: 700;
  color: #64748b;
  border: 1px dashed #cbd5e1;
}
.subjects-grid-list { display: flex; flex-direction: column; gap: 24px; }
.subj-ref-card {
  background: #ffffff;
  border-radius: 24px;
  padding: 24px 20px 16px;
  position: relative;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05);
  border: 1px solid #f1f5f9;
}
.subj-ref-top-notch {
  width: 54px;
  height: 54px;
  background: linear-gradient(352deg, rgba(14, 165, 233, 0.62) 0%, rgba(186, 230, 253, 0.7) 100%);
  color: #ffffff;
  font-size: 22px;
  font-weight: 800;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: -22px;
  left: 50%;
  transform: translateX(-50%);
  border: 8px solid #fff;
  box-shadow: 0 6px 14px rgba(14, 165, 233, 0.35) inset;
  overflow: hidden;
}
.subject-3d-icon-render { width: 100%; height: 100%; object-fit: cover; border-radius: 50%; }
.subj-ref-header-info { text-align: center; margin-bottom: 18px; }
.subj-ref-title { font-size: 19px; font-weight: 800; color: #0f172a; margin: 0 0 2px; }
.subj-ref-subtitle { font-size: 12.5px; font-weight: 600; color: #64748b; }

.subj-ref-action-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; margin-bottom: 16px; }
.action-squircle-card {
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 20px;
  padding: 16px 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
}
.action-squircle-card:hover {
  transform: translateY(-3px);
  background: #ffffff;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.06);
  border-color: #cbd5e1;
}
.squircle-icon-wrapper {
  width: 48px;
  height: 48px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 8px;
}
.squircle-icon-wrapper.cyan { background: #e0f2fe; color: #0284c7; }
.squircle-icon-wrapper.pink { background: #ffe4e6; color: #e11d48; }

.action-card-label { font-size: 14.5px; font-weight: 800; color: #1e293b; margin-bottom: 4px; }
.action-card-badge {
  font-size: 11px;
  font-weight: 700;
  padding: 3px 8px;
  border-radius: 10px;
}
.action-card-badge.cyan { background: #f0f9ff; color: #0369a1; border: 1px solid #bae6fd; }
.action-card-badge.pink { background: #fff1f2; color: #be123c; border: 1px solid #fecdd3; }

.subj-ref-footer-row {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding-top: 12px;
  border-top: 1px dashed #e2e8f0;
  font-size: 12.5px;
  font-weight: 600;
  color: #64748b;
}

/* Drawer */
.drawer-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.6);
  backdrop-filter: blur(6px);
  z-index: 999;
  display: flex;
  justify-content: center;
  align-items: flex-end;
}
.drawer-content {
  width: 100%;
  max-width: 480px;
  background: #ffffff;
  border-radius: 28px 28px 0 0;
  padding: 16px 20px 28px;
  max-height: 85vh;
  overflow-y: auto;
  box-shadow: 0 -10px 40px rgba(0, 0, 0, 0.2);
}
.drawer-handle { width: 40px; height: 4px; background: #cbd5e1; border-radius: 2px; margin: 0 auto 16px; }
.drawer-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; }
.drawer-subject-pill { background: #ede9fe; color: #7c3aed; padding: 4px 10px; border-radius: 10px; font-size: 11.5px; font-weight: 700; }
.drawer-section-pill { background: #f1f5f9; color: #475569; padding: 4px 10px; border-radius: 10px; font-size: 11.5px; margin-right: 6px; font-weight: 600; }
.drawer-close-btn { background: #f1f5f9; border: none; width: 32px; height: 32px; border-radius: 50%; font-size: 18px; cursor: pointer; color: #64748b; }
.drawer-title { font-size: 17px; font-weight: 800; color: #0f172a; margin-bottom: 12px; }
.drawer-meta-row { display: flex; gap: 16px; background: #f8fafc; padding: 10px 14px; border-radius: 14px; margin-bottom: 16px; font-size: 12px; }
.meta-item { display: flex; gap: 4px; }
.meta-label { color: #64748b; }
.meta-value { font-weight: 700; color: #1e1b4b; }
.block-heading { font-size: 13px; font-weight: 700; color: #334155; margin-bottom: 8px; }
.drawer-desc { font-size: 13px; line-height: 1.6; color: #475569; background: #f8fafc; padding: 12px; border-radius: 14px; margin-bottom: 16px; }
.grade-dist-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; margin-bottom: 16px; }
.grade-item { background: #f1f5f9; padding: 10px; border-radius: 12px; text-align: center; }
.grade-label { display: block; font-size: 11px; color: #64748b; margin-bottom: 2px; }
.grade-val { font-size: 14px; font-weight: 800; color: #4f46e5; }
.btn-primary-close { width: 100%; background: #6366f1; color: #ffffff; border: none; padding: 12px; border-radius: 14px; font-weight: 700; cursor: pointer; }
</style>
```
