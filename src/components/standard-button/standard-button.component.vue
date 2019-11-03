<template>
  <div class="button-box" :style="buttonColor" :class="{disabled: disabled}" @click="onClick()">
    <span class="button-icon" v-if="buttonIcon">
      <font-awesome-icon :icon="buttonIcon"></font-awesome-icon>
    </span>
    <span v-if="buttonLabel">
      {{ buttonLabel }}
    </span>
  </div>
</template>
<script>
export default {
  name: 'AddNewButtonComponent',
  props: {
    buttonLabel: String,
    buttonIcon: String,
    buttonColor: String,
    disabled: Boolean,
  },
  methods: {
    /**
     * Emits click event for this button
     */
    onClick() {
      this.$emit('click', '');
    },
  },
};
</script>

<style scoped>
.button-box {
  cursor: pointer;
  background-color: #378fe2;
  display: inline-block;
  color: white;
  padding: 0 7px 0 5px;
}
.disabled {
  background-color: #adb7c0;
  cursor: default;
}
</style>
