<template>
  <main class="hw-container">
    <!-- Loading State -->
    <div v-if="loading" class="loading-state">
      جاري استرجاع الواجبات المدرسية... ⏳
    </div>

    <!-- Empty State -->
    <div v-else-if="filteredGroupedList.length === 0" class="empty-state">
      <span style="font-size: 40px; display: block; margin-bottom: 8px;">📭</span>
      <span>لا توجد واجبات مسجلة في هذا القسم أو الشعبة.</span>
    </div>

    <!-- Grouped Homeworks List (Using Shared AppGroupCard) -->
    <div v-else class="schedule-days-list">
      <AppGroupCard 
        v-for="(group, gIndex) in filteredGroupedList" 
        :key="group.dateKey" 
        :index="gIndex + 1"
        :title="`واجبات يوم ${group.dayName}`"
        :items="group.items"
        :date="group.formattedDate"
        dateLabel="تاريخ التسليم"
        @item-click="(hw) => $emit('item-click', hw)"
      />
    </div>
  </main>
</template>

<script setup>
import { computed } from 'vue';
import AppGroupCard from '../../shared/AppGroupCard.vue';

const props = defineProps({
  loading: {
    type: Boolean,
    default: false
  },
  activeTab: {
    type: String,
    default: 'current'
  },
  selectedSectionId: {
    type: [Number, String, null],
    default: null
  },
  homeworks: {
    type: Array,
    default: () => [
      {
        id: 101,
        title: 'تمارين القسمة المطولة ص 45',
        description: 'حل التمارين من رقم 1 إلى 8 في كراسة الواجب وكتاب التدريبات مع كتابة خطوات التحقق.',
        subject_name: 'الرياضيات',
        section_id: 1,
        section_name: 'أ5',
        grade_name: 'الصف الخامس',
        due_date: '2026-08-30',
        has_solution: 1,
        solution_text: 'خطوات الحل النموذجية:\n1) 450 ÷ 5 = 90\n2) 720 ÷ 8 = 90\n3) التحقق عبر ضرب الناتج في المقسوم عليه.'
      },
      {
        id: 102,
        title: 'مسائل الضرب في عددين',
        description: 'حل التدريب الثاني ص 38 مع توضيح خطوات إعادة التجميع بدقة.',
        subject_name: 'الرياضيات',
        section_id: 2,
        section_name: 'ب5',
        grade_name: 'الصف الخامس',
        due_date: '2026-08-30',
        has_solution: 0,
        solution_text: ''
      },
      {
        id: 103,
        title: 'استكشاف تركيب الخلية الحية',
        description: 'رسم وتحديد أجزاء الخلية النباتية والحيوانية وكتابة وظيفة الميتوكوندريا ص 56.',
        subject_name: 'العلوم العامة',
        section_id: 1,
        section_name: 'أ5',
        grade_name: 'الصف الخامس',
        due_date: '2026-08-31',
        has_solution: 1,
        solution_text: 'الإجابة النموذجية:\n- الغشاء الخلوي: حماية وتنظيم.\n- الميتوكوندريا: إنتاج الطاقة.\n- الجدار الخلوي: في الخلية النباتية فقط.'
      },
      {
        id: 104,
        title: 'تطبيقات القوة والحركة والسرعة',
        description: 'حل المسائل الحسابية في قانون السرعة = المسافة ÷ الزمن ص 64.',
        subject_name: 'العلوم العامة',
        section_id: 2,
        section_name: 'ب5',
        grade_name: 'الصف الخامس',
        due_date: '2026-08-31',
        has_solution: 0,
        solution_text: ''
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

const emit = defineEmits(['item-click', 'open-create', 'delete-homework']);

// Filter and Group Homeworks by Date
const filteredList = computed(() => {
  let list = props.homeworks || [];
  if (props.selectedSectionId !== null) {
    list = list.filter(h => h.section_id === props.selectedSectionId);
  }
  return list;
});

const filteredGroupedList = computed(() => {
  const groups = {};
  filteredList.value.forEach((hw) => {
    const key = hw.due_date || '2026-08-30';
    if (!groups[key]) {
      const dateObj = new Date(hw.due_date);
      const days = ['الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'];
      const dayName = isNaN(dateObj) ? 'المحدد' : days[dateObj.getDay()];
      groups[key] = {
        dateKey: key,
        dayName,
        formattedDate: hw.due_date,
        items: []
      };
    }
    groups[key].items.push(hw);
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
