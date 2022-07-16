<script setup lang="ts">
  import "./Button.scss";

  import { computed } from 'vue';

  interface Props {
    loading?: false,
    disabled?: false,
    block?: false,
    variant?: "primary" | "scondary",
  }

  const { loading, disabled, block, variant = "primary"} = defineProps<Props>();

  const $$class = computed(() => {
    return [
      "at-button",
      `at-button-${variant}`,
      loading ? "at-button-loading" : "",
      block ? "at-button-block" : "",
      disabled ? "at-button-disabled" : "",
    ]
    .join(" ");
  })
</script>

<template>
  <button
    :disabled="disabled"
    :variant="variant"
    :class="$$class"
  >
    <slot />
  </button>
</template>
