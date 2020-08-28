import * as actions from '../actions/index'

describe('ACTIONS', () => {
   it('should create an action with correct type', () => {
      const expectedAction = {
              type: 'GET_CHARACTERS'
             }
      expect(actions.getCharacters()).toEqual(expectedAction)
  });

  it('should create an action with correct type', () => {
     const expectedAction = {
             type: 'GET_MOVIES',
             data: {
               characterName: "Luke"
             }
            }
     expect(actions.getMovies("Luke")).toEqual(expectedAction)
 });
})
