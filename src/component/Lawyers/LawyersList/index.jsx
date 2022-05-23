import React, { useEffect, useState } from "react"
import { Layout, Breadcrumb } from "antd"
import { useSelector } from "react-redux"
import { Link, useParams } from "react-router-dom"
import LawyersTable from "./LawyersTable"

const { Content } = Layout

function LawyersList() {
  const { firmId } = useParams()
  const firms = useSelector((state) => state)

  const [firmName, setFirmName] = useState("")
  const getFirm = (id) => firms.find((firm) => firm.id === id)

  useEffect(() => {
    const lawyersData = getFirm(firmId)
    setFirmName(lawyersData.name)
  }, [firmId, firms])

  return (
    <Content className="content site-drawer-render-in-current-wrapper">
      <Breadcrumb style={{ margin: "16px 0" }}>
        <Breadcrumb.Item>
          <Link to="/">Firms</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>{firmName}</Breadcrumb.Item>
      </Breadcrumb>
      <div className="site-layout-content">
        <h1>Lawyers List</h1>
        <div className="lawyers-list">
          <LawyersTable />
        </div>
      </div>
    </Content>
  )
}

export default LawyersList
