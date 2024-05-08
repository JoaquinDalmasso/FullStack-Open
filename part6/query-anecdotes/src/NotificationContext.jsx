import { createContext, useReducer, useContext } from 'react';

// Definir el contexto
const NotificationContext = createContext();

// Definir el estado inicial
const initialState = {
  notification: null,
};

// Definir el reducer
const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'SHOW_NOTIFICATION':
      return { ...state, notification: action.payload };
    case 'HIDE_NOTIFICATION':
      return { ...state, notification: null };
    default:
      return state;
  }
};

// Componente proveedor del contexto
export const NotificationProvider = ( {children } ) => {
  const [state, notificationDispatch] = useReducer(notificationReducer, initialState);

  return (
    <NotificationContext.Provider value={{ state, notificationDispatch }}>
      {children}
    </NotificationContext.Provider>
  );
};

// Hook personalizado para acceder al contexto
export const useNotification = () => {
  const context = useContext(NotificationContext);
  return context;
};

export default NotificationContext