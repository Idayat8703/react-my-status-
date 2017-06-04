import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import DatePicker from 'react-datepicker'
import moment from 'moment'
import 'react-datepicker/dist/react-datepicker.css';

const form = reduxForm({
  form: 'application'
})

const renderField = field => (
    <input className="uk-input uk-width-small uk-margin-left uk-margin-right uk-form-controls" {...field.input}/>
)

const renderCheckbox = field => (
    <input type="checkbox" className="uk-checkbox uk-margin-left" {...field.input}/>
)

const renderDatePicker = ({input, placeholder, defaultValue, meta: {touched, error} }) => (
    <DatePicker {...input} className="uk-input uk-width-small uk-margin-left uk-margin-right uk-form-controls" dateForm="MM/DD/YYYY" selected={input.value ? moment(input.value) : null} />
);

class ApplicationForm extends Component {

  constructor (props) {
    super(props)
    this.state = {
      startDate: moment()
    };
  }

  componentDidMount() {
    this.handleInitialize()
  }

  handleInitialize() {
    const currentApplication = this.props.currentApplication
    const initData = {
      "company": currentApplication.company,
      "date": currentApplication.date,
      "complete": currentApplication.complete
    }
    this.props.initialize(initData)
  }
