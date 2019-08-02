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
            priorityEditVisible: false,
            getPriorityClass: priority => {
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
            toggleComplete: () => {
                this.todoItem.complete = !this.todoItem.complete;
            },
            /**
             * removes current todo item
             */
            removeItem: () => {
                this.$emit('removeItem', this.todoItem.id);
            },
            /**
             * Toggles on visibility of label input field
             */
            showLabelEdit: () => {
                this.labelEditVisible = true;
            },
            /**
             * Toggles on visibility of priority select field
             */
            showPriorityEdit: () => {
                this.priorityEditVisible = true;
            },
            /**
             * Hides edit fields when focus is removed from input
             * and select fields
             */
            loseFocus: () => {
                this.labelEditVisible = false;
                this.priorityEditVisible = false;
            }
        }
    }
}
</script>
