import { ADD_FIRM, DELETE_FIRM } from "../constants"

export const addFirm =
  (firm, cb = () => {}) =>
  (dispatch) => {
    dispatch({
      type: ADD_FIRM,
      payload: firm,
    })
    cb()
  }

export const deleteFirm = (firmId) => (dispatch) =>
  dispatch({
    type: DELETE_FIRM,
    payload: { id: firmId },
  })
