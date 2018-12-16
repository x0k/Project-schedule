import React, { Component } from 'react';
import PropTypes from 'prop-types';

import List, {ListItem, ListItemText, ListItemMeta, ListGroup, ListGroupSubheader} from '@material/react-list';
import '@material/react-list/dist/list.css';

import './Schedule.scss';

import { Grouper } from 'schedule-generator';

export default class Schedule extends Component {

  constructor (props) {
    super(props);
    this.state = { groupBy: 'day', groups: [], name: '' };
  }

  render () {
    let groupBy = this.state.groupBy;
    if (this.props.groups.length && this.props.name !== this.state.name) {
      let { step, groups, name } = this.props;
      Grouper.toList(step, groups, true)
        .then(list => Grouper.groupBy(groupBy, list))
        .then(groups => this.setState({ groups, name }));
    }
    let items = [];
    for (let group of this.state.groups) {
      items.push(<ListGroupSubheader className='list__subheader'>{Grouper.partionToString(groupBy, new Date(group.start))}</ListGroupSubheader>);
      items.push(
        <List twoLine>
          {group.items.map(el => (
            <ListItem>
              <ListItemText
                primaryText={JSON.stringify(el.value)}
                secondaryText={Grouper.partionToTimePeriod(el.point, el.length)}
              />
              <ListItemMeta meta='place' />
            </ListItem>
          ))}
        </List>
      );
    }
    return (
      <ListGroup>
        {items}
      </ListGroup>
    );
  }

}

Schedule.propTypes = {
  name: PropTypes.string.isRequired,
  step: PropTypes.number.isRequired,
  groups: PropTypes.array.isRequired
};