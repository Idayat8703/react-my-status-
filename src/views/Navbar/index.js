import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import PropTypes from 'prop-types'

type Props = {
  isAuthenticated: boolean,
  logout: () => void,
}
class Navbar extends Component {

  constructor(props) {
    super(props)

    this.handleLogout = this.handleLogout.bind(this)
  }

  static contextTypes = {
    router: PropTypes.object,
  }

  props: Props

  handleLogout() {
    this.props.logout(this.context.router)
  }
  render() {
    return (
        <div>
          {
            this.props.isAuthenticated ?
            <nav>
              <div>
                <ul>
                  <li><NavLink to="/">Home</NavLink></li>
                  <li><NavLink to="/" onClick={this.handleLogout}>Log Out</NavLink></li>
                </ul>
              </div>
              <div>
                <ul>
                  <li>Hello {this.props.currentUser}!</li>
                </ul>
              </div>
            </nav>

            :

            <ul>
              <li><NavLink to="/">Home</NavLink></li>
              <li><NavLink to="/signup">Signup</NavLink></li>
              <li><NavLink to="/login">Login</NavLink></li>
            </ul>
          }
        </div>
    )
  }
}

export default Navbar
