import React from 'react';

import List from '@material-ui/core/List';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';

import { withStyles } from '@material-ui/core/styles';

const styles = {
  darawerHeader: {
    margin: 20,
  },
};

const scheduleDates = schedule => {
  const from = new Date(schedule.from);
  const to = new Date(schedule.to);
  let d2s = (date) => `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;
  return d2s(from) + ' - ' + d2s(to);
};

export default withStyles(styles)(function ({ classes, descriptions, schedules, selected, onSelect }) {
  return (
    <div>
      <Typography className={classes.darawerHeader} variant="h5">Schedules</Typography>
      <List>
        {descriptions.map((description, scheduleId) => {
          const schedule = schedules[description.schedule];
          return (
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
          );
        })}
      </List>
    </div>
  );
});