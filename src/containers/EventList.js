import {connect} from 'react-redux';
import List from '../components/EventList/EventList';

function mapStateToProps(state) {
  return {
    events: state.Events.list,
    loading: state.Events.loading
  };
}

export default connect(
  mapStateToProps
)(List);
