<script setup lang="ts">
  import './Radio.scss';

  import { v4 as uuid } from '@lukeed/uuid';
  import { computed, ref } from 'vue';

  // Emits
  const emit = defineEmits(['update:modelValue', 'update:checked']);

  const uid = uuid();
  const focus = ref(false);

  const props = defineProps({
    label: {
      type: String,
      default: "",
    },
    modelValue: {
      type: [Boolean, String, Number],
      requires: false,
      default: "",
    },
    value: {
      type: [Boolean, String, Number],
      requires: false,
      default: "",
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  });

  const $$css = computed(() => {
    return [
      "at-radio",
      props.disabled ? "at-radio-disabled" : "",
    ]
  });

  const model = computed({
    get() {
      return props.modelValue;
    },
    set(value) {
      emit("update:modelValue", value);
    },
  });
</script>


<template>
  <label
    :for="uid"
    :class="$$css"
  >
    <input
      type="radio"
      :id="uid"
      :disabled="disabled"
      v-model="model"
      :value="value"
      @focus="focus = true"
      @blur="focus = false"
    /> {{ label }}
  </label>
</template>
