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
            labelEditVisible: false,
            priorityEditVisible: false
        }
    },
    methods: {
        /**
         * Returns class based on currently selected priority
         * @param priority - string representing currently selected priority
         */
        getPriorityClass(priority) {
            const classes = {
                'life changing': 'priority-red',
                important: 'priority-purple',
                meh: 'priority-green',
            };
            return classes[priority];
        },
        /**
         * Toggles complete state (changes icon shown)
         */
        toggleComplete() {
            this.todoItem.complete = !this.todoItem.complete;
            this.$emit('saveTodoList');
        },
        /**
         * removes current todo item
         */
        removeItem() {
            this.$emit('removeItem', this.todoItem.id);
        },
        /**
         * Toggles on visibility of label input field
         */
        showLabelEdit() {
            this.todoItem.labelEditVisible = true;
        },
        /**
         * Toggles on visibility of priority select field
         */
        showPriorityEdit() {
            this.todoItem.priorityEditVisible = true;
        },
        /**
         * Hides label edit field when focus is removed from input
         */
        labelLoseFocus() {
            this.todoItem.labelEditVisible = false;
            this.$emit('saveTodoList');
        },
        /**
         * Hides priority edit field when focus is removed from select field
         */
        priorityLoseFocus() {
            this.todoItem.priorityEditVisible = false;
            this.$emit('saveTodoList');
        }
    }
}
</script>
