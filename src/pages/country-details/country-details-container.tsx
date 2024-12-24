import DualHeading from '@atoms/heading/dual-heading';
import UnderlineHeading from '@atoms/heading/underline-heading';
import { useQuery } from '@tanstack/react-query';
import { fromKebabCase, toKebabCase } from '@utils/common';
import { query, sanity } from '@utils/sanity';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';

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

  return (
    <div className="flex flex-col gap-4 h-screen overflow p-2 md:p-4">
      <DualHeading>{'*' + fromKebabCase(country) + '*'}</DualHeading>
      {content && (
        <div className="flex flex-col md:flex-row gap-4 flex-grow overflow-scroll">
          <div className="bg-[#565555] text-white overflow-scroll min-h-[30%] md:w-1/3 rounded-lg p-2">
            {Object.keys(content).map((key) => (
              <a href={`#${key}`} key={key}>
                <p>{fieldTitles[key]}</p>
              </a>
            ))}
          </div>
          <div className="overflow-y-auto md:flex-1 md:w-2/3">
            {Object.keys(content).map((key) => (
              <div key={key} id={key}>
                <UnderlineHeading className="text-lg font-semibold">{fieldTitles[key]}</UnderlineHeading>
                <p>{content[key]}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CountryDetails;
