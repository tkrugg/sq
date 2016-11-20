import React from 'react';
import DatePicker from "react-datepicker";
import moment from "moment";
import "react-datepicker/dist/react-datepicker.css";

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      url: props.url,
      startDate: moment(props.startDate),
      endDate: moment(props.endDate),
      isValid: props.url.length > 0
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      isValid: !nextProps.error
    });
  }

  setUrl(url) {
    this.setState({url, isValid: this.isValid()});
  }

  setDateRange(startDate, endDate) {
    if (startDate > endDate) {
      endDate = moment(startDate).add(1, "day");
    }
    this.setState({startDate, endDate});
  }

  isValid() {
    if ("url" in this.refs) {
      return this.refs["url"].checkValidity();
    }
    return false;
  }

  fetch() {
    this.props.fetch(this.state.url, this.state.startDate, this.state.endDate);
  }

  render() {
    return (
      <div>
        <div className="form-group">
          <div className="form-item">
            <label className="label">Github stream</label>
            <div className={`input-group ${!this.state.isValid ? "has-error" : ""}`}>
              <input className="input"
                     ref="url"
                     type="url" required defaultValue={this.state.url}
                     onChange={(e) => this.setUrl(e.target.value)}/>
            </div>
            { !this.state.isValid ? <p className="form-item__message"> Invalid url </p> : "" }
          </div>
        </div>
        <br />
        <div className="form-group ">
          <div className="form-item">
            from
            <DatePicker className="input"
                        onChange={(fromSelected) => this.setDateRange(fromSelected, this.state.endDate)}
                        selected={this.state.startDate}
                        startDate={this.state.startDate}
                        endDate={this.state.endDate}
                        selectsStart/>
            to
            <DatePicker className="input"
                        onChange={(toSelected) => this.setDateRange(this.state.startDate, toSelected)}
                        selected={this.state.endDate}
                        startDate={this.state.startDate}
                        endDate={this.state.endDate}
                        selectsEnd/>
            <button className="button button--primary"
                    disabled={!this.state.isValid}
                    onClick={() => this.fetch()}>(re)load
            </button>
          </div>
        </div>
      </div>
    );
  }
}

Form.propTypes = {
  url: React.PropTypes.string,
  startDate: React.PropTypes.string,
  endDate: React.PropTypes.string,
  fetch: React.PropTypes.func
};

export default Form;
