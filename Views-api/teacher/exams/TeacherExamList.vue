<template>
  <main class="hw-container">
    <!-- Loading State -->
    <div v-if="loading" class="loading-state">
      جاري استرجاع جدول الامتحانات... ⏳
    </div>

    <!-- Empty State -->
    <div v-else-if="filteredGroupedList.length === 0" class="empty-state">
      <span style="font-size: 40px; display: block; margin-bottom: 8px;">📝</span>
      <span>لا توجد امتحانات مسجلة في هذا القسم أو الشعبة.</span>
    </div>

    <!-- Grouped Exams List (Using Shared AppGroupCard) -->
    <div v-else class="schedule-days-list">
      <AppGroupCard 
        v-for="(group, gIndex) in filteredGroupedList" 
        :key="group.dateKey" 
        :index="gIndex + 1"
        :title="`امتحانات يوم ${group.dayName}`"
        :items="group.items"
        :date="group.formattedDate"
        dateLabel="تاريخ الاختبار"
        @item-click="(exam) => $emit('item-click', exam)"
      />
    </div>
  </main>
</template>

<script setup>
import { computed } from 'vue';
import AppGroupCard from '../../shared/AppGroupCard.vue';

const props = defineProps({
  loading: { type: Boolean, default: false },
  activeTab: { type: String, default: 'upcoming' },
  selectedSectionId: { type: [Number, String, null], default: null },
  exams: {
    type: Array,
    default: () => [
      {
        id: 301,
        title: 'امتحان العلوم العامة النصفي',
        description: 'اختبار تحصيلي يشمل فصول الفيزياء والكيمياء والمفاهيم الأساسية.',
        subject_name: 'العلوم العامة',
        section_id: 1,
        section_name: 'أ5',
        grade_name: 'الصف الخامس',
        due_date: '2026-08-31',
        exam_time: '09:00 ص - 10:30 ص',
        has_solution: 1,
        solution_text: 'الإجابة النموذجية: 1. قانون السرعة = المسافة ÷ الزمن.\n2. الميتوكوندريا هي مركز إنتاج الطاقة في الخلية.'
      },
      {
        id: 302,
        title: 'اختبار الرياضيات الشامل',
        description: 'يشمل وحدات القسمة المطولة، الضرب في رقمين، وخصائص الأشكال الهندسية.',
        subject_name: 'الرياضيات',
        section_id: 2,
        section_name: 'ب5',
        grade_name: 'الصف الخامس',
        due_date: '2026-08-31',
        exam_time: '11:00 ص - 12:30 م',
        has_solution: 0,
        solution_text: ''
      },
      {
        id: 303,
        title: 'اختبار قواعد النحو والإملاء',
        description: 'قواعد كان وأخواتها وإن وأخواتها مع التطبيقات الإعرابية.',
        subject_name: 'اللغة العربية',
        section_id: 1,
        section_name: 'أ5',
        grade_name: 'الصف الخامس',
        due_date: '2026-09-02',
        exam_time: '08:30 ص - 10:00 ص',
        has_solution: 1,
        solution_text: 'نموذج الإجابة:\n1. الإعراب: الطالبُ اسم كان مرفوع بالضمة.'
      }
    ]
  },
  assignedSections: {
    type: Array,
    default: () => [
      { id: 1, name: 'أ5', grade_name: 'الصف الخامس' },
      { id: 2, name: 'ب5', grade_name: 'الصف الخامس' },
      { id: 3, name: 'أ6', grade_name: 'الصف السادس' }
    ]
  }
});

const emit = defineEmits(['item-click', 'open-create', 'delete-exam']);

// Filter and Group Exams by Date
const filteredList = computed(() => {
  let list = props.exams || [];
  if (props.selectedSectionId !== null) {
    list = list.filter(e => e.section_id === props.selectedSectionId);
  }
  return list;
});

const filteredGroupedList = computed(() => {
  const groups = {};
  filteredList.value.forEach((exam) => {
    const key = exam.due_date || '2026-08-31';
    if (!groups[key]) {
      const dateObj = new Date(exam.due_date);
      const days = ['الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'];
      const dayName = isNaN(dateObj) ? 'المحدد' : days[dateObj.getDay()];
      groups[key] = {
        dateKey: key,
        dayName,
        formattedDate: exam.due_date,
        items: []
      };
    }
    groups[key].items.push(exam);
  });

  return Object.values(groups);
});
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
