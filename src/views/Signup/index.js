import React, { Component } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { signup } from '../../redux/modules/Auth/actions'
import UserForm from '../components/Forms/user'


class Signup extends Component {

  static contextTypes = {
    router: PropTypes.object
  }
