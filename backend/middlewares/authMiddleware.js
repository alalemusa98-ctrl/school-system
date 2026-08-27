const { verifyToken } = require('../utils/jwt');

// 1. وسيط التحقق من هوية المستخدم
exports.authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // استخراج التوكن بعد 'Bearer'

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'عذراً، يجب تسجيل الدخول للوصول لهذه الخدمة.'
    });
  }

  try {
    const decoded = verifyToken(token);
    req.user = decoded; // حقن بيانات المستخدم في كائن الطلب
    next();
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: 'رمز الجلسة غير صالح أو منتهي الصلاحية.'
    });
  }
};

// 2. حارس الصلاحيات القائم على الأدوار (RBAC Guard)
exports.requireRole = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: 'عذراً، ليس لديك الصلاحية المطلوبة للوصول لهذا الإجراء.'
      });
    }
    next();
  };
};
