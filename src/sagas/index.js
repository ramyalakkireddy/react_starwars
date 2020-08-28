import { call, put, takeLatest, all } from 'redux-saga/effects';
import { GET_CHARACTERS, GET_CHARACTERS_ERROR, GET_CHARACTERS_SUCCESS,
GET_MOVIES, GET_MOVIES_SUCCESS, GET_MOVIES_ERROR } from '../actions';

let data = {};

function* fetchCharacters() {
  try {
    const endpoint = 'https://swapi.dev/api/people/';
    const response = yield call(fetch, endpoint);
    data = yield call([response, 'json']);
    yield put({ type: GET_CHARACTERS_SUCCESS, characterList: data.results });
  }
  catch (e) {
    yield put({ type: GET_CHARACTERS_ERROR, error: e.message });
  }
}

function* fetchMovies(payload) {
  if ((data.results !== undefined) && data.results.length > 0) {
    const selectedCharacter = data.results.filter((character) => character.name === payload.data.characterName);
    const filterMovies = selectedCharacter[0].films;
    if (filterMovies.length > 0) {
      let newArray = [];
      for (let movie of filterMovies) {
        try {
          const response = yield call(fetch, movie);
          const result = yield call([response, 'json']);
          newArray.push(result);
          yield put({ type: GET_MOVIES_SUCCESS, moviesList: [...newArray] });
        } catch (e) {
          yield put({ type: GET_MOVIES_ERROR, error: e.message });
          }
        }
      }
    }
  }

function* actionWatcher() {
  yield takeLatest(GET_CHARACTERS, fetchCharacters);
  yield takeLatest(GET_MOVIES, fetchMovies);
}

export default function* rootSaga() {
  yield all([actionWatcher()]);
}
