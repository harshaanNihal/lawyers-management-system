import React, { useEffect } from "react"
import { Layout, Breadcrumb, Card } from "antd"
import { useSelector } from "react-redux"
// import "./FirmsList.css"
import { PlusSquareOutlined } from "@ant-design/icons"
import { useParams } from "react-router-dom"
import LawyersTable from "./LawyersTable"

const { Content } = Layout

function LawyersList() {
  const { firmId } = useParams()
  const firms = useSelector((state) => state)
  const [drawerVisible, setdrawerVisible] = React.useState(false) // drawer to create lawyers
  const [firmName, setFirmName] = React.useState("")
  const getFirm = (id) => firms.find((firm) => firm.id === id)

  useEffect(() => {
    const lawyersData = getFirm(firmId)
    setFirmName(lawyersData.name)
  }, [firmId, firms])

  const showDrawer = () => {
    setdrawerVisible(true)
  }

  const onClose = () => {
    setdrawerVisible(false)
  }

  return (
    <Content className="content site-drawer-render-in-current-wrapper">
      <Breadcrumb style={{ margin: "16px 0" }}>
        <Breadcrumb.Item>Firms</Breadcrumb.Item>
        <Breadcrumb.Item>{firmName}</Breadcrumb.Item>
      </Breadcrumb>
      <div className="site-layout-content">
        <h1>Lawyers List</h1>
        <div className="lawyers-list">
          <LawyersTable />
          <Card
            hoverable
            onClick={showDrawer}
            className="add-firm-card"
            style={{ width: 300, marginTop: 16 }}
          >
            <PlusSquareOutlined
              style={{ fontSize: "36px" }}
              twoToneColor="#7e1232"
            />
            <span>Add Firm</span>
          </Card>
        </div>
      </div>

      {/* <FirmCreate onClose={onClose} drawerVisible={drawerVisible} /> */}
    </Content>
  )
}

export default LawyersList
