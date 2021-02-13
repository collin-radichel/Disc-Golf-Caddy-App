export const inventory = (state = [], action) => {
    switch (action.type) {
      case 'SET_INVENTORY':
        return action.payload;
      default:
        return state;
    }
  };

  export const discDetails = (state = {}, action) => {
    switch (action.type) {
      case 'SET_DISC_DETAIL':
        return action.payload;
      case 'SET_EDIT_INPUTS':
        return {...state, [action.payload.key]: action.payload.event}
      case 'EDIT_FLIGHT_PATTERN':
        return {...state, flight_pattern_id: action.payload}
      case 'EDIT_CONDITION':
        return {...state, condition: action.payload}
      default:
        return state;
    }
  };