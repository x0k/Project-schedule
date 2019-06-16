import { createReducer } from '../../../utils/store'

import { ADD_SCHEDULE } from '../constants'

export default createReducer({
  [ADD_SCHEDULE]: (state, { payload }) => state.concat(payload)
})
