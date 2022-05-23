import React from "react"
import { Routes, Route } from "react-router-dom"
import FirmsList from "@/component/Firms/FirmsList"
import "./App.css"
import "antd/dist/antd.less"
import MainLayout from "@/component/MainLayout"
import LawyersList from "@/component/Lawyers/LawyersList"
import { ToastContainer } from "react-toastify"

function App() {
  return (
    <MainLayout>
      <Routes>
        <Route path="/firms/:firmId" element={<LawyersList />} />
        <Route path="/" element={<FirmsList />} />
      </Routes>
      <ToastContainer theme="dark" />
    </MainLayout>
  )
}

export default App
