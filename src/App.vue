<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <RouterView />
</template>

<style>
* {
  box-sizing: border-box;
}

html {
  height: 100%;
}

body {
  min-height: 100%;
  background: #343541;
  font-family: "DM Sans", sans-serif;
}

.header {
  font-weight: 700;
  font-size: 30px;
  width: fit-content;
  margin: 0 auto;
  position: relative;
  top: 120px;
}

.input_container {
  display: flex;
  align-items: center;
}

.inter-tight {
  font-family: "Inter Tight", sans-serif;
  font-optical-sizing: auto;
  font-style: normal;
}
</style>
