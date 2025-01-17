import TribeAfricaPagesCard from '@atoms/card/tribe-africa-pages-card';
import DualHeading from '@atoms/heading/dual-heading';
import ReviewCard from '@atoms/card/review-card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil } from '@fortawesome/free-solid-svg-icons';
import type { ProffesionalData } from '../../../src/types/index';
import { sanityImageUrlBuilder } from '@api/index';
import { FaEnvelope, FaFacebook, FaGlobe, FaInstagram, FaLinkedin, FaPhone, FaTwitter } from 'react-icons/fa';
import { FaLocationDot } from 'react-icons/fa6';

const LookingToHireSomeoneDetailsScreen: React.FC<{ proffesionalPersonData: ProffesionalData }> = ({
  proffesionalPersonData,
}) => {
  return (
    <div className="p-2 md:p-4 max-w-6xl m-auto">
      <DualHeading className="font-bold">{proffesionalPersonData.name}</DualHeading>
      <TribeAfricaPagesCard
        className="border-none"
        image={sanityImageUrlBuilder(proffesionalPersonData.proffessionalImage).url()}
        content={
          <div className="mx-3">
            <p>
              <strong> Role:</strong> {proffesionalPersonData.role}
            </p>
            <p>
              <strong> Proffession: </strong>
              {proffesionalPersonData.proffession}
            </p>
            <p>
              <strong> Experience: </strong>
              {proffesionalPersonData.experience}
            </p>
            <p>
              <strong>Personal Statement: </strong>
              {proffesionalPersonData.statement}
            </p>
            <div className="my-1">
              <div>
                <strong>Languages:</strong>
              </div>
              <div className="flex space-x-4">
                {proffesionalPersonData.languages.map((each) => (
                  <div className="bg-gray-200 px-4 py-2 rounded-lg">{each}</div>
                ))}
              </div>
            </div>
            <div className="my-1">
              <div>
                <strong>Skills & Expertise:</strong>
              </div>
              <div className="flex space-x-4">
                {proffesionalPersonData.skills.map((each) => (
                  <div className="bg-gray-200 px-4 py-2 rounded-lg">{each}</div>
                ))}
              </div>
            </div>
            <div className="my-1">
              <div>
                <strong>Proffessional Certificates:</strong>
              </div>
              <div className="flex space-x-4">
                {proffesionalPersonData.certificates.map((each) => (
                  <div className="bg-gray-200 px-4 py-2 rounded-lg">{each}</div>
                ))}
              </div>
            </div>
          </div>
        }
      />
      <div className="my-4">
        <h2 className="text-3xl font-semibold">Description</h2>
        <p>{proffesionalPersonData.description}</p>
      </div>

      <div className="my-4 space-y-2">
        <div className="flex justify-around">
          <div className="space-y-2">
            <h2 className="text-3xl font-semibold">Contact Details</h2>
            {proffesionalPersonData.phoneNumber && (
              <div className="flex gap-3">
                <a href={`tel:${proffesionalPersonData.phoneNumber}`} className="flex gap-3">
                  <FaPhone className="text-2xl" />
                  <p>{proffesionalPersonData.phoneNumber}</p>
                </a>
              </div>
            )}
            {proffesionalPersonData.email && (
              <div className="flex gap-3">
                <a href={`mailto:${proffesionalPersonData.email}`} className="flex gap-3">
                  <FaEnvelope className="text-2xl" />
                  <p>{proffesionalPersonData.email}</p>
                </a>
              </div>
            )}
            {proffesionalPersonData.streetAddress && (
              <div className="flex gap-3">
                <FaLocationDot className="text-2xl" />
                <p>
                  {proffesionalPersonData.streetAddress}, <br />
                  {proffesionalPersonData.city}, <br />
                  {proffesionalPersonData.region}, <br />
                  {proffesionalPersonData.postalCode}, <br />
                  {proffesionalPersonData.country}, <br />
                </p>
              </div>
            )}
            {proffesionalPersonData.website && (
              <div className="flex gap-3">
                <a href={proffesionalPersonData.website} target="_blank" className="flex gap-3">
                  <FaGlobe className="text-2xl" />
                  <p>{proffesionalPersonData.website}</p>
                </a>
              </div>
            )}
          </div>
          {proffesionalPersonData.instagramUrl ||
          proffesionalPersonData.facebookUrl ||
          proffesionalPersonData.twitterUrl ||
          proffesionalPersonData.linkedinUrl ? (
            <div className="space-y-2">
              <h2 className="text-3xl font-semibold"> Social Media Links</h2>
              {proffesionalPersonData.facebookUrl && (
                <div className="flex gap-3">
                  <a
                    href={proffesionalPersonData.facebookUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex gap-3"
                  >
                    <FaFacebook className="text-2xl" />
                    <p>{proffesionalPersonData.facebookUrl}</p>
                  </a>
                </div>
              )}
              {proffesionalPersonData.instagramUrl && (
                <div className="flex gap-3">
                  <a
                    href={proffesionalPersonData.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex gap-3"
                  >
                    <FaInstagram className="text-2xl" />
                    <p>{proffesionalPersonData.instagramUrl}</p>
                  </a>
                </div>
              )}
              {proffesionalPersonData.twitterUrl && (
                <div className="flex gap-3">
                  <a
                    href={proffesionalPersonData.twitterUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex gap-3"
                  >
                    <FaTwitter className="text-2xl" />
                    <p>{proffesionalPersonData.twitterUrl}</p>
                  </a>
                </div>
              )}
              {proffesionalPersonData.linkedinUrl && (
                <div className="flex gap-3">
                  <a
                    href={proffesionalPersonData.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex gap-3"
                  >
                    <FaLinkedin className="text-2xl" />
                    <p>{proffesionalPersonData.linkedinUrl}</p>
                  </a>
                </div>
              )}
            </div>
          ) : null}
        </div>
      </div>

      <div className="my-4">
        <div className="flex my-4">
          <h2 className="text-3xl font-semibold">Reviews</h2>
          <button className="border-b border-b-black ms-auto flex justify-center items-center gap-2" onClick={() => {}}>
            <FontAwesomeIcon icon={faPencil} /> write a review
          </button>
        </div>
        <div id="reviews" className="flex flex-col gap-4">
          {proffesionalPersonData.reviews?.map((item, index) => <ReviewCard key={index} data={item} />)}
        </div>
      </div>
    </div>
  );
};

export default LookingToHireSomeoneDetailsScreen;
