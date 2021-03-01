import userReducer from "./user.reducer.js";

describe("testing user reducer", () => {

  // SET_USER
  test("ACTION SET_USER", () => {
    const initialState = { username: "asdf" };
    const action = { type: "SET_USER", payload: { username: "asdf" } };
    expect(userReducer(initialState, action)).toEqual({ username: "asdf" });
  });

  // UNSET_USER
  test("ACTION UNSET_USER", () => {
    const initialState = { username: "asdf" };
    const action = { type: "UNSET_USER" };
    expect(userReducer(initialState, action)).toEqual({});
  });

  // OTHER_ACTION
  test("ACTION OTHER_ACTION", () => {
    const initialState = { username: "asdf" };
    const action = { type: "OTHER" };
    expect(userReducer(initialState, action)).toEqual(initialState);
  });

});
