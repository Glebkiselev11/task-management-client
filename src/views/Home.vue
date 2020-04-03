<template>
  <div class="home container">

    <!-- Поиск, фильтр -->
    <div class="tools-bar">
      <form class="search" @submit.prevent="searchFilter()">
        <input type="text" v-model="params.search">
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
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'Home',
  components: {
    Task,
  },
  data: () => ({
    params: {
      // Поиск по задачам
      search: null,
    },
  }),

  computed: {
    ...mapGetters(['tasks']),
  },

  async mounted() {
    try {
      await this.getTasks(this.params);
    } catch (error) {
      // Если токен не действителен, или не найден, то редиректим на авторизацию
      if (error.statusCode === 401) {
        this.$router.push('login');
      }
    }
  },

  methods: {
    ...mapActions(['getTasks']),

    async searchFilter() {
      if (this.params.search === '') {
        this.params.search = null;
      }

      await this.getTasks(this.params);
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
