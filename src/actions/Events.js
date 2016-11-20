import * as types from '../constants/actionTypes';
import * as axios from 'axios';
import dateHelper from '../utils/dateHelper';

export function load(url, startDate, endDate) {
  return function (dispatch) {
    dispatch({
      type: types.LOAD_EVENTS,
      datemodified: dateHelper.getFormattedDateTime(),
    });

    if (url && url.length > 0) {
      axios.get(url).then(({data, status}) => {
        if (status === 200) {
          //window.localStorage.setItem("data", JSON.stringify(data));
          return data;
        }
      }).then(data => {
        return dispatch({
          type: types.SHOW_EVENTS,
          datemodified: dateHelper.getFormattedDateTime(),
          startDate, endDate,
          data,
        });
      }).catch(() => {
        return dispatch({
          type: types.LOADING_FAILED,
          datemodified: dateHelper.getFormattedDateTime()
        });
      });
    }
  };
}
