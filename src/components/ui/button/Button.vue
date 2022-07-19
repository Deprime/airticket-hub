<script setup lang="ts">
  import "./Button.scss";

  import { computed } from 'vue';

  // Props
  const props = defineProps({
    loading: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    block: {
      type: Boolean,
      default: false,
    },
    variant: {
      type: String,
      default() {
        return "primary"
      }
    }
  });

  // Computed
  const $$class = computed(() => {
    let arr = [
      "at-button",
      `at-button-${props.variant}`,
      props.loading ? "at-button-loading" : "",
      props.block ? "at-button-block" : "",
      props.disabled ? "at-button-disabled" : "",
    ]
    return arr;
  });
</script>

<template>
  <button
    :disabled="disabled"
    :class="$$class"
  >
    <slot />
  </button>
</template>
