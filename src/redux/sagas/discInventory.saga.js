import { put, takeLatest } from "redux-saga/effects";
import axios from "axios";


function* postDisc(action) {
  try {
    console.log("postDisc started with action:", action);
    const newDisc = action.payload;
    yield axios.post("/api/addDisc", newDisc);
    // yield put({ type: "FETCH_DISCS" });
  } catch (error) {
    console.log("error in postDisc function", error);
  }
}


function* fetchInventory() {
    try {
        const response = yield axios.get("/api/inventory");
        yield put({ type: "SET_INVENTORY", payload: response.data });
      } catch (err) {
        console.log(`error in fetching inventory ${err}`);
      }
}

function* updateInMyBag(action) {
    try {
        yield axios.put(`/api/inventory/${action.payload}`);
        yield put({ type: "FETCH_INVENTORY"});
      } catch (err) {
        console.log(`error in update in my bag ${err}`);
      }
}


function* discInventorySaga() {
  yield takeLatest("POST_DISC", postDisc);
  yield takeLatest("FETCH_INVENTORY", fetchInventory);
  yield takeLatest("UPDATE_IN_MY_BAG", updateInMyBag);
}

export default discInventorySaga;
