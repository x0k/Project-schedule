import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';

import { Grouper } from 'schedule-core';
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

  constructor (props) {
    super(props);
    this.state = { groupBy: 'day', renderEvents: props.events, scheduleName: '' };
  }

  render () {
    const { events, step, name, classes } = this.props;
    const { renderEvents, groupBy, scheduleName } = this.state;
    if (events.length && name !== scheduleName) {
      Grouper.toList(step, events, true)
        .then(list => Grouper.groupBy(groupBy, list))
        .then(events => this.setState({ renderEvents: events, scheduleName: name }));
    }

    return (
      <div>
        {renderEvents.map((group, groupId) => (
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
      </div>
    );
  }

}

Schedule.propTypes = {
  name: PropTypes.string.isRequired,
  step: PropTypes.number.isRequired,
  events: PropTypes.array.isRequired
};

export default withStyles(styles)(Schedule);