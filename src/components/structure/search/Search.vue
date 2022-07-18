<script setup lang="ts">
  import './Search.scss';
  import { reactive } from 'vue';

  // Components
  import SwapButton from './SwapButton.vue';
  import { Input } from '@/components/ui';

  // Data
  const searchQuery = reactive({
    departure: "",
    destination: "",
    dateStart: "",
    dateEnd: "",
  });

  // Methods
  const onSwap = () => {
    const departure = searchQuery.departure;
    searchQuery.departure   = searchQuery.destination;
    searchQuery.destination = departure;
  }
</script>

<template>
  <section class="search">
    <div class="at-control-group">
      <Input native-type="text" v-model="searchQuery.departure" placeholder="Откуда" />
      <SwapButton
        @click="onSwap"
      />
      <Input native-type="text" v-model="searchQuery.destination" placeholder="Куда" />
      <Input native-type="date" v-model="searchQuery.dateStart" placeholder="Когда" />
      <Input native-type="date" v-model="searchQuery.dateEnd" placeholder="Обратно" />
    </div>
  </section>
</template>
