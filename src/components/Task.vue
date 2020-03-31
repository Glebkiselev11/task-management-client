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
import axios from 'axios';

export default {
  name: 'Task',
  props: {
    title: {
      type: String,
      default: 'Title',
    },
    description: {
      type: String,
      default: 'Description',
    },
    id: {
      type: Number,
    },
    status: {
      type: String,
    },
  },

  data: () => ({

    config: {
      headers: { 
        Authorization: `Bearer ${localStorage.getItem('accessToken')}` 
      }
    },
  }),

  methods: {
    async deleteTask() {
      try {
        await axios.delete(`/tasks/${this.id}`, this.config);
        this.$emit('getTask'); // После удаления запрашиваем по новой список задач
      } catch (error) {
        cosole.log(error)
      }
    }
  }
}
</script>

<style scoped>
  .task-wrap {
    margin: 6px;
    padding: 6px;
    background: white;
    box-shadow: 4px 4px 6px 0px rgba(0,0,0,0.7);
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
    box-shadow: 4px 4px 6px 0px rgba(0,0,0,0.2);
  }
</style>