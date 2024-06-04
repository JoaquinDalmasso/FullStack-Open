import { createSlice } from '@reduxjs/toolkit';

const notificationSlice = createSlice({
  name: 'notification',
  initialState: null,
  reducers: {
    newNotification: (state, action) => action.payload,
    hideNotification: (state, action) => null,
  },
});

export const { newNotification, hideNotification } = notificationSlice.actions;

// Thunk para manejar la temporización del ocultamiento de la notificación
export const setNotification = (notification, displayTime) => (dispatch) => {
  dispatch(newNotification(notification));

  setTimeout(() => {
    dispatch(hideNotification());
  }, displayTime * 1000);
};

export default notificationSlice.reducer;