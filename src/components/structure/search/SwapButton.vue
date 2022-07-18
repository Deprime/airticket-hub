<script setup lang="ts">
  import './SwapButton.scss';
  import iconSwap from '@/assets/images/icon-swap.svg';

</script>

<template>
  <button class="at-swap-button">
    <img :src="iconSwap" alt="Поменять местами">
  </button>
</template>
