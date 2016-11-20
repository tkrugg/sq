import React from 'react';
import "./EventList.scss";
import Spinner from 'react-spinkit';
import Event from './Event';

class EventList extends React.Component {
  render() {
    if (this.props.events === null) {
      return <div className="list" />;
    }

    const events = (this.props.events || []);

    return (
      <div className="list">
        { this.props.loading ? <Spinner spinnerName="double-bounce"/> : ""}
        <div className="table-header" />
        <div className="table">
          <div className="table__head">
            <div className="table__row">
              <div className="table__cell">Time</div>
              <div className="table__cell">User</div>
              <div className="table__cell">Type</div>
            </div>
          </div>
          <div className="table__body">
            {
              events.map(event =>
                <Event key={event.id}
                  time={event.created_at}
                  action={event.type}
                  user={event.actor}/>)
            }
          </div>
        </div>
      </div>
    );
  }
}

EventList.propTypes = {
  events: React.PropTypes.array,
  loading: React.PropTypes.bool
};

export default EventList;
