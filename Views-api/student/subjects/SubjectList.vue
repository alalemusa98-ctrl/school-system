<template>
  <main class="hw-container">
    <!-- Loading State -->
    <div v-if="loading" class="loading-state">
      جاري تحميل المواد الدراسية من قاعدة البيانات... ⏳
    </div>

    <!-- Empty State -->
    <div v-else-if="subjectsList.length === 0" class="empty-state">
      🎉 لا توجد مواد دراسية مضافة حالياً.
    </div>

    <!-- Main Subjects Grid View (Pure Declarative Calling with passed 3D Images) -->
    <div v-else class="schedule-days-list">
      <AppGroupCard 
        v-for="(sub, sIdx) in subjectsList" 
        :key="sub.id"
        :index="sIdx + 1"
        :title="`مادة ${sub.name}`"
        subtitle="المقرر الدراسي المعتمد"
        :columns="2"
        :footerText="`أستاذ المادة: ${sub.teacher_name || 'أستاذ المادة المعتمد'}`"
        notchGradient="linear-gradient(352deg, rgba(14, 165, 233, 0.75) 0%, rgba(186, 230, 253, 0.9) 100%)"
        :items="[
          { id: 'hw', title: 'الواجبات', image: hwImg, badge: 'تصفح الواجبات', badgeClass: 'none', colorClass: 'none' },
          { id: 'ex', title: 'الامتحانات', image: examImg, badge: 'تصفح الامتحانات', badgeClass: 'none', colorClass: 'none' }
        ]"
        @item-click="(item) => $emit('select-subject-tab', { subject: sub, tab: item.id === 'hw' ? 'homeworks' : 'exams' })"
      />
    </div>
  </main>
</template>

<script setup>
import AppGroupCard from '../../shared/AppGroupCard.vue';
import hwImg from '../../shared/assets/homework_assignments_3d.png';
import examImg from '../../shared/assets/exams_evaluations_3d.png';

const props = defineProps({
  loading: { type: Boolean, default: false },
  selectedSubject: { type: Object, default: null },
  subjectsList: {
    type: Array,
    default: () => [
      { id: 1, name: 'الرياضيات', teacher_name: 'أ. أحمد سالم', icon: '📐' },
      { id: 2, name: 'العلوم العامة', teacher_name: 'أ. فاطمة العبيدي', icon: '🔬' },
      { id: 3, name: 'اللغة الإنجليزية', teacher_name: 'أ. سارة الحكيم', icon: '🔤' },
      { id: 4, name: 'التربية الإسلامية', teacher_name: 'أ. عبد الله الفاسي', icon: '🕌' }
    ]
  }
});

const emit = defineEmits(['select-subject-tab']);
</script>

<style scoped>
.hw-container {
  padding: 16px;
}

.loading-state, .empty-state {
  text-align: center;
  padding: 32px 16px;
  background: #ffffff;
  border-radius: 20px;
  font-weight: 700;
  color: #64748b;
  border: 1px dashed #cbd5e1;
}

.schedule-days-list {
  display: flex;
  flex-direction: column;
  gap: 24px;
}
</style>
