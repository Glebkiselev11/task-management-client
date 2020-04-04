import axios from 'axios';
import errorHelper from './errorHelper';

export default {
  getters: {
    // Обычный конфиг для аксиоса
    axiosConfig() { 
      return { 
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      }
    },
    
    // Конфиг с токеном авторизации
    axiosConfigWithToken() {
      const token = `Bearer ${localStorage.getItem('accessToken')}`;
      return { 
        headers: { Authorization: token },
      }
    },
  },

  mutations: {
    setAccessToken(_, accessToken) {
      localStorage.setItem('accessToken', accessToken);
    },
  },
  
  actions: {
    // Авторизация
    async signIn({ commit, getters }, params) {
      try {
        const { data: { accessToken } } = await axios.post(
          '/auth/signin', 
          params, 
          getters.axiosConfig
        );
        // Устанавливаем полученный токен в локалстор
        commit('setAccessToken', accessToken);
      } catch (error) {
        throw errorHelper(error);
      }
    },
    
    // Регистрация
    async signUp({ getters }, params) {
      try {
        return { statusText } = await axios.post(
          '/auth/signup', 
          params, 
          getters.axiosConfig
        );
      } catch (error) {
        throw errorHelper(error);
      }
    },
  },
}