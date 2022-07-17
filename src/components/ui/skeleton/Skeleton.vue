<script setup lang="ts">
  import "./Skeleton.scss";
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
    class="at-skeleton"
    :style="`height: ${height}; width: ${width};`"
  ></div>
</template>
