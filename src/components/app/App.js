import React, { Component } from 'react';
import './App.css';
import { Generator } from 'schedule-generator';
import exams from '../../assets/exams';

class App extends Component {

  constructor (props) {
    super(props);
    this.state = { groups: [] };
    let gen = new Generator(),
      beginDate = new Date(2019, 0, 10),
      endDate = new Date(2019, 0, 20);
    gen.load(exams)
      .then(gen => gen.run(beginDate, endDate))
      .then(groups => this.setState({ groups: groups.filter(el => el.value) }));
  }

  render () {
    return (
      <div className="App">
        <ul>
          {this.state.groups.map(el => (
            <li>{el.value.subject}, {el.value.teacher}, {el.value.type}</li>
          ))}
        </ul>
      </div>
    );
  }

}

export default App;
