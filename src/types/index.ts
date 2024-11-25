import { NavigateFunction } from 'react-router';

// data
export interface ServicesProps {
  heading: string;
  image: string;
  location: string;
}

export interface ServicesScreenProps {
  data: ServicesProps[];
}

export interface ContentfulSys {
  id: string;
}

export interface CustomContentfulAsset {
  sys: ContentfulSys;
  url?: Promise<string>;
}

export interface HotelFields {
  hotelName: string;
  country: string;
  address: string;
  phone: string;
  hotelImages: CustomContentfulAsset[];
}

export interface carouselCardProps {
  image: string;
  info: string;
  onClick: () => void;
}

export interface ContentfulEntry {
  sys: ContentfulSys;
  fields: HotelFields;
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
  items: string[];
  imageUrl: string;
}

export interface NetworkCategory {
  title: string;
  items: { label: string; url: string }[];
  imageUrl: string;
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
export interface Review {
  hotel_id: string;
  review_text: string;
  quality_of_service: number;
  comfort: number;
  food_and_beverage: number;
  location: number;
  cleanliness: number;
  total_rating: number;
  created_at: string;
  images?: Array<{
    _type: 'image';
    asset: {
      _ref: string;
      _type: 'reference';
    };
    _key: string;
  }>;
  reviewer_name: string;
  reviewer_image: string;
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
