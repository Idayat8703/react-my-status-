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
  handleFilterChange = (event) => this.setState({filter: event.target.value})

  render() {

    let RenderedRows = <tr><td>No Applications Match The Current Criteria </td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>

    if (this.filteredApplications().length > 0) {

      RenderedRows = this.filteredApplications()
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .map((app, index) => <ApplicationRow key={index} application={app} user_id={this.props.currentUser.id} onClick={this.handleRowClick} onDelete={this.removeItem}/>)
    }

    const modalStyle = {
      overlay: {
        "position": "absolute",
        "overflow": "auto",
        "minHeight": "825px",
      }
    }
    return (
      <div>
        {this.props.applications.length > 0 ?
          <div>
            <form>
              <div>
                <input

                  type="text"
                  placeholder="Filter By Company Name"
                  value={this.state.filter}
                  onChange={this.handleFilterChange}
                />
              </div>
            </form>
            <table>
              <thead>
                <tr>
                  <th>Company</th>
                  <th>Job Title</th>
                  <th>Contact</th>
                  <th>Date</th>
                  <th>Action</th>
                  <th>Notes</th>
                  <th>Completed</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {RenderedRows}
              </tbody>

            </table>
          </div>
          :
            <div>
              <h2><span>You do not have any applications yet</span></h2>
              <h3><span>Click on the "New Application" button to add a new application</span></h3>
            </div>
          }
          <Modal
            isOpen={this.state.modalIsOpen}
            contentLabe
            onRequestClose={this.closeModal}
            style={modalStyle}>
            <h1><span>View/Edit Application</span></h1>
            <ApplicationForm onSubmit={this.handleUpdateApplication}/>
            <button type="button" onClick={this.closeModal}>X</button>
          </Modal>
        </div>
      )
    }
  }
  const mapStateToProps = (state) => {
    return {
      applications: state.applications.applications,
      currentApplication: state.applications.currentApplication,
      currentUser: state.auth.currentUser,
      token: state.auth.token
    }
  }


  export default connect(mapStateToProps, { gotApplications, setCurrentApplication, deleteApplication, editApplication, reset })(ApplicationsTable)
