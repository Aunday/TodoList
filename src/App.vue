<template>
  <div id="app">
    <HeaderBarComponent
      appTitle="ToDo List"
      welcomeMessage="Welcome"
      :weeks="weeks"
      :selectedWeek="selectedWeek"
      @createCourse="createCourse()"
      @createWeek="createWeek($event)"/>
    <div class="app-content">
      <div class="week-selection">
        <StandardButtonComponent
          v-for="(week, index) in weeks"
          :key="week.id"
          class="week-button"
          title="weeks[index].title"
          :buttonLabel="getWeekButtonLabel(index)"
          :buttonColor="getButtonColor(index)"
          @click="selectWeek(index)"/>
      </div>
      <div class="todo-lists">
        <div class="week-title">
          <h1 @click="showWeekTitleEdit()" v-if="!weekTitleEdit">
            {{ weeks[selectedWeek.value].title }}
          </h1>
          <div v-else>
            <input
              type="text"
              v-model="weeks[selectedWeek.value].title"
              placeholder="Enter week title"
              v-on:blur="weekTitleLoseFocus()">
          </div>
        </div>
        <div class="display-flex todo-list-columns">
          <TodoListComponent
            v-for="todoList in weeks[selectedWeek.value].todoLists"
            :todoList="todoList"
            :key="todoList.id"
            @saveTodoData="saveTodoData"
            @countCompleted="countCompleted"/>
        </div>
      </div>
    </div>
    <!-- <button @click="createNewTodo">Add Todo</button> -->
  </div>
</template>
<style src="./global.css"></style>
<script>
import Vue from 'vue';
import { ModalPlugin } from 'bootstrap-vue';
import { cloneDeep, find } from 'lodash';
import API, { graphqlOperation } from '@aws-amplify/api';
import TodoListComponent from './components/todo-list/todo-list.component.vue';
import HeaderBarComponent from './components/header-bar/header-bar.component.vue';
import StandardButtonComponent from './components/standard-button/standard-button.component.vue';
// import { components } from 'aws-amplify-vue'
// eslint-disable-next-line
import { createTodo, updateTodo, deleteTodo } from "./graphql/mutations";
import { listTodos } from './graphql/queries';


Vue.use(ModalPlugin);
export default {
  name: 'app',
  components: {
    TodoListComponent,
    HeaderBarComponent,
    StandardButtonComponent,
    // components
  },
  data() {
    return {
      weekTitleEdit: false,
      weeks: [
        {
          id: 0,
          title: 'Week 1',
          incompleteCount: 3,
          todoLists: [
            {
              id: 0,
              title: 'London',
              todoTasks: [
                {
                  id: 1,
                  label: 'Complete chapter 3 assignment',
                  complete: false,
                  type: 'assignment',
                  dueDate: this.getTodayDate(),
                  labelEditVisible: false,
                  typeEditVisible: false,
                  dueDateEditVisible: false,
                },
                {
                  id: 2,
                  label: 'Read chapter 3',
                  complete: false,
                  type: 'reading',
                  dueDate: this.getTodayDate(),
                  labelEditVisible: false,
                  typeEditVisible: false,
                  dueDateEditVisible: false,
                },
                {
                  id: 3,
                  label: 'London Webinar',
                  complete: false,
                  type: 'webinar',
                  dueDate: this.getTodayDate(),
                  labelEditVisible: false,
                  typeEditVisible: false,
                  dueDateEditVisible: false,
                },
              ],
            },
          ],
        },
        {
          id: 1,
          title: 'Week 2',
          incompleteCount: 2,
          todoLists: [
            {
              id: 0,
              title: 'London',
              todoTasks: [
                {
                  id: 1,
                  label: 'Complete chapter 3 assignment',
                  complete: false,
                  type: 'assignment',
                  dueDate: this.getTodayDate(),
                  labelEditVisible: false,
                  typeEditVisible: false,
                  dueDateEditVisible: false,
                },
                {
                  id: 2,
                  label: 'Read chapter 3',
                  complete: false,
                  type: 'reading',
                  dueDate: this.getTodayDate(),
                  labelEditVisible: false,
                  typeEditVisible: false,
                  dueDateEditVisible: false,
                },
              ],
            },
          ],
        },
      ],
      selectedWeek: { value: 0 },
      todos: [],
    };
  },
  methods: {
    async createNewTodo() {
      const todo = { name: 'AndreaData', data: JSON.stringify(this.weeks) };
      await API.graphql(graphqlOperation(createTodo, { input: todo }));
    },
    async updateTodo() {
      const todo = { name: 'AndreaData', data: JSON.stringify(this.weeks) };
      await API.graphql(graphqlOperation(updateTodo, { input: todo }));
    },
    async getData() {
      const todoData = await API.graphql(graphqlOperation(listTodos));
      console.log(todoData.data.listTodos.items);
      const todoResult = find(todoData.data.listTodos.items, todo => todo.name === 'AndreaData');
      console.log(todoResult);
      this.weeks = JSON.parse(todoResult.data);
    },
    selectWeek(weekIndex) {
      this.selectedWeek.value = weekIndex;
    },
    getWeekButtonLabel(weekIndex) {
      const { incompleteCount } = this.weeks[weekIndex];
      if (incompleteCount) {
        return `${this.weeks[weekIndex].title} (${incompleteCount})`;
      }
      return this.weeks[weekIndex].title;
    },
    getButtonColor(weekIndex) {
      if (this.weeks[weekIndex].incompleteCount) {
        return 'background-color: #378fe2;'; // #dc7634
      }
      return 'background-color: #e8e3e0; color: #afa3a3;';
    },
    getTodayDate() {
      const today = new Date();
      return `${today.getMonth() + 1}/${today.getDate()}/${today.getFullYear()}`;
    },
    /**
     * Toggles on visibility of week title edit field
     */
    showWeekTitleEdit() {
      this.weekTitleEdit = !this.weekTitleEdit;
    },
    /**
     * Hides week title edit field when focus is removed from input
     */
    weekTitleLoseFocus() {
      this.showWeekTitleEdit();
      this.saveTodoData();
    },
    /**
     * Saves current data
     * todoData: {
     *  weeks: [
     *    todoLists: [
     *      todoTasks: [
     *        {
     *          title: '',
     *          type: '',
     *          dueDate: ''
     *
     *        }
     *      ]
     *    ]
     *  ]
     * }
     */
    async saveTodoData() {
      // this.$cookies.set('todoData', {
      //   weeks: this.weeks,
      //   selectedWeek: this.selectedWeek.value,
      // });
      const data = JSON.stringify(this.weeks);
      console.log('saving: ', data);
      const todo = { id: 'b57b2db5-1335-42d0-b8b1-c439e38bcbe1', name: 'AndreaData', data };
      await API.graphql(graphqlOperation(updateTodo, { input: todo }));
    },
    countCompleted() {
      for (let i = 0; i < this.weeks.length; i += 1) {
        let incompleteCount = 0;
        for (let j = 0; j < this.weeks[i].todoLists.length; j += 1) {
          for (let k = 0; k < this.weeks[i].todoLists[j].todoTasks.length; k += 1) {
            if (this.weeks[i].todoLists[j].todoTasks[k].complete === false) {
              incompleteCount += 1;
            }
          }
        }
        this.weeks[i].incompleteCount = incompleteCount;
      }
      this.saveTodoData();
    },
    createWeek(event) {
      const newWeek = cloneDeep(this.weeks[event]);
      // will have to handle this if we start allowing removal
      newWeek.id = this.weeks.length;
      this.weeks.push(newWeek);
    },
    createCourse() {
      this.weeks[this.selectedWeek.value].todoLists.push({
        id: this.weeks[this.selectedWeek.value].todoLists.length,
        title: 'New Course',
        todoTasks: [],
      });
      this.countCompleted();
    },
  },
  /**
   * Initializes cookies and loads list if previously used app
   */
  created() {
    this.getData();
    // this.$cookies.config(Infinity);
    // this.$cookies.remove('todoData');
    // this.$cookies.remove('pageVisited');
    // if (this.$cookies.get('pageVisited')) {
    //   const savedTodoData = this.$cookies.get('todoData');
    //   console.log(savedTodoData);
    //   if (savedTodoData) {
    //     this.weeks = savedTodoData.weeks;
    //     this.selectedWeek.value = savedTodoData.selectedWeek;
    //   }
    // } else {
    //   this.$cookies.set('pageVisited', true);
    //   this.saveTodoData();
    // }
  },
};
</script>
