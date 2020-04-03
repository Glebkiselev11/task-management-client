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
    
    <span>Not register yet? <router-link to="/register">Do it!</router-link></span>
    
    <br>

    <button  
      type="submit"
    >Sign in</button>
    
    
  </form>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'Login',
  data: () => ({
    username: '',
    password: '',
    errorMessage: null,
  }),
  methods: {
    ...mapActions(['signIn']),

    async submit() {
      const params = new URLSearchParams();
      params.append('username', this.username);
      params.append('password', this.password);

      try {
        await this.signIn(params);
        this.$router.push('/');
      } catch (error) {
        this.errorMessage = error.message
      }
    },
  },
};
</script>