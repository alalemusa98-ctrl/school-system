<template>
  <main class="hw-container">
    <!-- Loading State -->
    <div v-if="loading" class="loading-state">
      جاري تحميل بيانات الفصول والمواد المسندة... ⏳
    </div>

    <!-- Empty State -->
    <div v-else-if="gradesList.length === 0" class="empty-state">
      🎉 لا توجد فصول دراسية مسندة حالياً.
    </div>

    <!-- Main Classes/Grades List View (Using Shared AppGroupCard) -->
    <div v-else class="subjects-grid-list">
      <AppGroupCard 
        v-for="(grade, index) in gradesList" 
        :key="grade.id"
        :index="index + 1"
        :title="grade.grade_name"
        :columns="2"
        :items="formatAssignments(grade.assignments)"
        :footerText="grade.semester || 'الفصل الدراسي الأول 2026'"
        notchGradient="linear-gradient(352deg, rgba(14, 165, 233, 0.75) 0%, rgba(186, 230, 253, 0.9) 100%)"
        @item-click="(item) => $emit('item-click', { assignment: item, grade })"
      />
    </div>
  </main>
</template>

<script setup>
import { ref } from 'vue';
import AppGroupCard from '../../shared/AppGroupCard.vue';

const props = defineProps({
  loading: { type: Boolean, default: false },
  subjectsList: {
    type: Array,
    default: () => []
  }
});

const emit = defineEmits(['item-click', 'select-assignment']);

function formatAssignments(assignments) {
  if (!assignments) return [];
  return assignments.map(item => ({
    ...item,
    id: item.id,
    title: item.subject_name,
    subtitle: `الشعبة (${item.section_name})`,
    section_name: item.section_name,
    subject_name: item.subject_name
  }));
}

const gradesList = ref([
  {
    id: 1,
    grade_name: 'الصف الخامس',
    semester: 'الفصل الدراسي الأول 2026',
    assignments: [
      {
        id: 101,
        subject_name: 'التربية الإسلامية',
        section_name: 'أ5',
        students_count: '24 طالباً',
        room_name: 'قاعة 4 (الجناح الشرقي)',
        active_homeworks: 3,
        scheduled_exams: 2
      },
      {
        id: 102,
        subject_name: 'الرياضيات',
        section_name: 'أ5',
        students_count: '24 طالباً',
        room_name: 'قاعة 4 (الجناح الشرقي)',
        active_homeworks: 4,
        scheduled_exams: 2
      },
      {
        id: 103,
        subject_name: 'الرياضيات',
        section_name: 'ب5',
        students_count: '26 طالباً',
        room_name: 'قاعة 5 (الجناح الشرقي)',
        active_homeworks: 2,
        scheduled_exams: 1
      }
    ]
  },
  {
    id: 2,
    grade_name: 'الصف السادس',
    semester: 'الفصل الدراسي الأول 2026',
    assignments: [
      {
        id: 104,
        subject_name: 'الرياضيات',
        section_name: 'أ6',
        students_count: '22 طالباً',
        room_name: 'قاعة 8 (الجناح الغربي)',
        active_homeworks: 3,
        scheduled_exams: 2
      },
      {
        id: 105,
        subject_name: 'العلوم العامة',
        section_name: 'أ6',
        students_count: '22 طالباً',
        room_name: 'مختبر العلوم',
        active_homeworks: 1,
        scheduled_exams: 1
      }
    ]
  }
]);
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

.subjects-grid-list {
  display: flex;
  flex-direction: column;
  gap: 24px;
}
</style>
