import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

// Global Styles
import './assets/styles/main.css';
import './assets/styles/student-design.css';
import './assets/styles/admin-design.css';

const app = createApp(App);
app.use(router);
app.mount('#app');
