import { useState } from 'react';
import './user-artist.css';

interface Artist {
  id: number;
  name: string;
  imageUrl: string;
}

function Artists() {
  // Dummy data for 10 artists
  const dummyArtists: Artist[] = Array.from({ length: 10 }, (_, i) => ({
    id: i + 1,
    name: `Artist ${i + 1}`,
    imageUrl: `${process.env.REACT_APP_PLACEHOLDER_ARTIST}+${i + 1}`,
  }));

  const [artists] = useState<Artist[]>(dummyArtists); // Static artists list
  const [currentIndex, setCurrentIndex] = useState(0); // Index of the first visible artist in the current set

  // Move to the next set of 5 artists
  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex + 5 >= artists.length ? 0 : prevIndex + 5
    );
  };

  // Move to the previous set of 5 artists
  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? artists.length - 5 : prevIndex - 5
    );
  };

  return (
    <div className="relative w-full max-w-7xl mx-auto p-4 bg-gray-800 rounded-lg shadow-md overflow-hidden">
      {/* Title */}
      <h2 className="text-white text-lg font-medium mb-4">Artists</h2>

      {/* Navigation Arrows and Artists Display */}
      <div className="relative flex items-center">
        {/* Previous Arrow */}
        <button
          onClick={handlePrev}
          className="absolute left-0 z-10 p-2 bg-blue-500 text-white rounded-full shadow hover:bg-blue-600 active:bg-blue-400 transition duration-100"
        >
          &#60;
        </button>

        {/* Artists */}
        <div className="overflow-hidden w-full px-10">
          <div
            className="whitespace-nowrap transition-transform duration-500"
            style={{
              transform: `translateX(-${(currentIndex / 5) * 100}%)`,
            }}
          >
            {artists.map((artist) => (
              <div
                key={artist.id}
                className="inline-block w-1/5 px-2" // 5 artists per row
              >
                <div className="flex flex-col items-center">
                  <img
                    src={artist.imageUrl}
                    alt={artist.name}
                    className="w-20 h-20 object-cover rounded-full"
                  />
                  <p className="mt-1 text-gray-300 text-sm">{artist.name}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Next Arrow */}
        <button
          onClick={handleNext}
          className="absolute right-0 z-10 p-2 bg-blue-500 text-white rounded-full shadow hover:bg-blue-600 active:bg-blue-400 transition duration-100"
        >
          &#62;
        </button>
      </div>
    </div>
  );
}

export default Artists;
