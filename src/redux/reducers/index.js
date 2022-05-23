import * as R from "ramda"
import { v4 as uuidv4 } from "uuid"
import { ADD_FIRM, BOOK_LAWYER_SLOTS, DELETE_FIRM } from "../constants"

const getIndexFromId = (arr, id) => arr.findIndex((v) => v.id === id)

const getBaseFirmData = (firmData) => ({
  id: uuidv4(),
  name: firmData.name,
  description: firmData.description,
  lawyers: [],
})

const updateLawerInFirm = (state, payload) => {
  const cloneState = R.clone(state)
  const firmIndex = getIndexFromId(cloneState, payload.firmId)

  const LawyerIndex = getIndexFromId(
    cloneState[firmIndex].lawyers,
    payload.lawyerId
  )

  const lawyersClone = R.clone(cloneState[firmIndex].lawyers)

  lawyersClone[LawyerIndex] = R.clone(payload.newLawyer)

  cloneState[firmIndex].lawyers = lawyersClone

  return cloneState
}

const initialLawyerData = [
  {
    id: "unique-lawyer-id",
    name: "Lawyer-Name-1",
    speciality: ["Lawyer-1-Speciality-1", "Lawyer-1-Speciality-2"],
    availablity: {
      startTime: "9",
      endTime: "17",
    },
    slots: [],
    cost: 300,
  },
  {
    id: "unique-lawyer-id-2",
    name: "Lawyer-Name-2",
    speciality: ["Lawyer-2-Speciality-1", "Lawyer-2-Speciality-2"],
    availablity: {
      startTime: "14",
      endTime: "17",
    },
    slots: [],
    cost: 500,
  },
]
const initialFirmData = [
  {
    id: "unique-firm-id",
    name: "Firm-Title",
    description: "firm Description",
    lawyers: initialLawyerData,
  },
]

const rootReducer = (state = initialFirmData, action = {}) => {
  switch (action.type) {
    case ADD_FIRM:
      return [...state, getBaseFirmData(action.payload)]
    case DELETE_FIRM:
      return state.filter((firm) => firm.id !== action.payload.id)
    case BOOK_LAWYER_SLOTS:
      return updateLawerInFirm(state, action.payload)
    default:
      return state
  }
}

export default rootReducer
