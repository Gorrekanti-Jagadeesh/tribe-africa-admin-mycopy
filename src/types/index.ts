import { NavigateFunction } from 'react-router';
import { SanityAsset } from '@sanity/image-url/lib/types/types';
import { TypedObject } from '@sanity/block-tools';

// data
export interface ServicesProps {
  heading: string;
  image: string;
  location: string;
}

export interface carouselCardProps {
  image: string;
  info: string;
  onClick: () => void;
}

export interface ContentfulResponse<T> {
  items: T[];
}

export interface customeBtnProps {
  title: string;
}

export interface customHeadingProps {
  title: string;
  subPartTitle: string;
  buttonTitle: string;
  titleStyles?: string;
}

export interface Option {
  value: string;
  label: string;
}

export interface DropdownProps {
  text: string;
  options: Option[];
  searchable: boolean;
  action: (selectedOption: string) => void;
}

export interface commonCarouselData {
  images: string[];
}

export interface HoverNavLinkProps {
  id: string;
  title: string;
  content: React.ReactNode;
}

export interface featured {
  imageURL: string;
  info: string;
  redirect: string;
  placeholder: string;
}

export interface content {
  imageURL: string;
  info: string;
  redirect: string;
}

export interface cardsProps {
  heading: React.ReactNode;
  data: content[];
  featuredCard?: featured;
}

export interface User {
  email: string | null;
  displayName: string | null;
}

export interface BrandingModalProps {
  open?: boolean;
  trigger?: React.ReactNode;
  modalContent: React.ReactNode;
}

export interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onGoogleLoginSuccess: (user: User) => void;
  onEmailLoginSuccess: (user: User) => void;
}

export interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogout: () => void;
}

export interface ExperienceScreenProps {
  playing: boolean;
  handlePlay: () => void;
  videoRef: React.RefObject<HTMLVideoElement>;
  handleVideoEnd: () => void;
}

export interface ExploreScreenProps {
  spiralBackground: string;
  welcomeImage1: string;
  welcomeImage2: string;
  welcomeImage3: string;
  TAlogo: string;
}

export interface HeroScreenProps {
  country: string | null;
  purpose: string | null;
  setCountry: React.Dispatch<React.SetStateAction<string | null>>;
  setPurpose: React.Dispatch<React.SetStateAction<string | null>>;
  handleGoClick: () => void;
  countries: { value: string; label: string }[];
  purposes: { value: string; label: string }[];
}

export interface holidayDestinationCarouselData {
  images: string[];
  titles: string[];
  activeIndex: number;
  isHovered: boolean;
  setIsHovered: (hovered: boolean) => void;
  getClassNames: (index: number) => string;
  handleDotClick: (index: number) => void;
  handleRightClick: () => void;
  handleLeftClick: () => void;
}

export interface DiscoverScreenProps {
  parentContent: boolean;
  content: React.ReactNode;
  handleClick: (jsx: React.ReactNode) => void;
  handleBackToDiscover: () => void;
  images: {
    innovationsView: string;
    didYouKnowView: string;
    bucketListView: string;
    greatOutdoorsView: string;
    pilgrimageView: string;
    weddingDestinationView: string;
  };
  navigate: NavigateFunction;
}

export interface CardProps {
  imageUrl: string;
  title: string;
  subtitle: string;
  description: string;
  link?: string;
}

export interface EventCategory {
  title: string;
  items: { url: string; label: string }[];
  imageUrl: string;
  subTitle?: string;
  subLinks?: { url: string; label: string }[];
  // subitems?: { url: string; label: string }[];
}

export interface NetworkCategory {
  title: string;
  items: {
    label: string;
    hasSubcategories: boolean;
    subCategories?: string[];
  }[];
  image: string;
}

export interface EventsScreenProps {
  eventCategories: EventCategory[];
}

// ------- Blogs interfaces ------------
export interface BlogContentProps {
  _id: string;
  image: string | { asset: { _ref: string } };
  title?: string;
  content: string;
}

export interface BlogPageScreenProps {
  blogId: string | undefined;
  // parseImageUrl: (imageRef: string) => string;
  banner: string;
  // blogsList: BlogContentProps[];
}

export interface RatingProps {
  quality_of_service: number;
  comfort: number;
  food_and_beverage: number;
  location: number;
  cleanliness: number;
}

export interface ReviewProps {
  _id: string;
  key: string; // `review:accomodation:${accomodation_id}` or `review:people:${person_id}`
  content: string;
  images?: Array<SanityAsset>;
  ratings: { title: string; score: number }[];
  submitted_by: string;
  created_at?: string;
  updated_at?: string;
}

export interface accomodationProps {
  name: string;
  address: string;
  website: string;
  phone_no: string;
  email: string;
  amount: string;
  images: string[];
  about: {
    title: string;
    description: TypedObject[];
  };
  policy: TypedObject[];
  paymentMethods: {
    card: boolean;
    cash: boolean;
  };
  acceptedCards: {
    masterCard: boolean;
    visaCard: boolean;
    americanExpress: boolean;
    discover: boolean;
    jcb: boolean;
  };
  landmarks: {
    title: string;
    distance: string;
  }[];
  attractions: {
    title: string;
    distance: string;
  }[];
  operating_season: {
    title: string;
    description: string;
  }[];
  location: {
    latitude: string;
    longitude: string;
  };
  amenities: {
    title: string;
    list: {
      title: string;
      description: string;
    }[];
  };
  reviews: {
    count: number;
    fields: RatingProps;
  };
}

export interface accommodationCardProps {
  _id: string;
  name: string;
  phone_no: string;
  website: string;
  address: string;
  amount: string;
  images: string;
  reviews: {
    count: number;
    fields: ReviewProps;
  };
}

export interface HotelData {
  _id: string;
  name: string;
  phone_number: string;
  website_url: string;
  location: string;
  rate: number;
  description: string;
  created_at: string;
  images: string[];
}

export interface QNAProps {
  _id: string;
  title: string;
  content: string;
  level: string;
  author: string;
  date: string;
  replies_count: string;
}

// Tribe africa pages
export interface candidateProps {
  _id?: string; // person_id
  name: string;
  description: string;
  experience: number | string;
  department: string; // ministry or police or artist or software
  role: string; // finance or  traffic or actor or web developer
  country: string;
  phone_no?: string;
  email?: string;
  website?: string;
  address?: string;
  created_at: Date;
  updated_at: Date;
}

export interface ProffesionalData {
  _id: string;
  name: string;
  department: string;
  role: string;
  experience: string;
  phone_no?: string;
  email?: string;
  website?: string;
  image: string;
  description: string;
  country: string;
  address?: string;
}

export default module.exports;
