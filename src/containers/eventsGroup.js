import { connect } from 'react-redux';

import Group from '../components/group';

const stateToProps = (state) => ({ groupBy: state.schedules[state.selectedSchedule].grouperPeriod });

export default connect(stateToProps)(Group);
