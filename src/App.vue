<template>
  <div id="app">
    <HeaderBarComponent appTitle="ToDo List" welcomeMessage="Welcome"/>
    <TodoListComponent msg="Your Amazing ToDo List"/>
  </div>
</template>
<style src="./global.css"></style>
<script>
import TodoListComponent from './components/todo-list/todo-list.component.vue'
import HeaderBarComponent from './components/header-bar/header-bar.component.vue'

export default {
    name: 'app',
    components: {
        TodoListComponent,
        HeaderBarComponent
    }
}
</script>

