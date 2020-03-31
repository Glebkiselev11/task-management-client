<template>
  <div class="home container">

    <!-- Елемент таски -->
    <Task 
      v-for="(task, index) of tasks"
      :key="index"
      :title="task.title"
      :description="task.description"
    />
  </div>
  
</template>

<script>
import Task from '@/components/Task'

export default {
  name: 'Home',
  components: {
    Task,
  },
  data: () => ({
    tasks: [
      {
        title: 'first task',
        description: 'lorem lorem',
      },
      {
        title: 'second task',
        description: 'lorem2 lorem2',
      }
    ]
  }),

};
</script>

<style scoped>
  .home {
    width: 700px;
    display: flex;
    flex-direction: column;
  }
</style>
