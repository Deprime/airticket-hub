<script setup lang="ts">
  // Assets
  import "./Header.scss";
  import Logo from '@/assets/images/logo.svg';

  const APP_NAME  = import.meta.env.VUE_APP_NAME;
</script>

<template>
  <header class="header">
    <img :src="Logo" :alt="APP_NAME">
  </header>
</template>
