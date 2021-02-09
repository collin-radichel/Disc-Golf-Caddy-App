const discTypes = (state = [], action) => {
    switch (action.type) {
      case 'SET_DISC_TYPES':
        return action.payload;
      default:
        return state;
    }
  };
  
  // user will be on the redux state at:
  // state.user
  export default discTypes;