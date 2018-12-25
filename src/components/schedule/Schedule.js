import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';

import { Grouper } from 'schedule-generator';

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
  ul: {
    backgroundColor: 'inherit',
    padding: 0,
  },
});

class Schedule extends Component {

  constructor (props) {
    super(props);
    this.state = { groupBy: 'day', groups: [], name: '' };
  }

  render () {
    let { groups, step, name, classes } = this.props,
      groupBy = this.state.groupBy;
    if (groups.length && name !== this.state.name) {
      Grouper.toList(step, groups, true)
        .then(list => Grouper.groupBy(groupBy, list))
        .then(groups => this.setState({ groups, name }));
    }
    return (
      <List className={classes.root} subheader={<li />}>
        {this.state.groups.map((group, groupId) => (
          <li key={`section-${groupId}`} className={classes.listSection}>
            <ul className={classes.ul}>
              <ListSubheader>{Grouper.partionToString(groupBy, new Date(group.start))}</ListSubheader>
              {group.items.map((item, itemId) => (
                <ListItem key={`item-${groupId}-${itemId}`}>
                  <ListItemText
                    primary={item.value}
                    secondary={Grouper.partionToTimePeriod(item.start, item.length)}
                  />
                </ListItem>
              ))}
            </ul>
          </li>
        ))}
      </List>
    );
  }

}

Schedule.propTypes = {
  name: PropTypes.string.isRequired,
  step: PropTypes.number.isRequired,
  groups: PropTypes.array.isRequired
};

export default withStyles(styles)(Schedule);