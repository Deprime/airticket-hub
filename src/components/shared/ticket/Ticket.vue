<script setup lang="ts">
  import './Ticket.scss';
  import { datetimeHelper, currencyHelper } from '@/helpers';

  // Components
  import { Card } from '@/components/ui';

  import type { ITicket } from '@/types/ITicket';
  import type { ICompany } from '@/types/ICompany';
  interface Props {
    ticket: ITicket,
    company?: ICompany
  }

  // Props
  const { ticket, company } = defineProps<Props>();

  // Data
  const logoSrc = `./src/assets/images/companies/${company.logo}`;
</script>

<template>
  <Card class="at-ticket">
    <div class="heading">
      <div class="price">
        {{ currencyHelper.format(ticket.price) }}
      </div>
      <div class="company-logo">
        <img
          :src="logoSrc"
          :alt="company.name"
          class="inline-block"
          height="36p"
        >
      </div>
    </div>
    <div class="summary">
      <div>
        <p class="label">
          {{ ticket.info.origin }} - {{ ticket.info.destination }}
        </p>
        <p>
          {{ datetimeHelper.secondsToTime(ticket.info.dateStart) }} - {{ datetimeHelper.secondsToTime(ticket.info.dateEnd) }}
        </p>
      </div>
      <div>
        <p class="label">
          В пути
        </p>
        <p>
          {{ datetimeHelper.secondsToTime(ticket.info.duration)}}
        </p>
      </div>
      <div>
        <p class="label">
          {{ ticket.info.stops.length }} пересадки
        </p>
        <p>
          {{ ticket.info.stops.join(" - ") }}
        </p>
      </div>
    </div>
  </Card>
</template>
