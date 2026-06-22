export type PropertyStatus = "For Sale" | "For Rent" | "Sold";
export type PropertyType = "House" | "Apartment" | "Villa" | "Studio" | "Commercial";

export interface PropertyImage {
  url: string;
  alt: string;
}

export interface Property {
  id: string;
  title: string;
  description: string;
  status: PropertyStatus;
  type: PropertyType;
  price: number;
  location: {
    address: string;
    city: string;
    state: string;
    zip: string;
  };
  specs: {
    bedrooms: number;
    bathrooms: number;
    sqft: number;
    garage?: number;
    yearBuilt?: number;
    floors?: number;
  };
  features: string[];
  images: PropertyImage[];
  isFeatured: boolean;
  agentId: string;
  listedAt: string;
}

export interface Agent {
  id: string;
  name: string;
  title: string;
  phone: string;
  email: string;
  photo: string;
  bio: string;
  yearsExperience: number;
  propertiesSold: number;
  rating: number;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  quote: string;
  avatar: string;
  rating: number;
}

export interface PropertyFilters {
  query: string;
  type: PropertyType | "All";
  status: PropertyStatus | "All";
  minPrice: number;
  maxPrice: number;
  city: string;
  sortBy: "price-asc" | "price-desc" | "newest" | "oldest";
}

export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  propertyId?: string;
  message: string;
}
