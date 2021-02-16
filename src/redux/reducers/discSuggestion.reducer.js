export const discSuggestion = (state = [], action) => {
    switch (action.type) {
      case 'SET_DISC_SUGGESTION':
        return action.payload;
      default:
        return state;
    }
  };