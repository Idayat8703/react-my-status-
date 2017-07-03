import React from 'react'

const NewApplicationButton = (props) => {

  return (
    <button
    className="uk-button uk-button-primary uk-width-1-1 uk-margin-small-bottom"
    onClick={props.onClick}>
      New Application
    </button>
  )
}

export default NewApplicationButton
