<template src="./new-todo-item.component.html"></template>
<style scoped src="./new-todo-item.component.css"></style>
<script>
import StandardButtonComponent from '../../standard-button/standard-button.component.vue'
export default {
    name: 'NewTodoItemComponent',
    components: {
        StandardButtonComponent
    },
    data() {
        return {
            todoItemLabel: 'test',
            todoItemPriority: 'important',
            /**
             * Sends new creation results back out to parent
             */
            createNewTodoItem: () => {
                this.$emit('createNewTodoItem', {label: this.todoItemLabel, priority: this.todoItemPriority});
            }
        }
    }
}
</script>
