import {SHOW_EVENTS, LOAD_EVENTS} from '../constants/actionTypes';
import reducer from "./eventsReducer";
import moment from "moment";
import {expect} from 'chai';
import it from "moment/src/locale/it";
import {describe} from "mocha";

describe("Reducer::Events", () => {
  const getInitialState = () => ({
    loading: false,
    list: [],
    url: "https://api.github.com/events",
    startDate: moment().subtract(3, "days").toJSON(),
    endDate: moment().toJSON()
  });

  it("should set initial state by default", () => {
    const state = getInitialState();
    const action = {type: "random"};
    const newState = reducer(state, action);
    expect(newState).to.deep.equal(state);
  });
  describe(`when ${LOAD_EVENTS} action is fired, the new state`, () => {
    const state = getInitialState();
    const action = {type: LOAD_EVENTS};
    const newState = reducer(state, action);

    it("should have `loading === true`", () => {
      expect(newState.loading).to.deep.equal(true);
    });
  });
  describe(`when ${SHOW_EVENTS} action is fired, the new state`, () => {
    const state = getInitialState();

    it("should produce an 1 event in filteredList if only 1 event in range", () => {
      const event1 = {created_at: moment().subtract(2, "days").toJSON()}, // between startDate and endDate
        event2 = {created_at: moment().subtract(4, "days").toJSON()}; // not between startDate and endDate

      const action = {type: SHOW_EVENTS,
        startDate: moment().subtract(3, "days").toJSON(), endDate: moment().toJSON(),
        data: [ event1, event2 ]
      };
      const newState = reducer(state, action);
      expect(newState.list).to.deep.equal([event1, event2]);
      expect(newState.filteredList).to.deep.equal([event1]);
      expect(newState.loading).to.equal(false);
    });

    it("should produce an empty filteredList if no event in range", () => {
      const event1 = {created_at: moment().add(1, "days").toJSON()}, // not between startDate and endDate
        event2 = {created_at: moment().subtract(4, "days").toJSON()}; // not between startDate and endDate

      const action = {type: SHOW_EVENTS,
        startDate: moment().subtract(3, "days").toJSON(), endDate: moment().toJSON(),
        data: [ event1, event2 ]
      };

      const newState = reducer(state, action);
      expect(newState.list).to.deep.equal([event1, event2]);
      expect(newState.filteredList).to.deep.equal([]);
      expect(newState.loading).to.equal(false);
    });

    it("should produce an empty filteredList if no event in range", () => {
      const event1 = {created_at: moment().add(1, "days").toJSON()}, // not between startDate and endDate
        event2 = {created_at: moment().subtract(4, "days").toJSON()}; // not between startDate and endDate

      const action = {type: SHOW_EVENTS,
        startDate: undefined, endDate: undefined,
        data: [ event1, event2 ]
      };

      const newState = reducer(state, action);
      expect(newState.list).to.deep.equal([event1, event2]);
      expect(newState.filteredList).to.deep.equal([event1, event2]);
      expect(newState.loading).to.equal(false);
    });
  })
});
