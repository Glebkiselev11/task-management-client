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
    async getTasks({commit, getters}, params = { search: null}) {
      const config = getters.axiosConfigWithToken;
      
      // Подмешиваем параметры, там поисковой запрос
      config.params = params;

      try {
        const { data } = await axios.get('/tasks/', config);
        commit('setTasks', data);
      } catch (error) {
        throw errorHelper(error);
      }
    },

    async deleteTaskById({getters}, id) {
      const config = getters.axiosConfigWithToken;

      try {
        await axios.delete(`/tasks/${id}`, config);
      } catch (error) {
        console.log(error)
        throw errorHelper(error);
      }
    }
  }
}