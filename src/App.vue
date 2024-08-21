<script setup lang="ts">
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { RouterLink, RouterView } from "vue-router";
//@ts-ignore
import AuthRefresh from './views/AuthRefresh.vue'
</script>

<template>
  <AuthRefresh>
    <RouterView />
  </AuthRefresh>
</template>

<style>
@font-face {
  font-family: "satoshi";
  src: local("satoshi"), url("./fonts/Satoshi-Variable.ttf");
}

* {
  box-sizing: border-box;
}

html {
  height: 100%;
}

body,
main {
  min-height: 100%;
  font-family: satoshi;
  user-select: none;
  -webkit-user-drag: none;
}

body::-webkit-scrollbar {
  width: 3px;
  background: transparent;
}

body::-webkit-scrollbar-track {
  width: fit-content;
  background: transparent;
}

body::-webkit-scrollbar-thumb {
  width: fit-content;
  background: #1E73BE;
}

.input_container {
  display: flex;
  align-items: center;
}

.inter-tight {
  font-family: satoshi;
  font-optical-sizing: auto;
  font-style: normal;
}
</style>
