import React, { useEffect, useState } from 'react';
import { fetchCurrencies, convertCurrency } from '../../api';

interface Currency {
  currencyCode: string;
  currencyName: string;
}

interface CurrencyDropdownProps {
  currencies: Currency[];
  currency: Currency | undefined;
  setCurrency: (currency: Currency) => void;
}

const CurrencyDropdown: React.FC<CurrencyDropdownProps> = ({ currencies, currency, setCurrency }) => {
  useEffect(() => {
    if (!currency && currencies.length > 0) {
      setCurrency(currencies[0]);
    }
  }, [currency, currencies, setCurrency]);

  return (
    <div className="mt-1 relative">
      <select
        value={currency?.currencyCode || ''}
        onChange={(e) => {
          const selectedCurrency = currencies.find((c) => c.currencyCode === e.target.value);
          if (selectedCurrency) setCurrency(selectedCurrency);
        }}
        className="w-full p-2 border-b-gray-300 shadow-sm focus:outline-none focus:bg-slate-100"
      >
        {currencies.map((currency) => (
          <option value={currency.currencyCode} key={currency.currencyCode}>
            {`${currency.currencyCode}: ${currency.currencyName}`}
          </option>
        ))}
      </select>
    </div>
  );
};

const africanCurrencies = [
  'DZD',
  'AOA',
  'XOF',
  'BWP',
  'BIF',
  'CVE',
  'XAF',
  'KMF',
  'CDF',
  'DJF',
  'EGP',
  'ERN',
  'ETB',
  'GMD',
  'GHS',
  'GNF',
  'KES',
  'LSL',
  'LRD',
  'LYD',
  'MGA',
  'MWK',
  'MRO',
  'MUR',
  'MAD',
  'MZN',
  'NAD',
  'NGN',
  'RWF',
  'STD',
  'SCR',
  'SLL',
  'SOS',
  'ZAR',
  'SSP',
  'SDG',
  'SZL',
  'TZS',
  'TND',
  'UGX',
  'ZMW',
  'ZWL',
];

const CurrencyConverter: React.FC = () => {
  const [currencies, setCurrencies] = useState<Currency[]>([]);
  const [currencyValX, setCurrencyValX] = useState<string>('1');
  const [currencyX, setCurrencyX] = useState<Currency>();
  const [currencyValY, setCurrencyValY] = useState<string>('');
  const [currencyY, setCurrencyY] = useState<Currency>();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchCurrencies()
      .then((data) => setCurrencies(data))
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    renderConversion(currencyValX, currencyX?.currencyCode, currencyY?.currencyCode, setCurrencyValY);
  }, [currencyX, currencyY]);

  const renderConversion = (
    value: string,
    codeX: string | undefined,
    codeY: string | undefined,
    setValue: (val: string) => void
  ) => {
    setIsLoading(true);
    if (value && codeX && codeY) {
      convertCurrency(codeX, codeY, parseFloat(value))
        .then((data) => {
          setValue(data.conversion_result.toFixed(3));
        })
        .catch((err) => {
          console.error(err);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  const handleCurrencyValXChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (!value || parseInt(value) < 0) {
      setCurrencyValX('');
      setCurrencyValY('0');
      return;
    }

    setCurrencyValX(value);
    renderConversion(value, currencyX?.currencyCode, currencyY?.currencyCode, setCurrencyValY);
  };

  const handleCurrencyValYChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (!value || parseInt(value) < 0) {
      setCurrencyValY('');
      setCurrencyValX('0');
      return;
    }

    setCurrencyValY(value);
    renderConversion(value, currencyY?.currencyCode, currencyX?.currencyCode, setCurrencyValX);
  };

  return (
    <div className="bg-white p-6 rounded-lg">
      <div className="mb-6">
        <h2 className="text-4xl font-bold my-4">Currency Calculator</h2>
        <div className={isLoading ? 'opacity-30' : ''}>
          <p className="text-sm text-gray-400">
            {currencyValX} {currencyX?.currencyName} equals
          </p>
          <h3 className="text-2xl font-bold">
            {currencyValY} {currencyY?.currencyName}
          </h3>
        </div>
      </div>

      {currencies.length > 0 && (
        <div className="flex gap-4">
          <div className="flex-1">
            <CurrencyDropdown currencies={currencies} currency={currencyX} setCurrency={setCurrencyX} />
            <input
              type="number"
              value={currencyValX}
              className="w-full border px-4 py-2 rounded-md mt-2 outline-none"
              min="0"
              onInput={handleCurrencyValXChange}
            />
          </div>
          <div className="flex-1">
            <CurrencyDropdown
              currencies={currencies.filter((currency) => africanCurrencies.includes(currency.currencyCode))}
              currency={currencyY}
              setCurrency={setCurrencyY}
            />
            <input
              type="number"
              value={currencyValY}
              className="w-full border px-4 py-2 rounded-md mt-2 outline-none"
              min="0"
              onInput={handleCurrencyValYChange}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default CurrencyConverter;
