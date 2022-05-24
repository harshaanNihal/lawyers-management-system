import {
  formatLawyersData,
  getIndexFromId,
  toggleSlot,
} from "@/component/utils"
import * as R from "ramda"
import { v4 as uuidv4 } from "uuid"
import {
  ADD_FIRM,
  ADD_LAWYER,
  BOOK_LAWYER_SLOTS,
  DELETE_FIRM,
  FORMAT_DATA,
} from "../constants"

const getBaseFirmData = (firmData) => ({
  id: uuidv4(),
  name: firmData.name,
  description: firmData.description,
  lawyers: [],
})

const updateLawerInFirm = (state, payload) => {
  const cloneState = R.clone(state)
  const firmIndex = getIndexFromId(cloneState, payload.firmId)

  const cloneFirm = R.clone(cloneState[firmIndex])
  const cloneLawyers = R.clone(cloneFirm.lawyers)

  const LawyerIndex = getIndexFromId(cloneLawyers, payload.lawyerId)

  const cloneLawyer = R.clone(cloneLawyers[LawyerIndex])

  cloneLawyers[LawyerIndex].slots = toggleSlot(
    cloneLawyer,
    payload.selectedSlot.id,
    true
  )

  cloneState[firmIndex] = { ...cloneFirm, lawyers: cloneLawyers }

  return cloneState
}

const addLawyerToFirm = (state, payload) => {
  const { firmId, lawyer } = payload

  const cloneState = R.clone(state)
  console.log(firmId, "firmId")
  const firmIndex = getIndexFromId(cloneState, firmId)

  const cloneFirm = R.clone(cloneState[firmIndex])

  console.log(cloneFirm, "cloneFirm")
  cloneFirm.lawyers = [
    ...cloneFirm.lawyers,
    { ...lawyer, id: uuidv4(), slots: [] },
  ]
  cloneState[firmIndex] = { ...cloneFirm, formattedData: false }

  return cloneState
}

const formatFirmData = (state, firmId) => {
  const cloneState = R.clone(state)
  const firmIndex = getIndexFromId(cloneState, firmId)
  let cloneFirm = R.clone(cloneState[firmIndex])

  if (cloneFirm.formattedData) return cloneState

  const lawyers = R.clone(cloneFirm.lawyers)

  const formattedLawyers = formatLawyersData(lawyers)

  cloneFirm = { ...cloneFirm, lawyers: formattedLawyers, formattedData: true }
  cloneState[firmIndex] = cloneFirm
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
      startTime: 14,
      endTime: 17,
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
    formattedData: false,
  },
]

const rootReducer = (state = initialFirmData, action = {}) => {
  switch (action.type) {
    case ADD_FIRM:
      return [...state, getBaseFirmData(action.payload)]
    case ADD_LAWYER:
      return addLawyerToFirm(state, action.payload)
    case DELETE_FIRM:
      return state.filter((firm) => firm.id !== action.payload.id)
    case BOOK_LAWYER_SLOTS:
      return updateLawerInFirm(state, action.payload)
    case FORMAT_DATA:
      return formatFirmData(state, action.payload.firmId)
    default:
      return state
  }
}

export default rootReducer
