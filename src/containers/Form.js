import {connect} from 'react-redux';
import * as actions from '../actions/Events';
import Form from '../components/Form/Form';

function mapStateToProps(state) {
  return {
    url: state.Events.url,
    startDate: state.Events.startDate,
    endDate: state.Events.endDate,
    error: state.Events.error
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetch: (url, startDate, endDate) => dispatch(actions.load(url, startDate, endDate))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Form);
