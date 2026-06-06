import Button from '@/atoms/custom-button/button';
import DualHeading from '../../atoms/heading/dual-heading';
import OverLayCard from '@atoms/card/overlay-card';
import { useNavigate } from 'react-router';

interface Item {
  title: string;
  image: string;
  _id: string;
  content?: string;
  onClick: () => void;
}

interface MustSeeAndDoScreenProps {
  category: string;
  data: Item[];
}

const MustSeeAndDoScreen: React.FC<MustSeeAndDoScreenProps> = ({ category, data }) => {
  const navigation = useNavigate();

  return (
    <div className="p-2 md:p-4 max-w-8xl m-auto">
      <div className="flex mb-10">
        <DualHeading>{category}</DualHeading>
        <Button
          className="ms-auto"
          onClick={() => {
            if (category == 'Voluntourism') {
              navigation('/vol-form');
            } else if (category == 'Excursions') {
              navigation('/exe-form');
            } else {
            }
          }}
        >
          {`List your ${category}`}
        </Button>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 w-full gap-6 ">
        {data.map((each) => (
          <div key={each._id}>
            <OverLayCard data={each} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MustSeeAndDoScreen;
