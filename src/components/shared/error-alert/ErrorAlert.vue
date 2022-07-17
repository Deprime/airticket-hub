<script setup lang="ts">
  import "./ErrorAlert.scss";

  const props = defineProps({
    title: {
      type: String,
      required: false,
    },
    details: {
      type: String,
      default: "Ошибка при загрузке данных",
      required: false,
    },
  });
</script>

<template>
  <div class="at-error-alert">
    <h4 v-if="title">
      {{ title }}
    </h4>
    <p>
      {{ details }}
    </p>
  </div>
</template>
