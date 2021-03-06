import React from 'react'
import { Component } from 'react'

class ApplicationRow extends Component {
  constructor() {

   super()
  //
   this.buttonIncrementer = this.buttonIncrementer.bind(this)
 }

 buttonIncrementer () {

   this.props.onVote({vote: (this.props.application.vote) + 1, id: this.props.application.id})
 }

 render(){

  const props = this.props;
  const handleClick = () => props.onClick(props.application.id)
  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this application?\nThis action can not be undone.")) {
      props.onDelete(props.user_id, props.application.id)
    }
  }
  let contact = ""
  if (props.application.contact_name && props.application.contact_title) {
    contact = props.application.contact_name + " - " + props.application.contact_title
  } else if (props.application.contact_name) {
    contact = props.application.contact_name
  } else if (props.application.contact_title) {
    contact = props.application.contact_title
  }

  return (

        <tr>
          <td onClick={handleClick}>{props.application.company}</td>
          <td onClick={handleClick}>{props.application.job_title}</td>
          <td onClick={handleClick}>{contact}</td>
          <td onClick={handleClick}>{props.application.date}</td>
          <td onClick={handleClick}>{props.application.action}</td>
          <td onClick={handleClick}>{props.application.notes}</td>
          <td onClick={handleClick}>{props.application.complete ? 	<span>&#x2713;</span> :	<span>&#x2717;</span> }</td>
          <td><button className="uk-button uk-button-danger uk-button-small" onClick={handleDelete}>Delete</button></td>
          <td><button type="button" className="uk-button uk-button-sucess uk-button-small" onClick={this.buttonIncrementer}> Upvote {this.props.application.vote}</button></td>
        </tr>)

    }
}

export default ApplicationRow
