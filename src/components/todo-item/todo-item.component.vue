<template src="./todo-item.component.html"></template>
<style scoped src="./todo-item.component.css"></style>
<script>
export default {
    name: 'TodoItemComponent',
    props: {
        todoItem: Object
    },
    data() {
        return {
            getPriorityClass: priority => {
                const classes = {
                    'life changing': 'priority-red',
                    important: 'priority-purple',
                    meh: 'priority-green',
                };
                return classes[priority];
            },
            toggleComplete: () => {
                this.todoItem.complete = !this.todoItem.complete;
            }
        }
    }
}
</script>
