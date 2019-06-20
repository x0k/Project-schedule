import { createAction } from '../../../utils/store'

import { DRAWER, SCHEDULE } from '../constants'

import open from './open'

import openSchedule from './openSchedule'

export const setDrawer = createAction(DRAWER)

export const selectSchedule = createAction(SCHEDULE)

export {
  open,
  openSchedule
}
