<template>
  <div class="container" @drop="onDrop($event)" @dragover="allowDrop($event)">
    <div draggable="true" @dragend="onDragEnd($event)" @mousedown="onMouseDown($event)" class="drag-body">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent, reactive, toRefs} from "vue";
import emitter from "../utils/mitt";
import store from "../utils/store";
interface RefData {
  posX: number;
  posY: number;
}

export default defineComponent({
  name: "DraggableContainer",
  props: {
    emitReceive: {
      type: Boolean,
      default: false
    },
    emitIndex: {
      type: Number,
      default: 0
    }
  },
  setup(props, ctx) {
    const refData = reactive<RefData>({
      posX: 0,
      posY: 0
    });
    const findParent = (el: HTMLElement | null, className: string): HTMLElement | null => {
      if (!el) return null;
      let res = el;
      while (res.className !== className) {
        if (res.className === "container") return null;
        if (res.parentElement) {
          res = res.parentElement;
        }
      }
      return res;
    }
    const allowDrop = (e: DragEvent): void => {
      e.preventDefault();
    };
    const onMouseDown = (e: MouseEvent): void => {
      let target = findParent(e.target as HTMLElement, "drag-body");
      const targetParent = findParent(target, "container")
      if (!target || !targetParent) return;
      const posX = e.clientX - target.offsetLeft - targetParent.offsetLeft;
      const posY = e.clientY - target.offsetTop - targetParent.offsetTop;
      store.setDragData(target, {posX, posY});
    }
    const onDragEnd = (e: DragEvent): void => {
      store.clearDragItem();
    }
    const onDrop = (e: DragEvent): void => {
      const {item, pos} = store.getDragData();
      // const target = store.get(DRAG_ITEM);
      const parent = e.target as HTMLElement;
      if (!parent) return;
      let posX = refData.posX;
      let posY = refData.posY;
      posX = e.clientX - posX;
      posY = e.clientY - posY;
      item.remove();
      parent.appendChild(item);
      let t1 = e.clientX - parent.offsetLeft - pos.posX
      let t2 = e.clientY - parent.offsetTop - pos.posY
      item.style.left = t1 + 'px';
      item.style.top = t2 + 'px';
    }
    return {
      ...toRefs(refData),
      allowDrop,
      onMouseDown,
      onDragEnd,
      onDrop
    }
  },
  directives: {
    alert: {
      mounted(el, binding) {
        const { emitType, emitIndex } = binding.value;
        if (emitType) {
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
.drag-body {
  position: absolute;
  z-index: 1000;
  &:hover {
    cursor: move;
  }
}
</style>
