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
    },
    setOneTask(state, task) {
      state.tasks.push(task);
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

    async createNewTask({getters, commit}, params) {
      const config = getters.axiosConfigWithToken;

      try {
        const { data } = await axios.post('/tasks/', params, config);
        commit('setOneTask', data);
      } catch (error) {
        throw errorHelper(error);
      }
    },

    async deleteTaskById({getters}, id) {
      const config = getters.axiosConfigWithToken;

      try {
        await axios.delete(`/tasks/${id}`, config);
      } catch (error) {
        throw errorHelper(error);
      }
    }
  }
}