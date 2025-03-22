import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from 'react/jsx-runtime';
import { useEffect, useState } from 'react';
import { fetchCurrencies, convertCurrency } from '../../api';
import { africanCurrencies } from '../../data';
import { useQuery } from '@tanstack/react-query';
const CurrencySelect = ({ currencies, currency, setCurrency, currencyValue, onCurrencyValueChange, filter }) => {
  const filteredCurrencies = filter ? currencies.filter(filter) : currencies;
  useEffect(() => {
    if (!currency && filteredCurrencies.length > 0) {
      setCurrency(filteredCurrencies[0]);
    }
  }, [currency, filteredCurrencies, setCurrency]);
  return _jsx('div', {
    className: 'flex-1',
    children:
      filteredCurrencies.length === 0
        ? _jsxs(_Fragment, {
            children: [
              _jsx('div', { className: 'w-full h-10 bg-gray-300 rounded-md animate-pulse mb-2' }),
              _jsx('div', { className: 'w-full h-10 bg-gray-300 rounded-md animate-pulse' }),
            ],
          })
        : _jsxs(_Fragment, {
            children: [
              _jsx('select', {
                value: currency?.currencyCode || '',
                onChange: (e) => {
                  const selectedCurrency = filteredCurrencies.find((c) => c.currencyCode === e.target.value);
                  if (selectedCurrency) setCurrency(selectedCurrency);
                },
                className: 'w-full p-2 border-b-gray-300 shadow-sm focus:outline-none focus:bg-slate-100',
                children: filteredCurrencies.map((currency) =>
                  _jsx(
                    'option',
                    { value: currency.currencyCode, children: `${currency.currencyCode}: ${currency.currencyName}` },
                    currency.currencyCode
                  )
                ),
              }),
              _jsx('input', {
                type: 'number',
                value: currencyValue,
                className: 'w-full border px-4 py-2 rounded-md mt-2 outline-none',
                min: '0',
                onInput: onCurrencyValueChange,
              }),
            ],
          }),
  });
};
const CurrencyCalculator = () => {
  const [currencyValX, setCurrencyValX] = useState('1');
  const [currencyX, setCurrencyX] = useState();
  const [currencyValY, setCurrencyValY] = useState('');
  const [currencyY, setCurrencyY] = useState();
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
  const renderConversion = (value, codeX, codeY, setValue) => {
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
  const handleCurrencyValXChange = (e) => {
    const value = e.target.value;
    if (!value || parseInt(value) < 0) {
      setCurrencyValX('');
      setCurrencyValY('0');
      return;
    }
    setCurrencyValX(value);
    renderConversion(value, currencyX?.currencyCode, currencyY?.currencyCode, setCurrencyValY);
  };
  const handleCurrencyValYChange = (e) => {
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
    return _jsx('div', { className: 'text-center p-6', children: 'Loading currencies...' });
  }
  if (error) {
    return _jsx('div', {
      className: 'text-center p-6 text-red-500',
      children: 'Failed to load currencies. Please try again later.',
    });
  }
  return _jsxs('div', {
    className: 'bg-white p-6 rounded-lg max-w-2xl',
    children: [
      _jsxs('div', {
        className: 'mb-6',
        children: [
          _jsx('h2', { className: 'text-4xl font-bold my-4', children: 'Currency Calculator' }),
          _jsxs('div', {
            className: isLoadingConversion ? 'opacity-30' : '',
            children: [
              _jsxs('p', {
                className: 'text-sm text-gray-400',
                children: [currencyValX, ' ', currencyX?.currencyName, ' equals'],
              }),
              _jsxs('h3', { className: 'text-2xl font-bold', children: [currencyValY, ' ', currencyY?.currencyName] }),
            ],
          }),
        ],
      }),
      _jsxs('div', {
        className: 'flex gap-4',
        children: [
          _jsx(CurrencySelect, {
            currencies: currencies,
            currency: currencyX,
            setCurrency: setCurrencyX,
            currencyValue: currencyValX,
            onCurrencyValueChange: handleCurrencyValXChange,
          }),
          _jsx(CurrencySelect, {
            currencies: currencies,
            currency: currencyY,
            setCurrency: setCurrencyY,
            currencyValue: currencyValY,
            onCurrencyValueChange: handleCurrencyValYChange,
            filter: (currency) => africanCurrencies.includes(currency.currencyCode),
          }),
        ],
      }),
    ],
  });
};
export default CurrencyCalculator;
