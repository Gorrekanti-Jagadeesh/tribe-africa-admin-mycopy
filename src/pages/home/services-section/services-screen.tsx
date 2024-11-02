import Button from '../../../atoms/custom-button/button';
import { ServicesScreenProps } from '../../../types';

const ServicesScreen: React.FC<ServicesScreenProps> = ({ data }) => {
  return (
    <div className="my-12 grid gap-2 m-auto max-w-6xl p-2 md:p-4">
      <h3 className="text-4xl animate-on-scroll">
        Premier <span className="font-serif text-orange-500">Services</span>
      </h3>
      <div id="services-container" className="grid grid-cols-3 gap-3 animate-on-scroll">
        {/* Cards */}
        {data.map((service, index) => (
          <div className="my-4" key={index}>
            <div className="border-2 border-gray-300 p-2 rounded" style={{ aspectRatio: '4/3' }}>
              <div
                className="relative bg-cover bg-center p-2 w-full h-full"
                style={{ backgroundImage: `url(${service.image})` }}
              ></div>
            </div>
            <div>
              <h6 className="font-semibold">{service.heading}</h6>
              <p className="text-sm">{service.location}</p>
            </div>
          </div>
        ))}
      </div>
      <div id="add-service" className=" animate-on-scroll">
        <div className="bg-black border-2 border-orange-500 rounded-md text-white text-center p-8 grid gap-4">
          <h4 className=" text-lg font-bold">Want to List your business in Tribe Africa</h4>
          <p className="text-sm">Advertise your business on tribe africa and get massive traffic to your business</p>
          {/* <button className="px-4 py-2 bg-orange-500 rounded-md text-white m-auto" style={{ width: 'fit-content' }}>
            Fill the form
          </button> */}
          <Button style={{ width: 'fit-content' }}> Fill the form</Button>
        </div>
      </div>
    </div>
  );
};

export default ServicesScreen;
