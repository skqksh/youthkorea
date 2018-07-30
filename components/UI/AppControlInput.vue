<template>
  <div class="input-control">
    <v-text-field
      v-if="controlType === 'input'"
      v-bind="$attrs"
      :value="value"
      :label="label"
      :placeholder="placeholder"
      @input="$emit('input', $event)"/>
    <v-textarea
      v-if="controlType === 'textarea'"
      rows="8"
      :value="value"
      :label="label"
      :placeholder="placeholder"
      @input="$emit('input', $event)"></v-textarea>
  </div>
</template>

<script>
export default {
  name: 'AppInputControl',
  props: {
    controlType: {
      type: String,
      default: 'input'
    },
    value: {
      type: String,
      default: ''
    },
    label: {
      type: String,
      defualt: ''
    },
    placeholder: {
      type: String,
      defualt: ''
    }
  }
}
</script>

<style scoped>
</style>


