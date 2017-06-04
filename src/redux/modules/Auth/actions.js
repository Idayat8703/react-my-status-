import { reset, SubmissionError } from 'redux-form';
import ApiServices from '../../services/Api'

// Actions

const authRequest = () => {
  return {
    type: 'AUTHENTICATION_REQUEST',
  }
}
