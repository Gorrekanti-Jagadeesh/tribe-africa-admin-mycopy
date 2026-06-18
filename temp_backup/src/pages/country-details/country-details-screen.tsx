import DualHeading from '@atoms/heading/dual-heading';
import UnderlineHeading from '@atoms/heading/underline-heading';
import { flags } from '@data/index';
import { fromKebabCase, toKebabCase } from '@utils/common';
import { useNavigate } from 'react-router';

const CountryDetailsScreen = ({ country, content, fieldTitles }) => {
  const navigate = useNavigate();
  if (!flags[toKebabCase(country)]) navigate('/not-found');
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

export default CountryDetailsScreen;
