import { useDispatch, useSelector } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const Anecdote = () => {
    const dispatch = useDispatch()
    const anecdotes = useSelector(state => {
        if ( state.filter === '' ) {
            return state.anecdotes
        }
        return state.anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(state.filter.toLowerCase()))
    })
 
    const voteAnecdote = (anecdote) => {
        console.log('vote', anecdote.id)
        dispatch(vote(anecdote.id))
        dispatch(setNotification(`You voted for '${anecdote.content}'`, 5))
      }
    return(
        <div>
            {[...anecdotes].sort(function (a,b){
                if(a.votes > b.votes){
                    return -1;
                }
                if (a.livoteskes<b.votes){
                    return 1;
                }
                return 0}).map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => voteAnecdote(anecdote)}>vote</button>
                    </div>
                </div>
      )}
        </div>
    )
}

export default Anecdote