<script setup lang="ts">
  const props = defineProps({
    height: {
      type: String,
      default: "20px",
    },
    width: {
      type: String,
      default: "100%",
    },
  })
</script>

<template>
  <div
    class="inline-block bg-slate-200"
    :style="`height: ${height}; width: ${width};`"
  ></div>
</template>
