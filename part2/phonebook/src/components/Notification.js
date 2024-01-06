const Notification = ({ message }) => {
    if (message === null) {
      return null
    }

    if (message.includes('removed from')){
      return (
        <div className="error">
        {message}
      </div>
      )
    }
    else{
      return (
      <div className="added">
        {message}
      </div>
    )
  }
}
  export default Notification