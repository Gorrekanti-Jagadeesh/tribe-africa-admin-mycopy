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
    <div className="p-2 md:p-4 max-w-8xl m-auto">
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
                <div className="w-full text-left p-4 space-y-2 flex flex-col items-start">
                  <p className="w-full text-left break-words">
                    <strong>Business Name:</strong> {eachBusinessType.businessName || 'N/A'}
                  </p>

                  <p className="w-full text-left break-words">
                    <strong>Location:</strong>{' '}
                    {`${eachBusinessType.address?.town || ''}, ${eachBusinessType.address?.state || ''}, ${eachBusinessType.address?.country || ''}`}
                  </p>
                </div>
              }
              footer={
                <div className="w-full text-left p-4 border-t flex flex-col items-start space-y-2 text-sm">
                  <div className="w-full break-words">
                    <span className="font-semibold">Phone:</span> +
                    {eachBusinessType.businessContactInformation?.phoneNumber || 'N/A'}
                  </div>

                  <div className="w-full break-words">
                    <span className="font-semibold">Email:</span>{' '}
                    {eachBusinessType.businessContactInformation?.email || 'N/A'}
                  </div>

                  <div className="w-full break-words">
                    <span className="font-semibold">Website:</span>{' '}
                    {eachBusinessType.businessContactInformation?.website ? (
                      <a
                        href={eachBusinessType.businessContactInformation.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 underline break-all"
                      >
                        Visit Website
                      </a>
                    ) : (
                      'N/A'
                    )}
                  </div>
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
