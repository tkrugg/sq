import moment from "moment";

export default {
  Events: {
    loading: false,
    list: null,
    url: "https://api.github.com/events",
    startDate: moment().subtract(3, "days").toJSON(),
    endDate: moment().toJSON()
  }
};
