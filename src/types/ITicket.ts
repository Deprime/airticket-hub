export interface ITicket {
  id: string;
  price: number;
  companyId: string;
  info: {
    origin: CityCodes;
    destination: CityCodes;
    dateStart: string;
    dateEnd: string;
    stops: CityCodes[];
    duration: number;
  };
}

type CityCodes = 'MOW' | 'HKT' | 'HKG' | 'JNB' | 'PTB' | 'ARH' | 'TRN' | 'KRS' | 'SRT' | 'LOS' | 'EKV' | 'EKT';
