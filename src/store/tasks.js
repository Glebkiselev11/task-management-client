import axios from 'axios';
import errorHelper from './errorHelper';

export default {
  state: {
    tasks: [], // Задачи, которые получаем с сервера
  },

  getters: {
    tasks: state => state.tasks,
  },

  mutations: {
    setTasks(state, tasks) {
      state.tasks = tasks;
    }
  },

  actions: {

    async getTasks({commit, getters}, params) {
      const config = getters.axiosConfigWithToken;
      
      // Подмешиваем параметры, там поисковой запрос
      config.params = params;

      try {
        const { data } = await axios.get('/tasks/', config);
        commit('setTasks', data);
      } catch (error) {
        throw errorHelper(error);
      }
    }
  }
}