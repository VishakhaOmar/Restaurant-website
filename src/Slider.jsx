import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const images = [
  "https://via.placeholder.com/800x400?text=Slide+1",
  "https://via.placeholder.com/800x400?text=Slide+2",
  "https://via.placeholder.com/800x400?text=Slide+3",
];

export default function Slider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 3000); 
    return () => clearInterval(interval);
  }, [currentIndex]);

  return (
    <div className="bg-blue-950 h-[40vh] relative w-screen max-w-[95vw] mx-auto overflow-hidden my-10">
      <div className="flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
        {images.map((src, index) => (
          <img key={index} src={src} alt={`Slide ${index + 1}`} className="w-full flex-shrink-0" />
        ))}
      </div>
      <button onClick={prevSlide} className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full">
        <ChevronLeft />
      </button>
      <button onClick={nextSlide} className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full">
        <ChevronRight />
      </button>
    </div>
  );
}