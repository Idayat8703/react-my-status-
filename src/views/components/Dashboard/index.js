import React, { Component} from 'react'
import Modal from 'react-modal'
import { connect } from 'react-redux';
import { reset, SubmissionError } from 'redux-form';

import { addApplication, clearCurrentApplication } from '../../redux/modules/Applications/actions'
import ApiServices from '../../redux/services/Api'
import ApplicationsTable from '../components/ApplicationsTable'
import NewApplicationButton from '../components/NewApplicationButton'
import ApplicationForm from '../components/Forms/application'
class Dashboard extends Component {

  constructor(props) {
    super(props)

    this.state = {
      currentApplication: null,
      modalIsOpen: false
    }

  }

  openModal = () => this.setState({modalIsOpen: true})
  closeModal = () => this.setState({modalIsOpen: false})

  openApplicationForm = () => {
    this.props.clearCurrentApplication()
    this.openModal()
  }
  handleNewApplication = (data) => {
    const user_id = this.props.currentUser.id
    return ApiServices.post("/users/" + user_id + "/applications", data, this.props.token)
      .then(response => {
        const { application } = response
        this.props.addApplication(application)
        this.props.reset('application')
        this.closeModal()
      })
      .catch((errors) => {
        console.log(errors)
        throw new SubmissionError(errors)
      })

  }
