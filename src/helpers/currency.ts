/**
 * Helpers to work with currency
 */
const currencyHelper = {
  format: (price: number): string => {
    const formatter = new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'RUB',
      currencyDisplay: 'symbol',
      signDisplay: "never",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
    return formatter.format(price);
  }
}

export default currencyHelper;
