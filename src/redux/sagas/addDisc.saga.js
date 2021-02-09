import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';


function* fetchDiscTypes() {
    try {
        const response = yield axios.get("/api/discType");
        yield put({ type: "SET_DISC_TYPES", payload: response.data });
      } catch (err) {
        console.log(`error in fetching disc types ${err}`);
      }
}


function* addDiscSaga() {
    yield takeLatest("FETCH_DISC_TYPES", fetchDiscTypes)
}

export default addDiscSaga;