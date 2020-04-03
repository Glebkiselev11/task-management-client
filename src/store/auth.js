import axios from 'axios';

export default {
  state: {
    axiosConfig: { headers: {'Content-Type': 'application/x-www-form-urlencoded'} },
  },

  getters: {
    axiosConfig: s => s.axiosConfig,
    accessToken() {
      localStorage.getItem('accessToken');
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
        throw new Error(error);
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
        throw new Error(error);
      }
    },
  },
}