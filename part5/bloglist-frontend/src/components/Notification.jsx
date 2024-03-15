import React from 'react'
import PropTypes from 'prop-types'

const error = {
    color: 'red',
    background: 'lightgrey',
    font_size: 20,
    border_style: 'solid',
    border_radius: 5,
    padding: 10,
    margin_bottom: 10
  }
  
  const success = {
    color: 'green',
    background: 'lightgrey',
    font_size: 20,
    border_style: 'solid',
    border_radius: 5,
    padding: 10,
    margin_bottom: 10
  }

  const Notification = ({ message }) => {
    if (message === null ) {
      return null
    } else if (message.includes('Wrong','Error')){
      return (
        <div id='error' style={error}>
          {message}
        </div>
      )
    } else {
      return (
        <div id='success' style={success}>
          {message}
        </div>
      )
    }
}

  Notification.propTypes = {
    message: PropTypes.string,
  }

  export default Notification