<template>
  <main class="hw-container">
    <!-- Loading State -->
    <div v-if="loading" class="loading-state">
      جاري استرجاع جدول الامتحانات... ⏳
    </div>

    <!-- Upcoming Exams View -->
    <div v-else-if="activeTab === 'upcoming'">
      <div v-if="groupedUpcomingExams.length === 0" class="empty-state">
        🎈 لا توجد امتحانات محددة حالياً لشعبتك!
      </div>

      <div v-else class="schedule-days-list">
        <AppGroupCard
          v-for="group in groupedUpcomingExams"
          :key="group.dateKey"
          :index="group.index"
          :title="`يوم ${group.dayName}`"
          :items="group.exams"
          :date="group.dateFormatted"
          dateLabel="تاريخ اليوم"
          @item-click="(exam) => $emit('item-click', exam)"
        />
      </div>
    </div>

    <!-- Exam Results Archive View -->
    <div v-else>
      <div v-if="groupedResultsExams.length === 0" class="empty-state">
        لا توجد نتائج اختبارات سابقة في السجل حالياً.
      </div>

      <div v-else class="schedule-days-list">
        <AppGroupCard
          v-for="group in groupedResultsExams"
          :key="group.dateKey"
          :index="group.index"
          :title="`نتائج يوم ${group.dayName}`"
          :items="group.exams"
          :date="group.dateFormatted"
          dateLabel="تاريخ الإعلان"
          @item-click="(exam) => $emit('item-click', exam)"
        />
      </div>
    </div>
  </main>
</template>

<script setup>
import AppGroupCard from '../../shared/AppGroupCard.vue';

const props = defineProps({
  loading: { type: Boolean, default: false },
  activeTab: { type: String, default: 'upcoming' },
  groupedUpcomingExams: { 
    type: Array, 
    default: () => [
      {
        dateKey: '2026-08-30',
        index: 1,
        dayName: 'الأحد',
        dateFormatted: '30 أغسطس 2026',
        exams: [
          { 
            id: 1, 
            title: 'اختبار الجبر والهندسة', 
            subject_name: 'الرياضيات', 
            teacher_name: 'أ. أحمد سالم', 
            due_date: '30 أغسطس 2026 (08:30 ص)', 
            room: 'القاعة الرئيسية 3', 
            has_solution: true, 
            description: 'يشمل اختبار نصف الفصل وحدات الأعداد والعمليات الحسابية والهندسة المستوية.' 
          },
          { 
            id: 2, 
            title: 'اختبار الكيمياء والفيزياء', 
            subject_name: 'العلوم العامة', 
            teacher_name: 'أ. فاطمة العبيدي', 
            due_date: '30 أغسطس 2026 (10:30 ص)', 
            room: 'مختبر العلوم 1', 
            has_solution: false, 
            description: 'اختبار تحصيلي في حالات المادة، الطاقة، والجدول الدوري.' 
          }
        ]
      },
      {
        dateKey: '2026-09-02',
        index: 2,
        dayName: 'الثلاثاء',
        dateFormatted: '02 سبتمبر 2026',
        exams: [
          { 
            id: 3, 
            title: 'اختبار النحو والقراءة', 
            subject_name: 'اللغة العربية', 
            teacher_name: 'أ. محمود طارق', 
            due_date: '02 سبتمبر 2026 (08:30 ص)', 
            room: 'القاعة 4', 
            has_solution: true, 
            description: 'قواعد الإعراب، الفاعل والمفعول به، ونصوص القراءة والتعبير.' 
          },
          { 
            id: 4, 
            title: 'English Midterm Exam', 
            subject_name: 'اللغة الإنجليزية', 
            teacher_name: 'أ. سارة الحكيم', 
            due_date: '02 سبتمبر 2026 (10:30 ص)', 
            room: 'معمل اللغات', 
            has_solution: true, 
            description: 'Grammar, vocabulary, reading comprehension and writing paragraph.' 
          }
        ]
      },
      {
        dateKey: '2026-09-04',
        index: 3,
        dayName: 'الخميس',
        dateFormatted: '04 سبتمبر 2026',
        exams: [
          { 
            id: 5, 
            title: 'اختبار القرآن الكريم والحديث', 
            subject_name: 'التربية الإسلامية', 
            teacher_name: 'أ. عبد الله الفاسي', 
            due_date: '04 سبتمبر 2026 (08:30 ص)', 
            room: 'المصلى المدرسي', 
            has_solution: true, 
            description: 'حفظ وتفسير الآيات المقررة وأحاديث العقيدة والآداب الإسلامية.' 
          }
        ]
      }
    ] 
  },
  groupedResultsExams: { 
    type: Array, 
    default: () => [
      {
        dateKey: '2026-08-15',
        index: 1,
        dayName: 'الخميس',
        dateFormatted: '15 أغسطس 2026',
        exams: [
          { 
            id: 6, 
            title: 'اختبار الرياضيات الشهري', 
            subject_name: 'الرياضيات', 
            teacher_name: 'أ. أحمد سالم', 
            score: '19.5/20', 
            due_date: '15 أغسطس 2026', 
            room: 'القاعة 3', 
            has_solution: true,
            description: 'نتائج الاختبار الشهري الأول في مادة الرياضيات.'
          },
          { 
            id: 7, 
            title: 'اختبار العلوم الشهري', 
            subject_name: 'العلوم العامة', 
            teacher_name: 'أ. فاطمة العبيدي', 
            score: '20/20', 
            due_date: '15 أغسطس 2026', 
            room: 'مختبر العلوم', 
            has_solution: true,
            description: 'نتائج الاختبار الشهري الأول في مادة العلوم العامة.'
          }
        ]
      }
    ] 
  }
});

const emit = defineEmits(['item-click']);
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
