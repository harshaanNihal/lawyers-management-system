import React from "react"
import { Layout, Breadcrumb, Card } from "antd"
import { useSelector } from "react-redux"
import logo from "@/assets/legistify_logo.png"
import "./FirmsList.css"
import { PlusSquareOutlined } from "@ant-design/icons"
import FirmCard from "./FirmCard"
import FirmCreate from "./FirmCreate"

const { Header, Content, Footer } = Layout

function FirmsList() {
  const [drawerVisible, setdrawerVisible] = React.useState(false) // drawer to create firm

  const showDrawer = () => {
    setdrawerVisible(true)
  }

  const onClose = () => {
    setdrawerVisible(false)
  }

  const firms = useSelector((state) => state)

  return (
    <Layout className="layout">
      <Header className="header">
        <div className="logo">
          <img src={logo} className="logo-image" alt="logo" />
        </div>
        {/* <Menu
          // theme="dark"
          mode="horizontal"
        // defaultSelectedKeys={['2']}
        // items={[{
        // key: 1,
        // label: `nav ${1}`,
        // }
        // ]}
        /> */}
      </Header>
      <Content className="content site-drawer-render-in-current-wrapper">
        <Breadcrumb style={{ margin: "16px 0" }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
        </Breadcrumb>
        <div className="site-layout-content">
          <h1>Firms List</h1>
          <div className="firms-list">
            {firms.map((firm) => (
              <FirmCard firm={firm} key={firm.id} />
            ))}
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

        <FirmCreate onClose={onClose} drawerVisible={drawerVisible} />
      </Content>
      <Footer style={{ textAlign: "center" }}>
        Made With ❤️ and ☕ by Harshaan Nihal Khan
      </Footer>
    </Layout>
  )
}

export default FirmsList
