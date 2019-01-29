import { connect } from 'react-redux';

import App from '../components/app';

const stateToProps = (state) => ({ selectedSchedule: state.selectedSchedule });

export default connect(stateToProps)(App);
