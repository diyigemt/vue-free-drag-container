<template>
  <!-- <HelloWorld msg="Hello Vue 3 + TypeScript + Vite" /> -->
  <div class="container">
    <DraggableContainer/>
    <DraggableContainer/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import HelloWorld from './components/HelloWorld.vue'
import DraggableContainer from "./components/DraggableContainer.vue"

export default defineComponent({
  name: 'App',
  components: {
    HelloWorld,
    DraggableContainer
  }
})
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.container {
  float: left;
  margin: 2px;
}
</style>
