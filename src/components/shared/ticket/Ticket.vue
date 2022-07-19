<script setup lang="ts">
  import './Ticket.scss';

  import S7Logo from '@/assets/images/companies/S7_Logo.png';
  import XALogo from '@/assets/images/companies/XiamenAir_Logo.png';

  // Helpers
  import { currencyHelper, datetimeHelper, lexiconHelper } from '@/helpers';

  // Components
  import { Card } from '@/components/ui';

  // Types
  import type { ILogoMap } from './types'
  import type { ITicket }  from '@/types/ITicket';
  import type { ICompany } from '@/types/ICompany';
  interface Props {
    ticket: ITicket,
    company: ICompany
  }

  // Dirty hack
  const logoMap: ILogoMap = {
    "7dc12d0b-ce42-48a0-8673-0dad4d698764": XALogo,
    "cddfa038-823b-43b1-b18d-395731881077": S7Logo,
  };

  // Props
  const { ticket, company } = defineProps<Props>();

  // Data
  const durationLabel = datetimeHelper.getFormattedDuration(ticket.info.duration);
  const dateStartLabel = datetimeHelper.getFormattedTime(parseInt(ticket.info.dateStart) / 1000 );
  const dateEndLabel = datetimeHelper.getFormattedTime(parseInt(ticket.info.dateEnd) / 1000 );

  const stopsCount = ticket.info.stops.length;
  const stopsLabelVariants = ['пересадкa', 'пересадки', 'пересадок'];
  const stopsLabel = lexiconHelper.pluralize(stopsCount, stopsLabelVariants);
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
          {{ dateStartLabel }} - {{ dateEndLabel }}
        </p>
      </div>
      <div>
        <p class="label">
          В пути
        </p>
        <p>
          {{ durationLabel }}
        </p>
      </div>
      <div>
        <p class="label">
          <template v-if="stopsCount === 0">
            Без пересадок
          </template>
          <template v-else>
            {{ stopsCount }} {{ stopsLabel }}
          </template>
        </p>
        <p>
          {{ ticket.info.stops.join(", ") }}
        </p>
      </div>
    </div>
  </Card>
</template>
