const AfterWork = () => {
  return (
    <div className="p-4">
      <h4 className="text-left text-orange-500 text-lg">&rarr; Discover</h4>
      <div className="flex">
        {data.map((item) => (
          <div className="inline-block p-2 my-2 cursor-pointer w-fit">
            <div
              className="aspect-square bg-cover bg-center rounded-md border border-orange-500"
              style={{
                width: '200px',
                backgroundImage: `url(${item.image})`,
              }}
            ></div>
            <p className="text-left">{item.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AfterWork;

const data = [
  {
    title: '',
    image: '',
  },
];
