import { put, takeLatest } from "redux-saga/effects";
import axios from "axios";


function* getDiscSuggestion(action) {
    try {
        yield put({type : "SET_DISC_SUGGESTION", payload: action.payload});
    } catch (error) {
        console.log(`error in getting disc suggestion ${error}`)
    }
}




function* discSuggestion() {
    yield takeLatest("GET_DISC_SUGGESTION", getDiscSuggestion)
}


export default discSuggestion;