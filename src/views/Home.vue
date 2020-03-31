<template>
  <div class="home container">

    <h2 v-if="!tasks">No tasks yet.</h2>
    
    <!-- Елемент таски -->
    <Task 
      v-else
      v-for="(task, index) of tasks"
      :key="index"
      :title="task.title"
      :description="task.description"
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
    tasks: null,

    config: {
      headers: { 
        Authorization: `Bearer ${localStorage.getItem('accessToken')}` 
      },
    },
  }),

  async mounted() {
    try {
      const { data } = await axios.get('/tasks/', this.config);
      this.tasks = data;
    } catch (error) {
      // В любой непонятной ситуации редирект на страницу входа
      this.$router.push('login');
    }
    
  }

};
</script>

<style scoped>
  .home {
    width: 700px;
    display: flex;
    flex-direction: column;
  }
</style>
