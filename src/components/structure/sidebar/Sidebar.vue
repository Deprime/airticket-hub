<script setup lang="ts">
  import './Sidebar.scss';
  import { storeToRefs } from 'pinia';
  import { reactive } from 'vue';

  // Stores
  import { useCompanyStore } from '@/stores';

  // Components
  import { Card, Checkbox, Radio, Skeleton } from '@/components/ui';

  // Data
  const selectedFilters = reactive({
    transfers: [],
    company: <null|string>null,
  });
  const { companyList, companyLoading } = storeToRefs(useCompanyStore());

  const transferFilters = [
    {id: 1, title: "Без пересадок"},
    {id: 2, title: "1 пересадка"},
    {id: 3, title: "2 пересадки"},
    {id: 4, title: "3 пересадки"},
  ];
</script>


<template>
  <aside class="sidebar">
    <Card class="filter-set">
      <h4 class="label">
        Количество пересадок
      </h4>
      <fieldset>
        <Checkbox
          v-for="transfer in transferFilters"
          :key="transfer.id"
          :label="transfer.title"
          :value="transfer.id"
          v-model="selectedFilters.transfers"
        />
      </fieldset>
    </Card>

    <Card class="filter-set">
      <h4 class="label">Компания</h4>
      <template v-if="companyLoading">
        <Skeleton
          v-for="item in Array(2)"
          height="30px"
          width="80%"
          class="mb-0.5 rounded-md mx-5"
        />
      </template>
      <template v-else>
        <fieldset>
          <Radio
            label="Все"
            value="null"
            v-model="selectedFilters.company"
          />
          <Radio
            v-for="company in companyList"
            :key="company.id"
            :label="company.name"
            :value="company.id"
            v-model="selectedFilters.company"
          />
        </fieldset>
      </template>
    </Card>
  </aside>
</template>
