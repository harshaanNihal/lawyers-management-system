import { bookLawyerSlots } from "@/redux/actions"
import { Button, Divider, Tag } from "antd"
import React from "react"
import { useDispatch } from "react-redux"
import "./slotBooking.css"

function SlotsBooking({ firmId, lawyer, slots = [], onBook }) {
  const dispatch = useDispatch()
  const [availableSlots, setAvailableSlots] = React.useState(slots)
  const [selectedSlots, setSelectedSlots] = React.useState([])

  const getSelectedSlotIndex = (slot) =>
    selectedSlots.findIndex((selectedSlot) => selectedSlot.id === slot.id)

  const toggleSlot = (slot) => {
    const index = getSelectedSlotIndex(slot)
    if (index === -1) {
      setSelectedSlots([...selectedSlots, slot])
    } else {
      setSelectedSlots(
        selectedSlots.filter((selectedSlot) => selectedSlot.id !== slot.id)
      )
    }
  }

  const bookSlots = () => {
    onBook(lawyer.id, selectedSlots)
  }

  return (
    <div className="expandable-container">
      <div className="expandable-tags">
        {availableSlots.map((slot) => (
          <Tag
            key={slot.id}
            color={getSelectedSlotIndex(slot) === -1 ? "" : "green"}
            onClick={() => toggleSlot(slot)}
          >{` ${slot.startTime}:00 - ${slot.endTime}:00 `}</Tag>
        ))}
      </div>
      <Divider type="vertical" />
      <Button type="primary" onClick={() => bookSlots()}>
        Book Slots
      </Button>
    </div>
  )
}

export default SlotsBooking
