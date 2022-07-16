import $axios from "@/services/$axios";
import { ICompany } from '@/types/ICompany';

type GetCompanyResponse = {
  data: ICompany[];
};

export const companyApi = {
  /**
   * Get company list
   */
  list: (): Promise<GetCompanyResponse> => {
    const url = `/a1b1c28b32d9785bb26c`;
    return $axios.get(url);
  },
}

export default companyApi;
