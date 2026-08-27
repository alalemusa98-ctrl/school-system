const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const authRoutes = require('./routes/authRoutes');
const studentRoutes = require('./routes/studentRoutes');
const teacherRoutes = require('./routes/teacherRoutes');
const adminRoutes = require('./routes/adminRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded files statically
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Health check root endpoint
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'مرحباً بك في الخادم الخلفي لنظام إدارة المدرسة المرتكز على الطالب (V1 MVP)',
    version: '1.0.0',
    status: 'Running'
  });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/student', studentRoutes);
app.use('/api/teacher', teacherRoutes);
app.use('/api/admin', adminRoutes);

// Global 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'عذراً، المسار المطلوب غير موجود.'
  });
});

// Global 500 error handler
app.use((err, req, res, next) => {
  console.error('[ServerError]', err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'حدث خطأ داخلي في الخادم.'
  });
});

// Start Server
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`🚀 خادم المدرسة يعمل بنجاح على المنفذ ${PORT}: http://localhost:${PORT}`);
    console.log(`📁 مجلد المرفقات متاح على: http://localhost:${PORT}/uploads`);
  });
}

module.exports = app;
