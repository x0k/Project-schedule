import React from 'react';

import LinearProgress from '@material-ui/core/LinearProgress';

import ControlPanel from '../containers/panel';
import Group from './group';

import { scheduleStatus } from '../actions';

export default function ({ id, description, schedule, generateEvents, groupEvents }) {
  switch (description.status) {
  case scheduleStatus.none:
    generateEvents(id, schedule);
    break;
  case scheduleStatus.regroup: {
    const { events, grouperPeriod, beginDate: from, endDate: to } = description;
    groupEvents(id, grouperPeriod, { events, from, to });
    break;
  }
  case scheduleStatus.loaded:
    return(
      <div>
        <ControlPanel schedule={id} />
        {description.groups.map(group => (
          <Group
            groupBy={description.grouperPeriod}
            key={group.start}
            group={group}
          />
        ))}
      </div>
    );
  }
  return <LinearProgress />;
}
