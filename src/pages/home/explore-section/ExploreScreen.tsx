import spiralBackground from '../../../assets/spiral-background-dark.png';
import welcomeImage1 from '../../../assets/homepage-welcome-image.png';
import welcomeImage2 from '../../../assets/homepage-welcome-image-2.png';
import welcomeImage3 from '../../../assets/homepage-welcome-image-3.png';

const Explore: React.FC = () => {
  return (
    <div
      className="relative bg-cover bg-center text-white p-2 md:p-4"
      style={{ backgroundImage: `url(${spiralBackground})` }}
    >
      <span className="m-auto max-w-6xl grid md:flex gap-4 md:gap-8 lg:gap-28 animate-on-scroll">
        <div id="welcome-content" className="grid gap-8 p-4">
          <h4 className="text-4xl">
            Explore Africa For <br />
            <span className="text-6xl">
              <span className="font-serif text-orange-500">Business</span> & Tourism
            </span>
          </h4>
          <div id="about-africa" className="grid gap-3">
            <p>
              Africa is a continent of 54 countries, abundant with a wealth of culture, talent, and awe-inspiring beauty
              to be discovered.
            </p>
            <p>
              A treasure trove of untapped potential for tourism and business. At her core is a young, vibrant
              population, brimming with entrepreneurial spirit; some of the most naturally born Entrepreneurs in the
              world.
            </p>
            <p>
              From the cradle of humanity to the captivating mysteries an melodies that stir the soul, every corner of
              this land tells a unique story.
            </p>
          </div>
          <div id="welcome-footer" className="text-sm">
            join{' '}
            <b>
              <i>Tribe Africa</i>
            </b>{' '}
            and be a part of the future. welcome to the tribe.
          </div>
        </div>
        <div className="grid justify-content-center h-full md:max-w-96">
          <div className="grid grid-cols-2 gap-4">
            {/* Top Left Image */}
            <div>
              <img
                src={welcomeImage1}
                alt="Person in suit"
                className="w-full h-full object-cover rounded-lg shadow-lg"
              />
            </div>

            {/* Top Right Image */}
            <div>
              <img
                src={welcomeImage2}
                alt="Aerial view of coastline"
                className="w-full h-full object-cover rounded-lg shadow-lg"
              />
            </div>
          </div>

          {/* Bottom Full-Width Image */}
          <div className="mt-4">
            <img src={welcomeImage3} alt="Person on boat" className="w-full h-full object-cover rounded-lg shadow-lg" />
          </div>
        </div>
      </span>
    </div>
  );
};

export default Explore;
