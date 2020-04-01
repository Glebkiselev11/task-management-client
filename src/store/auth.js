import axios from 'axios';
import errorHelper from './errorHelper';

export default {

  getters: {
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
    async signIn({ commit }, params) {
      try {
        const { data: { accessToken } } = await axios.post(
          '/auth/signin', 
          params, 
          { 
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
          }
        );
        // Устанавливаем полученный токен в локалстор
        commit('setAccessToken', accessToken);
      } catch (error) {
        throw new Error(errorHelper(error));
      }
    },
  },
}