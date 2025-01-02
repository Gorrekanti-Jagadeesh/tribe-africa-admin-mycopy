import CardsGrid from '../../molecules/layout/cards-grid';
import DualHeading from '../../atoms/heading/dual-heading';

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
    <div className="max-w-6xl m-auto p-4">
      <DualHeading className="my-4">{category}</DualHeading>
      <CardsGrid data={data} />
    </div>
  );
};

export default MustSeeAndDoScreen;
