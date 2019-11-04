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
<style scoped src="./todo-task.component.css"></style>
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
