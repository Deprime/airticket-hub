/**
 * Helpers to work with date & time
 */
const datetimeHelper = {
  /**
   * Seconds to time
   */
  secondsToTime: (seconds: number): string => {
    const format  = ["h", "m", "s"]
    const date    = new Date(0);

    date.setSeconds(seconds);
    const duration = date.toISOString().substring(11, 19);

    return duration
      .split(':')
      .map((item, i) => {
        if (parseInt(item) > 0)
          return `${parseInt(item)}${format[i]}`;
      })
      .join(' ');
  },
}

export default datetimeHelper;
