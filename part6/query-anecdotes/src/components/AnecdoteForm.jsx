import { useQuery, useMutation, useQueryClient  } from '@tanstack/react-query'
import { getAnecdotes, createAnecdotes } from '../requests'
import { useNotification } from '../NotificationContext'

const AnecdoteForm = () => {

  const { notificationDispatch } = useNotification()

  const queryClient = useQueryClient()
  const newNoteMutation = useMutation({
    mutationFn: createAnecdotes,
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], anecdotes.concat(newAnecdote))
      notificationDispatch({ type: 'SHOW_NOTIFICATION', payload: 'Anécdota agregada correctamente' });
    },
    onError: (error) => {
      notificationDispatch({ type: 'SHOW_NOTIFICATION', payload: 'Error: la anécdota debe tener al menos 5 caracteres' });
    },
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newNoteMutation.mutate({ content, votes: 0 })
    console.log('new anecdote')
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
