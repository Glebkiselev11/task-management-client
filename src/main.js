import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import ErrorMessage from '@/components/ErrorMessage'; // Визуальное отображение ошибок

Vue.config.productionTip = false;
Vue.component('ErrorMessage', ErrorMessage);

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
