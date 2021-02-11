export const inventory = (state = [], action) => {
    switch (action.type) {
      case 'SET_INVENTORY':
        return action.payload;
      default:
        return state;
    }
  };

  export const discDetails = (state = [], action) => {
    switch (action.type) {
      case 'SET_DISC_DETAIL':
        return [action.payload];
      default:
        return state;
    }
  };
  