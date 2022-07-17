import { defineStore } from 'pinia';
import { useStorage } from '@vueuse/core';

import { ticketApi } from  '@/api';

const useTicketStore = defineStore('ticket', {
  state: () => ({
    // ticketList:  useStorage('ticketList', <any[]>[]),
    ticketList:  <any[]>[],
    ticketLoading: true,
    search: <string|number> "",
    page: 1,
    perPage: 6,
    hasNextPage: true,
  }),

  getters: {
    filtredTicketList: (state) => {
      const search = state.search.toString().toUpperCase();
      let list = [...state.ticketList];

      if (search.length > 0) {
        // list = list.filter((ticker: TickerType) => {
        //   return ticker.id.includes(search);
        // });
        state.page = 1;
      }

      const limit = (state.page * state.perPage);
      const pagination = [...list.slice(0, limit)];
      state.hasNextPage = (list.length > pagination.length + state.perPage);

      return pagination;
    },
  },

  actions: {
    /**
     * Fetch ticket list
     */
    async fetchTicketList() {
      this.ticketLoading = true;
      try {
        const { data } = await ticketApi.list();
        this.ticketList = data;
      }
      catch (error: any) {
        throw new Error(error);
      }
      finally {
        this.ticketLoading = false
      }
    },

    async nextPage() {
      this.page++;
    },
  },
});

export default useTicketStore;
