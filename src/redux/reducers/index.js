import { v4 as uuidv4 } from "uuid"
import { ADD_FIRM, DELETE_FIRM } from "../constants"

const getBaseFirmData = (firmData) => ({
  id: uuidv4(),
  name: firmData.name,
  description: firmData.description,
  lawers: [],
})

const initialLawerData = [
  {
    id: "unique-lawer-id",
    name: "Lawer-Name-1",
    speciality: ["Lawer-1-Speciality-1", "Lawer-1-Speciality-2"],
    availablity: {
      startTime: "9",
      endTime: "17",
    },
    cost: 300,
  },
  {
    id: "unique-lawer-id-2",
    name: "Lawer-Name-2",
    speciality: ["Lawer-2-Speciality-1", "Lawer-2-Speciality-2"],
    availablity: {
      startTime: "14",
      endTime: "17",
    },
    cost: 500,
  },
]
const initialFirmData = [
  {
    id: "unique-firm-id",
    name: "Firm-Title",
    description: "firm Description",
    lawers: initialLawerData,
  },
]

const rootReducer = (state = initialFirmData, action = {}) => {
  switch (action.type) {
    case ADD_FIRM:
      return [...state, getBaseFirmData(action.payload)]
    case DELETE_FIRM:
      return state.filter((firm) => firm.id !== action.payload.id)
    default:
      return state
  }
}

export default rootReducer
