
import React, { useState } from 'react';

interface ImageSliderProps {
  images: string[];
}

const ImageSlider: React.FC<ImageSliderProps> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? images.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const isLastSlide = currentIndex === images.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  if (!images || images.length === 0) {
    return null;
  }

  return (
    <div className="relative h-96 w-full group overflow-hidden rounded-t-2xl bg-base-900">
      <img
        // Using a key ensures React replaces the element on src change, allowing for animations
        key={images[currentIndex]}
        src={images[currentIndex]}
        alt={`Скриншот проекта ${currentIndex + 1}`}
        className="w-full h-full object-cover duration-500 transition-opacity animate-fade-in"
        loading="lazy"
        decoding="async"
      />
      {/* Left Arrow */}
      {images.length > 1 && (
        <>
          <button
            onClick={goToPrevious}
            aria-label="Previous image"
            className="absolute top-1/2 left-5 -translate-y-1/2 text-white text-3xl cursor-pointer bg-black/30 rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-accent"
          >
            &#10094;
          </button>
          {/* Right Arrow */}
          <button
            onClick={goToNext}
            aria-label="Next image"
            className="absolute top-1/2 right-5 -translate-y-1/2 text-white text-3xl cursor-pointer bg-black/30 rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-accent"
          >
            &#10095;
          </button>
        </>
      )}
    </div>
  );
};

export default ImageSlider;