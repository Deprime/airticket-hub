<script setup lang="ts">
  import './Search.scss';

    // Components
  import { Input } from '@/components/ui';
</script>

<template>
  <section class="search">
    <div class="at-control-group">
      <Input native-type="text" placeholder="Откуда" />
      <Input native-type="text" placeholder="Куда" />
      <Input native-type="date" placeholder="Когда" />
      <Input native-type="date" placeholder="Обратно" />
    </div>
  </section>
</template>
