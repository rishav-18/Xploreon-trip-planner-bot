
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

// This is a simplified approach - in a real app, we would use a proper geocoding API
// The isValidLocation function now uses a more permissive approach to avoid false negatives
const isValidLocation = (location: string): boolean => {
  if (!location || typeof location !== 'string' || location.trim().length < 2) {
    return false;
  }
  
  const normalizedInput = location.toLowerCase().trim();
  
  // For this demo, we'll assume most inputs are valid locations
  // But reject obviously invalid inputs like single letters, numbers, or special characters
  const invalidPatterns = [
    /^[0-9]+$/, // just numbers
    /^[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+$/, // just special characters
    /^[a-z]$/ // single letter
  ];
  
  for (const pattern of invalidPatterns) {
    if (pattern.test(normalizedInput)) {
      return false;
    }
  }
  
  // Filter out common non-location inputs
  const nonLocationKeywords = [
    'hello', 'hi', 'hey', 'test', 'help', 'what', 'how', 'why', 'when', 'who', 
    'where', 'which', 'yes', 'no', 'maybe', 'ok', 'okay', 'thanks', 'thank', 
    'please', 'sorry', 'excuse', 'good', 'bad', 'hello', 'bye'
  ];
  
  if (nonLocationKeywords.includes(normalizedInput)) {
    return false;
  }
  
  return true;
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
  processingUserQuery: boolean;
} = {
  hasAskedDestination: false,
  hasAskedDays: false,
  hasAskedDates: false,
  hasAskedBudget: false,
  hasAskedPreferences: false,
  itineraryGenerated: false,
  processingUserQuery: false
};

// Process user input and generate responses
export const processUserInput = async (
  userMessage: string,
  messages: Message[]
): Promise<string> => {
  // If we're processing a follow-up query
  if (conversationState.processingUserQuery) {
    conversationState.processingUserQuery = false;
    
    // This helps break out of potential loops with vague responses
    if (userMessage.length > 5) {
      return `Thanks for providing that information! As your Xploreon travel assistant, I can help you with specific travel plans for ${conversationState.destination || "your destination"}. Would you like me to suggest some activities, accommodations, or transportation options?`;
    }
  }
  
  // Extract information from user message based on current conversation state
  if (!conversationState.destination && !conversationState.hasAskedDestination) {
    const possibleDestination = userMessage.trim();
    
    // Improved validation with better error handling
    if (!isValidLocation(possibleDestination)) {
      conversationState.hasAskedDestination = false; // Allow them to try again
      return "Sorry, I couldn't find that location. Please enter a valid city name like Paris, New York, Tokyo, or Bangkok.";
    }
    
    conversationState.destination = possibleDestination;
    conversationState.hasAskedDestination = true;
    return `Great! I see you want to visit ${possibleDestination}. How many days are you planning to stay?`;
  }

  if (!conversationState.tripDays && conversationState.hasAskedDestination && !conversationState.hasAskedDays) {
    // Extract number of days from the message
    const daysMatch = userMessage.match(/\d+/);
    if (daysMatch) {
      conversationState.tripDays = parseInt(daysMatch[0]);
    } else {
      // If we can't extract a number, ask again
      return "I need to know how many days you plan to stay so I can create a suitable itinerary. Please provide a number (e.g., '5 days').";
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
    
    // Set flag to process next query properly
    conversationState.processingUserQuery = true;
    
    // More specific response for other questions
    return "I can help with that. Could you please provide more specific details about what you're looking for regarding your trip to " + conversationState.destination + "?";
  }
  
  // Default response if the conversation flow doesn't match any expected pattern
  return "I'm sorry, I didn't quite understand. Could you please rephrase that or let me know exactly what you're looking for with your trip planning?";
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

  // Calculate reasonable budget allocations
  const totalBudgetText = budget.match(/[\d,]+/) ? budget.match(/[\d,]+/)?.[0] : "1000";
  const totalBudget = parseInt(totalBudgetText?.replace(/,/g, '') || "1000");
  
  // Adjust for currency (very simplistic - would use real rates in production)
  const dailyBudget = (totalBudget / days);
  const accommodationPerDay = dailyBudget * 0.4; // 40% for accommodation
  const foodPerDay = dailyBudget * 0.3; // 30% for food
  const activitiesPerDay = dailyBudget * 0.2; // 20% for activities
  const transportPerDay = dailyBudget * 0.1; // 10% for transport

  // Add destination image suggestion (in a real app, this would be an API call)
  itinerary += `![Beautiful view of ${destination}](https://source.unsplash.com/featured/?${encodeURIComponent(destination)},travel)\n\n`;

  // Generate itinerary for each day
  for (let day = 1; day <= days; day++) {
    let dayActivities;
    
    if (day === 1) {
      dayActivities = `✈️ **DAY 1: ARRIVAL & ORIENTATION**
* Morning: Arrival and check-in at accommodation (${currencySymbol}${Math.round(accommodationPerDay)})
* Afternoon: Orientation walk around the city center
* Evening: Welcome dinner at a local restaurant (${currencySymbol}${Math.round(foodPerDay * 0.4)})
* Daily budget allocation: ${currencySymbol}${Math.round(dailyBudget)}`;
    } else if (day === days) {
      dayActivities = `🏝️ **DAY ${day}: RELAXATION & DEPARTURE**
* Morning: Free time for last-minute activities
* Lunch: Light meal before departure (${currencySymbol}${Math.round(foodPerDay * 0.3)})
* Afternoon: Departure
* Daily budget allocation: ${currencySymbol}${Math.round(dailyBudget)}`;
    } else {
      // For middle days, rotate between different types of activities
      const dayTypes = [
        {
          emoji: "🏛️",
          title: "CULTURAL EXPLORATION",
          activities: `* Morning: Visit to main historical sites and museums (${currencySymbol}${Math.round(activitiesPerDay * 0.5)})
* Lunch: Local street food experience (${currencySymbol}${Math.round(foodPerDay * 0.3)})
* Afternoon: Guided cultural tour (${currencySymbol}${Math.round(activitiesPerDay * 0.5)})
* Evening: Dinner with traditional entertainment (${currencySymbol}${Math.round(foodPerDay * 0.7)})
* Daily budget allocation: ${currencySymbol}${Math.round(dailyBudget)}`
        },
        {
          emoji: "🌄",
          title: "OUTDOOR ADVENTURES",
          activities: `* Morning: Hiking/nature excursion to nearby natural attractions (${currencySymbol}${Math.round(activitiesPerDay * 0.4)})
* Packed lunch during excursion (${currencySymbol}${Math.round(foodPerDay * 0.2)})
* Afternoon: Continue exploration or relaxation time
* Evening: Casual dining with sunset views (${currencySymbol}${Math.round(foodPerDay * 0.5)})
* Transportation for the day: (${currencySymbol}${Math.round(transportPerDay)})
* Daily budget allocation: ${currencySymbol}${Math.round(dailyBudget)}`
        },
        {
          emoji: "🛍️",
          title: "LOCAL EXPERIENCES",
          activities: `* Morning: Local market visit and shopping
* Lunch: Food tour with tastings (${currencySymbol}${Math.round(foodPerDay * 0.4)})
* Afternoon: Workshop or cooking class (${currencySymbol}${Math.round(activitiesPerDay * 0.6)})
* Evening: Dinner at recommended local favorite (${currencySymbol}${Math.round(foodPerDay * 0.6)})
* Daily budget allocation: ${currencySymbol}${Math.round(dailyBudget)}`
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
Based on your ${budget} budget for ${days} days:
* Mid-range hotel in the city center: ${currencySymbol}${Math.round(accommodationPerDay)} per night
* Boutique guesthouse with character: ${currencySymbol}${Math.round(accommodationPerDay * 0.8)} per night
* Budget-friendly hostel or shared accommodation: ${currencySymbol}${Math.round(accommodationPerDay * 0.5)} per night

**TRANSPORTATION:**
* Airport to city center: ${currencySymbol}${Math.round(transportPerDay * 2)} one way
* Local transportation: ${currencySymbol}${Math.round(transportPerDay)} per day

**TOTAL BUDGET ESTIMATE:** ${currencySymbol}${Math.round(dailyBudget * days)} for ${days} days

![Another view of ${destination}](https://source.unsplash.com/featured/?${encodeURIComponent(destination)},landmark)

Would you like me to adjust any part of this itinerary or provide more specific recommendations for any day?`;
  
  return itinerary;
};
