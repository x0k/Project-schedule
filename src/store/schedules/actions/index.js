import { createAction } from '../../../utils/store'

import { ADD_SCHEDULE } from '../constants'

import openSchedule from './openSchedule'

export const addSchedule = createAction(ADD_SCHEDULE)

export {
  openSchedule
}
