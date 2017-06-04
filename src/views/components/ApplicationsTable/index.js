import React, {Component} from 'react'
import { connect } from 'react-redux'
import Modal from 'react-modal'
import { reset, SubmissionError } from 'redux-form';

import { gotApplications, setCurrentApplication, deleteApplication, editApplication } from '../../../redux/modules/Applications/actions'
import ApiServices from '../../../redux/services/Api'
import ApplicationRow from '../ApplicationRow'
import ApplicationForm from '../../components/Forms/application'

class ApplicationsTable extends Component {

  constructor(props) {

    super(props)
    this.state = {
      modalIsOpen: false,
      filter: ""
    }
  }
  componentDidMount() {
    const user_id = this.props.currentUser.id

    return ApiServices.get("/users/" + user_id + "/applications")
     .then(response => {
       this.props.gotApplications(response.applications)
     })
     .catch((errors) => {
       console.log(errors);
     })
  }
  setApplication = (id) => this.props.setCurrentApplication(id)
  openModal = () => this.setState({modalIsOpen: true})
  closeModal = () => this.setState({modalIsOpen: false})

  handleRowClick = (id) => {
    this.setApplication(id)
    this.openModal()
  }
  removeItem = (user_id, app_id) => {
    return ApiServices.delete("/users/" + user_id + "/applications/" + app_id, this.props.token)
      .then(() => {
        this.props.deleteApplication(app_id)
      })
      .catch((errors) => {
        console.log(errors);
      })
  }
  handleUpdateApplication = (data) => {
    const user_id = this.props.currentUser.id
    const app_id = this.props.currentApplication.id
    return ApiServices.patch("/users/" + user_id + "/applications/" + app_id, data, this.props.token)
      .then(response => {
        const { application } = response
        this.props.editApplication(application)
        this.props.reset('application')
        this.closeModal()
      })
      .catch((errors) => {
        console.log(errors)
        throw new SubmissionError(errors)
      })
  }
  filteredApplications = () => {
    const filter = this.state.filter
    if (filter && filter.length > 0) {
      return this.props.applications.filter(app => app.company.includes(filter))
    } else {
      return this.props.applications
    }
  }
