# Vue 3 Component
a vue3 component that allows you to drag and drop anything freely

# How to use
1.import DraggableContainer and register it as a vue component</br>
2.put anything you want between <DraggableContainer></DraggableContainer></br>
3.drag them within DraggableContainer or between two or more DraggableContainers

# Props
1.dragSender (boolean)</br>
mark DraggableContainer as a sender not allow drop (include its contain)</br>

2.senderMove (boolean)</br>
use in a sender DraggableContainer, allows its contain move within it</br>

3.dragIndex (number)</br>
like sortable.js you can only drag and drop item between tow or more DraggableContainers that has same dragIndex 
(default is 0)

# Warning
DraggableContainer will set the contains css style {position: absolute} which might cause style problem
