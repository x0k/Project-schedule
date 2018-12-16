import React, { Component } from 'react';

import TopAppBar, { TopAppBarFixedAdjust } from '@material/react-top-app-bar';
import '@material/react-top-app-bar/dist/top-app-bar.css';

import Drawer, {DrawerAppContent, DrawerContent, DrawerHeader, DrawerTitle} from '@material/react-drawer';
import '@material/react-drawer/dist/drawer.css';

import List, {ListItem, ListItemText} from '@material/react-list';
import '@material/react-list/dist/list.css';

import './App.scss';

import Schedule from '../schedule/Schedule';

import { Generator } from 'schedule-generator';
import exams from '../../assets/exams';
import schedule from '../../assets/schedule';

export default class App extends Component {

  constructor (props) {
    super(props);
    this.state = { selectedIndex: 1, groups: [], open: true, schedules: [
      { name: '147a schedule', data: schedule, from: new Date(2018, 8, 1), to: new Date(2018, 11, 30) },
      { name: '147 Exams', data: exams, from: new Date(2019, 0, 10), to: new Date(2019, 0, 20) },
    ] };
    this.onSelect(this.state.selectedIndex);
  }

  onSelect = (selectedIndex) => {
    let { data, from, to } = this.state.schedules[selectedIndex],
      gen = new Generator();
    gen.load(data)
      .then(gen => gen.run(from, to))
      .then(groups => this.setState({ groups }));
  }

  scheduleDates (schedule) {
    let d2s = (date) => `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;
    return d2s(schedule.from) + ' - ' + d2s(schedule.to);
  }

  render () {
    return (
      <div className='drawer-container'>
        <Drawer>
          <DrawerHeader>
            <DrawerTitle tag='h2'>
              Schedules
            </DrawerTitle>
          </DrawerHeader>
          <DrawerContent>
            <List singleSelection selectedIndex={this.state.selectedIndex} twoLine handleSelect={this.onSelect}>
              {this.state.schedules.map(el => (
                <ListItem>
                  <ListItemText primaryText={el.name} secondaryText={this.scheduleDates(el)} />
                </ListItem>
              ))}
            </List>
          </DrawerContent>
        </Drawer>

        <DrawerAppContent className='drawer-app-content'>
          <TopAppBar title={this.state.schedules[this.state.selectedIndex].name} />
          <TopAppBarFixedAdjust>
            <Schedule groups={this.state.groups} />
          </TopAppBarFixedAdjust>
        </DrawerAppContent>
      </div>
    );
  }

}
