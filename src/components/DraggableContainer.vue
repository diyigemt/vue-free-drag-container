<template>
  <div v-alert="{emitType, emitIndex}" ref="container" class="container">
    <div ref="circle" class="circle"></div>
  </div>
</template>

<script lang="ts">
import {defineComponent, reactive, onMounted, ref} from "vue";
import emitter from "../utils/mitt";

export default defineComponent({
  name: "DraggableContainer",
  props: {
    emitType: {
      type: String,
      default: "sender"
    },
    emitIndex: {
      type: Number,
      default: 0
    }
  },
  setup(props, ctx) {
    const container = ref();
    const circle = ref();
    const refData = reactive({
      posX: 0,
      posY: 0
    })
    const mousemove = (e: MouseEvent): void => {
      if (!e) (e as any) = window.event; //IE
      let left = (e.clientX - refData.posX);
      let top = (e.clientY - refData.posY);
      if (left < 0) left = 0;
      if (top < 0) top = 0;
      const maxLeft = container.value.offsetWidth - circle.value.offsetWidth;
      const maxTop = container.value.offsetHeight - circle.value.offsetHeight;
      if (left > maxLeft) left = maxLeft;
      if (top > maxTop) top = maxTop;
      circle.value.style.left = left + "px";
      circle.value.style.top = top + "px";
      if (props.emitType === "sender") {
        emitter.emit("emit-".concat(props.emitIndex.toString()));
      }
    }
    onMounted(() => {
      (circle.value as HTMLHtmlElement).addEventListener("mousedown", (e: MouseEvent) => {
        refData.posX = e.x - circle.value.offsetLeft;
        refData.posY = e.y - circle.value.offsetTop;
        document.onmousemove = mousemove;
      });
      document.onmouseup = () => {
        document.onmousemove = null;
      };
    });
    return {
      container,
      circle
    }
  },
  directives: {
    alert: {
      mounted(el, binding) {
        const { emitType, emitIndex } = binding.value;
        if (emitType === "receiver") {
          emitter.on("emit".concat("-", emitIndex), () => {
            console.log(emitIndex);
          });
        }
      }
    }
  }
});
</script>

<style scoped lang="scss">
.circle {
  position: absolute;
  z-index: 1000;
  width: 50px;
  height: 50px;
  background-color: blue;
  border-radius: 50px;
  filter: Alpha(opacity=50);
  opacity: 0.5;
}

.circle:hover {
  cursor: move;
}

.container {
  position: relative;
  width: 500px;
  height: 500px;
  background-color: #00000030;
}
</style>
