import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery, useMutation, useQueryClient  } from '@tanstack/react-query'
import { getAnecdotes, updateAnecdote} from './requests'
import { useNotification } from './NotificationContext'

const App = () => {
  const queryClient = useQueryClient()
  const { notificationDispatch } = useNotification()

  const updateAnecdoteMutation = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
      notificationDispatch({ type: 'SHOW_NOTIFICATION', payload: 'Anécdota actualizada' })
    },
  })

  const handleVote = (anecdote) => {
    updateAnecdoteMutation.mutate({...anecdote, votes: anecdote.votes += 1  })
    notificationDispatch({ type: 'SHOW_NOTIFICATION', payload: 'Votaste por una anécdota' })
  }

  const result = useQuery(
    {
      queryKey: ['anecdotes'],
      queryFn: getAnecdotes,
      retry: 1
    }
  )

  if ( result.isLoading ) {
    return <div>loading data...</div>
  }

  if (result.isPending) {
    return <span>Loading...</span>
  }

  if (result.isError) {
    return <span>Error: {result.error.message}</span>
  }
  
  const anecdotes = result.data

  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
    
      {anecdotes.map( anecdote=>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
