<template src="./standard-button.component.html"></template>
<style scoped src="./standard-button.component.css"></style>
<script>
export default {
    name: 'AddNewButtonComponent',
    props: {
        buttonLabel: String,
        buttonIcon: String,
        disabled: Boolean
    },
    data() {
        return {
            /**
             * Emits click event for this button
             */
            onClick: () => {
                this.$emit('click', '');
            }
        }
    }
}
</script>
