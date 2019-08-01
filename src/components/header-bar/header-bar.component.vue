<template src="./header-bar.component.html"></template>
<style scoped src="./header-bar.component.css"></style>
<script>
export default {
  name: 'HeaderBarComponent',
  props: {
      appTitle: String,
      welcomeMessage: String
  }
}
</script>
