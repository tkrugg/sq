import React from 'react';
import {shallow} from 'enzyme';
import {expect} from 'chai';
import EventList from "./EventList";

describe("<EventList />", () => {
  describe("when loading", () => {
    const events = [], loading = true;
    const wrapper = shallow(<EventList events={events} loading={loading}/>);

    it("should show a spinner", () => {
      const found = wrapper.find("Spinner");
      expect(found.length).to.equal(1);
    });
  });

  describe("when done loading", () => {
    const events = [
      {
        "type": "PushEvent",
        "actor": {
          "login": "george-sp",
          "display_login": "george-sp",
          "url": "https://api.github.com/users/george-sp",
          "avatar_url": "https://avatars.githubusercontent.com/u/16156202?"
        },
        "created_at": "2016-11-14T21:37:13Z",
      }
    ], loading = false;

    const wrapper = shallow(<EventList events={events} loading={loading}/>);

    it("should not show a spinner", () => {
      const spinners = wrapper.find("Spinner");
      expect(spinners.length).to.equal(0);
    });

    it("should show the events list", () => {
      const rows = wrapper.find("Event");
      expect(rows.length).to.equal(1);
    });
  });
});

