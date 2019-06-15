import { createReducer } from '../../../utils/store'

import { DRAWER } from '../constants'

export default createReducer({
  [DRAWER]: (state, { payload: drawerOpen }) => ({ ...state, drawerOpen })
})
