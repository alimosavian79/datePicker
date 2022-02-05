import React, { Component } from "react";
import "./Datepicker.css";

const DayNames = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export default class DatePicker extends Component {
  state = {
    CurrentMonthDays: [],
    CurrentYear: new Date().getFullYear(),
    CurrentMonth: new Date().getMonth(),
    placeholder: null,
    ChoosenDate: null,
    showPicker: false,
  };
  componentDidMount() {
    this.fillDays(this.state.CurrentYear, this.state.CurrentMonth);
  }

  fillDays = (year, month) => {
    let d = new Date(year, month);
    let StartOfMonth = d.getDay() - 1;
    let Days = [];
    for (var i = -StartOfMonth; i < 42 - StartOfMonth; i++) {
      Days.push({
        day: new Date(year, month, i).getDate(),
        date: new Date(year, month, i),
        month: new Date(year, month, i).getMonth(),
        year: new Date(year, month, i).getFullYear(),
        isPast: new Date(year, month, i) < new Date(),
        dateFormat: this.setDateFormat(new Date(year, month, i)),
      });
    }
    this.setState({ CurrentMonthDays: Days });
  };

  setDateFormat = (date) => {
    let year = date.getFullYear();
    let month =
      date.getMonth() + 1 >= 10
        ? date.getMonth() + 1
        : "0" + (date.getMonth() + 1);
    let day = date.getDate() >= 10 ? date.getDate() : "0" + date.getDate();

    return `${year}-${month}-${day}`;
  };

  ChangeDate = (year, month) => {
    let newMonth = month <= 11 && month >= 0 ? month : month === -1 ? 11 : 0;
    let newYear =
      month <= 11 && month >= 0 ? year : month === -1 ? year - 1 : year + 1;
    this.setState({ CurrentYear: newYear, CurrentMonth: newMonth }, () =>
      this.fillDays(this.state.CurrentYear, this.state.CurrentMonth)
    );
  };

  chooseDate = (date, cantChoose) => {
    if (!cantChoose) {
      this.setState({ ChoosenDate: date, showPicker: false });
    }
  };

  render() {
    return (
      <div className="MyDatePicker-al">
        <div
          className="input-box"
          onClick={() => this.setState({ showPicker: !this.state.showPicker })}
        >
          {this.state.ChoosenDate ? (
            <span className="value">{this.state.ChoosenDate.dateFormat}</span>
          ) : (
            <span className="placeholder">
              {this.state.placeholder ? this.state.placeholder : "Choose Date"}
            </span>
          )}
        </div>
        {this.state.showPicker && (
          <div className="datepicker-body">
            <div className="navigation">
              <button
                className="btn"
                onClick={() =>
                  this.ChangeDate(
                    this.state.CurrentYear - 1,
                    this.state.CurrentMonth
                  )
                }
              >
                <span className="prev"></span>
                <span className="prev"></span>
              </button>
              <button
                className="btn"
                onClick={() =>
                  this.ChangeDate(
                    this.state.CurrentYear,
                    this.state.CurrentMonth - 1
                  )
                }
              >
                <span className="prev"></span>
              </button>
              <div className="Date-detail">
                <span className="year">{this.state.CurrentYear}</span>
                <span className="month">
                  {monthNames[this.state.CurrentMonth]}
                </span>
              </div>
              <button
                className="btn"
                onClick={() =>
                  this.ChangeDate(
                    this.state.CurrentYear,
                    this.state.CurrentMonth + 1
                  )
                }
              >
                <span className="next"></span>
              </button>
              <button
                className="btn"
                onClick={() =>
                  this.ChangeDate(
                    this.state.CurrentYear + 1,
                    this.state.CurrentMonth
                  )
                }
              >
                <span className="next"></span>
                <span className="next"></span>
              </button>
            </div>
            <div className="header">
              {DayNames.map((item) => (
                <span className="day-title" key={item}>
                  {item}
                </span>
              ))}
            </div>
            <div className="days-list">
              {this.state.CurrentMonthDays.map((item) => (
                <span
                  onClick={() =>
                    this.chooseDate(
                      item,
                      item.isPast || this.state.CurrentMonth !== item.month
                    )
                  }
                  className={`day-item ${
                    this.state.ChoosenDate &&
                    item.dateFormat === this.state.ChoosenDate.dateFormat
                      ? "active"
                      : ""
                  } ${
                    item.isPast || this.state.CurrentMonth !== item.month
                      ? "disabled"
                      : ""
                  }`}
                  key={item.date}
                >
                  {item.day}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }
}
