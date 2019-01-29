import React from 'react';

import LinearProgress from '@material-ui/core/LinearProgress';

import ControlPanel from '../containers/panel';
import Group from '../containers/eventsGroup';

import { scheduleStatus } from '../scheduleActions';

export default function ({ id, status, events, groups, from, to, beginDate, endDate, grouperPeriod, generateEvents, groupEvents, ...schedule }) {
  switch (status) {
  case scheduleStatus.NONE: {
    generateEvents(id, schedule, beginDate, endDate);
    break;
  }
  case scheduleStatus.REGROUP: {
    groupEvents(id, grouperPeriod, { events, from: beginDate, to: endDate });
    break;
  }
  case scheduleStatus.LOADED:
    return(
      <div>
        <ControlPanel id={id} />
        {groups.map(group => (
          <Group key={group.start} group={group} />
        ))}
      </div>
    );
  }
  return <LinearProgress />;
}
