import deepFreeze from 'deep-freeze'
import counterReducer from './anecdoteReducer'

describe('anecdote reducer', () => {
      

const initialState = [
    {content: 'If it hurts, do it more often', 
    id: '75831', 
    votes: 0},
    {content: 'Premature optimization is the root of all evil.', 
    id: '71296', 
    votes: 0}
]

  test('vote incremented', () => {
    const action = {
      type: 'anecdotes/vote',
      payload: '71296'
    }
    const state = initialState
    console.log(state)
    deepFreeze(state)
    const newState = counterReducer(state, action)
    console.log(newState)
    expect(newState).toEqual([
        {content: 'If it hurts, do it more often', 
        id: '75831', 
        votes: 0},
        {content: 'Premature optimization is the root of all evil.', 
        id: '71296', 
        votes: 1}
    ])
  })
})