<template>
  <span class="error-message">
    <slot></slot>
  </span>
</template>

<script>
export default {
  name: 'ErrorMessage',
};
</script>

<style scoped>
  .error-message {
    display: block;
    margin: 0.6em 0;
    color: red;
  }
</style>
