import React from "react"
import { Layout } from "antd"
import logo from "@/assets/legistify_logo.png"
import "./MainLayout.css"
import { useNavigate } from "react-router-dom"

const { Header, Footer } = Layout

function MainLayout({ children }) {
  const navigate = useNavigate()
  return (
    <Layout className="layout">
      <Header className="header">
        <div className="logo" onClick={() => navigate("/")}>
          <img src={logo} className="logo-image" alt="logo" />
        </div>
      </Header>
      {children}
      <Footer style={{ textAlign: "center" }}>
        Made With ❤️ and ☕ by Harshaan Nihal Khan
      </Footer>
    </Layout>
  )
}

export default MainLayout
