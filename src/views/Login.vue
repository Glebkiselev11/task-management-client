<template>
  <form class="form-signin form-sign" @submit.prevent="submit()">
    <h1>Please sign in</h1>

    <div class="input-wrap">
      <label for="inputUsername">Username</label>
      <input 
        v-model="username" 
        type="text" 
        id="inputUsername" 
        placeholder="Username"
        required
      />
    </div>

    <div class="input-wrap">
      <label for="inputPassword">Password</label>
      <input 
        v-model="password" 
        type="password" 
        id="inputPassword" 
        placeholder="Password"
        required 
      />
    </div>

    <!-- Сообщение об ошибке -->
    <ErrorMessage 
      v-if="errorMessage" 
      key="error"
    >{{errorMessage}}</ErrorMessage>

    <button  
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
    axiosConfig: {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      }
    }
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
          this.axiosConfig
        );

        localStorage.setItem('accessToken', accessToken);
        this.$router.push('/');

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