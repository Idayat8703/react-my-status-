import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import PropTypes from 'prop-types'

type Props = {
  isAuthenticated: boolean,
  logout: () => void,
}
