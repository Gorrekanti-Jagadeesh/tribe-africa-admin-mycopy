import React, { useEffect, useState } from 'react';
import { fetchCurrencies, convertCurrency } from '../../api';
import { africanCurrencies } from '../../data';
import { useQuery } from '@tanstack/react-query';

interface Currency {
  currencyCode: string;
  currencyName: string;
}

interface CurrencySelectProps {
  currencies: Currency[];
  currency: Currency | undefined;
  setCurrency: (currency: Currency) => void;
  currencyValue: string;
  onCurrencyValueChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  filter?: (currency: Currency) => boolean;
}

const CurrencySelect: React.FC<CurrencySelectProps> = ({
  currencies,
  currency,
  setCurrency,
  currencyValue,
  onCurrencyValueChange,
  filter,
}) => {
  const filteredCurrencies = filter ? currencies.filter(filter) : currencies;

  useEffect(() => {
    if (!currency && filteredCurrencies.length > 0) {
      setCurrency(filteredCurrencies[0]);
    }
  }, [currency, filteredCurrencies, setCurrency]);

  return (
    <div className="flex-1">
      {filteredCurrencies.length === 0 ? (
        <>
          <div className="w-full h-10 bg-gray-300 rounded-md animate-pulse mb-2"></div>
          <div className="w-full h-10 bg-gray-300 rounded-md animate-pulse"></div>
        </>
      ) : (
        <>
          <select
            value={currency?.currencyCode || ''}
            onChange={(e) => {
              const selectedCurrency = filteredCurrencies.find((c) => c.currencyCode === e.target.value);
              if (selectedCurrency) setCurrency(selectedCurrency);
            }}
            className="w-full p-2 border-b-gray-300 shadow-sm focus:outline-none focus:bg-slate-100"
          >
            {filteredCurrencies.map((currency) => (
              <option value={currency.currencyCode} key={currency.currencyCode}>
                {`${currency.currencyCode}: ${currency.currencyName}`}
              </option>
            ))}
          </select>
          <input
            type="number"
            value={currencyValue}
            className="w-full border px-4 py-2 rounded-md mt-2 outline-none"
            min="0"
            onInput={onCurrencyValueChange}
          />
        </>
      )}
    </div>
  );
};

const CurrencyCalculator: React.FC = () => {
  const [currencyValX, setCurrencyValX] = useState<string>('1');
  const [currencyX, setCurrencyX] = useState<Currency>();
  const [currencyValY, setCurrencyValY] = useState<string>('');
  const [currencyY, setCurrencyY] = useState<Currency>();
  const [isLoadingConversion, setIsLoadingConversion] = useState(false);

  const {
    data: currencies = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ['currencies'],
    queryFn: fetchCurrencies,
  });

  useEffect(() => {
    renderConversion(currencyValX, currencyX?.currencyCode, currencyY?.currencyCode, setCurrencyValY);
  }, [currencyX, currencyY]);

  const renderConversion = (
    value: string,
    codeX: string | undefined,
    codeY: string | undefined,
    setValue: (val: string) => void
  ) => {
    setIsLoadingConversion(true);
    if (value && codeX && codeY) {
      convertCurrency(codeX, codeY, parseFloat(value))
        .then((data) => {
          setValue(data.conversion_result.toFixed(3));
        })
        .catch((err) => {
          console.error(err);
        })
        .finally(() => {
          setIsLoadingConversion(false);
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

  if (isLoading) {
    return <div className="text-center p-6">Loading currencies...</div>;
  }

  if (error) {
    return <div className="text-center p-6 text-red-500">Failed to load currencies. Please try again later.</div>;
  }

  return (
    <div className="bg-white p-6 rounded-lg max-w-2xl">
      <div className="mb-6">
        <h2 className="text-4xl font-bold my-4">Currency Calculator</h2>
        <div className={isLoadingConversion ? 'opacity-30' : ''}>
          <p className="text-sm text-gray-400">
            {currencyValX} {currencyX?.currencyName} equals
          </p>
          <h3 className="text-2xl font-bold">
            {currencyValY} {currencyY?.currencyName}
          </h3>
        </div>
      </div>

      <div className="flex gap-4">
        <CurrencySelect
          currencies={currencies}
          currency={currencyX}
          setCurrency={setCurrencyX}
          currencyValue={currencyValX}
          onCurrencyValueChange={handleCurrencyValXChange}
        />
        <CurrencySelect
          currencies={currencies}
          currency={currencyY}
          setCurrency={setCurrencyY}
          currencyValue={currencyValY}
          onCurrencyValueChange={handleCurrencyValYChange}
          filter={(currency) => africanCurrencies.includes(currency.currencyCode)}
        />
      </div>
    </div>
  );
};

export default CurrencyCalculator;
