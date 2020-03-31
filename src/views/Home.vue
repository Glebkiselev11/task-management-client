<template>
  <div class="home container">

    <!-- Поиск, фильтр -->
    <div class="tools-bar">
      <form class="search" @submit.prevent="searchFilter()">
        <input type="text" v-model="config.params.search">
        <button type="submit">Search</button>
      </form>
    </div>

    <h2 v-if="!tasks.length">Nothing found</h2>
    
    <!-- Елемент таски -->
    <Task 
      v-else
      v-for="(task, index) of tasks"
      :key="index"
      :title="task.title"
      :description="task.description"
      :id="task.id"
      :status="task.status"
      @getTask="getTasks()"
    />
  </div>
  
</template>

<script>
import Task from '@/components/Task';
import axios from 'axios';

export default {
  name: 'Home',
  components: {
    Task,
  },
  data: () => ({
    tasks: [],

    config: {
      headers: { 
        Authorization: `Bearer ${localStorage.getItem('accessToken')}` 
      },
      params: {
        // Поиск по задачам
        search: null,
      },
    },
  }),

  async mounted() {
    await this.getTasks();
  },

  methods: {
    async searchFilter() {
      await this.getTasks();
    },

    async getTasks() {
      if (this.config.params.search === '') {
        this.config.params.search = null;
      }

      try {
        const { data } = await axios.get('/tasks/', this.config);
        this.tasks = data;
      } catch (error) {
        if (error.response) {
          // Если токен не действителен, или не найден, то редиректим на авторизацию
          if (error.response.status === 401) {
            this.$router.push('login');
          }
        }
      }
    },
  }
};
</script>

<style scoped>
  .home {
    width: 700px;
    display: flex;
    flex-direction: column;
  }

  .tools-bar {
    padding: 5px;
    border-bottom: 1px solid grey;
  }
</style>
