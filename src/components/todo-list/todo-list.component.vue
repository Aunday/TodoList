<template>
  <div class="todo-list">
    <div class="course-title">
      <div @click="showCourseTitleEdit()" v-if="!courseTitleEdit">
        {{ todoList.title }}
      </div>
      <div v-else>
        <input
          type="text"
          v-model="todoList.title"
          placeholder="Enter course title"
          v-on:blur="courseTitleLoseFocus()">
      </div>
    </div>
    <div class="list-header-row">
      <StandardButtonComponent
        title="Add new todo task"
        id="add-button"
        buttonIcon="plus"
        buttonLabel="Task"
        @click="createNewTodoTask()">
      </StandardButtonComponent>
      <div class="flex-right">
        <StandardButtonComponent
          title="Sort by type"
          id="sort-button"
          class="margin-left-5"
          :buttonIcon="getSortIcon()"
          @click="sortList()">
        </StandardButtonComponent>
        <span class="icon-button" @click="moveCourseLeft()" v-if="todoList.id > 0">
          <font-awesome-icon
            title="Click to move left"
            class="color-blue"
            :icon="['fa', 'angle-left']">
          </font-awesome-icon>
        </span>
        <span class="icon-button" @click="moveCourseRight()" v-if="todoList.id < courseCount - 1">
          <font-awesome-icon
            title="Click to move right"
            class="color-blue"
            :icon="['fa', 'angle-right']">
          </font-awesome-icon>
        </span>
        <span class="icon-button" @click="removeCourse()">
          <font-awesome-icon
            title="Click to remove course"
            class="color-red"
            :icon="['fa', 'times']">
          </font-awesome-icon>
        </span>
        <!-- <StandardButtonComponent
          title="Clear all todo tasks"
          :disabled="todoList.todoTasks.length === 0"
          class="margin-left-5"
          buttonLabel="Clear"
          @click="openClearAllConfirmation()">
        </StandardButtonComponent> -->
      </div>
    </div>
    <div class="list-container">
      <TodoTaskComponent
        v-for="todoTask in todoList.todoTasks"
        :todoTask="todoTask"
        v-bind:key="todoTask.id"
        @removeTask="removeTask"
        @saveTodoData="saveTodoData"
        @countCompleted="countCompleted">
      </TodoTaskComponent>
    </div>
  </div>
</template>
<script>

import TodoTaskComponent from '../todo-task/todo-task.component.vue';
import StandardButtonComponent from '../standard-button/standard-button.component.vue';
export default {
  name: 'TodoListComponent',
  props: {
    todoList: Object,
    courseCount: {
      type: Number,
      default: 0,
    }
  },
  components: {
    TodoTaskComponent,
    StandardButtonComponent,
  },
  data: () => ({
    sortAscending: true,
    courseTitleEdit: false,
  }),
  methods: {
    /**
     * Sorts list based on type, asc or desc based on button icon
     */
    sortList() {
      const typeMap = {
        exam: 1,
        quiz: 2,
        essay: 3,
        assignment: 4,
        webinar: 5,
        reading: 6,
        'forum post': 7,
        'forum reply': 8
      };
      this.todoList.todoTasks.sort((a, b) => {
        const aType = typeMap[a.type];
        const bType = typeMap[b.type];
        if ((this.sortAscending && aType > bType) || (!this.sortAscending && aType < bType)) {
          return 1;
        }
        if ((this.sortAscending && bType > aType) || (!this.sortAscending && bType < aType)) {
          return -1;
        }
        return 0;
      });
      this.sortAscending = !this.sortAscending;
      this.saveTodoData();
    },
    /**
     * Adds new todo task to list
     */
    createNewTodoTask() {
      for (let i = 0; i < this.todoList.todoTasks.length; i += 1) {
        this.todoList.todoTasks[i].id += 1;
      }
      this.todoList.todoTasks.unshift({
        id: 1,
        label: 'New Task',
        complete: false,
        dueDate: this.getTodayDate(),
        type: 'assignment',
        labelEditVisible: true,
        typeEditVisible: false,
        dueDateEditVisible: false,
      });
      this.$emit('countCompleted');
    },
    getTodayDate() {
      const today = new Date();
      return `${today.getMonth() + 1}/${today.getDate()}/${today.getFullYear()}`;
    },
    moveCourseLeft() {
      this.$emit('moveCourse', {id: this.todoList.id, direction: -1});
    },
    moveCourseRight() {
      this.$emit('moveCourse', {id: this.todoList.id, direction: 1});
    },
    removeCourse() {
      this.$emit('removeCourse', this.todoList.id);
    },
    /**
     * Removes individual todo task
     * @param id - number representing id of todo task to be removed
     */
    removeTask(removeId) {
      for (let i = this.todoList.todoTasks.length - 1; i >= 0; i -= 1) {
        const task = this.todoList.todoTasks[i];
        if (task.id === removeId) {
          this.todoList.todoTasks.splice(i, 1);
        } else if (task.id > removeId) {
          task.id -= 1;
        }
      }
      this.$emit('countCompleted');
    },
    /**
     * Opens confirmation modal to ensure user really wants
     * to delete all todo tasks
     */
    openClearAllConfirmation() {
      this.$dialog
        .confirm('Do you really want to clear all tasks?')
        .then(() => {
          this.todoList.todoTasks = [];
          this.$emit('countCompleted');
        })
        .catch(() => {
        });
    },
    /**
     * Toggles on visibility of course title edit field
     */
    showCourseTitleEdit() {
      this.courseTitleEdit = !this.courseTitleEdit;
    },
    /**
     * Hides course title edit field when focus is removed from input
     */
    courseTitleLoseFocus() {
      this.showCourseTitleEdit();
      this.$emit('saveTodoData');
    },
    /**
     * Saves current todo task list
     */
    saveTodoData() {
      this.$emit('saveTodoData');
    },
    /**
     * emits complete box toggled event
     */
    countCompleted() {
      this.$emit('countCompleted');
    },
    /**
     * Returns current sort direction icon
     */
    getSortIcon() {
      if (this.sortAscending) {
        return 'sort-numeric-down';
      }
      return 'sort-numeric-up';
    },
  },
};
</script>

<style scoped>
.todo-list {
  padding: 5px;
  display: flex;
  flex-direction: column;
  height: calc(100vh - 157px);
  flex: 1;
  min-width: 450px;
}
h1 {
  text-align: center;
}
.list-container {
  overflow-y: auto;
  flex: 1;
}
.flex-right {
  flex: 1;
  text-align: right;
}
.list-header-row {
  display: flex;
}
.course-title {
  text-align: center;
  font-weight: bold;
}
.icon-button {
  margin-left: 5px;
  margin-right: 5px;
  cursor: pointer;
}
</style>