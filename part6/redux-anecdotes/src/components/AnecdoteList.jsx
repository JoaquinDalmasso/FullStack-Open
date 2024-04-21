import { useDispatch, useSelector } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'

const Anecdote = () => {
    const dispatch = useDispatch()
    const anecdotes = useSelector(state => state)

    const voteAnecdote = (id) => {
        console.log('vote', id)
        dispatch(vote(id))
      }
    return(
        <div>
            {anecdotes.sort(function (a,b){
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
                        <button onClick={() => voteAnecdote(anecdote.id)}>vote</button>
                    </div>
                </div>
      )}
        </div>
    )
}

export default Anecdote