import { useState } from 'react';

interface CurrencyConverterModalProps {
  onClose: () => void;
}

// Available currencies and dummy exchange rates for the example
const exchangeRates: { [key: string]: number } = {
  USD: 1,
  EUR: 0.85,
  GBP: 0.75,
  INR: 83,
  CAD: 1.34,
};

const currencies = Object.keys(exchangeRates);

export const CalculatorModal: React.FC<CurrencyConverterModalProps> = ({ onClose }) => {
  const [amount, setAmount] = useState<number>(1);
  const [fromCurrency, setFromCurrency] = useState<string>('USD');
  const [toCurrency, setToCurrency] = useState<string>('INR');
  const [convertedAmount, setConvertedAmount] = useState<number | null>(null);

  // Handle currency conversion
  const handleConvert = () => {
    const rate = exchangeRates[toCurrency] / exchangeRates[fromCurrency];
    const result = amount * rate;
    setConvertedAmount(result);
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50 z-50">
      <div className="bg-white p-5 rounded-lg shadow-lg w-80">
        <h2 className="text-xl font-semibold mb-4">Currency Converter</h2>
        <div className="mb-4">
          <input
            type="number"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            className="border p-2 w-full mb-2"
          />
          <select
            value={fromCurrency}
            onChange={(e) => setFromCurrency(e.target.value)}
            className="border p-2 w-full mb-2"
          >
            {currencies.map((currency) => (
              <option key={currency} value={currency}>
                {currency}
              </option>
            ))}
          </select>
          <select value={toCurrency} onChange={(e) => setToCurrency(e.target.value)} className="border p-2 w-full mb-2">
            {currencies.map((currency) => (
              <option key={currency} value={currency}>
                {currency}
              </option>
            ))}
          </select>
          <button className="bg-purple-600 text-white p-2 rounded w-full" onClick={handleConvert}>
            Convert
          </button>
          {convertedAmount !== null && (
            <div className="mt-4">
              <p>
                {amount} {fromCurrency} = {convertedAmount.toFixed(2)} {toCurrency}
              </p>
            </div>
          )}
        </div>
        <button className="mt-4 bg-gray-300 text-black p-2 rounded w-full" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};
