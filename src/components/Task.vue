<template>
  <div class="task-wrap">
    <h2 class="title">{{title}}</h2>
    <p class="description">{{description}}</p>
  </div>
</template>

<script>
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
  }
}
</script>

<style scoped>
  .task-wrap {
    margin: 6px;
    padding: 6px;
    background: white;
    border-radius: 6px;
  }

  .title {
    margin-bottom: 10px;
  }
</style>