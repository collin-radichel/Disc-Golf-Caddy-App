import {discDetails} from './inventory.reducer'

describe("testing inventory reducer", () => {

    // SET_DISC_DETAIL
    test('ACTION SET_DISC_DETAIL', () => {
        const initialState = {};
        const action = {
            type: 'SET_DISC_DETAIL',
            payload: {stuff: 'stuff', moreStuff: 'moreStuff', evenMoreStuff: 'evenMoreStuff'}};
        expect(discDetails(initialState, action)).toEqual(action.payload);
      });

    // SET_EDIT_INPUTS
    test("ACTION SET_EDIT_INPUTS", () => {
        const initialState = {''};
        const action = { type: "SET_EDIT_INPUTS", payload: {  } };
        expect(discDetails(initialState, action)).toEqual({  });
      });

    // // EDIT_FLIGHT_PATTERN
    // test("ACTION EDIT_FLIGHT_PATTERN", () => {
    //     const initialState = { username: "asdf" };
    //     const action = { type: "SET_USER", payload: { username: "asdf" } };
    //     expect(userReducer(initialState, action)).toEqual({ username: "asdf" });
    //   });

    // // EDIT_CONDITION
    // test("ACTION EDIT_CONDITION", () => {
    //     const initialState = { username: "asdf" };
    //     const action = { type: "SET_USER", payload: { username: "asdf" } };
    //     expect(userReducer(initialState, action)).toEqual({ username: "asdf" });
    //   });
});