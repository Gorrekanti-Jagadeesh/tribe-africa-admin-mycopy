import TribeAfricaPagesCard from '@/atoms/card/tribe-africa-pages-card';
import DualHeading from '@/atoms/heading/dual-heading';
import { useNavigate, useParams } from 'react-router';
import { fromKebabCase, toKebabCase } from '@/utils/common';
import { sanityImageUrlBuilder } from '@/api';
import Button from '@/atoms/custom-button/button';

interface address {
  town: string;
  state: string;
  country: string;
}

interface businessAddress {
  phoneNumber?: string;
  website?: string;
  email?: string;
}
interface findAbusinessDetails {
  _id: string;
  businessName?: string;
  address: address;
  businessContactInformation?: businessAddress;
  image: string;
}

interface findAbusinessProps {
  data?: findAbusinessDetails[];
  mainCategory: string;
  subCategory: string;
}

const FindABusinessScreen: React.FC<findAbusinessProps> = ({ data, mainCategory, subCategory }) => {
  const { country } = useParams();
  const navigation = useNavigate();
  return (
    <div className="p-2 md:p-4 max-w-6xl m-auto">
      <div className="flex mb-10">
        <DualHeading>{`${fromKebabCase(mainCategory)}${subCategory ? ` - ${fromKebabCase(subCategory)}` : ''}`}</DualHeading>
        <Button
          className="ms-auto"
          onClick={() => {
            if (mainCategory == 'clubsspecialgroups' || mainCategory == 'religiousinstitutions') {
              navigation('/religious-form');
            } else {
              navigation('/business-form');
            }
          }}
        >
          List your Business
        </Button>{' '}
      </div>
      <div>
        {data?.map((eachBusinessType) => {
          const imageUrl = sanityImageUrlBuilder(eachBusinessType.image).url();
          return (
            <TribeAfricaPagesCard
              key={eachBusinessType._id}
              onClick={() => {
                if (subCategory) {
                  navigation(
                    `/${country}/business/find-a-business/details/${toKebabCase(mainCategory)}/${toKebabCase(subCategory)}/${eachBusinessType._id}`
                  );
                } else {
                  navigation(
                    `/${country}/business/find-a-business/details/${toKebabCase(mainCategory)}/${eachBusinessType._id}`
                  );
                }
              }}
              image={imageUrl}
              content={
                <div>
                  <p className="m-4">
                    <strong>Business Name : </strong> {eachBusinessType.businessName}
                  </p>
                  <p className="m-4">
                    <strong>Location : </strong>{' '}
                    {`${eachBusinessType.address.town}, ${eachBusinessType.address.state}, ${eachBusinessType.address.country}`}
                  </p>
                </div>
              }
              footer={
                <div>
                  <p>+{eachBusinessType.businessContactInformation.phoneNumber}</p>
                  <p>{eachBusinessType.businessContactInformation.email}</p>
                  <p>{eachBusinessType.businessContactInformation.website}</p>
                </div>
              }
            />
          );
        })}
      </div>
    </div>
  );
};

export default FindABusinessScreen;
