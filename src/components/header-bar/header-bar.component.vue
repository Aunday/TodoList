<template>
  <div class="header-bar display-flex">
    <span class="title-bar-left flex-1">
      <div class="app-logo">
        <font-awesome-icon icon="th-list"></font-awesome-icon>
      </div>
      <div class="app-title">
        {{ appTitle }}
      </div>
      <div class="display-flex margin-left-15">
        <div class="flex-1">
          <!-- <select v-model="selectedWeek.value">
            <option
              v-for="week of weeks"
              v-bind:value="week.id"
              v-bind:key="week.id">
              {{ week.title }}
            </option>
          </select> -->
          <StandardButtonComponent
            class="margin-left-5"
            title="New Week"
            id="add-button"
            buttonIcon="plus"
            buttonLabel="Week"
            buttonColor="background-color: #292a35"
            v-b-modal.new-week-modal
            @click="createWeek()">
          </StandardButtonComponent>
        </div>
        <div class="course-add-button">
          <StandardButtonComponent
            class="margin-left-15"
            title="New Course"
            id="add-button"
            buttonIcon="plus"
            buttonLabel="Course"
            buttonColor="background-color: #292a35"
            @click="createCourse()">
          </StandardButtonComponent>
        </div>
      </div>
    </span>
    <span class="float-right">
      <div class="app-welcome">
        {{ welcomeMessage }}
      </div>
    </span>
    <b-modal
      v-model="modalShow"
      id="new-week-modal"
      title="Create New Week"
      @ok="copyWeekSelected(selectedCopyWeek.value)">
      <span class="my-4">Select which week you would like to copy from</span>
      <select
        v-model="selectedCopyWeek.value"
        class="margin-left-5">
        <option
          v-for="week of weeks"
          v-bind:value="week.id"
          v-bind:key="week.id">
          <!-- @select="weekSelected($event)" -->
          {{ week.title }}
        </option>
      </select>
    </b-modal>
  </div>
</template>

<script>
import StandardButtonComponent from '../standard-button/standard-button.component.vue';

export default {
  name: 'HeaderBarComponent',
  components: {
    StandardButtonComponent,
  },
  data: () => ({
    modalShow: false,
    copyWeeks: [],
    selectedCopyWeek: { value: 0 },
  }),
  props: {
    appTitle: String,
    welcomeMessage: String,
    weeks: Array,
    selectedWeek: Object,
  },
  methods: {
    createCourse() {
      this.$emit('createCourse');
    },
    createWeek() {
      this.selectedCopyWeek.value = this.selectedWeek.value;
      this.modalShow = !this.modalShow;
    },
    copyWeekSelected(event) {
      this.$emit('createWeek', event);
    },
  },
};
</script>

<style scoped>
.header-bar {
  background-color: #292a35;
  height: 30px;
  width: 100%;
  display: flex;
  color: white;
  padding: 3px 7px;
  position: fixed;
  z-index: 1;
}
.title-bar-left {
  display: flex;
  flex: 1;
}
.app-logo {
  margin-right: 5px;
  color: #378fe2;
}
.app-title {
  font-weight: 700;
}
</style>
