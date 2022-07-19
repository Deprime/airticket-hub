import type { CustomDateObject } from '@/types/CustomDateObject';

/**
 * Helpers to work with date & time
 */
const datetimeHelper = {
  /**
   * Get formatted object
   */
  getDateObject: (unixtime: number): CustomDateObject => {
    const dateObject: CustomDateObject = {}
    const durationDate = new Date(unixtime);
    const h = durationDate.getHours();
    const m = durationDate.getMinutes();

    if (h > 0) {
      dateObject.h = `${h}`;
    }
    if (m > 0) {
      dateObject.m = m.toString().padStart(2, '0');
    }
    return dateObject
  },

  /**
   * Get formatted duration
   */
  getFormattedDuration: (unixtime: number) => {
    const dateObject = datetimeHelper.getDateObject(unixtime);
    const separator = (dateObject.h && dateObject.m) ? ' ' : '';
    const h = (dateObject.h) ? `${dateObject.h}ч`: '';
    const m = (dateObject.m) ? `${dateObject.m}м` : '';
    return `${h}${separator}${m}`;
  },

  /**
   * Get formatted time
   */
  getFormattedTime: (unixtime: number) => {
    const dateObject = datetimeHelper.getDateObject(unixtime);
    const separator = (dateObject.h && dateObject.m) ? ':' : '';
    const h = (dateObject.h) ? `${dateObject.h}`: '';
    const m = (dateObject.m) ? `${dateObject.m}` : '';
    return `${h}${separator}${m}`;
  },
}

export default datetimeHelper;
