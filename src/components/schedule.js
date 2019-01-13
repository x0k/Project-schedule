import React, { Component } from 'react';

import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';

import { Generator, Grouper } from 'schedule-core';
import { Typography } from '@material-ui/core';

const styles = theme => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper, 
    position: 'relative',
    overflow: 'auto',
  },
  listSection: {
    backgroundColor: 'inherit',
  },
  day: {
    margin: 20,
  },
  ul: {
    backgroundColor: 'inherit',
    padding: 0,
  },
});

class Schedule extends Component {

  state = {
    scheduleName: '',
    events: [],
    groups: [],
    from: new Date(),
    to: (() => {
      let d = new Date();
      d.setDate(d.getDate() + 7);
      return d;
    })(),
    groupBy: 'day',
    status: 'none',
  }

  componentWillMount () {
    const { schedule } = this.props;
    const { scheduleName } = this.state;
    if (schedule && schedule.name !== scheduleName) {
      const { name, data, from, to } = schedule;
      const gen = new Generator();
      gen.load(data)
        .then(rule => gen.run(from, to))
        .then(events => this.setState({ events, scheduleName: name, status: 'loading' }));
    }
  }

  render () {
    const { classes, schedule } = this.props;
    const { events, scheduleName, from, to, groups, groupBy, status } = this.state;
    if (events.length && schedule.name === scheduleName && status === 'loading') {
      Grouper.toList({
        events,
        constraints: schedule.constraints,
        from,
        to,
      })
        .then(list => Grouper.groupBy(groupBy, list))
        .then(groups => this.setState({ groups, status: 'loaded' }));
    }
    return(
      <div>{groups.map((group, groupId) => (
        <div key={groupId}>
          <Typography variant="h6" className={classes.day}>{Grouper.partionToString(groupBy, new Date(group.start))}</Typography>
          <List className={classes.root} subheader={<li />}>
            <li key={`section-${groupId}`} className={classes.listSection}>
              {group.items.map((item, itemId) => (
                <ul className={classes.ul} key={itemId}>
                  <ListSubheader>{Grouper.partionToTimePeriod(item.start, item.length)}</ListSubheader>
                  <ListItem key={`item-${groupId}-${itemId}`}>
                    <ListItemText primary={item.value} />
                  </ListItem>
                </ul>
              ))}
            </li>
          </List>
        </div>
      ))}
      </div>);
  }

}

export default withStyles(styles)(Schedule);