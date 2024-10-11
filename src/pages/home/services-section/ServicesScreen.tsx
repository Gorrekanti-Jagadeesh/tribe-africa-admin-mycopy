import welcomeImage2 from '../../../assets/homepage-welcome-image-2.png';

const Services: React.FC = () => {
  return (
    <div className="my-12 p-2 grid gap-2 m-auto max-w-6xl">
      <h3 className="text-4xl">
        Premier <span className="font-serif text-orange-500">Services</span>
      </h3>
      <div id="services-container" className="grid grid-cols-3 gap-2">
        {/* Cards */}
        <div className="my-4">
          <div className="border-2 border-gray-300 p-2 rounded" style={{ aspectRatio: '4/3' }}>
            <div
              className="relative bg-cover bg-center p-2 w-full h-full"
              style={{ backgroundImage: `url(${welcomeImage2})` }}
            ></div>
          </div>
          <div>
            <h6 className="font-bold text-sm">Executive Logistics</h6>
            <p className="text-sm">Fajara, The gambia</p>
          </div>
        </div>
        <div className="my-4">
          <div className="border-2 border-gray-300 p-2 rounded" style={{ aspectRatio: '4/3' }}>
            <div
              className="relative bg-cover bg-center p-2 w-full h-full"
              style={{ backgroundImage: `url(${welcomeImage2})` }}
            ></div>
          </div>
          <div>
            <h6 className="font-bold text-sm">Executive Logistics</h6>
            <p className="text-sm">Fajara, The gambia</p>
          </div>
        </div>
        <div className="my-4">
          <div className="border-2 border-gray-300 p-2 rounded" style={{ aspectRatio: '4/3' }}>
            <div
              className="relative bg-cover bg-center p-2 w-full h-full"
              style={{ backgroundImage: `url(${welcomeImage2})` }}
            ></div>
          </div>
          <div>
            <h6 className="font-bold text-sm">Executive Logistics</h6>
            <p className="text-sm">Fajara, The gambia</p>
          </div>
        </div>
      </div>
      <div id="add-service">
        <div className="bg-black border-2 border-orange-500 rounded-md text-white text-center p-8 grid gap-4">
          <h4 className=" text-lg font-bold">Want to List your business in Tribe Africa</h4>
          <p className="text-sm">Advertise your business on tribe africa and get massive traffic to your business</p>
          <button className="px-4 py-2 bg-orange-500 rounded-md text-white m-auto" style={{ width: 'fit-content' }}>
            Fill the form
          </button>
        </div>
      </div>
    </div>
  );
};

export default Services;
