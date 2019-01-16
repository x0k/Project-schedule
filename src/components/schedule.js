import React, { Component } from 'react';

import ControlPanel from './controlPanel';
import Group from './group';

import { Generator, Grouper } from 'schedule-core';


const dateToString = date => {
  const zb = val => val < 10 ? '0' + val : val;
  return `${date.getFullYear()}-${zb(date.getMonth()+1)}-${zb(date.getDate())}`;
};

const stringToDate = str => {
  const matches = str.match(/(\d+)-(\d+)-(\d+)/);
  const zb = val => parseInt(val[0] === '0' ? val.slice(1) : val);
  return new Date(matches[1], zb(matches[2]) - 1, zb(matches[3]));
};

class Schedule extends Component {

  state = {
    scheduleName: '',
    events: [],
    groups: [],
    from: new Date(),
    to: new Date(),
    groupBy: 'day',
    status: 'loading',
  }

  changeHandler = (name) => (event) => {
    this.setState({ [name]: event.target.value, status: 'regroup' });
  }

  dateChangeHandler = (name) => (event) => {
    this.setState({ [name]: stringToDate(event.target.value), status: 'regroup' });
  }

  componentDidUpdate () {
    const { schedule } = this.props;
    const { scheduleName, status } = this.state;
    switch (status) {
    case 'none':
    case 'loaded':
      if (schedule && schedule.name !== scheduleName) {
        this.setState({ status: 'loading', scheduleName: schedule.name });
      }
      break;
    }
  }

  render () {
    const { schedule } = this.props;
    const { events, from, to, groups, groupBy, status } = this.state;
    switch (status) {
    case 'loading': {
      const { name, from, to } = schedule;
      const fromDate = new Date(from);
      const toDate = new Date(to);
      const gen = new Generator();
      gen.load(schedule)
        .then(rule => gen.run(fromDate, toDate))
        .then(events => this.setState({
          events,
          scheduleName: name,
          status: 'regroup',
          from: fromDate,
          to: toDate
        }));
      break;
    }
    case 'regroup': {
      Grouper.toList({
        events,
        constraints: schedule.constraints,
        from,
        to,
      })
        .then(list => Grouper.groupBy(groupBy, list))
        .then(groups => this.setState({ groups, status: 'loaded' }));
      break;
    }
    }
    return(
      <div>
        <ControlPanel
          from={dateToString(from)}
          to={dateToString(to)}
          groupBy={groupBy}
          dateHandler={this.dateChangeHandler}
          menuHandler={this.changeHandler}
        />
        {groups.map((group, groupId) => (
          <Group
            groupBy={groupBy}
            group={group}
            key={groupId}
          />
        ))}
      </div>);
  }

}

export default Schedule;