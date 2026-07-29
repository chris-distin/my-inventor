export interface Property {
  id: string;
  title: string;
  price: string;
  location: string;
  type: string;
  purpose: string;
  bedrooms: number;
  bathrooms: number;
  area: string;
  developer: string;
  image: string;
  images: string[];
  description: string;
  amenities: string[];
  agent?: {
    name: string;
    role: string;
    phone: string;
    email: string;
    image: string;
  };
  latitude: number;
  longitude: number;
}


export const properties: Property[] = [

  {
    id: "dubai-marina-apartment",

    title: "Dubai Marina Luxury Apartment",

    price: "AED 2,000,000",

    location: "Dubai Marina, Dubai, UAE",

    type: "Apartment",

    purpose: "Buy",

    bedrooms: 2,

    bathrooms: 2,

    area: "1,250 sq ft",

    developer: "Emaar Properties",

    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",

    images: [
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea",
    ],

    description:
      "Luxury apartment with marina views, swimming pool, gym, parking and premium facilities.",

    amenities: [
      "🏊 Swimming Pool",
      "🏋️ Gym",
      "🚗 Parking",
      "🌊 Marina View",
      "🔒 Security",
      "🏠 Balcony",
    ],

    agent: {
      name: "Ahmed Hassan",
      role: "Senior Property Consultant",
      phone: "971500000000",
      email: "ahmed@homeforall.ae",
      image: "/images/agent.jpg",
    },

    latitude: 25.0805,
    longitude: 55.1403,
  },


  {
    id: "palm-jumeirah-villa",

    title: "Palm Jumeirah Beach Villa",

    price: "AED 8,500,000",

    location: "Palm Jumeirah, Dubai, UAE",

    type: "Villa",

    purpose: "Buy",

    bedrooms: 5,

    bathrooms: 6,

    area: "4,500 sq ft",

    developer: "Nakheel",

    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",

    images: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea",
    ],

    description:
      "Exclusive beachfront villa with private pool, garden and luxury lifestyle.",

    amenities: [
      "🏖 Private Beach",
      "🏊 Swimming Pool",
      "🌴 Garden",
      "🚗 Garage",
      "🔒 Security",
    ],

    agent: {
      name: "Sara Mohammed",
      role: "Luxury Property Advisor",
      phone: "971500000001",
      email: "sara@homeforall.ae",
      image: "/images/agent2.jpg",
    },

    latitude: 25.1124,
    longitude: 55.1390,
  },


  {
    id: "downtown-penthouse",

    title: "Downtown Dubai Penthouse",

    price: "AED 6,300,000",

    location: "Downtown Dubai, UAE",

    type: "Penthouse",

    purpose: "Buy",

    bedrooms: 4,

    bathrooms: 5,

    area: "3,200 sq ft",

    developer: "Emaar Properties",

    image:
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea",

    images: [
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea",
    ],

    description:
      "Premium penthouse with Burj Khalifa view and world-class facilities.",

    amenities: [
      "🏙 City View",
      "🏊 Pool",
      "🏋️ Gym",
      "🚗 Parking",
      "🛎 Concierge",
    ],

    agent: {
      name: "Mohammed Ali",
      role: "Dubai Real Estate Specialist",
      phone: "971500000002",
      email: "mohammed@homeforall.ae",
      image: "/images/agent3.jpg",
    },

    latitude: 25.1972,
    longitude: 55.2744,
  },

];