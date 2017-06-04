import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
const validate = values => {
  const errors = {};

  if (!values.username) {
    errors.username = 'Username is required';
  } else if (values.username.length < 2) {
    errors.username = 'Username must be a minimum of 2 characters';
  }
  if (!values.password) {
    errors.password = 'Password is required';
  } else if (values.password.length < 8) {
    errors.password = 'Password must be a minimum of 8 characters';
  }

  return errors;
}
class UserForm extends Component {

  constructor(props) {
    super(props)

    this.state = {
      username: "",
      password: "",
      name: "",
      usernameErrors: {},
      passwordErrors: {}
    }
  }
  handleSubmit = data => this.props.onSubmit(data)

  handleChange(event) {
    if (event.target.name === 'username') {
      this.setState({
        usernameErrors: validate({username: event.target.value}),
        username: event.target.value
      })
    } else if (event.target.name === 'password') {
      this.setState({
        passwordErrors: validate({password: event.target.value}),
        password: event.target.value
      })
    }
  }
