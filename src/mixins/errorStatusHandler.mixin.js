export default {
  methods: {
    // Общее поведение для работы с ошибками
    errorStatusHandler(code) {
      switch (code) {
        default:
          this.$router.push('login');
          break;
      };

    },
  }
}