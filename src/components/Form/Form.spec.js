import React from 'react';
import {shallow} from 'enzyme';
import {expect} from 'chai';
import Form from "./Form";
import sinon from 'sinon';
import moment from "moment";

describe("<Form />", () => {
  describe("initial state", () => {
    const url = "http://google.com",
      startDate = moment().subtract(10, "days"),
      endDate = moment();

    const wrapper = shallow(<Form url={url} startDate={startDate} endDate={endDate}/>);

    it("should contain a url input", () => {
      const found = wrapper.find("input[type='url']");
      expect(found.length).to.equal(1);
      expect(found.props().defaultValue).to.equal(url);
    });

    it("should contain a [(re)load] button", () => {
      const found = wrapper.find("button");
      expect(found.length).to.equal(1);
      expect(found.text()).to.equal("(re)load");
    });

    it("should contain 2 date input", () => {
      const found = wrapper.find("DatePicker");
      expect(found.length).to.equal(2);
      expect(found.at(0).props().selected.toString()).to.equal(startDate.toString());
      expect(found.at(1).props().selected.toString()).to.equal(endDate.toString());
    });
  });

  describe("in normal conditions", () => {
    describe("with a valid url", () => {
      const url = "https://api.github.com/events",
        startDate = moment().subtract(10, "days"),
        endDate = moment(),
        fetch = sinon.spy();

      const wrapper = shallow(<Form url={url} startDate={startDate} endDate={endDate}
                                    fetch={fetch}/>);

      it("should call .fetch when [Load] button is pressed", () => {
        wrapper.find("button").simulate("click");
        expect(fetch.calledOnce).to.be.true;
        expect(fetch.args[0][0]).to.equal(url);
        expect(fetch.args[0][1].toString()).to.equal(startDate.toString());
        expect(fetch.args[0][2].toString()).to.equal(endDate.toString());
      });
    });

    describe("with an empty url", () => {
      const url = "",
        startDate = moment().subtract(10, "days"),
        endDate = moment(),
        fetch = sinon.spy();

      const wrapper = shallow(<Form url={url} startDate={startDate} endDate={endDate}
                                    fetch={fetch}/>);

      it("should have the [Load] button disabled", () => {
        const button = wrapper.find("button");
        expect(button.props().disabled).to.be.true;
      });

      it("should show an error message", () => {
        const inputGroup = wrapper.find(".input-group");
        expect(inputGroup.props().className).to.contains("has-error");
        const message = wrapper.find(".form-item__message");
        expect(message.text()).to.contains("Invalid url");
      });
    });
  });
});

