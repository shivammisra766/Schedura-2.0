import React, { useState, useEffect } from 'react';
import { MapPin, Loader2, Search } from 'lucide-react';

const popularCities = [
  { name: 'Mumbai', src: 'https://imgd.aeplcdn.com/0x0/n/p4fgnfb_1824547.jpg' },
  { name: 'Bangalore', src: 'https://imgd.aeplcdn.com/0x0/n/g36gnfb_1824559.jpg' },
  { name: 'Delhi', src: 'https://imgd.aeplcdn.com/0x0/n/2l7gnfb_1824555.jpg' },
  { name: 'Pune', src: 'https://imgd.aeplcdn.com/0x0/n/6ghgnfb_1824549.jpg' },
  { name: 'Navi Mumbai', src: 'https://imgd.aeplcdn.com/0x0/n/zt8gnfb_1824551.jpg' },
  { name: 'Hyderabad', src: 'https://imgd.aeplcdn.com/0x0/n/zgkgnfb_1824553.jpg' },
  { name: 'Ahmedabad', src: 'https://imgd.aeplcdn.com/0x0/n/a6tgnfb_1824565.jpg' },
  { name: 'Chennai', src: 'https://imgd.aeplcdn.com/0x0/n/18qgnfb_1824561.jpg' },
  { name: 'Kolkata', src: 'https://imgd.aeplcdn.com/0x0/n/h55gnfb_1824563.jpg' },
  { name: 'Chandigarh', src: 'https://imgd.aeplcdn.com/0x0/n/i5ngnfb_1824557.jpg' }
];

const LocationSelector = ({ onLocationSelect = () => {} }) => {
  const [location, setLocation] = useState(() => {
    // Try to get cached location from localStorage
    const cached = localStorage.getItem('userLocation');
    return cached ? JSON.parse(cached) : '';
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [loadingStatus, setLoadingStatus] = useState('');

  // Cache the location in localStorage
  useEffect(() => {
    if (location) {
      localStorage.setItem('userLocation', JSON.stringify(location));
      // Call the onLocationSelect prop when location changes
      onLocationSelect(location);
    }
  }, [location, onLocationSelect]);

  const handleCitySelect = (cityName) => {
    setLocation(cityName);
    setIsModalOpen(false);
  };

  const detectLocation = () => {
    setIsLoading(true);
    setLoadingStatus('Getting your Location...');

    // Set a timeout for the geolocation request
    const timeoutId = setTimeout(() => {
      setIsLoading(false);
      setLoadingStatus('');
      alert('Location detection timed out. Please try again or enter manually.');
    }, 15000); // 15 second timeout

    if ("geolocation" in navigator) {
      // Options for faster geolocation
      const options = {
        enableHighAccuracy: false, // Faster response with lower accuracy
        timeout: 5000,
        maximumAge: 300000 // Use cached position if available (5 minutes)
      };

      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const { latitude, longitude } = position.coords;
            console.log('Detected coordinates:', latitude, longitude);
            
            // Immediately set approximate location
            setLocation(`${latitude.toFixed(6)}, ${longitude.toFixed(6)}`);
            setLoadingStatus('Getting address details...');

            // Then get the detailed address
            const api = import.meta.env.VITE_OPENCAGE_API_KEY;
            const response = await fetch(
              `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${api}`
            );

            if (!response.ok) {
              throw new Error('Failed to fetch address');
            }

            const data = await response.json();
            if (data.results.length > 0) {
              // Get a simplified address format
              const result = data.results[0];
              const components = result.formatted;
              const simplifiedAddress = components;

              setLocation(simplifiedAddress);
              setIsModalOpen(false);
            }
          } catch (error) {
            console.error('Error getting location:', error);
            // Keep the coordinate-based location if address lookup fails
          } finally {
            clearTimeout(timeoutId);
            setIsLoading(false);
            setLoadingStatus('');
          }
        },
        (error) => {
          clearTimeout(timeoutId);
          console.error('Error getting location:', error);
          setIsLoading(false);
          setLoadingStatus('');
          
          let errorMessage = 'Failed to detect location. ';
          switch(error.code) {
            case error.PERMISSION_DENIED:
              errorMessage += 'Please enable location access in your browser settings.';
              break;
            case error.POSITION_UNAVAILABLE:
              errorMessage += 'Location information is unavailable.';
              break;
            case error.TIMEOUT:
              errorMessage += 'Request timed out.';
              break;
            default:
              errorMessage += 'Please try again or enter location manually.';
          }
          alert(errorMessage);
        },
        options
      );
    } else {
      clearTimeout(timeoutId);
      setIsLoading(false);
      setLoadingStatus('');
      alert('Geolocation is not supported by your browser');
    }
  };

  return (
    <div className="relative">
      <div
        className="flex items-center space-x-2 cursor-pointer"
        onClick={() => setIsModalOpen(true)}
      >
        <MapPin className="h-5 w-5 text-blue-500 " />
        <div>
          <div className="text-sm font-medium">
            {location ? 'Location' : 'Select Location'}
          </div>
          {location ? (
            <div>
              <div className="text-base font-semibold">
                {location.split(',')[0]}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {location.split(',').slice(1).join(',').trim()}
              </div>
            </div>
          ) : (
            <div className="text-xs text-gray-500 truncate max-w-[200px] dark:text-gray-300">
              Please select your location
            </div>
          )}
        </div>
      </div>

      {/* Location Modal */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center"
          onClick={() => setIsModalOpen(false)}
        >
          <div 
            className="bg-white p-6 rounded-lg w-full max-w-2xl dark:bg-gray-800 dark:text-gray-300"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Search Bar */}
            <div className="relative mb-8">
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400 dark:text-gray-600" />
              </div>
              <input
                type="text"
                placeholder="Type your Pincode or City"
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-full focus:outline-none focus:border-blue-500 dark:text-gray-800 dark:placeholder:text-gray-600"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Detect Location Button */}
            <button
              onClick={detectLocation}
              className="w-full flex items-center space-x-2 text-blue-500 mb-8 hover:text-blue-600"
              disabled={isLoading}
            >
              <MapPin className="h-5 w-5" />
              <span className="text-lg">Detect my location</span>
            </button>

            {/* Popular Cities */}
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-gray-700 mb-4 dark:text-gray-300">Popular Cities</h3>
              <div className="grid grid-cols-5 gap-6">
                {popularCities.map((city) => (
                  <div
                    key={city.name}
                    className="flex flex-col items-center cursor-pointer hover:text-blue-500"
                    onClick={() => handleCitySelect(city.name)}
                  >
                    <img 
                      src={city.src} 
                      alt={city.name}
                      className="w-20 h-19 mb-2"
                      onError={(e) => {
                        e.target.onerror = null;
                      }}
                    />
                    <span className="text-sm text-center">{city.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {isLoading && (
              <div className="text-center">
                <Loader2 className="h-8 w-8 animate-spin mx-auto mb-2" />
                <div className="text-sm text-gray-500">{loadingStatus}</div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default LocationSelector; 