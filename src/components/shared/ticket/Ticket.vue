<script setup lang="ts">
  import './Ticket.scss';

  import S7Logo from '@/assets/images/companies/S7_Logo.png';
  import XALogo from '@/assets/images/companies/XiamenAir_Logo.png';

  import { datetimeHelper, currencyHelper } from '@/helpers';

  // Components
  import { Card } from '@/components/ui';

  import type { ITicket } from '@/types/ITicket';
  import type { ICompany } from '@/types/ICompany';
  interface Props {
    ticket: ITicket,
    company: ICompany
  }

  interface ILogoMap {
    [name: string]: string;
  }

  // Dirty hack
  const logoMap: ILogoMap = {
    "7dc12d0b-ce42-48a0-8673-0dad4d698764": XALogo,
    "cddfa038-823b-43b1-b18d-395731881077": S7Logo,
  };

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
          :src="logoMap[company.id]"
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
