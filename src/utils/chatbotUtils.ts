
// This is a utility file for chat functionality

const API_KEY = 'AIzaSyC5OadDkDs5m_hewvpFkAi8xDPCyXf1hSs';

interface Message {
  text: string;
  isUser: boolean;
}

// Supported currency symbols for reference
const currencySymbols: Record<string, string> = {
  USD: '$',
  EUR: '€',
  GBP: '£',
  JPY: '¥',
  INR: '₹',
  AUD: 'A$',
  CAD: 'C$',
  CHF: 'CHF',
  CNY: '¥',
  HKD: 'HK$',
  NZD: 'NZ$',
  SEK: 'kr',
  KRW: '₩',
  SGD: 'S$',
  NOK: 'kr',
  MXN: 'Mex$',
  BRL: 'R$',
  RUB: '₽',
  ZAR: 'R',
  TRY: '₺',
};

// Track the state of the conversation
let conversationState: {
  destination?: string;
  tripDays?: number;
  dates?: {
    start?: string;
    end?: string;
  };
  budget?: string;
  currency?: string;
  preferences?: string[];
  hasAskedDestination: boolean;
  hasAskedDays: boolean;
  hasAskedDates: boolean;
  hasAskedBudget: boolean;
  hasAskedPreferences: boolean;
  itineraryGenerated: boolean;
} = {
  hasAskedDestination: false,
  hasAskedDays: false,
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
    return `Great! I see you want to visit ${userMessage}. How many days are you planning to stay?`;
  }

  if (!conversationState.tripDays && conversationState.hasAskedDestination && !conversationState.hasAskedDays) {
    // Extract number of days from the message
    const daysMatch = userMessage.match(/\d+/);
    if (daysMatch) {
      conversationState.tripDays = parseInt(daysMatch[0]);
    } else {
      conversationState.tripDays = 5; // Default if we can't extract a number
    }
    conversationState.hasAskedDays = true;
    return `Perfect! ${conversationState.tripDays} days in ${conversationState.destination} sounds great. When are you planning to go? Please provide your travel dates (e.g., "June 15-22, 2023").`;
  }
  
  if (!conversationState.dates && conversationState.hasAskedDays && !conversationState.hasAskedDates) {
    // Simple date extraction for demo purposes
    conversationState.dates = {
      start: "extracted start date",
      end: "extracted end date"
    };
    conversationState.hasAskedDates = true;
    return `Got it. Now, what's your budget for this trip? Please include the currency (e.g., "$1000 USD", "€2000 EUR", "₹50000 INR", etc.)`;
  }
  
  if (!conversationState.budget && conversationState.hasAskedDates && !conversationState.hasAskedBudget) {
    // Extract budget and currency
    const budgetInfo = userMessage;
    
    // Try to detect currency from common symbols or codes
    let detectedCurrency = "USD"; // Default
    
    Object.entries(currencySymbols).forEach(([code, symbol]) => {
      if (budgetInfo.includes(symbol) || budgetInfo.toUpperCase().includes(code)) {
        detectedCurrency = code;
      }
    });
    
    conversationState.budget = budgetInfo;
    conversationState.currency = detectedCurrency;
    conversationState.hasAskedBudget = true;
    
    return `Thank you! What kind of activities or experiences are you interested in? (e.g., "Outdoor adventures", "Cultural experiences", "Relaxation", "Food tourism")`;
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

// Generate a personalized itinerary based on user preferences
const generateItinerary = async (): Promise<string> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  conversationState.itineraryGenerated = true;
  
  const destination = conversationState.destination || "your destination";
  const budget = conversationState.budget || "your specified budget";
  const days = conversationState.tripDays || 5;
  const currency = conversationState.currency || "USD";
  const currencySymbol = currencySymbols[currency] || currencySymbols.USD;
  
  // Generate a dynamic itinerary based on the number of days
  let itinerary = `
Based on your preferences, here's a personalized ${days}-day itinerary for ${destination}:

`;

  // Generate itinerary for each day
  for (let day = 1; day <= days; day++) {
    let dayActivities;
    
    if (day === 1) {
      dayActivities = `✈️ **DAY 1: ARRIVAL & ORIENTATION**
* Morning: Arrival and check-in at accommodation
* Afternoon: Orientation walk around the city center
* Evening: Welcome dinner at a local restaurant (${currencySymbol}30-50)`;
    } else if (day === days) {
      dayActivities = `🏝️ **DAY ${day}: RELAXATION & DEPARTURE**
* Morning: Free time for last-minute activities
* Lunch: Light meal before departure (${currencySymbol}15-25)
* Afternoon: Departure`;
    } else {
      // For middle days, rotate between different types of activities
      const dayTypes = [
        {
          emoji: "🏛️",
          title: "CULTURAL EXPLORATION",
          activities: `* Morning: Visit to main historical sites and museums
* Lunch: Local street food experience (${currencySymbol}10-15)
* Afternoon: Guided cultural tour
* Evening: Dinner with traditional entertainment (${currencySymbol}40-60)`
        },
        {
          emoji: "🌄",
          title: "OUTDOOR ADVENTURES",
          activities: `* Morning: Hiking/nature excursion to nearby natural attractions
* Packed lunch during excursion (${currencySymbol}10)
* Afternoon: Continue exploration or relaxation time
* Evening: Casual dining with sunset views (${currencySymbol}25-40)`
        },
        {
          emoji: "🛍️",
          title: "LOCAL EXPERIENCES",
          activities: `* Morning: Local market visit and shopping
* Lunch: Food tour with tastings (${currencySymbol}20-30)
* Afternoon: Workshop or cooking class
* Evening: Dinner at recommended local favorite (${currencySymbol}30-50)`
        }
      ];
      
      const dayType = dayTypes[(day - 2) % dayTypes.length];
      dayActivities = `${dayType.emoji} **DAY ${day}: ${dayType.title}**
${dayType.activities}`;
    }
    
    itinerary += dayActivities + "\n\n";
  }
  
  // Add accommodation and budget information
  itinerary += `**ACCOMMODATIONS:**
Based on your ${budget} budget, I recommend:
* Mid-range hotel in the city center: ${currencySymbol}80-120/night
* Boutique guesthouse with character: ${currencySymbol}60-90/night
* Budget-friendly hostel or shared accommodation: ${currencySymbol}30-50/night

**TRANSPORTATION:**
* Airport to city center: ${currencySymbol}20-35 one way
* Local transportation: ${currencySymbol}5-15 per day

**TOTAL BUDGET ESTIMATE:** ${currencySymbol}${650 + (days - 5) * 100}-${950 + (days - 5) * 150} per person (excluding flights)

Would you like me to adjust any part of this itinerary or provide more specific recommendations for any day?`;
  
  return itinerary;
};
