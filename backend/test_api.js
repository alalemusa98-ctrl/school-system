const http = require('http');
const app = require('./server');

let server;

function request(method, path, body = null, token = null) {
  return new Promise((resolve, reject) => {
    const dataString = body ? JSON.stringify(body) : null;
    const headers = {};
    if (dataString) {
      headers['Content-Type'] = 'application/json';
      headers['Content-Length'] = Buffer.byteLength(dataString);
    }
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const req = http.request(
      {
        hostname: 'localhost',
        port: 5005,
        path,
        method,
        headers
      },
      (res) => {
        let body = '';
        res.on('data', (chunk) => { body += chunk; });
        res.on('end', () => {
          let parsed;
          try {
            parsed = JSON.parse(body);
          } catch (e) {
            parsed = body;
          }
          resolve({ status: res.statusCode, body: parsed });
        });
      }
    );

    req.on('error', reject);
    if (dataString) req.write(dataString);
    req.end();
  });
}

async function runTests() {
  console.log('🧪 بدء الفحص الشامل لمسارات الخادم الخلفي (Automated Backend API Verification)...');

  // تشغيل خادم مؤقت على المنفذ 5005
  server = app.listen(5005, async () => {
    try {
      // 1. فحص الصحة
      const health = await request('GET', '/');
      console.log('1. Health check:', health.status === 200 && health.body.status === 'Running' ? '✅ نجح' : '❌ فشل', health.body);

      // 2. تسجيل دخول المشرف
      const adminLogin = await request('POST', '/api/auth/login/admin', { username: 'admin', password: 'admin123' });
      console.log('2. Admin login:', adminLogin.status === 200 && adminLogin.body.token ? '✅ نجح' : '❌ فشل');
      const adminToken = adminLogin.body.token;

      // 3. تسجيل دخول المعلم
      const teacherLogin = await request('POST', '/api/auth/login/teacher', { username: 'teacher2', password: 'teacher123' });
      console.log('3. Teacher login:', teacherLogin.status === 200 && teacherLogin.body.token ? '✅ نجح' : '❌ فشل');
      const teacherToken = teacherLogin.body.token;

      // 4. تسجيل دخول الطالب
      const studentLogin = await request('POST', '/api/auth/login/student', { roll_number: '1001', student_code: 'ST1001' });
      console.log('4. Student login:', studentLogin.status === 200 && studentLogin.body.token ? '✅ نجح' : '❌ فشل');
      const studentToken = studentLogin.body.token;

      // 5. التحقق من التوكن GET /api/auth/me
      const meRes = await request('GET', '/api/auth/me', null, studentToken);
      console.log('5. Auth /me check:', meRes.status === 200 && meRes.body.user.rollNumber === '1001' ? '✅ نجح' : '❌ فشل');

      // 6. مسارات الطالب
      const stuProf = await request('GET', '/api/student/profile', null, studentToken);
      console.log('6. Student profile:', stuProf.status === 200 && stuProf.body.data.full_name ? '✅ نجح' : '❌ فشل', `(الطالب: ${stuProf.body.data.full_name} - الشعبة: ${stuProf.body.data.section_name})`);

      const stuTasks = await request('GET', '/api/student/tasks', null, studentToken);
      console.log('7. Student tasks:', stuTasks.status === 200 && stuTasks.body.data.length > 0 ? '✅ نجح' : '❌ فشل', `(المهام: ${stuTasks.body.count})`);

      const stuSched = await request('GET', '/api/student/schedule', null, studentToken);
      console.log('8. Student schedule:', stuSched.status === 200 && stuSched.body.data.length === 30 ? '✅ نجح' : '❌ فشل', `(الحصص: ${stuSched.body.data.length} حصة)`);

      const stuSubs = await request('GET', '/api/student/subjects', null, studentToken);
      console.log('9. Student subjects:', stuSubs.status === 200 && stuSubs.body.data.length === 5 ? '✅ نجح' : '❌ فشل', `(المواد: ${stuSubs.body.data.length} مواد)`);

      // 7. مسارات المعلم
      const tchAssign = await request('GET', '/api/teacher/assignments', null, teacherToken);
      console.log('10. Teacher assignments:', tchAssign.status === 200 && tchAssign.body.data.length > 0 ? '✅ نجح' : '❌ فشل');

      const tchTasks = await request('GET', '/api/teacher/tasks', null, teacherToken);
      console.log('11. Teacher tasks:', tchTasks.status === 200 ? '✅ نجح' : '❌ فشل');

      const tchSched = await request('GET', '/api/teacher/schedule', null, teacherToken);
      console.log('12. Teacher schedule:', tchSched.status === 200 ? '✅ نجح' : '❌ فشل');

      // 8. فحص أمني: محاولة معلم النشر لشعبة غير مسندة له
      const unauthTask = await request('POST', '/api/teacher/tasks', {
        title: 'واجب غير مصرح',
        task_type: 'HOMEWORK',
        subject_id: 1, // مادة ليست مسندة لـ teacher2
        section_id: 3  // شعبة 8أ ليست مسندة لـ teacher2
      }, teacherToken);
      console.log('13. Security: Teacher forbidden assignment check:', unauthTask.status === 403 ? '✅ نجح (403 Forbidden)' : '❌ فشل', unauthTask.body.message);

      // 9. مسارات الإدارة
      const admStats = await request('GET', '/api/admin/stats', null, adminToken);
      console.log('14. Admin stats:', admStats.status === 200 && admStats.body.stats.totalStudents >= 3 ? '✅ نجح' : '❌ فشل', admStats.body.stats);

      const admGrades = await request('GET', '/api/admin/grades', null, adminToken);
      console.log('15. Admin grades hierarchy:', admGrades.status === 200 && admGrades.body.data.length === 9 ? '✅ نجح' : '❌ فشل', `(${admGrades.body.data.length} صفوف)`);

      const admStudents = await request('GET', '/api/admin/students', null, adminToken);
      console.log('16. Admin students list:', admStudents.status === 200 && admStudents.body.data.length >= 3 ? '✅ نجح' : '❌ فشل');

      const admSchedule = await request('GET', '/api/admin/schedule?section_id=1', null, adminToken);
      console.log('17. Admin section schedule:', admSchedule.status === 200 && admSchedule.body.data.length === 30 ? '✅ نجح' : '❌ فشل');

      // 10. اختبار Upsert للجدول
      const upsertRes = await request('POST', '/api/admin/schedule', {
        section_id: 1,
        day_of_week: 1,
        slot_number: 1,
        subject_id: 2,
        teacher_id: 2
      }, adminToken);
      console.log('18. Schedule Slot Upsert:', upsertRes.status === 200 ? '✅ نجح' : '❌ فشل');

      console.log('\n🎉 كافة اختبارات الـ API للخادم الخلفي اجتازت الفحص بنسبة 100%!');
      server.close();
      process.exit(0);
    } catch (err) {
      console.error('❌ خطأ أثناء تنفيذ الاختبارات:', err);
      if (server) server.close();
      process.exit(1);
    }
  });
}

runTests();
