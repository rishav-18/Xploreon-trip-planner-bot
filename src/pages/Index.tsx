
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import ChatInterface from '@/components/ChatInterface';
import Footer from '@/components/Footer';
import { ArrowDown, Calendar, MapPin, MessageCircle } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        <Hero />
        
        {/* How It Works Section */}
        <section className="py-16 md:py-24 bg-white" id="how-it-works">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Our AI-powered platform makes trip planning effortless in just a few simple steps
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="bg-travel-light rounded-xl p-8 text-center relative">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-travel-blue text-white h-8 w-8 rounded-full flex items-center justify-center">
                  1
                </div>
                <MapPin className="h-12 w-12 text-travel-blue mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Tell Us Your Destination</h3>
                <p className="text-gray-600">Share where you want to go and when you're planning to travel.</p>
              </div>
              
              <div className="bg-travel-light rounded-xl p-8 text-center relative">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-travel-blue text-white h-8 w-8 rounded-full flex items-center justify-center">
                  2
                </div>
                <Calendar className="h-12 w-12 text-travel-blue mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Set Your Preferences</h3>
                <p className="text-gray-600">Tell us your budget and what kinds of activities you enjoy.</p>
              </div>
              
              <div className="bg-travel-light rounded-xl p-8 text-center relative">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-travel-blue text-white h-8 w-8 rounded-full flex items-center justify-center">
                  3
                </div>
                <MessageCircle className="h-12 w-12 text-travel-blue mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Get Your Itinerary</h3>
                <p className="text-gray-600">Receive a personalized travel plan with activities and recommendations.</p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Testimonials Section */}
        <section className="py-16 md:py-24 bg-travel-light" id="testimonials">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">What Travelers Say</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Hear from travelers who have used our AI planner to create their perfect trips
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white rounded-xl shadow-md p-6">
                <div className="flex items-center mb-4">
                  <div className="h-12 w-12 rounded-full bg-travel-teal flex items-center justify-center text-white font-bold text-lg mr-4">
                    RL
                  </div>
                  <div>
                    <h4 className="font-semibold">Rachel L.</h4>
                    <p className="text-gray-500 text-sm">Paris, France Trip</p>
                  </div>
                </div>
                <p className="text-gray-600 italic">
                  "I was feeling overwhelmed planning my Paris trip, but this AI planner made it so easy! 
                  The restaurant recommendations were spot-on and saved me hours of research."
                </p>
              </div>
              
              <div className="bg-white rounded-xl shadow-md p-6">
                <div className="flex items-center mb-4">
                  <div className="h-12 w-12 rounded-full bg-travel-blue flex items-center justify-center text-white font-bold text-lg mr-4">
                    MK
                  </div>
                  <div>
                    <h4 className="font-semibold">Michael K.</h4>
                    <p className="text-gray-500 text-sm">Tokyo, Japan Trip</p>
                  </div>
                </div>
                <p className="text-gray-600 italic">
                  "As a budget traveler, I was impressed with how the AI found affordable options that didn't 
                  sacrifice the experience. My Tokyo trip was amazing and under budget!"
                </p>
              </div>
              
              <div className="bg-white rounded-xl shadow-md p-6">
                <div className="flex items-center mb-4">
                  <div className="h-12 w-12 rounded-full bg-travel-accent flex items-center justify-center text-white font-bold text-lg mr-4">
                    JS
                  </div>
                  <div>
                    <h4 className="font-semibold">Jennifer S.</h4>
                    <p className="text-gray-500 text-sm">Costa Rica Adventure</p>
                  </div>
                </div>
                <p className="text-gray-600 italic">
                  "The custom itinerary balanced adventure activities with relaxation time perfectly. 
                  It felt like having a travel agent who really understood what I wanted!"
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Chat Bot Section */}
        <section id="chatbot-container" className="py-16 md:py-24 bg-gradient-to-b from-white to-travel-light">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Plan Your Trip Now</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Chat with our AI travel assistant and get a personalized itinerary in minutes
              </p>
              <div className="flex justify-center mt-6">
                <ArrowDown className="h-8 w-8 text-travel-blue animate-bounce" />
              </div>
            </div>
            
            <div className="max-w-4xl mx-auto">
              <ChatInterface />
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
