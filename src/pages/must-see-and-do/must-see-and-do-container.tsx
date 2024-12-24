import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import MustSeeAndDoScreen from './must-see-and-do-screen';

import { getDataByEntryType } from '../../api';
import { parseImageUrl } from '../../utils/sanity';

import { msadCategories } from '../../data';

const MustSeeAndDo = () => {
  const [data, setData] = useState<
    {
      title: string;
      image: string;
      _id: string;
      onClick: () => void;
    }[]
  >([]);
  const [itemDetails, setItemDetails] = useState(null);
  const { category, id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const categoryTitle = msadCategories.find((item) => item.category === category)?.title;

    if (!category || !categoryTitle) {
      navigate('/');
      return;
    }

    if (id) {
      getDataByEntryType('must_see_and_do', `category == "${category}" && _id == "${id}"`)
        .then((res) => {
          if (res.length > 0) {
            setItemDetails({
              ...res[0],
              image: parseImageUrl(res[0].image.asset._ref),
            });
          } else {
            navigate(`/must-see-and-do/${category}`);
          }
        })
        .catch(() => {
          navigate('/');
        });
    } else {
      getDataByEntryType('must_see_and_do', `category == "${category}"`)
        .then((res) => {
          setData(
            res.map((item: { image: { asset: { _ref: string } }; _id: string }) => ({
              ...item,
              image: parseImageUrl(item.image.asset._ref),
              onClick: () => navigate(`/must-see-and-do/${category}/${item._id}`),
            }))
          );
        })
        .catch(() => {
          navigate('/');
        });
    }
  }, [category, id, navigate]);

  return (
    <div>
      <MustSeeAndDoScreen
        category={msadCategories.find((item) => item.category === category)?.title || category || 'error'}
        id={id}
        data={data}
        itemDetails={itemDetails}
      />
    </div>
  );
};

export default MustSeeAndDo;
