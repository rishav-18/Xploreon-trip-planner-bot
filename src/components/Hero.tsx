
import { Button } from '@/components/ui/button';

const Hero = () => {
  const scrollToChat = () => {
    document.getElementById('chatbot-container')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-travel-light to-white py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0 md:pr-8">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-travel-dark mb-6">
              Plan Your Dream Trip with <span className="text-travel-blue">AI Assistance</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-700 mb-8">
              Tell our AI about your travel preferences and get personalized itineraries 
              with activities, accommodations, and insider tips tailored just for you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                className="bg-travel-blue hover:bg-travel-teal text-white px-8 py-6 text-lg"
                onClick={scrollToChat}
              >
                Plan My Trip
              </Button>
              <Button 
                variant="outline" 
                className="border-travel-blue text-travel-blue hover:bg-travel-light px-8 py-6 text-lg"
                onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Learn More
              </Button>
            </div>
          </div>
          <div className="md:w-1/2">
            <div className="relative">
              <div className="rounded-3xl overflow-hidden shadow-xl">
                <img 
                  src="https://images.unsplash.com/photo-1526772662000-3f88f10405ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" 
                  alt="Travel planning with AI" 
                  className="w-full h-auto"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-xl shadow-lg max-w-[200px] animate-bounce-in">
                <div className="text-travel-dark font-medium">
                  "Amazing trip to Tokyo planned in minutes!"
                </div>
                <div className="text-gray-500 text-sm mt-1">
                  - Sarah P.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Preview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20" id="features">
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="h-12 w-12 bg-travel-light rounded-full flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-travel-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Save Time</h3>
            <p className="text-gray-600">Get personalized travel plans in minutes, not hours of research.</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="h-12 w-12 bg-travel-light rounded-full flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-travel-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Expert Recommendations</h3>
            <p className="text-gray-600">Access AI-powered suggestions based on thousands of travel experiences.</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="h-12 w-12 bg-travel-light rounded-full flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-travel-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Customize Everything</h3>
            <p className="text-gray-600">Tailor your trip to your budget, interests, and travel style.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
