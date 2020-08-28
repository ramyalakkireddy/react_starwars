export const GET_CHARACTERS = 'GET_CHARACTERS';
export const GET_CHARACTERS_SUCCESS = 'GET_CHARACTERS_SUCCESS';
export const GET_CHARACTERS_ERROR = 'GET_CHARACTERS_ERROR';

export const GET_MOVIES = 'GET_MOVIES';
export const GET_MOVIES_SUCCESS = 'GET_MOVIES_SUCCESS';
export const GET_MOVIES_ERROR = 'GET_MOVIES_ERROR';

export function getCharacters() {
  return {
    type: GET_CHARACTERS
  };
}

export function getMovies(characterName) {
  return {
    type: GET_MOVIES,
    data: {
      characterName
    }
  };
}
