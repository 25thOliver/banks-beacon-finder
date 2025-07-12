import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Building2, Shield, Clock, MapPin, Users, TrendingUp } from "lucide-react";

interface CarouselItem {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  gradient: string;
}

const carouselItems: CarouselItem[] = [
  {
    id: 1,
    title: "Find Your Bank",
    subtitle: "Locate Any Bank Branch",
    description: "Search through thousands of bank branches across Kenya with our comprehensive database. Find the nearest branch, ATM, or banking service you need.",
    icon: <Building2 size={48} className="text-white" />,
    color: "from-blue-600 to-blue-800",
    gradient: "bg-gradient-to-br from-blue-600 to-blue-800"
  },
  {
    id: 2,
    title: "Secure Banking",
    subtitle: "Trusted Financial Services",
    description: "Access information about secure banking services, branch locations, and contact details for all major banks in Kenya.",
    icon: <Shield size={48} className="text-white" />,
    color: "from-green-600 to-green-800",
    gradient: "bg-gradient-to-br from-green-600 to-green-800"
  },
  {
    id: 3,
    title: "24/7 Access",
    subtitle: "Always Available",
    description: "Get real-time information about bank branches, working hours, and services. Never miss important banking information again.",
    icon: <Clock size={48} className="text-white" />,
    color: "from-purple-600 to-purple-800",
    gradient: "bg-gradient-to-br from-purple-600 to-purple-800"
  },
  {
    id: 4,
    title: "Nationwide Coverage",
    subtitle: "Every Corner of Kenya",
    description: "From Nairobi to Mombasa, Kisumu to Nakuru - find banking services wherever you are in Kenya with our extensive coverage.",
    icon: <MapPin size={48} className="text-white" />,
    color: "from-orange-600 to-orange-800",
    gradient: "bg-gradient-to-br from-orange-600 to-orange-800"
  },
  {
    id: 5,
    title: "Customer Support",
    subtitle: "We're Here to Help",
    description: "Get detailed contact information for bank branches, including phone numbers, email addresses, and working hours.",
    icon: <Users size={48} className="text-white" />,
    color: "from-teal-600 to-teal-800",
    gradient: "bg-gradient-to-br from-teal-600 to-teal-800"
  },
  {
    id: 6,
    title: "Financial Growth",
    subtitle: "Your Success Partner",
    description: "Discover banking services that support your financial goals. From personal accounts to business banking solutions.",
    icon: <TrendingUp size={48} className="text-white" />,
    color: "from-indigo-600 to-indigo-800",
    gradient: "bg-gradient-to-br from-indigo-600 to-indigo-800"
  }
];

const HomeCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % carouselItems.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
    // Resume auto-play after 10 seconds of inactivity
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? carouselItems.length - 1 : prevIndex - 1
    );
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === carouselItems.length - 1 ? 0 : prevIndex + 1
    );
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  return (
    <div className="relative w-full max-w-6xl mx-auto mb-12">
      {/* Main Carousel */}
      <div className="relative overflow-hidden rounded-2xl shadow-2xl">
        <div 
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {carouselItems.map((item) => (
            <div
              key={item.id}
              className="w-full flex-shrink-0 relative min-h-[400px] md:min-h-[500px]"
            >
              <div className={`absolute inset-0 ${item.gradient}`} />
              <div className="absolute inset-0 bg-black/20" />
              
              <div className="relative z-10 flex flex-col md:flex-row items-center justify-center h-full p-8 md:p-12">
                {/* Content */}
                <div className="text-center md:text-left md:flex-1 md:pr-12">
                  <div className="mb-6">
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2">
                      {item.title}
                    </h2>
                    <p className="text-xl md:text-2xl text-white/90 font-medium mb-4">
                      {item.subtitle}
                    </p>
                    <p className="text-lg text-white/80 leading-relaxed max-w-2xl">
                      {item.description}
                    </p>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-4">
                    <button className="bank-button bg-white text-bank-primary hover:bg-gray-100">
                      Get Started
                    </button>
                    <button className="bank-button-secondary border-2 border-white text-white hover:bg-white hover:text-bank-primary">
                      Learn More
                    </button>
                  </div>
                </div>
                
                {/* Icon */}
                <div className="mt-8 md:mt-0 md:flex-1 flex justify-center">
                  <div className="bg-white/20 backdrop-blur-sm rounded-full p-8 border border-white/30">
                    {item.icon}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={goToPrevious}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-3 rounded-full transition-all duration-200 border border-white/30"
          aria-label="Previous slide"
        >
          <ChevronLeft size={24} />
        </button>
        
        <button
          onClick={goToNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-3 rounded-full transition-all duration-200 border border-white/30"
          aria-label="Next slide"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      {/* Dots Indicator */}
      <div className="flex justify-center mt-6 space-x-2">
        {carouselItems.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-200 ${
              index === currentIndex
                ? 'bg-bank-primary scale-125'
                : 'bg-gray-300 hover:bg-gray-400'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Progress Bar */}
      <div className="mt-4 w-full bg-gray-200 rounded-full h-1">
        <div
          className="bg-bank-primary h-1 rounded-full transition-all duration-500 ease-linear"
          style={{ width: `${((currentIndex + 1) / carouselItems.length) * 100}%` }}
        />
      </div>
    </div>
  );
};

export default HomeCarousel; 