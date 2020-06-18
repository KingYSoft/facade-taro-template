import { ADD, MINUS } from '../constants/counter'
import { NumStore, INITIAL_STATE } from '../types/counter'

export default function counter(
  state: NumStore = INITIAL_STATE,
  action,
): NumStore {
  switch (action.type) {
    case ADD:
      return {
        ...state,
        num: state.num + 1,
      }
    case MINUS:
      return {
        ...state,
        num: state.num - 1,
      }
    default:
      return state
  }
}
