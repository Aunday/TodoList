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
            sortAscending: true,
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
            /**
             * Toggles visibility of new todo item creation
             */
            showNewTodoItemCreation: () => {
                this.newTodoItemCreationVisible = true;
            },
            /**
             * Adds newly created todo item to list
             * @param newTodoItem - object containing user-specified label & priority
             */
            createNewTodoItem: newTodoItem => {
                this.todoItems.push({
                    id: this.todoItems.length + 1,
                    label: newTodoItem.label,
                    complete: false,
                    priority: newTodoItem.priority
                })
                this.newTodoItemCreationVisible = false;
                this.$cookies.set('todoList',{items: this.todoItems});
            },
            /**
             * Removes individual todo item
             * @param id - number representing id of todo item to be removed
             */
            removeItem: id => {
                for (let i = this.todoItems.length - 1; i >= 0; i--) {
                    const item = this.todoItems[i];
                    if (item.id === id) {
                        this.todoItems.splice(i, 1);
                    } else if (i >= id - 1) {
                        item.id--;
                    }
                }
                this.$cookies.set('todoList',{items: this.todoItems});
            },
            /**
             * Opens confirmation modal to ensure user really wants
             * to delete all todo items
             */
            openClearAllConfirmation: () => {
                this.$dialog
                .confirm('Do you really want to clear all items?')
                .then(() => {
                    this.todoItems = [];
                    this.$cookies.set('todoList',{items: this.todoItems});
                })
                .catch(() => {
                });
            },
            /**
             * Returns current sort direction icon
             */
            getSortIcon: () => {
                if (this.sortAscending) {
                    return 'sort-numeric-down'
                }
                return 'sort-numeric-up'
            },
            /**
             * Sorts list based on priority, asc or desc based on button icon
             */
            sortList: () => {
                const priorityMap = {
                    'life changing': 1,
                    'important': 2,
                    'meh': 3
                };
                this.todoItems.sort((a, b) => {
                    const aPriority = priorityMap[a.priority];
                    const bPriority = priorityMap[b.priority];
                    if ((this.sortAscending && aPriority > bPriority) || (!this.sortAscending && aPriority < bPriority)) {
                        return 1;
                    }
                    if ((this.sortAscending && bPriority > aPriority) || (!this.sortAscending && bPriority < aPriority)) {
                        return -1;
                    }
                    return 0;
                })
                this.sortAscending = !this.sortAscending;
                this.$cookies.set('todoList',{items: this.todoItems});
            }
        }
    },
    /**
     * Initializes cookies and loads list if previously used app
     */
    created: function () {
        this.$cookies.config('30d');
        if (this.$cookies.get('pageVisited')) {
            const savedTodoItems = this.$cookies.get('todoList').items;
            if (savedTodoItems && savedTodoItems.length > 0) {
                this.todoItems = savedTodoItems;
            }
        } else {
            this.$cookies.set('pageVisited', true)
            this.$cookies.set('todoList',{items: this.todoItems});
        }
    }
}
</script>
