<template>
  <!-- <HelloWorld msg="Hello Vue 3 + TypeScript + Vite" /> -->
  <div class="container">
    <DraggableContainer>
      <div class="circle"></div>
    </DraggableContainer>
    <DraggableContainer drag-sender sender-move>
      <div class="circle"></div>
      <div class="circle"></div>
    </DraggableContainer>
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
.circle {
  z-index: 1000;
  width: 50px;
  height: 50px;
  background-color: blue;
  border-radius: 50px;
  filter: Alpha(opacity=50);
  opacity: 0.5;
}
</style>
