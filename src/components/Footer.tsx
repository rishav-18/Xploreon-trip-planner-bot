
import { Github, Mail, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-travel-dark text-white pt-12 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <a href="/" className="text-2xl font-bold flex items-center mb-4">
              <span className="text-travel-teal">Savvy</span>
              <span className="text-white">Trip</span>
            </a>
            <p className="text-gray-300 mb-6 max-w-md">
              AI-powered trip planning to help you create unforgettable travel experiences
              tailored to your preferences, budget, and interests.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Github size={20} />
              </a>
              <a href="mailto:info@savvytrip.ai" className="text-gray-300 hover:text-white transition-colors">
                <Mail size={20} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 border-b border-gray-700 pb-2">Features</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Trip Planning</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Itinerary Creation</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Budget Management</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Local Recommendations</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 border-b border-gray-700 pb-2">Company</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">About Us</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Terms of Service</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-10 pt-6 text-center text-gray-400 text-sm">
          <p>© {new Date().getFullYear()} SavvyTrip. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
