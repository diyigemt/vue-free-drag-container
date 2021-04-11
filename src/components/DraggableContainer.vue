<template>
  <div class="container" @drop="onDrop($event)" @dragover="allowDrop($event)">
    <div draggable="true" @dragstart="onDragStart($event)" @dragend="onDragEnd($event)" @mousedown="onMouseDown($event)"
         class="drag-body">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent, reactive, toRefs} from "vue";
import store from "../core/store";
interface RefData {
  posX: number;
  posY: number;
}

export default defineComponent({
  name: "DraggableContainer",
  props: {
    dragSender: {
      type: Boolean,
      default: false
    },
    senderMove: {
      type: Boolean,
      default: false
    },
    dragIndex: {
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
      const index = store.getDragIndex();
      if (index !== props.dragIndex) return;
      if (!props.dragSender) {
        e.preventDefault();
      }
      if (props.dragSender && props.senderMove) {
        e.preventDefault();
      }
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
      const parent = findParent(e.target as HTMLElement, "container");
      if (!parent) return;
      if (item.parentElement !== parent) {
        item.remove();
        parent.appendChild(item);
      }
      const left = e.clientX - parent.offsetLeft - pos.posX
      const top = e.clientY - parent.offsetTop - pos.posY
      item.style.left = left + 'px';
      item.style.top = top + 'px';
    }
    const onDragStart = (e: DragEvent): void => {
      store.setDragIndex(props.dragIndex);
    }
    return {
      ...toRefs(refData),
      allowDrop,
      onMouseDown,
      onDragEnd,
      onDrop,
      onDragStart
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
