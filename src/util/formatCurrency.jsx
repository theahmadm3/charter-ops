/**
 * FormatCurrency Component
 * @param {Object} props
 * @param {number} props.value - The numeric value to be formatted.
 * @param {string} [props.currency='NGN'] - The currency code (e.g., 'NGN' for Naira, 'USD' for Dollar).
 * @param {string} [props.locale='en-NG'] - The locale for formatting.
 * @returns JSX.Element
 */
const FormatCurrency = ({ value = 0, currency = "USD", locale = "en-US" }) => {
  const formattedValue = new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
  }).format(value);

  return <span>{formattedValue}</span>;
};

export default FormatCurrency;
