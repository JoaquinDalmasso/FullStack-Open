import { useEffect } from 'react'
import { useNotification } from '../NotificationContext'

const Notification = () => {
  const { state, notificationDispatch } = useNotification();

  useEffect(() => {
    const timer = setTimeout(() => {
      notificationDispatch({ type: 'HIDE_NOTIFICATION' })
    }, 5000)

    return () => clearTimeout(timer)
  }, [state.notification, notificationDispatch])

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  };
  
  if (!state.notification) return null

  return (
    <div style={style}>
      {state.notification}
    </div>
  );
};

export default Notification;
