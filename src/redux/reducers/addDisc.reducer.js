export const discTypes = (state = [], action) => {
    switch (action.type) {
      case 'SET_DISC_TYPES':
        return action.payload;
      default:
        return state;
    }
  };

 export const discDistances = (state = [], action) => {
    switch (action.type) {
      case 'SET_DISC_DISTANCES':
        return action.payload;
      default:
        return state;
    }
  };

 export const discFlightPatterns = (state = [], action) => {
    switch (action.type) {
      case "SET_DISC_FLIGHT_PATTERNS":
        return action.payload;
      default:
        return state;
    }
  };
