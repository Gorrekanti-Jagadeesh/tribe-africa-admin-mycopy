import { useNavigate } from 'react-router-dom';

import Dropdown from '@atoms/dropdown/dropdown-search';
import Button from '@atoms/custom-button/button';
import TribeAfricaPagesCard from '@atoms/card/tribe-africa-pages-card';
import IconsCard from '@atoms/card/icons-card';
import locationPin from '@assets/icons/location.svg';
import search from '@assets/icons/search.svg';

interface ProffesionalData {
  id: string;
  personName: string;
  profession: string;
  experience: string;
  phoneNumber: string;
  email: string;
  imageUrl: string;
  description: string;
  location: string;
  area: string;
}
interface ProffesionalIcons {
  label: string;
  icon: React.ReactNode;
}

interface ProffesionalOptions {
  label: string;
  value: string;
}

interface LookingToHireSomeoneScreenProps {
  proffesionalData: ProffesionalData[];
  proffesionalOptions: ProffesionalOptions[];
  data: ProffesionalIcons[];
}

const LookingToHireSomeoneScreen: React.FC<LookingToHireSomeoneScreenProps> = ({
  proffesionalData,
  proffesionalOptions,
  data,
}) => {
  const navigate = useNavigate();
  return (
    <div className="p-2 md:p-4 max-w-6xl m-auto">
      <h1 className="text-2xl font-bold">Looking to Hire Someone In Algeria</h1>
      <div className="flex m-auto w-2/3 border rounded-lg my-6">
        <div className="flex flex-grow">
          <Dropdown
            icon={<img src={locationPin} />}
            placeholderText={`State Name`}
            options={proffesionalOptions}
            searchable={true}
            action={() => {}}
            buttonStyles={'border-r-2 rounded-none p-2 text-left md:p-4'}
          />
          <Dropdown
            icon={<img src={search} />}
            placeholderText="Actor"
            options={proffesionalOptions}
            searchable={true}
            action={() => {}}
            buttonStyles={'p-2 md:p-4'}
          />
        </div>
        <Button className={`border rounded-r-md rounded-l-none px-4 text-white bg-orange-500 disabled:bg-slate-400`}>
          Find
        </Button>
      </div>
      <div className="flex flex-wrap justify-center items-center">
        {data.map((item) => (
          <div className="m-2">
            <IconsCard data={item} />
          </div>
        ))}
      </div>
      <div className="flex justify-between">
        <p>All</p>
        <Button className="">Get Listed on Tribe Africa Pages</Button>
      </div>
      {proffesionalData.map((proffesional) => (
        <TribeAfricaPagesCard
          key={proffesional.id}
          onClick={() =>
            navigate(`/tribe-africa-pages/looking-to-hire-someone/${proffesional.id}`, { state: proffesional })
          }
          image={proffesional.imageUrl}
          content={
            <div className="text-sm m-4">
              <p>
                <strong>{proffesional.personName}</strong>
              </p>
              <p>{proffesional.description}</p>
              <Button className="bg-orange-500 text-white mt-4">View Reviews</Button>
            </div>
          }
          footer={
            <div className="text-sm">
              <p>
                <strong>+ {proffesional.phoneNumber}</strong>{' '}
              </p>
              {proffesional.area}
            </div>
          }
        />
      ))}
    </div>
  );
};

export default LookingToHireSomeoneScreen;
