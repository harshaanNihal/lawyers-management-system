import React from "react"
import { Layout } from "antd"
import logo from "@/assets/legistify_logo.png"
import "./MainLayout.css"

const { Header, Footer } = Layout

function MainLayout({ children }) {
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
      {children}
      <Footer style={{ textAlign: "center" }}>
        Made With ❤️ and ☕ by Harshaan Nihal Khan
      </Footer>
    </Layout>
  )
}

export default MainLayout
