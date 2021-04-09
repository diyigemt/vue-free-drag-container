<template>
  <div v-alert="{emitType, emitIndex}" class="container" :id="'container' + keys" @ondrag="allowDrop">
    <div :id="'obj' + keys" draggable="true">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent, reactive, onMounted, toRefs} from "vue";
import emitter from "../utils/mitt";

interface RefData {
  posX: number;
  posY: number;
  maxX: number;
  maxY: number;
  keys: string;
  container: null | HTMLElement;
  obj: null | HTMLElement;
}

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
    const refData = reactive<RefData>({
      posX: 0,
      posY: 0,
      maxX: -1,
      maxY: -1,
      keys: Math.random().toFixed(8).toString(),
      container: null,
      obj: null
    })
    const mousemove = (e: MouseEvent): void => {
      if (!e) (e as any) = window.event; //IE
      let left = (e.clientX - refData.posX);
      let top = (e.clientY - refData.posY);
      if (left < 0) left = 0;
      if (top < 0) top = 0;
      refData.obj!.style.left = left + "px";
      refData.obj!.style.top = top + "px";
    }
    const handleDragend = (): void => {
      if (refData.obj!.offsetLeft > refData.maxX || refData.obj!.offsetTop > refData.maxY) {
        if (props.emitType === "sender") {
          emitter.emit("emit-".concat(props.emitIndex.toString()), refData.obj);
        }
      }
    }
    const allowDrop = (e: DragEvent): void => {
      e.preventDefault();
    }
    onMounted(() => {
      const circle = refData.obj = document.getElementById("obj".concat(refData.keys)) as HTMLElement;
      const container = refData.container = document.getElementById("container".concat(refData.keys)) as HTMLElement;
      refData.maxX = container.offsetLeft - circle.offsetWidth;
      refData.maxY = container.offsetTop - circle.offsetHeight;
      (circle as HTMLHtmlElement).addEventListener("mousedown", (e: MouseEvent) => {
        refData.posX = e.x - circle.offsetLeft;
        refData.posY = e.y - circle.offsetTop;
        document.onmousemove = mousemove;
      });
      document.onmouseup = () => {
        document.onmousemove = null;
      };
    });
    return {
      ...toRefs(refData),
      handleDragend,
      mousemove,
      allowDrop
    }
  },
  directives: {
    alert: {
      mounted(el, binding) {
        const { emitType, emitIndex } = binding.value;
        if (emitType === "receiver") {
          emitter.on("emit".concat("-", emitIndex), <HTMLElement>(el: HTMLElement) => {
            console.log(Reflect.get(el as Object, "offsetTop"));
          });
        }
      }
    }
  }
});
</script>

<style scoped lang="scss">

.container {
  position: relative;
  width: 500px;
  height: 500px;
  background-color: #00000030;
}
</style>
