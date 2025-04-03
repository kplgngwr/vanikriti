import { Loader } from '@googlemaps/js-api-loader';

// Google Maps API key from environment variables
const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAP_API;

if (!GOOGLE_MAPS_API_KEY) {
  console.warn('Google Maps API key is not defined in environment variables');
}

// Initialize the Google Maps loader
export const mapsLoader = new Loader({
  apiKey: GOOGLE_MAPS_API_KEY as string,
  version: 'weekly',
  libraries: ['places', 'drawing', 'geometry']
});

// Helper function to load Google Maps
export const loadGoogleMaps = () => {
  return mapsLoader.load()
    .then(() => {
      console.log('Google Maps API loaded successfully');
      return window.google;
    })
    .catch((error) => {
      console.error('Error loading Google Maps API:', error);
      throw error;
    });
};
