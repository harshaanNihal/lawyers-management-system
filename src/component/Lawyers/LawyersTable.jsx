import { bookLawyerSlots } from "@/redux/actions"
import { Button, Table, Tag } from "antd"
import Column from "antd/lib/table/Column"
import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useParams } from "react-router-dom"
import SlotsBooking from "./SlotsBooking"

function LawyersTable() {
  const { firmId } = useParams()
  const firms = useSelector((state) => state)
  const dispatch = useDispatch()
  const [formattedlawyers, setFormattedLawyers] = React.useState([])

  const getFirm = (id) => firms.find((firm) => firm.id === id)

  const lawyersData = getFirm(firmId).lawyers
  const formatLawyerData = (lawyers) =>
    lawyers.map((lawyer) => {
      const {
        availablity: { startTime, endTime },
      } = lawyer
      const totalSlots = endTime - startTime
      const slotsList = []

      for (let i = 0; i < totalSlots; i += 1) {
        const id = `${String(+startTime + i)}-${String(+startTime + i + 1)}`
        const slotPresent = lawyers?.slots?.find((slot) => slot.id === id)

        if (slotPresent) {
          slotsList.push(slotPresent)
        }
        slotsList.push({
          id,
          startTime: Number(startTime) + i,
          endTime: Number(startTime) + i + 1,
          booked: false,
        })
      }
      return {
        ...lawyer,
        key: lawyer.id,
        totalSlots: lawyer.availablity.endTime - lawyer.availablity.startTime,
        slots: slotsList,
      }
    })

  useEffect(() => {
    console.log("inside useEffect", formatLawyerData(lawyersData))
    setFormattedLawyers(formatLawyerData(lawyersData))
  }, [firmId, lawyersData])

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <Link to={`/firms/${firmId}/lawyer/`}>{text}</Link>,
    },
    {
      title: "Speciality",
      dataIndex: "speciality",
      key: "speciality",
      render: (tags) =>
        tags.map((tag) => (
          <Tag key={tag} color="blue">
            {tag}
          </Tag>
        )),
    },
    {
      title: "Slots",
      key: "slots",
      render: (text, record) => (
        <span>
          Available Slots:{" "}
          {record.totalSlots -
            record.slots.filter((slot) => slot.booked).length}
        </span>
      ),
    },
    {
      title: "Cost per session",
      dataIndex: "cost",
      key: "cost",
    },
    Table.EXPAND_COLUMN,
  ]

  const expandableIcon = ({ expanded, onExpand, record, ...rest }) =>
    !expanded ? (
      <Button onClick={(e) => onExpand(record, e)}>Check Availibity</Button>
    ) : null
  // <Button onClick={(e) => onExpand(record, e)}>Book</Button>

  const expandedRowRender = (lawyer, ...rest) => {
    console.log()
    return (
      <SlotsBooking
        lawyer={lawyer}
        slots={lawyer?.slots?.filter((slot) => !slot.booked)}
        onBook={(lawyerId, selectedSlots) => {
          const cloneLawyer = { ...lawyer }
          cloneLawyer.slots = cloneLawyer.slots.map((slot) => {
            if (selectedSlots.some((s) => s.id === slot.id)) {
              const newSlot = { ...slot }
              newSlot.booking = true
              return newSlot
            }
            return slot
          })

          dispatch(bookLawyerSlots(firmId, lawyer.id, cloneLawyer))
        }}
      />
    )
  }

  return (
    <Table
      expandable={{
        expandedRowRender,
        expandIcon: expandableIcon,
      }}
      dataSource={formattedlawyers}
      columns={columns}
    />
  )
}

export default LawyersTable
