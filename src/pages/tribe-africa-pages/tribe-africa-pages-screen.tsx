import DualHeading from '@atoms/heading/dual-heading';
import TribeAfricaPagesCard from '@atoms/card/tribe-africa-pages-card';
import React from 'react';
import { sanityImageUrlBuilder } from '@api/index';

interface Department {
  department: string;
  departmentType: string;
}

interface tribeAfricaPagesObjectProps {
  id: string;
  department?: Department;
  location?: string;
  phone?: string;
  websiteUrl?: string;
  image?: string;
}

interface MinistriesScreenProps {
  data: tribeAfricaPagesObjectProps[];
  category: string;
}

const TribeAfricaPagesScreen: React.FC<MinistriesScreenProps> = ({ data, category }) => {
  return (
    <div className="p-2 md:p-4 max-w-8xl m-auto">
      <DualHeading>{category}</DualHeading>
      {data?.map((eachItem) => {
        const imageUrl = sanityImageUrlBuilder(eachItem.image);
        return (
          <TribeAfricaPagesCard
            // onClick={() => navigate(`/tribe-africa-pages/${category}/${eachItem.id}`, { state: eachItem })}
            key={eachItem.id}
            // image={ministerImage}
            image={`${imageUrl}`}
            content={
              <div>
                <p className="m-4">
                  <strong>{eachItem.department.departmentType} : </strong> {eachItem.department.department}
                </p>
                <p className="m-4">
                  <strong>Location : </strong> {eachItem.location}
                </p>
              </div>
            }
            footer={
              <div>
                <p>+ {eachItem.phone}</p>
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
