<template>
  <div class="navigation-wrap">
    <p>Task management v1.0</p>
    <button 
      @click="logout"
      class="btn-exit"
    >Logout</button>
  </div>
</template>

<script>
export default {
  name: 'Navigation',

  methods: {
    logout() {
      localStorage.removeItem('accessToken');
      this.$router.push('login');
    }
  }
}
</script>

<style  scoped>
.navigation-wrap {
  height: 20px;
  display: flex;
  justify-content: space-between;
}

.btn-exit {
  cursor: pointer;
}

.btn-exit:hover {
  box-shadow: 1px 1px 1px #2222;
}
</style>
