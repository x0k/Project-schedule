import { push } from 'connected-react-router'

export default function openSchedule (index) {
  return push(`/schedule/${index}`)
}
