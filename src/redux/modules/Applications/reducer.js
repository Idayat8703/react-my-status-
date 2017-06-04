const initialState = {
  applications: [],
  currentApplication: {}
}

export default (state = initialState, action) => {
  switch(action.type) {

    case 'SET_CURRENT_APPLICATION':
      return {
        ...state,
        currentApplication: state.applications.filter(app => app.id === action.app_id)[0]
      }
