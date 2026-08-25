# 🎨 00. نظام التصميم الرقمي والمتغيرات البصرية (Design System Tokens)

> **الملف المرجعي المتخصص:** [`Views-api/student-components/00_DESIGN_SYSTEM_TOKENS.md`](file:///c:/Users/alhareth/Desktop/work/school-system/Views-api/student-components/00_DESIGN_SYSTEM_TOKENS.md)  
> **الغرض:** حصر وتوحيد القيم البصرية، ومتغيرات الألوان (Color Tokens)، والتأثيرات الزجاجية (Glassmorphism)، وأبعاد نمط iOS، والخطوط، والظلال لضمان إخراج واجهة الطالب بدقة 100%.

---

## 🎨 1. مصفوفة الألوان والتدرجات (Color Palette & Gradients)

### أ. التدرجات الرئيسية (Brand & Section Gradients)
```css
/* التدرج البنفسجي المعتمد لبوابة الطالب واختيارات العناصر */
--brand-gradient: linear-gradient(135deg, #7c3aed 0%, #4f46e5 100%);
--student-purple: #7c3aed;
--student-indigo: #4f46e5;

/* التدرج الأزرق المخصص للواجبات المدرسية */
--homework-gradient: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
--homework-accent: #3b82f6;

/* التدرج الأحمر المخصص للامتحانات والاختبارات */
--exam-gradient: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
--exam-accent: #ef4444;

/* التدرج الأخضر للحالات الناجحة والمكتملة */
--success-gradient: linear-gradient(135deg, #10b981 0%, #059669 100%);
--success-accent: #10b981;

/* التدرج البرتقالي للتنبيهات والمهام المعلقة */
--warning-gradient: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
```

### ب. الألوان الأساسية والمحايدة (Neutral Colors)
```css
--bg-main: #f8fafc;        /* خلفية التطبيق العامة */
--bg-card: #ffffff;        /* خلفية الكروت العادية */
--border-subtle: #e2e8f0;  /* حدود العناصر الخفيفة */
--border-highlight: #cbd5e1;

--text-main: #0f172a;      /* النص الرئيسي الداكن */
--text-muted: #64748b;     /* النص الفرعي التوضيحي */
--text-light: #94a3b8;     /* النص الخفيف جدًا */
```

---

## 🧊 2. التأثيرات الزجاجية والإنارة (Glassmorphism & Gloss Effects)

تتميز واجهة الطالب بتأثير الزجاج الضبابي المصقول (iOS Glass Effect):

```css
/* 1. خلفية الكرت الزجاجي الفاخر */
.glass-card {
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.6);
  box-shadow: 0 10px 30px -5px rgba(0, 0, 0, 0.05);
}

/* 2. طبقة انعكاس الضوء على أعلى الكروت (Shine Layer) */
.card-glass-shine {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 40%;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.35) 0%, rgba(255, 255, 255, 0) 100%);
  pointer-events: none;
  border-top-left-radius: inherit;
  border-top-right-radius: inherit;
}

/* 3. أزرار الزجاج الشفاف في الهيدر */
.glass-icon-btn {
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  width: 38px;
  height: 38px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: transform 0.2s ease, background 0.2s ease;
}
.glass-icon-btn:hover {
  background: rgba(255, 255, 255, 0.35);
  transform: scale(1.05);
}
```

---

## 📱 3. مقاسات ونمط iOS Mobile App Architecture

```css
/* أبعاد شريط الحالة العلوي (Status Bar) */
.ios-status-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 18px 4px 18px;
  height: 44px;
  color: #ffffff;
  font-size: 14px;
  font-weight: 600;
}

/* أبعاد الجزيرة التفاعلية (Dynamic Island Notch) */
.ios-dynamic-island {
  width: 110px;
  height: 28px;
  background: #000000;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 0 10px;
}
.camera-lens {
  width: 10px;
  height: 10px;
  background: #1a1a1a;
  border-radius: 50%;
  border: 1px solid #333333;
}

/* التقعير والتظليل الحواف (Border Radius Tokens) */
--radius-sm: 8px;
--radius-md: 14px;
--radius-lg: 20px;
--radius-xl: 28px;
--radius-full: 9999px;
```

---

## ✒️ 4. الخطوط والطباعة (Typography Tokens)

* **نوع الخط المعتمد:** `SF Arabic`, `Inter`, `-apple-system`, `BlinkMacSystemFont`, `sans-serif`.
* **أحجام النصوص:**
  * **عنوان هيدر الشاشة:** `1.25rem` (`20px`) - Weight: `700`
  * **عنوان المادة / الدرس:** `1.1rem` (`17.6px`) - Weight: `800`
  * **نص الوصف والبيانات:** `0.95rem` (`15.2px`) - Weight: `500`
  * **الوسوم والكبسولات:** `0.8rem` (`12.8px`) - Weight: `700`
