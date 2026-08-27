<template>
  <main class="dash-cards-grid">
    <article
      v-for="card in resolvedCards"
      :key="card.id"
      class="dash-card-item"
      :class="card.cardClass || card.id"
      @click="handleCardClick(card)"
    >
      <!-- Background 3D Illustration -->
      <img
        :src="resolveCardImage(card)"
        :alt="card.title"
        class="dash-card-bg"
        loading="lazy"
      />

      <!-- Subtle Gradient Overlay for Text Clarity -->
      <div class="dash-card-overlay"></div>

      <!-- Top Text & Action Pill -->
      <div class="dash-card-content">
        <h3 class="dash-card-title">{{ card.title }}</h3>
        <p class="dash-card-subtitle">{{ card.subtitle }}</p>

        <!-- Glassmorphism Action Pill Button -->
        <div class="dash-card-pill-btn">
          <span>{{ card.buttonText || 'عرض التفاصيل' }}</span>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </div>
      </div>

      <!-- Bottom Floating Badge -->
      <div
        v-if="card.badge"
        class="dash-card-badge"
        :class="getBadgeClass(card)"
      >
        {{ card.badge }}
      </div>
    </article>
  </main>
</template>

<script setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router';

// Shared 3D Card Backgrounds
import hwCardImg from './assets/homeworks_card.jpg';
import examCardImg from './assets/exams_card.jpg';
import schedCardImg from './assets/schedule_card.jpg';
import subCardImg from './assets/subjects_card.png';

const props = defineProps({
  cards: {
    type: Array,
    default: null
  },
  // Individual student badge values if using default card setup
  pendingHomeworksCount: { type: Number, default: 4 },
  upcomingExamsCount: { type: Number, default: 1 },
  subjectsCount: { type: Number, default: 7 },
  currentDayName: { type: String, default: 'الثلاثاء' }
});

const emit = defineEmits(['card-click']);
const router = useRouter();

// Default 4 Portal Cards if none provided
const defaultCards = computed(() => [
  {
    id: 'homeworks',
    title: 'الواجبات',
    subtitle: 'متابعة المهام المطلوبة والواجبات اليومية',
    buttonText: 'عرض المهام',
    badge: `${props.pendingHomeworksCount} معلق`,
    badgeType: 'warning',
    cardClass: 'homework',
    image: hwCardImg,
    route: '/student/homeworks'
  },
  {
    id: 'exams',
    title: 'الامتحانات',
    subtitle: 'جدول الامتحانات والاختبارات الشهرية',
    buttonText: 'عرض الجدول',
    badge: `${props.upcomingExamsCount} قادمة`,
    badgeType: 'danger',
    cardClass: 'exams',
    image: examCardImg,
    route: '/student/exams'
  },
  {
    id: 'subjects',
    title: 'المواد الدراسية',
    subtitle: 'المناهج والملخصات التعليمية المتاحة',
    buttonText: 'استكشاف المواد',
    badge: `${props.subjectsCount} مواد`,
    badgeType: 'info',
    cardClass: 'subjects',
    image: subCardImg,
    route: '/student/subjects'
  },
  {
    id: 'schedule',
    title: 'الجدول الأسبوعي',
    subtitle: 'توزيع الحصص اليومية والمعلمين',
    buttonText: 'عرض الحصص',
    badge: `اليوم: ${props.currentDayName}`,
    badgeType: 'success',
    cardClass: 'schedule',
    image: schedCardImg,
    route: '/student/schedule'
  }
]);

const resolvedCards = computed(() => {
  if (props.cards && props.cards.length > 0) {
    return props.cards;
  }
  return defaultCards.value;
});

function resolveCardImage(card) {
  if (card.image) return card.image;
  if (card.imageUrl) return card.imageUrl;
  if (card.id === 'homeworks' || card.id === 'homework' || card.title?.includes('واجب')) return hwCardImg;
  if (card.id === 'exams' || card.id === 'exam' || card.title?.includes('امتحان') || card.title?.includes('اختبار')) return examCardImg;
  if (card.id === 'subjects' || card.id === 'subject' || card.title?.includes('ماد') || card.title?.includes('منهج')) return subCardImg;
  if (card.id === 'schedule' || card.title?.includes('جدول') || card.title?.includes('حصة')) return schedCardImg;
  return hwCardImg;
}

function getBadgeClass(card) {
  if (card.badgeType) return `badge-${card.badgeType}`;
  if (card.badgeClass) return card.badgeClass;
  if (card.id === 'homeworks') return 'badge-warning';
  if (card.id === 'exams') return 'badge-danger';
  if (card.id === 'subjects') return 'badge-info';
  if (card.id === 'schedule') return 'badge-success';
  return 'badge-info';
}

function handleCardClick(card) {
  emit('card-click', card);
  if (card.route && router) {
    router.push(card.route);
  }
}
</script>

<style scoped>
/* 2-Column Responsive Dashboard Cards Grid */
.dash-cards-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  padding: 16px;
  width: 100%;
  box-sizing: border-box;
}

/* Individual Card Container */
.dash-card-item {
  position: relative;
  border-radius: 28px;
  overflow: hidden;
  aspect-ratio: 1 / 1.18;
  min-height: 220px;
  cursor: pointer;
  box-shadow: 0 12px 28px -6px rgba(15, 23, 42, 0.12), 0 4px 12px -2px rgba(15, 23, 42, 0.06);
  transition: transform 0.28s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.28s ease;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 16px 14px;
  box-sizing: border-box;
  -webkit-tap-highlight-color: transparent;
}

.dash-card-item:hover {
  transform: translateY(-4px) scale(1.02);
  box-shadow: 0 20px 32px -8px rgba(15, 23, 42, 0.2), 0 8px 16px -4px rgba(15, 23, 42, 0.1);
}

.dash-card-item:active {
  transform: scale(0.97);
}

/* 3D Background Image */
.dash-card-bg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 1;
  pointer-events: none;
  transition: transform 0.4s ease;
}

.dash-card-item:hover .dash-card-bg {
  transform: scale(1.04);
}

/* Top Subtle Text Readability Shadow */
.dash-card-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(15, 23, 42, 0.45) 0%, rgba(15, 23, 42, 0.08) 45%, transparent 70%);
  z-index: 2;
  pointer-events: none;
}

/* Card Content Area */
.dash-card-content {
  position: relative;
  z-index: 3;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
}

.dash-card-title {
  font-size: 19px;
  font-weight: 900;
  color: #ffffff;
  margin: 0;
  line-height: 1.25;
  text-shadow: 0 2px 6px rgba(0, 0, 0, 0.35);
  letter-spacing: -0.2px;
}

.dash-card-subtitle {
  font-size: 11.5px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.92);
  margin: 0 0 6px 0;
  line-height: 1.35;
  text-shadow: 0 1px 4px rgba(0, 0, 0, 0.3);
}

/* Glassmorphism Action Pill Button */
.dash-card-pill-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: rgba(255, 255, 255, 0.22);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.45);
  border-radius: 999px;
  padding: 5px 12px;
  color: #ffffff;
  font-size: 11.5px;
  font-weight: 700;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
  transition: all 0.2s ease;
  user-select: none;
}

.dash-card-item:hover .dash-card-pill-btn {
  background: rgba(255, 255, 255, 0.35);
  border-color: rgba(255, 255, 255, 0.7);
  transform: translateX(-2px);
}

/* Bottom Floating Status Badge */
.dash-card-badge {
  position: absolute;
  bottom: 14px;
  left: 14px;
  z-index: 3;
  padding: 5px 13px;
  border-radius: 999px;
  font-size: 11.5px;
  font-weight: 800;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  letter-spacing: -0.2px;
}

/* Badge Color Themes matching Reference Design */
.badge-warning {
  background: #fef08a;
  color: #854d0e;
}

.badge-danger {
  background: #ffe4e6;
  color: #9f1239;
}

.badge-info {
  background: #e0e7ff;
  color: #3730a3;
}

.badge-success {
  background: #d1fae5;
  color: #065f46;
}

@media (max-width: 480px) {
  .dash-cards-grid {
    gap: 12px;
    padding: 12px;
  }

  .dash-card-item {
    border-radius: 22px;
    padding: 14px 12px;
    min-height: 200px;
  }

  .dash-card-title {
    font-size: 17px;
  }

  .dash-card-subtitle {
    font-size: 10.5px;
  }

  .dash-card-pill-btn {
    padding: 4px 10px;
    font-size: 10.5px;
  }

  .dash-card-badge {
    bottom: 10px;
    left: 10px;
    padding: 4px 10px;
    font-size: 10.5px;
  }
}
</style>
