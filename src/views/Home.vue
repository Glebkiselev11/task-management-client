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
import { mapGetters, mapActions } from 'vuex';
import Task from '@/components/Task';
import erorStatusHandlerMixin from '@/mixins/errorStatusHandler.mixin.js';

export default {
  name: 'Home',
  components: {
    Task,
  },

  mixins: [erorStatusHandlerMixin], // В нем метод для обработки статусов ошибки

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
    border-bottom: 1px solid grey;
  }
</style>
