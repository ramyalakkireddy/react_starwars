import { GET_CHARACTERS, GET_CHARACTERS_ERROR, GET_CHARACTERS_SUCCESS,
GET_MOVIES, GET_MOVIES_SUCCESS, GET_MOVIES_ERROR } from '../actions';

const initialState = {
  characterList: [],
  moviesList: [],
  loading: false,
  error: ''
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_CHARACTERS:
      return {
        ...state,
        loading: true,
        error: ''
      };
    case GET_CHARACTERS_SUCCESS:
      return {
        ...state,
        characterList: action.characterList,
        loading: false
      };
    case GET_CHARACTERS_ERROR:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    case GET_MOVIES:
      return {
        ...state,
        loading: true,
        error: ''
      };
    case GET_MOVIES_SUCCESS:
      return {
        ...state,
        moviesList: action.moviesList,
        loading: false
      };
    case GET_MOVIES_ERROR:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    default:
      return state;
    }
}
