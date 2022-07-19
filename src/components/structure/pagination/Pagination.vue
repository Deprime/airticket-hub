<script setup lang="ts">
  import { storeToRefs } from 'pinia';

  // Stores
  import { useTicketStore } from '@/stores';

  // Components
  import { Button } from '@/components/ui';

  // Props
  const props = defineProps({
    loading: {
      type: Boolean,
      default: false,
    },
  });

  // Emits
  const emit = defineEmits(['loadMore']);

  // Data
  const { hasNextPage, perPage } = storeToRefs(useTicketStore());

  // Methods
  const onLoadMore = (e: Event): void => {
    emit('loadMore')
  }
</script>

<template>
  <nav v-if="hasNextPage">
    <Button
      block
      @click="onLoadMore"
      :disabled="loading"
    >
      {{ loading ? 'Загрузка...' : `Показать еще ${perPage} билетов` }}
    </Button>
  </nav>
</template>
