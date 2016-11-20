import {SHOW_EVENTS, LOAD_EVENTS, LOADING_FAILED} from '../constants/actionTypes';
import initialState from "./initialState";
import moment from "moment";

export default function eventsReducer(state = initialState.Events, action) {
  switch (action.type) {

    case LOAD_EVENTS:
      return {...state, loading: true, error: false};

    case SHOW_EVENTS: {
      const {data, startDate, endDate} = action;
      const events = data || [];
      const filteredEvents = events.filter(event => {
        return moment(event.created_at).isBetween(moment(startDate), moment(endDate));
      });
      return {...state, filteredList: startDate && endDate ? filteredEvents : events, list: events, loading: false,
        error: false};
    }

    case LOADING_FAILED:
      return {loading: false, error: true, list: null};

    default:
      return state;
  }
}
