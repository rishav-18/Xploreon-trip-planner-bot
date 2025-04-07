
// This is a utility file for chat functionality
// In a real implementation, this would connect to a backend service
// For now, we're simulating AI responses

const API_KEY = 'AIzaSyC5OadDkDs5m_hewvpFkAi8xDPCyXf1hSs';

interface Message {
  text: string;
  isUser: boolean;
}

// Track the state of the conversation
let conversationState: {
  destination?: string;
  dates?: {
    start?: string;
    end?: string;
  };
  budget?: string;
  preferences?: string[];
  hasAskedDestination: boolean;
  hasAskedDates: boolean;
  hasAskedBudget: boolean;
  hasAskedPreferences: boolean;
  itineraryGenerated: boolean;
} = {
  hasAskedDestination: false,
  hasAskedDates: false,
  hasAskedBudget: false,
  hasAskedPreferences: false,
  itineraryGenerated: false
};

// Process user input and generate responses
export const processUserInput = async (
  userMessage: string,
  messages: Message[]
): Promise<string> => {
  // In a real implementation, we would send the user message to an AI API
  // For now, we'll simulate the conversation flow
  
  // Extract information from user message based on current conversation state
  if (!conversationState.destination && !conversationState.hasAskedDestination) {
    conversationState.destination = userMessage;
    conversationState.hasAskedDestination = true;
    return `Great! I see you want to visit ${userMessage}. When are you planning to go? Please provide your travel dates (e.g., "June 15-22, 2023").`;
  }
  
  if (!conversationState.dates && conversationState.hasAskedDestination && !conversationState.hasAskedDates) {
    // Simple date extraction for demo purposes
    conversationState.dates = {
      start: "extracted start date",
      end: "extracted end date"
    };
    conversationState.hasAskedDates = true;
    return `Perfect! Now, what's your budget for this trip? (e.g., "$1000", "Budget friendly", "Luxury")`;
  }
  
  if (!conversationState.budget && conversationState.hasAskedDates && !conversationState.hasAskedBudget) {
    conversationState.budget = userMessage;
    conversationState.hasAskedBudget = true;
    return `Got it. What kind of activities or experiences are you interested in? (e.g., "Outdoor adventures", "Cultural experiences", "Relaxation", "Food tourism")`;
  }
  
  if (!conversationState.preferences && conversationState.hasAskedBudget && !conversationState.hasAskedPreferences) {
    conversationState.preferences = [userMessage];
    conversationState.hasAskedPreferences = true;
    
    // Simulate generating an itinerary with a delay
    return await generateItinerary();
  }
  
  // Handle follow-up questions after the itinerary is provided
  if (conversationState.itineraryGenerated) {
    if (userMessage.toLowerCase().includes('thank')) {
      return "You're welcome! Enjoy your trip to " + conversationState.destination + ". If you have more questions or need adjustments to your itinerary, just let me know!";
    }
    
    if (userMessage.toLowerCase().includes('change') || 
        userMessage.toLowerCase().includes('modify') ||
        userMessage.toLowerCase().includes('different')) {
      return "Of course! I'd be happy to modify the itinerary. What specific changes would you like to make? You can tell me what activities you want to add or remove, or if you'd like to focus more on certain aspects of your trip.";
    }
    
    if (userMessage.toLowerCase().includes('accommodation') || 
        userMessage.toLowerCase().includes('hotel') || 
        userMessage.toLowerCase().includes('stay')) {
      return "I can provide more detailed accommodation recommendations. What's your preferred type of accommodation (hotel, resort, hostel, Airbnb), and do you have any specific requirements or preferences for your stay?";
    }
    
    // Default response for other questions
    return "I'd be happy to help with that. Could you provide more details about what you're looking for?";
  }
  
  // Default response if the conversation flow doesn't match any expected pattern
  return "I'm sorry, I didn't quite understand. Could you please rephrase that?";
};

// Generate a mock itinerary
const generateItinerary = async (): Promise<string> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  conversationState.itineraryGenerated = true;
  
  const destination = conversationState.destination || "your destination";
  const budget = conversationState.budget || "your specified budget";
  
  return `
Based on your preferences, here's a personalized 5-day itinerary for ${destination}:

✈️ **DAY 1: ARRIVAL & ORIENTATION**
* Morning: Arrival and check-in at accommodation
* Afternoon: Orientation walk around the city center
* Evening: Welcome dinner at a local restaurant ($30-50)

🏛️ **DAY 2: CULTURAL EXPLORATION**
* Morning: Visit to main historical sites and museums
* Lunch: Local street food experience ($10-15)
* Afternoon: Guided cultural tour
* Evening: Dinner with traditional entertainment ($40-60)

🌄 **DAY 3: OUTDOOR ADVENTURES**
* Morning: Hiking/nature excursion to nearby natural attractions
* Packed lunch during excursion ($10)
* Afternoon: Continue exploration or relaxation time
* Evening: Casual dining with sunset views ($25-40)

🛍️ **DAY 4: LOCAL EXPERIENCES**
* Morning: Local market visit and shopping
* Lunch: Food tour with tastings ($20-30)
* Afternoon: Workshop or cooking class
* Evening: Dinner at recommended local favorite ($30-50)

🏝️ **DAY 5: RELAXATION & DEPARTURE**
* Morning: Free time for last-minute activities
* Lunch: Light meal before departure ($15-25)
* Afternoon: Departure

**ACCOMMODATIONS:**
Based on your ${budget} budget, I recommend:
* Mid-range hotel in the city center: $80-120/night
* Boutique guesthouse with character: $60-90/night
* Budget-friendly hostel or shared accommodation: $30-50/night

**TRANSPORTATION:**
* Airport to city center: $20-35 one way
* Local transportation: $5-15 per day

**TOTAL BUDGET ESTIMATE:** $650-950 per person (excluding flights)

Would you like me to adjust any part of this itinerary or provide more specific recommendations for any day?
`;
};
