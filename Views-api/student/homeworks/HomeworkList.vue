<template>
  <main class="hw-container">
    <!-- Loading State -->
    <div v-if="loading" class="loading-state">
      جاري استرجاع الواجبات المدرسية... ⏳
    </div>

    <!-- Current Homeworks List -->
    <div v-else-if="activeTab === 'current'">
      <div v-if="groupedCurrentHomeworks.length === 0" class="empty-state">
        🎉 لا توجد واجبات معلقة حالياً في هذا القسم. أنت رائع!
      </div>

      <div v-else class="schedule-days-list">
        <AppGroupCard
          v-for="group in groupedCurrentHomeworks"
          :key="group.dateKey"
          :index="group.index"
          :title="`واجبات يوم ${group.dayName}`"
          :items="group.homeworks"
          :date="group.dateFormatted"
          dateLabel="تاريخ التسليم"
          @item-click="(hw) => $emit('item-click', hw)"
        />
      </div>
    </div>

    <!-- Archive Homeworks List -->
    <div v-else>
      <div v-if="groupedArchiveHomeworks.length === 0" class="empty-state">
        لا توجد واجبات مكتملة في الأرشيف حالياً.
      </div>

      <div v-else class="schedule-days-list">
        <AppGroupCard
          v-for="group in groupedArchiveHomeworks"
          :key="group.dateKey"
          :index="group.index"
          :title="`أرشيف واجبات يوم ${group.dayName}`"
          :items="group.homeworks"
          :date="group.dateFormatted"
          dateLabel="تاريخ الأرشيف"
          @item-click="(hw) => $emit('item-click', hw)"
        />
      </div>
    </div>
  </main>
</template>

<script setup>
import AppGroupCard from '../../shared/AppGroupCard.vue';

const props = defineProps({
  loading: { type: Boolean, default: false },
  activeTab: { type: String, default: 'current' },
  groupedCurrentHomeworks: {
    type: Array,
    default: () => [
      {
        dateKey: '2026-08-30',
        index: 1,
        dayName: 'الأحد',
        dateFormatted: '30 أغسطس 2026',
        homeworks: [
          { id: 1, title: 'تمارين القسمة المطولة ص 45', subject_name: 'الرياضيات', teacher_name: 'أ. أحمد سالم', submitted: false, due_date: '30 أغسطس 2026' },
          { id: 2, title: 'استكشاف تركيب الخلية', subject_name: 'العلوم العامة', teacher_name: 'أ. فاطمة العبيدي', submitted: true, due_date: '30 أغسطس 2026' }
        ]
      }
    ]
  },
  groupedArchiveHomeworks: {
    type: Array,
    default: () => [
      {
        dateKey: '2026-08-16',
        index: 1,
        dayName: 'الأحد',
        dateFormatted: '16 أغسطس 2026',
        homeworks: [
          { id: 3, title: 'تمارين الهندسة المستوية', subject_name: 'الرياضيات', teacher_name: 'أ. أحمد سالم', submitted: true, due_date: '16 أغسطس 2026' }
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
