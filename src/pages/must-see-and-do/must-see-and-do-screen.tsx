import CardsGrid from '../../molecules/layout/cards-grid';
import DualHeading from '../../atoms/heading/dual-heading';
import { Loading } from '../../atoms/common/loading';

interface Item {
  title: string;
  image: string;
  _id: string;
  content?: string;
}

interface MustSeeAndDoScreenProps {
  category: string;
  id?: string;
  data: Item[];
  itemDetails: Item | null;
}

const MustSeeAndDoScreen: React.FC<MustSeeAndDoScreenProps> = ({ category, id, data, itemDetails }) => {
  if (!category) return null;

  return (
    <div className="max-w-6xl m-auto p-4">
      {!id ? (
        <>
          <DualHeading className="my-4">{category}</DualHeading>
          <CardsGrid data={data} />
        </>
      ) : (
        <div>
          {itemDetails ? (
            <>
              <DualHeading className="my-4">{itemDetails.title}</DualHeading>
              <img src={itemDetails.image} className="float-right max-w-96" />
              <div>
                <p>{itemDetails.content}</p>
              </div>
            </>
          ) : (
            <Loading />
          )}
        </div>
      )}
    </div>
  );
};

export default MustSeeAndDoScreen;
