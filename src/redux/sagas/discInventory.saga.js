import { put, takeLatest } from "redux-saga/effects";
import axios from "axios";

// GET

function* fetchInventory() {
    try {
        const response = yield axios.get("/api/inventory");
        yield put({ type: "SET_INVENTORY", payload: response.data });
      } catch (err) {
        console.log(`error in fetching inventory ${err}`);
      }
}

function* fetchDiscDetails(action) {
    try {
      // console.log('action.payload', action.payload)
        const response = yield axios.get(`/api/discDetails/${action.payload}`);
        console.log("response.data[0]", response.data[0]);
        yield put({ type: "SET_DISC_DETAIL", payload: response.data[0] });
      } catch (err) {
        console.log(`error in fetching Disc Details ${err}`);
      }
}

//POST

function* postDisc(action) {
  try {
    console.log("postDisc started with action:", action);
    const newDisc = action.payload;
    yield axios.post("/api/addDisc", newDisc);
    yield put({ type: "FETCH_INVENTORY" });
  } catch (error) {
    console.log("error in postDisc function", error);
  }
}

//PUT

function* updateInMyBag(action) {
    try {
        yield axios.put(`/api/inventory/${action.payload}`);
        yield put({ type: "FETCH_INVENTORY"});
      } catch (err) {
        console.log(`error in update in my bag ${err}`);
      }
}

function* saveEditDisc(action) {
  console.log('action:',action)
    yield axios.put(`/api/discDetails/${action.payload.id}`, action.payload)
    yield put({type: "FETCH_DISC_DETAILS", payload: action.payload.id})
}

function* deleteDisc(action) {
  try {
    const discID = action.payload.id;
    console.log('removing disc with id:', discID);
    console.log('******** payload: ', discID);
    yield axios.delete(`/api/inventory/${discID}`);
    yield put({type: 'FETCH_INVENTORY'});
} catch (err) {
    console.log(`error in removing disc: ${err}`);
}
}

// WATCH

function* discInventorySaga() {
  yield takeLatest("POST_DISC", postDisc);
  yield takeLatest("FETCH_INVENTORY", fetchInventory);
  yield takeLatest("UPDATE_IN_MY_BAG", updateInMyBag);
  yield takeLatest("FETCH_DISC_DETAILS", fetchDiscDetails);
  yield takeLatest("SAVE_EDIT_DISC", saveEditDisc);
  yield takeLatest("DELETE_DISC", deleteDisc);
}

export default discInventorySaga;
