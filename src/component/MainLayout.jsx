import React from "react"
import { Layout } from "antd"
import logo from "@/assets/legistify_logo.png"
import "./MainLayout.css"
import { Link } from "react-router-dom"

const { Header, Footer } = Layout

function MainLayout({ children }) {
  return (
    <Layout className="layout">
      <Header className="header">
        <Link to="/">
          <div className="logo">
            <img src={logo} className="logo-image" alt="logo" />
          </div>
        </Link>
      </Header>
      {children}
      <Footer style={{ textAlign: "center" }}>
        Made With ❤️ and ☕ by Harshaan Nihal Khan
      </Footer>
    </Layout>
  )
}

export default MainLayout
