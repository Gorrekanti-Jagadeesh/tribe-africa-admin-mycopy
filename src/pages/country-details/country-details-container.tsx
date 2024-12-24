import { useParams } from 'react-router';
import { useQuery } from '@tanstack/react-query';

import { Loading } from '@atoms/common/loading';
import { query, sanity } from '@utils/sanity';
import CountryDetailsScreen from './country-details-screen';

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
    queryFn: () => sanity.GET(query.COUNTRY.DETAILS(country, fieldsOrder)),
  });

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <>Error Fetching data</>;
  }

  return <CountryDetailsScreen country={country} content={orderFields(data)} fieldTitles={fieldTitles} />;
};

export default CountryDetails;
