import Button from '@/atoms/custom-button/button';
import RoomImage from '../../assets/room_image.png';
import { faFacebookF, faTwitter, faInstagram, faLinkedinIn, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil } from '@fortawesome/free-solid-svg-icons';
import ReviewCard from '@/atoms/card/review-card';
import { sanityImageUrlBuilder } from '@/api';

interface address {
  town: string;
  state: string;
  country: string;
  postalCode: string;
  street: string;
}

interface businessAddress {
  phoneNumber?: string;
  website?: string;
  email?: string;
}

interface owenDetails {
  email: string;
  fullName: string;
  phoneNumber: string;
  role: string;
}

interface findAbusinessDetails {
  // _id: string;
  businessName?: string;
  businessMotive: string;
  address: address;
  businessContactInformation?: businessAddress;
  ownerContactInformation: owenDetails;
  paymentMethods: string[];
  socialMediaLinks: string[];
  description: string;
  image: string;
}

interface data {
  data: findAbusinessDetails;
}

const FindaBusinessDetailsScreen: React.FC<data> = ({ data }) => {
  const socialLinks = [
    { href: 'https://facebook.com', icon: faFacebookF },
    { href: 'https://twitter.com', icon: faTwitter },
    { href: 'https://twitter.com', icon: faYoutube },
    { href: 'https://instagram.com', icon: faInstagram },
    { href: 'https://linkedin.com', icon: faLinkedinIn },
  ];

  const reviews = [
    {
      _id: '1',
      key: 'review:accommodation:12345',
      reviewDescription: 'Great product! The quality is fantastic and it arrived on time.',
      reviewerImage: '',
      ratings: [
        { title: 'Quality', score: 5 },
        { title: 'Value', score: 4 },
      ],
      submittedBy: 'John Doe',
      submittedDate: '2025-01-05',
    },
    {
      _id: '2',
      key: 'review:accommodation:12346',
      reviewDescription: 'Not bad, but could be improved. The material feels a bit cheap.',
      reviewerImage: '',
      ratings: [
        { title: 'Quality', score: 3 },
        { title: 'Value', score: 2 },
      ],
      submittedBy: 'Jane Smith',
      submittedDate: '2025-01-06',
    },
    {
      _id: '3',
      key: 'review:people:67890',
      reviewDescription: 'Excellent customer service. The item exceeded my expectations!',
      reviewerImage: '',
      ratings: [
        { title: 'Service', score: 5 },
        { title: 'Satisfaction', score: 5 },
      ],
      submittedBy: 'Alice Johnson',
      submittedDate: '2025-01-07',
    },
    {
      _id: '4',
      key: 'review:people:67891',
      reviewDescription: 'The product was damaged upon arrival, very disappointed.',
      reviewerImage: '',
      ratings: [
        { title: 'Quality', score: 2 },
        { title: 'Satisfaction', score: 1 },
      ],
      submittedBy: 'Mark Lee',
      submittedDate: '2025-01-08',
    },
    {
      _id: '5',
      key: 'review:accommodation:12347',
      reviewDescription: 'Good value for the price. Would recommend to friends.',
      reviewerImage: '',
      ratings: [
        { title: 'Value', score: 4 },
        { title: 'Comfort', score: 4 },
      ],
      submittedBy: 'Lisa White',
      submittedDate: '2025-01-09',
    },
  ];

  return (
    <div className="p-2 md:p-4 max-w-6xl m-auto">
      <div className="flex flex-col justify-end items-end md:pb-8">
        <h1 className="font-bold text-2xl">{data?.businessName}</h1>
        <p>{data?.businessMotive}</p>
      </div>
      <div className="overflow-hidden">
        <div className="gap-14 lg:flex">
          {/* Left Section */}
          <div className="lg:w-1/3">
            <img
              src={sanityImageUrlBuilder(data?.image).url()}
              alt="Room"
              className="w-full h-64 object-cover rounded-lg mb-4"
            />
            <div>
              <h1 className="text-lg mb-2">Socials</h1>
              <div className="flex space-x-4 mb-6">
                {data?.socialMediaLinks.map((link) => (
                  <a
                    key={link}
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-gray-900"
                  >
                    <FontAwesomeIcon icon={faLinkedinIn} size="2xl" />
                  </a>
                ))}
              </div>
            </div>

            <Button className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 w-full">
              Website
            </Button>
          </div>

          {/* Right Section */}
          <div className="lg:w-2/3 md:pt-8 border-t-2 border-orange-400">
            <div className="flex justify-between">
              {/* Contact Information */}
              <div className="mb-6">
                <h2 className="text-lg font-bold mb-2">Contact Information</h2>
                <p>Phone: +{data?.businessContactInformation?.phoneNumber}</p>
                <p>Email: {data?.businessContactInformation?.email}</p>
                <p>Website URL: {data?.businessContactInformation?.website}</p>
              </div>

              {/* Owner Details */}
              <div className="mb-6">
                <h2 className="text-lg font-bold mb-2">Owner / Manager Details</h2>
                <p>Full Name: {data?.ownerContactInformation?.fullName}</p>
                <p>Role: {data?.ownerContactInformation?.role}</p>
                <p>Phone: +{data?.ownerContactInformation?.phoneNumber}</p>
                <p>Email: {data?.ownerContactInformation?.email}</p>
              </div>
            </div>

            {/* Description */}
            <div className="mb-6 border-t pt-8">
              <h2 className="text-lg font-bold mb-2">Description</h2>
              <p className="text-sm leading-relaxed">{data?.description}</p>
            </div>
            {/* Address and Operating Hours */}
            <div className="sm:py-8 border-t lg:flex justify-between">
              <div className="mb-6 lg:mb-0">
                <h2 className="text-lg font-bold mb-2">Address</h2>
                <p>Street Address: {data?.address?.street}</p>
                <p>Town/City: {data?.address?.town}</p>
                <p>State/Region: {data?.address?.state}</p>
                <p>Postal Code: {data?.address?.postalCode}</p>
                <p>Country: {data?.address?.country}</p>
              </div>
              <div>
                <h2 className="text-lg font-bold mb-2">Operating Hours</h2>
                <p>Monday: 8:00 AM to 10:00 PM</p>
                <p>Tuesday: 8:00 AM to 10:00 PM</p>
                <p>Wednesday: 8:00 AM to 10:00 PM</p>
                <p>Thursday: 8:00 AM to 10:00 PM</p>
                <p>Friday: 8:00 AM to 10:00 PM</p>
                <p>Saturday: 8:00 AM to 4:00 PM</p>
                <p>Sunday: Holiday</p>
              </div>
            </div>

            {/* Payment Methods */}
            <div className="sm:py-8 border-t">
              <h2 className="text-lg font-bold mb-4">Payment Methods Accepted</h2>
              <div className="flex space-x-4">
                {data?.paymentMethods.map((type) => (
                  <div key={type} className="bg-gray-200 px-4 py-2 rounded-lg">
                    {type}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Reviews */}

        <div className="my-4 border-t">
          <div className="flex my-4">
            <h2 className="text-3xl font-semibold">Reviews</h2>
            <button
              className="border-b border-b-black ms-auto flex justify-center items-center gap-2"
              onClick={() => {}}
            >
              <FontAwesomeIcon icon={faPencil} /> write a review
            </button>
          </div>
          <div id="reviews" className="flex flex-col gap-4">
            {reviews.map((item, index) => (
              <ReviewCard key={index} data={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FindaBusinessDetailsScreen;
