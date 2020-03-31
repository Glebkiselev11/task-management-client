<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style>
* {
  font-family: 'Courier New', Courier, monospace;
  margin: 0;
  padding: 0;
}

body {
  background: rgb(164, 168, 204);
}


.container {
  margin: 0 auto;
  max-width: 1200px;
}

.input-wrap {
  display: flex;
  flex-direction: column;
  height: 50px;
}

.form-sign {
  width: 290px;
  margin: 300px auto;
}
</style>
