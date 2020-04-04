export default {
  methods: {
    // Общее поведение для работы с ошибками
    errorStatusHandler(code) {
      switch (code) {
        case 401:
          this.$router.push('login');
          break;
        default:
          break;
      };

    },
  }
}