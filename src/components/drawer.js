import React from 'react';

import List from '@material-ui/core/List';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';

import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  darawerHeader: {
    margin: 20,
  },
});

const scheduleDates = schedule => {
  let d2s = (date) => `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;
  return d2s(schedule.from) + ' - ' + d2s(schedule.to);
};

export default withStyles(styles)(function ({ classes, schedules, selected, onSelect }) {
  return (
    <div>
      <Typography className={classes.darawerHeader} variant="h5">Schedules</Typography>
      <List>
        {schedules.map((schedule, scheduleId) => (
          <MenuItem
            key={scheduleId}
            selected={scheduleId === selected}
            onClick={onSelect(scheduleId)}
          >
            <ListItemText
              primary={schedule.name}
              secondary={scheduleDates(schedule)}
            />
          </MenuItem>
        ))}
      </List>
    </div>
  );
});