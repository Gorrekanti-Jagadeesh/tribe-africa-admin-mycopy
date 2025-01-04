import DualHeading from '../../atoms/heading/dual-heading';
import OverLayCard from '@atoms/card/overlay-card';

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
  return (
    <div className="max-w-6xl m-auto">
      <DualHeading className="text-left max-w-6xl my-4">{category}</DualHeading>
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
