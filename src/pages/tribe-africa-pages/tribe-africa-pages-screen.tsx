import DualHeading from '@atoms/heading/dual-heading';
import TribeAfricaPagesCard from '@atoms/card/tribe-africa-pages-card';
import React from 'react';
import ministerImage from '../../assets/minister-image.png';
import { useNavigate } from 'react-router';

interface tribeAfricaPagesObjectProps {
  id: string;
  department?: string;
  location?: string;
  phoneNumber?: string;
  websiteUrl?: string;
  imageUrl?: string;
}

interface MinistriesScreenProps {
  data: tribeAfricaPagesObjectProps[];
  category: string;
}

const TribeAfricaPagesScreen: React.FC<MinistriesScreenProps> = ({ data, category }) => {
  const navigate = useNavigate();

  return (
    <div className="p-2 md:p-4 max-w-6xl m-auto">
      <DualHeading>{category}</DualHeading>
      {data?.map((eachItem) => {
        return (
          <TribeAfricaPagesCard
            onClick={() => navigate(`/tribe-africa-pages/${category}/${eachItem.id}`, { state: eachItem })}
            key={eachItem.id}
            image={ministerImage}
            content={
              <div>
                <p className="m-4">
                  <strong>Ministry : </strong> {eachItem.department}
                </p>
                <p className="m-4">
                  <strong>Location : </strong> {eachItem.location}
                </p>
              </div>
            }
            footer={
              <div>
                <p>+ 223 78888888</p>
                <p>Website: www.el-mouridia.dz</p>
                <p>info@el-mouridia.dz</p>
              </div>
            }
          />
        );
      })}
    </div>
  );
};

export default TribeAfricaPagesScreen;
