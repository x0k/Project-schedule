import React from 'react';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import { withStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

import { Grouper } from 'schedule-core';

const styles = theme => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
    position: 'relative',
    overflow: 'auto',
  },
  day: {
    margin: 20,
  },
  ul: {
    backgroundColor: 'inherit',
    padding: 0,
  }
});

export default withStyles(styles)(function ({ classes, groupBy, group }) {
  return (
    <div>
      <Typography variant="h6" className={classes.day}>{Grouper.headerPartionToString(groupBy, new Date(group.start))}</Typography>
      <List className={classes.root} subheader={<li />}>
        <li className={classes.listSection}>
          {group.items.map((item, itemId) => (
            <ul className={classes.ul} key={itemId}>
              <ListSubheader>{Grouper.periodToString(groupBy, item)}</ListSubheader>
              <ListItem key={`item-${itemId}`}>
                <ListItemText primary={item.value} />
              </ListItem>
            </ul>
          ))}
        </li>
      </List>
    </div>
  );
});