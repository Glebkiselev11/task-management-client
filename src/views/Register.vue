<template>
  <form class="form-signup form-sign" @submit.prevent="submit()">
    <h1>Please register</h1>

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

    <div class="input-wrap">
      <label for="inputPasswordRepeat">Repeat password</label>
      <input 
        v-model="passwordRepeat" 
        type="password" 
        id="inputPasswordRepeat" 
        placeholder="Repeat password"
        required
      />
    </div>

    <!-- Сообщение об ошибке -->
    <ErrorMessage 
      v-if="errorMessage" 
      key="error"
    >{{errorMessage}}</ErrorMessage>

    <!-- Если все успешно -->
    <div v-if="statusText">
      <span class="status-text">{{statusText}}</span>
      <router-link to="login">Go login</router-link>
    </div>
    
    <button 
      v-else 
      type="submit"
    >Register</button>
  </form>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'Register',
  data: () => ({
    username: '',
    password: '',
    passwordRepeat: '',
    errorMessage: null,
    statusText: null, // Ответ с сервера (если не пришло ошибки)
  }),

  methods: {
    ...mapActions(['signUp']),

    async submit() {
      if (this.password !== this.passwordRepeat) {
        this.errorMessage = 'Passwords not equals';
        return;
      }

      this.errorMessage = null;

      const params = new URLSearchParams();
      params.append('username', this.username);
      params.append('password', this.password);

      try {
        this.statusText = await this.signUp(params);
      } catch (error) {
        this.errorMessage = error.message;
      }
    },
  }
}
</script>

<style scoped>

.status-text {
  color: green;
}
</style>