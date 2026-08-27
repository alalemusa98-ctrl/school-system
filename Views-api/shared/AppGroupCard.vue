<template>
  <article class="sched-ref-card" :class="cardCustomClass">
    <!-- 1. رقم اليوم/المجموعة أو أيقونة/صورة في النتوء العلوي الأوسط -->
    <div v-if="showNotch" class="sched-ref-top-notch" :style="customNotchStyle">
      <slot name="notch">
        <img 
          v-if="resolvedNotchImage" 
          :src="resolvedNotchImage" 
          class="subject-3d-icon-render" 
          alt="" 
        />
        <span v-else-if="notchIcon">{{ notchIcon }}</span>
        <span v-else>{{ index }}</span>
      </slot>
    </div>

    <!-- 2. رأس الكارد وعنوان المجموعة -->
    <div class="sched-ref-header-info">
      <slot name="header">
        <h3 class="sched-ref-day-title">{{ title }}</h3>
        <p v-if="subtitle" class="sched-ref-day-subtitle">{{ subtitle }}</p>
      </slot>
    </div>

    <!-- 3. شبكة العناصر السكويركل (تدعم عمودين أو 3 أو 4 أعمدة) -->
    <div class="exam-ref-grid" :class="`cols-${columns}`">
      <slot name="items">
        <div 
          v-for="(item, idx) in items" 
          :key="item.id || idx" 
          class="sched-subject-squircle hw-squircle-click"
          :class="[item.customClass, { 'is-action-card': item.isAction || item.type === 'action' }]"
          @click="handleItemClick(item)"
        >
          <slot name="item" :item="item" :index="idx">
            <!-- Squircle Icon Box -->
            <div class="sched-icon-box" :class="item.colorClass || getSubjectColorClass(item.subject_name || item.title)">
              <!-- 1. صورة مخصصة ممررة أو افتراضية من المكون المشترك -->
              <img 
                v-if="resolveItemImage(item)" 
                :src="resolveItemImage(item)" 
                class="subject-3d-icon-render" 
                alt="" 
              />
              <!-- 2. أيكون/إيموجي مخصص ممرر أو افتراضي من المكون المشترك -->
              <span v-else>{{ resolveItemIcon(item) }}</span>
            </div>

            <!-- Status / Action / Period / Room Badge (اختياري) -->
            <span 
              v-if="item.badge || item.period || item.time || item.badgeText"
              class="sched-period-tag" 
              :class="item.badgeClass || { pending: item.isPending || (!item.submitted && !item.has_solution && item.type === 'homework') }"
            >
              {{ item.badge || item.period || item.time || item.badgeText }}
            </span>

            <!-- 1. اسم المادة (اختياري إذا وجد اسم مادة وعنوان مختلفين) -->
            <span 
              v-if="item.subject_name && item.title && item.subject_name !== item.title" 
              class="sched-item-subject" 
              :title="item.subject_name"
            >
              {{ item.subject_name }}
            </span>

            <!-- 2. العنوان الرئيسي للكارد -->
            <h4 class="sched-subject-name" :title="item.title || item.subject_name">
              {{ item.title || item.subject_name }}
            </h4>

            <!-- 3. النص الفرعي (السنة الدراسية مع الشعبة / اسم المعلم / القاعة) -->
            <span 
              v-if="getItemSubtitle(item)"
              class="sched-teacher-name" 
              :title="getItemSubtitle(item)"
            >
              {{ getItemSubtitle(item) }}
            </span>
          </slot>
        </div>
      </slot>
    </div>

    <!-- 4. تذييل الكارد (تاريخ الاستحقاق أو الامتحان أو معلومات إضافية) -->
    <div v-if="(footerText || date || $slots.footer) && showFooter" class="sched-ref-footer-date">
      <slot name="footer">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
          <line x1="16" y1="2" x2="16" y2="6"></line>
          <line x1="8" y1="2" x2="8" y2="6"></line>
          <line x1="3" y1="10" x2="21" y2="10"></line>
        </svg>
        <span>{{ footerText || (dateLabel ? `${dateLabel}: ${date}` : date) }}</span>
      </slot>
    </div>
  </article>
</template>

<script setup>
import { computed } from 'vue';
import mathImg from './assets/math_3d.jpg';
import scienceImg from './assets/science_3d.jpg';
import englishImg from './assets/english_3d.jpg';
import islamicImg from './assets/islamic_3d.jpg';
import hwImg from './assets/homework_assignments_3d.png';
import examImg from './assets/exams_evaluations_3d.png';

const props = defineProps({
  index: {
    type: [Number, String],
    default: 1
  },
  title: {
    type: String,
    default: 'عنوان المجموعة'
  },
  subtitle: {
    type: String,
    default: ''
  },
  columns: {
    type: [Number, String],
    default: 2 // 2, 3, or 4 columns
  },
  items: {
    type: Array,
    default: () => []
  },
  date: {
    type: String,
    default: ''
  },
  dateLabel: {
    type: String,
    default: ''
  },
  footerText: {
    type: String,
    default: ''
  },
  notchImage: {
    type: String,
    default: ''
  },
  notchIcon: {
    type: String,
    default: ''
  },
  showNotch: {
    type: Boolean,
    default: true
  },
  showFooter: {
    type: Boolean,
    default: true
  },
  notchGradient: {
    type: String,
    default: ''
  },
  cardCustomClass: {
    type: String,
    default: ''
  }
});

const emit = defineEmits(['item-click']);

const resolvedNotchImage = computed(() => {
  if (props.notchImage) return props.notchImage;
  return null;
});

const customNotchStyle = computed(() => {
  if (props.notchGradient) {
    return { background: props.notchGradient };
  }
  return {};
});

function handleItemClick(item) {
  emit('item-click', item);
}

// دالة تحديد الصورة: إما ممررة صراحة أو اختيار الافتراضي للمادة تلقائياً
function resolveItemImage(item) {
  if (item.image) return item.image;
  if (item.imageUrl) return item.imageUrl;
  if (item.icon_url) return item.icon_url;
  return getSubjectImage(item.subject_name || item.title);
}

// دالة تحديد الأيقونة: إما ممررة صراحة أو اختيار الافتراضي تلقائياً
function resolveItemIcon(item) {
  if (item.icon) return item.icon;
  if (item.emoji) return item.emoji;
  return getSubjectIcon(item.subject_name || item.title);
}

function getItemSubtitle(item) {
  if (item.grade_name && item.section_name) {
    return `${item.grade_name} (${item.section_name})`;
  }
  if (item.grade_name) return item.grade_name;
  if (item.section_name) return item.section_name;
  return item.subtitle || item.teacher_name || item.room || '';
}

function getSubjectColorClass(name) {
  if (!name) return 'default';
  if (name.includes('رياضيات')) return 'math';
  if (name.includes('علوم')) return 'science';
  if (name.includes('إنجليز')) return 'english';
  if (name.includes('إسلام') || name.includes('قرآن') || name.includes('تربية')) return 'islamic';
  return 'default';
}

function getSubjectImage(name) {
  if (!name) return null;
  if (name.includes('رياضيات')) return mathImg;
  if (name.includes('علوم')) return scienceImg;
  if (name.includes('إنجليز')) return englishImg;
  if (name.includes('إسلام') || name.includes('قرآن') || name.includes('تربية')) return islamicImg;
  return null;
}

function getSubjectIcon(name) {
  if (!name) return '📚';
  if (name.includes('رياضيات')) return '📐';
  if (name.includes('علوم')) return '🔬';
  if (name.includes('إنجليز')) return '🔤';
  if (name.includes('إسلام') || name.includes('قرآن') || name.includes('تربية')) return '🕌';
  if (name.includes('عرب')) return '📖';
  if (name.includes('حاسوب')) return '💻';
  if (name.includes('اجتماع')) return '🌍';
  return '📚';
}
</script>

<style scoped>
/* Card Container with Top Notch */
.sched-ref-card {
  background: #ffffff;
  border-radius: 24px;
  padding: 24px 20px 16px;
  position: relative;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05);
  border: 1px solid #f1f5f9;
  margin-bottom: 24px;
}

.sched-ref-top-notch {
  width: 54px;
  height: 54px;
  background: linear-gradient(352deg, #4f46e59e 0%, #c7d2feb3 100%);
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
  box-shadow: 0 6px 14px rgba(79, 70, 229, 0.35) inset;
  overflow: hidden;
}

.sched-ref-header-info {
  text-align: center;
  margin-bottom: 16px;
}

.sched-ref-day-title {
  font-size: 18px;
  font-weight: 800;
  color: #0f172a;
  margin: 0;
}

.sched-ref-day-subtitle {
  font-size: 12.5px;
  color: #64748b;
  font-weight: 600;
  margin: 4px 0 0;
}

/* Grid Layout: Configurable columns (2, 3, or 4) */
.exam-ref-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 14px;
  margin-bottom: 16px;
}

.exam-ref-grid.cols-3 {
  grid-template-columns: repeat(3, 1fr) !important;
  gap: 10px;
}

.exam-ref-grid.cols-4 {
  grid-template-columns: repeat(4, 1fr) !important;
  gap: 8px;
}

.exam-ref-grid.cols-3 .sched-subject-squircle {
  padding: 12px 6px 10px;
  border-radius: 16px;
  gap: 3px;
}

.exam-ref-grid.cols-3 .sched-icon-box {
  width: 42px;
  height: 42px;
  border-radius: 14px;
}

.exam-ref-grid.cols-3 .sched-period-tag {
  font-size: 10px;
  padding: 2px 6px;
  border-radius: 6px;
}

.exam-ref-grid.cols-3 .sched-subject-name {
  font-size: 12px;
  margin: 1px 0;
}

.exam-ref-grid.cols-3 .sched-teacher-name {
  font-size: 10.5px;
}

.sched-subject-squircle {
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 20px;
  padding: 14px 10px 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  cursor: pointer;
  transition: all 0.2s ease;
  min-width: 0;
}

.sched-subject-squircle:hover {
  transform: translateY(-3px);
  background: #ffffff;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.06);
  border-color: #c7d2fe;
}

.sched-icon-box {
  width: 48px;
  height: 48px;
  border-radius: 16px;
  background: #f1f5f9;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  overflow: hidden;
  border: 1px solid #e2e8f0;
  margin-bottom: 2px;
}

.subject-3d-icon-render {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 14px;
}

/* Specific color gradients for icon wrappers */
.sched-icon-box.cyan {
  background: linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%);
  color: #ffffff;
}

.sched-icon-box.pink {
  background: linear-gradient(135deg, #d946ef 0%, #c026d3 100%);
  color: #ffffff;
}

.sched-icon-box.rose {
  background: linear-gradient(135deg, #f43f5e 0%, #e11d48 100%);
  color: #ffffff;
}

.sched-icon-box.emerald {
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  color: #ffffff;
}

.sched-period-tag {
  font-size: 10.5px;
  font-weight: 800;
  padding: 2px 8px;
  border-radius: 8px;
  background: #dcfce7;
  color: #166534;
}

.sched-period-tag.pending {
  background: #ffedd5;
  color: #c2410c;
}

.sched-period-tag.cyan {
  background: #e0f2fe;
  color: #0284c7;
}

.sched-period-tag.pink {
  background: #fce7f3;
  color: #c026d3;
}

.sched-period-tag.rose {
  background: #ffe4e6;
  color: #e11d48;
}

/* 1. اسم المادة */
.sched-item-subject {
  font-size: 11px;
  font-weight: 800;
  color: #7c3aed;
  background: #ede9fe;
  padding: 1.5px 8px;
  border-radius: 8px;
  max-width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* 2. العنوان */
.sched-subject-name {
  font-size: 13px;
  font-weight: 800;
  color: #1e293b;
  margin: 0;
  text-align: center;
  max-width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 1.35;
}

/* 3. السنة الدراسية مع الشعبة */
.sched-teacher-name {
  font-size: 11.5px;
  color: #64748b;
  font-weight: 600;
  max-width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.sched-ref-footer-date {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding-top: 12px;
  border-top: 1px dashed #e2e8f0;
  font-size: 13px;
  font-weight: 600;
  color: #64748b;
}
</style>
