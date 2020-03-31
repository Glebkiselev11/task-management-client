<template>
  <form class="form-signin">
    <h1 class="h3 mb-3 font-weight-normal">Please sign in</h1>

    <div class="input-wrap">
      <label for="inputUsername">Username</label>
      <input 
        v-model="username" 
        type="text" 
        id="inputUsername" 
        placeholder="Username" 
      />
    </div>

    <div class="input-wrap">
      <label for="inputPassword">Password</label>
      <input 
        v-model="password" 
        type="password" 
        id="inputPassword" 
        placeholder="Password" 
      />
    </div>

    <!-- Сообщение об ошибке -->
    <ErrorMessage 
      v-if="errorMessage" 
      key="error"
    >{{errorMessage}}</ErrorMessage>

    <button 
      @click.prevent="submit()" 
      type="submit"
    >Sign in</button>
  </form>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Login',
  data: () => ({
    username: '',
    password: '',
    errorMessage: null,
  }),
  methods: {
    async submit() {
      const params = new URLSearchParams();
      params.append('username', this.username);
      params.append('password', this.password);

      try {
        const { data: { accessToken } } = await axios.post(
          '/auth/signin', 
          params, 
          {
            headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        });

        localStorage.setItem('accessToken', accessToken);
      } catch (error) {
        if (error.response) {
          this.errorMessage = error.response.data.message[0]
            ? error.response.data.message[0]
            : error.response.data.message;
        }
      }
    },
  },
};
</script>

<style scoped>
.form-signin {
  width: 25%;
  margin: auto;
}

.input-wrap {
  display: flex;
  flex-direction: column;
  height: 50px;
}
</style>
