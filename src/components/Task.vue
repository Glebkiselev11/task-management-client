<template>
  <div class="task-wrap">
    <h2 class="title">{{title}}</h2>
    <p class="description">{{description}}</p>

    <div class="tools">
      <button 
        @click="deleteTask"
        class="delete-btn" 
      >Delete</button>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import erorStatusHandlerMixin from '@/mixins/errorStatusHandler.mixin.js';

export default {
  name: 'Task',
  mixins: [erorStatusHandlerMixin], // В нем метод для обработки статусов ошибки
  props: {
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    id: {
      type: Number,
      required: true
    },
    status: {
      type: String,
    },
  },

  methods: {
    ...mapActions(['deleteTaskById', 'getTasks']),

    async deleteTask() {
      try {
        await this.deleteTaskById(this.id);
      } catch (error) {
        this.errorStatusHandler(error.statusCode);
      }

      // После запрашиваем обновленный список задач
      try {
        await this.getTasks();
      } catch (error) {
        this.errorStatusHandler(error.statusCode);
      }
    },
  }
}
</script>

<style scoped>
  .task-wrap {
    margin: 6px;
    padding: 6px;
    background: white;
    box-shadow: 2px 2px 4px 0px rgba(0,0,0,0.7);
  }

  .title {
    margin-bottom: 10px;
  }

  .tools {
    display: flex;

  }

  .delete-btn {
    margin-left: auto;
    border: 1px solid red;
    color: red;
    padding: 2px;
    cursor: pointer;
  }
  .delete-btn:hover {
    box-shadow: 1px 1px 1px 0px rgba(0,0,0,0.2);
  }
</style>