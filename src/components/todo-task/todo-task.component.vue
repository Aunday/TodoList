<template>
  <div class="todo-task-box" :class="getBackgroundClass(todoTask.type)">
    <div
      class="complete-icon"
      @click="toggleComplete()"
      v-if="!todoTask.labelEditVisible && !todoTask.typeEditVisible">
      <font-awesome-icon
        title="Click to mark incomplete"
        class="color-green"
        v-if="todoTask.complete"
        :icon="['far', 'check-square']">
      </font-awesome-icon>
      <font-awesome-icon
        title="Click to mark complete"
        class="color-blue"
        v-else
        :icon="['far', 'square']">
      </font-awesome-icon>
    </div>
    <div class="todo-label">
      <div v-if="!todoTask.labelEditVisible">
        <span class="cursor-pointer" @click="toggleLabelEdit(true)">
          <div class="label-container" :title="todoTask.label">
            <div :class="{'active': todoTask.complete}" class="crossout-bar"></div>
            {{ todoTask.label }}
          </div>
        </span>
      </div>
      <div v-else>
        <input
          type="text"
          v-model="todoTask.label"
          placeholder="Enter task here"
          v-on:blur="labelLoseFocus()">
      </div>
    </div>
      <div class="due-date">
        <div v-if="!todoTask.dueDateEditVisible">
          <span class="cursor-pointer" @click="toggleDueDateEdit(true)">
            {{ convertDueDate(dueDate) }}
          </span>
        </div>
        <div v-else class="col-md-12">
          <date-picker
            v-model="todoTask.dueDate"
            :config="datePickerOptions"
            v-on:blur="dueDateLoseFocus()"></date-picker>
        </div>
      </div>
      <div class="type-pill">
        <div
          @click="toggleTypeEdit(true)"
          v-if="!todoTask.typeEditVisible"
          class="todo-type"
          :class="getTypeClass(todoTask.type)">
          {{ todoTask.type }}
        </div>
        <div v-else>
          <select v-model="todoTask.type"
            v-on:blur="typeLoseFocus()">
            <option todoTask.type>exam</option>
            <option>quiz</option>
            <option>essay</option>
            <option>assignment</option>
            <option>webinar</option>
            <option>reading</option>
            <option>forum post</option>
            <option>forum reply</option>
          </select>
        </div>
      </div>
    <div class="remove-task-button" @click="removeTask()">
      <font-awesome-icon
        title="Click to remove task"
        class="color-red"
        :icon="['fa', 'times']">
      </font-awesome-icon>
    </div>
  </div>
</template>
<script>

import datePicker from 'vue-bootstrap-datetimepicker';
import 'bootstrap/dist/css/bootstrap.css';

export default {
  name: 'TodoTaskComponent',
  components: {
    'date-picker': datePicker,
  },
  props: {
    todoTask: {
      type: Object,
    },
  },
  computed: {
    dueDate() {
      return new Date(this.todoTask.dueDate);
    },
    type() {
      return this.todoTask.type;
    },
  },
  watch: {
    dueDate() {
      this.toggleDueDateEdit(false);
      this.$emit('saveTodoData');
    },
    type() {
      this.toggleTypeEdit(false);
      this.$emit('saveTodoData');
    },
  },
  data: () => ({
    datePickerOptions: {
      format: 'MM/DD/YYYY',
      useCurrent: false,
    },
  }),
  mounted() {
  },
  methods: {
    getBackgroundClass(type) {
      const classMap = {
        essay: 'type-lime light',
        assignment: 'type-yellow light',
        reading: 'type-blue light',
        quiz: 'type-orange light',
        exam: 'type-red light',
        webinar: 'type-green light',
        'forum post': 'type-purple light',
        'forum reply': 'type-pink light',
      };
      return classMap[type];
    },
    getStandardDate(date) {
      return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
    },
    /**
     * Returns class based on currently selected type
     * @param type - string representing currently selected type
     */
    getTypeClass(type) {
      const classMap = {
        essay: 'type-lime',
        assignment: 'type-yellow',
        reading: 'type-blue',
        quiz: 'type-orange',
        exam: 'type-red',
        webinar: 'type-green',
        'forum post': 'type-purple',
        'forum reply': 'type-pink',
      };
      return classMap[type];
    },
    convertMonth(month) {
      const monthMap = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
      return monthMap[month];
    },
    convertDueDate(dueDate) {
      const currentDate = new Date(dueDate);
      const convertedDate = `${this.convertMonth(currentDate.getMonth())} ${currentDate.getDate()}`;
      return convertedDate.toString();
    },
    /**
     * Toggles complete state (changes icon shown)
     */
    toggleComplete() {
      this.todoTask.complete = !this.todoTask.complete;
      this.$emit('countCompleted');
    },
    /**
     * removes current todo task
     */
    removeTask() {
      this.$emit('removeTask', this.todoTask.id);
    },
    /**
     * Toggles on visibility of label input field
     */
    toggleLabelEdit(toggle) {
      if (!this.todoTask.complete) {
        this.todoTask.labelEditVisible = toggle;
      }
    },
    /**
     * Toggles on visibility of label input field
     */
    toggleDueDateEdit(toggle) {
      if (!this.todoTask.complete) {
        this.todoTask.dueDateEditVisible = toggle;
      }
    },
    /**
     * Toggles on visibility of type select field
     */
    toggleTypeEdit(toggle) {
      if (!this.todoTask.complete) {
        this.todoTask.typeEditVisible = toggle;
      }
    },
    /**
     * Hides label edit field when focus is removed from input
     */
    labelLoseFocus() {
      this.toggleLabelEdit(false);
      this.$emit('saveTodoData');
    },
    dueDateLoseFocus() {
      this.toggleDueDateEdit(false);
    },
    typeLoseFocus() {
      this.toggleTypeEdit(false);
    },
  },
};
</script>

<style scoped>
.todo-task-box {
  height: 60px;
  background-color: #ffffff;
  border: 1px solid #cacaf5;
  display: flex;
  padding: 17px 13px 0;
  margin-top: 5px;
}
.complete-icon {
  cursor: pointer;
}
.label-container {
  display: inline-block;
  position: relative;
}
.crossout-bar {
  width: 0;
  border: 1px solid rgba(200,200,200,0);
  transition: width 1s;
  height: 0;
  position: absolute;
  top: 12px;
}
.crossout-bar.active {
  width: 100%;
  border: 1px solid rgba(30,30,30,1);
}
.todo-label {
  padding-left: 5px;
  flex: 1;
  text-align: left;
  position: relative;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.type-pill {
  width: 100px;
}
.todo-type {
  color: white;
  height: 25px;
  padding: 0px 5px 5px 5px;
  cursor: pointer;
  float: right;
}
.type-green {
  background-color: rgb(37, 126, 49);
}
.type-green.light {
  background-color: rgba(37, 126, 49,0.2);
}
.type-purple {
  background-color: rgb(152,41,167);
}
.type-purple.light {
  background-color: rgba(152,41,167,0.2);
}
.type-pink {
  background-color: rgb(255,88,205);
}
.type-pink.light {
  background-color: rgba(255,88,205,0.2);
}
.type-red {
  background-color: rgb(150,46,39);
}
.type-red.light {
  background-color: rgba(150,46,39,0.2);
}
.type-yellow {
  background-color: rgb(235, 221, 34);
  color: black;
}
.type-yellow.light {
  background-color: rgba(235, 221, 34, 0.2);
}
.type-lime {
  background-color: rgb(167, 235, 34);
  color: black;
}
.type-lime.light {
  background-color: rgba(167, 235, 34, 0.2);
}
.type-blue {
  background-color: rgb(39, 106, 150);
}
.type-blue.light {
  background-color: rgba(39, 106, 150,0.2);
}
.type-orange {
  background-color: rgb(221,117,19);
  color: black;
}
.type-orange.light {
  background-color: rgba(221,117,19,0.2);
}
.remove-task-button {
  margin-left: 5px;
  cursor: pointer;
}
</style>
