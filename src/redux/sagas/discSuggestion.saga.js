import { put, takeLatest } from "redux-saga/effects";
import axios from "axios";


function* getDiscSuggestion() {
    try {
        const response = yield axios.get(`/api/discSuggestion`);
        yield put({type : "SET_DISC_SUGGESTION", payload: response.data});
    } catch (error) {
        console.log(`error in getting disc suggestion ${error}`)
    }
}




function* discSuggestion() {
    yield takeLatest("GET_DISC_SUGGESTION", getDiscSuggestion)
}


export default discSuggestion;