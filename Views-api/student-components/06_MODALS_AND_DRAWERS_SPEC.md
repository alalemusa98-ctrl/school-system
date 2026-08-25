# 🪟 06. مواصفات النوافذ والأدراج المنزلقة (`ShadcnDialog` & `ShadcnDrawer`)

> **الملف المرجعي:** [`Views-api/student-components/06_MODALS_AND_DRAWERS_SPEC.md`](file:///c:/Users/alhareth/Desktop/work/school-system/Views-api/student-components/06_MODALS_AND_DRAWERS_SPEC.md)  
> **أسماء المكونات البرمجية:**  
> 1. `ShadcnDialog.vue` ([`src/components/common/ShadcnDialog.vue`](file:///c:/Users/alhareth/Desktop/work/school-system/frontend/src/components/common/ShadcnDialog.vue))  
> 2. `ShadcnDrawer.vue` ([`src/components/common/ShadcnDrawer.vue`](file:///c:/Users/alhareth/Desktop/work/school-system/frontend/src/components/common/ShadcnDrawer.vue))  
> **الوصف:** المكونات المخصصة لعرض النوافذ المنبثقة من منتصف الشاشة (Dialog Modal) والأدراج السفلية المنزلقة (Bottom Sheet Drawer) لاستعراض التفاصيل الكاملة للواجبات والامتحانات والحلول النموذجية المعتمدة مع تحكم كامل بالـ Blur و Teleport.

---

## 📐 1. هيكل نافذة الـ Modal (`ShadcnDialog.vue`)

```html
<template>
  <Teleport to="body">
    <Transition name="shadcn-dialog">
      <div v-if="modelValue" class="shadcn-dialog-overlay" @click.self="close">
        <div class="shadcn-dialog-content" role="dialog" aria-modal="true">
          
          <!-- Modal Header -->
          <div class="shadcn-dialog-header">
            <div class="shadcn-dialog-title-group">
              <h2 class="shadcn-dialog-title">
                <span v-if="icon" class="dialog-icon">{{ icon }}</span>
                {{ title }}
              </h2>
              <p v-if="description" class="shadcn-dialog-description">
                {{ description }}
              </p>
            </div>

            <!-- Shadcn Close Button (X) -->
            <button class="shadcn-dialog-close" @click="close" aria-label="إغلاق">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>

          <!-- Modal Body Slot -->
          <div class="shadcn-dialog-body">
            <slot></slot>
          </div>

          <!-- Modal Footer Slot -->
          <div class="shadcn-dialog-footer">
            <slot name="footer">
              <button class="shadcn-btn-secondary" @click="close">
                إغلاق
              </button>
            </slot>
          </div>

        </div>
      </div>
    </Transition>
  </Teleport>
</template>
```

---

## ⚙️ 2. الـ Props والـ Events لنوافذ الـ Modals والأدراج

| الـ Prop / Event | النوع | الافتراضي | الوصف |
| :--- | :--- | :--- | :--- |
| `v-model` (`modelValue`) | `Boolean` | `false` | الحالة التفاعلية لإظهار أو إخفاء النافذة/الدرج. |
| `title` | `String` | `''` | عنوان النافذة المنبثقة. |
| `description` | `String` | `''` | الوصف التوضيحي السريع أسفل العنوان. |
| `icon` | `String` | `''` | الأيقونة أو الإيموجي المعروض بجانب العنوان. |
| `@close` / `update:modelValue` | `Emits` | — | الحدث المنطلق عند إغلاق النافذة (بالضغط على X أو خلفية الشاشة). |

---

## 🎨 3. قواعد الـ CSS للـ Overlay والتدرج الزجاجي

```css
/* خلفية التعتيم الضبابية (Dark Blur Backdrop Overlay) */
.shadcn-dialog-overlay {
  position: fixed;
  inset: 0;
  z-index: 9999;
  background: rgba(15, 23, 42, 0.6);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
}

/* كرت محتوى النافذة من المنتصف */
.shadcn-dialog-content {
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 24px;
  width: 100%;
  max-width: 520px;
  max-height: 85vh;
  display: flex;
  flex-direction: column;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  overflow: hidden;
  direction: rtl;
}

.shadcn-dialog-header {
  padding: 20px 24px 16px 24px;
  border-bottom: 1px solid #f1f5f9;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.shadcn-dialog-title {
  font-size: 1.25rem;
  font-weight: 800;
  color: #0f172a;
  display: flex;
  align-items: center;
  gap: 8px;
}

.shadcn-dialog-body {
  padding: 24px;
  overflow-y: auto;
  flex: 1;
}

.shadcn-dialog-footer {
  padding: 16px 24px;
  background: #f8fafc;
  border-top: 1px solid #f1f5f9;
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}
```
