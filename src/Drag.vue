<template>
    <div id='app'>
  <ul class="todo-list">
    <li @dragover.prevent @drop="dragFinish(-1, $event)" v-if="dragging > -1" class="trash-drop todo-item" v-bind:class="{drag: isDragging}">Delete</li>
    
    <li v-else>
      <input placeholder="Type new task and press enter" type="text" class="new-todo todo-item" v-model="newItem" @keyup.enter="addItem">
    </li>
    
    <li class="todo-item" v-for="item in todos" :key="item" draggable="true" @dragstart="dragStart(i, $event)" @dragover.prevent @dragenter="dragEnter" @dragleave="dragLeave" @dragend="dragEnd" @drop="dragFinish(i, $event)">
      <input type="checkbox" v-model="item.done" />
      <span :class="{done: item.done}">{{ item.title }}</span>
      <span class="remove-item" @click="removeItem(item)">x</span>
    </li>
  </ul>
</div>
</template>
<script>
const TODO_STORAGE_KEY = "todostorage";

let todoStorage = {
  fetch: () => JSON.parse(localStorage.getItem(TODO_STORAGE_KEY) || "[]"),
  save: todos => localStorage.setItem(TODO_STORAGE_KEY, JSON.stringify(todos))
};

export default {
    name:"Drag",
  data: () => {
    return {
      todos: todoStorage.fetch(),
      newItem: "",
      dragging: -1
    };
  },
  methods: {
    addItem() {
      if (!this.newItem) {
        return;
      }
      this.todos.push({
        title: this.newItem,
        done: false
      });
      this.newItem = "";
    },
    removeItem(item) {
      this.todos.splice(this.todos.indexOf(item), 1);
    },
    removeItemAt(index) {
      this.todos.splice(index, 1);
    },
    dragStart(which, ev) {
      ev.dataTransfer.setData('Text', this.id);
      ev.dataTransfer.dropEffect = 'move'
      this.dragging = which;
    },
    
    dragEnd() {
      this.dragging = -1
    },
    dragFinish(to, ev) {
      this.moveItem(this.dragging, to);
      ev.target.style.marginTop = '2px'
      ev.target.style.marginBottom = '2px'
    },
    moveItem(from, to) {
      if (to === -1) {
        this.removeItemAt(from);
      } else {
        this.todos.splice(to, 0, this.todos.splice(from, 1)[0]);
      }
    }
  },
  computed: {
    isDragging() {
      return this.dragging > -1
    }
  },
  // watch todos change for localStorage persistence
  watch: {
    todos: {
      handler: function(todos) {
        todoStorage.save(todos);
      },
      deep: true
    }
  }
}

</script>
<style scoped>
body {
  font-family: "Source Sans Pro", "Arial", sans-serif;
}

* {
  box-sizing: border-box;
}

.todo-list {
  list-style-type: none;
  padding: 10px;
}

.done {
  text-decoration: line-through;
  color: #888;
}

.new-todo {
  width: 100%;
}

.trash-drop {
  border: 2px dashed #ccc !important;
  text-align: center;
  color: #e33;
}

.trash-drop:-moz-drag-over {
  border: 2px solid red;
}

.todo-item {
  border: 1px solid #ccc;
  border-radius: 2px;
  padding: 14px 8px;
  margin-bottom: 3px;
  background-color: #fff;
  box-shadow: 1px 2px 2px #ccc;
  font-size: 22px;
}

.remove-item {
  float: right;
  color: #a45;
  opacity: 0.5;
}

.todo-item:hover .remove-item {
  opacity: 1;
  font-size: 28px;
}

</style>