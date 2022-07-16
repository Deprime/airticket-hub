<script setup lang="ts">
  import './App.scss';
  import Logo from './assets/images/logo.svg';

  import { ref, onMounted } from 'vue';
  import { storeToRefs } from 'pinia';

  // Stores
  import { useTicketStore, useCompanyStore } from '@/stores';

  // Components
  import { Skeleton, Button } from '@/components/ui';
  import { Ticket } from '@/components/shared';
  import { Sidebar, QuickFilters } from '@/components/structure';

  // Data
  const APP_NAME  = import.meta.env.VUE_APP_NAME;
  const connectionError = ref(false);
  const loading = ref(false);
  const { fetchTicketList, nextPage } = useTicketStore();
  const { ticketList, ticketLoading, filtredTicketList, hasNextPage, perPage } = storeToRefs(useTicketStore());

  const { fetchCompanyList } = useCompanyStore();
  const { companyList, companyMap } = storeToRefs(useCompanyStore());

  /**
   * Fetch data
   */
  const fetchData = async (): Promise<void> => {
    try {
      if (companyList.value.length === 0) {
        await fetchCompanyList();
      }
      if (ticketList.value.length === 0) {
        await fetchTicketList();
        await setTimeout(() => {}, 3000);
      }
    }
    catch (error: any) {
      console.debug(error);
      connectionError.value = true;
      throw new Error(error);
    }
  }

  /**
   * Synthetic pagination
   */
  const loadMore = (): void => {
    loading.value = true;
    setTimeout(() => {
      nextPage();
      loading.value = false;
    }, 1000);
  }

  onMounted(async () => {
    await fetchData();
  });
</script>

<template>
  <div class="app-wrapper">
    <header class="header">
      <img :src="Logo" :alt="APP_NAME">
    </header>

    <main class="main">
      <Sidebar />

      <section class="content">
        <template v-if="connectionError">
          <div>
            Опс! Похоже возникла ошибка при загрузке данны.
          </div>
        </template>
        <template v-else>
          <div class="ticket-list">
            <template v-if="ticketLoading">
              <Skeleton
                v-for="item in Array(6)"
                height="138px"
                class="mb-4 rounded-lg"
              />
            </template>
            <template v-else>
              <QuickFilters />

              <TransitionGroup name="ticker-list">
                <Ticket
                  v-for="ticket in filtredTicketList"
                  :key="`t-${ticket.id}`"
                  :ticket="ticket"
                  :company="companyMap.get(ticket.companyId)"
                />
              </TransitionGroup>
            </template>
          </div>

          <nav v-if="hasNextPage">
            <Button
              block
              @click="loadMore"
              :disabled="loading"
            >
              <template v-if="loading">
                Загрузка..
              </template>
              <template v-else>
                Показать еще {{ perPage }} билетов
              </template>
            </Button>
          </nav>
        </template>
      </section>
    </main>
  </div>
</template>
