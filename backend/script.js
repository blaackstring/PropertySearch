import fs from 'fs';
import { ImgUrl } from './images.js';

// Amenity types and samples
const amenityTypes = [
  'Restaurant',
  'Hospital',
  'School',
  'ATM',
  'Mall',
  'Park'
];

function randomAmenity(city, type) {
  return {
    type,
    name: `${type} ${Math.floor(Math.random() * 100)}`,
    address: `${Math.floor(Math.random() * 1000)} ${type} St, ${city}`,
    distance: Math.floor(Math.random() * 2000) + 100,
    duration: `${Math.floor(Math.random() * 15) + 1} mins`,
    placeId: `PLACE${Math.floor(Math.random() * 100000)}`,
    rating: Math.round((Math.random() * 2 + 3) * 10) / 10, // 3.0 - 5.0
    userRatingsTotal: Math.floor(Math.random() * 500) + 10
  };
}

// Sample cities with lat/lng for Google Maps
const cities = [
  { city: 'Mumbai', state: 'Maharashtra', pincodes: ['400001', '400002', '400003'], lat: 19.076, lng: 72.8777 },
  { city: 'Delhi', state: 'Delhi', pincodes: ['110001', '110002', '110003'], lat: 28.6139, lng: 77.209 },
  { city: 'Bangalore', state: 'Karnataka', pincodes: ['560001', '560002', '560003'], lat: 12.9716, lng: 77.5946 },
  { city: 'Chennai', state: 'Tamil Nadu', pincodes: ['600001', '600002', '600003'], lat: 13.0827, lng: 80.2707 },
  { city: 'Hyderabad', state: 'Telangana', pincodes: ['500001', '500002', '500003'], lat: 17.385, lng: 78.4867 },
];

const propertyTypes = ['Apartment', 'Villa', 'Independent House', 'Studio', 'Penthouse'];

function sampleArray(arr, min, max) {
  const count = Math.floor(Math.random() * (max - min + 1)) + min;
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

function sampleImage(arr) {
  const idx = Math.floor(Math.random() * arr.length);
  return arr[idx];
}

function randomDate(startDaysAgo = 365) {
  const now = new Date();
  const pastDate = new Date(now.getTime() - Math.floor(Math.random() * startDaysAgo) * 24 * 60 * 60 * 1000);
  return pastDate.toISOString();
}

const data = [];

for (let i = 0; i < 100; i++) {
  const cityInfo = cities[Math.floor(Math.random() * cities.length)];
  const city = cityInfo.city;
  const state = cityInfo.state;
  const pincode = cityInfo.pincodes[Math.floor(Math.random() * cityInfo.pincodes.length)];
  const bedrooms = Math.floor(Math.random() * 5) + 1;
  const bathrooms = Math.floor(Math.random() * bedrooms) + 1;
  const area = Math.floor(Math.random() * (4000 - 500 + 1)) + 500;
  const price = Math.floor(Math.random() * 10000000) + 1000;
  const propertyType = propertyTypes[Math.floor(Math.random() * propertyTypes.length)];
  const amenitiesTypes = sampleArray(amenityTypes, 2, 5);
  const images = [sampleImage(ImgUrl)];
  const listedDate = randomDate();

  data.push({
    title: `${bedrooms}BHK ${propertyType} in ${city}`,
    description: `A beautiful ${bedrooms}-bedroom property located in the heart of ${city}, ${state}. Well maintained and spacious.`,
    price,
    location: {
      city,
      state,
      pincode,
    },
    propertyType,
    bedrooms,
    bathrooms,
    area,
    coordinates: {
      latitude: cityInfo.lat + (Math.random() - 0.5) * 0.05,
      longitude: cityInfo.lng + (Math.random() - 0.5) * 0.05,
    },
    images,
    listedDate,
  });
}

fs.writeFileSync('data1.json', JSON.stringify(data, null, 2));
console.log('✅ data1.json with 100 property records created (with amenities as NearbyAmenity objects)!');
