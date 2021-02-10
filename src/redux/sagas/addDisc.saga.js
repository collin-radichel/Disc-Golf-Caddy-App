import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* fetchDiscTypes() {
    try {
        const response = yield axios.get("/api/discInfoDropdowns/types");
        yield put({ type: "SET_DISC_TYPES", payload: response.data });
      } catch (err) {
        console.log(`error in fetching disc types ${err}`);
      }
}

function* fetchDiscDistances() {
    try {
        const response = yield axios.get("/api/discInfoDropdowns/distances");
        yield put({ type: "SET_DISC_DISTANCES", payload: response.data });
      } catch (err) {
        console.log(`error in fetching disc distances ${err}`);
      }
}

function* fetchFlightPatterns() {
  try {
      const response = yield axios.get("/api/discInfoDropdowns/flightPatterns");
      yield put({ type: "SET_DISC_FLIGHT_PATTERNS", payload: response.data });
    } catch (err) {
      console.log(`error in fetching disc flight patterns ${err}`);
    }
}



function* addDiscSaga() {
    yield takeLatest("FETCH_DISC_TYPES", fetchDiscTypes);
    yield takeLatest("FETCH_DISC_DISTANCES", fetchDiscDistances);
    yield takeLatest("FETCH_DISC_FLIGHT_PATTERNS", fetchFlightPatterns);
}

export default addDiscSaga;