<template src="./new-todo-item.component.html"></template>
<style scoped src="./new-todo-item.component.css"></style>
<script>
import StandardButtonComponent from '../../standard-button/standard-button.component.vue'
export default {
    name: 'NewTodoItemComponent',
    props: {
        // todoItem: Object
    },
    components: {
        StandardButtonComponent
    },
    data() {
        return {
            todoItemLabel: 'test',
            todoItemPriority: 'important',
            // createNewTodoItem: priority => {
            //     const classes = {
            //         'life changing': 'priority-red',
            //         important: 'priority-purple',
            //         meh: 'priority-green',
            //     };
            //     return classes[priority];
            // },
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
