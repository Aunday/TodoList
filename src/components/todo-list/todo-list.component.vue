<template src="./todo-list.component.html"></template>
<style scoped src="./todo-list.component.css"></style>
<script>
import TodoItemComponent from '../todo-item/todo-item.component.vue'
import StandardButtonComponent from '../standard-button/standard-button.component.vue'
import NewTodoItemComponent from '../todo-item/new-todo-item/new-todo-item.component.vue'
export default {
    name: 'ToDoListComponent',
    props: {
        msg: String
    },
    components: {
        TodoItemComponent,
        StandardButtonComponent,
        NewTodoItemComponent
    },
    data() {
        return {
            newTodoItemCreationVisible: false,
            todoItems: [
                {
                    id: 1,
                    label: 'Get job at ForgeRock',
                    complete: false,
                    priority: 'life changing'
                },
                {
                    id: 2,
                    label: 'Complete \'ToDo List\' assignment',
                    complete: false,
                    priority: 'important'
                },
                {
                    id: 3,
                    label: 'Relax',
                    complete: false,
                    priority: 'meh'
                }
            ],
            showNewTodoItemCreation: () => {
                this.newTodoItemCreationVisible = true;
            },
            createNewTodoItem: newTodoItem => {
                this.todoItems.push({
                    id: newTodoItem.length,
                    label: newTodoItem.label,
                    complete: false,
                    priority: newTodoItem.priority
                })
                this.newTodoItemCreationVisible = false;
            }
        }
    }
}
</script>
