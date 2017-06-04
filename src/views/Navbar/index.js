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
