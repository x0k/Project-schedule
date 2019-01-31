import { connect } from 'react-redux';

import { selectSchedule } from '../appActions';

import Drawer from '../components/drawer';

const stateToProps = (state) => ({
  schedules: state.schedules,
  descriptions: state.descriptions,
  selected: state.selectedSchedule
});

const dispatchToProps = (dispatch) => ({
  onSelect: (id) => () => dispatch(selectSchedule(id))
});

export default connect(stateToProps, dispatchToProps)(Drawer);
