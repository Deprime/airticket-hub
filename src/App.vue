<script setup lang="ts">
  import './App.scss';

  import { ref, onMounted } from 'vue';
  import { storeToRefs } from 'pinia';

  // Stores
  import { useTicketStore, useCompanyStore } from '@/stores';

  // Components
  import { Skeleton } from '@/components/ui';
  import { Ticket, ErrorAlert } from '@/components/shared';
  import { Header, Search, Sidebar, QuickFilters, Pagination } from '@/components/structure';

  // Data
  const connectionError = ref(false);
  const loading = ref(false);

  const { fetchTicketList, nextPage } = useTicketStore();
  const { ticketList, ticketLoading, filtredTicketList, hasNextPage, perPage } = storeToRefs(useTicketStore());

  const { fetchCompanyList } = useCompanyStore();
  const { companyList, companyMap } = storeToRefs(useCompanyStore());

  // Methods
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
        await setTimeout(() => {}, 2000);
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
    <Header />

    <main class="main">
      <Search />
      <Sidebar />

      <section class="content">
        <template v-if="connectionError">
          <ErrorAlert
            class="mb-4"
            title="Опс!"
            details="Похоже возникла ошибка при загрузке данных."
          />
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

              <TransitionGroup name="ticket-list">
                <Ticket
                  v-for="ticket in filtredTicketList"
                  :key="`t-${ticket.id}`"
                  :ticket="ticket"
                  :company="companyMap.get(ticket.companyId)"
                />
              </TransitionGroup>
            </template>
          </div>

          <Pagination
            :loading="loading"
            @load-more="loadMore"
          />
        </template>
      </section>
    </main>
  </div>
</template>
