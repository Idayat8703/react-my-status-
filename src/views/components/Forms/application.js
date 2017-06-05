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
    <input {...field.input}/>
)

const renderCheckbox = field => (
    <input type="checkbox"{...field.input}/>
)

const renderDatePicker = ({input, placeholder, defaultValue, meta: {touched, error} }) => (
    <DatePicker {...input}  dateForm="MM/DD/YYYY" selected={input.value ? moment(input.value) : null} />
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
  handleFormSubmit = data => this.props.onSubmit(data)

  render() {
    const {handleSubmit} = this.props
    return (
      <div>
        <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
          <div >
            <h3 ><span>Who am I applying with?</span></h3>
            <label>Company:</label>
            <Field
              name="company"
              component={renderField}
            />
            <label>Contact Name:</label>
            <Field
              name="contact_name"
              component={renderField}
            />
            <label>Contact Title:</label>
            <Field
              name="contact_title"
              component={renderField}
            />
            <h3><span>What are we doing?</span></h3>
            <label>Date:</label>
            <Field
              name="date"
              component={renderDatePicker}
            />
            <label>Action:</label>
            <Field
              name="action"
              component={renderField}
            />
            <label>Completed?</label>
            <Field
              name="complete"
              component={renderCheckbox}
            />
            <h3><span>What kind of job is this for?</span></h3>
            <label className="uk-form-label">Job Title:</label>
            <Field
              name="job_title"
              component={renderField}
            />
            <label>Job URL:</label>
            <Field
              name="job_url"
              component={renderField}
            />
          <label>Notes:</label>
            <Field
              name="notes"
              type="textarea"
              component={renderField}
            />
          </div>
          <button action="submit">Save</button>
        </form>
      </div>
    )
  }
}
const mapStateToProps = (state) => {
  return { currentApplication: state.applications.currentApplication }
}

ApplicationForm = connect(mapStateToProps)(form(ApplicationForm))

export default ApplicationForm
