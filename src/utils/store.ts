const DRAG_ITEM = "drag-item"
const DRAG_POS = "drag-pos"
interface DragPos {
  posX: number;
  posY: number;
}
class Store extends Map {
  setDragData(item: HTMLElement, pos: DragPos) {
    this.set(DRAG_ITEM, item);
    this.set(DRAG_POS, pos);
  }
  getDragData() {
    const item: HTMLElement = this.get(DRAG_ITEM);
    const pos:DragPos = this.get(DRAG_POS);
    return {
      item,
      pos
    }
  }
  clearDragItem() {
    this.set(DRAG_ITEM, null);
    this.set(DRAG_POS, null);
  }
}
const store = new Store()
export default store
