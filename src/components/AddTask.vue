<template>
  <!-- Панель для создания задачи -->
  <div class="addtask-panel-wrap">
    
    <button 
      @click="isShowForm = !isShowForm"
    >{{ isShowForm ? '- Hide add panel' : '+ Show add panel' }}</button>

    <form 
      v-show="isShowForm"
      @submit.prevent="addNewTask"
    >
      <h2>Create new task</h2>
      
      <div class="input">
        <label for="title-task">Title</label>
        <input 
          v-model="title"
          type="text" 
          id="title-task"
          required
          placeholder="write the title for your task..."
        >
      </div>
      
      <div class="input">
        <label for="task-description">Descripiton</label>
        <textarea
          v-model="description" 
          id="task-description" 
          placeholder="write a description for your task..."
          required
        ></textarea>
      </div>

      <ErrorMessage 
        v-if="errorMessage" 
        key="error"
      >{{errorMessage}}</ErrorMessage>

      <button 
        type="submit"
        class="submit-btn"
      >Add new task</button>

    </form>

  </div>
</template>

<script>
import { mapActions } from 'vuex';
import erorStatusHandlerMixin from '@/mixins/errorStatusHandler.mixin.js';

export default {
  name: 'AddTask',
  mixins: [erorStatusHandlerMixin], // В нем метод для обработки статусов ошибки

  data: () => ({
    isShowForm: false,

    title: null,
    description: null,
    errorMessage: null,
  }),

  methods: {
    ...mapActions(['createNewTask']),

    async addNewTask() {
      const params = new URLSearchParams();
      params.append('title', this.title);
      params.append('description', this.description);

      try {
        await this.createNewTask(params);
        this.title = this.description = null;
      } catch (error) {
        this.errorMessage = error.message;
        if (error.statusCode) {
          this.errorStatusHandler(error.statusCode);
        }
      }
    }
  }

}
</script>

<style scoped>

.addtask-panel-wrap {
  width: 100%;
  margin: 6px;
  display: flex;
  flex-direction: column;
  padding-bottom: 20px;
  border-bottom: 1px solid black;

}

.input {
  display: flex;
  flex-direction: column;
  margin-top: 10px;
}

.submit-btn {
  margin-top: 10px;
  padding: 5px;
  border: 1px solid green;
  color: green;
  cursor: pointer;
}
</style>