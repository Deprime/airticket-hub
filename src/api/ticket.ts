import $axios from "@/services/$axios";
import { ITicket } from '@/types/ITicket';

type GetTicketResponse = {
  data: ITicket[];
};

export const ticketApi = {
  /**
   * Get company list
   */
  list: (): Promise<GetTicketResponse> => {
    const url = `/163b5e66df9f2741243e`;
    return $axios.get(url);
  },
}

export default ticketApi;
