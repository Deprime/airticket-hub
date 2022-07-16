import { defineStore } from 'pinia';
import { useStorage } from '@vueuse/core';

import { companyApi } from  '@/api';

const useCompanyStore = defineStore('company', {
  state: () => ({
    companyList:  useStorage('companyList', <any[]>[]),
    companyLoading: false,
  }),

  getters: {
    companyMap: (state) => {
      // const map = new Map();
      // state.companyList.forEach(company => {map.set(company.id, company)});
      // return map;
      return state.companyList.reduce((acc, company) => {
        acc.set(company.id, company);
        return acc;
      }, new Map());
    },
  },

  actions: {
    /**
     * Fetch company list
     */
    async fetchCompanyList() {
      this.companyLoading = true;
      try {
        const { data } = await companyApi.list();
        this.companyList = data;
      }
      catch (error: any) {
        throw new Error(error);
      }
      finally {
        this.companyLoading = false
      }
    },
  },
});

export default useCompanyStore;
