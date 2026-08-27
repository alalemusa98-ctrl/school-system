<template>
  <StudentLayout 
    :pageTitle="selectedSubject ? `تفاصيل مادة ${selectedSubject.name}` : 'المواد الدراسية'" 
    :pageSubtitle="selectedSubject ? `إعداد المعلم: ${selectedSubject.teacher_name || 'أستاذ المادة'}` : 'قائمة المواد والأقسام الدراسية المقررة'"
    pageEmoji="📖"
  >
    <main class="hw-container">
      <div v-if="loadingSubjects" class="loading-state">جاري تحميل المواد الدراسية من قاعدة البيانات... ⏳</div>

      <!-- View 1: Main Subjects List View (تنسيق مطابق للصورة المرجعية بالضبط) -->
      <div v-else-if="!selectedSubject">
        <div v-if="subjectsList.length === 0" class="empty-state">
          🎉 لا توجد مواد دراسية مضافة في قاعدة البيانات حالياً.
        </div>

        <div class="subjects-grid-list">
          <article 
            v-for="sub in subjectsList" 
            :key="sub.id" 
            class="subj-ref-card"
          >
            <!-- 1. أيقونة المادة (Subject Icon Top Notch Badge) -->
            <div class="subj-ref-top-notch">
              <img v-if="getSubjectImage(sub.name)" :src="getSubjectImage(sub.name)" class="subject-3d-icon-render" alt="" />
              <span v-else>{{ getSubjectIcon(sub.name) }}</span>
            </div>

            <!-- 4. اسم المادة (Subject Name Title Header) -->
            <div class="subj-ref-header-info">
              <h3 class="subj-ref-title">مادة {{ sub.name }}</h3>
              <span class="subj-ref-subtitle">المقرر الدراسي المعتمد</span>
            </div>

            <!-- 2. خليهم زوز كاردات فقط: واحد خاص بالواجبات والآخر بالامتحانات -->
            <div class="subj-ref-action-grid">
              <!-- Card 1: الواجبات المدرسية -->
              <div 
                class="action-squircle-card" 
                @click="openSubjectDetailWithTab(sub, 'homeworks')"
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
                <span class="action-card-badge cyan">تصفح الواجبات</span>
              </div>

              <!-- Card 2: الامتحانات والتقييمات -->
              <div 
                class="action-squircle-card" 
                @click="openSubjectDetailWithTab(sub, 'exams')"
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
                <span class="action-card-badge pink">تصفح الامتحانات</span>
              </div>
            </div>

            <!-- 3. اسم المعلم (Teacher Name Footer) -->
            <div class="subj-ref-footer-row">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
              <span>أستاذ المادة: {{ sub.teacher_name || 'أستاذ المادة المعتمد' }}</span>
            </div>
          </article>
        </div>
      </div>

      <!-- View 2: Selected Subject Detail View (صفحة تفاصيل المادة باستعلام API مباشر) -->
      <div v-else class="subject-detail-page">
        <!-- Back Bar -->
        <div class="back-subject-bar">
          <button class="back-link-btn" @click="closeSubjectDetail">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
            <span>العودة لقائمة المواد</span>
          </button>
          <div class="selected-subject-badge">
            <img v-if="getSubjectImage(selectedSubject.name)" :src="getSubjectImage(selectedSubject.name)" class="sub-pill-3d-img" alt="" />
            <span v-else>{{ getSubjectIcon(selectedSubject.name) }}</span>
            <span>مادة {{ selectedSubject.name }}</span>
          </div>
        </div>

        <!-- Segmented Control Tab Switcher (2 تابات) -->
        <section class="hw-filter-section detail-tabs-section">
          <div class="hw-segmented-control">
            <!-- Tab 1: جميع الواجبات الخاصه بالمادة -->
            <button 
              class="hw-tab-btn" 
              :class="{ active: detailTab === 'homeworks' }" 
              @click="detailTab = 'homeworks'"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <line x1="16" y1="13" x2="8" y2="13"></line>
                <line x1="16" y1="17" x2="8" y2="17"></line>
              </svg>
              <span>جميع الواجبات المدرسية</span>
              <span class="hw-count-badge">{{ subjectHomeworks.length }}</span>
            </button>

            <!-- Tab 2: جميع الامتحانات الخاصة بالمادة -->
            <button 
              class="hw-tab-btn" 
              :class="{ active: detailTab === 'exams' }" 
              @click="detailTab = 'exams'"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="16" y1="2" x2="16" y2="6"></line>
                <line x1="8" y1="2" x2="8" y2="6"></line>
                <line x1="3" y1="10" x2="21" y2="10"></line>
              </svg>
              <span>جميع الامتحانات والتقييمات</span>
              <span class="hw-count-badge danger">{{ subjectExams.length }}</span>
            </button>
          </div>
        </section>

        <!-- Loading State for Tasks -->
        <div v-if="loadingTasks" class="loading-state">جاري استرجاع البيانات من قاعدة البيانات... ⏳</div>

        <!-- Content Tab 1: جميع الواجبات الخاصة بالمادة من قاعدة البيانات -->
        <div v-else-if="detailTab === 'homeworks'" class="tab-content-wrapper">
          <div v-if="subjectHomeworks.length === 0" class="empty-state">
            🎉 لا توجد واجبات مضافة لمادة {{ selectedSubject.name }} في قاعدة البيانات حالياً.
          </div>

          <article 
            v-for="hw in subjectHomeworks" 
            :key="hw.id" 
            class="hw-card-ref"
          >
            <!-- Card Header -->
            <div class="hw-ref-header">
              <h3 class="hw-ref-title">{{ hw.title }}</h3>
            </div>

            <!-- Teacher Row -->
            <div class="hw-ref-profile-row">
              <div class="hw-ref-avatar">
                {{ getSubjectIcon(selectedSubject.name) }}
              </div>
              <div class="hw-ref-profile-info">
                <span class="hw-ref-teacher-name">{{ hw.teacher_name || selectedSubject.teacher_name || 'أستاذ المادة' }}</span>
                <span class="hw-ref-verified-pill" :class="{ pending: !hw.has_solution }">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  <span>{{ hw.has_solution ? 'تم توفير الحل النموذجي' : 'الحل النموذجي قيد التوفير' }}</span>
                </span>
              </div>
            </div>

            <!-- Recessed Box -->
            <div class="hw-ref-inner-box">
              <span class="hw-ref-inner-label">محتوى وتفاصيل الواجب</span>
              <p class="hw-desc">{{ hw.description }}</p>

              <div class="hw-ref-stats-grid">
                <div class="hw-ref-stat-col">
                  <div class="hw-ref-stat-title">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6366f1" stroke-width="2.2">
                      <circle cx="12" cy="12" r="10"></circle>
                      <polyline points="12 6 12 12 16 14"></polyline>
                    </svg>
                    <span>تاريخ التسليم</span>
                  </div>
                  <span class="hw-ref-stat-val">{{ hw.due_date ? formatDate(hw.due_date) : 'محدد قريباً' }}</span>
                </div>

                <div class="hw-ref-stat-col">
                  <div class="hw-ref-stat-title">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#22c55e" stroke-width="2.2">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                      <polyline points="14 2 14 8 20 8"></polyline>
                    </svg>
                    <span>الملف المرفق</span>
                  </div>
                  <span class="hw-ref-stat-val">{{ hw.attachment_path || 'تمرين_الواجب.pdf' }}</span>
                </div>
              </div>
            </div>

            <!-- Meta Rows -->
            <div class="hw-ref-meta-rows">
              <div class="hw-ref-meta-row">
                <span class="hw-ref-meta-key">المادة الدراسية</span>
                <span class="hw-ref-meta-val">{{ selectedSubject.name }}</span>
              </div>
              <div class="hw-ref-meta-row">
                <span class="hw-ref-meta-key">الأستاذ المسؤول</span>
                <span class="hw-ref-meta-val">{{ hw.teacher_name || selectedSubject.teacher_name || 'أستاذ المادة' }}</span>
              </div>
            </div>

            <!-- Action Footer -->
            <div class="hw-ref-footer">
              <button 
                class="hw-ref-primary-pill-btn full-width" 
                :disabled="!hw.has_solution" 
                :class="{ disabled: !hw.has_solution }"
                @click="openSolutionModal(hw)"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                  <line x1="16" y1="13" x2="8" y2="13"></line>
                  <line x1="16" y1="17" x2="8" y2="17"></line>
                </svg>
                <span>{{ hw.has_solution ? 'عرض الحل النموذجي' : 'عرض الحل النموذجي (غير متاح)' }}</span>
              </button>
            </div>
          </article>
        </div>

        <!-- Content Tab 2: جميع الامتحانات الخاصة بالمادة من قاعدة البيانات -->
        <div v-else-if="detailTab === 'exams'" class="tab-content-wrapper">
          <div v-if="subjectExams.length === 0" class="empty-state">
            🎉 لا توجد امتحانات مضافة لمادة {{ selectedSubject.name }} في قاعدة البيانات حالياً.
          </div>

          <article 
            v-for="exam in subjectExams" 
            :key="exam.id" 
            class="hw-card-ref"
          >
            <!-- Card Header -->
            <div class="hw-ref-header">
              <h3 class="hw-ref-title">{{ exam.title }}</h3>
            </div>

            <!-- Teacher Row -->
            <div class="hw-ref-profile-row">
              <div class="hw-ref-avatar">
                {{ getSubjectIcon(selectedSubject.name) }}
              </div>
              <div class="hw-ref-profile-info">
                <span class="hw-ref-teacher-name">{{ exam.teacher_name || selectedSubject.teacher_name || 'أستاذ المادة' }}</span>
                <span class="hw-ref-verified-pill" :class="{ pending: !exam.has_solution }">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  <span>{{ exam.has_solution ? 'تم توفير النموذج الإسترشادي' : 'امتحان تحصيلي معتمد' }}</span>
                </span>
              </div>
            </div>

            <!-- Recessed Box -->
            <div class="hw-ref-inner-box">
              <span class="hw-ref-inner-label">توقيت ومفردات الامتحان</span>
              <p class="hw-desc">{{ exam.description || 'امتحان تقييمي يشمل فصول المنهج المقررة.' }}</p>

              <div class="hw-ref-stats-grid">
                <div class="hw-ref-stat-col">
                  <div class="hw-ref-stat-title">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6366f1" stroke-width="2.2">
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                      <line x1="16" y1="2" x2="16" y2="6"></line>
                      <line x1="8" y1="2" x2="8" y2="6"></line>
                    </svg>
                    <span>تاريخ الامتحان</span>
                  </div>
                  <span class="hw-ref-stat-val">{{ exam.due_date ? formatDate(exam.due_date) : 'محدد قريباً' }}</span>
                </div>

                <div class="hw-ref-stat-col">
                  <div class="hw-ref-stat-title">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#22c55e" stroke-width="2.2">
                      <circle cx="12" cy="12" r="10"></circle>
                      <polyline points="12 6 12 12 16 14"></polyline>
                    </svg>
                    <span>الزمن المخصص</span>
                  </div>
                  <span class="hw-ref-stat-val">09:00 ص (ساعة ونصف)</span>
                </div>
              </div>
            </div>

            <!-- Meta Rows -->
            <div class="hw-ref-meta-rows">
              <div class="hw-ref-meta-row">
                <span class="hw-ref-meta-key">المادة الدراسية</span>
                <span class="hw-ref-meta-val">{{ selectedSubject.name }}</span>
              </div>
              <div class="hw-ref-meta-row">
                <span class="hw-ref-meta-key">الأستاذ المسؤول</span>
                <span class="hw-ref-meta-val">{{ exam.teacher_name || selectedSubject.teacher_name || 'أستاذ المادة' }}</span>
              </div>
            </div>

            <!-- Action Footer -->
            <div class="hw-ref-footer">
              <button 
                class="hw-ref-primary-pill-btn full-width"
                :disabled="!exam.has_solution"
                :class="{ disabled: !exam.has_solution }"
                @click="openSolutionModal(exam)"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                  <line x1="16" y1="13" x2="8" y2="13"></line>
                  <line x1="16" y1="17" x2="8" y2="17"></line>
                </svg>
                <span>{{ exam.has_solution ? 'عرض النموذج الاسترشادي والحل' : 'النموذج الاسترشادي (غير متاح)' }}</span>
              </button>
            </div>
          </article>
        </div>
      </div>
    </main>

    <!-- Shadcn UI Dialog for Solution Preview -->
    <ShadcnDialog 
      v-model="isModalOpen" 
      :title="selectedItem ? `الحل النموذجي: ${selectedItem.title}` : 'الحل النموذجي المعتمد'"
      :description="selectedSubject ? `مادة ${selectedSubject.name} • إعداد ${selectedItem?.teacher_name || selectedSubject.teacher_name || 'أستاذ المادة'}` : ''"
      icon="💡"
    >
      <div v-if="selectedItem" class="solution-dialog-content">
        <div class="solution-section">
          <h4 class="section-title">📌 مفردات وخطوات الحل النموذجي المعتمد:</h4>
          <div class="solution-text-box">
            <p v-if="selectedItem.solution_text">
              {{ selectedItem.solution_text }}
            </p>
            <div v-else class="default-solution-steps">
              <p>1. صياغة القواعد الأساسية والإجابة النموذجية المعتمدة للمادة.</p>
              <p>2. توزيع الدرجات التفصيلية والخطوات الواجب إتباعها.</p>
            </div>
          </div>
        </div>

        <div class="solution-attachment-box" v-if="selectedItem.solution_attachment_path || selectedItem.attachment_path">
          <div class="file-icon-wrapper">
            📄
          </div>
          <div class="file-details">
            <span class="file-name">{{ selectedItem.solution_attachment_path || selectedItem.attachment_path || 'الحل_النموذجي_المعتمد.pdf' }}</span>
            <span class="file-meta">ملف PDF شامل جاهز للتحميل والطباعة</span>
          </div>
          <button class="download-action-btn" @click="downloadSolution(selectedItem)">
            تحميل
          </button>
        </div>
      </div>

      <template #footer>
        <button class="shadcn-btn-secondary" @click="isModalOpen = false">إغلاق</button>
        <button class="shadcn-btn-primary" @click="downloadSolution(selectedItem)">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
            <polyline points="7 10 12 15 17 10"></polyline>
            <line x1="12" y1="15" x2="12" y2="3"></line>
          </svg>
          تحميل الملف (PDF)
        </button>
      </template>
    </ShadcnDialog>
  </StudentLayout>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import StudentLayout from '../../components/student/StudentLayout.vue';
import ShadcnDialog from '../../components/common/ShadcnDialog.vue';
import api from '../../services/api';
import math3dImg from '../../assets/math_3d.jpg';
import science3dImg from '../../assets/science_3d.jpg';
import islamic3dImg from '../../assets/islamic_3d.jpg';
import english3dImg from '../../assets/english_3d.jpg';

const route = useRoute();
const router = useRouter();

const loadingSubjects = ref(true);
const loadingTasks = ref(false);
const subjects = ref([]);

const selectedSubject = ref(null);
const detailTab = ref('homeworks'); // 'homeworks' | 'exams'

const isModalOpen = ref(false);
const selectedItem = ref(null);

const subjectHomeworks = ref([]);
const subjectExams = ref([]);

const subjectsList = computed(() => subjects.value);

async function fetchSubjectTasks(subjectId) {
  if (!subjectId) return;
  loadingTasks.value = true;
  subjectHomeworks.value = [];
  subjectExams.value = [];
  try {
    const res = await api.get(`/student/tasks?subject_id=${subjectId}`);
    if (res.data.success && res.data.data) {
      const allTasks = res.data.data;
      subjectHomeworks.value = allTasks.filter(t => t.task_type === 'HOMEWORK');
      subjectExams.value = allTasks.filter(t => t.task_type === 'EXAM');
    }
  } catch (err) {
    console.error('Failed to fetch tasks for subject from database:', err);
  } finally {
    loadingTasks.value = false;
  }
}

function getSubjectId(name) {
  if (!name) return 'other';
  if (name.includes('رياضيات')) return 'math';
  if (name.includes('علوم')) return 'science';
  if (name.includes('عرب')) return 'arabic';
  if (name.includes('إنكليز') || name.includes('إنجليزية') || name.includes('English')) return 'english';
  if (name.includes('إسلام') || name.includes('دين')) return 'islamic';
  if (name.includes('حاسوب') || name.includes('تقنية')) return 'computer';
  if (name.includes('اجتماع') || name.includes('جغرافيا') || name.includes('تاريخ')) return 'social';
  return 'other';
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
  if (!dateStr) return 'محدد قريباً';
  return dateStr;
}

function openSubjectDetailWithTab(sub, tab = 'homeworks') {
  selectedSubject.value = sub;
  detailTab.value = tab;
  fetchSubjectTasks(sub.id);
  router.push(`/student/subjects/${sub.id}?tab=${tab}`);
}

function closeSubjectDetail() {
  selectedSubject.value = null;
  subjectHomeworks.value = [];
  subjectExams.value = [];
  router.push('/student/subjects');
}

function openSolutionModal(item) {
  if (!item.has_solution) return;
  selectedItem.value = item;
  isModalOpen.value = true;
}

function downloadSolution(item) {
  alert(`جاري تحميل ملف الحل من قاعدة البيانات: ${item ? (item.solution_attachment_path || item.attachment_path || 'الحل_النموذجي.pdf') : 'الحل.pdf'}... 📥`);
}

async function fetchSubjectsFromDB() {
  loadingSubjects.value = true;
  try {
    const res = await api.get('/student/subjects');
    if (res.data.success && res.data.data) {
      subjects.value = res.data.data;
    }
  } catch (err) {
    console.error('Failed to fetch subjects from database:', err);
  } finally {
    loadingSubjects.value = false;

    if (route.params.id) {
      const found = subjects.value.find(s => String(s.id) === String(route.params.id));
      selectedSubject.value = found || null;
      if (route.query.tab) {
        detailTab.value = route.query.tab;
      }
      if (selectedSubject.value) {
        fetchSubjectTasks(selectedSubject.value.id);
      }
    }
  }
}

// Watch router param to select subject if accessed directly via URL /student/subjects/:id
watch(() => route.params.id, (newId) => {
  if (newId && subjects.value.length > 0) {
    const found = subjects.value.find(s => String(s.id) === String(newId));
    selectedSubject.value = found || null;
    if (route.query.tab) {
      detailTab.value = route.query.tab;
    }
    if (selectedSubject.value) {
      fetchSubjectTasks(selectedSubject.value.id);
    }
  } else if (!newId) {
    selectedSubject.value = null;
  }
});

onMounted(() => {
  fetchSubjectsFromDB();
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

.full-width {
  width: 100%;
}

.subjects-grid-list {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

/* Detail Page Header & Tabs */
.back-subject-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
}

.back-link-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: #ffffff;
  border: 1px solid #cbd5e1;
  color: #475569;
  padding: 8px 14px;
  border-radius: 14px;
  font-family: inherit;
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.04);
  transition: all 0.2s ease;
}

.back-link-btn:hover {
  background: #f1f5f9;
  color: #0f172a;
  transform: translateX(2px);
}

.selected-subject-badge {
  background: linear-gradient(135deg, #ede9fe 0%, #e0e7ff 100%);
  color: #4338ca;
  font-weight: 800;
  font-size: 13px;
  padding: 6px 14px;
  border-radius: 14px;
  border: 1px solid #c7d2fe;
}

.detail-tabs-section {
  padding: 0;
  margin-bottom: 18px;
}

.tab-content-wrapper {
  display: flex;
  flex-direction: column;
  gap: 14px;
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
