import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
import DualHeading from '@atoms/heading/dual-heading';
import UnderlineHeading from '@atoms/heading/underline-heading';
import { fromKebabCase } from '@utils/common';
import { useParams } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import { query, sanity } from '@utils/sanity';
const fieldsOrder = [
  'noteToReader',
  'historicalOverview',
  'governmentStructure',
  'economicOverview',
  'gdp',
  'nationalDevelopmentPlan',
  'imports',
  'exports',
  'rawMaterials',
  'infrastructure',
  'foreignInvestment',
  'smeOpportunities',
  'investmentSecurity',
  'tradePartnerships',
  'taxationLaws',
  'bankingLaws',
  'labourRegulations',
  'peopleAndSociety',
  'geography',
  'environment',
];
const fieldTitles = {
  noteToReader: 'Note to Reader',
  historicalOverview: 'Historical Overview',
  governmentStructure: 'Government & Political Structure',
  economicOverview: 'Economic Overview',
  gdp: 'Gross Domestic Product (GDP)',
  nationalDevelopmentPlan: 'National Development Plan',
  imports: 'Imports',
  exports: 'Exports',
  rawMaterials: 'Raw Materials and Natural Resources',
  infrastructure: 'Infrastructure',
  foreignInvestment: "Government's Regulations Regarding Foreign Investors and Investment Incentives",
  smeOpportunities: 'Opportunities for Small and Medium Enterprises',
  investmentSecurity: 'Government Investment Security',
  tradePartnerships: 'Trade Partnerships with Other Countries',
  taxationLaws: 'Taxation Laws and Double Taxation Treaties (DTTs) with Other Countries',
  bankingLaws: 'Banking Laws and Repatriation of Profits',
  labourRegulations: 'Labour Regulations',
  peopleAndSociety: 'People and Society',
  geography: 'Geography',
  environment: 'Environment',
};
function orderFields(data) {
  if (!data) return;
  const orderedData = {};
  fieldsOrder.forEach((key) => {
    if (data[key] !== undefined) {
      orderedData[key] = data[key];
    }
  });
  return orderedData;
}
const CountryDetails = () => {
  const { country } = useParams();
  const { data, error, isLoading } = useQuery({
    queryKey: ['country_details'],
    queryFn: () => sanity.GET(query.COUNTRY.DETAILS(fromKebabCase(country), fieldsOrder)),
  });
  if (isLoading) {
    return 'Loading';
  }
  if (error) {
    return 'Error occured';
  }
  const content = orderFields(data);
  return _jsxs('div', {
    className: 'flex flex-col gap-4 h-screen overflow p-2 md:p-4',
    children: [
      _jsx(DualHeading, { children: '*' + fromKebabCase(country) + '*' }),
      content &&
        _jsxs('div', {
          className: 'flex flex-col md:flex-row gap-4 flex-grow overflow-scroll',
          children: [
            _jsx('div', {
              className: 'bg-[#565555] text-white overflow-scroll min-h-[30%] md:w-1/3 rounded-lg p-2',
              children: Object.keys(content).map((key) =>
                _jsx('a', { href: `#${key}`, children: _jsx('p', { children: fieldTitles[key] }) }, key)
              ),
            }),
            _jsx('div', {
              className: 'overflow-y-auto md:flex-1 md:w-2/3',
              children: Object.keys(content).map((key) =>
                _jsxs(
                  'div',
                  {
                    id: key,
                    children: [
                      _jsx(UnderlineHeading, { className: 'text-lg font-semibold', children: fieldTitles[key] }),
                      _jsx('p', { children: content[key] }),
                    ],
                  },
                  key
                )
              ),
            }),
          ],
        }),
    ],
  });
};
export default CountryDetails;
