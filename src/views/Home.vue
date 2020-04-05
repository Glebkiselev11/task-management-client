<template>
  <div class="home container">
    
    <Navigation />

    <AddTask />

    <!-- Поиск, фильтр -->
    <div class="tools-bar">
      <form class="search" @submit.prevent="searchFilter()">
        <input type="text" v-model="params.search">
        <button type="submit">Search</button>
      </form>

      <select 
        v-model="params.status" 
        @input="searchFilter()"
      > 
        <option :value="null">No filter status</option>
        <option value="OPEN">Open</option>
        <option value="DONE">Done</option>
        <option value="IN_PROGRESS">In progress</option>
      </select>
    </div>

    <h2 v-if="!tasks.length">Nothing found</h2>
    
    <!-- Елемент таски -->
    <Task 
      v-else
      v-for="task of tasks"
      :key="task.id"
      :id="task.id"
      :title="task.title"
      :description="task.description"
      :status="task.status"
    />
  </div>
  
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import erorStatusHandlerMixin from '@/mixins/errorStatusHandler.mixin.js';
import AddTask from '@/components/AddTask';
import Task from '@/components/Task';
import Navigation from '@/components/Navigation';

export default {
  name: 'Home',
  components: {
    AddTask,
    Task,
    Navigation
  },

  mixins: [erorStatusHandlerMixin], // В нем метод для обработки статусов ошибки

  data: () => ({
    params: {
      // Поиск по задачам
      search: null,
      status: null,
    },
  }),

  computed: {
    ...mapGetters(['tasks']),
  },

  async mounted() {
    try {
      await this.getTasks(this.params);
    } catch (error) {
      if (error.statusCode) {
        this.errorStatusHandler(error.statusCode);
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
    display: flex;
    justify-content: space-between;
  }
</style>
