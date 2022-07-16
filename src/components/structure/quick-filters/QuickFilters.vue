<script setup lang="ts">
  // import { storeToRefs } from 'pinia';
  import { reactive } from 'vue';

  // Components
  import { Button, ButtonGroup } from '@/components/ui';

  // Data
  let quickFilters = reactive([
    {id: 1, title: "Самый дешевый", checked: false,},
    {id: 2, title: "Самый быстрый", checked: false,},
    {id: 3, title: "Оптимальный", checked: false,},
  ]);

  const setActive = (index: number): void => {
    quickFilters.forEach((filter, i) => {
      quickFilters[i].checked = (index === i)
        ? !quickFilters[i].checked
        : false;
    });
  }
</script>

<template>
  <div class="pb-4">
    <ButtonGroup>
      <Button
        v-for="(filter, index) in quickFilters"
        :key="`qf-${filter.id}`"
        :variant="filter.checked ? `primary` : `secondary`"
        @click="setActive(index)"
      >
        {{ filter.title }}
      </Button>
    </ButtonGroup>
  </div>
</template>
